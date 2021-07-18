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



const jisaNetNewIncreaseUrl='http://172.21.220.97/api/net/jisa.json/?prod=미디어&kind=start&bonbu='

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
  // name:MobileHjTable,
  data () {
    return {
      bonbuNetIncreaseData:null,
      bonbuNetIncreaseValueObj:null,  
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
    await axios.get(jisaNetNewIncreaseUrl+'북부고객본부').then((res,err)=>{
      this.bonbuNetIncreaseData=res.data.results
    }).catch((err)=>{
      console.log(err);
    });

    this.getDesserts('북부고객본부');
  },

  mounted(){
    
  },

  methods: {  
    async changeBonbu(bonbuName){
      console.log('여긴 잘되네!!');
      await axios.get(jisaNetNewIncreaseUrl+bonbuName).then((res)=>{
        this.bonbuNetIncreaseData=res.data.results;
        
      }).catch((err)=>{
        console.log('데이터를 가져오지 못했습니다.',err);
      });
      this.getDesserts(bonbuName);
    },

    getDesserts(bonbuName){
      const yyy=this.getBonbuNetIncreaseValue(bonbuName);     
      if(bonbuName==='북부고객본부' || bonbuName==='동부고객본부' ||  bonbuName==='전남/전북고객본부'){

        this.desserts=[
          {
            name:yyy.this.firstJisa[0],
            startdate:yyy.this.sysdate[0].substring(2,10),
            enddate:yyy.this.sysdate[yyy.this.sysdate.length-1].substring(2,10),
            countSum:yyy.this.firstJisa[1].toLocaleString(),
          },
          {
            name:yyy.this.secondJisa[0],
            startdate:yyy.this.sysdate[0].substring(2,10),
            enddate:yyy.this.sysdate[yyy.this.sysdate.length-1].substring(2,10),
            countSum:yyy.this.secondJisa[1].toLocaleString(),
          },
          {
            name:yyy.this.thirdJisa[0],
            startdate:yyy.this.sysdate[0].substring(2,10),
            enddate:yyy.this.sysdate[yyy.this.sysdate.length-1].substring(2,10),
            countSum:yyy.this.thirdJisa[1].toLocaleString(),
          },
          {
            name:yyy.this.fourthJisa[0],
            startdate:yyy.this.sysdate[0].substring(2,10),
            enddate:yyy.this.sysdate[yyy.this.sysdate.length-1].substring(2,10),
            countSum:yyy.this.fourthJisa[1].toLocaleString(),
          },
          {
            name:yyy.this.fifthJisa[0],
            startdate:yyy.this.sysdate[0].substring(2,10),
            enddate:yyy.this.sysdate[yyy.this.sysdate.length-1].substring(2,10),
            countSum:yyy.this.fifthJisa[1].toLocaleString(),
          },
          // {
          //   name:yyy.sixthJisa[0]?yyy.sixthJisa[0]:'',
          //   startdate:yyy.sysdate[0].substring(2,10)?yyy.sysdate[0].substring(2,10):'',
          //   enddate:yyy.sysdate[yyy.sysdate.length-1].substring(2,10)?sysdate[yyy.sysdate.length-1].substring(2,10):'',
          //   countSum:yyy.sixthJisa[1]?yyy.sixthJisa[1]:'',
          // },
          // {
          //   name:yyy.seventhJisa[0]?yyy.seventhJisa[0]:null,
          //   startdate:yyy.sysdate[0].substring(2,10)?yyy.sysdate[0].substring(2,10):null,
          //   enddate:yyy.sysdate[yyy.sysdate.length-1].substring(2,10)?yyy.sysdate[yyy.sysdate.length-1].substring(2,10):null,
          //   countSum:yyy.seventhJisa[1]?yyy.seventhJisa[1]:null,
          // },
        ]

        //상위컴포넌트에 전월/금월/증감율 데이터를 넘긴다.
        let netNewIncreaseLastMonth=yyy.last.firstJisa[1]+yyy.last.secondJisa[1]+yyy.last.thirdJisa[1]+yyy.last.fourthJisa[1]+yyy.last.fifthJisa[1];
        let netNewIncreaseThisMonth=yyy.this.firstJisa[1]+yyy.this.secondJisa[1]+yyy.this.thirdJisa[1]+yyy.this.fourthJisa[1]+yyy.this.fifthJisa[1];
        let netNewIncreaseDiff=((netNewIncreaseThisMonth-netNewIncreaseLastMonth)/netNewIncreaseLastMonth*100).toFixed(1);
      
        this.$emit('netNewIncreaseLastMonth',netNewIncreaseLastMonth);
        this.$emit('netNewIncreaseThisMonth',netNewIncreaseThisMonth);
        this.$emit('netNewIncreaseDiff',netNewIncreaseDiff);
      }

      if(bonbuName==='강남고객본부' || bonbuName==='충남/충북고객본부' ||  bonbuName==='대구/경북고객본부'){

        this.desserts=[
          {
            name:yyy.this.firstJisa[0],
            startdate:yyy.this.sysdate[0].substring(2,10),
            enddate:yyy.this.sysdate[yyy.this.sysdate.length-1].substring(2,10),
            countSum:yyy.this.firstJisa[1].toLocaleString(),
          },
          {
            name:yyy.this.secondJisa[0],
            startdate:yyy.this.sysdate[0].substring(2,10),
            enddate:yyy.this.sysdate[yyy.this.sysdate.length-1].substring(2,10),
            countSum:yyy.this.secondJisa[1].toLocaleString(),
          },
          {
            name:yyy.this.thirdJisa[0],
            startdate:yyy.this.sysdate[0].substring(2,10),
            enddate:yyy.this.sysdate[yyy.this.sysdate.length-1].substring(2,10),
            countSum:yyy.this.thirdJisa[1].toLocaleString(),
          },
          {
            name:yyy.this.fourthJisa[0],
            startdate:yyy.this.sysdate[0].substring(2,10),
            enddate:yyy.this.sysdate[yyy.this.sysdate.length-1].substring(2,10),
            countSum:yyy.this.fourthJisa[1].toLocaleString(),
          },
          {
            name:yyy.this.fifthJisa[0],
            startdate:yyy.this.sysdate[0].substring(2,10),
            enddate:yyy.this.sysdate[yyy.this.sysdate.length-1].substring(2,10),
            countSum:yyy.this.fifthJisa[1].toLocaleString(),
          },
          {
            name:yyy.this.sixthJisa[0],
            startdate:yyy.this.sysdate[0].substring(2,10),
            enddate:yyy.this.sysdate[yyy.this.sysdate.length-1].substring(2,10),
            countSum:yyy.this.sixthJisa[1].toLocaleString(),
          },
          // {
          //   name:yyy.seventhJisa[0]?yyy.seventhJisa[0]:null,
          //   startdate:yyy.sysdate[0].substring(2,10)?yyy.sysdate[0].substring(2,10):null,
          //   enddate:yyy.sysdate[yyy.sysdate.length-1].substring(2,10)?yyy.sysdate[yyy.sysdate.length-1].substring(2,10):null,
          //   countSum:yyy.seventhJisa[1]?yyy.seventhJisa[1]:null,
          // },
        ]

        //상위컴포넌트에 전월/금월/증감율 데이터를 넘긴다.
        let netNewIncreaseLastMonth=yyy.last.firstJisa[1]+yyy.last.secondJisa[1]+yyy.last.thirdJisa[1]+yyy.last.fourthJisa[1]+yyy.last.fifthJisa[1]+yyy.last.sixthJisa[1];
        let netNewIncreaseThisMonth=yyy.this.firstJisa[1]+yyy.this.secondJisa[1]+yyy.this.thirdJisa[1]+yyy.this.fourthJisa[1]+yyy.this.fifthJisa[1]+yyy.this.sixthJisa[1];
        let netNewIncreaseDiff=((netNewIncreaseThisMonth-netNewIncreaseLastMonth)/netNewIncreaseLastMonth*100).toFixed(1);
      
        this.$emit('netNewIncreaseLastMonth',netNewIncreaseLastMonth);
        this.$emit('netNewIncreaseThisMonth',netNewIncreaseThisMonth);
        this.$emit('netNewIncreaseDiff',netNewIncreaseDiff);
      }

      if(bonbuName==='서부고객본부' || bonbuName==='부산/경남고객본부'){

        this.desserts=[
          {
            name:yyy.this.firstJisa[0],
            startdate:yyy.this.sysdate[0].substring(2,10),
            enddate:yyy.this.sysdate[yyy.this.sysdate.length-1].substring(2,10),
            countSum:yyy.this.firstJisa[1].toLocaleString(),
          },
          {
            name:yyy.this.secondJisa[0],
            startdate:yyy.this.sysdate[0].substring(2,10),
            enddate:yyy.this.sysdate[yyy.this.sysdate.length-1].substring(2,10),
            countSum:yyy.this.secondJisa[1].toLocaleString(),
          },
          {
            name:yyy.this.thirdJisa[0],
            startdate:yyy.this.sysdate[0].substring(2,10),
            enddate:yyy.this.sysdate[yyy.this.sysdate.length-1].substring(2,10),
            countSum:yyy.this.thirdJisa[1].toLocaleString(),
          },
          {
            name:yyy.this.fourthJisa[0],
            startdate:yyy.this.sysdate[0].substring(2,10),
            enddate:yyy.this.sysdate[yyy.this.sysdate.length-1].substring(2,10),
            countSum:yyy.this.fourthJisa[1].toLocaleString(),
          },
          {
            name:yyy.this.fifthJisa[0],
            startdate:yyy.this.sysdate[0].substring(2,10),
            enddate:yyy.this.sysdate[yyy.this.sysdate.length-1].substring(2,10),
            countSum:yyy.this.fifthJisa[1].toLocaleString(),
          },
          {
            name:yyy.this.sixthJisa[0],
            startdate:yyy.this.sysdate[0].substring(2,10),
            enddate:yyy.this.sysdate[yyy.this.sysdate.length-1].substring(2,10),
            countSum:yyy.this.sixthJisa[1].toLocaleString(),
          },
          {
            name:yyy.this.seventhJisa[0],
            startdate:yyy.this.sysdate[0].substring(2,10),
            enddate:yyy.this.sysdate[yyy.this.sysdate.length-1].substring(2,10),
            countSum:yyy.this.seventhJisa[1].toLocaleString(),
          },
        ]

        //상위컴포넌트에 전월/금월/증감율 데이터를 넘긴다.
        let netNewIncreaseLastMonth=yyy.last.firstJisa[1]+yyy.last.secondJisa[1]+yyy.last.thirdJisa[1]+yyy.last.fourthJisa[1]+yyy.last.fifthJisa[1]+yyy.last.sixthJisa[1]+yyy.last.seventhJisa[1];
        let netNewIncreaseThisMonth=yyy.this.firstJisa[1]+yyy.this.secondJisa[1]+yyy.this.thirdJisa[1]+yyy.this.fourthJisa[1]+yyy.this.fifthJisa[1]+yyy.this.sixthJisa[1]+yyy.this.seventhJisa[1];
        let netNewIncreaseDiff=((netNewIncreaseThisMonth-netNewIncreaseLastMonth)/netNewIncreaseLastMonth*100).toFixed(1);
      
        this.$emit('netNewIncreaseLastMonth',netNewIncreaseLastMonth);
        this.$emit('netNewIncreaseThisMonth',netNewIncreaseThisMonth);
        this.$emit('netNewIncreaseDiff',netNewIncreaseDiff);
      }
    } , 
    getBonbuNetIncreaseValue(bonbuName){    //axios로 받아온 데이터를 상품별로 Obj로 만든다
      let jisaTvThisObj={};
      let jisaTvLastObj={};
      let thisDateArray=new Array();
      let lastDateArray=new Array();

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

      let firstJisaLastCountSum=0;
      let secondJisaLastCountSum=0;
      let thirdJisaLastCountSum=0;
      let fourthJisaLastCountSum=0;
      let fifthJisaLastCountSum=0;
      let sixthJisaLastCountSum=0;
      let seventhJisaLastCountSum=0;

      //북부고객본부
      if(bonbuName==='북부고객본부'){
        firstJisa='고양지사';
        secondJisa='광진지사';
        thirdJisa='광화문지사';
        fourthJisa='노원지사';
        fifthJisa='서대문지사';

        this.bonbuNetIncreaseData.map((item)=>{
         
          if(item.sysdate.substring(5,7)==='02'){
            thisDateArray.push(item.sysdate);
            if(item.jojik3_name==='고양지사') {
              firstJisaThisCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='광진지사') {
              secondJisaThisCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='광화문지사') {
              thirdJisaThisCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='노원지사') {
              fourthJisaThisCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='서대문지사') {
              fifthJisaThisCountSum+=item.count_sum;
            }
          }

          if(item.sysdate.substring(5,7)==='01'){
            lastDateArray.push(item.sysdate);

            if(item.jojik3_name==='고양지사'){
              firstJisaLastCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='광진지사'){
              secondJisaLastCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='광화문지사'){
              thirdJisaLastCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='노원지사'){
              fourthJisaLastCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='서대문지사'){
              fifthJisaLastCountSum+=item.count_sum;
            }
          }
        });
      }

      jisaTvThisObj={
        'sysdate':thisDateArray,
        'firstJisa':[firstJisa,firstJisaThisCountSum],
        'secondJisa':[secondJisa,secondJisaThisCountSum],
        'thirdJisa':[thirdJisa,thirdJisaThisCountSum],
        'fourthJisa':[fourthJisa,fourthJisaThisCountSum],
        'fifthJisa':[fifthJisa,fifthJisaThisCountSum],
        'sixthJisa':[sixthJisa,sixthJisaThisCountSum],        
      }

      jisaTvLastObj={
        'sysdate':lastDateArray,
        'firstJisa':[firstJisa,firstJisaLastCountSum],
        'secondJisa':[secondJisa,secondJisaLastCountSum],
        'thirdJisa':[thirdJisa,thirdJisaLastCountSum],
        'fourthJisa':[fourthJisa,fourthJisaLastCountSum],
        'fifthJisa':[fifthJisa,fifthJisaLastCountSum],
        'sixthJisa':[sixthJisa,sixthJisaLastCountSum],        
      }

      //동부고객본부
      if(bonbuName==='동부고객본부'){
        firstJisa='강릉지사';
        secondJisa='구리지사';
        thirdJisa='원주지사';
        fourthJisa='의정부지사';
        fifthJisa='춘천지사';

        this.bonbuNetIncreaseData.map((item)=>{
         
          if(item.sysdate.substring(5,7)==='02'){
            thisDateArray.push(item.sysdate);

            if(item.jojik3_name==='강릉지사') {
              firstJisaThisCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='구리지사') {
              secondJisaThisCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='원주지사') {
              thirdJisaThisCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='의정부지사') {
              fourthJisaThisCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='춘천지사') {
              fifthJisaThisCountSum+=item.count_sum;
            }
          }
          
          if(item.sysdate.substring(5,7)==='01'){
            lastDateArray.push(item.sysdate);

            if(item.jojik3_name==='강릉지사') {
              firstJisaLastCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='구리지사') {
              secondJisaLastCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='원주지사') {
              thirdJisaLastCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='의정부지사') {
              fourthJisaLastCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='춘천지사') {
              fifthJisaLastCountSum+=item.count_sum;
            }
          }              
        });
      }

      jisaTvThisObj={
        'sysdate':thisDateArray,
        'firstJisa':[firstJisa,firstJisaThisCountSum],
        'secondJisa':[secondJisa,secondJisaThisCountSum],
        'thirdJisa':[thirdJisa,thirdJisaThisCountSum],
        'fourthJisa':[fourthJisa,fourthJisaThisCountSum],
        'fifthJisa':[fifthJisa,fifthJisaThisCountSum],     
      }

      jisaTvLastObj={
        'sysdate':lastDateArray,
        'firstJisa':[firstJisa,firstJisaLastCountSum],
        'secondJisa':[secondJisa,secondJisaLastCountSum],
        'thirdJisa':[thirdJisa,thirdJisaLastCountSum],
        'fourthJisa':[fourthJisa,fourthJisaLastCountSum],
        'fifthJisa':[fifthJisa,fifthJisaLastCountSum],     
      }

      //전남/전북고객본부
      if(bonbuName==='전남/전북고객본부'){
        firstJisa='광주지사';
        secondJisa='목포지사';
        thirdJisa='순천지사';
        fourthJisa='익산지사';
        fifthJisa='전주지사';

        this.bonbuNetIncreaseData.map((item)=>{
          if(item.sysdate.substring(5,7)==='02'){
            thisDateArray.push(item.sysdate);
            if(item.jojik3_name==='광주지사') {
              firstJisaThisCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='목포지사') {
              secondJisaThisCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='순천지사') {
              thirdJisaThisCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='익산지사') {
              fourthJisaThisCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='전주지사') {
              fifthJisaThisCountSum+=item.count_sum;
            } 
          }                       
          
          if(item.sysdate.substring(5,7)==='01'){
            lastDateArray.push(item.sysdate);
            if(item.jojik3_name==='광주지사') {
              firstJisaLastCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='목포지사') {
              secondJisaLastCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='순천지사') {
              thirdJisaLastCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='익산지사') {
              fourthJisaLastCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='전주지사') {
              fifthJisaLastCountSum+=item.count_sum;
            } 
          }                       
        });
      }

      jisaTvThisObj={
        'sysdate':thisDateArray,
        'firstJisa':[firstJisa,firstJisaThisCountSum],
        'secondJisa':[secondJisa,secondJisaThisCountSum],
        'thirdJisa':[thirdJisa,thirdJisaThisCountSum],
        'fourthJisa':[fourthJisa,fourthJisaThisCountSum],
        'fifthJisa':[fifthJisa,fifthJisaThisCountSum],     
      }

      jisaTvLastObj={
        'sysdate': lastDateArray,
        'firstJisa':[firstJisa,firstJisaLastCountSum],
        'secondJisa':[secondJisa,secondJisaLastCountSum],
        'thirdJisa':[thirdJisa,thirdJisaLastCountSum],
        'fourthJisa':[fourthJisa,fourthJisaLastCountSum],
        'fifthJisa':[fifthJisa,fifthJisaLastCountSum],     
      }

      //강남고객본부
      if(bonbuName==='강남고객본부'){
        firstJisa='강남지사';
        secondJisa='분당지사';
        thirdJisa='송파지사';
        fourthJisa='수원지사';
        fifthJisa='용인지사';
        sixthJisa='평택지사';

        this.bonbuNetIncreaseData.map((item)=>{
          if(item.sysdate.substring(5,7)==='02'){
            thisDateArray.push(item.sysdate);

            if(item.jojik3_name==='강남지사') {
              firstJisaThisCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='분당지사') {
              secondJisaThisCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='송파지사') {
              thirdJisaThisCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='수원지사') {
              fourthJisaThisCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='용인지사') {
              fifthJisaThisCountSum+=item.count_sum;
            }    
            if(item.jojik3_name==='평택지사'){
              sixthJisaThisCountSum+=item.count_sum;
            }
          }
          
          if(item.sysdate.substring(5,7)==='01'){
            lastDateArray.push(item.sysdate);

            if(item.jojik3_name==='강남지사') {
              firstJisaLastCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='분당지사') {
              secondJisaLastCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='송파지사') {
              thirdJisaLastCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='수원지사') {
              fourthJisaLastCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='용인지사') {
              fifthJisaLastCountSum+=item.count_sum;
            }    
            if(item.jojik3_name==='평택지사'){
              sixthJisaLastCountSum+=item.count_sum;
            }
          }               
        });
      }

      jisaTvThisObj={
        'sysdate':thisDateArray,
        'firstJisa':[firstJisa,firstJisaThisCountSum],
        'secondJisa':[secondJisa,secondJisaThisCountSum],
        'thirdJisa':[thirdJisa,thirdJisaThisCountSum],
        'fourthJisa':[fourthJisa,fourthJisaThisCountSum],
        'fifthJisa':[fifthJisa,fifthJisaThisCountSum],  
        'sixthJisa':[sixthJisa,sixthJisaThisCountSum],   
      }

      jisaTvLastObj={
        'sysdate':lastDateArray,
        'firstJisa':[firstJisa,firstJisaLastCountSum],
        'secondJisa':[secondJisa,secondJisaLastCountSum],
        'thirdJisa':[thirdJisa,thirdJisaLastCountSum],
        'fourthJisa':[fourthJisa,fourthJisaLastCountSum],
        'fifthJisa':[fifthJisa,fifthJisaLastCountSum],  
        'sixthJisa':[sixthJisa,sixthJisaLastCountSum],   
      }


      //충남/충북고객본부
      if(bonbuName==='충남/충북고객본부'){
        firstJisa='대전지사';
        secondJisa='서대전지사';
        thirdJisa='천안지사';
        fourthJisa='청주지사';
        fifthJisa='충주지사';
        sixthJisa='홍성지사';

        this.bonbuNetIncreaseData.map((item)=>{

          if(item.sysdate.substring(5,7)==='02'){
            thisDateArray.push(item.sysdate);

            if(item.jojik3_name==='대전지사') {
              firstJisaThisCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='서대전지사') {
              secondJisaThisCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='천안지사') {
              thirdJisaThisCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='청주지사') {
              fourthJisaThisCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='충주지사') {
              fifthJisaThisCountSum+=item.count_sum;
            }    
            if(item.jojik3_name==='홍성지사'){
              sixthJisaThisCountSum+=item.count_sum;
            } 
          }    

          if(item.sysdate.substring(5,7)==='01'){
            lastDateArray.push(item.sysdate);

            if(item.jojik3_name==='대전지사') {
              firstJisaLastCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='서대전지사') {
              secondJisaLastCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='천안지사') {
              thirdJisaLastCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='청주지사') {
              fourthJisaLastCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='충주지사') {
              fifthJisaLastCountSum+=item.count_sum;
            }    
            if(item.jojik3_name==='홍성지사'){
              sixthJisaLastCountSum+=item.count_sum;
            } 
          }                     
        });
      }

      jisaTvThisObj={
        'sysdate':thisDateArray,
        'firstJisa':[firstJisa,firstJisaThisCountSum],
        'secondJisa':[secondJisa,secondJisaThisCountSum],
        'thirdJisa':[thirdJisa,thirdJisaThisCountSum],
        'fourthJisa':[fourthJisa,fourthJisaThisCountSum],
        'fifthJisa':[fifthJisa,fifthJisaThisCountSum],  
        'sixthJisa':[sixthJisa,sixthJisaThisCountSum],   
      }

      jisaTvLastObj={
        'sysdate':lastDateArray,
        'firstJisa':[firstJisa,firstJisaLastCountSum],
        'secondJisa':[secondJisa,secondJisaLastCountSum],
        'thirdJisa':[thirdJisa,thirdJisaLastCountSum],
        'fourthJisa':[fourthJisa,fourthJisaLastCountSum],
        'fifthJisa':[fifthJisa,fifthJisaLastCountSum],  
        'sixthJisa':[sixthJisa,sixthJisaLastCountSum],   
      }


      //대구/경북고객본부
      if(bonbuName==='대구/경북고객본부'){
        firstJisa='구미지사';
        secondJisa='달서지사';
        thirdJisa='동대구지사';
        fourthJisa='서대구지사';
        fifthJisa='안동지사';
        sixthJisa='포항지사';

        this.bonbuNetIncreaseData.map((item)=>{

          if(item.sysdate.substring(5,7)==='02'){
            thisDateArray.push(item.sysdate);

            if(item.jojik3_name==='구미지사') {
              firstJisaThisCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='달서지사') {
              secondJisaThisCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='동대구지사') {
              thirdJisaThisCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='서대구지사') {
              fourthJisaThisCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='안동지사') {
              fifthJisaThisCountSum+=item.count_sum;
            }    
            if(item.jojik3_name==='포항지사'){
              sixthJisaThisCountSum+=item.count_sum;
            }
          }      
          
          if(item.sysdate.substring(5,7)==='01'){
            lastDateArray.push(item.sysdate);

            if(item.jojik3_name==='구미지사') {
              firstJisaLastCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='달서지사') {
              secondJisaLastCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='동대구지사') {
              thirdJisaLastCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='서대구지사') {
              fourthJisaLastCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='안동지사') {
              fifthJisaLastCountSum+=item.count_sum;
            }    
            if(item.jojik3_name==='포항지사'){
              sixthJisaLastCountSum+=item.count_sum;
            }
          }               
        });
      }

      jisaTvThisObj={
        'sysdate':thisDateArray,
        'firstJisa':[firstJisa,firstJisaThisCountSum],
        'secondJisa':[secondJisa,secondJisaThisCountSum],
        'thirdJisa':[thirdJisa,thirdJisaThisCountSum],
        'fourthJisa':[fourthJisa,fourthJisaThisCountSum],
        'fifthJisa':[fifthJisa,fifthJisaThisCountSum],  
        'sixthJisa':[sixthJisa,sixthJisaThisCountSum],   
      }

      jisaTvLastObj={
        'sysdate':lastDateArray,
        'firstJisa':[firstJisa,firstJisaLastCountSum],
        'secondJisa':[secondJisa,secondJisaLastCountSum],
        'thirdJisa':[thirdJisa,thirdJisaLastCountSum],
        'fourthJisa':[fourthJisa,fourthJisaLastCountSum],
        'fifthJisa':[fifthJisa,fifthJisaLastCountSum],  
        'sixthJisa':[sixthJisa,sixthJisaLastCountSum],   
      }


      //부산/경남고객본부
      if(bonbuName==='부산/경남고객본부'){
        firstJisa='남부산지사';
        secondJisa='동부산지사';
        thirdJisa='북부산지사';
        fourthJisa='서부산지사';
        fifthJisa='울산지사';
        sixthJisa='진주지사';
        seventhJisa='창원지사';

        this.bonbuNetIncreaseData.map((item)=>{

          if(item.sysdate.substring(5,7)==='02'){
            thisDateArray.push(item.sysdate);

            if(item.jojik3_name==='남부산지사') {
              firstJisaThisCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='동부산지사') {
              secondJisaThisCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='북부산지사') {
              thirdJisaThisCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='서부산지사') {
              fourthJisaThisCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='울산지사') {
              fifthJisaThisCountSum+=item.count_sum;
            }    
            if(item.jojik3_name==='진주지사'){
              sixthJisaThisCountSum+=item.count_sum;
            }                      
            if(item.jojik3_name==='창원지사'){
              seventhJisaThisCountSum+=item.count_sum;
            }
          }

          if(item.sysdate.substring(5,7)==='01'){
            lastDateArray.push(item.sysdate);

            if(item.jojik3_name==='남부산지사') {
              firstJisaLastCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='동부산지사') {
              secondJisaLastCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='북부산지사') {
              thirdJisaLastCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='서부산지사') {
              fourthJisaLastCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='울산지사') {
              fifthJisaLastCountSum+=item.count_sum;
            }    
            if(item.jojik3_name==='진주지사'){
              sixthJisaLastCountSum+=item.count_sum;
            }                      
            if(item.jojik3_name==='창원지사'){
              seventhJisaLastCountSum+=item.count_sum;
            }
          }
        });
      }

      jisaTvThisObj={
        'sysdate':thisDateArray,
        'firstJisa':[firstJisa,firstJisaThisCountSum],
        'secondJisa':[secondJisa,secondJisaThisCountSum],
        'thirdJisa':[thirdJisa,thirdJisaThisCountSum],
        'fourthJisa':[fourthJisa,fourthJisaThisCountSum],
        'fifthJisa':[fifthJisa,fifthJisaThisCountSum],  
        'sixthJisa':[sixthJisa,sixthJisaThisCountSum],  
        'seventhJisa':[seventhJisa,seventhJisaThisCountSum], 
      }

      jisaTvLastObj={
        'sysdate':lastDateArray,
        'firstJisa':[firstJisa,firstJisaLastCountSum],
        'secondJisa':[secondJisa,secondJisaLastCountSum],
        'thirdJisa':[thirdJisa,thirdJisaLastCountSum],
        'fourthJisa':[fourthJisa,fourthJisaLastCountSum],
        'fifthJisa':[fifthJisa,fifthJisaLastCountSum],  
        'sixthJisa':[sixthJisa,sixthJisaLastCountSum],  
        'seventhJisa':[seventhJisa,seventhJisaLastCountSum], 
      }

      //서부고객본부
      if(bonbuName==='서부고객본부'){
        firstJisa='강서지사';
        secondJisa='구로지사';
        thirdJisa='부천지사';
        fourthJisa='서인천지사';
        fifthJisa='안산지사';
        sixthJisa='안양지사';
        seventhJisa='인천지사';

        this.bonbuNetIncreaseData.map((item)=>{

          if(item.sysdate.substring(5,7)==='02'){
            thisDateArray.push(item.sysdate);

            if(item.jojik3_name==='강서지사') {
              firstJisaThisCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='구로지사') {
              secondJisaThisCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='부천지사') {
              thirdJisaThisCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='서인천지사') {
              fourthJisaThisCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='안산지사') {
              fifthJisaThisCountSum+=item.count_sum;
            }    
            if(item.jojik3_name==='안양지사'){
              sixthJisaThisCountSum+=item.count_sum;
            }                      
            if(item.jojik3_name==='인천지사'){
              seventhJisaThisCountSum+=item.count_sum;
            }
          }

          if(item.sysdate.substring(5,7)==='01'){
            lastDateArray.push(item.sysdate);

            if(item.jojik3_name==='강서지사') {
              firstJisaLastCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='구로지사') {
              secondJisaLastCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='부천지사') {
              thirdJisaLastCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='서인천지사') {
              fourthJisaLastCountSum+=item.count_sum;
            }
            if(item.jojik3_name==='안산지사') {
              fifthJisaLastCountSum+=item.count_sum;
            }    
            if(item.jojik3_name==='안양지사'){
              sixthJisaLastCountSum+=item.count_sum;
            }                      
            if(item.jojik3_name==='인천지사'){
              seventhJisaLastCountSum+=item.count_sum;
            }
          }
        });
      }

      jisaTvThisObj={
        'sysdate':thisDateArray,
        'firstJisa':[firstJisa,firstJisaThisCountSum],
        'secondJisa':[secondJisa,secondJisaThisCountSum],
        'thirdJisa':[thirdJisa,thirdJisaThisCountSum],
        'fourthJisa':[fourthJisa,fourthJisaThisCountSum],
        'fifthJisa':[fifthJisa,fifthJisaThisCountSum],  
        'sixthJisa':[sixthJisa,sixthJisaThisCountSum],  
        'seventhJisa':[seventhJisa,seventhJisaThisCountSum], 
      }

      jisaTvLastObj={
        'sysdate':lastDateArray,
        'firstJisa':[firstJisa,firstJisaLastCountSum],
        'secondJisa':[secondJisa,secondJisaLastCountSum],
        'thirdJisa':[thirdJisa,thirdJisaLastCountSum],
        'fourthJisa':[fourthJisa,fourthJisaLastCountSum],
        'fifthJisa':[fifthJisa,fifthJisaLastCountSum],  
        'sixthJisa':[sixthJisa,sixthJisaLastCountSum],  
        'seventhJisa':[seventhJisa,seventhJisaLastCountSum], 
      }



      //console.log('jisaTvObj is ', jisaTvObj);
      return {'this':jisaTvThisObj,'last':jisaTvLastObj};
    },

  }
}
</script>
