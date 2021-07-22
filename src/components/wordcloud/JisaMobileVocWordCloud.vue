<template>
  <word-cloud
    style="
      height:320px;
      width:320px;
    "
    :words="mobileVoc"
    :color="([,weight])=>weight>100?'DeepPink':weight>50?'RoyalBlue':'Indigo'"
    font-family="Roboto"
    rotation-unit="deg"
    :rotation="([,weight])=>weight>1000?'90':weight>900?'80':weight>800?'70':weight>700?'60':weight>600?'-50':weight>500?'40':weight>400?'-30':weight>300?'20':weight>200?'-10':'0'"
    :font-size-ratio="5"
    spacing="5"
    font-weight="bold"
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
const bonbuVocUrl=`http://172.21.220.97/api/voc.json/?table=rm&bonbu=북부고객본부&begin=20210401&end=20210430&kind1=jisa&kind2=type`;

export default {

  name:'JisaMobileVocWordCloud',

  components:{
    WordCloud,
  },

  props:['propsbonbudata','propsjisadata'],
 
  data () {
    return {
      jisaVocData:null,
      jisaVocDataObj:null,  
      mobileVoc:new Array(),
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
   
    this.getDesserts();
  },

  mounted(){
    
  },

  methods: { 
    onWordClick(word,text){
      alert(word[0]+':'+word[1]+'건입니다.');
    },
    async changedJisa(selectedJisa) {
     
      var imsiArray=[];
      await axios.get([`http://172.21.220.97/api/voc.json/?table=rm&bonbu=${this.propsbonbudata}&begin=20210401&end=20210430&kind1=jisa&kind2=type`]).then((res)=>{
        this.jisaVocData=res.data.results;
       
        this.jisaVocData.map((item)=>{
          if(item.jisa===selectedJisa){
            imsiArray.push({'basedate':item.basedate,'bonbu':item.bonbu,'count_sum':item.count_sum,'jisa':item.jisa,'voc_gubun':item.voc_gubun});
          }
        
        });
        this.jisaVocData=imsiArray;
      }).catch((err)=>{
        console.log('데이터를 가져오지 못했습니다.');
      });
      this.getDesserts();
    },

    

    getDesserts(){
      const yyy=this.getJisaVocValue();
     
      let dessertArray=new Array();

      for(let i=0;i<yyy.name.length;i++){
      
        // let obj={
        //   text:yyy['name'][i],
        //   value:yyy['value'][i],
        // };

        
        dessertArray.push([yyy['name'][i],yyy['value'][i]]);
        
      }
      this.mobileVoc=dessertArray;
      console.log('this.mobileVoc is ',this.mobileVoc);
    }, 

    wordClickHandler(name,value,vm){
      console.log('');
    },

    getJisaVocValue(){    
      let jisaVocDataObj={};  
      let vocCountSum=0;
    
      const mvoc1='단말기할부대금및잔여기간문의';
      const mvoc2='약정문의';
      const mvoc3='위약금(할인반환금)문의';
     
    

      let 단말기할부대금건수=0;
      let 무선약정문의건수=0;
      let 위약금문의건수=0;
      
      
      this.jisaVocData.map((item)=>{ 
              
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

      console.log('이지사의 실적은',[단말기할부대금건수,무선약정문의건수,위약금문의건수]);
   
          
      jisaVocDataObj={
        'name':[mvoc1,mvoc2,mvoc3],
        'value':[단말기할부대금건수,무선약정문의건수,위약금문의건수],
      }

      // jisaVocDataObj=[
      //   {'name1':mvoc1,'value1':단말기할부대금건수},
      //   {'name1':mvoc2,'value1':무선약정문의건수},
      //   {'name1':mvoc3,'value1':위약금문의건수},
      // ]

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
