<script>
import Vue from 'vue'
import { Line, mixins } from 'vue-chartjs'
import axios from 'axios';

const bonbuNetIncreaseUrl='http://172.21.220.97/api/net/bonbu.json/?kind=start&page=1'; //kind=start순증

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
  extends: Line,
  //mixins: [reactiveProp],
  //props: ['options'],


  components:{
    name:'BonbuNetIncreaseLineChart'
  },

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
      console.log(`yyyy['북부본부'] is ${yyy.date}`)
      this.dataCollection = {
        labels:this.getBonbuLabels(),
        datasets: [
          {
            label:'북부본부',     // 범례
            borderColor: '#20B2AA',
            backgroundColor:"transparent",
            data: yyy['북부본부'],
            fill:false,
            // tension:.5,
            pointHoverBorderColor:'#ff0000',
            // hoverBorderWith:20,

          }, {
            label:'동부본부',
            borderColor: '#5F9EA0',
            backgroundColor:"transparent",
            data: yyy['동부본부'],
            fill:false,
            // tension:.5,
            pointHoverBorderColor:' b',
          },
          {
            label: '강남본부',
            borderColor: '#7FFFD4',
            backgroundColor:"transparent",
            data: yyy['강남본부'],
            fill:false,
            // tension:.5,
            pointHoverBorderColor:'#ff0000',
          },
          {
            label: '대구/경북본부',
            borderColor: '#B0E0E6',
            backgroundColor:"transparent",
            data: yyy['대구/경북본부'],
            fill:false,
            // tension:.5,
            pointHoverBorderColor:'#ff0000',
          },
          {
            label: '부산/경남본부',
            borderColor: '#AFEEEE',
            backgroundColor:"transparent",
            data: yyy['부산/경남본부'],
            fill:false,
            // tension:.5,
            pointHoverBorderColor:'#ff0000',
          },
          {
            label: '서부본부',
            borderColor: '#ADD8E6',
            backgroundColor:"transparent",
            data: yyy['서부본부'],
            fill:false,
            // tension:.5,
            pointHoverBorderColor:'#ff0000',
          },
          {
            label: '전남/전북본부',
            borderColor: '#B0C4DE',
            backgroundColor:"transparent",
            data: yyy['전남/전북본부'],
            fill:false,
            // tension:.5,
            pointHoverBorderColor:'#ff0000',
          },
          {
            label: '제주본부',
            borderColor: '#87CEEB',
            backgroundColor:"transparent",
            data: yyy['제주본부'],
            fill:false,
            // tension:.5,
            pointHoverBorderColor:'#ff0000',
          },{
            label: '충남/충북본부',
            borderColor: '#87CEFA',
            backgroundColor:"transparent",
            data: yyy['충남/충북본부'],
            fill:false,
            // tension:.5,
            pointHoverBorderColor:'#ff0000',
          },
        ]
      };  //dataCollection
    },  //fillData()


    getBonbuLabels () {      //그래프의 x 축 데이터 (일자)
      const labelArray=new Array();
      this.bonbuNetIncreaseData.map((item)=>{
        labelArray.push(item.sysdate.substring(5));
      })
      return labelArray;
    },

    getBonbuNetIncreaseValue(){    //본부별 순익(y축)
      const sysdateArray=new Array();
      const jojik2NameArray=new Array();
      const countSumArray=new Array();

      this.bonbuNetIncreaseData.map((item)=>{
        sysdateArray.push(item.sysdate.substring(5,10));
        jojik2NameArray.push(item.jojik2_name);
        countSumArray.push(item.count_sum);
      });

      const bonbuNetIncreaseValueObj={
        date:sysdateArray,
        jojik:jojik2NameArray,
        countSum:countSumArray,
      }
      //console.log(bonbuNetIncreaseValueObj);
      return bonbuNetIncreaseValueObj;
    },
  }  //methods
} //export default end
</script>
<style scoped>

</style>
