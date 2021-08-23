
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
      const bonbuVocDataUrl=`http://172.21.220.97/api/voc.json/?table=qit&bonbu=${this.selectedBonbu}&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&kind1=jisa&kind2=type`;
      const lastBonbuVocDataUrl=`http://172.21.220.97/api/voc.json/?table=qit&bonbu=${this.selectedBonbu}&begin=${this.lastWeekStartDate}&end=${this.lastWeekEndDate}&kind1=jisa&kind2=type`;
    
      
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
      
      const bonbuVocDataUrl=`http://172.21.220.97/api/voc.json/?table=qit&bonbu=${selectedBonbu}&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&kind1=jisa&kind2=type`;
      const lastBonbuVocDataUrl=`http://172.21.220.97/api/voc.json/?table=qit&bonbu=${selectedBonbu}&begin=${this.lastWeekStartDate}&end=${this.lastWeekEndDate}&kind1=jisa&kind2=type`;
    
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
            label:yyy.jisa+'[유선-전주]',          
            data:kkk.lastValue,
          },
          {
            label:yyy.jisa+'[유선-금주]',
            backgroundColor:['#5CE082','#5CE082','#5CE082','#5CE082','#5CE082','#5CE082','#5CE082'],
            data:kkk.value,
          },
       
        ] 
      }   
    
    },
    getBonbuVocValue(){    
    
      let bonbuVocDataObj={};  
      let vocCountSum=0;
      let lastVocCountSum=0;
     
    
      const voc1='발열,배터리등단말이상';
      const voc2='부주의,ID/PW분실등';
      const voc3='전원,충전이상';
      const voc4='AS보류(유료화)';
      const voc5='IP공유기이상';
      const voc6='PIN인증오류';
      const voc7='STB(부팅)이상';
      const voc8='STB(작동)이상';
      const voc9='STB무선연결이상';
      const voc10='USB포트인식불가';
      const voc11='air전원불량';
      const voc12='네트워크오류';
      const voc13='네트워크장비장애';
      const voc14='리모콘작동불가';
      const voc15='메뉴실행불가';
      const voc16='모뎀이상';
      const voc17='수신불량';
      const voc18='수신카드(UICC포함)';
      const voc19='스피커이상(기가지니)';
      const voc20='양방향서비스사용불가';
      const voc21='온라인학습접속불가';
      const voc22='온라인학습접속지연/끊김';
      const voc23='음성이상';
      const voc24='음성인식이상(기가지니)';
      const voc25='이용불가';
      const voc26='인증실패';
      const voc27='자막이상';
      const voc28='전국장애';
      const voc29='전환지연';
      const voc30='접속불가';
      const voc31='접속지연/끊김';
      const voc32='증설/구내선정리요청';
      const voc33='채널편성표없음';
      const voc34='케이블(전송로)장애';
      const voc35='클린DNS시스템관련문의';
      const voc36='타사및기타장애';
      const voc37='특이고장';
      const voc38='화질이상';
      const voc39='기타';


      let voc1Cnt=0;
      let voc2Cnt=0;
      let voc3Cnt=0;
      let voc4Cnt=0;
      let voc5Cnt=0;
      let voc6Cnt=0;
      let voc7Cnt=0;
      let voc8Cnt=0;
      let voc9Cnt=0;
      let voc10Cnt=0;
      let voc11Cnt=0;
      let voc12Cnt=0;
      let voc13Cnt=0;
      let voc14Cnt=0;
      let voc15Cnt=0;
      let voc16Cnt=0;
      let voc17Cnt=0;
      let voc18Cnt=0;
      let voc19Cnt=0;
      let voc20Cnt=0;
      let voc21Cnt=0;
      let voc22Cnt=0;
      let voc23Cnt=0;
      let voc24Cnt=0;
      let voc25Cnt=0;
      let voc26Cnt=0;
      let voc27Cnt=0;
      let voc28Cnt=0;
      let voc29Cnt=0;
      let voc30Cnt=0;
      let voc31Cnt=0;
      let voc32Cnt=0;
      let voc33Cnt=0;
      let voc34Cnt=0;
      let voc35Cnt=0;
      let voc36Cnt=0;
      let voc37Cnt=0;
      let voc38Cnt=0;
      let voc39Cnt=0;
  
      let voc1Cnt2=0;
      let voc2Cnt2=0;
      let voc3Cnt2=0;
      let voc4Cnt2=0;
      let voc5Cnt2=0;
      let voc6Cnt2=0;
      let voc7Cnt2=0;
      let voc8Cnt2=0;
      let voc9Cnt2=0;
      let voc10Cnt2=0;
      let voc11Cnt2=0;
      let voc12Cnt2=0;
      let voc13Cnt2=0;
      let voc14Cnt2=0;
      let voc15Cnt2=0;
      let voc16Cnt2=0;
      let voc17Cnt2=0;
      let voc18Cnt2=0;
      let voc19Cnt2=0;
      let voc20Cnt2=0;
      let voc21Cnt2=0;
      let voc22Cnt2=0;
      let voc23Cnt2=0;
      let voc24Cnt2=0;
      let voc25Cnt2=0;
      let voc26Cnt2=0;
      let voc27Cnt2=0;
      let voc28Cnt2=0;
      let voc29Cnt2=0;
      let voc30Cnt2=0;
      let voc31Cnt2=0;
      let voc32Cnt2=0;
      let voc33Cnt2=0;
      let voc34Cnt2=0;
      let voc35Cnt2=0;
      let voc36Cnt2=0;
      let voc37Cnt2=0;
      let voc38Cnt2=0;
      let voc39Cnt2=0;
      
      this.bonbuVocData.map((item)=>{
        // console.log('this.propsbonbudata',this.propsbonbudata);
        //console.log('this.bonbuVocData is xxxx ',item);
        if(item.jisa===this.selectedJisa){                   
          if(item.voc_gubun.replace(/ /g,"")===voc1){
            voc1Cnt+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===voc2){
            voc2Cnt+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===voc3){
            voc3Cnt+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===voc4){
            voc4Cnt+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===voc5){
            voc5Cnt+=item.count_sum;
          }
          if((item.voc_gubun.replace(/ /g,"")===voc6)){
            voc6Cnt+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===voc7){
            voc7Cnt+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===voc8){
            voc8Cnt+=item.count_sum;
          }  
 
          if(item.voc_gubun.replace(/ /g,"")===voc9){
            voc9Cnt+=item.count_sum;
          }  
 
          if(item.voc_gubun.replace(/ /g,"")===voc10){
            voc10Cnt+=item.count_sum;
          }  
 
          if(item.voc_gubun.replace(/ /g,"")===voc11){
            voc11Cnt+=item.count_sum;
          }  
 
          if(item.voc_gubun.replace(/ /g,"")===voc12){
            voc12Cnt+=item.count_sum;
          }  
 
          if(item.voc_gubun.replace(/ /g,"")===voc13){
            voc13Cnt+=item.count_sum;
          }  
 
          if(item.voc_gubun.replace(/ /g,"")===voc14){
            voc14Cnt+=item.count_sum;
          }  
 
          if(item.voc_gubun.replace(/ /g,"")===voc15){
            voc15Cnt+=item.count_sum;
          }  
 
          if(item.voc_gubun.replace(/ /g,"")===voc16){
            voc16Cnt+=item.count_sum;
          }  
 
          if(item.voc_gubun.replace(/ /g,"")===voc17){
            voc17Cnt+=item.count_sum;
          }  
 
          if(item.voc_gubun.replace(/ /g,"")===voc18){
            voc18Cnt+=item.count_sum;
          }  
 
          if(item.voc_gubun.replace(/ /g,"")===voc19){
            voc19Cnt+=item.count_sum;
          }  
 
          if(item.voc_gubun.replace(/ /g,"")===voc20){
            voc20Cnt+=item.count_sum;
          }  
 
          if(item.voc_gubun.replace(/ /g,"")===voc21){
            voc21Cnt+=item.count_sum;
          }  
 
          if(item.voc_gubun.replace(/ /g,"")===voc22){
            voc22Cnt+=item.count_sum;
          }  
 
          if(item.voc_gubun.replace(/ /g,"")===voc23){
            voc23Cnt+=item.count_sum;
          }  
 
          if(item.voc_gubun.replace(/ /g,"")===voc24){
            voc24Cnt+=item.count_sum;
          }  
 
          if(item.voc_gubun.replace(/ /g,"")===voc25){
            voc25Cnt+=item.count_sum;
          }  
 
          if(item.voc_gubun.replace(/ /g,"")===voc26){
            voc26Cnt+=item.count_sum;
          }  
 
          if(item.voc_gubun.replace(/ /g,"")===voc27){
            voc27Cnt+=item.count_sum;
          }  
 
          if(item.voc_gubun.replace(/ /g,"")===voc28){
            voc28Cnt+=item.count_sum;
          }  
 
          if(item.voc_gubun.replace(/ /g,"")===voc29){
            voc29Cnt+=item.count_sum;
          }  
 
          if(item.voc_gubun.replace(/ /g,"")===voc30){
            voc30Cnt+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc31){
            voc31Cnt+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc32){
            voc32Cnt+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc33){
            voc33Cnt+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc34){
            voc34Cnt+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc35){
            voc35Cnt+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc36){
            voc36Cnt+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc37){
            voc37Cnt+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc38){
            voc38Cnt+=item.count_sum;
          }  
           
        }       
      });

    

      this.lastWeekBonbuVocData.map((item)=>{
        // console.log('this.propsbonbudata',this.propsbonbudata);
        if(item.jisa===this.selectedJisa){
                    
          if(item.voc_gubun.replace(/ /g,"")===voc1){
            voc1Cnt2+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===voc2){
            voc2Cnt2+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===voc3){
            voc3Cnt2+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===voc4){
            voc4Cnt2+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===voc5){
            voc5Cnt2+=item.count_sum;
          }
          if((item.voc_gubun.replace(/ /g,"")===voc6)){
            voc6Cnt2+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===voc7){
            voc7Cnt2+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===voc8){
            voc8Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc8){
            voc8Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc9){
            voc9Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc10){
            voc10Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc11){
            voc11Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc12){
            voc12Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc13){
            voc13Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc14){
            voc14Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc15){
            voc15Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc16){
            voc16Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc17){
            voc17Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc18){
            voc18Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc19){
            voc19Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc20){
            voc20Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc21){
            voc21Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc22){
            voc22Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc23){
            voc23Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc24){
            voc24Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc25){
            voc25Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc26){
            voc26Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc27){
            voc27Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc28){
            voc28Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc29){
            voc29Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc30){
            voc30Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc31){
            voc31Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc32){
            voc32Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc33){
            voc33Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc34){
            voc34Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc35){
            voc35Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc36){
            voc36Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc37){
            voc37Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc38){
            voc38Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===voc39){
            voc39Cnt2+=item.count_sum;
          }
        }
        
      });  


      let vocCountArray=[];

      //Voc발생건수를 내림차순으로 정리하여 위에서 부터 10개만 리턴하려고 한다.
      vocCountArray.push(
        {'voc':voc1,'vocCnt':voc1Cnt,'lastVocCnt':voc1Cnt2},
        {'voc':voc2,'vocCnt':voc2Cnt,'lastVocCnt':voc2Cnt2},
        {'voc':voc3,'vocCnt':voc3Cnt,'lastVocCnt':voc3Cnt2},
        {'voc':voc4,'vocCnt':voc4Cnt,'lastVocCnt':voc4Cnt2},
        {'voc':voc5,'vocCnt':voc5Cnt,'lastVocCnt':voc5Cnt2},
        {'voc':voc6,'vocCnt':voc6Cnt,'lastVocCnt':voc6Cnt2},
        {'voc':voc7,'vocCnt':voc7Cnt,'lastVocCnt':voc7Cnt2},
        {'voc':voc8,'vocCnt':voc8Cnt,'lastVocCnt':voc8Cnt2},
        {'voc':voc9,'vocCnt':voc9Cnt,'lastVocCnt':voc9Cnt2},
        {'voc':voc10,'vocCnt':voc10Cnt,'lastVocCnt':voc10Cnt2},
        {'voc':voc11,'vocCnt':voc11Cnt,'lastVocCnt':voc11Cnt2},
        {'voc':voc12,'vocCnt':voc12Cnt,'lastVocCnt':voc12Cnt2},
        {'voc':voc13,'vocCnt':voc13Cnt,'lastVocCnt':voc13Cnt2},
        {'voc':voc14,'vocCnt':voc14Cnt,'lastVocCnt':voc14Cnt2},
        {'voc':voc15,'vocCnt':voc15Cnt,'lastVocCnt':voc15Cnt2},
        {'voc':voc16,'vocCnt':voc16Cnt,'lastVocCnt':voc16Cnt2},
        {'voc':voc17,'vocCnt':voc17Cnt,'lastVocCnt':voc17Cnt2},
        {'voc':voc18,'vocCnt':voc18Cnt,'lastVocCnt':voc18Cnt2},
        {'voc':voc19,'vocCnt':voc19Cnt,'lastVocCnt':voc19Cnt2},
        {'voc':voc20,'vocCnt':voc20Cnt,'lastVocCnt':voc20Cnt2},
        {'voc':voc21,'vocCnt':voc21Cnt,'lastVocCnt':voc21Cnt2},
        {'voc':voc22,'vocCnt':voc22Cnt,'lastVocCnt':voc22Cnt2},
        {'voc':voc23,'vocCnt':voc23Cnt,'lastVocCnt':voc23Cnt2},
        {'voc':voc24,'vocCnt':voc24Cnt,'lastVocCnt':voc24Cnt2},
        {'voc':voc25,'vocCnt':voc25Cnt,'lastVocCnt':voc25Cnt2},
        {'voc':voc26,'vocCnt':voc26Cnt,'lastVocCnt':voc26Cnt2},
        {'voc':voc27,'vocCnt':voc27Cnt,'lastVocCnt':voc27Cnt2},
        {'voc':voc28,'vocCnt':voc28Cnt,'lastVocCnt':voc28Cnt2},
        {'voc':voc29,'vocCnt':voc29Cnt,'lastVocCnt':voc29Cnt2},
        {'voc':voc30,'vocCnt':voc30Cnt,'lastVocCnt':voc30Cnt2},
        {'voc':voc31,'vocCnt':voc31Cnt,'lastVocCnt':voc31Cnt2},
        {'voc':voc32,'vocCnt':voc32Cnt,'lastVocCnt':voc32Cnt2},
        {'voc':voc33,'vocCnt':voc33Cnt,'lastVocCnt':voc33Cnt2},
        {'voc':voc34,'vocCnt':voc34Cnt,'lastVocCnt':voc34Cnt2},
        {'voc':voc35,'vocCnt':voc35Cnt,'lastVocCnt':voc35Cnt2},
        {'voc':voc36,'vocCnt':voc36Cnt,'lastVocCnt':voc36Cnt2},
        {'voc':voc37,'vocCnt':voc37Cnt,'lastVocCnt':voc37Cnt2},
        {'voc':voc38,'vocCnt':voc38Cnt,'lastVocCnt':voc38Cnt2},
        {'voc':voc39,'vocCnt':voc39Cnt,'lastVocCnt':voc39Cnt2},        
      );
      vocCountArray.sort((a,b)=>{
        return b.vocCnt-a.vocCnt;      //vocCnt기준 내림차순 정렬
      });

      
      // Top 10만 선정
      let etcCnt=0;  //Top 0 이하 합계
      let lastEtcCnt=0;

      etcCnt=vocCountArray[10].vocCnt+vocCountArray[11].vocCnt+vocCountArray[12].vocCnt+vocCountArray[13].vocCnt+vocCountArray[14].vocCnt+vocCountArray[15].vocCnt+vocCountArray[16].vocCnt+vocCountArray[17].vocCnt
            +vocCountArray[18].vocCnt+vocCountArray[19].vocCnt+vocCountArray[20].vocCnt+vocCountArray[21].vocCnt+vocCountArray[22].vocCnt+vocCountArray[23].vocCnt+vocCountArray[24].vocCnt+vocCountArray[25].vocCnt
            +vocCountArray[26].vocCnt+vocCountArray[27].vocCnt+vocCountArray[28].vocCnt+vocCountArray[29].vocCnt+vocCountArray[30].vocCnt+vocCountArray[31].vocCnt+vocCountArray[32].vocCnt+vocCountArray[33].vocCnt


      lastEtcCnt=vocCountArray[10].lastVocCnt+vocCountArray[11].lastVocCnt+vocCountArray[12].lastVocCnt+vocCountArray[13].lastVocCnt+vocCountArray[14].lastVocCnt+vocCountArray[15].lastVocCnt+vocCountArray[16].lastVocCnt+vocCountArray[17].lastVocCnt
            +vocCountArray[18].lastVocCnt+vocCountArray[19].lastVocCnt+vocCountArray[20].lastVocCnt+vocCountArray[21].lastVocCnt+vocCountArray[22].lastVocCnt+vocCountArray[23].lastVocCnt+vocCountArray[24].lastVocCnt+vocCountArray[25].lastVocCnt
            +vocCountArray[26].lastVocCnt+vocCountArray[27].lastVocCnt+vocCountArray[28].lastVocCnt+vocCountArray[29].lastVocCnt+vocCountArray[30].lastVocCnt+vocCountArray[31].lastVocCnt+vocCountArray[32].lastVocCnt+vocCountArray[33].lastVocCnt

      //console.log('vocCountArray 18',vocCountArray);
       
      bonbuVocDataObj={
        'name':
          [
            vocCountArray[0].voc,
            vocCountArray[1].voc,
            vocCountArray[2].voc,
            vocCountArray[3].voc,
            vocCountArray[4].voc,
            vocCountArray[5].voc,
            vocCountArray[6].voc,
            vocCountArray[7].voc,
            vocCountArray[8].voc,
            vocCountArray[9].voc,   
            '기타',            
          ],
        'value':
          [
            vocCountArray[0].vocCnt,
            vocCountArray[1].vocCnt,
            vocCountArray[2].vocCnt,
            vocCountArray[3].vocCnt,
            vocCountArray[4].vocCnt,
            vocCountArray[5].vocCnt,
            vocCountArray[6].vocCnt,
            vocCountArray[7].vocCnt,
            vocCountArray[8].vocCnt,
            vocCountArray[9].vocCnt,
            etcCnt,
            
          ],
        'lastValue':
          [
            vocCountArray[0].lastVocCnt,
            vocCountArray[1].lastVocCnt,
            vocCountArray[2].lastVocCnt,
            vocCountArray[3].lastVocCnt,
            vocCountArray[4].lastVocCnt,
            vocCountArray[5].lastVocCnt,
            vocCountArray[6].lastVocCnt,
            vocCountArray[7].lastVocCnt,
            vocCountArray[8].lastVocCnt,
            vocCountArray[9].lastVocCnt,
            lastEtcCnt,
          ],
        'jisa': this.selectedJisa,
      }
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
