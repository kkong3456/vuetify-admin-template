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
    spacing="5"
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

const bonbuVocUrl=`http://172.21.220.97/api/voc.json/?table=rm&bonbu=북부고객본부&begin=20210401&end=20210430&kind1=jisa&kind2=type`;

export default {

  name:'BonbuMobileVocWordCloud',

  components:{
    WordCloud,
  },

  props:['propsbonbudata','propsjisadata'],
 
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

      console.log('금주 시작은 ',this.selectedStartDate);
      console.log('금주 마지막은' ,this.selectedEndDate);
     
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
      const thisDataUrl=`http://172.21.220.97/api/voc.json/?table=rm&bonbu=${this.propsbonbudata}&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&kind1=jisa&kind2=type`;
      const lastDataUrl=`http://172.21.220.97/api/voc.json/?table=rm&bonbu=${this.propsbonbudata}&begin=${this.lastWeekStartDate}&end=${this.lastWeekEndDate}&kind1=jisa&kind2=type`;

      console.log(thisDataUrl);
      console.log(lastDataUrl);
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

      const thisDataUrl=`http://172.21.220.97/api/voc.json/?table=rm&bonbu=${this.propsbonbudata}&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&kind1=jisa&kind2=type`;
      const lastDataUrl=`http://172.21.220.97/api/voc.json/?table=rm&bonbu=${this.propsbonbudata}&begin=${this.lastWeekStartDate}&end=${this.lastWeekEndDate}&kind1=jisa&kind2=type`;

      await axios.all(
        [
          axios.get(thisDataUrl),
          axios.get(lastDataUrl),
        ]
      ).then(axios.spread((res1,res2)=>{
        this.bonbuVocData=res1.data.results;
        this.lastWeekBonbuVocData=res2.data.results;

        console.log('this.bonbuVocData',this.bonbuVocData);
        console.log('lastWeek',this.lastWeekBonbuVocData);
      }));

      // await axios.get([`http://172.21.220.97/api/voc.json/?table=rm&bonbu=${this.selectedStartDate}&begin=20210401&end=${this.selectedEndDate}&kind1=jisa&kind2=type`]).then((res)=>{
      //   this.bonbuVocData=res.data.results;
      // }).catch((err)=>{
      //   console.log('데이터를 가져오지 못했습니다.');
      // });
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
              
        if(item.voc_gubun.replace(/ /g,"")===mvoc1){
          단말기할부대금건수+=item.count_sum;
         
        }
        if(item.voc_gubun.replace(/ /g,"")===mvoc2){
          무선약정문의건수+=item.count_sum;
        }
        if(item.voc_gubun.replace(/ /g,"")===mvoc3){
          위약금문의건수+=item.count_sum;
        }
        vocCountSum+=item.count_sum;
      }); 

      this.lastWeekBonbuVocData.map((item)=>{ 
              
        if(item.voc_gubun.replace(/ /g,"")===mvoc1){
          단말기할부대금건수2+=item.count_sum;
         
        }
        if(item.voc_gubun.replace(/ /g,"")===mvoc2){
          무선약정문의건수2+=item.count_sum;
        }
        if(item.voc_gubun.replace(/ /g,"")===mvoc3){
          위약금문의건수2+=item.count_sum;
        }
        lastVocCountSum+=item.count_sum;
      }); 
      // console.log('이지사의 실적은',[단말기할부대금건수,무선약정문의건수,위약금문의건수]);
      
      bonbuVocDataObj={
        'name':[mvoc1,mvoc2,mvoc3],
        'value':[단말기할부대금건수,무선약정문의건수,위약금문의건수],
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
