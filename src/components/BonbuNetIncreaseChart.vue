<script>
import Vue from 'vue'
import { Line, mixins } from 'vue-chartjs'
import axios from 'axios';

const bonbuNetIncreaseUrl='http://172.30.1.44:8000/bonbu-net-increase-list/';
const jisaNetIncreaseUrl='http://localhost:8000/jisa-net-increase-list';

const { reactiveProp } = mixins

const options={      //chart options prop를 사용하지 않는 하위컴포넌트에서는 data에 변수값으로 처리
        responsive:true,
        maintainAspectRatio:false,  //차트 width,ehgith 크기조절
        legend:{
         // display:false,
        },
        plugins:{
          title:{
            display:true,
            text:'XXX',
          }
        },
        scales:{
          yAxes:[{
            ticks:{
              min:0,
              // max:2500,
              //stepSize:500,
              //fontSie:52,
            },
            gridLines:{
              //display:false,
              drawBorder:false,
            }
          }],
          xAxes:[{
            display:false,
            gridLines:{
              display:false,
              drawBorder:false,
            }
          }]
        }
      } //end options



export default {
  extends: Line,
  //mixins: [reactiveProp],
  //props: ['options'],


  components:{
    name:'BonbuNetIncreaseChart'
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
        this.bonbuNetIncreaseData=res.data
       // console.log(this.bonbuNetIncreaseData[0].date);
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
      this.dataCollection = {
        labels:this.getBonbuLabels(),

        datasets: [
          {
            label:'ji-북부본부',     // 범례
            borderColor: '#20B2AA',
            data: yyy['북부본부'],
            fill:false,
            tension:.5,
            pointHoverBorderColor:'#ff0000',
          }, {
            label:'동부본부',
            borderColor: '#5F9EA0',
            data: yyy['동부본부'],
            fill:false,
            tension:.5,
            pointHoverBorderColor:' b',
          },
          {
            label: '강남본부',
            borderColor: '#7FFFD4',
            data: yyy['강남본부'],
            fill:false,
            tension:.5,
            pointHoverBorderColor:'#ff0000',
          },
          {
            label: '대구/경북본부',
            borderColor: '#B0E0E6',
            data: yyy['대구/경북본부'],
            fill:false,
            tension:.5,
            pointHoverBorderColor:'#ff0000',
          },
          {
            label: '부산/경남본부',
            borderColor: '#AFEEEE',
            data: yyy['부산/경남본부'],
            fill:false,
            tension:.5,
            pointHoverBorderColor:'#ff0000',
          },
          {
            label: '서부본부',
            borderColor: '#ADD8E6',
            data: yyy['서부본부'],
            fill:false,
            tension:.5,
            pointHoverBorderColor:'#ff0000',
          },
          {
            label: '전남/전북본부',
            borderColor: '#B0C4DE',
            data: yyy['전남/전북본부'],
            fill:false,
            tension:.5,
            pointHoverBorderColor:'#ff0000',
          },
          {
            label: '제주본부',
            borderColor: '#87CEEB',
            data: yyy['제주본부'],
            fill:false,
            tension:.5,
            pointHoverBorderColor:'#ff0000',
          },{
            label: '충남/충북본부',
            borderColor: '#87CEFA',
            data: yyy['충남/충북본부'],
            fill:false,
            tension:.5,
            pointHoverBorderColor:'#ff0000',
          },
        ]
      };  //dataCollection
    },  //fillData()


    getBonbuLabels () {      //그래프의 x 축 데이터 (일자)
      const labelArray=new Array();
      this.bonbuNetIncreaseData.map((item)=>{
        labelArray.push(item.date.substring(5));
      })
      return labelArray;
    },

    getBonbuNetIncreaseValue(){    //본부별 순익(y축)
      const bugbuBonbuArray=Array();
      const dongbuBonbuArray=Array();
      const gangnamBonbuArray=Array();
      const daegu_gyeongbugArray=Array();
      const busan_gyeongnamArray=Array();
      const seobuBonbuArray=Array();
      const jeonnam_jeonbugArray=Array();
      const jesuBonbuArray=Array();
      const chungnam_chungbugArray=Array();

      this.bonbuNetIncreaseData.map((item)=>{
        bugbuBonbuArray.push(item.bugbu_bonbu);
        dongbuBonbuArray.push(item.dongbu_bonbu);
        gangnamBonbuArray.push(item.gangnam_bonbu);
        daegu_gyeongbugArray.push(item.daegu_gyeongbug);
        busan_gyeongnamArray.push(item.busan_gyeongnam);
        seobuBonbuArray.push(item.seobu_bonbu);
        jeonnam_jeonbugArray.push(item.jeonnam_jeonbug);
        jesuBonbuArray.push(item.jesu_bonbu);
        chungnam_chungbugArray.push(item.chungnam_chungbug);
      });

      const bonbuNetIncreaseValueObj={
        '북부본부':bugbuBonbuArray,
        '동부본부':dongbuBonbuArray,
        '강남본부':gangnamBonbuArray,
        '대구/경북본부':daegu_gyeongbugArray,
        '부산/경남본부':busan_gyeongnamArray,
        '서부본부':seobuBonbuArray,
        '전남/전북본부':jeonnam_jeonbugArray,
        '제주본부':jesuBonbuArray,
        '충남/충북본부':chungnam_chungbugArray,
      }
      //console.log(bonbuNetIncreaseValueObj);
      return bonbuNetIncreaseValueObj;
    },
  }  //methods
} //export default end
</script>
<style scoped>

</style>
