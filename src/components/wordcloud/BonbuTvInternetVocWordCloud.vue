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
const bonbuVocUrl=`http://172.21.220.97/api/voc.json/?table=rit&bonbu=북부고객본부&begin=20210401&end=20210430&kind1=jisa&kind2=type`;

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
    
    onWordClick(word,text){
      alert(word[0]+':'+word[1]+'건입니다.');
    },

    async changedBonbu(selectedBonbu) {
      await axios.get([`http://172.21.220.97/api/voc.json/?table=rit&bonbu=${selectedBonbu}&begin=20210401&end=20210430&kind1=jisa&kind2=type`]).then((res)=>{
        this.bonbuVocData=res.data.results;
      }).catch((err)=>{
        console.log('데이터를 가져오지 못했습니다.');
      });
      this.getDesserts();
    },

    

    getDesserts(){
      const yyy=this.getBonbuVocValue();
            
      let dessertArray=new Array();
    
      for(let i=0;i<yyy.name.length;i++){
        dessertArray.push([yyy['name'][i],yyy['value'][i]]);
      }
     
      this.tvInternetVoc=dessertArray; 
    }, 

    wordClickHandler(name,value,vm){
      console.log('');
    },

    getBonbuVocValue(){    
      let bonbuVocDataObj={};  
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
          

          vocCountSum+=parseInt(item.count_sum);
        }
      });  

     
      bonbuVocDataObj={
        'name':[voc1,voc2,voc3,voc4,voc5,voc6,voc7,voc8],
        'value':[KT업무정책불만건수,KTShop문의건수,서비스불만건수,약정문의건수,요금불만건수,위약금문의건수,품질불만건수,혜택문의건수],
      }

      //console.log('bonbuNetIncrease',bonbuNetIncreaseValueObj);
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
