
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

      selectedBonbu1:'북부고객본부',
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

      this.changeDate(this.selectedBonbu1);
      
    }); 
    this.changeDate(this.selectedBonbu1);
    // this.renderChart(this.dataCollection,this.options)
  },
  mounted(){
    this.renderChart(this.dataCollection,this.options);  //chart render는 mount단계에서 처리해야 한다.SPA
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

    async changeDate(selectedBonbu1){
      const thisBonbuSalesUrl=`http://172.21.220.97/api/net/jisa.json/?prod=${this.propsproduct}&kind=${this.propsdata}&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&bonbu=${selectedBonbu1}`;
     
      await axios.get(thisBonbuSalesUrl).then((res)=>{
        this.bonbuSalesData=res.data.results;
        
      }).catch((err)=>{
        console.log(`${selectedBonbu1} 데이터를 가져올 수 없습니다.`);
      })

      this.fillData(selectedBonbu1)
      this.renderChart(this.dataCollection,this.options);
    },

    async changedBonbu(selectedBonbu1){
      const thisBonbuSalesUrl=`http://172.21.220.97/api/net/jisa.json/?prod=${this.propsproduct}&kind=${this.propsdata}&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&bonbu=${selectedBonbu1}`;
     
      await axios.get(thisBonbuSalesUrl).then((res)=>{
        this.bonbuSalesData=res.data.results;
      
      }).catch((err)=>{
        console.log(`${selectedBonbu1} 데이터를 가져올 수 없습니다.`);
      })
      
     
      
      this.fillData(selectedBonbu1)
      this.renderChart(this.dataCollection,this.options);
    },
    
    fillData (selectedBonbu1) {
      const yyy=this.getBonbuDataValue(selectedBonbu1);

      if(selectedBonbu1==='북부고객본부' || selectedBonbu1==='동부고객본부' || selectedBonbu1==='전남/전북고객본부'){
        
        this.dataCollection = {
          labels:yyy[0].basedate.map((day)=>day.substring(5,10)),
          datasets: [
            {
              label:yyy[0].jisa,     // 범례
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
              label:yyy[1].jisa,
              borderColor: '#5CE082',
              //backgroundColor:"rgba(92,224,130,.1)",
              data: yyy[1].vocSum,
              fill:false,
              tension:.3,
              pointHoverBorderColor:'#ff0000',
            },
            {
              label: yyy[2].jisa,
              borderColor: '#F7E872',
              //backgroundColor:"rgba(0,179,0,.1)",
              data: yyy[2].vocSum,
              fill:false,
              tension:.3,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy[3].jisa,
              borderColor: '#E0815C',
              backgroundColor:"transparent",
              data: yyy[3].vocSum,
              fill:false,
              tension:.3,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy[4].jisa,
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

      if(selectedBonbu1==='강남고객본부' || selectedBonbu1==='충남/충북고객본부' || selectedBonbu1==='대구/경북고객본부'){
        
        this.dataCollection = {
          labels:yyy[0].basedate.map((day)=>day.substring(5,10)),
          datasets: [
            {
              label:yyy[0].jisa,     // 범례
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
              label:yyy[1].jisa,
              borderColor: '#5CE082',
              //backgroundColor:"rgba(92,224,130,.1)",
              data: yyy[1].vocSum,
              fill:false,
              tension:.3,
              pointHoverBorderColor:'#ff0000',
            },
            {
              label: yyy[2].jisa,
              borderColor: '#F7E872',
              //backgroundColor:"rgba(0,179,0,.1)",
              data: yyy[2].vocSum,
              fill:false,
              tension:.3,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy[3].jisa,
              borderColor: '#E0815C',
              backgroundColor:"transparent",
              data: yyy[3].vocSum,
              fill:false,
              tension:.3,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy[4].jisa,
              borderColor: '#C641FF',
              backgroundColor:"transparent",
              data: yyy[4].vocSum,
              fill:false,
              tension:.3,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy[5].jisa,
              borderColor: '#C6aEFF',
              backgroundColor:"transparent",
              data: yyy[5].vocSum,
              fill:false,
              tension:.3,
              pointHoverBorderColor:'#ff0000',
            },
      

          ]
        }
      }

      if(selectedBonbu1==='서부고객본부' || selectedBonbu1==='부산/경남고객본부'){
        
        this.dataCollection = {
          labels:yyy[0].basedate.map((day)=>day.substring(5,10)),
          datasets: [
            {
              label:yyy[0].jisa,     // 범례
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
              label:yyy[1].jisa,
              borderColor: '#5CE082',
              //backgroundColor:"rgba(92,224,130,.1)",
              data: yyy[1].vocSum,
              fill:false,
              tension:.3,
              pointHoverBorderColor:'#ff0000',
            },
            {
              label: yyy[2].jisa,
              borderColor: '#F7E872',
              //backgroundColor:"rgba(0,179,0,.1)",
              data: yyy[2].vocSum,
              fill:false,
              tension:.3,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy[3].jisa,
              borderColor: '#E0815C',
              backgroundColor:"transparent",
              data: yyy[3].vocSum,
              fill:false,
              tension:.3,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy[4].jisa,
              borderColor: '#C641FF',
              backgroundColor:"transparent",
              data: yyy[4].vocSum,
              fill:false,
              tension:.3,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy[5].jisa,
              borderColor: '#C6aEFF',
              backgroundColor:"transparent",
              data: yyy[5].vocSum,
              fill:false,
              tension:.3,
              pointHoverBorderColor:'#ff0000',
            },
      

            {
              label: yyy[6].jisa,
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

    getBonbuDataValue(selectedBonbu1){  
      
      let bonbuDataArray=[];

      let firstJisaObj={};
      let secondJisaObj={};
      let thirdJisaObj={};
      let fourthJisaObj={};
      let fifthJisaObj={};
      let sixthJisaObj={};
      let seventhJisaObj={};
            
      let firstJisaName='';
      let secondJisaName='';
      let thirdJisaName='';
      let fourthJisaName='';
      let fifthJisaName='';
      let sixthJisaName='';
      let seventhJisaName='';
     
      let firstJisaArray=[];
      let secondJisaArray=[];
      let thirdJisaArray=[];
      let fourthJisaArray=[];
      let fifthJisaArray=[];
      let sixthJisaArray=[];
      let seventhJisaArray=[];
                
      let dateKeyArray=[];

      this.selectedStartNewDate=new Date(this.selectedStartDate.substring(0,4)+'-'+this.selectedStartDate.substring(4,6)+'-'+this.selectedStartDate.substring(6,8));
      this.selectedEndNewDate=new Date(this.selectedEndDate.substring(0,4)+'-'+this.selectedEndDate.substring(4,6)+'-'+this.selectedEndDate.substring(6,8)); 
      const dateDiffCnt=Math.ceil((this.selectedEndNewDate.getTime()-this.selectedStartNewDate.getTime())/(1000*3600*24)); 
      this.selectedStartNewDate=new Date(this.selectedStartNewDate.setDate(this.selectedStartNewDate.getDate()-1));
      
      for (let date=0;date<=dateDiffCnt;date++){  //시작일과 종료일 차이수 만큼 일자를 배열로 생성 '2021-04-01'
        dateKeyArray.push(this.displayDateText2(new Date(this.selectedStartNewDate.setDate(this.selectedStartNewDate.getDate()+1))));  //조회 날자를 배열로 만들고 형식을 '2021-04-01' 형식으로 변경
      }

              
      this.bonbuSalesData.map((item,index)=>{
        if(selectedBonbu1==='북부고객본부'){
          firstJisaName='고양지사';
          secondJisaName='광진지사';
          thirdJisaName='광화문지사';
          fourthJisaName='노원지사';
          fifthJisaName='서대문지사';
        }
        if(selectedBonbu1==='동부고객본부'){
          firstJisaName='강릉지사';
          secondJisaName='구리지사';
          thirdJisaName='원주지사';
          fourthJisaName='의정부지사';
          fifthJisaName='춘천지사';
        }
        if(selectedBonbu1==='강남고객본부'){
          firstJisaName='강남지사';
          secondJisaName='분당지사';
          thirdJisaName='송파지사';
          fourthJisaName='수원지사';
          fifthJisaName='용인지사';
          sixthJisaName='평택지사';
        }
        if(selectedBonbu1==='충남/충북고객본부'){
          firstJisaName='대전지사';
          secondJisaName='서대전지사';
          thirdJisaName='천안지사';
          fourthJisaName='청주지사';
          fifthJisaName='충주지사';
          sixthJisaName='홍성지사';
        }
        if(selectedBonbu1==='대구/경북고객본부'){
          firstJisaName='구미지사';
          secondJisaName='달서지사';
          thirdJisaName='동대구지사';
          fourthJisaName='서대구지사';
          fifthJisaName='안동지사';
          sixthJisaName='포항지사';
        }
        if(selectedBonbu1==='부산/경남고객본부'){
          firstJisaName='남부산지사';
          secondJisaName='동부산지사';
          thirdJisaName='동대구지사';
          fourthJisaName='서대구지사';
          fifthJisaName='울산지사';
          sixthJisaName='진주지사';
          seventhJisaName='창원지사';
        }
        if(selectedBonbu1==='전남/전북고객본부'){
          firstJisaName='광주지사';
          secondJisaName='목포지사';
          thirdJisaName='순천지사';
          fourthJisaName='익산지사';
          fifthJisaName='전주지사';
        }
        if(selectedBonbu1==='서부고객본부'){
          firstJisaName='강서지사';
          secondJisaName='구로지사';
          thirdJisaName='부천지사';
          fourthJisaName='서인천지사';
          fifthJisaName='안산지사';
          sixthJisaName='안양지사';
          seventhJisaName='인천지사';
        }
          
        if(item.jojik2_name===selectedBonbu1){
          if(item.jojik3_name===firstJisaName){
            firstJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});  //date혈식을 '2021-04-01' 문자열로
          }
          if(item.jojik3_name===secondJisaName){
            secondJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }
          if(item.jojik3_name===thirdJisaName){
            thirdJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }
          if(item.jojik3_name===fourthJisaName){
            fourthJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});  
          }
          if(item.jojik3_name===fifthJisaName){
            fifthJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }
          if(item.jojik3_name===sixthJisaName){
            sixthJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }
          if(item.jojik3_name===seventhJisaName){
            seventhJisaArray.push({'date':this.displayDateText2(item.sysdate),'cnt':item.count_sum});
          }  
          
        }
      });
      const diffDateArray=(a,b)=>a.filter(x=>!b.includes(x));  // 두 배열에서 중복을 제거하고 남은 요소를 다시 배열로.
   
      //일자별로 실적 카운트 객체 만들기

      let firstJisaDatePlusCntArray=Object.values(firstJisaArray.reduce((acc,{date,cnt})=>{
      
        if(acc[date]) acc[date].cnt+=parseInt(cnt);
        else acc[date]={date,cnt:parseInt(cnt)};
       
        return acc;
      },{}));

     
      
      let firstImsiArray=[];   
      for (let i=0;i<firstJisaDatePlusCntArray.length;i++){
        firstImsiArray.push(firstJisaDatePlusCntArray[i].date);
      }
      firstImsiArray=diffDateArray(dateKeyArray,firstImsiArray);
      for(let i=0;i<firstImsiArray.length;i++){                               //voc발생건수가 0인 날자도 포함하여 그래프 데이터로 사용.
        firstJisaDatePlusCntArray.push({'date':firstImsiArray[i],'cnt':0});
      }
   
      let secondJisaDatePlusCntArray=Object.values([...secondJisaArray].reduce((acc,{date,cnt})=>{
      
        if(acc[date]) acc[date].cnt+=parseInt(cnt);
        else acc[date]={date,cnt:parseInt(cnt)};
       
        return acc;
      },{}));

      let secondImsiArray=[];
      for(let i=0;i<secondJisaDatePlusCntArray.length;i++){
        secondImsiArray.push(secondJisaDatePlusCntArray[i].date);
      }
      secondImsiArray=diffDateArray(dateKeyArray,secondImsiArray);
      for(let i=0;i<secondImsiArray.length;i++){
        secondJisaDatePlusCntArray.push({'date':secondImsiArray[i],'cnt':0});
      }

      let thirdJisaDatePlusCntArray=Object.values([...thirdJisaArray].reduce((acc,{date,cnt})=>{
      
        if(acc[date]) acc[date].cnt+=parseInt(cnt);
        else acc[date]={date,cnt:parseInt(cnt)};
       
        return acc;
      },{}));

      let thirdImsiArray=[];
      for(let i=0;i<thirdJisaDatePlusCntArray.length;i++){
        thirdImsiArray.push(thirdJisaDatePlusCntArray[i].date);
      }
      thirdImsiArray=diffDateArray(dateKeyArray,thirdImsiArray);
      for(let i=0;i<thirdImsiArray.length;i++){
        thirdJisaDatePlusCntArray.push({'date':thirdImsiArray[i],'cnt':0});
      }


      let fourthJisaDatePlusCntArray=Object.values([...fourthJisaArray].reduce((acc,{date,cnt})=>{
      
        if(acc[date]) acc[date].cnt+=parseInt(cnt);
        else acc[date]={date,cnt:parseInt(cnt)};
       
        return acc;
      },{}));

      let fourthImsiArray=[];
      for(let i=0;i<fourthJisaDatePlusCntArray.length;i++){
        fourthImsiArray.push(fourthJisaDatePlusCntArray[i].date);
      }
      fourthImsiArray=diffDateArray(dateKeyArray,fourthImsiArray);
      for(let i=0;i<thirdImsiArray.length;i++){
        fourthJisaDatePlusCntArray.push({'date':fourthImsiArray[i],'cnt':0});
      }

      let fifthJisaDatePlusCntArray=Object.values([...fifthJisaArray].reduce((acc,{date,cnt})=>{
      
        if(acc[date]) acc[date].cnt+=parseInt(cnt);
        else acc[date]={date,cnt:parseInt(cnt)};
       
        return acc;
      },{}));

      let fifthImsiArray=[];
      for(let i=0;i<fifthJisaDatePlusCntArray.length;i++){
        fifthImsiArray.push(fifthJisaDatePlusCntArray[i].date);
      }
      fifthImsiArray=diffDateArray(dateKeyArray,fifthImsiArray);
      for(let i=0;i<fifthImsiArray.length;i++){
        fifthJisaDatePlusCntArray.push({'date':fifthImsiArray[i],'cnt':0});
      }

      let sixthJisaDatePlusCntArray=Object.values([...sixthJisaArray].reduce((acc,{date,cnt})=>{
      
        if(acc[date]) acc[date].cnt+=parseInt(cnt);
        else acc[date]={date,cnt:parseInt(cnt)};
       
        return acc;
      },{}));

      let sixthImsiArray=[];
      for(let i=0;i<sixthJisaDatePlusCntArray.length;i++){
        sixthImsiArray.push(sixthJisaDatePlusCntArray[i].date);
      }
      sixthImsiArray=diffDateArray(dateKeyArray,sixthImsiArray);
      for(let i=0;i<sixthImsiArray.length;i++){
        sixthJisaDatePlusCntArray.push({'date':sixthImsiArray[i],'cnt':0});
      }

      let seventhJisaDatePlusCntArray=Object.values([...seventhJisaArray].reduce((acc,{date,cnt})=>{
      
        if(acc[date]) acc[date].cnt+=parseInt(cnt);
        else acc[date]={date,cnt:parseInt(cnt)};
       
        return acc;
      },{}));

      let seventhImsiArray=[];
      for(let i=0;i<seventhJisaDatePlusCntArray.length;i++){
        seventhImsiArray.push(seventhJisaDatePlusCntArray[i].date);
      }
      seventhImsiArray=diffDateArray(dateKeyArray,seventhImsiArray);
      for(let i=0;i<seventhImsiArray.length;i++){
        seventhJisaDatePlusCntArray.push({'date':seventhImsiArray[i],'cnt':0});
      }
   
      //객체를 일자별로 오름차순으로 정렬하기
      const compare=(key)=>(a,b)=>{
        return a[key]>a[key]?1:a[key]<b[key]?-1:0;
      };

      firstJisaDatePlusCntArray=firstJisaDatePlusCntArray.sort(compare('date'));
      secondJisaDatePlusCntArray=secondJisaDatePlusCntArray.sort(compare('date'));
      thirdJisaDatePlusCntArray=thirdJisaDatePlusCntArray.sort(compare('date'));
      fourthJisaDatePlusCntArray=fourthJisaDatePlusCntArray.sort(compare('date'));
      fifthJisaDatePlusCntArray=fifthJisaDatePlusCntArray.sort(compare('date'));
      sixthJisaDatePlusCntArray=sixthJisaDatePlusCntArray.sort(compare('date'));
      seventhJisaDatePlusCntArray=seventhJisaDatePlusCntArray.sort(compare('date'));
            
      //일자와 VOC합으로 일어진 객체를 별도 분리

      let firstJisaDayArray=[];
      let firstJisaDayCntArray=[];

      let secondJisaDayArray=[];
      let secondJisaDayCntArray=[];

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


     
      for(let i=0;i<firstJisaDatePlusCntArray.length;i++){
       
        firstJisaDayArray.push(firstJisaDatePlusCntArray[i].date);
        firstJisaDayCntArray.push(firstJisaDatePlusCntArray[i].cnt);   

      }
          
      for(let i=0;i<secondJisaDatePlusCntArray.length;i++){
       
        secondJisaDayArray.push(secondJisaDatePlusCntArray[i].date);
        secondJisaDayCntArray.push(secondJisaDatePlusCntArray[i].cnt);          
      }

      for(let i=0;i<thirdJisaDatePlusCntArray.length;i++){
       
        thirdJisaDayArray.push(thirdJisaDatePlusCntArray[i].date);
        thirdJisaDayCntArray.push(thirdJisaDatePlusCntArray[i].cnt);          
      }

      for(let i=0;i<fourthJisaDatePlusCntArray.length;i++){
       
        fourthJisaDayArray.push(fourthJisaDatePlusCntArray[i].date);
        fourthJisaDayCntArray.push(fourthJisaDatePlusCntArray[i].cnt);          
      }

      for(let i=0;i<fifthJisaDatePlusCntArray.length;i++){
       
        fifthJisaDayArray.push(fifthJisaDatePlusCntArray[i].date);
        fifthJisaDayCntArray.push(fifthJisaDatePlusCntArray[i].cnt);          
      }

      for(let i=0;i<sixthJisaDatePlusCntArray.length;i++){
       
        sixthJisaDayArray.push(sixthJisaDatePlusCntArray[i].date);
        sixthJisaDayCntArray.push(sixthJisaDatePlusCntArray[i].cnt);          
      }

      for(let i=0;i<seventhJisaDatePlusCntArray.length;i++){
       
        seventhJisaDayArray.push(seventhJisaDatePlusCntArray[i].date);
        seventhJisaDayCntArray.push(seventhJisaDatePlusCntArray[i].cnt);          
      }
    

     
      firstJisaObj={
        'jisa':firstJisaName,
        'basedate':firstJisaDayArray,
        'vocSum':firstJisaDayCntArray,
      }
      secondJisaObj={
        'jisa':secondJisaName,
        'basedate':secondJisaDayArray,
        'vocSum':secondJisaDayCntArray,
      }

      thirdJisaObj={
        'jisa':thirdJisaName,
        'basedate':thirdJisaDayArray,
        'vocSum':thirdJisaDayCntArray,
      }  
      fourthJisaObj={
        'jisa':fourthJisaName,
        'basedate':fourthJisaDayArray,
        'vocSum':fourthJisaDayCntArray,
      }
      fifthJisaObj={
        'jisa':fifthJisaName,
        'basedate':fifthJisaDayArray,
        'vocSum':fifthJisaDayCntArray,
      }

      sixthJisaObj={
        'jisa':sixthJisaName,
        'basedate':sixthJisaDayArray,
        'vocSum':sixthJisaDayCntArray,
      }
      
      seventhJisaObj={
        'jisa':seventhJisaName,
        'basedate':seventhJisaDayArray,
        'vocSum':seventhJisaDayCntArray,
      }

      bonbuDataArray=[firstJisaObj,secondJisaObj,thirdJisaObj,fourthJisaObj,fifthJisaObj,sixthJisaObj,seventhJisaObj];
      
      return bonbuDataArray;
    }
  }
}      
    

</script>
<style scoped>

</style>
