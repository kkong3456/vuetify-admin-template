<template>
  <div>
    <div class="text-h5 text-center font-weight-medium text--secondary">
      [인터넷 상품]
    </div>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="10"
      class="elevation-1"
      :search="search"
      :custom-filter="filterOnlyCaptsText"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="기관명/일자으로 조회"
          class="mx-4"
        />
      </template>
      <template v-slot:body.append>
        <tr
          cols="12"
          lg="6"    
        >
          <td />
          <td>
            <v-text-field
              v-model="thisHjCount"
              type="number"
              label="당월해지 건수기준 조회(이하)"
            />
          </td>
          <td colspan="4" />
        </tr>
      </template>
    </v-data-table>
    <!-- <button v-on:click="getBonbuDesserts()">vvv</button> -->
  </div>
</template>



<script>
import axios from 'axios';



const allHjUrl='http://172.21.220.97/api/dash.json';
//const allHjUrl2='http://172.21.220.97/api/dash.json?page=';
//const allHjUrl3='http://172.21.220.97/api/dash.json?page=3';

 
export default {
  // name:MobileHjTable,
  data () {
    return {
      bonbuNetIncreaseData:null,
      bonbuNetIncreaseValueObj:null,  
      totalHjUrlPage:null,         //api url page의 제일 마지막 부분 확인
        
      search:'',        // 테이블 서치
      thisHjCount:'',     //테이블의 당월해지 기준 소트
      //desserts:this.dessertsArray,
      desserts:this.desserts,
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
          text:'일자',
          value:'date',
        },
        {
          text:'당월해지',
          value:'thisHjCount',
          filter:value=>{
            if(!this.thisHjCount) return true
            return value < parseInt(this.thisHjCount)
          },
        },
        {
          text:'당월비율',
          value:'thisHjRatio',
        },
        {
          text:'전월해지',
          value:'thatHjCount',
        },
        {
          text:'전월비율',
          value:'thisHjRatio',
        },
        {
          text:'개선율',
          value:'upRatio',
        },
        {
          text:'랭킹',
          value:'rank',
        }
      ]
    }
  },//data

  async created () {
    await axios.get(allHjUrl).then((res)=>{
      this.bonbuNetIncreaseData=res.data.results;
    }).catch((err)=>{
      alert(err);
    });
    
    //this.getBonbuNetIncreaseValue();
    this.getDesserts();
  },

  mounted(){
    
  },

  methods: {  
    getDesserts(){
      const yyy=this.getBonbuNetIncreaseValue();
       
      const dessertsArray=new Array();

      for(let i=yyy.date.length-1;i>0;i--){
        //for(let i=0;i<30;i++){
        let obj={
          name:yyy.jojik[i],                                      //테이블에 보여주는 포맷
          date:yyy.date[i]?yyy.date[i]:0,
          thisHjCount:yyy.thisHjCount[i]?yyy.thisHjCount[i]:0,
          thisHjRatio:yyy.thisHjRatio[i]?yyy.thisHjRatio[i]:0,
          thatHjCount:yyy.thatHjCount[i]?yyy.thatHjCount[i]:0,
          thatHjRatio:yyy.thatHjRatio[i]?yyy.thatHjRatio[i]:0,
          upRatio:yyy.upRatio[i]?parseFloat(yyy.upRatio[i]).toFixed(3):0,
          rank:yyy.rank[i]?yyy.rank[i]:0,
        }

        dessertsArray.push(obj);         
        this.desserts=Object.values(dessertsArray);          
        //this.desserts=this.desserts.reverse()
      }
    } , 
    getBonbuNetIncreaseValue(){    //axios로 받아온 데이터를 상품별로 Obj로 만든다
      let mobileHjObj={}
      let jojikArray=new Array()
      let dateArray=new Array()
      let thisHjCountArray=new Array()
      let thisHjRatioArray=new Array()
      let thatHjCountArray=new Array()
      let thatHjRatioArray=new Array()
      let upRatioArray=new Array()
      let rankArray=new Array()
      //console.log('xxxx');


      this.bonbuNetIncreaseData.map((item)=>{
        //console.log('item is ',item.rank);
        if(item.product==='internet'){  
          dateArray.push(item.sysdate);
          jojikArray.push(item.jojik.replace('/','').substring(0,4));
          thisHjCountArray.push(item.this_hj_count);
          thisHjRatioArray.push(item.this_hj_ratio);
          thatHjCountArray.push(item.that_hj_count);
          thatHjRatioArray.push(item.that_hj_ratio);
          upRatioArray.push(item.up_ratio);
          rankArray.push(item.rank);                        
        }
      });

      //console.log('조직은',rankArray);
        
       
      mobileHjObj={
        date:dateArray,
        jojik:jojikArray,
        thisHjCount:thisHjCountArray,
        thisHjRatio:thisHjRatioArray,
        thatHjCount:thatHjCountArray,
        thatHjRatio:thatHjRatioArray,
        upRatio:upRatioArray,
        rank:rankArray,
      }
      return mobileHjObj;
    },

  }
}
</script>
