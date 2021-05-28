<script>
import Vue from 'vue'
import { Line, mixins } from 'vue-chartjs'
import axios from 'axios';

const bonbuNetIncreaseUrl='http://172.21.220.97/api/net/bonbu.json/?kind=net'; //kind=start순증


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
    name:'BonbuNetIncreaseLineChart'
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
      //console.log(`yyyy['강남'] is ${yyy.강남고객본부.sysdate}`)
      this.dataCollection = {
        labels:yyy.북부고객본부.sysdate.map((day)=>day.substring(5,10)),
        datasets: [
          {
            label:yyy.강남고객본부.jojik[0],     // 범례
            borderColor: '#20B2AA',
            backgroundColor:"transparent",
            data: yyy.강남고객본부.countSum,
            fill:false,
            // tension:.5,
            pointHoverBorderColor:'#ff0000',
            // hoverBorderWith:20,

          }, 
          {
            label:yyy['대구/경북고객본부'].jojik[0],
            borderColor: '#5F9EA0',
            backgroundColor:"transparent",
            data: yyy['대구/경북고객본부'].countSum,
            fill:false,
            // tension:.5,
            pointHoverBorderColor:'#ff0000',
          },
          {
            label: yyy['충남/충북고객본부'].jojik[0],
            borderColor: '#7FFFD4',
            backgroundColor:"transparent",
            data: yyy['충남/충북고객본부'].countSum,
            fill:false,
            // tension:.5,
            pointHoverBorderColor:'#ff0000',
          },
          {
            label: yyy.서부고객본부.jojik[0],
            borderColor: '#B0E0E6',
            backgroundColor:"transparent",
            data: yyy.서부고객본부.countSum,
            fill:false,
            // tension:.5,
            pointHoverBorderColor:'#ff0000',
          },
          {
            label: yyy['전남/전북고객본부'].jojik[0],
            borderColor: '#AFEEEE',
            backgroundColor:"transparent",
            data: yyy['전남/전북고객본부'].countSum,
            fill:false,
            // tension:.5,
            pointHoverBorderColor:'#ff0000',
          },
          {
            label: yyy.북부고객본부.jojik[0],
            borderColor: '#ADD8E6',
            backgroundColor:"transparent",
            data: yyy.북부고객본부.countSum,
            fill:false,
            // tension:.5,
            pointHoverBorderColor:'#ff0000',
          },
          {
            label: yyy.동부고객본부.jojik[0],
            borderColor: '#B0C4DE',
            backgroundColor:"transparent",
            data: yyy.동부고객본부.countSum,
            fill:false,
            // tension:.5,
            pointHoverBorderColor:'#ff0000',
          },
          {
            label: yyy['부산/경남고객본부'].jojik[0],
            borderColor: '#87CEEB',
            backgroundColor:"transparent",
            data: yyy['부산/경남고객본부'].countSum,
            fill:false,
            // tension:.5,
            pointHoverBorderColor:'#ff0000',
          },
        ]
      };  //dataCollection
    },  //fillData()


    getBonbuNetIncreaseValue(){    //본부별 순익(y축)
      let bonbuNetIncreaseValueObj={}
      let gangnamBonbuObj={}
      let daeguBonbuObj={}
      let chungNamBonbuObj={}
      let seobuBonbuObj={}
      let jeonamBonbuObj={}
      let bugbuBonbuObj={}
      let dongbuBonbuObj={}
      let busanBonbuObj={}

      const gangnamBonbuSysdateArray=new Array();
      const gangnamBonbuJojikArray=new Array();
      const gangnamBonbuCountSumArray=new Array;

      const daeguBonbuSysdateArray=new Array();
      const daeguBonbuJojikArray=new Array();
      const daeguBonbuCountSumArray=new Array();

      const chungNamBonbuSysdateArray=new Array();
      const chungNamBonbuJojikArray=new Array();
      const chungNamBonbuCountSumArray=new Array();

      const seobuBonbuSysdateArray=new Array();
      const seobuBonbuJojikArray=new Array();
      const seobuBonbuCountSumArray=new Array();

      const jeonamBonbuSysdateArray=new Array();
      const jeonamBonbuJojikArray=new Array();
      const jeonamBonbuCountSumArray=new Array();

      const bugbuBonbuSysdateArray=new Array();
      const bugbuBonbuJojikArray=new Array();
      const bugbuBonbuCountSumArray=new Array();

      const dongbuBonbuSysdateArray=new Array();
      const dongbuBonbuJojikArray=new Array();
      const dongbuBonbuCountSumArray=new Array();

      const busanBonbuSysdateArray=new Array();
      const busanBonbuJojikArray=new Array();
      const busanBonbuCountSumArray=new Array();

      this.bonbuNetIncreaseData.map((item)=>{

        if(item.jojik2_name==='강남고객본부'){
          gangnamBonbuSysdateArray.push(item.sysdate);
          gangnamBonbuJojikArray.push(item.jojik2_name);
          gangnamBonbuCountSumArray.push(item.count_sum);
        }

        if(item.jojik2_name==='대구/경북고객본부'){
          daeguBonbuSysdateArray.push(item.sysdate);
          daeguBonbuJojikArray.push(item.jojik2_name);
          daeguBonbuCountSumArray.push(item.count_sum);
        }

        if(item.jojik2_name==='충남/충북고객본부'){
          chungNamBonbuSysdateArray.push(item.sysdate);
          chungNamBonbuJojikArray.push(item.jojik2_name);
          chungNamBonbuCountSumArray.push(item.count_sum);
        }

        if(item.jojik2_name==='서부고객본부'){
          seobuBonbuSysdateArray.push(item.sysdate);
          seobuBonbuJojikArray.push(item.jojik2_name);
          seobuBonbuCountSumArray.push(item.count_sum);
        }

        if(item.jojik2_name==='전남/전북고객본부'){
          jeonamBonbuSysdateArray.push(item.sysdate);
          jeonamBonbuJojikArray.push(item.jojik2_name);
          jeonamBonbuCountSumArray.push(item.count_sum);
        }

        if(item.jojik2_name==='북부고객본부'){
          bugbuBonbuSysdateArray.push(item.sysdate);
          bugbuBonbuJojikArray.push(item.jojik2_name);
          bugbuBonbuCountSumArray.push(item.count_sum);
        }

        if(item.jojik2_name==='동부고객본부'){
          dongbuBonbuSysdateArray.push(item.sysdate);
          dongbuBonbuJojikArray.push(item.jojik2_name);
          dongbuBonbuCountSumArray.push(item.count_sum);
        }

        if(item.jojik2_name==='부산/경남고객본부'){
          busanBonbuSysdateArray.push(item.sysdate);
          busanBonbuJojikArray.push(item.jojik2_name);
          busanBonbuCountSumArray.push(item.count_sum);
        }

        gangnamBonbuObj={
          'sysdate':gangnamBonbuSysdateArray,
          'jojik':gangnamBonbuJojikArray,
          'countSum':gangnamBonbuCountSumArray,
        }

        daeguBonbuObj={
          'sysdate':daeguBonbuSysdateArray,
          'jojik':daeguBonbuJojikArray,
          'countSum':daeguBonbuCountSumArray,
        }

        chungNamBonbuObj={
          'sysdate':chungNamBonbuSysdateArray,
          'jojik':chungNamBonbuJojikArray,
          'countSum':chungNamBonbuCountSumArray,
        }

        seobuBonbuObj={
          'sysdate':seobuBonbuSysdateArray,
          'jojik':seobuBonbuJojikArray,
          'countSum':seobuBonbuCountSumArray,
        }

        jeonamBonbuObj={
          'sysdate':jeonamBonbuSysdateArray,
          'jojik':jeonamBonbuJojikArray,
          'countSum':jeonamBonbuCountSumArray,
        }

        bugbuBonbuObj={
          'sysdate':bugbuBonbuSysdateArray,
          'jojik':bugbuBonbuJojikArray,
          'countSum':bugbuBonbuCountSumArray,
        }

        dongbuBonbuObj={
          'sysdate':dongbuBonbuSysdateArray,
          'jojik':dongbuBonbuJojikArray,
          'countSum':dongbuBonbuCountSumArray,
        }

        busanBonbuObj={
          'sysdate':busanBonbuSysdateArray,
          'jojik':busanBonbuJojikArray,
          'countSum':busanBonbuCountSumArray
        }

        bonbuNetIncreaseValueObj={
          '강남고객본부':gangnamBonbuObj,
          '대구/경북고객본부':daeguBonbuObj,
          '충남/충북고객본부':chungNamBonbuObj,
          '서부고객본부':seobuBonbuObj,
          '전남/전북고객본부':jeonamBonbuObj,
          '북부고객본부':bugbuBonbuObj,
          '동부고객본부':dongbuBonbuObj,
          '부산/경남고객본부':busanBonbuObj,
        }

       

      });

     
      return bonbuNetIncreaseValueObj;
    },
  }  //methods
} //export default end
</script>
<style scoped>

</style>
