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
const jisaVocUrl='http://172.21.220.97/api/voc/wc.json/?kind=유선';

export default {

  components:{
    WordCloud,
  },
  //name:MobileHjTable,
  data () {
    return {
      bonbuNetIncreaseData:null,
      bonbuNetIncreaseValueObj:null,  
      tvInternetVoc:[],   
    }
  },
  computed:{
    
  },//computed

  async created () {
    
    await axios.get([jisaVocUrl]).then((res)=>{
      this.bonbuNetIncreaseData=res.data;
    }).catch((err)=>{
      console.log('데이터를 가져 오지 못했습니다');
    });
    //this.getBonbuNetIncreaseValue();
    this.getDesserts();
  },

  mounted(){
    
  },

  methods: {  
    getDesserts(){
      const yyy=this.getBonbuNetIncreaseValue();
      //console.log('yyy voc is ',yyy);

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

    getBonbuNetIncreaseValue(){    //본부별 순익(y축)
      let bonbuNetIncreaseValueObj={};    
      const vocWorkType3Array=new Array();
      const countSumArray=new Array();
      
      this.bonbuNetIncreaseData.map((item)=>{
        //console.log('item voc is ',item);
        vocWorkType3Array.push(item.voc_work_type3);
        countSumArray.push(item.count_sum);
      });  
      
      bonbuNetIncreaseValueObj={
        'name':vocWorkType3Array,
        'value':countSumArray,
      }

      //console.log('bonbuNetIncrease',bonbuNetIncreaseValueObj);
      return bonbuNetIncreaseValueObj;
    },

  }
}
</script>

<style scoped>
.v-data-table > .v-data-table__wrapper > table >thead > tr > th{
    font-size:1rem;
}
</style>
