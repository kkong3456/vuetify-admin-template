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

const productUrl='http://172.21.220.97/api/net/product.json/?kind=net';
const bonbuUrl='http://172.21.220.97/api/net/bonbu.json/?kind=net';

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

  props:['propsdata'],
  
  data () {
    return {
      bonbuData:null,
      productData:null, 
      totalHjUrlPage:null,         //api url page의 제일 마지막 부분 확인  
      search:'',        // 테이블 서치
      //thisHjCount:'',     //테이블의 당월해지 기준 소트
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
          text:this.propsdata,
          value:'countSum',
        },
      ]
    }
  },//data

  async created () {
    const bonbuReq=axios.get(bonbuUrl);
    const productReq=axios.get(productUrl);
    await axios.all([bonbuReq,productReq]).then(axios.spread((...res)=>{
      const bonbuData=res[0].data.results;
      this.bonbuData=bonbuData;
      
      const productData=res[1].data.results;
      this.productData=productData;
      //console.log('productData is ',bonbuData);

      this.getDesserts('북부고객본부'); //중간의 전체(테이블)본부별 순신규/해지/증감
     
    })).catch((err)=>{
      console.log(err);
    });
  },

  mounted(){
    
  },

  methods: {  
    async changeBonbu(selectedBonbu){
      //console.log('url is ',url);
      const yyy=this.getBonbuNetIncreaseValue();

      //상위컴포넌트에 전월/금월/증감율 데이터를 넘긴다.
      
      let netNewIncreaseLastMonth=yyy.last[selectedBonbu][1];
      let netNewIncreaseThisMonth=yyy.this[selectedBonbu][1];
      let netNewIncreaseDiff=((netNewIncreaseThisMonth-netNewIncreaseLastMonth)/netNewIncreaseLastMonth*100).toFixed(1);
           
      this.$emit('netIncreaseLastMonth',netNewIncreaseLastMonth);
      this.$emit('netIncreaseThisMonth',netNewIncreaseThisMonth);
      this.$emit('netIncreaseDiff',netNewIncreaseDiff);
    },

    
    getDesserts(selectedBonbu){
      const yyy=this.getBonbuNetIncreaseValue();   
      this.desserts=[
        {
          name:yyy.this['북부고객본부'][0],
          startdate:yyy.this.sysdate[0].substring(2,10),
          enddate:yyy.this.sysdate[yyy.this.sysdate.length-1].substring(2,10),
          countSum:yyy.this['북부고객본부'][1].toLocaleString(),
        },
        {
          name:yyy.this['동부고객본부'][0],
          startdate:yyy.this.sysdate[0].substring(2,10),
          enddate:yyy.this.sysdate[yyy.this.sysdate.length-1].substring(2,10),
          countSum:yyy.this['동부고객본부'][1].toLocaleString(),
        },
        {
          name:yyy.this['전남/전북고객본부'][0],
          startdate:yyy.this.sysdate[0].substring(2,10),
          enddate:yyy.this.sysdate[yyy.this.sysdate.length-1].substring(2,10),
          countSum:yyy.this['전남/전북고객본부'][1].toLocaleString(),
        },
        {
          name:yyy.this['강남고객본부'][0],
          startdate:yyy.this.sysdate[0].substring(2,10),
          enddate:yyy.this.sysdate[yyy.this.sysdate.length-1].substring(2,10),
          countSum:yyy.this['강남고객본부'][1].toLocaleString(),
        },
        {
          name:yyy.this['충남/충북고객본부'][0],
          startdate:yyy.this.sysdate[0].substring(2,10),
          enddate:yyy.this.sysdate[yyy.this.sysdate.length-1].substring(2,10),
          countSum:yyy.this['충남/충북고객본부'][1].toLocaleString(),
        },
        {
          name:yyy.this['대구/경북고객본부'][0],
          startdate:yyy.this.sysdate[0].substring(2,10),
          enddate:yyy.this.sysdate[yyy.this.sysdate.length-1].substring(2,10),
          countSum:yyy.this['대구/경북고객본부'][1].toLocaleString(),
        },
        {
          name:yyy.this['서부고객본부'][0],
          startdate:yyy.this.sysdate[0].substring(2,10),
          enddate:yyy.this.sysdate[yyy.this.sysdate.length-1].substring(2,10),
          countSum:yyy.this['서부고객본부'][1].toLocaleString(),
        },
        {
          name:yyy.this['부산/경남고객본부'][0],
          startdate:yyy.this.sysdate[0].substring(2,10),
          enddate:yyy.this.sysdate[yyy.this.sysdate.length-1].substring(2,10),
          countSum:yyy.this['부산/경남고객본부'][1].toLocaleString(),
        }
      ];

      let netNewIncreaseLastMonth=yyy.last[selectedBonbu][1];
      let netNewIncreaseThisMonth=yyy.this[selectedBonbu][1];
      let netNewIncreaseDiff=((netNewIncreaseThisMonth-netNewIncreaseLastMonth)/netNewIncreaseLastMonth*100).toFixed(1);
           
      this.$emit('netIncreaseLastMonth',netNewIncreaseLastMonth);
      this.$emit('netIncreaseThisMonth',netNewIncreaseThisMonth);
      this.$emit('netIncreaseDiff',netNewIncreaseDiff);
      
    } , 

    getBonbuNetIncreaseValue(){    //axios로 받아온 데이터를 상품별로 Obj로 만든다
      let bonbuThisObj={};
      let bonbuLastObj={};

      let thisDateArray=new Array();
      let lastDateArray=new Array();

      let firstBonbu='';
      let secondBonbu='';
      let thirdBonbu='';
      let fourthBonbu='';
      let fifthBonbu='';
      let sixthBonbu='';
      let seventhBonbu='';
      let eighthBonbu='';

      let firstBonbuThisCountSum=0;
      let secondBonbuThisCountSum=0;
      let thirdBonbuThisCountSum=0;
      let fourthBonbuThisCountSum=0;
      let fifthBonbuThisCountSum=0;
      let sixthBonbuThisCountSum=0;
      let seventhBonbuThisCountSum=0;
      let eighthBonbuThisCountSum=0;

      let firstBonbuLastCountSum=0;
      let secondBonbuLastCountSum=0;
      let thirdBonbuLastCountSum=0;
      let fourthBonbuLastCountSum=0;
      let fifthBonbuLastCountSum=0;
      let sixthBonbuLastCountSum=0;
      let seventhBonbuLastCountSum=0;
      let eighthBonbuLastCountSum=0;  

     
      this.bonbuData.map((item)=>{
        //console.log('bonbuData array is',item);
        if(item.sysdate.substring(5,7)==='02'){
          thisDateArray.push(item.sysdate);
          if(item.jojik2_name==='북부고객본부') {
            firstBonbu='북부고객본부';
            firstBonbuThisCountSum+=item.count_sum;
          }
          if(item.jojik2_name==='동부고객본부') {
            secondBonbu='동부고객본부';
            secondBonbuThisCountSum+=item.count_sum;
          }
          if(item.jojik2_name==='전남/전북고객본부') {
            thirdBonbu='전남/전북고객본부';
            thirdBonbuThisCountSum+=item.count_sum;
          }
          if(item.jojik2_name==='강남고객본부') {
            fourthBonbu='강남고객본부';
            fourthBonbuThisCountSum+=item.count_sum;
          }
          if(item.jojik2_name==='충남/충북고객본부') {
            fifthBonbu='충남/충복고객본부';
            fifthBonbuThisCountSum+=item.count_sum;
          }
          if(item.jojik2_name==='대구/경북고객본부'){
            sixthBonbu='대구/경북고객본부';
            sixthBonbuThisCountSum+=item.count_sum;
          }
          if(item.jojik2_name==='서부고객본부'){
            seventhBonbu='서부고객본부';
            seventhBonbuThisCountSum+=item.count_sum;
          }
          if(item.jojik2_name==='부산/경남고객본부'){
            eighthBonbu='부산/경남고객본부';
            eighthBonbuThisCountSum+=item.count_sum;
          }
        }

        if(item.sysdate.substring(5,7)==='01'){
          lastDateArray.push(item.sysdate);

          if(item.jojik2_name==='북부고객본부') {
            firstBonbu='북부고객본부';
            firstBonbuLastCountSum+=item.count_sum;
          }
          if(item.jojik2_name==='동부고객본부') {
            secondBonbu='동부고객본부';
            secondBonbuLastCountSum+=item.count_sum;
          }
          if(item.jojik2_name==='전남/전북고객본부') {
            thirdBonbu='전남/전북고객본부';
            thirdBonbuLastCountSum+=item.count_sum;
          }
          if(item.jojik2_name==='강남고객본부') {
            fourthBonbu='강남고객본부';
            fourthBonbuLastCountSum+=item.count_sum;
          }
          if(item.jojik2_name==='충남/충북고객본') {
            fifthBonbu='충남/충북고객본부';
            fifthBonbuLastCountSum+=item.count_sum;
          }
          if(item.jojik2_name==='대구/경북고객본부'){
            sixthBonbu='대구/경북고객본부';
            sixthBonbuLastCountSum+=item.count_sum;
          }
          if(item.jojik2_name==='서부고객본부'){
            seventhBonbu='서부고객본부';
            seventhBonbuLastCountSum+=item.count_sum;
          }
          if(item.jojik2_name==='부산/경남고객본부'){
            eighthBonbu='부산/경남고객본부';
            eighthBonbuLastCountSum+=item.count_sum;
          }
        }
      });
     
      bonbuThisObj={
        'sysdate':thisDateArray,
        '북부고객본부':[firstBonbu,firstBonbuThisCountSum],
        '동부고객본부':[secondBonbu,secondBonbuThisCountSum],
        '전남/전북고객본부':[thirdBonbu,thirdBonbuThisCountSum],
        '강남고객본부':[fourthBonbu,fourthBonbuThisCountSum],
        '충남/충북고객본부':[fifthBonbu,fifthBonbuThisCountSum],
        '대구/경북고객본부':[sixthBonbu,sixthBonbuThisCountSum],
        '서부고객본부':[seventhBonbu,seventhBonbuThisCountSum],
        '부산/경남고객본부':[eighthBonbu,eighthBonbuThisCountSum],        
      };

      bonbuLastObj={
        'sysdate':lastDateArray,
        '북부고객본부':[firstBonbu,firstBonbuLastCountSum],
        '동부고객본부':[secondBonbu,secondBonbuLastCountSum],
        '전남/전북고객본부':[thirdBonbu,thirdBonbuLastCountSum],
        '강남고객본부':[fourthBonbu,fourthBonbuLastCountSum],
        '충남/충북고객본부':[fifthBonbu,fifthBonbuLastCountSum],
        '대구/경북고객본부':[sixthBonbu,sixthBonbuLastCountSum], 
        '서부고객본부':[seventhBonbu,seventhBonbuLastCountSum],
        '부산/경남고객본부':[eighthBonbu,eighthBonbuLastCountSum],       
      };

  
      return {'this':bonbuThisObj,'last':bonbuLastObj};
    },
  }
}
</script>
