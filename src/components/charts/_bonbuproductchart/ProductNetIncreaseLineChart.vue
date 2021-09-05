<script>
import Vue from 'vue'
import { Line, mixins } from 'vue-chartjs'
import axios from 'axios';

const bonbuNetIncreaseUrl='http://172.21.220.97/api/net/product.json/?kind=net'; //kind=net순증감


const { reactiveProp } = mixins

const options={      //chart options prop를 사용하지 않는 하위컴포넌트에서는 data에 변수값으로 처리
  responsive:true,
  maintainAspectRatio:false,//차트 width,ehgith  자동 크기조절
  // hoverBorderWidth:5,
  // borderWidth:20,
  // legend:{
  //   display:true,
  // },
  plugins:{
    legend:{
      display:true,
      align:'center',
    },
    title:{
      display:true,
      text:'XXX',
    },
  },
  elements:{
    point:{
      pointStyle:'circle',
      radius:3,
      // borderWidth:10,
      hoverRadius:5,
    },
    line:{
      tension:.3,
      //stepped:true,
    }

  }

  // scales:{
  //   yAxes:[{
  //     ticks:{
  //       min:0,
  //       // max:2500,
  //       //stepSize:500,
  //       //fontSie:52,
  //     },
  //     gridLines:{
  //       //display:false,
  //       drawBorder:false,
  //     }
  //   }],
  //   xAxes:[{
  //     display:true,
  //     gridLines:{
  //       display:false,
  //       drawBorder:false,
  //     }
  //   }]
  // }
} //end options



export default {
  //mixins: [reactiveProp],
  //props: ['options'],


  components:{
    name:'ProductNetIncreaseLineChart'
  },
  extends: Line,

  data(){
    return {
      dataCollection:null,
      bonbuNetIncreaseData:null,
      bonbuNetIncreaseValueObj:null,
      options:options,
    }

  },

  async created () {
    await axios.get(bonbuNetIncreaseUrl)
      .then((res)=>{
        this.bonbuNetIncreaseData=res.data.results
        //console.log(this.bonbuNetIncreaseData);
      }).catch((err)=>{
        console.log("데이터를 가져 오지 못했습니다.",err);
      });


    this.fillData();

    //console.log(`this.dataCollection is ${this.dataCollection}`);
    this.renderChart(this.dataCollection,this.options);
  },

  methods: {
    fillData () {
      const yyy=this.getBonbuNetIncreaseValue();
      //console.log(`yyyy['강남'] is ${yyy.무선.countSum}`)
      this.dataCollection = {
        labels:yyy.무선.sysdate.map((day)=>day.substring(5,10)),
        datasets: [
          {
            label:yyy.무선.product[0],     // 범례
            borderColor: '#20B2AA',
            backgroundColor:"transparent",
            data: yyy.무선.countSum,
            fill:false,
            // tension:.5,
            pointHoverBorderColor:'#ff0000',
            // hoverBorderWith:20,

          }, 
          {
            label:yyy.미디어.product[0],
            borderColor: '#5F9EA0',
            backgroundColor:"transparent",
            data: yyy.미디어.countSum,
            fill:false,
            // tension:.5,
            pointHoverBorderColor:'#ff0000',
          },
          {
            label: yyy.인터넷.product[0],
            borderColor: '#7FFFD4',
            backgroundColor:"transparent",
            data: yyy.인터넷.countSum,
            fill:false,
            // tension:.5,
            pointHoverBorderColor:'#ff0000',
          },
          
        ]
      };  //dataCollection
    },  //fillData()


    getBonbuNetIncreaseValue(){    //본부별 순익(y축)
      let bonbuNetIncreaseValueObj={}
      let wirelessObj={}
      let mediaObj={}
      let internetObj={}
      

      const wirelessSysdateArray=new Array();
      const wirelessProdcutArray=new Array();
      const wirelessCountSumArray=new Array;

      const mediaSysdateArray=new Array();
      const mediaProductArray=new Array();
      const mediaCountSumArray=new Array();

      const internetSysdateArray=new Array();
      const internetProductArray=new Array();
      const internetCountSumArray=new Array();

     

      this.bonbuNetIncreaseData.map((item)=>{
        //console.log('item is ',item);

        if(item.prod2==='무선'){
          wirelessSysdateArray.push(item.sysdate);
          wirelessProdcutArray.push(item.prod2);
          wirelessCountSumArray.push(item.count_sum);
        }

        if(item.prod2==='미디어'){
          mediaSysdateArray.push(item.sysdate);
          mediaProductArray.push(item.prod2);
          mediaCountSumArray.push(item.count_sum);
        }

        if(item.prod2==='인터넷'){
          internetSysdateArray.push(item.sysdate);
          internetProductArray.push(item.prod2);
          internetCountSumArray.push(item.count_sum);
        }


        wirelessObj={
          'sysdate': wirelessSysdateArray,
          'product': wirelessProdcutArray,
          'countSum': wirelessCountSumArray,
        }

        mediaObj={
          'sysdate': mediaSysdateArray,
          'product': mediaProductArray,
          'countSum': mediaCountSumArray,
        }

        internetObj={
          'sysdate': internetSysdateArray,
          'product': internetProductArray,
          'countSum': internetCountSumArray,
        }

       
        bonbuNetIncreaseValueObj={
          '무선': wirelessObj,
          '미디어': mediaObj,
          '인터넷':internetObj,
        }
      });

     
      return bonbuNetIncreaseValueObj;
    },
  }  //methods
} //export default end
</script>
<style scoped>

</style>
