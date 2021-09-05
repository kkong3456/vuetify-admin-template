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


  name:'JisaQitVocChart',
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
    // this.renderChart(this.dataCollection,this.options)
  },

  mounted(){
    this.renderChart(this.dataCollection,this.options)  //renderchart는 mounted 이후에 실행
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
      const bonbuVocDataUrl=`http://172.21.220.97/api/voc.json/?table=qm&bonbu=${this.selectedBonbu}&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&kind1=jisa&kind2=type`;
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

      const bonbuVocDataUrl=`http://172.21.220.97/api/voc.json/?table=qm&bonbu=${selectedBonbu}&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&kind1=jisa&kind2=type`;
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
      if(selectedBonbu==='강남고객본부' || selectedBonbu==='충남/충북고객본부' || selectedBonbu==='대구/경북고객본부'){
       
        this.dataCollection = {
          labels:yyy.firstJisa.sysdate.map((day)=>day.substring(5,10)),
          datasets: [
            {
              label:yyy[0].jisa,     // 범례
              borderColor: '#6697F8',
              backgroundColor:"transparent",
              data: yyy[0].vocSum,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
              // hoverBorderWith:20,

            },
            {
              label:yyy[1].jisa,
              borderColor: '#5CE082',
              backgroundColor:"transparent",
              data: yyy[1].vocSum,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
            },
            {
              label: yyy[2].jisa,
              borderColor: '#F7E872',
              backgroundColor:"transparent",
              data: yyy[2].vocSum,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy[3].jisa,
              borderColor: '#E0815C',
              backgroundColor:"transparent",
              data: yyy[3].vocSum,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy[4].jisa,
              borderColor: '#C641FF',
              backgroundColor:"transparent",
              data: yyy[4].vocSum,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy[5].jisa,
              borderColor: '#FF33CC',
              backgroundColor:"transparent",
              data: yyy[5].vocSum,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
            },
          ]
        };  //dataCollection
      }

      if(selectedBonbu==='서부고객본부' || selectedBonbu==='부산/경남고객본부' ){
        this.dataCollection = {
          labels:yyy.firstJisa.sysdate.map((day)=>day.substring(5,10)),
          datasets: [
            {
              label:yyy[0].jisa,     // 범례
              borderColor: '#6697F8',
              backgroundColor:"transparent",
              data: yyy[0].vocSum,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
              // hoverBorderWith:20,

            },
            {
              label:yyy[1].jisa,
              borderColor: '#5CE082',
              backgroundColor:"transparent",
              data: yyy[1].vocSum,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
            },
            {
              label: yyy[2].jisa,
              borderColor: '#F7E872',
              backgroundColor:"transparent",
              data: yyy[2].vocSum,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy[3].jisa,
              borderColor: '#E0815C',
              backgroundColor:"transparent",
              data: yyy[3].vocSum,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy[4].jisa,
              borderColor: '#C641FF',
              backgroundColor:"transparent",
              data: yyy[4].vocSum,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy[5].jisa,
              borderColor: '#ff33cc',
              backgroundColor:"transparent",
              data: yyy[5].vocSum,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
            },
            {
              label: yyy[6].jisa,
              borderColor: '#ffbb33',
              backgroundColor:"transparent",
              data: yyy[6].vocSum,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
            },
         
          ]
        };  //dataCollection
      }
    },  //fillData()


    getBonbuVocValue(selectedBonbu){    
      let bonbuVocDataArray=[];

      const mvoc1='국제문자';
      const mvoc2='국제전화';
      const mvoc3='다운로드지연/불가';
      const mvoc4='리얼360';
      const mvoc5='발신불가';
      const mvoc6='발신불가/지연';
      const mvoc7='수신불가';
      const mvoc8='수신불가/지연';
      const mvoc9='오전달/중복수신/깨짐';
      const mvoc10='이용불가';
      const mvoc11='접속불가';
      const mvoc12='중계기';
      const mvoc13='통화영상/음질불량';
      const mvoc14='통화음질불량';
      const mvoc15='통화중절단';
      const mvoc16='화면이동지연불가';

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
      const firstJisaVoc4Array=[];
      const firstJisaVoc5Array=[];
      const firstJisaVoc6Array=[];
      const firstJisaVoc7Array=[];
      const firstJisaVoc8Array=[];
      const firstJisaVoc9Array=[];
      const firstJisaVoc10Array=[];
      const firstJisaVoc11Array=[];
      const firstJisaVoc12Array=[];
      const firstJisaVoc13Array=[];
      const firstJisaVoc14Array=[];
      const firstJisaVoc15Array=[];
      const firstJisaVoc16Array=[];
     
      const secondJisaVoc1Array=[];
      const secondJisaVoc2Array=[];
      const secondJisaVoc3Array=[];
      const secondJisaVoc4Array=[];
      const secondJisaVoc5Array=[];
      const secondJisaVoc6Array=[];
      const secondJisaVoc7Array=[];
      const secondJisaVoc8Array=[];
      const secondJisaVoc9Array=[];
      const secondJisaVoc10Array=[];
      const secondJisaVoc11Array=[];
      const secondJisaVoc12Array=[];
      const secondJisaVoc13Array=[];
      const secondJisaVoc14Array=[];
      const secondJisaVoc15Array=[];
      const secondJisaVoc16Array=[];
     
      const thirdJisaVoc1Array=[];
      const thirdJisaVoc2Array=[];
      const thirdJisaVoc3Array=[];
      const thirdJisaVoc4Array=[];
      const thirdJisaVoc5Array=[];
      const thirdJisaVoc6Array=[];
      const thirdJisaVoc7Array=[];
      const thirdJisaVoc8Array=[];
      const thirdJisaVoc9Array=[];
      const thirdJisaVoc10Array=[];
      const thirdJisaVoc11Array=[];
      const thirdJisaVoc12Array=[];
      const thirdJisaVoc13Array=[];
      const thirdJisaVoc14Array=[];
      const thirdJisaVoc15Array=[];
      const thirdJisaVoc16Array=[];
 

      const fourthJisaVoc1Array=[];
      const fourthJisaVoc2Array=[];
      const fourthJisaVoc3Array=[];
      const fourthJisaVoc4Array=[];
      const fourthJisaVoc5Array=[];
      const fourthJisaVoc6Array=[];
      const fourthJisaVoc7Array=[];
      const fourthJisaVoc8Array=[];
      const fourthJisaVoc9Array=[];
      const fourthJisaVoc10Array=[];
      const fourthJisaVoc11Array=[];
      const fourthJisaVoc12Array=[];
      const fourthJisaVoc13Array=[];
      const fourthJisaVoc14Array=[];
      const fourthJisaVoc15Array=[];
      const fourthJisaVoc16Array=[];
    

      const fifthJisaVoc1Array=[];
      const fifthJisaVoc2Array=[];
      const fifthJisaVoc3Array=[];
      const fifthJisaVoc4Array=[];
      const fifthJisaVoc5Array=[];
      const fifthJisaVoc6Array=[];
      const fifthJisaVoc7Array=[];
      const fifthJisaVoc8Array=[];
      const fifthJisaVoc9Array=[];
      const fifthJisaVoc10Array=[];
      const fifthJisaVoc11Array=[];
      const fifthJisaVoc12Array=[];
      const fifthJisaVoc13Array=[];
      const fifthJisaVoc14Array=[];
      const fifthJisaVoc15Array=[];
      const fifthJisaVoc16Array=[];
     
      const sixthJisaVoc1Array=[];
      const sixthJisaVoc2Array=[];
      const sixthJisaVoc3Array=[];
      const sixthJisaVoc4Array=[];
      const sixthJisaVoc5Array=[];
      const sixthJisaVoc6Array=[];
      const sixthJisaVoc7Array=[];
      const sixthJisaVoc8Array=[];
      const sixthJisaVoc9Array=[];
      const sixthJisaVoc10Array=[];
      const sixthJisaVoc11Array=[];
      const sixthJisaVoc12Array=[];
      const sixthJisaVoc13Array=[];
      const sixthJisaVoc14Array=[];
      const sixthJisaVoc15Array=[];
      const sixthJisaVoc16Array=[];
  
      const seventhJisaVoc1Array=[];
      const seventhJisaVoc2Array=[];
      const seventhJisaVoc3Array=[];
      const seventhJisaVoc4Array=[];
      const seventhJisaVoc5Array=[];
      const seventhJisaVoc6Array=[];
      const seventhJisaVoc7Array=[];
      const seventhJisaVoc8Array=[];
      const seventhJisaVoc9Array=[];
      const seventhJisaVoc10Array=[];
      const seventhJisaVoc11Array=[];
      const seventhJisaVoc12Array=[];
      const seventhJisaVoc13Array=[];
      const seventhJisaVoc14Array=[];
      const seventhJisaVoc15Array=[];
      const seventhJisaVoc16Array=[];
    
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
          // console.log('voc1 is ',item.voc_gubun.replace(/ /g,''));
          if(firstJisa===item.jisa){firstJisaVoc1Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc1Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc1Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc1Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc1Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc1Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc1Array.push({'date':item.basedate,'cnt':item.count_sum});}
         
        }
        if(item.voc_gubun.replace(/ /g,'')===mvoc2){
        // if('부주의IDPW분실등'===voc2){
          // console.log('voc2 is ',item.voc_gubun.replace(/[\,\/] /g,''));
          if(firstJisa===item.jisa){firstJisaVoc2Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc2Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc2Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc2Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc2Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc2Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc2Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===mvoc3){
          // console.log('voc3 is ',item.voc_gubun.replace(/[\,\/]/g,''));
          if(firstJisa===item.jisa){firstJisaVoc3Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc3Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc3Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc3Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc3Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc3Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc3Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===mvoc4){
          // console.log('voc4 is ',item.voc_gubun.replace(/[\,\/]/g,''));
          if(firstJisa===item.jisa){firstJisaVoc4Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc4Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc4Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc4Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc4Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc4Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc4Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===mvoc5){
          // console.log('voc5 is ',item.voc_gubun.replace(/ /g,''));
          if(firstJisa===item.jisa){firstJisaVoc5Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc5Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc5Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc5Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc5Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc5Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc5Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===mvoc6){
          // console.log('voc6 is ',item.voc_gubun.replace(/ /g,''));
          if(firstJisa===item.jisa){firstJisaVoc6Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc6Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc6Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc6Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc6Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc6Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc6Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===mvoc7){
          // console.log('voc7 is ',item.voc_gubun.replace(/ /g,''));
          if(firstJisa===item.jisa){firstJisaVoc7Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc7Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc7Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc7Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc7Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc7Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc7Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===mvoc8){
          // console.log('voc8 is ',item.voc_gubun.replace(/ /g,''));
          if(firstJisa===item.jisa){firstJisaVoc8Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc8Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc8Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc8Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc8Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc8Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc8Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===mvoc9){
          // console.log('voc9 is ',item.voc_gubun.replace(/ /g,''));
          if(firstJisa===item.jisa){firstJisaVoc9Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc9Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc9Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc9Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc9Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc9Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc9Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===mvoc10){
          // console.log('voc10 is ',item.voc_gubun.replace(/ /g,''));
          if(firstJisa===item.jisa){firstJisaVoc10Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc10Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc10Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc10Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc10Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc10Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc10Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===mvoc11){
          // console.log('voc11 is ',item.voc_gubun.replace(/ /g,''));
          if(firstJisa===item.jisa){firstJisaVoc11Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc11Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc11Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc11Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc11Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc11Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc11Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===mvoc12){
          // console.log('voc12 is ',item.voc_gubun.replace(/ /g,''));
          if(firstJisa===item.jisa){firstJisaVoc12Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc12Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc12Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc12Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc12Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc12Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc12Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===mvoc13){
          // console.log('voc13 is ',item.voc_gubun.replace(/ /g,''));
          if(firstJisa===item.jisa){firstJisaVoc13Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc13Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc13Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc13Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc13Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc13Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc13Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===mvoc14){
          // console.log('voc14 is ',item.voc_gubun.replace(/ /g,''));
          if(firstJisa===item.jisa){firstJisaVoc14Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc14Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc14Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc14Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc14Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc14Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc14Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===mvoc15){
          // console.log('voc15 is ',item.voc_gubun.replace(/ /g,''));
          if(firstJisa===item.jisa){firstJisaVoc15Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc15Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc15Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc15Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc15Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc15Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc15Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===mvoc16){
          // console.log('voc16 is ',item.voc_gubun.replace(/ /g,''));
          if(firstJisa===item.jisa){firstJisaVoc16Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc16Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc16Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc16Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc16Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc16Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc16Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
           
      });

      const diffDateArray=(a,b)=>a.filter(x=>!b.includes(x));  // 두 배열에서 중복을 제거하고 남은 요소를 다시 배열로.

      //일자별로 voc 카운트 객체 만들기
      firstJisaDatePlusCntArray=Object.values(
        [
          ...firstJisaVoc1Array,...firstJisaVoc2Array,...firstJisaVoc3Array,...firstJisaVoc4Array,...firstJisaVoc5Array
          ,...firstJisaVoc6Array,...firstJisaVoc7Array,...firstJisaVoc8Array,...firstJisaVoc9Array,...firstJisaVoc10Array
          ,...firstJisaVoc11Array,...firstJisaVoc12Array,...firstJisaVoc13Array,...firstJisaVoc14Array,...firstJisaVoc15Array
          ,...firstJisaVoc16Array
     

        ].reduce((acc,{date,cnt})=>{
      
          if(acc[date]) acc[date].cnt+=parseInt(cnt);
          else acc[date]={date,cnt:parseInt(cnt)};
       
          return acc;
        },{}));

      // console.log('객체',firstJisaDatePlusCntArray);

      let firstImsiArray=[];   
      for (let i=0;i<firstJisaDatePlusCntArray.length;i++){
        firstImsiArray.push(firstJisaDatePlusCntArray[i].date);
      }
      firstImsiArray=diffDateArray(dateKeyArray,firstImsiArray);
      for(let i=0;i<firstImsiArray.length;i++){                               //voc발생건수가 0인 날자도 포함하여 그래프 데이터로 사용.
        firstJisaDatePlusCntArray.push({'date':firstImsiArray[i],'cnt':0});
      }

      //console.log('firstJisaDatePlusCntArray',firstJisaDatePlusCntArray);


      secondJisaDatePlusCntArray=Object.values(
        [
          ...secondJisaVoc1Array,...secondJisaVoc2Array,...secondJisaVoc3Array,...secondJisaVoc4Array,...secondJisaVoc5Array
          ,...secondJisaVoc6Array,...secondJisaVoc7Array,...secondJisaVoc8Array,...secondJisaVoc9Array,...secondJisaVoc10Array
          ,...secondJisaVoc11Array,...secondJisaVoc12Array,...secondJisaVoc13Array,...secondJisaVoc14Array,...secondJisaVoc15Array
          ,...secondJisaVoc16Array,
        
        ].reduce((acc,{date,cnt})=>{
      
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



      thirdJisaDatePlusCntArray=Object.values(
        [
          ...thirdJisaVoc1Array,...thirdJisaVoc2Array,...thirdJisaVoc3Array,...thirdJisaVoc4Array,...thirdJisaVoc5Array
          ,...thirdJisaVoc6Array,...thirdJisaVoc7Array,...thirdJisaVoc8Array,...thirdJisaVoc9Array,...thirdJisaVoc10Array
          ,...thirdJisaVoc11Array,...thirdJisaVoc12Array,...thirdJisaVoc13Array,...thirdJisaVoc14Array,...thirdJisaVoc15Array
          ,...thirdJisaVoc16Array,
        ].reduce((acc,{date,cnt})=>{
      
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


      fourthJisaDatePlusCntArray=Object.values(
        [
          ...fourthJisaVoc1Array,...fourthJisaVoc2Array,...fourthJisaVoc3Array,...fourthJisaVoc4Array,...fourthJisaVoc5Array
          ,...fourthJisaVoc6Array,...fourthJisaVoc7Array,...fourthJisaVoc8Array,...fourthJisaVoc9Array,...fourthJisaVoc10Array
          ,...fourthJisaVoc11Array,...fourthJisaVoc12Array,...fourthJisaVoc13Array,...fourthJisaVoc14Array,...fourthJisaVoc15Array
          ,...fourthJisaVoc16Array,
        
        ].reduce((acc,{date,cnt})=>{
      
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

      fifthJisaDatePlusCntArray=Object.values(
        [
          ...fifthJisaVoc1Array,...fifthJisaVoc2Array,...fifthJisaVoc3Array,...fifthJisaVoc4Array,...fifthJisaVoc5Array
          ,...fifthJisaVoc6Array,...fifthJisaVoc7Array,...fifthJisaVoc8Array,...fifthJisaVoc9Array,...fifthJisaVoc10Array
          ,...fifthJisaVoc11Array,...fifthJisaVoc12Array,...fifthJisaVoc13Array,...fifthJisaVoc14Array,...fifthJisaVoc15Array
          ,...fifthJisaVoc16Array,
         

        ].reduce((acc,{date,cnt})=>{
      
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

      sixthJisaDatePlusCntArray=Object.values(
        [
          ...sixthJisaVoc1Array,...sixthJisaVoc2Array,...sixthJisaVoc3Array,...sixthJisaVoc4Array,...sixthJisaVoc5Array
          ,...sixthJisaVoc6Array,...sixthJisaVoc7Array,...sixthJisaVoc8Array,...sixthJisaVoc9Array,...sixthJisaVoc10Array
          ,...sixthJisaVoc11Array,...sixthJisaVoc12Array,...sixthJisaVoc13Array,...sixthJisaVoc14Array,...sixthJisaVoc15Array
          ,...sixthJisaVoc16Array,
       
        ].reduce((acc,{date,cnt})=>{
      
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

      seventhJisaDatePlusCntArray=Object.values(
        [
          ...seventhJisaVoc1Array,...seventhJisaVoc2Array,...seventhJisaVoc3Array,...seventhJisaVoc4Array,...seventhJisaVoc5Array
          ,...seventhJisaVoc6Array,...seventhJisaVoc7Array,...seventhJisaVoc8Array,...seventhJisaVoc9Array,...seventhJisaVoc10Array
          ,...seventhJisaVoc11Array,...seventhJisaVoc12Array,...seventhJisaVoc13Array,...seventhJisaVoc14Array,...seventhJisaVoc15Array
          ,...seventhJisaVoc16Array,

        ].reduce((acc,{date,cnt})=>{
      
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
