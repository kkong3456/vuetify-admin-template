
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
 

  props:{
    propsdata:{
      type:String,
      default:undefined,
    }
  },
 
  data () {
    return {
      bonbuVocData:null,
      lastWeekBonbuVocData:null,
      bonbuVocDataObj:null,  
      tvInternetVoc:[],  

      selectedStartDate:'20210220',
      selectedEndDate:'20210226',

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
   
  },

  mounted(){ 
    this.renderChart(this.dataCollection,this.options);  //renderchart는 mounted 이후에
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
      const bonbuVocDataUrl=`http://172.21.220.97/api/voc.json/?table=${this.propsdata}&bonbu=${this.selectedBonbu}&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&kind1=jisa&kind2=type`;
      
      await axios.get(bonbuVocDataUrl).then((res)=>{
        this.bonbuVocData=res.data.results;
       
      }).catch((err)=>{
        console.log('데이터를 로드하지 못했습니다.');
      })
              
      this.fillData(this.selectedBonbu)
      this.renderChart(this.dataCollection,this.options);
    },

    async changeBonbuProduct(selectedBonbu,selectedProduct) {
      
      const bonbuVocDataUrl=`http://172.21.220.97/api/voc.json/?table=${this.propsdata}&bonbu=${selectedBonbu}&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&kind1=jisa&kind2=type`;
      
      this.selectedBonbu=selectedBonbu;

      await axios.get(bonbuVocDataUrl).then((res)=>{
        this.bonbuVocData=res.data.results;
      }).catch((err)=>{
        console.log('데이터를 로드하지 못했습니다.');
      })
              
      this.fillData(selectedBonbu)
      this.renderChart(this.dataCollection,this.options);
    },

    fillData(selectedBonbu){
      const yyy=this.getBonbuVocValue(selectedBonbu);

      this.dataCollection={
        labels:yyy.name,
        // labels:kkk.name,
        datasets:[
        
          {
            label:(this.propsdata==='rit'?('유선 해지 징후 VOC') : (this.propsdata==='qit'?('유선 품질 VOC'):(this.propsdata==='rm'?'무선 해지징후 VOC':'무선 품질 VOC'))),
            backgroundColor:['#5CE082','#7CE082','#9CE082','#ACE082','#CCE082'],
            data:yyy.value,
          },
       
        ] 
      }   
    
    },
    getBonbuVocValue(selectedBonbu){    
    
      let bonbuVocDataObj={};  
      // let vocCountSum=0;
            
      let firstJisaName='';
      let secondJisaName='';
      let thirdJisaName='';
      let fourthJisaName='';
      let fifthJisaName='';
      let sixthJisaName='';
      let seventhJisaName='';

      let firstJisaCountSum=0;
      let secondJisaCountSum=0;
      let thirdJisaCountSum=0;
      let fourthJisaCountSum=0;
      let fifthJisaCountSum=0;
      let sixthJisaCountSum=0;
      let seventhJisaCountSum=0;
        
      this.bonbuVocData.map((item,index)=>{
        if(selectedBonbu==='북부고객본부'){
          firstJisaName='고양지사';
          secondJisaName='광진지사';
          thirdJisaName='광화문지사';
          fourthJisaName='노원지사';
          fifthJisaName='서대문지사';
        }
        if(selectedBonbu==='동부고객본부'){
          firstJisaName='강릉지사';
          secondJisaName='구리지사';
          thirdJisaName='원주지사';
          fourthJisaName='의정부지사';
          fifthJisaName='춘천지사';
        }
        if(selectedBonbu==='강남고객본부'){
          firstJisaName='강남지사';
          secondJisaName='분당지사';
          thirdJisaName='송파지사';
          fourthJisaName='수원지사';
          fifthJisaName='용인지사';
          sixthJisaName='평택지사';
        }
        if(selectedBonbu==='충남/충북고객본부'){
          firstJisaName='대전지사';
          secondJisaName='서대전지사';
          thirdJisaName='천안지사';
          fourthJisaName='청주지사';
          fifthJisaName='충주지사';
          sixthJisaName='홍성지사';
        }
        if(selectedBonbu==='대구/경북고객본부'){
          firstJisaName='구미지사';
          secondJisaName='달서지사';
          thirdJisaName='동대구지사';
          fourthJisaName='서대구지사';
          fifthJisaName='안동지사';
          sixthJisaName='포항지사';
        }
        if(selectedBonbu==='부산/경남고객본부'){
          firstJisaName='남부산지사';
          secondJisaName='동부산지사';
          thirdJisaName='동대구지사';
          fourthJisaName='서대구지사';
          fifthJisaName='울산지사';
          sixthJisaName='진주지사';
          seventhJisaName='창원지사';
        }
        if(selectedBonbu==='전남/전북고객본부'){
          firstJisaName='광주지사';
          secondJisaName='목포지사';
          thirdJisaName='순천지사';
          fourthJisaName='익산지사';
          fifthJisaName='전주지사';
        }
        if(selectedBonbu==='서부고객본부'){
          firstJisaName='강서지사';
          secondJisaName='구로지사';
          thirdJisaName='부천지사';
          fourthJisaName='서인천지사';
          fifthJisaName='안산지사';
          sixthJisaName='안양지사';
          seventhJisaName='인천지사';
        }
          
        if(item.bonbu===selectedBonbu){
          if(item.jisa===firstJisaName){
            // firstJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});  //date혈식을 '2021-04-01' 문자열로
            console.log('xxx');
            firstJisaCountSum+=item.count_sum;
          }
          if(item.jisa===secondJisaName){
            secondJisaCountSum+=item.count_sum;
          }
          if(item.jisa===thirdJisaName){
            thirdJisaCountSum+=item.count_sum;
          }
          if(item.jisa===fourthJisaName){
            fourthJisaCountSum+=item.count_sum;
          }
          if(item.jisa===fifthJisaName){
            fifthJisaCountSum+=item.count_sum;
          }
          
        }
      });
    
      //console.log('엄부정책',혜택문의건수);
       
      bonbuVocDataObj={
        'name':[firstJisaName,secondJisaName,thirdJisaName,fourthJisaName,fifthJisaName],
        'value':[firstJisaCountSum,secondJisaCountSum,thirdJisaCountSum,fourthJisaCountSum,fifthJisaCountSum],
       
      }

      // // console.log('bonbuNetIncrease',bonbuVocDataObj['vocCountsum']);
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
