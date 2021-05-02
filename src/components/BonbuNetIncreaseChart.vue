<script>
import Vue from 'vue'
import { Line, mixins } from 'vue-chartjs'
import axios from 'axios';

const bonbuNetIncreaseUrl='http://localhost:8000/bonbu-net-increase-list/';
const jisaNetIncreaseUrl='http://localhost:8000/jisa-net-increase-list';

const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],

  components:{
    name:'BonbuNetIncreaseChart'
  },

  data(){
    return {
      dataCollection:'xxx',
      bonbuNetIncreaseData:null,
      bonbuNetIncreaseValueObj:null,
    }

  },

  async created () {
    await axios.get(bonbuNetIncreaseUrl)
      .then((res)=>{
        this.bonbuNetIncreaseData=res.data
        console.log(this.bonbuNetIncreaseData[0].date);
      }).catch((err)=>{
        console.log("데이터를 가져 오지 못했습니다.",err);
      });

      this.fillData();

      console.log(`this.dataCollection is ${this.dataCollection}`);
      this.renderChart(this.dataCollection,this.options);
  },

  mounted () {
    //console.log(`this.dataCollection is ${this.dataCollection}`);
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    //this.renderChart(this.chartData, this.options)
    //this.renderChart(this.bonbuNetIncreaseValueObj,this.options);
  },

  methods: {
    fillData () {
      const yyy=this.getBonbuNetIncreaseValue();
      this.dataCollection = {
        labels:this.getBonbuLabels(),
        datasets: [
          {
            label:'북부본부',     // 범례
            backgroundColor: '#f87979',
            data: yyy['북부본부']
          }, {
            label: '동부본부',
            backgroundColor: '#f24979',
            data: yyy['동부본부']
          },
          {
            label: '강남본부',
            backgroundColor: '#f24979',
            data: yyy['강남본부']
          },
          {
            label: '대구/부산본부',
            backgroundColor: '#f24979',
            data: yyy['대구/부산본부']
          },
          {
            label: '부산/경남본부',
            backgroundColor: '#f24979',
            data: yyy['부산/경남본부']
          },
          {
            label: '서부본부',
            backgroundColor: '#f24979',
            data: yyy['서부본부']
          },
          {
            label: '전남/전북본부',
            backgroundColor: '#f24979',
            data: yyy['전남/전북본부']
          },
          {
            label: '제주본부',
            backgroundColor: '#f24979',
            data: yyy['제주본부']
          },{
            label: '충남/충북본부',
            backgroundColor: '#f24979',
            data: yyy['충남/충북본부']
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
