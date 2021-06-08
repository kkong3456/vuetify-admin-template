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



const jisaNetNewIncreaseUrl='http://172.21.220.97/api/net/jisa.json/?prod=인터넷&kind=start&bonbu='

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
          text:'start day',
          value:'startdate',
        },
        {
          text:'end day',
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
      //console.log('url is ',url);
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
            name:yyy.firstJisa[0],
            startdate:yyy.sysdate[0].substring(2,10),
            enddate:yyy.sysdate[yyy.sysdate.length-1].substring(2,10),
            countSum:yyy.firstJisa[1]
          },
          {
            name:yyy.secondJisa[0],
            startdate:yyy.sysdate[0].substring(2,10),
            enddate:yyy.sysdate[yyy.sysdate.length-1].substring(2,10),
            countSum:yyy.secondJisa[1]
          },
          {
            name:yyy.thirdJisa[0],
            startdate:yyy.sysdate[0].substring(2,10),
            enddate:yyy.sysdate[yyy.sysdate.length-1].substring(2,10),
            countSum:yyy.thirdJisa[1]
          },
          {
            name:yyy.fourthJisa[0],
            startdate:yyy.sysdate[0].substring(2,10),
            enddate:yyy.sysdate[yyy.sysdate.length-1].substring(2,10),
            countSum:yyy.fourthJisa[1]
          },
          {
            name:yyy.fifthJisa[0]?yyy.fifthJisa[0]:null,
            startdate:yyy.sysdate[0].substring(2,10)?yyy.sysdate[0].substring(2,10):null,
            enddate:yyy.sysdate[yyy.sysdate.length-1].substring(2,10)?yyy.sysdate[yyy.sysdate.length-1].substring(2,10):null,
            countSum:yyy.fifthJisa[1]?yyy.fifthJisa[1]:null,
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
      }

      if(bonbuName==='강남고객본부' || bonbuName==='충남/충북고객본부' ||  bonbuName==='대구/경북고객본부'){

        this.desserts=[
          {
            name:yyy.firstJisa[0],
            startdate:yyy.sysdate[0].substring(2,10),
            enddate:yyy.sysdate[yyy.sysdate.length-1].substring(2,10),
            countSum:yyy.firstJisa[1]
          },
          {
            name:yyy.secondJisa[0],
            startdate:yyy.sysdate[0].substring(2,10),
            enddate:yyy.sysdate[yyy.sysdate.length-1].substring(2,10),
            countSum:yyy.secondJisa[1]
          },
          {
            name:yyy.thirdJisa[0],
            startdate:yyy.sysdate[0].substring(2,10),
            enddate:yyy.sysdate[yyy.sysdate.length-1].substring(2,10),
            countSum:yyy.thirdJisa[1]
          },
          {
            name:yyy.fourthJisa[0],
            startdate:yyy.sysdate[0].substring(2,10),
            enddate:yyy.sysdate[yyy.sysdate.length-1].substring(2,10),
            countSum:yyy.fourthJisa[1]
          },
          {
            name:yyy.fifthJisa[0]?yyy.fifthJisa[0]:null,
            startdate:yyy.sysdate[0].substring(2,10)?yyy.sysdate[0].substring(2,10):null,
            enddate:yyy.sysdate[yyy.sysdate.length-1].substring(2,10)?yyy.sysdate[yyy.sysdate.length-1].substring(2,10):null,
            countSum:yyy.fifthJisa[1]?yyy.fifthJisa[1]:null,
          },
          {
            name:yyy.sixthJisa[0],
            startdate:yyy.sysdate[0].substring(2,10),
            enddate:yyy.sysdate[yyy.sysdate.length-1].substring(2,10),
            countSum:yyy.sixthJisa[1]?yyy.sixthJisa[1]:'',
          },
          // {
          //   name:yyy.seventhJisa[0]?yyy.seventhJisa[0]:null,
          //   startdate:yyy.sysdate[0].substring(2,10)?yyy.sysdate[0].substring(2,10):null,
          //   enddate:yyy.sysdate[yyy.sysdate.length-1].substring(2,10)?yyy.sysdate[yyy.sysdate.length-1].substring(2,10):null,
          //   countSum:yyy.seventhJisa[1]?yyy.seventhJisa[1]:null,
          // },
        ]
      }

      if(bonbuName==='서부고객본부' || bonbuName==='부산/경남고객본부'){

        this.desserts=[
          {
            name:yyy.firstJisa[0],
            startdate:yyy.sysdate[0].substring(2,10),
            enddate:yyy.sysdate[yyy.sysdate.length-1].substring(2,10),
            countSum:yyy.firstJisa[1]
          },
          {
            name:yyy.secondJisa[0],
            startdate:yyy.sysdate[0].substring(2,10),
            enddate:yyy.sysdate[yyy.sysdate.length-1].substring(2,10),
            countSum:yyy.secondJisa[1]
          },
          {
            name:yyy.thirdJisa[0],
            startdate:yyy.sysdate[0].substring(2,10),
            enddate:yyy.sysdate[yyy.sysdate.length-1].substring(2,10),
            countSum:yyy.thirdJisa[1]
          },
          {
            name:yyy.fourthJisa[0],
            startdate:yyy.sysdate[0].substring(2,10),
            enddate:yyy.sysdate[yyy.sysdate.length-1].substring(2,10),
            countSum:yyy.fourthJisa[1]
          },
          {
            name:yyy.fifthJisa[0]?yyy.fifthJisa[0]:null,
            startdate:yyy.sysdate[0].substring(2,10)?yyy.sysdate[0].substring(2,10):null,
            enddate:yyy.sysdate[yyy.sysdate.length-1].substring(2,10)?yyy.sysdate[yyy.sysdate.length-1].substring(2,10):null,
            countSum:yyy.fifthJisa[1]?yyy.fifthJisa[1]:null,
          },
          {
            name:yyy.sixthJisa[0],
            startdate:yyy.sysdate[0].substring(2,10),
            enddate:yyy.sysdate[yyy.sysdate.length-1].substring(2,10),
            countSum:yyy.sixthJisa[1],
          },
          {
            name:yyy.seventhJisa[0]?yyy.seventhJisa[0]:null,
            startdate:yyy.sysdate[0].substring(2,10)?yyy.sysdate[0].substring(2,10):null,
            enddate:yyy.sysdate[yyy.sysdate.length-1].substring(2,10)?yyy.sysdate[yyy.sysdate.length-1].substring(2,10):null,
            countSum:yyy.seventhJisa[1]?yyy.seventhJisa[1]:null,
          },
        ]
      }
    } , 
    getBonbuNetIncreaseValue(bonbuName){    //axios로 받아온 데이터를 상품별로 Obj로 만든다
      let jisaTvObj={}
      let dateArray=new Array();

      let firstJisa='';
      let secondJisa='';
      let thirdJisa='';
      let fourthJisa='';
      let fifthJisa='';
      let sixthJisa='';
      let seventhJisa='';
      

      let firstJisaCountSum=0;
      let secondJisaCountSum=0;
      let thirdJisaCountSum=0;
      let fourthJisaCountSum=0;
      let fifthJisaCountSum=0;
      let sixthJisaCountSum=0;
      let seventhJisaCountSum=0;

      //북부고객본부
      if(bonbuName==='북부고객본부'){
        firstJisa='고양지사';
        secondJisa='광진지사';
        thirdJisa='광화문지사';
        fourthJisa='노원지사';
        fifthJisa='서대문지사';

        this.bonbuNetIncreaseData.map((item)=>{
          dateArray.push(item.sysdate);

          if(item.jojik3_name==='고양지사') {
            firstJisaCountSum+=item.count_sum;
          }
          if(item.jojik3_name==='광진지사') {
            secondJisaCountSum+=item.count_sum;
          }
          if(item.jojik3_name==='광화문지사') {
            thirdJisaCountSum+=item.count_sum;
          }
          if(item.jojik3_name==='노원지사') {
            fourthJisaCountSum+=item.count_sum;
          }
          if(item.jojik3_name==='서대문지사') {
            fifthJisaCountSum+=item.count_sum;
          }                          
        });
      }

      jisaTvObj={
        'sysdate':dateArray,
        'firstJisa':[firstJisa,firstJisaCountSum],
        'secondJisa':[secondJisa,secondJisaCountSum],
        'thirdJisa':[thirdJisa,thirdJisaCountSum],
        'fourthJisa':[fourthJisa,fourthJisaCountSum],
        'fifthJisa':[fifthJisa,fifthJisaCountSum],
        'sixthJisa':[sixthJisa,sixthJisaCountSum],
             
      }

      //동부고객본부
      if(bonbuName==='동부고객본부'){
        firstJisa='강릉지사';
        secondJisa='구리지사';
        thirdJisa='원주지사';
        fourthJisa='의정부지사';
        fifthJisa='춘천지사';

        this.bonbuNetIncreaseData.map((item)=>{
          dateArray.push(item.sysdate);

          if(item.jojik3_name==='강릉지사') {
            firstJisaCountSum+=item.count_sum;
          }
          if(item.jojik3_name==='구리지사') {
            secondJisaCountSum+=item.count_sum;
          }
          if(item.jojik3_name==='원주지사') {
            thirdJisaCountSum+=item.count_sum;
          }
          if(item.jojik3_name==='의정부지사') {
            fourthJisaCountSum+=item.count_sum;
          }
          if(item.jojik3_name==='춘천지사') {
            fifthJisaCountSum+=item.count_sum;
          }                          
        });
      }

      jisaTvObj={
        'sysdate':dateArray,
        'firstJisa':[firstJisa,firstJisaCountSum],
        'secondJisa':[secondJisa,secondJisaCountSum],
        'thirdJisa':[thirdJisa,thirdJisaCountSum],
        'fourthJisa':[fourthJisa,fourthJisaCountSum],
        'fifthJisa':[fifthJisa,fifthJisaCountSum],     
      }

      //전남/전북고객본부
      if(bonbuName==='전남/전북고객본부'){
        firstJisa='광주지사';
        secondJisa='목포지사';
        thirdJisa='순천지사';
        fourthJisa='익산지사';
        fifthJisa='전주지사';

        this.bonbuNetIncreaseData.map((item)=>{
          dateArray.push(item.sysdate);

          if(item.jojik3_name==='광주지사') {
            firstJisaCountSum+=item.count_sum;
          }
          if(item.jojik3_name==='목포지사') {
            secondJisaCountSum+=item.count_sum;
          }
          if(item.jojik3_name==='순천지사') {
            thirdJisaCountSum+=item.count_sum;
          }
          if(item.jojik3_name==='익산지사') {
            fourthJisaCountSum+=item.count_sum;
          }
          if(item.jojik3_name==='전주지사') {
            fifthJisaCountSum+=item.count_sum;
          }                          
        });
      }

      jisaTvObj={
        'sysdate':dateArray,
        'firstJisa':[firstJisa,firstJisaCountSum],
        'secondJisa':[secondJisa,secondJisaCountSum],
        'thirdJisa':[thirdJisa,thirdJisaCountSum],
        'fourthJisa':[fourthJisa,fourthJisaCountSum],
        'fifthJisa':[fifthJisa,fifthJisaCountSum],     
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
          dateArray.push(item.sysdate);

          if(item.jojik3_name==='강남지사') {
            firstJisaCountSum+=item.count_sum;
          }
          if(item.jojik3_name==='분당지사') {
            secondJisaCountSum+=item.count_sum;
          }
          if(item.jojik3_name==='송파지사') {
            thirdJisaCountSum+=item.count_sum;
          }
          if(item.jojik3_name==='수원지사') {
            fourthJisaCountSum+=item.count_sum;
          }
          if(item.jojik3_name==='용인지사') {
            fifthJisaCountSum+=item.count_sum;
          }    
          if(item.jojik3_name==='평택지사'){
            sixthJisaCountSum+=item.count_sum;
          }                      
        });
      }

      jisaTvObj={
        'sysdate':dateArray,
        'firstJisa':[firstJisa,firstJisaCountSum],
        'secondJisa':[secondJisa,secondJisaCountSum],
        'thirdJisa':[thirdJisa,thirdJisaCountSum],
        'fourthJisa':[fourthJisa,fourthJisaCountSum],
        'fifthJisa':[fifthJisa,fifthJisaCountSum],  
        'sixthJisa':[sixthJisa,sixthJisaCountSum],   
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
          dateArray.push(item.sysdate);

          if(item.jojik3_name==='대전지사') {
            firstJisaCountSum+=item.count_sum;
          }
          if(item.jojik3_name==='서대전지사') {
            secondJisaCountSum+=item.count_sum;
          }
          if(item.jojik3_name==='천안지사') {
            thirdJisaCountSum+=item.count_sum;
          }
          if(item.jojik3_name==='청주지사') {
            fourthJisaCountSum+=item.count_sum;
          }
          if(item.jojik3_name==='충주지사') {
            fifthJisaCountSum+=item.count_sum;
          }    
          if(item.jojik3_name==='홍성지사'){
            sixthJisaCountSum+=item.count_sum;
          }                      
        });
      }

      jisaTvObj={
        'sysdate':dateArray,
        'firstJisa':[firstJisa,firstJisaCountSum],
        'secondJisa':[secondJisa,secondJisaCountSum],
        'thirdJisa':[thirdJisa,thirdJisaCountSum],
        'fourthJisa':[fourthJisa,fourthJisaCountSum],
        'fifthJisa':[fifthJisa,fifthJisaCountSum],  
        'sixthJisa':[sixthJisa,sixthJisaCountSum],   
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
          dateArray.push(item.sysdate);

          if(item.jojik3_name==='구미지사') {
            firstJisaCountSum+=item.count_sum;
          }
          if(item.jojik3_name==='달서지사') {
            secondJisaCountSum+=item.count_sum;
          }
          if(item.jojik3_name==='동대구지사') {
            thirdJisaCountSum+=item.count_sum;
          }
          if(item.jojik3_name==='서대구지사') {
            fourthJisaCountSum+=item.count_sum;
          }
          if(item.jojik3_name==='안동지사') {
            fifthJisaCountSum+=item.count_sum;
          }    
          if(item.jojik3_name==='포항지사'){
            sixthJisaCountSum+=item.count_sum;
          }                      
        });
      }

      jisaTvObj={
        'sysdate':dateArray,
        'firstJisa':[firstJisa,firstJisaCountSum],
        'secondJisa':[secondJisa,secondJisaCountSum],
        'thirdJisa':[thirdJisa,thirdJisaCountSum],
        'fourthJisa':[fourthJisa,fourthJisaCountSum],
        'fifthJisa':[fifthJisa,fifthJisaCountSum],  
        'sixthJisa':[sixthJisa,sixthJisaCountSum],   
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
          dateArray.push(item.sysdate);

          if(item.jojik3_name==='남부산지사') {
            firstJisaCountSum+=item.count_sum;
          }
          if(item.jojik3_name==='동부산지사') {
            secondJisaCountSum+=item.count_sum;
          }
          if(item.jojik3_name==='북부산지사') {
            thirdJisaCountSum+=item.count_sum;
          }
          if(item.jojik3_name==='서부산지사') {
            fourthJisaCountSum+=item.count_sum;
          }
          if(item.jojik3_name==='울산지사') {
            fifthJisaCountSum+=item.count_sum;
          }    
          if(item.jojik3_name==='진주지사'){
            sixthJisaCountSum+=item.count_sum;
          }                      
          if(item.jojik3_name==='창원지사'){
            seventhJisaCountSum+=item.count_sum;
          }
        });
      }

      jisaTvObj={
        'sysdate':dateArray,
        'firstJisa':[firstJisa,firstJisaCountSum],
        'secondJisa':[secondJisa,secondJisaCountSum],
        'thirdJisa':[thirdJisa,thirdJisaCountSum],
        'fourthJisa':[fourthJisa,fourthJisaCountSum],
        'fifthJisa':[fifthJisa,fifthJisaCountSum],  
        'sixthJisa':[sixthJisa,sixthJisaCountSum],  
        'seventhJisa':[seventhJisa,seventhJisaCountSum], 
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
          dateArray.push(item.sysdate);

          if(item.jojik3_name==='강서지사') {
            firstJisaCountSum+=item.count_sum;
          }
          if(item.jojik3_name==='구로지사') {
            secondJisaCountSum+=item.count_sum;
          }
          if(item.jojik3_name==='부천지사') {
            thirdJisaCountSum+=item.count_sum;
          }
          if(item.jojik3_name==='서인천지사') {
            fourthJisaCountSum+=item.count_sum;
          }
          if(item.jojik3_name==='안산지사') {
            fifthJisaCountSum+=item.count_sum;
          }    
          if(item.jojik3_name==='안양지사'){
            sixthJisaCountSum+=item.count_sum;
          }                      
          if(item.jojik3_name==='인천지사'){
            seventhJisaCountSum+=item.count_sum;
          }
        });
      }

      jisaTvObj={
        'sysdate':dateArray,
        'firstJisa':[firstJisa,firstJisaCountSum],
        'secondJisa':[secondJisa,secondJisaCountSum],
        'thirdJisa':[thirdJisa,thirdJisaCountSum],
        'fourthJisa':[fourthJisa,fourthJisaCountSum],
        'fifthJisa':[fifthJisa,fifthJisaCountSum],  
        'sixthJisa':[sixthJisa,sixthJisaCountSum],  
        'seventhJisa':[seventhJisa,seventhJisaCountSum], 
      }



      //console.log('jisaTvObj is ', jisaTvObj);
      return jisaTvObj;
    },

  }
}
</script>
<style>

</style>
