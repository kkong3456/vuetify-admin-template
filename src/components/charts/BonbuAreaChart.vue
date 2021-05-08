<script>
import { Line } from "vue-chartjs";
import axios from 'axios';
// const bonbuNetIncreaseUrl='http://172.21.26.252:8000/api/bonbu-net-increase-list/';
const bonbuNetIncreaseUrl='http://localhost:8000/api/bonbu-net-increase-list/';

export default {
  extends: Line,
  data() {
    return {
      gradient: null,
      gradient2: null,
      dataCollection:null,
      bonbuNetIncreaseData:null,
      bonbuNetIncreaseValueObj:null,
      options:options,
    };
  },
  async mounted () {
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);
    this.gradient2 = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);

    this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
    this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
    this.gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

    this.gradient2.addColorStop(0, "rgba(0, 231, 255, 0.9)");
    this.gradient2.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
    this.gradient2.addColorStop(1, "rgba(0, 231, 255, 0)");
    //console.log('xxx')

  },
 async created() {

    await axios.get(bonbuNetIncreaseUrl)
          .then((res)=>{
            this.bonbuNetIncreaseData=res.data
          // console.log(this.bonbuNetIncreaseData[0].date);
          }).catch((err)=>{
            console.log("데이터를 가져 오지 못했습니다.",err);
          });
    this.fillData();

    console.log(`this.dataCollection is ${this.dataCollection}`);
     this.renderChart(this.dataCollection,this.options);

  },
  methods: {
    fillData () {
      const yyy=this.getBonbuNetIncreaseValue();
      //console.log(`yyyy['북부본부'] is ${yyy['북부본부']}`)
      this.dataCollection = {
        labels:this.getBonbuLabels(),

        datasets: [
          {
            label:'북부본부',     // 범례

            data: yyy['북부본부'],
            borderColor: "#05CBE1",
            pointBackgroundColor: "white",
            pointBorderColor: "white",
            borderWidth: 1,
            backgroundColor: this.gradient2,
          }, {
            label:'동부본부',
            data: yyy['동부본부'],
            borderColor: "#FC2525",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "white",
            backgroundColor: this.gradient,
          },
          {
            label: '강남본부',
            data: yyy['강남본부'],
           borderColor: "#05CBE1",
            pointBackgroundColor: "white",
            pointBorderColor: "white",
            borderWidth: 1,
            backgroundColor: this.gradient2,
          },
          {
            label: '대구/경북본부',
            data: yyy['대구/경북본부'],
           borderColor: "#FC2525",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "white",
            backgroundColor: this.gradient,
          },
          {
            label: '부산/경남본부',
            data: yyy['부산/경남본부'],
            borderColor: "#05CBE1",
            pointBackgroundColor: "white",
            pointBorderColor: "white",
            borderWidth: 1,
            backgroundColor: this.gradient2,
          },
          {
            label: '서부본부',
            data: yyy['서부본부'],
            borderColor: "#FC2525",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "white",
            backgroundColor: this.gradient,
          },
          {
            label: '전남/전북본부',
            data: yyy['전남/전북본부'],
           borderColor: "#05CBE1",
            pointBackgroundColor: "white",
            pointBorderColor: "white",
            borderWidth: 1,
            backgroundColor: this.gradient2,
          },
          {
            label: '제주본부',
            data: yyy['제주본부'],
           borderColor: "#FC2525",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "white",
            backgroundColor: this.gradient,
          },{
            label: '충남/충북본부',
            data: yyy['충남/충북본부'],
          borderColor: "#05CBE1",
            pointBackgroundColor: "white",
            pointBorderColor: "white",
            borderWidth: 1,
            backgroundColor: this.gradient2,
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
};
</script>
