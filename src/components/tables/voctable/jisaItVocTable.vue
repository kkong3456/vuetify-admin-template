<template>
  <div>
    <v-card outlined>
      <div class="text-h5 text-center font-weight-medium text--secondary" />
      <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="10"
      >
        <template v-slot:body.append>
          <tr
            cols="12"
            lg="6"    
          >
            <td />
           
            <td colspan="4" />
          </tr>
        </template>
      </v-data-table>
      <!-- <button v-on:click="getBonbuDesserts()">vvv</button> -->
    </v-card>
  </div>
</template>
<script>
import axios from 'axios';

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

export default {

  name:'JisaItVocTable',

  components:{
  
  },

  props:['propsbonbudata','propsjisadata'],
 
  data () {
    return {
      jisaVocData:null,
      jisaVocDataObj:null,  
      tvInternetVoc:[], 
      search:'',
      desserts:this.desserts,
      
      selectedBonbu:'북부고객본부',
      
      selectedStartDate:'20210420',
      selectedEndDate:'20210426',

      lastWeekStartDate:'20210413',
      lastWeekEndDate:'20210419',
    }
  },
  computed:{
    headers(){
      return [
        {
          text:'기관명',
          align:'start',
          sortable:false,
          value:'name',
        },
        {
          text:'START DAY',
          value:'startdate',
        },
        {
          text:'END DAY',
          value:'enddate',
          // filter:value=>{
          //   if(!this.thisHjCount) return true
          //   return value < parseInt(this.thisHjCount)
          // },
        },
        {
          text:'VOC누적건수',
          value:'countSum',
        },
      ]
    }
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
    
      const thisDateUrl=`http://172.21.220.97/api/voc.json/?table=rit&bonbu=${this.selectedBonbu}&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&kind1=jisa&kind2=type`;
      const lastDateUrl=`http://172.21.220.97/api/voc.json/?table=rit&bonbu=${this.selectedBonbu}&begin=${this.lastWeekStartDate}&end=${this.lastWeekEndDate}&kind1=jisa&kind2=type`;
      
      this.selectedBonbu=this.selectedBonbu;  //propsbonbudata 대신 사용하려고함

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
      const thisDataUrl=`http://172.21.220.97/api/voc.json/?table=rit&bonbu=${selectedBonbu}&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&kind1=jisa&kind2=type`;
      const lastDataUrl=`http://172.21.220.97/api/voc.json/?table=rit&bonbu=${selectedBonbu}&begin=${this.lastWeekStartDate}&end=${this.lastWeekEndDate}&kind1=jisa&kind2=type`
    
      this.selectedBonbu=selectedBonbu;  //propsbonbudata 대신 사용하려고함

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
    
      //   const voc1='KT업무/정책불만';
      //   const voc2='KTShop문의';
      //   const voc3='서비스불만';
      //   const voc4='약정문의';
      //   const voc5='요금불만';
      //   const voc6='위약금(할인반환금)문의';
      //   const voc7='품질불만';
      //   const voc8='혜택문의';

      //   let KT업무정책불만건수=0;
      //   let KTShop문의건수=0;
      //   let 서비스불만건수=0;
      //   let 약정문의건수=0;
      //   let 요금불만건수=0;
      //   let 위약금문의건수=0;
      //   let 품질불만건수=0;
      //   let 혜택문의건수=0;

      //   let KT업무정책불만건수2=0;
      //   let KTShop문의건수2=0;
      //   let 서비스불만건수2=0;
      //   let 약정문의건수2=0;
      //   let 요금불만건수2=0;
      //   let 위약금문의건수2=0;
      //   let 품질불만건수2=0;
      //   let 혜택문의건수2=0;
      let firstJisa='';
      let secondJisa='';
      let thirdJisa='';
      let fourthJisa='';
      let fifthJisa='';
      let sixthJisa='';
      let seventhJisa='';

      let firstJisaThisCountSum=0;
      let secondJisaThisCountSum=0;
      let thirdJisaThisCountSum=0;
      let fourthJisaThisCountSum=0;
      let fifthJisaThisCountSum=0;
      let sixthJisaThisCountSum=0;
      let seventhJisaThisCountSum=0;


      if(this.selectedBonbu==='북부고객본부'){
        firstJisa='고양지사';
        secondJisa='광진지사';
        thirdJisa='광화문지사';
        fourthJisa='노원지사';
        fifthJisa='서대문지사';

        this.jisaVocData.map((item)=>{
          if(item.jisa==='고양지사'){
            firstJisaThisCountSum+=item.count_sum;
          }
          if(item.jisa==='광진지사'){
            secondJisaThisCountSum+=item.count_sum;
          }
          if(item.jisa==='광화문지사'){
            thirdJisaThisCountSum+=item.count_sum;
          }
          if(item.jisa==='노원지사'){
            fourthJisaThisCountSum+=item.count_sum;
          }
          if(item.jisa==='서대문지사'){
            fifthJisaThisCountSum+=item.count_sum;
          }
        })
      }

      console.log('ㅌㅌㅌㅌㅌ ',fifthJisaThisCountSum);  //서대문 지사 796 맞음

      this.jisaVocData.map((item)=>{ 

       


       
        // if(item.bonbu==='북부고객본부'){
        //   if(item.voc_gubun.replace(/ /g,"")===voc1){
        //     KT업무정책불만건수+=item.count_sum;
        //   }
        //   if(item.voc_gubun.replace(/ /g,"")===voc2){
        //     KTShop문의건수+=item.count_sum;
        //   }
        //   if(item.voc_gubun.replace(/ /g,"")===voc3){
        //     서비스불만건수+=item.count_sum;
        //   }
        //   if(item.voc_gubun.replace(/ /g,"")===voc4){
        //     약정문의건수+=item.count_sum;
        //   }
        //   if(item.voc_gubun.replace(/ /g,"")===voc5){
        //     요금불만건수+=item.count_sum;
        //   }
        //   if((item.voc_gubun.replace(/ /g,"")===voc6) || (item.voc_gubun.replace(/ /g,"")==='할인반환금문의')){
        //     위약금문의건수+=item.count_sum;
        //   }
        //   if(item.voc_gubun.replace(/ /g,"")===voc7){
        //     품질불만건수+=item.count_sum;
        //   }
        //   if(item.voc_gubun.replace(/ /g,"")===voc8){
        //     혜택문의건수+=item.count_sum;
        //   }  
        //   vocCountSum+=item.count_sum;
        // }          
      });  

      //   this.lastWeekJisaVocData.map((item)=>{  
      //     if(item.jisa===this.propsjisadata){
      //       if(item.voc_gubun.replace(/ /g,"")===voc1){
      //         KT업무정책불만건수2+=item.count_sum;
      //       }
      //       if(item.voc_gubun.replace(/ /g,"")===voc2){
      //         KTShop문의건수2+=item.count_sum;
      //       }
      //       if(item.voc_gubun.replace(/ /g,"")===voc3){
      //         서비스불만건수2+=item.count_sum;
      //       }
      //       if(item.voc_gubun.replace(/ /g,"")===voc4){
      //         약정문의건수2+=item.count_sum;
      //       }
      //       if(item.voc_gubun.replace(/ /g,"")===voc5){
      //         요금불만건수2+=item.count_sum;
      //       }
      //       if((item.voc_gubun.replace(/ /g,"")===voc6) || (item.voc_gubun.replace(/ /g,"")==='할인반환금문의')){
      //         위약금문의건수2+=item.count_sum;
      //       }
      //       if(item.voc_gubun.replace(/ /g,"")===voc7){
      //         품질불만건수2+=item.count_sum;
      //       }
      //       if(item.voc_gubun.replace(/ /g,"")===voc8){
      //         혜택문의건수2+=item.count_sum;
      //       }  
      //       lastVocCountSum+=item.count_sum;
      //     }        
      //   });  

      jisaVocDataObj={
        // 'name':[voc1,voc2,voc3,voc4,voc5,voc6,voc7,voc8],
        // 'value':[KT업무정책불만건수,KTShop문의건수,서비스불만건수,약정문의건수,요금불만건수,위약금문의건수,품질불만건수,혜택문의건수],
        'vocCountSum':vocCountSum,
        // 'lastVocCountSum':lastVocCountSum,
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
