<template>
  <div>
    <v-card outlined>
      <div class="text-h5 text-center font-weight-medium text--secondary" />
      <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="10"
      >
        <template v-slot:body.append>
          <tr
            cols="12"
            lg="6"    
          >
            <td />
           
            <td colspan="4" />
          </tr>
        </template>
      </v-data-table>
      <!-- <button v-on:click="getBonbuDesserts()">vvv</button> -->
    </v-card>
  </div>
</template>
<script>
import axios from 'axios';

import eventBus from '@/js/eventBus';


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

  name:'JisaItVocTable',

  components:{
  
  },

  props:{
    'propsbonbudata':{
      type:String,
      default:undefined,
    },
    'propsjisadata':{
      type:String,
      default:undefined,
    }
  },
  
 
  data () {
    return {
      jisaVocData:null,
      jisaMobileVocData:null,
      jisaVocDataObj:null,  
      jisaMobileVodDataObj:null,
      tvInternetVoc:[], 
      search:'',
      desserts:this.desserts,
      
      selectedBonbu:'북부고객본부',
      
      selectedStartDate:'20210420',
      selectedEndDate:'20210426',

      lastWeekStartDate:'20210413',
      lastWeekEndDate:'20210419',
    }
  },
  computed:{
    headers(){
      return [
        {
          text:'지사명',
          align:'start',
          sortable:false,
          value:'name',
        },
        // {
        //   text:'기간',
        //   value:'startdate',
        // },
        // {
        //   text:'END DAY',
        //   value:'enddate',
        // filter:value=>{
        //   if(!this.thisHjCount) return true
        //   return value < parseInt(this.thisHjCount)
        // },
        // },
        {
          text:'VOC-유선',
          value:'countSum',
        },
        {
          text:'VOC-무선',
          value:'mobileCountSum',
        }
      ]
    }
  },//computed

  async created () {

    eventBus.$on('pickedDates',(dateResult)=>{  //RSN_HjVoc.vue에서 기간 선택시 그 자식 컨포넌트인 vue-hotel-datepicker.vue에서 시작일자와 종료일자를 받아옴  
      const imsiThisStart=dateResult.start.replace(/\//gi,',');
      const imsiThisEnd=dateResult.end.replace(/\//gi,',');

      this.selectedStartDate=dateResult.start.replace(/\//gi,'')  //현재 선택
      this.selectedEndDate=dateResult.end.replace(/\//gi,'')

      // this.lastWeekStart=new Date(imsiThisStart);
      // this.lastWeekStart.setDate(this.lastWeekStart.getDate() - 7);
      // this.lastWeekStart=this.displayDateText(this.lastWeekStart);
      // this.lastWeekStartDate=this.lastWeekStart.replace(/\//gi,"");  //현재 선택 1주일전

      // this.lastWeekEnd=new Date(imsiThisEnd);
      // this.lastWeekEnd.setDate(this.lastWeekEnd.getDate()- 7);
      // this.lastWeekEnd=this.displayDateText(this.lastWeekEnd);
      // this.lastWeekEndDate=this.lastWeekEnd.replace(/\//gi,"");
      this.changeDate();
    }); 
    this.changeDate();

  },

  mounted(){
    
  },

  methods: { 
   

    displayDateText (datetime) {
      if (datetime) {
        datetime = typeof (datetime) === 'string' ? new Date(datetime) : datetime
        const yyyy = datetime.getFullYear()
        const mm = datetime.getMonth() + 1 > 9 ? datetime.getMonth() + 1 : `0${datetime.getMonth() + 1}`
        const dd = datetime.getDate() > 9 ? datetime.getDate() : `0${datetime.getDate()}`
        const displayStr = (this.format || 'YYYY/MM/DD').replace('YYYY', yyyy).replace('MM', mm).replace('DD', dd)
        return displayStr
      } else {
        return undefined
      }
    },

    async changeDate(){
    
      const itDateUrl=`http://172.21.220.97/api/voc.json/?table=qit&bonbu=${this.selectedBonbu}&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&kind1=jisa&kind2=type`;
      const mobileDateUrl=`http://172.21.220.97/api/voc.json/?table=qm&bonbu=${this.selectedBonbu}&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&kind1=jisa&kind2=type`;
      
      this.selectedBonbu=this.selectedBonbu;  //propsbonbudata 대신 사용하려고함

      await axios.all(
        [
          axios.get(itDateUrl),
          axios.get(mobileDateUrl),
        ]
      ).then(axios.spread((res1,res2)=>{
        this.jisaVocData=res1.data.results;
       
        this.jisaMobileVocData=res2.data.results;
               
      })).catch((err)=>{
        console.log('금주 일자 데이터를 가져 오지 못했습니다');
      });
      
      this.getDesserts();
    },

    async changedBonbu(selectedBonbu) {
      const itDataUrl=`http://172.21.220.97/api/voc.json/?table=qit&bonbu=${selectedBonbu}&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&kind1=jisa&kind2=type`;
      const mobileDataUrl=`http://172.21.220.97/api/voc.json/?table=qm&bonbu=${selectedBonbu}&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&kind1=jisa&kind2=type`
    
      this.selectedBonbu=selectedBonbu;  //propsbonbudata 대신 사용하려고함

      await axios.all(
        [
          axios.get(itDataUrl),
          axios.get(mobileDataUrl),
        ]
      ).then(axios.spread((res1,res2)=>{
        this.jisaVocData=res1.data.results;
        this.jisaMobileVocData=res2.data.results;

      })).catch((err)=>{
        console.log('데이터를 가져 오지 못했습니다.');
      });
        
      this.getDesserts();
    },

    

    getDesserts(){
      const yyy=this.getJisaVocValue(); 
      console.log('xxxx',yyy.it.firstJisa); 
      // const selectedStartDate=this.selectedStartDate.substring(2,4)+'-'+this.selectedStartDate.substring(4,6)+'-'+this.selectedStartDate.substring(6,8);
      // const selectedEndDate=this.selectedEndDate.substring(2,4)+'-'+this.selectedEndDate.substring(4,6)+'-'+this.selectedEndDate.substring(6,8)

      if(this.selectedBonbu==='북부고객본부' || this.selectedBonbu==='동부고객본부' || this.selectedBonbu==='전남/전북고객본부'){
        this.desserts=
        [
          {
            name:yyy.it.firstJisa[0],
            countSum:yyy.it.firstJisa[1].toLocaleString(),
            mobileCountSum:yyy.mobile.firstJisa[1].toLocaleString(),
          },
          {
            name:yyy.it.secondJisa[0],
            countSum:yyy.it.secondJisa[1].toLocaleString(),
            mobileCountSum:yyy.mobile.secondJisa[1].toLocaleString(),
          },
          {
            name:yyy.it.thirdJisa[0],
            countSum:yyy.it.thirdJisa[1].toLocaleString(),
            mobileCountSum:yyy.mobile.thirdJisa[1].toLocaleString(),
          },
          {
            name:yyy.it.fourthJisa[0],
            countSum:yyy.it.fourthJisa[1].toLocaleString(),
            mobileCountSum:yyy.mobile.fourthJisa[1].toLocaleString(),
          },
          {
            name:yyy.it.fifthJisa[0],
            // startdate:selectedStartDate,
            // enddate:selectedEndDate,
            countSum:yyy.it.fifthJisa[1].toLocaleString(),
            mobileCountSum:yyy.mobile.fifthJisa[1].toLocaleString(),
          }
        ]
      }
    }, 

  

    getJisaVocValue(){    
      let jisaVocDataObj={}; 
      let jisaMobileVocDataObj={};

      let firstJisa='';
      let secondJisa='';
      let thirdJisa='';
      let fourthJisa='';
      let fifthJisa='';
      let sixthJisa='';
      let seventhJisa='';

      let firstJisaCountSum=0;
      let secondJisaCountSum=0;
      let thirdJisaCountSum=0;
      let fourthJisaCountSum=0;
      let fifthJisaCountSum=0;
      let sixthJisaCountSum=0;
      let seventhJisaCountSum=0;

      let firstJisaMobileCountSum=0;
      let secondJisaMobileCountSum=0;
      let thirdJisaMobileCountSum=0;
      let fourthJisaMobileCountSum=0;
      let fifthJisaMobileCountSum=0;
      let sixthJisaMobileCountSum=0;
      let seventhJisMobileaCountSum=0;

      if(this.selectedBonbu==='북부고객본부'){
        firstJisa='고양지사';
        secondJisa='광진지사';
        thirdJisa='광화문지사';
        fourthJisa='노원지사';
        fifthJisa='서대문지사';

        this.jisaVocData.map((item)=>{
          if(item.jisa===firstJisa){
            firstJisaCountSum+=item.count_sum;
          }
          if(item.jisa===secondJisa){
            secondJisaCountSum+=item.count_sum;
          }
          if(item.jisa===thirdJisa){
            thirdJisaCountSum+=item.count_sum;
          }
          if(item.jisa===fourthJisa){
            fourthJisaCountSum+=item.count_sum;
          }
          if(item.jisa===fifthJisa){
            fifthJisaCountSum+=item.count_sum;
          }
        })

        jisaVocDataObj={
          'firstJisa':[firstJisa,firstJisaCountSum],
          'secondJisa':[secondJisa,secondJisaCountSum],
          'thirdJisa':[thirdJisa,thirdJisaCountSum],
          'fourthJisa':[fourthJisa,fourthJisaCountSum],
          'fifthJisa':[fifthJisa,fifthJisaCountSum],
        }

        this.jisaMobileVocData.map((item)=>{
          if(item.jisa===firstJisa){
            firstJisaMobileCountSum+=item.count_sum;
          }
          if(item.jisa===secondJisa){
            secondJisaMobileCountSum+=item.count_sum;
          }
          if(item.jisa===thirdJisa){
            thirdJisaMobileCountSum+=item.count_sum;
          }
          if(item.jisa===fourthJisa){
            fourthJisaMobileCountSum+=item.count_sum;
          }
          if(item.jisa===fifthJisa){
            fifthJisaMobileCountSum+=item.count_sum;
          }
        })

        jisaMobileVocDataObj={
          'firstJisa':[firstJisa,firstJisaMobileCountSum],
          'secondJisa':[secondJisa,secondJisaMobileCountSum],
          'thirdJisa':[thirdJisa,thirdJisaMobileCountSum],
          'fourthJisa':[fourthJisa,fourthJisaMobileCountSum],
          'fifthJisa':[fifthJisa,fifthJisaMobileCountSum],
        }
      }

      if(this.selectedBonbu==='동부고객본부'){
        firstJisa='강릉지사';
        secondJisa='구리지사';
        thirdJisa='원주지사';
        fourthJisa='의정부지사';
        fifthJisa='춘천지사';

        console.log('동부고객본부');

        this.jisaVocData.map((item)=>{
          if(item.jisa===firstJisa){
            firstJisaCountSum+=item.count_sum;
          }
          if(item.jisa===secondJisa){
            secondJisaCountSum+=item.count_sum;
          }
          if(item.jisa===thirdJisa){
            thirdJisaCountSum+=item.count_sum;
          }
          if(item.jisa===fourthJisa){
            fourthJisaCountSum+=item.count_sum;
          }
          if(item.jisa===fifthJisa){
            fifthJisaCountSum+=item.count_sum;
          }
        })

        jisaVocDataObj={
          'firstJisa':[firstJisa,firstJisaCountSum],
          'secondJisa':[secondJisa,secondJisaCountSum],
          'thirdJisa':[thirdJisa,thirdJisaCountSum],
          'fourthJisa':[fourthJisa,fourthJisaCountSum],
          'fifthJisa':[fifthJisa,fifthJisaCountSum],
        } 

        this.jisaMobileVocData.map((item)=>{
          if(item.jisa===firstJisa){
            firstJisaMobileCountSum+=item.count_sum;
          }
          if(item.jisa===secondJisa){
            secondJisaMobileCountSum+=item.count_sum;
          }
          if(item.jisa===thirdJisa){
            thirdJisaMobileCountSum+=item.count_sum;
          }
          if(item.jisa===fourthJisa){
            fourthJisaMobileCountSum+=item.count_sum;
          }
          if(item.jisa===fifthJisa){
            fifthJisaMobileCountSum+=item.count_sum;
          }
        })

        jisaMobileVocDataObj={
          'firstJisa':[firstJisa,firstJisaMobileCountSum],
          'secondJisa':[secondJisa,secondJisaMobileCountSum],
          'thirdJisa':[thirdJisa,thirdJisaMobileCountSum],
          'fourthJisa':[fourthJisa,fourthJisaMobileCountSum],
          'fifthJisa':[fifthJisa,fifthJisaMobileCountSum],
        }    
      }
      return {'it':jisaVocDataObj,'mobile':jisaMobileVocDataObj};
    },

  }
}
</script>

<style scoped>
.v-data-table > .v-data-table__wrapper > table >thead > tr > th{
    font-size:1rem;
}
</style>
