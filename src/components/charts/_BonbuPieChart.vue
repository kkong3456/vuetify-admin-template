<script>
import { Pie } from "vue-chartjs";

import axios from 'axios';
// const bonbuNetIncreaseUrl='http://172.21.26.252:8000/api/bonbu-net-increase-list/';
const bonbuNetIncreaseUrl='http://localhost:8000/api/bonbu-net-increase-list/';


const options={
  responsive :true,
  maintainAspectRatio:false,
};

export default {
  extends: Pie,

  data(){
    return {
      gradient:null,
      gradient2:null,
      dataCollection:null,
      bonbuNetIncreaseData:null,
      bonbuNetIncreaseValueObj:null,
      options:options

    }
  },


  mounted() {
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient2 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);

    this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
    this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
    this.gradient.addColorStop(1, "rgba(0, 255, 0, 1)");

    this.gradient2.addColorStop(0, "rgba(0, 231, 255, 0.9)");
    this.gradient2.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
    this.gradient2.addColorStop(1, "rgba(0, 231, 255, 0)");

  },


  async created(){
    await axios.get(bonbuNetIncreaseUrl)
      .then((res)=>{
        this.bonbuNetIncreaseData=res.data
      }).catch((err)=>{
        console.log('데이터를 가져 오지 못했습니ㅏ.',err)
      })
    this.fillData();
    this.renderChart(this.dataCollection,this.options);
  },

  methods: {
    fillData () {
      const yyy=this.getBonbuNetIncreaseValue();
     
      this.dataCollection = {
        labels:Object.keys(yyy).splice(1),

        datasets: [
          {
            data: [
              yyy['북부본부'][yyy['북부본부'].length-1],
              yyy['동부본부'][yyy['동부본부'].length-1],
              yyy['강남본부'][yyy['강남본부'].length-1],
              yyy['대구/경북본부'][yyy['대구/경북본부'].length-1],
              yyy['부산/경남본부'][yyy['부산/경남본부'].length-1],
              yyy['서부본부'][yyy['서부본부'].length-1],
              yyy['전남/전북본부'][yyy['전남/전북본부'].length-8],
              yyy['제주본부'][yyy['제주본부'].length-1],
              yyy['충남/충북본부'][yyy['충남/충북본부'].length-1],
            ],
            backgroundColor: [this.gradient,this.gradient2,"#00d8ff"],
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
      const dateArray=Array();
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
        dateArray.push(item.date);
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
        '일자':dateArray,
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
};
</script>
