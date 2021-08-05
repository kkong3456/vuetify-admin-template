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
import axios from 'axios';
import WordCloud from 'vuewordcloud';
import eventBus from '@/js/eventBus';



// :rotation="([,weight])=>weight>500?'90':weight>400?'80':weight>300?'70':weight>200?'60':weight>150?'-50':weight>100?'40':weight>50?'-30':weight>30?'20':weight>200?'-10':'0'"
export default {

  name:'BonbuTvInternetVocWordCloud',

  components:{
    WordCloud,
  },

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
    }
  },
  computed:{
    
  },

  async created () {

    eventBus.$on('pickedDates',(dateResult)=>{  //RSN_HjVoc.vue에서 기간 선택시 그 자식 컨포넌트인 vue-hotel-datepicker.vue에서 시작일자와 종료일자를 받아옴  
      const imsiThisStart=dateResult.start.replace(/\//gi,',');
      const imsiThisEnd=dateResult.end.replace(/\//gi,',');

      this.lastWeekStart=new Date(imsiThisStart);
      this.lastWeekStart.setDate(this.lastWeekStart.getDate()-7);
      this.lastWeekStart=this.displayDateText(this.lastWeekStart);
      this.lastWeekStartDate=this.lastWeekStart.replace(/\//gi,"");

      this.lastWeekEnd=new Date(imsiThisEnd);
      this.lastWeekEnd.setDate(this.lastWeekEnd.getDate()-7);
      this.lastWeekEnd=this.displayDateText(this.lastWeekEnd);
      this.lastWeekEndDate=this.lastWeekStart.replace(/\//gi,"");

      //console.log('this.lastWeekStart', this.lastWeekStart);
     
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
      const thisDateUrl=`http://172.21.220.97/api/voc.json/?table=rit&bonbu=${this.propsbonbudata}&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&kind1=jisa&kind2=type`;
      const lastDateUrl=`http://172.21.220.97/api/voc.json/?table=rit&bonbu=${this.propsbonbudata}&begin=${this.lastWeekStartDate}&end=${this.lastWeekEndDate}&kind1=jisa&kind2=type`;
      
      await axios.all(
        [
          axios.get(thisDateUrl),
          axios.get(lastDateUrl),
        ]
      ).then(axios.spread((res1,res2)=>{
        this.bonbuVocData=res1.data.results;
        this.lastWeekBonbuVocData=res2.data.results;
        
      })).catch((err)=>{
        console.log('금주 일자 데이터를 가져 오지 못했습니다');
      });
      
      this.getDesserts();
    },

    async changedBonbu(selectedBonbu) {
      const thisDateUrl=`http://172.21.220.97/api/voc.json/?table=rit&bonbu=${selectedBonbu}&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&kind1=jisa&kind2=type`;
      const lastDateUrl=`http://172.21.220.97/api/voc.json/?table=rit&bonbu=${selectedBonbu}&begin=${this.lastWeekStartDate}&end=${this.lastWeekEndDate}&kind1=jisa&kind2=type`
      
      await axios.all(
        [
          axios.get(thisDateUrl),
          axios.get(lastDateUrl),
        ]
      ).then(axios.spread((res1,res2)=>{
        this.bonbuVocData=res1.data.results;
        this.lastWeekBonbuVocData=res2.data.results;
        
      })).catch((err)=>{
        console.log(' 데이터를 가져 오지 못했습니다.');
      })
      this.getDesserts();
    },

    getDesserts(){
      const yyy=this.getBonbuVocValue();
  
      let dessertArray=new Array();
    
      for(let i=0;i<yyy.name.length;i++){
        dessertArray.push([yyy['name'][i],yyy['value'][i]]);
      }
     
      //워드클라우드 그림
      this.tvInternetVoc=dessertArray; 
      
      //금주 해지VOC총 건수 전달
      this.pushVocData(yyy);
      
    }, 

    //RSN_HjVoc.vue에 VoC건수를 제공
    pushVocData(yyy){
      let xxx=(yyy['vocCountSum']-yyy['lastVocCountSum'])/yyy['lastVocCountSum']*100;
      this.$emit('bonbuVocItThisSum',yyy['vocCountSum']);
      this.$emit('bonbuVocItLastSum',yyy['lastVocCountSum']);
      this.$emit('bonbuVocItSumDiff',xxx.toPrecision(3));
    },

  

    wordClickHandler(name,value,vm){
      console.log('');
    },

    getBonbuVocValue(){    
      let bonbuVocDataObj={};  
      let vocCountSum=0;
      let lastVocCountSum=0;
     
    
      const voc1='KT업무/정책불만';
      const voc2='KTShop문의';
      const voc3='서비스불만';
      const voc4='약정문의';
      const voc5='요금불만';
      const voc6='위약금(할인반환금)문의';
      const voc7='품질불만';
      const voc8='혜택문의';

      let KT업무정책불만건수=0;
      let KTShop문의건수=0;
      let 서비스불만건수=0;
      let 약정문의건수=0;
      let 요금불만건수=0;
      let 위약금문의건수=0;
      let 품질불만건수=0;
      let 혜택문의건수=0;

      let KT업무정책불만건수2=0;
      let KTShop문의건수2=0;
      let 서비스불만건수2=0;
      let 약정문의건수2=0;
      let 요금불만건수2=0;
      let 위약금문의건수2=0;
      let 품질불만건수2=0;
      let 혜택문의건수2=0;
      
      this.bonbuVocData.map((item)=>{
        // console.log('this.propsbonbudata',this.propsbonbudata);
        if(item.bonbu===this.propsbonbudata){                   
          if(item.voc_gubun.replace(/ /g,"")===voc1){
            KT업무정책불만건수+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===voc2){
            KTShop문의건수+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===voc3){
            서비스불만건수+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===voc4){
            약정문의건수+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===voc5){
            요금불만건수+=item.count_sum;
          }
          if((item.voc_gubun.replace(/ /g,"")===voc6) || (item.voc_gubun.replace(/ /g,"")==='할인반환금문의')){
            위약금문의건수+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===voc7){
            품질불만건수+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===voc8){
            혜택문의건수+=item.count_sum;
          }  
 
          vocCountSum+=item.count_sum;      
        }       
      });

      this.lastWeekBonbuVocData.map((item)=>{
        // console.log('this.propsbonbudata',this.propsbonbudata);
        if(item.bonbu===this.propsbonbudata){
                    
          if(item.voc_gubun.replace(/ /g,"")===voc1){
            KT업무정책불만건수2+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===voc2){
            KTShop문의건수2+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===voc3){
            서비스불만건수2+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===voc4){
            약정문의건수2+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===voc5){
            요금불만건수2+=item.count_sum;
          }
          if((item.voc_gubun.replace(/ /g,"")===voc6) || (item.voc_gubun.replace(/ /g,"")==='할인반환금문의')){
            위약금문의건수2+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===voc7){
            품질불만건수2+=item.count_sum;
          }
          if(item.voc_gubun.replace(/ /g,"")===voc8){
            혜택문의건수2+=item.count_sum;
          }  
          lastVocCountSum+=item.count_sum;
        }
        
      });    
       
      bonbuVocDataObj={
        'name':[voc1,voc2,voc3,voc4,voc5,voc6,voc7,voc8],
        'value':[KT업무정책불만건수,KTShop문의건수,서비스불만건수,약정문의건수,요금불만건수,위약금문의건수,품질불만건수,혜택문의건수],
        'vocCountSum':vocCountSum,
        'lastVocCountSum':lastVocCountSum,
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
