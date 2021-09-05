
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
    // this.renderChart(this.dataCollection,this.options);
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
      const bonbuVocDataUrl=`http://172.21.220.97/api/voc.json/?table=qm&bonbu=${this.selectedBonbu}&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&kind1=jisa&kind2=type`;
      const lastBonbuVocDataUrl=`http://172.21.220.97/api/voc.json/?table=qm&bonbu=${this.selectedBonbu}&begin=${this.lastWeekStartDate}&end=${this.lastWeekEndDate}&kind1=jisa&kind2=type`;
    
      
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
      
      const bonbuVocDataUrl=`http://172.21.220.97/api/voc.json/?table=qm&bonbu=${selectedBonbu}&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&kind1=jisa&kind2=type`;
      const lastBonbuVocDataUrl=`http://172.21.220.97/api/voc.json/?table=qm&bonbu=${selectedBonbu}&begin=${this.lastWeekStartDate}&end=${this.lastWeekEndDate}&kind1=jisa&kind2=type`;
    
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
        // if(yyy.value[i]>=5 && yyy.lastValue[i]>=5){
        kkk.name.push(yyy.name[i]);
        kkk.value.push(yyy.value[i]);
        kkk.lastValue.push(yyy.lastValue[i]);
        // }
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
            backgroundColor:['#5CE082','#5CE082','#5CE082','#5CE082','#5CE082','#5CE082','#5CE082','#5CE082','#5CE082','#5CE082','#5CE082'],
            data:kkk.value,
          },
       
        ] 
      }   
    
    },
    getBonbuVocValue(){    
    
      let jisaVocDataObj={};  
      let vocCountSum=0;
      let lastVocCountSum=0;
    
      const mvoc1='국제문자';
      const mvoc2='국제전화';
      const mvoc3='다운로드지연/불가';
      const mvoc4='리얼360';
      const mvoc5='발신불가';
      const mvoc6='발신불가/지연';
      const mvoc7='수신불가';
      const mvoc8='수신불가/지연';
      const mvoc9='오전달/중복수신/깨짐';
      const mvoc10='이용불가';
      const mvoc11='접속불가';
      const mvoc12='중계기';
      const mvoc13='통화영상/음질불량';
      const mvoc14='통화음질불량';
      const mvoc15='통화중절단';
      const mvoc16='화면이동지연불가';


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
      
      this.bonbuVocData.map((item)=>{
        // console.log('this.propsbonbudata',this.propsbonbudata);
        //console.log('this.bonbuVocData is xxxx ',item);
        if(item.jisa===this.selectedJisa){                   
          if(item.voc_gubun.replace(/ /g,"")===mvoc1){
            voc1Cnt+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===mvoc2){
            voc2Cnt+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===mvoc3){
            voc3Cnt+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===mvoc4){
            voc4Cnt+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===mvoc5){
            voc5Cnt+=item.count_sum;
          }
          if((item.voc_gubun.replace(/ /g,"")===mvoc6)){
            voc6Cnt+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===mvoc7){
            voc7Cnt+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===mvoc8){
            voc8Cnt+=item.count_sum;
          }  
 
          if(item.voc_gubun.replace(/ /g,"")===mvoc9){
            voc9Cnt+=item.count_sum;
          }  
 
          if(item.voc_gubun.replace(/ /g,"")===mvoc10){
            voc10Cnt+=item.count_sum;
          }  
 
          if(item.voc_gubun.replace(/ /g,"")===mvoc11){
            voc11Cnt+=item.count_sum;
          }  
 
          if(item.voc_gubun.replace(/ /g,"")===mvoc12){
            voc12Cnt+=item.count_sum;
          }  
 
          if(item.voc_gubun.replace(/ /g,"")===mvoc13){
            voc13Cnt+=item.count_sum;
          }  
 
          if(item.voc_gubun.replace(/ /g,"")===mvoc14){
            voc14Cnt+=item.count_sum;
          }  
 
          if(item.voc_gubun.replace(/ /g,"")===mvoc15){
            voc15Cnt+=item.count_sum;
          }  
 
          if(item.voc_gubun.replace(/ /g,"")===mvoc16){
            voc16Cnt+=item.count_sum;
          } 
           
        }       
      });

    

      this.lastWeekBonbuVocData.map((item)=>{
        // console.log('this.propsbonbudata',this.propsbonbudata);
        if(item.jisa===this.selectedJisa){
                       
          if(item.voc_gubun.replace(/ /g,"")===mvoc1){
            voc1Cnt2+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===mvoc2){
            voc2Cnt2+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===mvoc3){
            voc3Cnt2+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===mvoc4){
            voc4Cnt2+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===mvoc5){
            voc5Cnt2+=item.count_sum;
          }
          if((item.voc_gubun.replace(/ /g,"")===mvoc6)){
            voc6Cnt2+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===mvoc7){
            voc7Cnt2+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===mvoc8){
            voc8Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===mvoc8){
            voc8Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===mvoc9){
            voc9Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===mvoc10){
            voc10Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===mvoc11){
            voc11Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===mvoc12){
            voc12Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===mvoc13){
            voc13Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===mvoc14){
            voc14Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===mvoc15){
            voc15Cnt2+=item.count_sum;
          }  
          if(item.voc_gubun.replace(/ /g,"")===mvoc16){
            voc16Cnt2+=item.count_sum;
          } 
        }
        
      });  


      let vocCountArray=[];

      //Voc발생건수를 내림차순으로 정리하여 위에서 부터 10개만 리턴하려고 한다.
      vocCountArray.push(
        {'voc':mvoc1,'vocCnt':voc1Cnt,'lastVocCnt':voc1Cnt2},
        {'voc':mvoc2,'vocCnt':voc2Cnt,'lastVocCnt':voc2Cnt2},
        {'voc':mvoc3,'vocCnt':voc3Cnt,'lastVocCnt':voc3Cnt2},
        {'voc':mvoc4,'vocCnt':voc4Cnt,'lastVocCnt':voc4Cnt2},
        {'voc':mvoc5,'vocCnt':voc5Cnt,'lastVocCnt':voc5Cnt2},
        {'voc':mvoc6,'vocCnt':voc6Cnt,'lastVocCnt':voc6Cnt2},
        {'voc':mvoc7,'vocCnt':voc7Cnt,'lastVocCnt':voc7Cnt2},
        {'voc':mvoc8,'vocCnt':voc8Cnt,'lastVocCnt':voc8Cnt2},
        {'voc':mvoc9,'vocCnt':voc9Cnt,'lastVocCnt':voc9Cnt2},
        {'voc':mvoc10,'vocCnt':voc10Cnt,'lastVocCnt':voc10Cnt2},
        {'voc':mvoc11,'vocCnt':voc11Cnt,'lastVocCnt':voc11Cnt2},
        {'voc':mvoc12,'vocCnt':voc12Cnt,'lastVocCnt':voc12Cnt2},
        {'voc':mvoc13,'vocCnt':voc13Cnt,'lastVocCnt':voc13Cnt2},
        {'voc':mvoc14,'vocCnt':voc14Cnt,'lastVocCnt':voc14Cnt2},
        {'voc':mvoc15,'vocCnt':voc15Cnt,'lastVocCnt':voc15Cnt2},
        {'voc':mvoc16,'vocCnt':voc16Cnt,'lastVocCnt':voc16Cnt2},
     
      );

      
      vocCountArray.sort((a,b)=>{
        return b.vocCnt-a.vocCnt;      //vocCnt기준 내림차순 정렬
      });
   
      // Top 10만 선정
      let etcCnt=0;  //Top 0 이하 합계
      let lastEtcCnt=0;


      etcCnt=vocCountArray[10].vocCnt+vocCountArray[11].vocCnt+vocCountArray[12].vocCnt+vocCountArray[13].vocCnt+vocCountArray[14].vocCnt
            +vocCountArray[15].vocCnt;
      lastEtcCnt=vocCountArray[10].lastVocCnt+vocCountArray[11].lastVocCnt+vocCountArray[12].lastVocCnt+vocCountArray[13].lastVocCnt+vocCountArray[14].lastVocCnt
            +vocCountArray[15].lastVocCnt;

           
      jisaVocDataObj={
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
      return jisaVocDataObj;
    },

  }
}
</script>

<style>
.v-data-table > .v-data-table__wrapper > table >thead > tr > th{
    font-size:1rem;
}

</style>
