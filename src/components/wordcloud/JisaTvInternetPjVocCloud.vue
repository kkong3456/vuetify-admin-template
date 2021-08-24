<template>
  <word-cloud
    style="
      height:250px;
      width:320px;
    "
    :words="tvInternetVoc"
    :color="([,weight])=>weight>500?'IndianRed':weight>400?'HotPink':weight>300?'Gold':weight>200?'DarkKhaki':weight>150?'Orchid':weight>100?'SlateBlue':weight>50?'Lime':weight>30?'YellowGreen':weight>20?'Cyan':'0'"
    font-family="Roboto"
    rotation-unit="deg"
    :rotation="([,weight])=>weight>500?'90':weight>400?'80':weight>300?'70':weight>200?'60':weight>150?'-50':weight>100?'40':weight>50?'-30':weight>30?'20':weight>200?'-10':'0'"
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
import axios from 'axios';
import WordCloud from 'vuewordcloud';
import eventBus from '@/js/eventBus';

export default {

  name:'JisaTvInternetPjVocCloud',

  components:{
    WordCloud,
  },

  props:{
    'propsbonbudata':{
      type:String,
      default:null,
    },
    'propsjisadata':{
      type:String,
      default:null,
    }
  },
 
  data () {
    return {
      jisaVocData:null,
      jisaVocDataObj:null,  
      tvInternetVoc:[], 
      
      selectedStartDate:'20210420',
      selectedEndDate:'20210426',

      lastWeekStartDate:'20210413',
      lastWeekEndDate:'20210419',
    }
  },
  computed:{
    
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
      const thisDateUrl=`http://172.21.220.97/api/voc.json/?table=qit&bonbu=${this.propsbonbudata}&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&kind1=jisa&kind2=type`;
      const lastDateUrl=`http://172.21.220.97/api/voc.json/?table=qit&bonbu=${this.propsbonbudata}&begin=${this.lastWeekStartDate}&end=${this.lastWeekEndDate}&kind1=jisa&kind2=type`;
      
      await axios.all(
        [
          axios.get(thisDateUrl),
          axios.get(lastDateUrl),
        ]
      ).then(axios.spread((res1,res2)=>{
        this.jisaVocData=res1.data.results;
        this.lastWeekJisaVocData=res2.data.results;
               
      })).catch((err)=>{
        console.log('금주 일자 데이터를 가져 오지 못했습니다');
      });
      
      this.getDesserts();
    },

    async changedJisa(selectedJisa,selectedBonbu) {
      const thisDataUrl=`http://172.21.220.97/api/voc.json/?table=qit&bonbu=${selectedBonbu}&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&kind1=jisa&kind2=type`;
      const lastDataUrl=`http://172.21.220.97/api/voc.json/?table=qit&bonbu=${selectedBonbu}&begin=${this.lastWeekStartDate}&end=${this.lastWeekEndDate}&kind1=jisa&kind2=type`
    
      await axios.all(
        [
          axios.get(thisDataUrl),
          axios.get(lastDataUrl),
        ]
      ).then(axios.spread((res1,res2)=>{
        this.jisaVocData=res1.data.results;
        this.lastWeekJisaVocData=res2.data.results;

      })).catch((err)=>{
        console.log('데이터를 가져 오지 못했습니다.');
      });
        
      this.getDesserts();
    },

    

    getDesserts(){
      const yyy=this.getJisaVocValue();   
       
      let dessertArray=new Array();
    
      for(let i=0;i<yyy.name.length;i++){
        dessertArray.push([yyy['name'][i],yyy['value'][i]]);
      }
     
      //워드 클라우드 그림
      this.tvInternetVoc=dessertArray;
      //금주 해지 VOC 총건수 전달 
      this.pushVocData(yyy);
    }, 

    pushVocData(yyy){
      let xxx=(yyy['vocCountSum']-yyy['lastVocCountSum'])/yyy['lastVocCountSum']*100
      this.$emit('jisaVocItThisSum',yyy['vocCountSum']);
      this.$emit('jisaVocItLastSum',yyy['lastVocCountSum'])
      this.$emit('jisaVocItSumDiff',xxx.toPrecision(3));
    },

    getJisaVocValue(){    
      let jisaVocDataObj={};  
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

      this.jisaVocData.map((item)=>{ 
        if(item.jisa===this.propsjisadata){
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
          // if(item.voc_gubun){
          //   voc39Cnt+=item.count_sum;
          // }  
 
          vocCountSum+=item.count_sum;  
        }          
      });  

      let vocCountArray=[];

      //Voc발생건수를 내림차순으로 정리하여 위에서 부터 10개만 리턴하려고 한다.
      vocCountArray.push(
        {'voc':voc1,'vocCnt':voc1Cnt},
        {'voc':voc2,'vocCnt':voc2Cnt},
        {'voc':voc3,'vocCnt':voc3Cnt},
        {'voc':voc4,'vocCnt':voc4Cnt},
        {'voc':voc5,'vocCnt':voc5Cnt},
        {'voc':voc6,'vocCnt':voc6Cnt},
        {'voc':voc7,'vocCnt':voc7Cnt},
        {'voc':voc8,'vocCnt':voc8Cnt},
        {'voc':voc9,'vocCnt':voc9Cnt},
        {'voc':voc10,'vocCnt':voc10Cnt},
        {'voc':voc11,'vocCnt':voc11Cnt},
        {'voc':voc12,'vocCnt':voc12Cnt},
        {'voc':voc13,'vocCnt':voc13Cnt},
        {'voc':voc14,'vocCnt':voc14Cnt},
        {'voc':voc15,'vocCnt':voc15Cnt},
        {'voc':voc16,'vocCnt':voc16Cnt},
        {'voc':voc17,'vocCnt':voc17Cnt},
        {'voc':voc18,'vocCnt':voc18Cnt},
        {'voc':voc19,'vocCnt':voc19Cnt},
        {'voc':voc20,'vocCnt':voc20Cnt},
        {'voc':voc21,'vocCnt':voc21Cnt},
        {'voc':voc22,'vocCnt':voc22Cnt},
        {'voc':voc23,'vocCnt':voc23Cnt},
        {'voc':voc24,'vocCnt':voc24Cnt},
        {'voc':voc25,'vocCnt':voc25Cnt},
        {'voc':voc26,'vocCnt':voc26Cnt},
        {'voc':voc27,'vocCnt':voc27Cnt},
        {'voc':voc28,'vocCnt':voc28Cnt},
        {'voc':voc29,'vocCnt':voc29Cnt},
        {'voc':voc30,'vocCnt':voc30Cnt},
        {'voc':voc31,'vocCnt':voc31Cnt},
        {'voc':voc32,'vocCnt':voc32Cnt},
        {'voc':voc33,'vocCnt':voc33Cnt},
        {'voc':voc34,'vocCnt':voc34Cnt},
        {'voc':voc35,'vocCnt':voc35Cnt},
        {'voc':voc36,'vocCnt':voc36Cnt},
        {'voc':voc37,'vocCnt':voc37Cnt},
        {'voc':voc38,'vocCnt':voc38Cnt},
        {'voc':voc39,'vocCnt':voc39Cnt},        
      );
      vocCountArray.sort((a,b)=>{
        return b.vocCnt-a.vocCnt;      //vocCnt기준 내림차순 정렬
      });

      console.log('cloud vocCountArray is ', vocCountArray);

      this.lastWeekJisaVocData.map((item)=>{  
        if(item.jisa===this.propsjisadata){
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
          lastVocCountSum+=item.count_sum;
        }        
      });  

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

      return jisaVocDataObj;
    },

  }
}
</script>

<style scoped>
.v-data-table > .v-data-table__wrapper > table >thead > tr > th{
    font-size:1rem;
}
</style>
