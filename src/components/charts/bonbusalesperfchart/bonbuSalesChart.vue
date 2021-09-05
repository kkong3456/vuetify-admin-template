
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
    // onClick:null,
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
      borderWidth:1,
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

  name:'BonbuSalesChart',
  extends: Line,
  props:{
    'propsdata':{
      type:String,
      default:undefined,
    },
    'propsproduct':{
      type:String,
      default:undefined,
    }
  },
  // mixins: [reactiveProp],


  data(){
    return {
      
     
      bonbuDataObj:null,

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
      
      this.fillData(this.selectedBonbu)
      this.renderChart(this.dataCollection,this.options);
    },
    
    fillData () {
      const yyy=this.getBonbuDataValue();
    
      this.dataCollection = {
        labels:yyy[2].basedate.map((day)=>day.substring(5,10)),
        datasets: [
          {
            label:yyy[0].Bonbu,     // 범례
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
            label:yyy[1].Bonbu,
            borderColor: '#5CE082',
            //backgroundColor:"rgba(92,224,130,.1)",
            data: yyy[1].vocSum,
            fill:false,
            tension:.3,
            pointHoverBorderColor:'#ff0000',
          },
          {
            label: yyy[2].Bonbu,
            borderColor: '#F7E872',
            //backgroundColor:"rgba(0,179,0,.1)",
            data: yyy[2].vocSum,
            fill:false,
            tension:.3,
            pointHoverBorderColor:'#ff0000',
          },

          {
            label: yyy[3].Bonbu,
            borderColor: '#E0815C',
            backgroundColor:"transparent",
            data: yyy[3].vocSum,
            fill:false,
            tension:.3,
            pointHoverBorderColor:'#ff0000',
          },

          {
            label: yyy[4].Bonbu,
            borderColor: '#C641FF',
            backgroundColor:"transparent",
            data: yyy[4].vocSum,
            fill:false,
            tension:.3,
            pointHoverBorderColor:'#ff0000',
          },

          {
            label: yyy[5].Bonbu,
            borderColor: '#C6aEFF',
            backgroundColor:"transparent",
            data: yyy[5].vocSum,
            fill:false,
            tension:.3,
            pointHoverBorderColor:'#ff0000',
          },

          {
            label: yyy[6].Bonbu,
            borderColor: '#C6aEFF',
            backgroundColor:"transparent",
            data: yyy[6].vocSum,
            fill:false,
            tension:.3,
            pointHoverBorderColor:'#ff0000',
          },

          {
            label: yyy[7].Bonbu,
            borderColor: '#C6aEFF',
            backgroundColor:"transparent",
            data: yyy[7].vocSum,
            fill:false,
            tension:.3,
            pointHoverBorderColor:'#ff0000',
          },
        ]
      }
      
     
    },  //fillData()

    getBonbuDataValue(){    
      let bonbuDataArray=[];

      let firstBonbuObj={};
      let secondBonbuObj={};
      let thirdBonbuObj={};
      let fourthBonbuObj={};
      let fifthBonbuObj={};
      let sixthBonbuObj={};
      let seventhBonbuObj={};
      let eighthBonbuObj={};

       
      const firstBonbuName='북부고객본부';
      const secondBonbuName='동부고객본부';
      const thirdBonbuName='강남고객본부';
      const fourthBonbuName='충남/충북고객본부';
      const fifthBonbuName='대구/경북고객본부';
      const sixthBonbuName='부산/경남고객본부';
      const seventhBonbuName='전남/전북고객본부';
      const eighthBonbuName='서부고객본부';

      let firstBonbuArray=[];
      let secondBonbuArray=[];
      let thirdBonbuArray=[];
      let fourthBonbuArray=[];
      let fifthBonbuArray=[];
      let sixthBonbuArray=[];
      let seventhBonbuArray=[];
      let eighthBonbuArray=[];

           
      let dateKeyArray=[];

      this.selectedStartNewDate=new Date(this.selectedStartDate.substring(0,4)+'-'+this.selectedStartDate.substring(4,6)+'-'+this.selectedStartDate.substring(6,8));
      this.selectedEndNewDate=new Date(this.selectedEndDate.substring(0,4)+'-'+this.selectedEndDate.substring(4,6)+'-'+this.selectedEndDate.substring(6,8)); 
      const dateDiffCnt=Math.ceil((this.selectedEndNewDate.getTime()-this.selectedStartNewDate.getTime())/(1000*3600*24)); 
      this.selectedStartNewDate=new Date(this.selectedStartNewDate.setDate(this.selectedStartNewDate.getDate()-1));
      
      for (let date=0;date<=dateDiffCnt;date++){  //시작일과 종료일 차이수 만큼 일자를 배열로 생성 '2021-04-01'
        dateKeyArray.push(this.displayDateText2(new Date(this.selectedStartNewDate.setDate(this.selectedStartNewDate.getDate()+1))));  //조회 날자를 배열로 만들고 형식을 '2021-04-01' 형식으로 변경
      }

        
      this.bonbuSalesData.map((item,index)=>{
          
        if(item.jojik2_name===firstBonbuName){
          firstBonbuArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});  //date혈식을 '2021-04-01' 문자열로
           
        }
        if(item.jojik2_name===secondBonbuName){
          secondBonbuArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
        }

        if(item.jojik2_name===thirdBonbuName){
          thirdBonbuArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
        }

        if(item.jojik2_name===fourthBonbuName){
          fourthBonbuArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
        }

        if(item.jojik2_name===fifthBonbuName){
          fifthBonbuArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
        }

        if(item.jojik2_name===sixthBonbuName){
          sixthBonbuArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
        }

        if(item.jojik2_name===seventhBonbuName){
          seventhBonbuArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
        }   
        
        if(item.jojik2_name===eighthBonbuName){
          eighthBonbuArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
        }   
      });

      const diffDateArray=(a,b)=>a.filter(x=>!b.includes(x));  // 두 배열에서 중복을 제거하고 남은 요소를 다시 배열로.

   
      //일자별로 실적 카운트 객체 만들기

      let firstBonbuDatePlusCntArray=Object.values(firstBonbuArray.reduce((acc,{date,cnt})=>{
      
        if(acc[date]) acc[date].cnt+=parseInt(cnt);
        else acc[date]={date,cnt:parseInt(cnt)};
       
        return acc;
      },{}));

      
      let firstImsiArray=[];   
      for (let i=0;i<firstBonbuDatePlusCntArray.length;i++){
        firstImsiArray.push(firstBonbuDatePlusCntArray[i].date);
      }
      firstImsiArray=diffDateArray(dateKeyArray,firstImsiArray);
      for(let i=0;i<firstImsiArray.length;i++){                               //voc발생건수가 0인 날자도 포함하여 그래프 데이터로 사용.
        firstBonbuDatePlusCntArray.push({'date':firstImsiArray[i],'cnt':0});
      }

     
      let secondBonbuDatePlusCntArray=Object.values([...secondBonbuArray].reduce((acc,{date,cnt})=>{
      
        if(acc[date]) acc[date].cnt+=parseInt(cnt);
        else acc[date]={date,cnt:parseInt(cnt)};
       
        return acc;
      },{}));

      let secondImsiArray=[];
      for(let i=0;i<secondBonbuDatePlusCntArray.length;i++){
        secondImsiArray.push(secondBonbuDatePlusCntArray[i].date);
      }
      secondImsiArray=diffDateArray(dateKeyArray,secondImsiArray);
      for(let i=0;i<secondImsiArray.length;i++){
        secondBonbuDatePlusCntArray.push({'date':secondImsiArray[i],'cnt':0});
      }

      let thirdBonbuDatePlusCntArray=Object.values([...thirdBonbuArray].reduce((acc,{date,cnt})=>{
      
        if(acc[date]) acc[date].cnt+=parseInt(cnt);
        else acc[date]={date,cnt:parseInt(cnt)};
       
        return acc;
      },{}));

      let thirdImsiArray=[];
      for(let i=0;i<thirdBonbuDatePlusCntArray.length;i++){
        thirdImsiArray.push(thirdBonbuDatePlusCntArray[i].date);
      }
      thirdImsiArray=diffDateArray(dateKeyArray,thirdImsiArray);
      for(let i=0;i<thirdImsiArray.length;i++){
        thirdBonbuDatePlusCntArray.push({'date':thirdImsiArray[i],'cnt':0});
      }


      let fourthBonbuDatePlusCntArray=Object.values([...fourthBonbuArray].reduce((acc,{date,cnt})=>{
      
        if(acc[date]) acc[date].cnt+=parseInt(cnt);
        else acc[date]={date,cnt:parseInt(cnt)};
       
        return acc;
      },{}));

      let fourthImsiArray=[];
      for(let i=0;i<fourthBonbuDatePlusCntArray.length;i++){
        fourthImsiArray.push(fourthBonbuDatePlusCntArray[i].date);
      }
      fourthImsiArray=diffDateArray(dateKeyArray,fourthImsiArray);
      for(let i=0;i<thirdImsiArray.length;i++){
        fourthBonbuDatePlusCntArray.push({'date':fourthImsiArray[i],'cnt':0});
      }

      let fifthBonbuDatePlusCntArray=Object.values([...fifthBonbuArray].reduce((acc,{date,cnt})=>{
      
        if(acc[date]) acc[date].cnt+=parseInt(cnt);
        else acc[date]={date,cnt:parseInt(cnt)};
       
        return acc;
      },{}));

      let fifthImsiArray=[];
      for(let i=0;i<fifthBonbuDatePlusCntArray.length;i++){
        fifthImsiArray.push(fifthBonbuDatePlusCntArray[i].date);
      }
      fifthImsiArray=diffDateArray(dateKeyArray,fifthImsiArray);
      for(let i=0;i<fifthImsiArray.length;i++){
        fifthBonbuDatePlusCntArray.push({'date':fifthImsiArray[i],'cnt':0});
      }

      let sixthBonbuDatePlusCntArray=Object.values([...sixthBonbuArray].reduce((acc,{date,cnt})=>{
      
        if(acc[date]) acc[date].cnt+=parseInt(cnt);
        else acc[date]={date,cnt:parseInt(cnt)};
       
        return acc;
      },{}));

      let sixthImsiArray=[];
      for(let i=0;i<sixthBonbuDatePlusCntArray.length;i++){
        sixthImsiArray.push(sixthBonbuDatePlusCntArray[i].date);
      }
      sixthImsiArray=diffDateArray(dateKeyArray,sixthImsiArray);
      for(let i=0;i<sixthImsiArray.length;i++){
        sixthBonbuDatePlusCntArray.push({'date':sixthImsiArray[i],'cnt':0});
      }

      let seventhBonbuDatePlusCntArray=Object.values([...seventhBonbuArray].reduce((acc,{date,cnt})=>{
      
        if(acc[date]) acc[date].cnt+=parseInt(cnt);
        else acc[date]={date,cnt:parseInt(cnt)};
       
        return acc;
      },{}));

      let seventhImsiArray=[];
      for(let i=0;i<seventhBonbuDatePlusCntArray.length;i++){
        seventhImsiArray.push(seventhBonbuDatePlusCntArray[i].date);
      }
      seventhImsiArray=diffDateArray(dateKeyArray,seventhImsiArray);
      for(let i=0;i<seventhImsiArray.length;i++){
        seventhBonbuDatePlusCntArray.push({'date':seventhImsiArray[i],'cnt':0});
      }

      let eighthBonbuDatePlusCntArray=Object.values([...eighthBonbuArray].reduce((acc,{date,cnt})=>{
      
        if(acc[date]) acc[date].cnt+=parseInt(cnt);
        else acc[date]={date,cnt:parseInt(cnt)};
       
        return acc;
      },{}));

      let eighthImsiArray=[];
      for(let i=0;i<eighthBonbuDatePlusCntArray.length;i++){
        eighthImsiArray.push(eighthBonbuDatePlusCntArray[i].date);
      }
      eighthImsiArray=diffDateArray(dateKeyArray,eighthImsiArray);
      for(let i=0;i<eighthImsiArray.length;i++){
        eighthBonbuDatePlusCntArray.push({'date':eighthImsiArray[i],'cnt':0});
      }

      //객체를 일자별로 오름차순으로 정렬하기
      const compare=(key)=>(a,b)=>{
        return a[key]>a[key]?1:a[key]<b[key]?-1:0;
      };

      firstBonbuDatePlusCntArray=firstBonbuDatePlusCntArray.sort(compare('date'));
      secondBonbuDatePlusCntArray=secondBonbuDatePlusCntArray.sort(compare('date'));
      thirdBonbuDatePlusCntArray=thirdBonbuDatePlusCntArray.sort(compare('date'));
      fourthBonbuDatePlusCntArray=fourthBonbuDatePlusCntArray.sort(compare('date'));
      fifthBonbuDatePlusCntArray=fifthBonbuDatePlusCntArray.sort(compare('date'));
      sixthBonbuDatePlusCntArray=sixthBonbuDatePlusCntArray.sort(compare('date'));
      seventhBonbuDatePlusCntArray=seventhBonbuDatePlusCntArray.sort(compare('date'));
      eighthBonbuDatePlusCntArray=eighthBonbuDatePlusCntArray.sort(compare('date'));


      
      //일자와 VOC합으로 일어진 객체를 별도 분리

      let firstBonbuDayArray=[];
      let firstBonbuDayCntArray=[];

      let secondBonbuDayArray=[];
      let secondBonbuDayCntArray=[];

      let thirdBonbuDayArray=[];
      let thirdBonbuDayCntArray=[];

      let fourthBonbuDayArray=[];
      let fourthBonbuDayCntArray=[];

      let fifthBonbuDayArray=[];
      let fifthBonbuDayCntArray=[];

      let sixthBonbuDayArray=[];
      let sixthBonbuDayCntArray=[];

      let seventhBonbuDayArray=[];
      let seventhBonbuDayCntArray=[];

      let eighthBonbuDayArray=[];
      let eighthBonbuDayCntArray=[];

     
      for(let i=0;i<firstBonbuDatePlusCntArray.length;i++){
       
        firstBonbuDayArray.push(firstBonbuDatePlusCntArray[i].date);
        firstBonbuDayCntArray.push(firstBonbuDatePlusCntArray[i].cnt);   

      }

          
      for(let i=0;i<secondBonbuDatePlusCntArray.length;i++){
       
        secondBonbuDayArray.push(secondBonbuDatePlusCntArray[i].date);
        secondBonbuDayCntArray.push(secondBonbuDatePlusCntArray[i].cnt);          
      }

      for(let i=0;i<thirdBonbuDatePlusCntArray.length;i++){
       
        thirdBonbuDayArray.push(thirdBonbuDatePlusCntArray[i].date);
        thirdBonbuDayCntArray.push(thirdBonbuDatePlusCntArray[i].cnt);          
      }

      for(let i=0;i<fourthBonbuDatePlusCntArray.length;i++){
       
        fourthBonbuDayArray.push(fourthBonbuDatePlusCntArray[i].date);
        fourthBonbuDayCntArray.push(fourthBonbuDatePlusCntArray[i].cnt);          
      }

      for(let i=0;i<fifthBonbuDatePlusCntArray.length;i++){
       
        fifthBonbuDayArray.push(fifthBonbuDatePlusCntArray[i].date);
        fifthBonbuDayCntArray.push(fifthBonbuDatePlusCntArray[i].cnt);          
      }

      for(let i=0;i<sixthBonbuDatePlusCntArray.length;i++){
       
        sixthBonbuDayArray.push(sixthBonbuDatePlusCntArray[i].date);
        sixthBonbuDayCntArray.push(sixthBonbuDatePlusCntArray[i].cnt);          
      }

      for(let i=0;i<seventhBonbuDatePlusCntArray.length;i++){
       
        seventhBonbuDayArray.push(seventhBonbuDatePlusCntArray[i].date);
        seventhBonbuDayCntArray.push(seventhBonbuDatePlusCntArray[i].cnt);          
      }
      for(let i=0;i<eighthBonbuDatePlusCntArray.length;i++){
       
        eighthBonbuDayArray.push(eighthBonbuDatePlusCntArray[i].date);
        eighthBonbuDayCntArray.push(eighthBonbuDatePlusCntArray[i].cnt);          
      }

     
      firstBonbuObj={
        'Bonbu':firstBonbuName,
        'basedate':firstBonbuDayArray,
        'vocSum':firstBonbuDayCntArray,
      }
      secondBonbuObj={
        'Bonbu':secondBonbuName,
        'basedate':secondBonbuDayArray,
        'vocSum':secondBonbuDayCntArray,
      }

      thirdBonbuObj={
        'Bonbu':thirdBonbuName,
        'basedate':thirdBonbuDayArray,
        'vocSum':thirdBonbuDayCntArray,
      }

       
      fourthBonbuObj={
        'Bonbu':fourthBonbuName,
        'basedate':fourthBonbuDayArray,
        'vocSum':fourthBonbuDayCntArray,
      }
      fifthBonbuObj={
        'Bonbu':fifthBonbuName,
        'basedate':fifthBonbuDayArray,
        'vocSum':fifthBonbuDayCntArray,
      }

      sixthBonbuObj={
        'Bonbu':sixthBonbuName,
        'basedate':sixthBonbuDayArray,
        'vocSum':sixthBonbuDayCntArray,
      }
      
      seventhBonbuObj={
        'Bonbu':seventhBonbuName,
        'basedate':seventhBonbuDayArray,
        'vocSum':seventhBonbuDayCntArray,
      }

      eighthBonbuObj={
        'Bonbu':eighthBonbuName,
        'basedate':eighthBonbuDayArray,
        'vocSum':eighthBonbuDayCntArray,
      }

      bonbuDataArray=[firstBonbuObj,secondBonbuObj,thirdBonbuObj,fourthBonbuObj,fifthBonbuObj,sixthBonbuObj,seventhBonbuObj,eighthBonbuObj];
      
      return bonbuDataArray;
    }
  }
}      
    

</script>
<style scoped>

</style>
