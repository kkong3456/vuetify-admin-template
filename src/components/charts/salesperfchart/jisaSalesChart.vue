
<script>
import Vue from 'vue'
import { Line, mixins} from 'vue-chartjs'
import axios from 'axios';
import eventBus from '@/js/eventBus';


// const { reactiveProp } = mixins

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
  hoverBorderWidth:5,
  legend:{
    display:true,
    onClick:function(e,legendItem){  //https://codepen.io/jordanwillis/pen/BWKKKo 참고
      const index=legendItem.datasetIndex;  // 선택된 범례만 선택되고 나머지는 사라진다.
      
      const ci=this.chart;
      let alreadyHidden=(ci.getDatasetMeta(index).hidden===null)?false:ci.getDatasetMeta(index).hidden;
     
      ci.data.datasets.forEach((e,i)=>{
        const meta=ci.getDatasetMeta(i);

        if(i!==index){
          if(!alreadyHidden){
            meta.hidden=meta.hidden===null?!meta.hidden:null;
          }else if(meta.hidden===null){
            meta.hidden=true;
          }
        }else if(i===index){
          meta.hidden=null;
        }
      });
      ci.update();
    },
  },
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
      borderWidth:1.2,
      // stepped:true,
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

  name:'JisaSalesChart',
  extends: Line,
  props:{
    'propsdata':{
      type:String,
      default:undefined,
    },
    'propsproduct':{
      type:String,
      default:undefined,
    },
    'propsbonbu':{
      type:String,
      default:undefined,
    },
    'propsdongbu':{
      type:String,
      default:undefined,
    }
  },
  // mixins: [reactiveProp],


  data(){
    return {
      
     
      bonbuDataObj:null,
      bonbuSalesData:null,

      selectedProduct:'인터넷',
      
     
      selectedStartDate:'20210220',
      selectedEndDate:'20210226',

      selectedStartNewDate:new Date('2021-02-20'),
      selectedEndNewDate:new Date('2021-02-26'),

      lastWeekStartDate:'20210213',
      lastWeekEndDate:'20210219',
      imsiThisStart:'2021,02,13',
      imsiThisEnd:'2021,02,19',

      
      dataCollection:null,
      options:options,
     
    }
  },
 
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
    // this.renderChart(this.dataCollection,this.options)
  },
  mounted(){

    this.renderChart(this.dataCollection,this.options);
  },

  methods: {
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
    displayDateText2 (datetime) {
      if (datetime) {
        datetime = typeof (datetime) === 'string' ? new Date(datetime) : datetime
        const yyyy = datetime.getFullYear()
        const mm = datetime.getMonth() + 1 > 9 ? datetime.getMonth() + 1 : `0${datetime.getMonth() + 1}`
        const dd = datetime.getDate() > 9 ? datetime.getDate() : `0${datetime.getDate()}`
        const displayStr = (this.format || 'YYYY-MM-DD').replace('YYYY', yyyy).replace('MM', mm).replace('DD', dd)
        return displayStr
      } else {
        return undefined
      }
    },

    displayTextDate (dateText) {
      if (dateText) {
        const dateTime = typeof (dateText) === 'string' ? new Date(dateText) : dateText
        // const yyyy = datetime.getFullYear()
        // const mm = datetime.getMonth() + 1 > 9 ? datetime.getMonth() + 1 : `0${datetime.getMonth() + 1}`
        // const dd = datetime.getDate() > 9 ? datetime.getDate() : `0${datetime.getDate()}`
        // const displayStr = (this.format || 'YYYY-MM-DD').replace('YYYY', yyyy).replace('MM', mm).replace('DD', dd)
        return dateTime;
      } else {
        return undefined
      }
    },

   
    async changeDate(){
      const thisBonbuSalesUrl=`http://172.21.220.97/api/net/jisa.json/?prod=${this.propsproduct}&kind=${this.propsdata}&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&bonbu=`;
     
     
      await axios.all(
        [
          axios.get(thisBonbuSalesUrl+'북부고객본부'),
          axios.get(thisBonbuSalesUrl+'동부고객본부'),
          axios.get(thisBonbuSalesUrl+'강남고객본부'),
          axios.get(thisBonbuSalesUrl+'충남/충북고객본부'),
          axios.get(thisBonbuSalesUrl+'대구/경북고객본부'),
          axios.get(thisBonbuSalesUrl+'부산/경남고객본부'),
          axios.get(thisBonbuSalesUrl+'전남/전북고객본부'),
          axios.get(thisBonbuSalesUrl+'서부고객본부'),

          
        ]
      ).then(axios.spread(
        (res1,res2,res3,res4,res5,res6,res7,res8)=>{
          this.bonbuSalesData1=res1.data.results;
          this.bonbuSalesData2=res2.data.results;
          this.bonbuSalesData3=res3.data.results;
          this.bonbuSalesData4=res4.data.results;
          this.bonbuSalesData5=res5.data.results;
          this.bonbuSalesData6=res6.data.results;
          this.bonbuSalesData7=res7.data.results;
          this.bonbuSalesData8=res8.data.results;

          

          this.bonbuSalesData=[
            ...this.bonbuSalesData1,
            ...this.bonbuSalesData2,
            ...this.bonbuSalesData3,
            ...this.bonbuSalesData4,
            ...this.bonbuSalesData5,
            ...this.bonbuSalesData6,
            ...this.bonbuSalesData7,
            ...this.bonbuSalesData8,
          
          ]; 
          
        })).catch((err)=>{
        console.log('금주 일자 데이터를 가져 오지 못했습니다',err);
      });
      
      this.fillData()
      this.renderChart(this.dataCollection,this.options);
    },

    async changeBonbuProduct(selectedBonbu,selectedProduct){
      this.propsproduct=selectedProduct;
      this.propsbonbu=selectedBonbu;

      const thisBonbuSalesUrl=`http://172.21.220.97/api/net/jisa.json/?prod=${this.propsproduct}&kind=${this.propsdata}&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&bonbu=`;
      console.log('thisBonbuSalesUrl is ',thisBonbuSalesUrl);
      await axios.all(
        [
          axios.get(thisBonbuSalesUrl+'북부고객본부'),
          axios.get(thisBonbuSalesUrl+'동부고객본부'),
          axios.get(thisBonbuSalesUrl+'강남고객본부'),
          axios.get(thisBonbuSalesUrl+'충남/충북고객본부'),
          axios.get(thisBonbuSalesUrl+'대구/경북고객본부'),
          axios.get(thisBonbuSalesUrl+'부산/경남고객본부'),
          axios.get(thisBonbuSalesUrl+'전남/전북고객본부'),
          axios.get(thisBonbuSalesUrl+'서부고객본부'),

          
        ]
      ).then(axios.spread(
        (res1,res2,res3,res4,res5,res6,res7,res8)=>{
          this.bonbuSalesData1=res1.data.results;
          this.bonbuSalesData2=res2.data.results;
          this.bonbuSalesData3=res3.data.results;
          this.bonbuSalesData4=res4.data.results;
          this.bonbuSalesData5=res5.data.results;
          this.bonbuSalesData6=res6.data.results;
          this.bonbuSalesData7=res7.data.results;
          this.bonbuSalesData8=res8.data.results;

          

          this.bonbuSalesData=[
            ...this.bonbuSalesData1,
            ...this.bonbuSalesData2,
            ...this.bonbuSalesData3,
            ...this.bonbuSalesData4,
            ...this.bonbuSalesData5,
            ...this.bonbuSalesData6,
            ...this.bonbuSalesData7,
            ...this.bonbuSalesData8,
          
          ]; 
          
        })).catch((err)=>{
        console.log('금주 일자 데이터를 가져 오지 못했습니다',err);
      });
      
      this.fillData();
      this.renderChart(this.dataCollection,this.options);
    },

    
    
    fillData () {
      const yyy=this.getBonbuDataValue();
      // console.log('yyyy is ',yyy);

      if(this.propsbonbu==='북부고객본부'||this.propsbonbu==='동부고객본부'||this.propsbonbu==='전남/전북고객본부'){
        this.dataCollection = {
          labels:yyy[2].basedate.map((day)=>day.substring(5,10)),
          datasets: [
            {
              label:yyy[0].Jisa,     // 범례
              borderColor: '#6697F8',          
              //backgroundColor:"#6697F8",
              //backgroundColor:'rgba(56,56,155,0.3)',
              data: yyy[0].vocSum,
              fill:false,
              tension:.3,
              pointHoverBorderColor:'#ff0000',
              //borderWidth:1,

            },
            {
              label:yyy[1].Jisa,
              borderColor: '#5CE082',
              //backgroundColor:"rgba(92,224,130,.1)",
              data: yyy[1].vocSum,
              fill:false,
              tension:.3,
              pointHoverBorderColor:'#ff0000',
            },
            {
              label: yyy[2].Jisa,
              borderColor: '#F7E872',
              //backgroundColor:"rgba(0,179,0,.1)",
              data: yyy[2].vocSum,
              fill:false,
              tension:.3,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy[3].Jisa,
              borderColor: '#E0815C',
              backgroundColor:"transparent",
              data: yyy[3].vocSum,
              fill:false,
              tension:.3,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy[4].Jisa,
              borderColor: '#C641FF',
              backgroundColor:"transparent",
              data: yyy[4].vocSum,
              fill:false,
              tension:.3,
              pointHoverBorderColor:'#ff0000',
            },

          ]
        }
      }

      if(this.propsbonbu==='강남고객본부'||this.propsbonbu==='충남/충북고객본부'||this.propsbonbu==='대구/경북고객본부'){
        this.dataCollection = {
          labels:yyy[2].basedate.map((day)=>day.substring(5,10)),
          datasets: [
            {
              label:yyy[0].Jisa,     // 범례
              borderColor: '#6697F8',          
              //backgroundColor:"#6697F8",
              //backgroundColor:'rgba(56,56,155,0.3)',
              data: yyy[0].vocSum,
              fill:false,
              tension:.3,
              pointHoverBorderColor:'#ff0000',
              //borderWidth:1,

            },
            {
              label:yyy[1].Jisa,
              borderColor: '#5CE082',
              //backgroundColor:"rgba(92,224,130,.1)",
              data: yyy[1].vocSum,
              fill:false,
              tension:.3,
              pointHoverBorderColor:'#ff0000',
            },
            {
              label: yyy[2].Jisa,
              borderColor: '#F7E872',
              //backgroundColor:"rgba(0,179,0,.1)",
              data: yyy[2].vocSum,
              fill:false,
              tension:.3,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy[3].Jisa,
              borderColor: '#E0815C',
              backgroundColor:"transparent",
              data: yyy[3].vocSum,
              fill:false,
              tension:.3,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy[4].Jisa,
              borderColor: '#C641FF',
              backgroundColor:"transparent",
              data: yyy[4].vocSum,
              fill:false,
              tension:.3,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy[5].Jisa,
              borderColor: '#C6aEFF',
              backgroundColor:"transparent",
              data: yyy[5].vocSum,
              fill:false,
              tension:.3,
              pointHoverBorderColor:'#ff0000',
            },

            // {
            //   label: yyy[6].Jisa,
            //   borderColor: '#115924',
            //   backgroundColor:"transparent",
            //   data: yyy[6].vocSum,
            //   fill:false,
            //   tension:.3,
            //   pointHoverBorderColor:'#ff0000',
            // },

          ]
        }
      }

      if(this.propsbonbu==='부산/경남고객본부'||this.propsbonbu==='서부고객본부'){
        this.dataCollection = {
          labels:yyy[2].basedate.map((day)=>day.substring(5,10)),
          datasets: [
            {
              label:yyy[0].Jisa,     // 범례
              borderColor: '#6697F8',          
              //backgroundColor:"#6697F8",
              //backgroundColor:'rgba(56,56,155,0.3)',
              data: yyy[0].vocSum,
              fill:false,
              tension:.3,
              pointHoverBorderColor:'#ff0000',
              //borderWidth:1,

            },
            {
              label:yyy[1].Jisa,
              borderColor: '#5CE082',
              //backgroundColor:"rgba(92,224,130,.1)",
              data: yyy[1].vocSum,
              fill:false,
              tension:.3,
              pointHoverBorderColor:'#ff0000',
            },
            {
              label: yyy[2].Jisa,
              borderColor: '#F7E872',
              //backgroundColor:"rgba(0,179,0,.1)",
              data: yyy[2].vocSum,
              fill:false,
              tension:.3,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy[3].Jisa,
              borderColor: '#E0815C',
              backgroundColor:"transparent",
              data: yyy[3].vocSum,
              fill:false,
              tension:.3,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy[4].Jisa,
              borderColor: '#C641FF',
              backgroundColor:"transparent",
              data: yyy[4].vocSum,
              fill:false,
              tension:.3,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy[5].Jisa,
              borderColor: '#C6aEFF',
              backgroundColor:"transparent",
              data: yyy[5].vocSum,
              fill:false,
              tension:.3,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy[6].Jisa,
              borderColor: '#115924',
              backgroundColor:"transparent",
              data: yyy[6].vocSum,
              fill:false,
              tension:.3,
              pointHoverBorderColor:'#ff0000',
            },

          ]
        }
      }
      
     
    },  //fillData()

    getBonbuDataValue(){    
      let jisaDataArray=[];

      let firstJisaObj={};
      let secondJisaObj={};
      let thirdJisaObj={};
      let fourthJisaObj={};
      let fifthJisaObj={};
      let sixthJisaObj={};
      let seventhJisaObj={};
      let eighthJisaObj={};

      let firstJisa='';
      let secondJisa='';
      let thirdJisa='';
      let fourthJisa='';
      let fifthJisa='';
      let sixthJisa='';
      let seventhJisa='';
      let eighthJisa='';
       
     
      let firstOneJisaArray=[];
      let secondOneJisaArray=[];
      let thirdOneJisaArray=[];
      let fourthOneJisaArray=[];
      let fifthOneJisaArray=[];

      let firstTwoJisaArray=[];
      let secondTwoJisaArray=[];
      let thirdTwoJisaArray=[];
      let fourthTwoJisaArray=[];
      let fifthTwoJisaArray=[];

      let firstThreeJisaArray=[];
      let secondThreeJisaArray=[];
      let thirdThreeJisaArray=[];
      let fourthThreeJisaArray=[];
      let fifthThreeJisaArray=[];
      let sixthThreeJisaArray=[];

      let firstFourJisaArray=[];
      let secondFourJisaArray=[];
      let thirdFourJisaArray=[];
      let fourthFourJisaArray=[];
      let fifthFourJisaArray=[];
      let sixthFourJisaArray=[];

      let firstFiveJisaArray=[];
      let secondFiveJisaArray=[];
      let thirdFiveJisaArray=[];
      let fourthFiveJisaArray=[];
      let fifthFiveJisaArray=[];
      let sixthFiveJisaArray=[];

      let firstSixJisaArray=[];
      let secondSixJisaArray=[];
      let thirdSixJisaArray=[];
      let fourthSixJisaArray=[];
      let fifthSixJisaArray=[];
      let sixthSixJisaArray=[];
      let seventhSixJisaArray=[];

      let firstSevenJisaArray=[];
      let secondSevenJisaArray=[];
      let thirdSevenJisaArray=[];
      let fourthSevenJisaArray=[];
      let fifthSevenJisaArray=[];
      let sixthSevenJisaArray=[];
      let seventhSevenJisaArray=[];
    
    
      let firstEightJisaArray=[];
      let secondEightJisaArray=[];
      let thirdEightJisaArray=[];
      let fourthEightJisaArray=[];
      let fifthEightJisaArray=[];
      let sixthEightJisaArray=[];
      let seventhEightJisaArray=[];
      let eighthEightJisaArray=[];
    

           
      let dateKeyArray=[];

      this.selectedStartNewDate=new Date(this.selectedStartDate.substring(0,4)+'-'+this.selectedStartDate.substring(4,6)+'-'+this.selectedStartDate.substring(6,8));
      this.selectedEndNewDate=new Date(this.selectedEndDate.substring(0,4)+'-'+this.selectedEndDate.substring(4,6)+'-'+this.selectedEndDate.substring(6,8)); 
      const dateDiffCnt=Math.ceil((this.selectedEndNewDate.getTime()-this.selectedStartNewDate.getTime())/(1000*3600*24)); 
      this.selectedStartNewDate=new Date(this.selectedStartNewDate.setDate(this.selectedStartNewDate.getDate()-1));
      
      for (let date=0;date<=dateDiffCnt;date++){  //시작일과 종료일 차이수 만큼 일자를 배열로 생성 '2021-04-01'
        dateKeyArray.push(this.displayDateText2(new Date(this.selectedStartNewDate.setDate(this.selectedStartNewDate.getDate()+1))));  //조회 날자를 배열로 만들고 형식을 '2021-04-01' 형식으로 변경
      }

      this.bonbuSalesData.map((item,index)=>{
        if(item.jojik2_name==='북부고객본부'){
          firstJisa='고양지사';
          secondJisa='광진지사';
          thirdJisa='광화문지사';
          fourthJisa='노원지사';
          fifthJisa='서대문지사';

          if(item.jojik3_name===firstJisa){
            firstOneJisaArray.push({'jisa':firstJisa,'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});  //date혈식을 '2021-04-01' 문자열로
          }
          if(item.jojik3_name===secondJisa){
            secondOneJisaArray.push({'jisa':secondJisa,'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }

          if(item.jojik3_name===thirdJisa){
            thirdOneJisaArray.push({'jisa':thirdJisa,'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }

          if(item.jojik3_name===fourthJisa){
            fourthOneJisaArray.push({'jisa':fourthJisa,'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }

          if(item.jojik3_name===fifthJisa){
            fifthOneJisaArray.push({'jisa':fifthJisa,'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }
        }
                  
        if(item.jojik2_name==='동부고객본부'){
          firstJisa='강릉지사';
          secondJisa='구리지사';
          thirdJisa='원주지사';
          fourthJisa='의정부지사';
          fifthJisa='춘천지사';

          if(item.jojik3_name===firstJisa){
            firstTwoJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});  //date혈식을 '2021-04-01' 문자열로
          }
          if(item.jojik3_name===secondJisa){
            secondTwoJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }

          if(item.jojik3_name===thirdJisa){
            thirdTwoJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }

          if(item.jojik3_name===fourthJisa){
            fourthTwoJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }

          if(item.jojik3_name===fifthJisa){
            fifthTwoJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }
        } 
          
        if(item.jojik2_name==='강남고객본부'){
          firstJisa='강남지사';
          secondJisa='분당지사';
          thirdJisa='송파지사';
          fourthJisa='수원지사';
          fifthJisa='용인지사';
          sixthJisa='평택지사';

          if(item.jojik3_name===firstJisa){
            firstThreeJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});  //date혈식을 '2021-04-01' 문자열로
          }
          if(item.jojik3_name===secondJisa){
            secondThreeJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }

          if(item.jojik3_name===thirdJisa){
            thirdThreeJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }

          if(item.jojik3_name===fourthJisa){
            fourthThreeJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }

          if(item.jojik3_name===fifthJisa){
            fifthThreeJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }

          if(item.jojik3_name===sixthJisa){
            sixthThreeJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }
        } 
          
        if(item.jojik2_name==='충남/충북고객본부'){
          firstJisa='대전지사';
          secondJisa='서대전지사';
          thirdJisa='천안지사';
          fourthJisa='청주지사';
          fifthJisa='충주지사';
          sixthJisa='홍성지사';

          if(item.jojik3_name===firstJisa){
            firstFourJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});  //date혈식을 '2021-04-01' 문자열로
          }
          if(item.jojik3_name===secondJisa){
            secondFourJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }

          if(item.jojik3_name===thirdJisa){
            thirdFourJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }

          if(item.jojik3_name===fourthJisa){
            fourthFourJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }

          if(item.jojik3_name===fifthJisa){
            fifthFourJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }

          if(item.jojik3_name===sixthJisa){
            sixthFourJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }
        } 

        if(item.jojik2_name==='대구/경북고객본부'){
          firstJisa='구미지사';
          secondJisa='달서지사';
          thirdJisa='동대구지사';
          fourthJisa='서대구지사';
          fifthJisa='안동지사';
          sixthJisa='포항지사';

          if(item.jojik3_name===firstJisa){
            firstFiveJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});  //date혈식을 '2021-04-01' 문자열로
          }
          if(item.jojik3_name===secondJisa){
            secondFiveJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }

          if(item.jojik3_name===thirdJisa){
            thirdFiveJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }

          if(item.jojik3_name===fourthJisa){
            fourthFiveJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }

          if(item.jojik3_name===fifthJisa){
            fifthFiveJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }

          if(item.jojik3_name===sixthJisa){
            sixthFiveJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }
        } 

        if(item.jojik2_name==='부산/경남고객본부'){
          firstJisa='남부산지사';
          secondJisa='동부산지사';
          thirdJisa='북부산지사';
          fourthJisa='서부산지사';
          fifthJisa='울산지사';
          sixthJisa='진주지사';
          seventhJisa='창원지사';

          if(item.jojik3_name===firstJisa){
            firstSixJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});  //date혈식을 '2021-04-01' 문자열로
          }
          if(item.jojik3_name===secondJisa){
            secondSixJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }

          if(item.jojik3_name===thirdJisa){
            thirdSixJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }

          if(item.jojik3_name===fourthJisa){
            fourthSixJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }

          if(item.jojik3_name===fifthJisa){
            fifthSixJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }

          if(item.jojik3_name===sixthJisa){
            sixthSixJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }
          if(item.jojik3_name===seventhJisa){
            sixthSixJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }
        } 

        if(item.jojik2_name==='전남/전북고객본부'){
          firstJisa='광주지사';
          secondJisa='목포지사';
          thirdJisa='순천지사';
          fourthJisa='익산지사';
          fifthJisa='전주지사';

          if(item.jojik3_name===firstJisa){
            firstSevenJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});  //date혈식을 '2021-04-01' 문자열로
          }
          if(item.jojik3_name===secondJisa){
            secondSevenJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }

          if(item.jojik3_name===thirdJisa){
            thirdSevenJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }

          if(item.jojik3_name===fourthJisa){
            fourthSevenJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }

          if(item.jojik3_name===fifthJisa){
            fifthSevenJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }

       
        } 

        if(item.jojik2_name==='서부고객본부'){
          firstJisa='강서지사';
          secondJisa='구로지사';
          thirdJisa='부천지사';
          fourthJisa='서인천지사';
          fifthJisa='안산지사';
          sixthJisa='안양지사';
          seventhJisa='인천지사';

          if(item.jojik3_name===firstJisa){
            firstEightJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});  //date혈식을 '2021-04-01' 문자열로
          }
          if(item.jojik3_name===secondJisa){
            secondEightJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }

          if(item.jojik3_name===thirdJisa){
            thirdEightJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }

          if(item.jojik3_name===fourthJisa){
            fourthEightJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }

          if(item.jojik3_name===fifthJisa){
            fifthEightJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }     
        } 
      });
  

      const diffDateArray=(a,b)=>a.filter(x=>!b.includes(x));  // 두 배열에서 중복을 제거하고 남은 요소를 다시 배열로.

   
      //일자별로 실적 카운트 객체 만들기
      // console.log('firstOne jisa',Object.values([...firstOneJisaArray,...secondOneJisaArray]));

      // let firstBonbuDatePlusCntArray=Object.values([...firstOneJisaArray,...secondOneJisaArray].reduce((acc,{jisa,date,cnt})=>{
        
      //   if(acc[date]) {
      //     acc[date].cnt+=parseInt(cnt);
          
      //   }else{
      //     acc[date]={date,cnt:parseInt(cnt)};
      //   }
       
      //   return acc;
      // },{}));

      // console.log('xxx',firstBonbuDatePlusCntArray);

      let firstBonbuDatePlusCntArray=[...firstOneJisaArray,...secondOneJisaArray,...thirdOneJisaArray,...fourthOneJisaArray,...fifthOneJisaArray];
      let secondBonbuDatePlusCntArray=[...firstTwoJisaArray,...secondTwoJisaArray,...thirdTwoJisaArray,...fourthTwoJisaArray,...fifthTwoJisaArray];
      let thirdBonbuDatePlusCntArray=[...firstThreeJisaArray,...secondThreeJisaArray,...thirdThreeJisaArray,...fourthThreeJisaArray,...fifthThreeJisaArray,...sixthThreeJisaArray];
     


      // let firstImsiArray=[];   
      // for (let i=0;i<firstBonbuDatePlusCntArray.length;i++){
      //   firstImsiArray.push(firstBonbuDatePlusCntArray[i].date);
      // }
      // firstImsiArray=diffDateArray(dateKeyArray,firstImsiArray);
      // for(let i=0;i<firstImsiArray.length;i++){                               //voc발생건수가 0인 날자도 포함하여 그래프 데이터로 사용.
      //   firstBonbuDatePlusCntArray.push({'date':firstImsiArray[i],'cnt':0});
      // }
      // console.log('firstJisaDatePlusCntArray',firstJisaDatePlusCntArray);

      // let secondJisaDatePlusCntArray=Object.values([...secondJisaArray].reduce((acc,{date,cnt})=>{
      
      //   if(acc[date]) acc[date].cnt+=parseInt(cnt);
      //   else acc[date]={date,cnt:parseInt(cnt)};  
      //   return acc;
      // },{}));

      // let secondImsiArray=[];
      // for(let i=0;i<secondJisaDatePlusCntArray.length;i++){
      //   secondImsiArray.push(secondJisaDatePlusCntArray[i].date);
      // }
      // secondImsiArray=diffDateArray(dateKeyArray,secondImsiArray);
      // for(let i=0;i<secondImsiArray.length;i++){
      //   secondJisaDatePlusCntArray.push({'date':secondImsiArray[i],'cnt':0});
      // }

      // let thirdJisaDatePlusCntArray=Object.values([...thirdJisaArray].reduce((acc,{date,cnt})=>{
      
      //   if(acc[date]) acc[date].cnt+=parseInt(cnt);
      //   else acc[date]={date,cnt:parseInt(cnt)};
       
      //   return acc;
      // },{}));

      // let thirdImsiArray=[];
      // for(let i=0;i<thirdJisaDatePlusCntArray.length;i++){
      //   thirdImsiArray.push(thirdJisaDatePlusCntArray[i].date);
      // }
      // thirdImsiArray=diffDateArray(dateKeyArray,thirdImsiArray);
      // for(let i=0;i<thirdImsiArray.length;i++){
      //   thirdJisaDatePlusCntArray.push({'date':thirdImsiArray[i],'cnt':0});
      // }


      // let fourthJisaDatePlusCntArray=Object.values([...fourthJisaArray].reduce((acc,{date,cnt})=>{
      
      //   if(acc[date]) acc[date].cnt+=parseInt(cnt);
      //   else acc[date]={date,cnt:parseInt(cnt)};
       
      //   return acc;
      // },{}));

      // let fourthImsiArray=[];
      // for(let i=0;i<fourthJisaDatePlusCntArray.length;i++){
      //   fourthImsiArray.push(fourthJisaDatePlusCntArray[i].date);
      // }
      // fourthImsiArray=diffDateArray(dateKeyArray,fourthImsiArray);
      // for(let i=0;i<thirdImsiArray.length;i++){
      //   fourthJisaDatePlusCntArray.push({'date':fourthImsiArray[i],'cnt':0});
      // }

      // let fifthJisaDatePlusCntArray=Object.values([...fifthJisaArray].reduce((acc,{date,cnt})=>{
      
      //   if(acc[date]) acc[date].cnt+=parseInt(cnt);
      //   else acc[date]={date,cnt:parseInt(cnt)};
       
      //   return acc;
      // },{}));

      // let fifthImsiArray=[];
      // for(let i=0;i<fifthJisaDatePlusCntArray.length;i++){
      //   fifthImsiArray.push(fifthJisaDatePlusCntArray[i].date);
      // }
      // fifthImsiArray=diffDateArray(dateKeyArray,fifthImsiArray);
      // for(let i=0;i<fifthImsiArray.length;i++){
      //   fifthJisaDatePlusCntArray.push({'date':fifthImsiArray[i],'cnt':0});
      // }

      // let sixthJisaDatePlusCntArray=Object.values([...sixthJisaArray].reduce((acc,{date,cnt})=>{
      
      //   if(acc[date]) acc[date].cnt+=parseInt(cnt);
      //   else acc[date]={date,cnt:parseInt(cnt)};
       
      //   return acc;
      // },{}));

      // let sixthImsiArray=[];
      // for(let i=0;i<sixthJisaDatePlusCntArray.length;i++){
      //   sixthImsiArray.push(sixthJisaDatePlusCntArray[i].date);
      // }
      // sixthImsiArray=diffDateArray(dateKeyArray,sixthImsiArray);
      // for(let i=0;i<sixthImsiArray.length;i++){
      //   sixthJisaDatePlusCntArray.push({'date':sixthImsiArray[i],'cnt':0});
      // }

      // let seventhJisaDatePlusCntArray=Object.values([...seventhJisaArray].reduce((acc,{date,cnt})=>{
      
      //   if(acc[date]) acc[date].cnt+=parseInt(cnt);
      //   else acc[date]={date,cnt:parseInt(cnt)};
       
      //   return acc;
      // },{}));

      // let seventhImsiArray=[];
      // for(let i=0;i<seventhJisaDatePlusCntArray.length;i++){
      //   seventhImsiArray.push(seventhJisaDatePlusCntArray[i].date);
      // }
      // seventhImsiArray=diffDateArray(dateKeyArray,seventhImsiArray);
      // for(let i=0;i<seventhImsiArray.length;i++){
      //   seventhJisaDatePlusCntArray.push({'date':seventhImsiArray[i],'cnt':0});
      // }

      // let eighthJisaDatePlusCntArray=Object.values([...eighthJisaArray].reduce((acc,{date,cnt})=>{
      
      //   if(acc[date]) acc[date].cnt+=parseInt(cnt);
      //   else acc[date]={date,cnt:parseInt(cnt)};
       
      //   return acc;
      // },{}));

      // let eighthImsiArray=[];
      // for(let i=0;i<eighthJisaDatePlusCntArray.length;i++){
      //   eighthImsiArray.push(eighthJisaDatePlusCntArray[i].date);
      // }
      // eighthImsiArray=diffDateArray(dateKeyArray,eighthImsiArray);
      // for(let i=0;i<eighthImsiArray.length;i++){
      //   eighthJisaDatePlusCntArray.push({'date':eighthImsiArray[i],'cnt':0});
      // }

      //객체를 일자별로 오름차순으로 정렬하기
      const compare=(key)=>(a,b)=>{
        return a[key]>a[key]?1:a[key]<b[key]?-1:0;
      };

      firstBonbuDatePlusCntArray=firstJisaDatePlusCntArray.sort(compare('date'));
      secondBonbuDatePlusCntArray=secondJisaDatePlusCntArray.sort(compare('date'));
      thirdBonbuDatePlusCntArray=thirdJisaDatePlusCntArray.sort(compare('date'));
      // fourthJisaDatePlusCntArray=fourthJisaDatePlusCntArray.sort(compare('date'));
      // fifthJisaDatePlusCntArray=fifthJisaDatePlusCntArray.sort(compare('date'));
      // sixthJisaDatePlusCntArray=sixthJisaDatePlusCntArray.sort(compare('date'));
      // seventhJisaDatePlusCntArray=seventhJisaDatePlusCntArray.sort(compare('date'));
      // eighthJisaDatePlusCntArray=eighthJisaDatePlusCntArray.sort(compare('date'));

      
      //일자와 VOC합으로 일어진 객체를 별도 분리
      let firstJisaNameArray=[];
      let firstJisaDayArray=[];
      let firstJisaDayCntArray=[];

      let secondJisaNameArray=[];
      let secondJisaDayArray=[];
      let secondJisaDayCntArray=[];

      let thirdJisaNameArray=[];
      let thirdJisaDayArray=[];
      let thirdJisaDayCntArray=[];

      let fourthJisaDayArray=[];
      let fourthJisaDayCntArray=[];

      let fifthJisaDayArray=[];
      let fifthJisaDayCntArray=[];

      let sixthJisaDayArray=[];
      let sixthJisaDayCntArray=[];

      let seventhJisaDayArray=[];
      let seventhJisaDayCntArray=[];

      let eighthJisaDayArray=[];
      let eighthJisaDayCntArray=[];

      for(let i=0;i<firstBonbuDatePlusCntArray.length;i++){
        firstJisaNameArray.push(firstBonbuDatePlusCntArray[i].jisa);
        firstJisaDayArray.push(firstBonbuDatePlusCntArray[i].date);
        firstJisaDayCntArray.push(firstBonbuDatePlusCntArray[i].cnt);   
      }

          
      for(let i=0;i<secondBonbuDatePlusCntArray.length;i++){  
        scondJisaNameArray.push(secondBonbuDatePlusCntArray[i].jisa);  
        secondJisaDayArray.push(secondBonbuPlusCntArray[i].date);
        secondJisaDayCntArray.push(secondBonbuDatePlusCntArray[i].cnt);          
      }

      for(let i=0;i<thirdBonbuDatePlusCntArray.length;i++){     
        thirdJisaNameArray.push(thirdBonbuDatePlusCntArray[i].jisa);
        thirdJisaDayArray.push(thirdBonbuDatePlusCntArray[i].date);
        thirdJisaDayCntArray.push(thirdBonbuDatePlusCntArray[i].cnt);          
      }

      console.log('zzzzz',thirdJisaDayArray);

      // for(let i=0;i<fourthJisaDatePlusCntArray.length;i++){     
      //   fourthJisaDayArray.push(fourthJisaDatePlusCntArray[i].date);
      //   fourthJisaDayCntArray.push(fourthJisaDatePlusCntArray[i].cnt);          
      // }

      // for(let i=0;i<fifthJisaDatePlusCntArray.length;i++){
       
      //   fifthJisaDayArray.push(fifthJisaDatePlusCntArray[i].date);
      //   fifthJisaDayCntArray.push(fifthJisaDatePlusCntArray[i].cnt);          
      // }

      // for(let i=0;i<sixthJisaDatePlusCntArray.length;i++){
       
      //   sixthJisaDayArray.push(sixthJisaDatePlusCntArray[i].date);
      //   sixthJisaDayCntArray.push(sixthJisaDatePlusCntArray[i].cnt);          
      // }

      // for(let i=0;i<seventhJisaDatePlusCntArray.length;i++){
       
      //   seventhJisaDayArray.push(seventhJisaDatePlusCntArray[i].date);
      //   seventhJisaDayCntArray.push(seventhJisaDatePlusCntArray[i].cnt);          
      // }
      // for(let i=0;i<eighthJisaDatePlusCntArray.length;i++){
       
      //   eighthJisaDayArray.push(eighthJisaDatePlusCntArray[i].date);
      //   eighthJisaDayCntArray.push(eighthJisaDatePlusCntArray[i].cnt);          
      // }

     
      firstJisaObj={
        'Jisa':firstJisa,
        'basedate':firstJisaDayArray,
        'vocSum':firstJisaDayCntArray,
      }
      secondJisaObj={
        'Jisa':secondJisa,
        'basedate':secondJisaDayArray,
        'vocSum':secondJisaDayCntArray,
      }

      thirdJisaObj={
        'Jisa':thirdJisa,
        'basedate':thirdJisaDayArray,
        'vocSum':thirdJisaDayCntArray,
      }

       
      fourthJisaObj={
        'Jisa':fourthJisa,
        'basedate':fourthJisaDayArray,
        'vocSum':fourthJisaDayCntArray,
      }
      fifthJisaObj={
        'Jisa':fifthJisa,
        'basedate':fifthJisaDayArray,
        'vocSum':fifthJisaDayCntArray,
      }

      sixthJisaObj={
        'Jisa':sixthJisa,
        'basedate':sixthJisaDayArray,
        'vocSum':sixthJisaDayCntArray,
      }
      
      seventhJisaObj={
        'Jisa':seventhJisa,
        'basedate':seventhJisaDayArray,
        'vocSum':seventhJisaDayCntArray,
      }

      eighthJisaObj={
        'Jisa':eighthJisa,
        'basedate':eighthJisaDayArray,
        'vocSum':eighthJisaDayCntArray,
      }

      jisaDataArray=[firstJisaObj,secondJisaObj,thirdJisaObj,fourthJisaObj,fifthJisaObj,sixthJisaObj,seventhJisaObj,eighthJisaObj];
      
      return jisaDataArray;
    }
  }
}      
    

</script>
<style scoped>

</style>
