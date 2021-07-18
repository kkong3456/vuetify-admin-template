<template>
  <word-cloud
    :data="tvInternetVoc"
    name-key="name"
    value-key="value"
    :color="Accent"
    :show-tooltip="false"
    :word-click="wordClickHandler"
    :word-padding="0"
  />
</template>
<script>
import axios from 'axios';
import WordCloud from 'vue-wordcloud';
const bonbuVocUrl=`http://172.21.220.97/api/voc.json/?table=rit&bonbu=북부고객본부&begin=20210401&end=20210430&kind1=jisa&kind2=type`;

export default {

  name:'JisaTvInternetVocWordCloud',

  components:{
    WordCloud,
  },

  props:['propsbonbudata','propsjisadata'],
 
  data () {
    return {
      bonbuVocData:null,
      bonbuVocDataObj:null,  
      tvInternetVoc:[],  
    }
  },
  computed:{
    
  },//computed

  async created () {
        
    await axios.get([bonbuVocUrl]).then((res)=>{
      this.bonbuVocData=res.data.results;
    }).catch((err)=>{
      console.log('데이터를 가져 오지 못했습니다');
    });
    //this.getBonbuNetIncreaseValue();
    this.getDesserts();
  },

  mounted(){
    
  },

  methods: {  
    async changedJisa(selectedJisa) {
      await axios.get([`http://172.21.220.97/api/voc.json/?table=rit&bonbu=${this.propsbonbudata}&begin=20210401&end=20210430&kind1=jisa&kind2=type`]).then((res)=>{
        this.bonbuVocData=res.data.results;
      }).catch((err)=>{
        console.log('데이터를 가져오지 못했습니다.');
      });
      this.getDesserts();
    },

    

    getDesserts(){
      const yyy=this.getBonbuVocValue();
      console.log(this.propsjisadata+' is '+ yyy);
            
      let dessertsArray=new Array();
    
      for(let i=0;i<yyy.name.length;i++){
        //console.log('yyy.firstJisa.countSum',yyy.firstJisa.countSum);
        let obj={                                      //테이블에 보여주는 포맷
          'name':yyy.name[i],
          'value':yyy.value[i], 
        }
        
        dessertsArray.push(obj);
      }
     
      this.tvInternetVoc=dessertsArray; 
      
    }, 

    wordClickHandler(name,value,vm){
      console.log('');
    },

    getBonbuVocValue(){    
      let jisaVocDataObj={};  
      let vocCountSum=0;
    
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

      
      this.bonbuVocData.map((item)=>{
        console.log('현재 지사는 ',this.propsjisadata);
        if(item.jisa===this.propsjisadata){
                    
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
          

          vocCountSum+=parseInt(item.count_sum);
        }
      });  

     
      jisaVocDataObj={
        'name':[voc1,voc2,voc3,voc4,voc5,voc6,voc7,voc8],
        'value':[KT업무정책불만건수,KTShop문의건수,서비스불만건수,약정문의건수,요금불만건수,위약금문의건수,품질불만건수,혜택문의건수],
      }

      console.log('bonbuNetIncrease',jisaVocDataObj);
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
