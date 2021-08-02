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
      bonbuVocDataObj:null,  
      mobileVoc:new Array(),

      selectedStartDate:'20210420',
      selectedEndDate:'20210426',
    }
  },
  computed:{},//computed

  async created () {

    eventBus.$on('pickedDates',(dateResult)=>{  //RSN_HjVoc.vue에서 기간 선택시 그 자식 컨포넌트인 vue-hotel-datepicker.vue에서 시작일자와 종료일자를 받아옴
      this.selectedStartDate=dateResult.start;
      this.selectedStartDate=this.selectedStartDate.replace(/\//gi,"");
      this.selectedEndDate=dateResult.end;
      this.selectedEndDate=this.selectedEndDate.replace(/\//gi,"");   
     
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

    async changeDate(){
      await axios.get([`http://172.21.220.97/api/voc.json/?table=rm&bonbu=${this.propsbonbudata}&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&kind1=jisa&kind2=type`]).then((res)=>{
        this.bonbuVocData=res.data.results;
      }).catch((err)=>{
        console.log('데이터를 가져 오지 못했습니다');
      });
    
      this.getDesserts();
    },

    async changedBonbu(selectedBonbu) {
      await axios.get([`http://172.21.220.97/api/voc.json/?table=rm&bonbu=${this.selectedStartDate}&begin=20210401&end=${this.selectedEndDate}&kind1=jisa&kind2=type`]).then((res)=>{
        this.bonbuVocData=res.data.results;
      }).catch((err)=>{
        console.log('데이터를 가져오지 못했습니다.');
      });
      this.getDesserts();
    },

    getDesserts(){
      const yyy=this.getJisaVocValue();
     
      let dessertArray=new Array();

      for(let i=0;i<yyy.name.length;i++){
        
        dessertArray.push([yyy['name'][i],yyy['value'][i]]);
        
      }
      this.mobileVoc=dessertArray;
    }, 

    getJisaVocValue(){    
      let bonbuVocDataObj={};  
      let vocCountSum=0;
    
      const mvoc1='단말기할부대금및잔여기간문의';
      const mvoc2='약정문의';
      const mvoc3='위약금(할인반환금)문의';

      let 단말기할부대금건수=0;
      let 무선약정문의건수=0;
      let 위약금문의건수=0;
      
      
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
        vocCountSum+=parseInt(item.count_sum);
      }); 

      // console.log('이지사의 실적은',[단말기할부대금건수,무선약정문의건수,위약금문의건수]);
      
      bonbuVocDataObj={
        'name':[mvoc1,mvoc2,mvoc3],
        'value':[단말기할부대금건수,무선약정문의건수,위약금문의건수],
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
