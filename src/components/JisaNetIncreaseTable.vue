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
  const jisaNetIncreaseUrl='http://172.21.26.252:8000/jisa-net-increase-list/';


  export default {

    data () {
      return {

        jisaNetIncreaseData:null,
        jisaNetIncreaseValueObj:null,
        //headers:this.getBonbuHeader(),
        headers: [
          {
            text: '일자',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: '강릉지사', value: 'Gangneung' },
          { text: '고양지사', value: 'Goyang' },
          { text: '광진지사', value: 'Gwangin' },
          { text: '광화문지사', value: 'Gwanghwamun' },
          { text: '구리지사', value: 'Guri' },
          { text: '노원지사', value: 'Nowon' },
          { text: '서대문지사', value: 'Seodaemun' },
          { text: '원주지사', value: 'Wonju' },
          { text: '의정부지사', value: 'Uijeongbu' },
          { text: '춘천지사', value: 'Chuncheon' },
        ],
        desserts:[],
      }
    },//data

    async created () {
      await axios.get(jisaNetIncreaseUrl)
        .then((res)=>{
          //console.log(res.data);
          this.jisaNetIncreaseData=res.data
          //console.log(this.jisaNetIncreaseData[0]);
        }).catch((err)=>{
          console.log("데이터를 가져 오지 못했습니다.^^",err);
        });

      this.getJisaDesserts();
    },

    methods: {
      getJisaDesserts(){    //테이블의 데이터 부분
        const yyy=this.getJisaNetIncreaseValue();
        //console.log('yyy',yyy);
        var dessertsArray=new Array();

        for(let i=0;i<59;i++){

            let obj={
              name:yyy.일자[i],
              Gangneung:yyy.강릉지사[i],
              Goyang:yyy.고양지사[i],
              Gwangin:yyy.광진지사[i],
              Gwanghwamun:yyy.광화문지사[i],
              Guri:yyy.구리지사[i],
              Nowon:yyy.노원지사[i],
              Uijeongbu:yyy.의정부지사[i],
              Wonju:yyy.원주지사[i],
              Chuncheon:yyy.춘천지사[i],
              Seodaemun:yyy.서대문지사[i],
          }

          dessertsArray.push(obj);



        }
          const kkk=Object.values(dessertsArray);
          this.desserts=kkk.reverse();
          //console.log('dessertsArray is', dessertsArray);
        //eturn dessertsArray;
      },



      getJisaNetIncreaseValue(){    //본부별 순익
        const labelArray=new Array();
        const GangneungJisaArray=Array();
        const GoyangJisaArray=Array();
        const GwanginJisaArray=Array();
        const GuriJisaArray=Array();
        const GwanghwamunJisaArray=Array();
        const NowonJisaArray=Array();
        const SeodaemunJisaArray=Array();
        const WonjuJisaArray=Array();
        const UijeongbuJisaArray=Array();
        const ChuncheonJisaArray=Array();

        this.jisaNetIncreaseData.map((item)=>{
          labelArray.push(item.date);
          GangneungJisaArray.push(item.Gangneung_jisa);
          GoyangJisaArray.push(item.Goyang_jisa);
          GwanginJisaArray.push(item.Gwangin_jisa);
          GwanghwamunJisaArray.push(item.Gwanghwamun_jisa);
          GuriJisaArray.push(item.Guri_jisa);
          NowonJisaArray.push(item.Nowon_jisa);
          SeodaemunJisaArray.push(item.Seodaemun_jisa);
          WonjuJisaArray.push(item.Wonju_jisa);
          UijeongbuJisaArray.push(item.Uijeongbu_jisa);
          ChuncheonJisaArray.push(item.Chuncheon_jisa);
        });
       // console.log('의정부',UijeongbuJisaArray);
        const jisaNetIncreaseValueObj={
          '일자':labelArray,
          '강릉지사':GangneungJisaArray,
          '고양지사':GoyangJisaArray,
          '광진지사':GwanginJisaArray,
          '광화문지사':GwanghwamunJisaArray,
          '구리지사':GuriJisaArray,
          '노원지사':NowonJisaArray,
          '서대문지사':SeodaemunJisaArray,
          '원주지사':WonjuJisaArray,
          '의정부지사':UijeongbuJisaArray,
          '춘천지사':ChuncheonJisaArray,
        }
        //console.log('의정부지사',jisaNetIncreaseValueObj['의정부지사']);
        return jisaNetIncreaseValueObj;
      },

     }
  }
</script>
