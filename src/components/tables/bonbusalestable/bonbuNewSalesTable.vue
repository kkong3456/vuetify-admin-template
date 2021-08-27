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

  name:'BonbuNewSalesTable',

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
      bonbuSalesData:null,
      lastBonbuSalesData:null,
      
      bonbuSalesDataObj:null,  
     
      tvInternetSales:[], 
      search:'',
      desserts:this.desserts,
      
      selectedProduct:'인터넷',
      
      selectedStartDate:'20210220',
      selectedEndDate:'20210226',

      lastWeekStartDate:'20210213',
      lastWeekEndDate:'20210219',
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
          text:'조회기간(1주일전)',
          value:'countSum',
        },
        {
          text:'조회기간',
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

      this.lastWeekStart=new Date(imsiThisStart);
      this.lastWeekStart.setDate(this.lastWeekStart.getDate() - 7);
      this.lastWeekStart=this.displayDateText(this.lastWeekStart);
      this.lastWeekStartDate=this.lastWeekStart.replace(/\//gi,"");  //현재 선택 1주일전

      this.lastWeekEnd=new Date(imsiThisEnd);
      this.lastWeekEnd.setDate(this.lastWeekEnd.getDate()- 7);
      this.lastWeekEnd=this.displayDateText(this.lastWeekEnd);
      this.lastWeekEndDate=this.lastWeekEnd.replace(/\//gi,"");
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
    
      const thisBonbuSalesUrl=`http://172.21.220.97/api/net/jisa.json/?prod=${this.selectedProduct}&kind=start&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&bonbu=`;
      const lastBonbuSalesUrl=`http://172.21.220.97/api/net/jisa.json/?prod=${this.selectedProduct}&kind=start&begin=${this.lastWeekStartDate}&end=${this.lastWeekEndDate}&bonbu=`;
      
      // this.selectedBonbu=this.selectedBonbu;  //propsbonbudata 대신 사용하려고함

      await axios.all(
        [
          axios.get(thisBonbuSalesUrl+'북부고객본부'),
          axios.get(thisBonbuSalesUrl+'동부고객본부'),
          axios.get(thisBonbuSalesUrl+'강남고객본부'),
          axios.get(thisBonbuSalesUrl+'충남/충북고객본부'),
          axios.get(thisBonbuSalesUrl+'대구/경북고객본부'),
          axios.get(thisBonbuSalesUrl+'부산/경남고객본부'),
          axios.get(thisBonbuSalesUrl+'전남/전북고객본부'),
          axios.get(thisBonbuSalesUrl+'서부고객본부'),
        ]
      ).then(axios.spread((res1,res2,res3,res4,res5,res6,res7,res8)=>{
        this.bonbuSalesData1=res1.data.results;
        this.bonbuSalesData2=res2.data.results;
        this.bonbuSalesData3=res3.data.results;
        this.bonbuSalesData4=res4.data.results;
        this.bonbuSalesData5=res5.data.results;
        this.bonbuSalesData6=res6.data.results;
        this.bonbuSalesData7=res7.data.results;
        this.bonbuSalesData8=res8.data.results;

        this.bonbuSalesData=[
          ...this.bonbuSalesData1,
          ...this.bonbuSalesData2,
          ...this.bonbuSalesData3,
          ...this.bonbuSalesData4,
          ...this.bonbuSalesData5,
          ...this.bonbuSalesData6,
          ...this.bonbuSalesData7,
          ...this.bonbuSalesData8,
          
        ];              
      })).catch((err)=>{
        console.log('금주 일자 데이터를 가져 오지 못했습니다',err);
      });
      
    
      this.getDesserts();
    },

   
    
    getDesserts(){
      const yyy=this.getBonbuSalesValue(); 
      
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

  

    getBonbuSalesValue(){    
      let bonbuSalesDataObj={}; 
     
      this.bonbuSalesData.map((item)=>{
        if(item.jojik2_name===Object.keys(bonbuJisaObj)[0]){
          console.log('Objects.keys',item.count_sum);
        }
      })
     
      // return {'it':jisaVocDataObj,'mobile':jisaMobileVocDataObj};
    },

  }
}
</script>

<style scoped>
.v-data-table > .v-data-table__wrapper > table >thead > tr > th{
    font-size:1rem;
}
</style>
