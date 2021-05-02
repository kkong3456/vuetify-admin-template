<template>
<v-container fluid>
  <v-card>
  <div class="small">
    <bonbu-net-increase-chart :chart-data="datacollection"></bonbu-net-increase-chart>
    <button @click="fillData()">Randomize</button>
  </div>
</v-card>
</v-container>
</template>

<script>
  import BonbuNetIncreaseChart from '../components/BonbuNetIncreaseChart'
  import axios from 'axios';

  const bonbuNetIncreaseUrl='http://localhost:8000/bonbu-net-increase-list/';
  const jisaNetIncreaseUrl='http://localhost:8000/jisa-net-increase-list';

  export default {
    components: {
      BonbuNetIncreaseChart
    },
    data () {
      return {
        datacollection: null,
        bonbuNetIncreaseData:null,
        bonbuNetIncreaseValueObj:null,
        jisaNetIncreaseData:null,
      }
    },
    async created () {
      await axios.get(bonbuNetIncreaseUrl)
        .then((res)=>{
          this.bonbuNetIncreaseData=res.data
          //console.log(this.bonbuNetIncreaseData[0].date);
        }).catch((err)=>{
          console.log("데이터를 가져 오지 못했습니다.",err);
        });

        this.fillData();
    },


    methods: {
      fillData () {
        const yyy=this.getBonbuNetIncreaseValue();
        this.datacollection = {
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
        }
      },

     getBonbuLabels () {      //그래프의 x 축 데이터 (일자)
        const labelArray=new Array();
        this.bonbuNetIncreaseData.map((item)=>{
          labelArray.push(item.date);
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
        })

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
    }
  }
</script>

<style>
  .small {
    /* max-width: 600px;
    margin:  150px auto; */
  }
</style>
