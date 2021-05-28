<script>
import Vue from 'vue'
import { Line, mixins } from 'vue-chartjs'
import axios from 'axios';

const jisaNetNewIncreaseUrl='http://172.21.220.97/api/net/jisa.json/?prod=무선&kind=end&bonbu='

const { reactiveProp } = mixins

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



const options={      //chart options prop를 사용하지 않는 하위컴포넌트에서는 data에 변수값으로 처리
  responsive:true,
  maintainAspectRatio:false,//차트 width,ehgith  자동 크기조절
  // hoverBorderWidth:5,
  // borderWidth:20,
  // legend:{
  //   display:true,
  // },
  plugins:{
    legend:{
      display:true,
      align:'center',
    },
    title:{
      display:true,
      text:'XXX',
    },
  },
  elements:{
    point:{
      pointStyle:'circle',
      radius:3,
      // borderWidth:10,
      hoverRadius:5,
    },
    line:{
      tension:.3,
      //stepped:true,
    }

  }

  // scales:{
  //   yAxes:[{
  //     ticks:{
  //       min:0,
  //       // max:2500,
  //       //stepSize:500,
  //       //fontSie:52,
  //     },
  //     gridLines:{
  //       //display:false,
  //       drawBorder:false,
  //     }
  //   }],
  //   xAxes:[{
  //     display:true,
  //     gridLines:{
  //       display:false,
  //       drawBorder:false,
  //     }
  //   }]
  // }
} //end options

export default {
  //props: ['options'],
  name:'JisaWirelessHjLineChart',
  extends: Line,
  mixins: [reactiveProp],


  data(){
    return {
      dataCollection:null,
      bonbuNetIncreaseData:null,
      bonbuNetIncreaseValueObj:null,
      options:options,
      //selectedBonbu:'',

    }
  },
 
  async created () {
    await axios.get(jisaNetNewIncreaseUrl+'북부고객본부').then((res)=>{
      this.bonbuNetIncreaseData=res.data.results;
      
      this.fillData('북부고객본부');
      this.renderChart(this.dataCollection,this.options);
    }).catch((err)=>{
      console.log('데이터를 가져오지 못했습니다.',err);
    })
  },

  methods: {
    async changeBonbu(bonbuName){

      //console.log('url is ',url);
      await axios.get(jisaNetNewIncreaseUrl+bonbuName).then((res)=>{
        this.bonbuNetIncreaseData=res.data.results;
      
        this.fillData(bonbuName);
        this.renderChart(this.dataCollection,this.options);
      }).catch((err)=>{
        console.log('데이터를 가져오지 못했습니다.',err);
      })
    },



   

    fillData (bonbuName) {
      const yyy=this.getBonbuNetIncreaseValue(bonbuName);
     
      if(bonbuName==='북부고객본부' || bonbuName==='동부고객본부' || bonbuName==='전남/전북고객본부'){
        this.dataCollection = {
          labels:yyy.firstJisa.sysdate.map((day)=>day.substring(5,10)),
          datasets: [
            {
              label:yyy.firstJisa.jojik[0],     // 범례
              borderColor: '#20B2AA',
              backgroundColor:"transparent",
              data: yyy.firstJisa.countSum,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
              // hoverBorderWith:20,

            },
            {
              label:yyy.secondJisa.jojik[0],
              borderColor: '#5F9EA0',
              backgroundColor:"transparent",
              data: yyy.secondJisa.countSum,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
            },
            {
              label: yyy.thirdJisa.jojik[0],
              borderColor: '#7FFFD4',
              backgroundColor:"transparent",
              data: yyy.thirdJisa.countSum,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy.fourthJisa.jojik[0],
              borderColor: '#7FFFD4',
              backgroundColor:"transparent",
              data: yyy.fourthJisa.countSum,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy.fifthJisa.jojik[0],
              borderColor: '#8FFFD4',
              backgroundColor:"transparent",
              data: yyy.fifthJisa.countSum,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
            },
          ]
        }
      }
      if(bonbuName==='강남고객본부' || bonbuName==='충남/충북고객본부' || bonbuName==='대구/경북고객본부'){
        this.dataCollection = {
          labels:yyy.firstJisa.sysdate.map((day)=>day.substring(5,10)),
          datasets: [
            {
              label:yyy.firstJisa.jojik[0],     // 범례
              borderColor: '#20B2AA',
              backgroundColor:"transparent",
              data: yyy.firstJisa.countSum,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
              // hoverBorderWith:20,

            },
            {
              label:yyy.secondJisa.jojik[0],
              borderColor: '#5F9EA0',
              backgroundColor:"transparent",
              data: yyy.secondJisa.countSum,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
            },
            {
              label: yyy.thirdJisa.jojik[0],
              borderColor: '#7FFFD4',
              backgroundColor:"transparent",
              data: yyy.thirdJisa.countSum,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy.fourthJisa.jojik[0],
              borderColor: '#7FFFD4',
              backgroundColor:"transparent",
              data: yyy.fourthJisa.countSum,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy.fifthJisa.jojik[0],
              borderColor: '#8FFFD4',
              backgroundColor:"transparent",
              data: yyy.fifthJisa.countSum,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy.sixthJisa.jojik[0],
              borderColor: '#8FFFD4',
              backgroundColor:"transparent",
              data: yyy.sixthJisa.countSum,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
            },
          ]
        };  //dataCollection
      }

      if(bonbuName==='서부고객본부' || bonbuName==='부산/경남고객본부' ){
        this.dataCollection = {
          labels:yyy.firstJisa.sysdate.map((day)=>day.substring(5,10)),
          datasets: [
            {
              label:yyy.firstJisa.jojik[0],     // 범례
              borderColor: '#20B2AA',
              backgroundColor:"transparent",
              data: yyy.firstJisa.countSum?yyy.firstJisa.countSum:0,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
              // hoverBorderWith:20,

            },
            {
              label:yyy.secondJisa.jojik[0],
              borderColor: '#5F9EA0',
              backgroundColor:"transparent",
              data: yyy.secondJisa.countSum?yyy.secondJisa.countSum:0,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
            },
            {
              label: yyy.thirdJisa.jojik[0],
              borderColor: '#7FFFD4',
              backgroundColor:"transparent",
              data: yyy.thirdJisa.countSum?yyy.thirdJisa.countSum:0,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy.fourthJisa.jojik[0],
              borderColor: '#7FFFD4',
              backgroundColor:"transparent",
              data: yyy.fourthJisa.countSum?yyy.fourthJisa.countSum:0,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy.fifthJisa.jojik[0],
              borderColor: '#8FFFD4',
              backgroundColor:"transparent",
              data: yyy.fifthJisa.countSum?yyy.fifthJisa.countSum:0,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy.sixthJisa.jojik[0],
              borderColor: '#9FFFD4',
              backgroundColor:"transparent",
              data: yyy.sixthJisa.countSum?yyy.sixthJisa.countSum:0,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
            },
            {
              label: yyy.seventhJisa.jojik[0],
              borderColor: '#BFFFD4',
              backgroundColor:"transparent",
              data: yyy.seventhJisa.countSum?yyy.seventhJisa.countSum:0,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
            },
         
          ]
        };  //dataCollection
      }
    },  //fillData()


    getBonbuNetIncreaseValue(url){    //본부별 순익(y축)    
      let bonbuNetIncreaseValueObj={};
      let firstJisaObj={};
      let secondJisaObj={}
      let thirdJisaObj={}
      let fourthJisaObj={}
      let fifthJisaObj={}
      let sixthJisaObj={}
      let seventhJisaObj={}

      const firstSysdateArray=new Array();
      const firstjojik2Array=new Array();
      const firstjojik3Array=new Array();
      const firstProductArray=new Array();
      const firstCountSumArray=new Array();

      const secondSysdateArray=new Array();
      const secondjojik2Array=new Array();
      const secondjojik3Array=new Array();
      const secondProductArray=new Array();
      const secondCountSumArray=new Array();


      const thirdSysdateArray=new Array();
      const thirdjojik2Array=new Array();
      const thirdjojik3Array=new Array();
      const thirdProductArray=new Array();
      const thirdCountSumArray=new Array();

      const fourthSysdateArray=new Array();
      const fourthjojik2Array=new Array();
      const fourthjojik3Array=new Array();
      const fourthProductArray=new Array();
      const fourthCountSumArray=new Array();

      const fifthSysdateArray=new Array();
      const fifthjojik2Array=new Array();
      const fifthjojik3Array=new Array();
      const fifthProductArray=new Array();
      const fifthCountSumArray=new Array();


      const sixthSysdateArray=new Array();
      const sixthjojik2Array=new Array();
      const sixthjojik3Array=new Array();
      const sixthProductArray=new Array();
      const sixthCountSumArray=new Array();

      const seventhSysdateArray=new Array();
      const seventhjojik2Array=new Array();
      const seventhjojik3Array=new Array();
      const seventhProductArray=new Array();
      const seventhCountSumArray=new Array();

      

      this.bonbuNetIncreaseData.map((item)=>{
        //console.log('item is ',item);

        if(item.jojik3_name===bonbuJisaObj[url][0]){
          firstSysdateArray.push(item.sysdate);
          firstjojik3Array.push(item.jojik3_name);
          firstProductArray.push(item.prod2);
          firstCountSumArray.push(item.count_sum);
        }

        if(item.jojik3_name===bonbuJisaObj[url][1]){
          secondSysdateArray.push(item.sysdate);
          secondjojik3Array.push(item.jojik3_name);
          secondProductArray.push(item.prod2);
          secondCountSumArray.push(item.count_sum);
        }

        if(item.jojik3_name===bonbuJisaObj[url][2]){
          thirdSysdateArray.push(item.sysdate);
          thirdjojik3Array.push(item.jojik3_name);
          thirdProductArray.push(item.prod2);
          thirdCountSumArray.push(item.count_sum);
        }
        if(item.jojik3_name===bonbuJisaObj[url][3]){
          fourthSysdateArray.push(item.sysdate);
          fourthjojik3Array.push(item.jojik3_name);
          fourthProductArray.push(item.prod2);
          fourthCountSumArray.push(item.count_sum);
        }


        if(item.jojik3_name===bonbuJisaObj[url][4]){
          fifthSysdateArray.push(item.sysdate);
          fifthjojik3Array.push(item.jojik3_name);
          fifthProductArray.push(item.prod2);
          fifthCountSumArray.push(item.count_sum);
        }

        if(item.jojik3_name===bonbuJisaObj[url][5]){
          sixthSysdateArray.push(item.sysdate);
          sixthjojik3Array.push(item.jojik3_name);
          sixthProductArray.push(item.prod2);
          sixthCountSumArray.push(item.count_sum);
        }

        if(item.jojik3_name===bonbuJisaObj[url][6]){
          seventhSysdateArray.push(item.sysdate);
          seventhjojik3Array.push(item.jojik3_name);
          seventhProductArray.push(item.prod2);
          seventhCountSumArray.push(item.count_sum);
        }
      });
         
      firstJisaObj={
        'sysdate': firstSysdateArray,
        'jojik': firstjojik3Array,
        'product': firstProductArray,
        'countSum': firstCountSumArray,
      }

      secondJisaObj={
        'sysdate': secondSysdateArray,
        'jojik':secondjojik3Array,
        'product': secondProductArray,
        'countSum': secondCountSumArray,
      }

      thirdJisaObj={
        'sysdate': thirdSysdateArray,
        'jojik':thirdjojik3Array,
        'product': thirdProductArray,
        'countSum': thirdCountSumArray,
      }
      fourthJisaObj={
        'sysdate': fourthSysdateArray,
        'jojik': fourthjojik3Array,
        'product': fourthProductArray,
        'countSum': fourthCountSumArray,
      }

      fifthJisaObj={
        'sysdate': fifthSysdateArray,
        'jojik':fifthjojik3Array,
        'product': fifthProductArray,
        'countSum': fifthCountSumArray,
      }

      sixthJisaObj={
        'sysdate': sixthSysdateArray,
        'jojik': sixthjojik3Array,
        'product': sixthProductArray,
        'countSum': sixthCountSumArray,
      }
    
      seventhJisaObj={
        'sysdate': seventhSysdateArray,
        'jojik': seventhjojik3Array,
        'product': seventhProductArray,
        'countSum': seventhCountSumArray,
      }
    
        

        

      bonbuNetIncreaseValueObj={
        'firstJisa': firstJisaObj,
        'secondJisa': secondJisaObj,
        'thirdJisa': thirdJisaObj,
        'fourthJisa':fourthJisaObj,
        'fifthJisa':fifthJisaObj,
        'sixthJisa':sixthJisaObj,
        'seventhJisa':seventhJisaObj,
      }
      return bonbuNetIncreaseValueObj;
    },
  }  //methods
} //export default end
</script>
<style scoped>

</style>
