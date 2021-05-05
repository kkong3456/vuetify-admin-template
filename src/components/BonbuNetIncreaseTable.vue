<template>
<v-container>

  <v-data-table
    :headers="headers"
    :items="desserts"
    :items-per-page="5"

  ></v-data-table>
<!-- <button v-on:click="getBonbuDesserts()">vvv</button> -->
</v-container>
</template>



<script>
  import axios from 'axios';

  const bonbuNetIncreaseUrl='http://172.21.26.252:8000/bonbu-net-increase-list/';
  const jisaNetIncreaseUrl='http://172.21.26.252:8000/jisa-net-increase-list';


  export default {

    data () {
      return {

        bonbuNetIncreaseData:null,
        bonbuNetIncreaseValueObj:null,
        //headers:this.getBonbuHeader(),
        headers: [
          {
            text: '일자',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: '북부본부', value: 'bugbu' },
          { text: '동부본부', value: 'dongbu' },
          { text: '강남본부', value: 'gangnam' },
          { text: '대구/경북', value: 'daegu_gyeongbug' },
          { text: '부산/경남', value: 'busna_gyeongnam' },
          { text: '서부본부', value: 'seobu' },
          { text: '전남/전북', value: 'jeonnam_jeonbug' },
          { text: '제주본부', value: 'jesu' },
          { text: '충남/충북', value: 'chungnam_chungbug' },
        ],
        desserts:[],
      }
    },//data

    async created () {
      await axios.get(bonbuNetIncreaseUrl)
        .then((res)=>{
          this.bonbuNetIncreaseData=res.data
          //console.log(this.bonbuNetIncreaseData[0]);
        }).catch((err)=>{
          console.log("데이터를 가져 오지 못했습니다.",err);
        });

      this.getBonbuDesserts();
    },

    mounted(){
     // this.getBonbuDesserts();
    },

    methods: {
      getBonbuDesserts(){    //테이블의 데이터 부분
        const yyy=this.getBonbuNetIncreaseValue();
        //console.log('yyy',.length);
        var dessertsArray=new Array();

        for(let i=0;i<59;i++){

            let obj={
              name:yyy.일자[i],
              bugbu:yyy.북부본부[i],
              dongbu:yyy.동부본부[i],
              gangnam:yyy.강남본부[i],
              daegu_gyeongbug:yyy.대구_경북본부[i],
              busna_gyeongnam:yyy.부산_경남본부[i],
              seobu:yyy.서부본부[i],
              jeonnam_jeonbug:yyy.전남_전북본부[i],
              jesu:yyy.제주본부[i],
              chungnam_chungbug:yyy.충남_충북본부[i]
          }

          dessertsArray.push(obj);
          this.kkk=Object.values(dessertsArray);
          this.desserts=this.kkk.reverse();

        }
          //console.log('dessertsArray is', dessertsArray);
        //eturn dessertsArray;
      },



      getBonbuNetIncreaseValue(){    //본부별 순익
        const labelArray=new Array();
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
          labelArray.push(item.date);
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
        //console.log('부산경남',busan_gyeongnamArray);
        const bonbuNetIncreaseValueObj={
          '일자':labelArray,
          '북부본부':bugbuBonbuArray,
          '동부본부':dongbuBonbuArray,
          '강남본부':gangnamBonbuArray,
          '대구_경북본부':daegu_gyeongbugArray,
          '부산_경남본부':busan_gyeongnamArray,
          '서부본부':seobuBonbuArray,
          '전남_전북본부':jeonnam_jeonbugArray,
          '제주본부':jesuBonbuArray,
          '충남_충북본부':chungnam_chungbugArray,
        }
      //console.log('부산_경남본부',bonbuNetIncreaseValueObj['부산_경남본부']);
        return bonbuNetIncreaseValueObj;
      },

     }
  }
</script>
