<template>
  <div>
    <div class="text-h5 text-center font-weight-medium text--secondary" />
    <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="5"
      class="elevation-1"    
    >
      <template v-slot:top />
      <template v-slot:body.append>
        <tr
          cols="12"
          lg="6"    
        >
          <td />
          <td />
          <td colspan="4" />
        </tr>
      </template>
    </v-data-table>
    <!-- <button v-on:click="getBonbuDesserts()">vvv</button> -->
  </div>
</template>



<script>
import axios from 'axios';
const jisaVocUrl='http://172.21.220.97/api/voc/rit.json/?&kind=jisa&bonbu=동부고객본부';

const bonbuJisaObj={
  '북부고객본부':['고양지사','광진지사','광화문지사','노원지사','서대문지사'],
  '동부고객본부':['강릉지사','구리지사','원주지사','의정부지사','춘천지사'],
  '강남고객본부':['강남지사','분당지사','송파지사','수원지사','용인지사','평택지사'],
  '충남/충북고객본부':['대전지사','서대전지사','천안지사','청주지사','충주지사','홍성지사'],
  '대구/경북고객본부':['구미지사','달서지사','동대구지사','서대구지사','안동지사','포항지사'],
  '부산/경남고객본부':['남부산지사','동부산지사','북부산지사','서부산지사','울산지사','진주지사','창원지사'],
  '전남/전북고객본부':['광주지사','목포지사','순천지사','익산지사','전주지사'],
  '서부고객본부':['강서지사','구로지사','부천지사','서인천지사','안산지사','안양지사','인천지사']
}


 
export default {
  //name:jisaRitVocDongbuTable,
  data () {
    return {
      bonbuNetIncreaseData:null,
      bonbuNetIncreaseValueObj:null,  
      desserts:this.desserts,
    }
  },
  computed:{
    headers(){
      return [
        {
          text:'일자',
          align:'start',
          sortable:false,
          value:'name',
        },
       
        {
          text:'강릉지사',
          value:'firstJisaCountSum',
          // filter:value=>{
          //   if(!this.thisHjCount) return true
          //   return value < parseInt(this.thisHjCount)
          // },
        },
        {
          text:'구리지사',
          value:'secondJisaCountSum',
        },
        {
          text:'의정부지사',
          value:'thirdJisaCountSum',
        },
        {
          text:'원주지사',
          value:'fourthJisaCountSum',
        },
        {
          text:'춘천지사',
          value:'fifthJisaCountSum',
        },
       
      ]
    
    },
  
  },//computed

  async created () {
    await axios.get(jisaVocUrl).then((res)=>{
      this.bonbuNetIncreaseData=res.data.results;
      
    }).catch((err)=>{
      alert(err);
    });
    
    //this.getBonbuNetIncreaseValue();
    this.getDesserts();
  },

  mounted(){
    
  },

  methods: {  
    getDesserts(){
      const yyy=this.getBonbuNetIncreaseValue();
     
      const dessertsArray=new Array();

      for(let i=yyy.firstJisa.sysdate.length-1;i>0;i--){
        //console.log('yyy.firstJisa.countSum',yyy.firstJisa.countSum);
        let obj={                                      //테이블에 보여주는 포맷
          name:yyy.firstJisa.sysdate[i]?yyy.firstJisa.sysdate[i]:0,
          firstJisaCountSum:yyy.firstJisa.countSum[i]?yyy.firstJisa.countSum[i]:0,
          secondJisaCountSum:yyy.secondJisa.countSum[i]?yyy.secondJisa.countSum[i]:0,
          thirdJisaCountSum:yyy.thirdJisa.countSum[i]?yyy.thirdJisa.countSum[i]:0,
          fourthJisaCountSum:yyy.fourthJisa.countSum[i]?yyy.fourthJisa.countSum[i]:0,
          fifthJisaCountSum:yyy.fifthJisa.countSum[i]?yyy.fifthJisa.countSum[i]:0,
        }
        dessertsArray.push(obj);  
        //this.desserts=Object.values(dessertsArray);
      }
      this.desserts=Object.values(dessertsArray);
      //console.log('this.dessertsArray',dessertsArray);  
    }, 

    getBonbuNetIncreaseValue(url){    //본부별 순익(y축)
      let bonbuNetIncreaseValueObj={};
      let firstJisaObj={};
      let secondJisaObj={}
      let thirdJisaObj={}
      let fourthJisaObj={}
      let fifthJisaObj={}
      let sixthJisaObj={}
      let seventhJisaObj={}
      //console.log('url is ',url);

      const firstSysdateArray=new Array();
      const firstjojik2Array=new Array();
      const firstjojik3Array=new Array();
      const firstProductArray=new Array();
      const firstCountSumArray=new Array();

      const secondSysdateArray=new Array();
      const secondjojik2Array=new Array();
      const secondjojik3Array=new Array();
      const secondProductArray=new Array();
      const secondCountSumArray=new Array();


      const thirdSysdateArray=new Array();
      const thirdjojik2Array=new Array();
      const thirdjojik3Array=new Array();
      const thirdProductArray=new Array();
      const thirdCountSumArray=new Array();

      const fourthSysdateArray=new Array();
      const fourthjojik2Array=new Array();
      const fourthjojik3Array=new Array();
      const fourthProductArray=new Array();
      const fourthCountSumArray=new Array();

      const fifthSysdateArray=new Array();
      const fifthjojik2Array=new Array();
      const fifthjojik3Array=new Array();
      const fifthProductArray=new Array();
      const fifthCountSumArray=new Array();  

      this.bonbuNetIncreaseData.map((item)=>{
       
        if(item.sy_jojik3==='강릉지사'){
          firstSysdateArray.push(item.voc_rcv_date);
          firstjojik3Array.push(item.sy_jojik3);
          //firstProductArray.push(item.prod2);
          firstCountSumArray.push(item.count_sum);
        }

        if(item.sy_jojik3==='구리지사'){
          secondSysdateArray.push(item.voc_rcv_date);
          secondjojik3Array.push(item.sy_jojik3);
          //secondProductArray.push(item.prod2);
          secondCountSumArray.push(item.count_sum);
        }

        if(item.sy_jojik3==='원주지사'){
          thirdSysdateArray.push(item.voc_rcv_date);
          thirdjojik3Array.push(item.sy_jojik3);
          //thirdProductArray.push(item.prod2);
          thirdCountSumArray.push(item.count_sum);
        }
        if(item.sy_jojik3==='의정부지사'){
          fourthSysdateArray.push(item.voc_rcv_date);
          fourthjojik3Array.push(item.sy_jojik3);
          //fourthProductArray.push(item.prod2);
          fourthCountSumArray.push(item.count_sum);
        }


        if(item.sy_jojik3==='춘천지사'){
          fifthSysdateArray.push(item.voc_rcv_date);
          fifthjojik3Array.push(item.sy_jojik3);
          //fifthProductArray.push(item.prod2);
          fifthCountSumArray.push(item.count_sum);
        }
      });
         
      firstJisaObj={
        'sysdate': firstSysdateArray,
        'jojik': firstjojik3Array,
        //'product': firstProductArray,
        'countSum': firstCountSumArray,
      }

      secondJisaObj={
        'sysdate': secondSysdateArray,
        'jojik':secondjojik3Array,
        // 'product': secondProductArray,
        'countSum': secondCountSumArray,
      }

      thirdJisaObj={
        'sysdate': thirdSysdateArray,
        'jojik':thirdjojik3Array,
        // 'product': thirdProductArray,
        'countSum': thirdCountSumArray,
      }
      fourthJisaObj={
        'sysdate': fourthSysdateArray,
        'jojik': fourthjojik3Array,
        //  'product': fourthProductArray,
        'countSum': fourthCountSumArray,
      }

      fifthJisaObj={
        'sysdate': fifthSysdateArray,
        'jojik':fifthjojik3Array,
        //  'product': fifthProductArray,
        'countSum': fifthCountSumArray,
      }

    
    
      bonbuNetIncreaseValueObj={
        'firstJisa': firstJisaObj,
        'secondJisa': secondJisaObj,
        'thirdJisa': thirdJisaObj,
        'fourthJisa':fourthJisaObj,
        'fifthJisa':fifthJisaObj,
      }

      //console.log('bonbuNetIncrease',bonbuNetIncreaseValueObj);
      return bonbuNetIncreaseValueObj;
    },

  }
}
</script>

<style scoped>
.v-data-table > .v-data-table__wrapper > table >thead > tr > th{
    font-size:1rem;
}
</style>
