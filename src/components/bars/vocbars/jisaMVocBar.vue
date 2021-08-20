
<script>
import axios from 'axios';

import {Bar} from 'vue-chartjs';

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


const options={
  responsive:true,
  maintainAspectRatio:true,
  interaction:{
    interset:false,
  },
  scales:{
    yAxes:[
      {
        ticks:{
          beginAtZero:true
        },
        gridLines:{
          display:true,
        },    
      }
    ],
    xAxes:[
      {
        gridLines:{
          display:false,
        },
      },

    ],
  },
  plugins:{
    legend:{
      display:true,
    },
    
  }
};

export default {
  name:'JisaItVocBar',
  extends:Bar,
 

  props:['propsbonbudata','propsjisadata'],
 
  data () {
    return {
      bonbuVocData:null,
      lastWeekBonbuVocData:null,
      bonbuVocDataObj:null,  
      tvInternetVoc:[],  

      selectedStartDate:'20210420',
      selectedEndDate:'20210426',

      lastWeekStartDate:'20210413',
      lastWeekEndDate:'20210419',

      selectedBonbu:'북부고객본부',
      selectedJisa:'고양지사',

      dataCollection:null,
      options:options,
    }
  },
  computed:{
    
  },

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
    this.renderChart(this.dataCollection,this.options);
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
      const bonbuVocDataUrl=`http://172.21.220.97/api/voc.json/?table=rm&bonbu=${this.selectedBonbu}&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&kind1=jisa&kind2=type`;
      const lastBonbuVocDataUrl=`http://172.21.220.97/api/voc.json/?table=rm&bonbu=${this.selectedBonbu}&begin=${this.lastWeekStartDate}&end=${this.lastWeekEndDate}&kind1=jisa&kind2=type`;
    
      await axios.all(
        [
          axios.get(bonbuVocDataUrl),
          axios.get(lastBonbuVocDataUrl),
        ]
      ).then(axios.spread((res1,res2)=>{
        this.bonbuVocData=res1.data.results;
        this.lastWeekBonbuVocData=res2.data.results;
        
        
      })).catch((err)=>{
        console.log('금주 일자 데이터를 가져 오지 못했습니다');
      });
      
      this.fillData()
      this.renderChart(this.dataCollection,this.options);
    },



    async changedJisa(selectedJisa,selectedBonbu) {
      const bonbuVocDataUrl=`http://172.21.220.97/api/voc.json/?table=rm&bonbu=${selectedBonbu}&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&kind1=jisa&kind2=type`;
      const lastBonbuVocDataUrl=`http://172.21.220.97/api/voc.json/?table=rm&bonbu=${selectedBonbu}&begin=${this.lastWeekStartDate}&end=${this.lastWeekEndDate}&kind1=jisa&kind2=type`;
     
      this.selectedJisa=selectedJisa;  //지사 선택시 전역적으로 알려준다
      this.selectedBonbu=selectedBonbu;
      

      await axios.all(
        [
          axios.get(bonbuVocDataUrl),
          axios.get(lastBonbuVocDataUrl),
        ]
      ).then(axios.spread((res1,res2)=>{
        this.bonbuVocData=res1.data.results;
        this.lastWeekBonbuVocData=res2.data.results;
        
        
      })).catch((err)=>{
        console.log('금주 일자 데이터를 가져 오지 못했습니다');
      });
      
      this.fillData()
      this.renderChart(this.dataCollection,this.options);
    },

    fillData(){
      const yyy=this.getBonbuVocValue();
      
      const kkk={'name':[],'value':[], 'lastValue':[]}
      
      for(let i=0;i<yyy.name.length;i++){
        if(yyy.value[i]>=5 && yyy.lastValue[i]>=5){
          kkk.name.push(yyy.name[i]);
          kkk.value.push(yyy.value[i]);
          kkk.lastValue.push(yyy.lastValue[i]);
        }
      }
   
      this.dataCollection={
        //labels:yyy.name,
        labels:kkk.name,
        datasets:[
          {
            label:yyy.jisa+'[무선-전주]',          
            data:kkk.lastValue,
          },
          {
            label:yyy.jisa+'[무선-금주]',
            backgroundColor:['#5CE082','#5CE082','#5CE082','#5CE082','#5CE082','#5CE082','#5CE082'],
            data:kkk.value,
          },
       
        ] 
      }   
    
    },
    getBonbuVocValue(){    
    
      let bonbuVocDataObj={};  
      // let vocCountSum=0;
        
      const mvoc1='단말기할부대금및잔여기간문의';
      const mvoc2='약정문의';
      const mvoc3='위약금(할인반환금)문의';

      let 단말기할부대금건수=0;
      let 무선약정문의건수=0;
      let 위약금문의건수=0;

      let 단말기할부대금건수2=0;
      let 무선약정문의건수2=0;
      let 위약금문의건수2=0;
      
      this.bonbuVocData.map((item)=>{ 
        if(item.jisa===this.selectedJisa){
          if(item.voc_gubun.replace(/ /g,"")===mvoc1){
            단말기할부대금건수+=item.count_sum;
         
          }
          if(item.voc_gubun.replace(/ /g,"")===mvoc2){
            무선약정문의건수+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===mvoc3){
            위약금문의건수+=item.count_sum;
          }
          
        }  
      }); 

      this.lastWeekBonbuVocData.map((item)=>{ 
        if(item.jisa===this.selectedJisa){
          if(item.voc_gubun.replace(/ /g,"")===mvoc1){
            단말기할부대금건수2+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===mvoc2){
            무선약정문의건수2+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===mvoc3){
            위약금문의건수2+=item.count_sum;
          }
          
        }
      }); 

      //console.log('엄부정책',혜택문의건수);
       
      bonbuVocDataObj={
        'name':[mvoc1,mvoc2,mvoc3],
        'value':[단말기할부대금건수,무선약정문의건수,위약금문의건수],
        'lastValue':[단말기할부대금건수2,무선약정문의건수2,위약금문의건수2],
        'jisa':this.selectedJisa,
      }

      // console.log('bonbuNetIncrease',bonbuVocDataObj['vocCountsum']);
      return bonbuVocDataObj;
    },

  }
}
</script>

<style>
.v-data-table > .v-data-table__wrapper > table >thead > tr > th{
    font-size:1rem;
}

</style>
