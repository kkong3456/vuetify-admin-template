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
  //props: ['options'],


  name:'JisaRitVocChart',
  extends: Line,
  // mixins: [reactiveProp],


  data(){
    return {
      
      bonbuVocData:null,
      lastWeekBonbuVocData:null,
      bonbuVocDataObj:null,
      
     
      selectedStartDate:'20210420',
      selectedEndDate:'20210426',

      selectedStartNewDate:new Date('2021-04-20'),
      selectedEndNewDate:new Date('2021-04-26'),

      lastWeekStartDate:'20210413',
      lastWeekEndDate:'20210419',
      imsiThisStart:'2021,04,13',
      imsiThisEnd:'2021,04,19',

      selectedBonbu:'북부고객본부',
      selectedJisa:'고양지사',

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
    this.renderChart(this.dataCollection,this.options)
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
      const bonbuVocDataUrl=`http://172.21.220.97/api/voc.json/?table=rm&bonbu=${this.selectedBonbu}&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&kind1=jisa&kind2=type`;
      // const lastBonbuVocDataUrl=`http://172.21.220.97/api/voc.json/?table=rit&bonbu=${this.selectedBonbu}&begin=${this.lastWeekStartDate}&end=${this.lastWeekEndDate}&kind1=jisa&kind2=type`;
    
      await axios.all(
        [
          axios.get(bonbuVocDataUrl),
          // axios.get(lastBonbuVocDataUrl),
        ]
      ).then(axios.spread((res1,res2)=>{

        this.bonbuVocData=res1.data.results;
               
      })).catch((err)=>{
        console.log('금주 일자 데이터를 가져 오지 못했습니다');
      });
      
      this.fillData(this.selectedBonbu)
      this.renderChart(this.dataCollection,this.options);
    },


    async changeBonbu(selectedBonbu){

      const bonbuVocDataUrl=`http://172.21.220.97/api/voc.json/?table=rm&bonbu=${selectedBonbu}&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&kind1=jisa&kind2=type`;
      // const lastBonbuVocDataUrl=`http://172.21.220.97/api/voc.json/?table=rit&bonbu=${selectedBonbu}&begin=${this.lastWeekStartDate}&end=${this.lastWeekEndDate}&kind1=jisa&kind2=type`;
    
      //this.selectedJisa=selectedJisa;  //지사 선택시 전역적으로 알려준다
      this.selectedBonbu=selectedBonbu;

      await axios.all(
        [
          axios.get(bonbuVocDataUrl),
          // axios.get(lastBonbuVocDataUrl),
        ]
      ).then(axios.spread((res1,res2)=>{
        this.bonbuVocData=res1.data.results;
        // this.lastWeekBonbuVocData=res2.data.results;
        
        
      })).catch((err)=>{
        console.log('금주 일자 데이터를 가져 오지 못했습니다');
      });
      
      this.fillData(selectedBonbu)
      this.renderChart(this.dataCollection,this.options);
    },

    fillData (selectedBonbu) {
      const yyy=this.getBonbuVocValue(selectedBonbu);
      
      if(selectedBonbu==='북부고객본부' || selectedBonbu==='동부고객본부' || selectedBonbu==='전남/전북고객본부'){
      
        this.dataCollection = {
          labels:yyy[2].basedate.map((day)=>day.substring(5,10)),
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

            // {
            //   label: yyy[5].jisa,
            //   borderColor: '#C6aEFF',
            //   backgroundColor:"transparent",
            //   data: yyy[5].vocSum,
            //   fill:false,
            //   tension:.3,
            //   pointHoverBorderColor:'#ff0000',
            // },
          ]
        }
      }
      // if(selectedBonbu==='강남고객본부' || selectedBonbu==='충남/충북고객본부' || bonbuName==='대구/경북고객본부'){
       
      //   this.dataCollection = {
      //     labels:yyy.firstJisa.sysdate.map((day)=>day.substring(5,10)),
      //     datasets: [
      //       {
      //         label:yyy.firstJisa.jojik[0],     // 범례
      //         borderColor: '#6697F8',
      //         backgroundColor:"transparent",
      //         data: yyy.firstJisa.countSum,
      //         fill:false,
      //         // tension:.5,
      //         pointHoverBorderColor:'#ff0000',
      //         // hoverBorderWith:20,

      //       },
      //       {
      //         label:yyy.secondJisa.jojik[0],
      //         borderColor: '#5CE082',
      //         backgroundColor:"transparent",
      //         data: yyy.secondJisa.countSum,
      //         fill:false,
      //         // tension:.5,
      //         pointHoverBorderColor:'#ff0000',
      //       },
      //       {
      //         label: yyy.thirdJisa.jojik[0],
      //         borderColor: '#F7E872',
      //         backgroundColor:"transparent",
      //         data: yyy.thirdJisa.countSum,
      //         fill:false,
      //         // tension:.5,
      //         pointHoverBorderColor:'#ff0000',
      //       },

      //       {
      //         label: yyy.fourthJisa.jojik[0],
      //         borderColor: '#E0815C',
      //         backgroundColor:"transparent",
      //         data: yyy.fourthJisa.countSum,
      //         fill:false,
      //         // tension:.5,
      //         pointHoverBorderColor:'#ff0000',
      //       },

      //       {
      //         label: yyy.fifthJisa.jojik[0],
      //         borderColor: '#C641FF',
      //         backgroundColor:"transparent",
      //         data: yyy.fifthJisa.countSum,
      //         fill:false,
      //         // tension:.5,
      //         pointHoverBorderColor:'#ff0000',
      //       },

      //       {
      //         label: yyy.sixthJisa.jojik[0],
      //         borderColor: '#FF33CC',
      //         backgroundColor:"transparent",
      //         data: yyy.sixthJisa.countSum,
      //         fill:false,
      //         // tension:.5,
      //         pointHoverBorderColor:'#ff0000',
      //       },
      //     ]
      //   };  //dataCollection
      // }

      // if(selectedBonbu==='서부고객본부' || selectedBonbu==='부산/경남고객본부' ){
      //   this.dataCollection = {
      //     labels:yyy.firstJisa.sysdate.map((day)=>day.substring(5,10)),
      //     datasets: [
      //       {
      //         label:yyy.firstJisa.jojik[0],     // 범례
      //         borderColor: '#6697F8',
      //         backgroundColor:"transparent",
      //         data: yyy.firstJisa.countSum?yyy.firstJisa.countSum:0,
      //         fill:false,
      //         // tension:.5,
      //         pointHoverBorderColor:'#ff0000',
      //         // hoverBorderWith:20,

      //       },
      //       {
      //         label:yyy.secondJisa.jojik[0],
      //         borderColor: '#5CE082',
      //         backgroundColor:"transparent",
      //         data: yyy.secondJisa.countSum?yyy.secondJisa.countSum:0,
      //         fill:false,
      //         // tension:.5,
      //         pointHoverBorderColor:'#ff0000',
      //       },
      //       {
      //         label: yyy.thirdJisa.jojik[0],
      //         borderColor: '#F7E872',
      //         backgroundColor:"transparent",
      //         data: yyy.thirdJisa.countSum?yyy.thirdJisa.countSum:0,
      //         fill:false,
      //         // tension:.5,
      //         pointHoverBorderColor:'#ff0000',
      //       },

      //       {
      //         label: yyy.fourthJisa.jojik[0],
      //         borderColor: '#E0815C',
      //         backgroundColor:"transparent",
      //         data: yyy.fourthJisa.countSum?yyy.fourthJisa.countSum:0,
      //         fill:false,
      //         // tension:.5,
      //         pointHoverBorderColor:'#ff0000',
      //       },

      //       {
      //         label: yyy.fifthJisa.jojik[0],
      //         borderColor: '#C641FF',
      //         backgroundColor:"transparent",
      //         data: yyy.fifthJisa.countSum?yyy.fifthJisa.countSum:0,
      //         fill:false,
      //         // tension:.5,
      //         pointHoverBorderColor:'#ff0000',
      //       },

      //       {
      //         label: yyy.sixthJisa.jojik[0],
      //         borderColor: '#ff33cc',
      //         backgroundColor:"transparent",
      //         data: yyy.sixthJisa.countSum?yyy.sixthJisa.countSum:0,
      //         fill:false,
      //         // tension:.5,
      //         pointHoverBorderColor:'#ff0000',
      //       },
      //       {
      //         label: yyy.seventhJisa.jojik[0],
      //         borderColor: '#ffbb33',
      //         backgroundColor:"transparent",
      //         data: yyy.seventhJisa.countSum?yyy.seventhJisa.countSum:0,
      //         fill:false,
      //         // tension:.5,
      //         pointHoverBorderColor:'#ff0000',
      //       },
         
      //     ]
      //   };  //dataCollection
      // }
    },  //fillData()


    getBonbuVocValue(selectedBonbu){    
      let bonbuVocDataArray=[];

      const mvoc1='단말기할부대금및잔여기간문의';
      const mvoc2='약정문의';
      const mvoc3='위약금(할인반환금)문의';

      

      let firstJisaObj={};
      let secondJisaObj={};
      let thirdJisaObj={};
      let fourthJisaObj={};
      let fifthJisaObj={};
      let sixthJisaObj={};
      let seventhJisaObj={};
     
      const firstJisa=bonbuJisaObj[selectedBonbu][0];
      const secondJisa=bonbuJisaObj[selectedBonbu][1];
      const thirdJisa=bonbuJisaObj[selectedBonbu][2];
      const fourthJisa=bonbuJisaObj[selectedBonbu][3];
      const fifthJisa=bonbuJisaObj[selectedBonbu][4];
      const sixthJisa=bonbuJisaObj[selectedBonbu][5];
      const seventhJisa=bonbuJisaObj[selectedBonbu][6];

      let firstJisaDatePlusCntArray=[];  //일자와 Voc건수를 가지고있다.
      let secondJisaDatePlusCntArray=[];
      let thirdJisaDatePlusCntArray=[];
      let fourthJisaDatePlusCntArray=[];
      let fifthJisaDatePlusCntArray=[];
      let sixthJisaDatePlusCntArray=[];
      let seventhJisaDatePlusCntArray=[];

     
      const firstJisaVoc1Array=[];
      const firstJisaVoc2Array=[];
      const firstJisaVoc3Array=[];

      const secondJisaVoc1Array=[];
      const secondJisaVoc2Array=[];
      const secondJisaVoc3Array=[];


      const thirdJisaVoc1Array=[];
      const thirdJisaVoc2Array=[];
      const thirdJisaVoc3Array=[];


      const fourthJisaVoc1Array=[];
      const fourthJisaVoc2Array=[];
      const fourthJisaVoc3Array=[];
 

      const fifthJisaVoc1Array=[];
      const fifthJisaVoc2Array=[];
      const fifthJisaVoc3Array=[];
    

      const sixthJisaVoc1Array=[];
      const sixthJisaVoc2Array=[];
      const sixthJisaVoc3Array=[];
 

      const seventhJisaVoc1Array=[];
      const seventhJisaVoc2Array=[];
      const seventhJisaVoc3Array=[];
  

      let dateKeyArray=[];

      this.selectedStartNewDate=new Date(this.selectedStartDate.substring(0,4)+'-'+this.selectedStartDate.substring(4,6)+'-'+this.selectedStartDate.substring(6,8));
      this.selectedEndNewDate=new Date(this.selectedEndDate.substring(0,4)+'-'+this.selectedEndDate.substring(4,6)+'-'+this.selectedEndDate.substring(6,8)); 
      const dateDiffCnt=Math.ceil((this.selectedEndNewDate.getTime()-this.selectedStartNewDate.getTime())/(1000*3600*24)); 
      this.selectedStartNewDate=new Date(this.selectedStartNewDate.setDate(this.selectedStartNewDate.getDate()-1));
      
      for (let date=0;date<=dateDiffCnt;date++){  //시작일과 종료일 차이수 만큼 일자를 배열로 생성 '2021-04-01'
        dateKeyArray.push(this.displayDateText2(new Date(this.selectedStartNewDate.setDate(this.selectedStartNewDate.getDate()+1))));  //조회 날자를 배열로 만들고 형식을 '2021-04-01' 형식으로 변경
      }

        
      this.bonbuVocData.map((item,index)=>{
       
        if(item.voc_gubun.replace(/ /g,'')===mvoc1){
          if(firstJisa===item.jisa){
            firstJisaVoc1Array.push({'date':item.basedate,'cnt':item.count_sum});
           
          }
          if(secondJisa===item.jisa){
            secondJisaVoc1Array.push({'date':item.basedate,'cnt':item.count_sum});
          }

          if(thirdJisa===item.jisa){
            thirdJisaVoc1Array.push({'date':item.basedate,'cnt':item.count_sum});
          }

          if(fourthJisa===item.jisa){
            fourthJisaVoc1Array.push({'date':item.basedate,'cnt':item.count_sum});
          }

          if(fifthJisa===item.jisa){
            fifthJisaVoc1Array.push({'date':item.basedate,'cnt':item.count_sum});
          }

          if(sixthJisa===item.jisa){
            sixthJisaVoc1Array.push({'date':item.basedate,'cnt':item.count_sum});
          }

          if(seventhJisa===item.jisa){
            sevethJisaJisaVoc1Array.push({'date':item.basedate,'cnt':item.count_sum});
          }
        }

     
        if(item.voc_gubun.replace(/ /g,'')===mvoc2){
          if(firstJisa===item.jisa){
            firstJisaVoc2Array.push({'date':item.basedate,'cnt':item.count_sum});
          }
          if(secondJisa===item.jisa){
            secondJisaVoc2Array.push({'date':item.basedate,'cnt':item.count_sum});
          }

          if(thirdJisa===item.jisa){
            thirdJisaVoc2Array.push({'date':item.basedate,'cnt':item.count_sum});
          }

          if(fourthJisa===item.jisa){
            fourthJisaVoc2Array.push({'date':item.basedate,'cnt':item.count_sum});
          }

          if(fifthJisa===item.jisa){
            fifthJisaVoc2Array.push({'date':item.basedate,'cnt':item.count_sum});
          }

          if(sixthJisa===item.jisa){
            sixthJisaVoc2Array.push({'date':item.basedate,'cnt':item.count_sum});
          }

          if(seventhJisa===item.jisa){
            sevethJisaJisaVoc2Array.push({'date':item.basedate,'cnt':item.count_sum});
          }
         
        }

      
        if(item.voc_gubun.replace(/ /g,'')===mvoc3){
          if(firstJisa===item.jisa){
            firstJisaVoc3Array.push({'date':item.basedate,'cnt':item.count_sum});
          }

          if(secondJisa===item.jisa){
            secondJisaVoc3Array.push({'date':item.basedate,'cnt':item.count_sum});
          }
          if(thirdJisa===item.jisa){
            thirdJisaVoc3Array.push({'date':item.basedate,'cnt':item.count_sum});
          }

          if(fourthJisa===item.jisa){
            fourthJisaVoc3Array.push({'date':item.basedate,'cnt':item.count_sum});
          }

          if(fifthJisa===item.jisa){
            fifthJisaVoc3Array.push({'date':item.basedate,'cnt':item.count_sum});
          }

          if(sixthJisa===item.jisa){
            sixthJisaVoc3Array.push({'date':item.basedate,'cnt':item.count_sum});
          }

          if(seventhJisa===item.jisa){
            sevethJisaJisaVoc3Array.push({'date':item.basedate,'cnt':item.count_sum});
          }
        }

      
       
      });

      const diffDateArray=(a,b)=>a.filter(x=>!b.includes(x));  // 두 배열에서 중복을 제거하고 남은 요소를 다시 배열로.

      //일자별로 voc 카운트 객체 만들기
      firstJisaDatePlusCntArray=Object.values([...firstJisaVoc1Array,...firstJisaVoc2Array,...firstJisaVoc3Array].reduce((acc,{date,cnt})=>{
      
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


      secondJisaDatePlusCntArray=Object.values([...secondJisaVoc1Array,...secondJisaVoc2Array,...secondJisaVoc3Array].reduce((acc,{date,cnt})=>{
      
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



      thirdJisaDatePlusCntArray=Object.values([...thirdJisaVoc1Array,...thirdJisaVoc2Array,...thirdJisaVoc3Array].reduce((acc,{date,cnt})=>{
      
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


      fourthJisaDatePlusCntArray=Object.values([...fourthJisaVoc1Array,...fourthJisaVoc2Array,...fourthJisaVoc3Array].reduce((acc,{date,cnt})=>{
      
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

      fifthJisaDatePlusCntArray=Object.values([...fifthJisaVoc1Array,...fifthJisaVoc2Array,...fifthJisaVoc3Array].reduce((acc,{date,cnt})=>{
      
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

      sixthJisaDatePlusCntArray=Object.values([...sixthJisaVoc1Array,...sixthJisaVoc2Array,...sixthJisaVoc3Array].reduce((acc,{date,cnt})=>{
      
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

      seventhJisaDatePlusCntArray=Object.values([...seventhJisaVoc1Array,...seventhJisaVoc2Array,...seventhJisaVoc3Array].reduce((acc,{date,cnt})=>{
      
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
      let firstJisaDayVocArray=[];

      let secondJisaDayArray=[];
      let secondJisaDayVocArray=[];

      let thirdJisaDayArray=[];
      let thirdJisaDayVocArray=[];

      let fourthJisaDayArray=[];
      let fourthJisaDayVocArray=[];

      let fifthJisaDayArray=[];
      let fifthJisaDayVocArray=[];

      let sixthJisaDayArray=[];
      let sixthJisaDayVocArray=[];

      let seventhJisaDayArray=[];
      let seventhJisaDayVocArray=[];

     
      for(let i=0;i<firstJisaDatePlusCntArray.length;i++){
       
        firstJisaDayArray.push(firstJisaDatePlusCntArray[i].date);
        firstJisaDayVocArray.push(firstJisaDatePlusCntArray[i].cnt);       
      }
      
      for(let i=0;i<secondJisaDatePlusCntArray.length;i++){
       
        secondJisaDayArray.push(secondJisaDatePlusCntArray[i].date);
        secondJisaDayVocArray.push(secondJisaDatePlusCntArray[i].cnt);          
      }

      for(let i=0;i<thirdJisaDatePlusCntArray.length;i++){
       
        thirdJisaDayArray.push(thirdJisaDatePlusCntArray[i].date);
        thirdJisaDayVocArray.push(thirdJisaDatePlusCntArray[i].cnt);          
      }

      for(let i=0;i<fourthJisaDatePlusCntArray.length;i++){
       
        fourthJisaDayArray.push(fourthJisaDatePlusCntArray[i].date);
        fourthJisaDayVocArray.push(fourthJisaDatePlusCntArray[i].cnt);          
      }

      for(let i=0;i<fifthJisaDatePlusCntArray.length;i++){
       
        fifthJisaDayArray.push(fifthJisaDatePlusCntArray[i].date);
        fifthJisaDayVocArray.push(fifthJisaDatePlusCntArray[i].cnt);          
      }

      for(let i=0;i<sixthJisaDatePlusCntArray.length;i++){
       
        sixthJisaDayArray.push(sixthJisaDatePlusCntArray[i].date);
        sixthJisaDayVocArray.push(sixthJisaDatePlusCntArray[i].cnt);          
      }

      for(let i=0;i<seventhJisaDatePlusCntArray.length;i++){
       
        seventhJisaDayArray.push(seventhJisaDatePlusCntArray[i].date);
        seventhJisaDayVocArray.push(seventhJisaDatePlusCntArray[i].cnt);          
      }
    
      firstJisaObj={
        'jisa':firstJisa,
        'basedate':firstJisaDayArray,
        'vocSum':firstJisaDayVocArray,
      }
      secondJisaObj={
        'jisa':secondJisa,
        'basedate':secondJisaDayArray,
        'vocSum':secondJisaDayVocArray,
      }

      thirdJisaObj={
        'jisa':thirdJisa,
        'basedate':thirdJisaDayArray,
        'vocSum':thirdJisaDayVocArray,
      }

       
      fourthJisaObj={
        'jisa':fourthJisa,
        'basedate':fourthJisaDayArray,
        'vocSum':fourthJisaDayVocArray,
      }
      fifthJisaObj={
        'jisa':fifthJisa,
        'basedate':fifthJisaDayArray,
        'vocSum':fifthJisaDayVocArray,
      }

      sixthJisaObj={
        'jisa':sixthJisa,
        'basedate':sixthJisaDayArray,
        'vocSum':sixthJisaDayVocArray,
      }
      
      seventhJisaObj={
        'jisa':seventhJisa,
        'basedate':seventhJisaDayArray,
        'vocSum':seventhJisaDayVocArray,
      }
      bonbuVocDataArray=[firstJisaObj,secondJisaObj,thirdJisaObj,fourthJisaObj,fifthJisaObj,sixthJisaObj,seventhJisaObj];
      
      return bonbuVocDataArray;
    }
  }
}      
    

</script>
<style scoped>

</style>
