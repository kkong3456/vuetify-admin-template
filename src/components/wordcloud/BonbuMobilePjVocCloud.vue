<template>
  <word-cloud
    style="
      height:250px;
      width:320px;
    "
    :words="mobileVoc"
    :color="([,weight])=>weight>500?'IndianRed':weight>400?'HotPink':weight>300?'Gold':weight>200?'DarkKhaki':weight>150?'Orchid':weight>100?'SlateBlue':weight>50?'Lime':weight>30?'YellowGreen':weight>20?'Cyan':'0'"
    font-family="Roboto"
    rotation-unit="deg"
   
    :font-size-ratio="5"
    :spacing="5"
    font-weight="normal"
  >
    <template slot-scope="{text,weight,word}">
      <div
        :title="weight"
        style="cursor:pointer;"
        @click="onWordClick(word,text)"
      >
        {{ text }}
      </div>
    </template>
  </word-cloud>
</template>
<script>
//  :rotation="([,weight])=>weight>500?'90':weight>400?'80':weight>300?'70':weight>200?'60':weight>150?'-50':weight>100?'40':weight>50?'-30':weight>30?'20':weight>200?'-10':'0'"
import axios from 'axios';
import WordCloud from 'vuewordcloud';
import eventBus from '@/js/eventBus';

export default {

  name:'BonbuMobileVocWordCloud',

  components:{
    WordCloud,
  },

  props:{
    'propsbonbudata':{
      type:String,
      default:undefined,
    }
  },
 
  data () {
    return {
      bonbuVocData:null,
      lastWeekBonbuVocData:null,
      bonbuVocDataObj:null,  
      mobileVoc:new Array(),

      selectedStartDate:'20210420',
      selectedEndDate:'20210426',
 
      lastWeekStartDate:'20210413',
      lastWeekEndDate:'20210419',
    }
  },
  computed:{},//computed

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
    onWordClick(word,text){
      alert(word[0]+':'+word[1]+'건입니다.');
    },

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
      const thisDataUrl=`http://172.21.220.97/api/voc.json/?table=qm&bonbu=${this.propsbonbudata}&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&kind1=jisa&kind2=type`;
      const lastDataUrl=`http://172.21.220.97/api/voc.json/?table=qm&bonbu=${this.propsbonbudata}&begin=${this.lastWeekStartDate}&end=${this.lastWeekEndDate}&kind1=jisa&kind2=type`;

      await axios.all(
        [
          axios.get(thisDataUrl),
          axios.get(lastDataUrl),
        ]
      ).then(axios.spread((res1,res2)=>{
        this.bonbuVocData=res1.data.results;
        this.lastWeekBonbuVocData=res2.data.results;
      }));
    
      this.getDesserts();
    },

    async changedBonbu(selectedBonbu) {

      // selectedBonbu 대신 this.propsbonbudata를 사용하면 오류가 난다??
      const thisDataUrl=`http://172.21.220.97/api/voc.json/?table=qm&bonbu=${selectedBonbu}&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&kind1=jisa&kind2=type`;
      const lastDataUrl=`http://172.21.220.97/api/voc.json/?table=qm&bonbu=${selectedBonbu}&begin=${this.lastWeekStartDate}&end=${this.lastWeekEndDate}&kind1=jisa&kind2=type`;

      await axios.all(
        [
          axios.get(thisDataUrl),
          axios.get(lastDataUrl),
        ]
      ).then(axios.spread((res1,res2)=>{
        this.bonbuVocData=res1.data.results;
        this.lastWeekBonbuVocData=res2.data.results;
      })).catch((err)=>{
        console.log('본부 모바일 VOC데이터를 가져오지 못했습니다');
      });

     
      this.getDesserts();
    },

    getDesserts(){
      const yyy=this.getBonbuVocValue();
     
      let dessertArray=new Array();

      for(let i=0;i<yyy.name.length;i++){
        
        dessertArray.push([yyy['name'][i],yyy['value'][i]]);
        
      }
      this.mobileVoc=dessertArray;
      //금주 해지 VOC 총 건수 전달
      this.pushVocData(yyy);
    }, 

    pushVocData(yyy){
      let xxx=(yyy['vocCountSum']-yyy['lastVocCountSum'])/yyy['lastVocCountSum']*100;
      
      this.$emit('bonbuVocMobileThisSum',yyy['vocCountSum']);
      this.$emit('bonbuVocMobileLastSum',yyy['lastVocCountSum']);
      this.$emit('bonbuVocMobileSumDiff',xxx.toPrecision(3));
    },

    getBonbuVocValue(){    
      let bonbuVocDataObj={};  
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
              
        if(item.bonbu===this.propsbonbudata){                   
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
          vocCountSum+=item.count_sum;  
        }
       
      }); 

      let vocCountArray=[];

      //Voc발생건수를 내림차순으로 정리하여 위에서 부터 10개만 리턴하려고 한다.
      vocCountArray.push(
        {'voc':mvoc1,'vocCnt':voc1Cnt},
        {'voc':mvoc2,'vocCnt':voc2Cnt},
        {'voc':mvoc3,'vocCnt':voc3Cnt},
        {'voc':mvoc4,'vocCnt':voc4Cnt},
        {'voc':mvoc5,'vocCnt':voc5Cnt},
        {'voc':mvoc6,'vocCnt':voc6Cnt},
        {'voc':mvoc7,'vocCnt':voc7Cnt},
        {'voc':mvoc8,'vocCnt':voc8Cnt},
        {'voc':mvoc9,'vocCnt':voc9Cnt},
        {'voc':mvoc10,'vocCnt':voc10Cnt},
        {'voc':mvoc11,'vocCnt':voc11Cnt},
        {'voc':mvoc12,'vocCnt':voc12Cnt},
        {'voc':mvoc13,'vocCnt':voc13Cnt},
        {'voc':mvoc14,'vocCnt':voc14Cnt},
        {'voc':mvoc15,'vocCnt':voc15Cnt},
        {'voc':mvoc16,'vocCnt':voc16Cnt},
      
      );
      vocCountArray.sort((a,b)=>{
        return b.vocCnt-a.vocCnt;      //vocCnt기준 내림차순 정렬
      });

      this.lastWeekBonbuVocData.map((item)=>{
        // console.log('this.propsbonbudata',this.propsbonbudata);
        if(item.bonbu===this.propsbonbudata){
                    
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

          lastVocCountSum+=item.count_sum;
        }
        
      });    
     
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
          ],
        'vocCountSum':vocCountSum,
        'lastVocCountSum':lastVocCountSum,
      }
      return bonbuVocDataObj;
    },

  }
}
</script>

<style scoped>
.v-data-table > .v-data-table__wrapper > table >thead > tr > th{
    font-size:1rem;
}
</style>
