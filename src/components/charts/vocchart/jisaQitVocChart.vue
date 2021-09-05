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
      const bonbuVocDataUrl=`http://172.21.220.97/api/voc.json/?table=qit&bonbu=${this.selectedBonbu}&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&kind1=jisa&kind2=type`;
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

      const bonbuVocDataUrl=`http://172.21.220.97/api/voc.json/?table=qit&bonbu=${selectedBonbu}&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&kind1=jisa&kind2=type`;
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

      const voc1='발열배터리등단말이상';
      const voc2='\"부주의, ID/PW 분실 등\"';
      const voc3='\"전원, 충전 이상\"';
      const voc4='AS보류(유료화)';
      const voc5='IP공유기이상';
      const voc6='PIN인증오류';
      const voc7='STB(부팅)이상';
      const voc8='STB(작동)이상';
      const voc9='STB무선연결이상';
      const voc10='USB포트인식불가';
      const voc11='air전원불량';
      const voc12='네트워크오류';
      const voc13='네트워크장비장애';
      const voc14='리모컨작동불가';
      const voc15='메뉴실행불가';
      const voc16='모뎀이상';
      const voc17='수신불량';
      const voc18='수신카드(UICC포함)';
      const voc19='스피커이상(기가지니)';
      const voc20='양방향서비스사용불가';
      const voc21='온라인학습접속불가';
      const voc22='온라인학습접속지연/끊김';
      const voc23='음성이상';
      const voc24='음성인식이상(기가지니)';
      const voc25='이용불가';
      const voc26='인증실패';
      const voc27='자막이상';
      const voc28='전국장애';
      const voc29='전환지연';
      const voc30='접속불가';
      const voc31='접속지연/끊김';
      const voc32='증설/구내선정리요청';
      const voc33='채널편성표없음';
      const voc34='케이블(전송로)장애';
      const voc35='클린DNS시스템관련문의';
      const voc36='타사및기타장애';
      const voc37='특이고장';
      const voc38='화질이상';
      const voc39='기타';

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
      const firstJisaVoc17Array=[];
      const firstJisaVoc18Array=[];
      const firstJisaVoc19Array=[];
      const firstJisaVoc20Array=[];
      const firstJisaVoc21Array=[];
      const firstJisaVoc22Array=[];
      const firstJisaVoc23Array=[];
      const firstJisaVoc24Array=[];
      const firstJisaVoc25Array=[];
      const firstJisaVoc26Array=[];
      const firstJisaVoc27Array=[];
      const firstJisaVoc28Array=[];
      const firstJisaVoc29Array=[];
      const firstJisaVoc30Array=[];
      const firstJisaVoc31Array=[];
      const firstJisaVoc32Array=[];
      const firstJisaVoc33Array=[];
      const firstJisaVoc34Array=[];
      const firstJisaVoc35Array=[];
      const firstJisaVoc36Array=[];
      const firstJisaVoc37Array=[];
      const firstJisaVoc38Array=[];
      const firstJisaVoc39Array=[];
      

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
      const secondJisaVoc17Array=[];
      const secondJisaVoc18Array=[];
      const secondJisaVoc19Array=[];
      const secondJisaVoc20Array=[];
      const secondJisaVoc21Array=[];
      const secondJisaVoc22Array=[];
      const secondJisaVoc23Array=[];
      const secondJisaVoc24Array=[];
      const secondJisaVoc25Array=[];
      const secondJisaVoc26Array=[];
      const secondJisaVoc27Array=[];
      const secondJisaVoc28Array=[];
      const secondJisaVoc29Array=[];
      const secondJisaVoc30Array=[];
      const secondJisaVoc31Array=[];
      const secondJisaVoc32Array=[];
      const secondJisaVoc33Array=[];
      const secondJisaVoc34Array=[];
      const secondJisaVoc35Array=[];
      const secondJisaVoc36Array=[];
      const secondJisaVoc37Array=[];
      const secondJisaVoc38Array=[];
      const secondJisaVoc39Array=[];
      

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
      const thirdJisaVoc17Array=[];
      const thirdJisaVoc18Array=[];
      const thirdJisaVoc19Array=[];
      const thirdJisaVoc20Array=[];
      const thirdJisaVoc21Array=[];
      const thirdJisaVoc22Array=[];
      const thirdJisaVoc23Array=[];
      const thirdJisaVoc24Array=[];
      const thirdJisaVoc25Array=[];
      const thirdJisaVoc26Array=[];
      const thirdJisaVoc27Array=[];
      const thirdJisaVoc28Array=[];
      const thirdJisaVoc29Array=[];
      const thirdJisaVoc30Array=[];
      const thirdJisaVoc31Array=[];
      const thirdJisaVoc32Array=[];
      const thirdJisaVoc33Array=[];
      const thirdJisaVoc34Array=[];
      const thirdJisaVoc35Array=[];
      const thirdJisaVoc36Array=[];
      const thirdJisaVoc37Array=[];
      const thirdJisaVoc38Array=[];
      const thirdJisaVoc39Array=[];
     

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
      const fourthJisaVoc17Array=[];
      const fourthJisaVoc18Array=[];
      const fourthJisaVoc19Array=[];
      const fourthJisaVoc20Array=[];
      const fourthJisaVoc21Array=[];
      const fourthJisaVoc22Array=[];
      const fourthJisaVoc23Array=[];
      const fourthJisaVoc24Array=[];
      const fourthJisaVoc25Array=[];
      const fourthJisaVoc26Array=[];
      const fourthJisaVoc27Array=[];
      const fourthJisaVoc28Array=[];
      const fourthJisaVoc29Array=[];
      const fourthJisaVoc30Array=[];
      const fourthJisaVoc31Array=[];
      const fourthJisaVoc32Array=[];
      const fourthJisaVoc33Array=[];
      const fourthJisaVoc34Array=[];
      const fourthJisaVoc35Array=[];
      const fourthJisaVoc36Array=[];
      const fourthJisaVoc37Array=[];
      const fourthJisaVoc38Array=[];
      const fourthJisaVoc39Array=[];
    

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
      const fifthJisaVoc17Array=[];
      const fifthJisaVoc18Array=[];
      const fifthJisaVoc19Array=[];
      const fifthJisaVoc20Array=[];
      const fifthJisaVoc21Array=[];
      const fifthJisaVoc22Array=[];
      const fifthJisaVoc23Array=[];
      const fifthJisaVoc24Array=[];
      const fifthJisaVoc25Array=[];
      const fifthJisaVoc26Array=[];
      const fifthJisaVoc27Array=[];
      const fifthJisaVoc28Array=[];
      const fifthJisaVoc29Array=[];
      const fifthJisaVoc30Array=[];
      const fifthJisaVoc31Array=[];
      const fifthJisaVoc32Array=[];
      const fifthJisaVoc33Array=[];
      const fifthJisaVoc34Array=[];
      const fifthJisaVoc35Array=[];
      const fifthJisaVoc36Array=[];
      const fifthJisaVoc37Array=[];
      const fifthJisaVoc38Array=[];
      const fifthJisaVoc39Array=[];
    

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
      const sixthJisaVoc17Array=[];
      const sixthJisaVoc18Array=[];
      const sixthJisaVoc19Array=[];
      const sixthJisaVoc20Array=[];
      const sixthJisaVoc21Array=[];
      const sixthJisaVoc22Array=[];
      const sixthJisaVoc23Array=[];
      const sixthJisaVoc24Array=[];
      const sixthJisaVoc25Array=[];
      const sixthJisaVoc26Array=[];
      const sixthJisaVoc27Array=[];
      const sixthJisaVoc28Array=[];
      const sixthJisaVoc29Array=[];
      const sixthJisaVoc30Array=[];
      const sixthJisaVoc31Array=[];
      const sixthJisaVoc32Array=[];
      const sixthJisaVoc33Array=[];
      const sixthJisaVoc34Array=[];
      const sixthJisaVoc35Array=[];
      const sixthJisaVoc36Array=[];
      const sixthJisaVoc37Array=[];
      const sixthJisaVoc38Array=[];
      const sixthJisaVoc39Array=[];
     

     
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
      const seventhJisaVoc17Array=[];
      const seventhJisaVoc18Array=[];
      const seventhJisaVoc19Array=[];
      const seventhJisaVoc20Array=[];
      const seventhJisaVoc21Array=[];
      const seventhJisaVoc22Array=[];
      const seventhJisaVoc23Array=[];
      const seventhJisaVoc24Array=[];
      const seventhJisaVoc25Array=[];
      const seventhJisaVoc26Array=[];
      const seventhJisaVoc27Array=[];
      const seventhJisaVoc28Array=[];
      const seventhJisaVoc29Array=[];
      const seventhJisaVoc30Array=[];
      const seventhJisaVoc31Array=[];
      const seventhJisaVoc32Array=[];
      const seventhJisaVoc33Array=[];
      const seventhJisaVoc34Array=[];
      const seventhJisaVoc35Array=[];
      const seventhJisaVoc36Array=[];
      const seventhJisaVoc37Array=[];
      const seventhJisaVoc38Array=[];
      const seventhJisaVoc39Array=[];
    

      let dateKeyArray=[];

      this.selectedStartNewDate=new Date(this.selectedStartDate.substring(0,4)+'-'+this.selectedStartDate.substring(4,6)+'-'+this.selectedStartDate.substring(6,8));
      this.selectedEndNewDate=new Date(this.selectedEndDate.substring(0,4)+'-'+this.selectedEndDate.substring(4,6)+'-'+this.selectedEndDate.substring(6,8)); 
      const dateDiffCnt=Math.ceil((this.selectedEndNewDate.getTime()-this.selectedStartNewDate.getTime())/(1000*3600*24)); 
      this.selectedStartNewDate=new Date(this.selectedStartNewDate.setDate(this.selectedStartNewDate.getDate()-1));
      
      for (let date=0;date<=dateDiffCnt;date++){  //시작일과 종료일 차이수 만큼 일자를 배열로 생성 '2021-04-01'
        dateKeyArray.push(this.displayDateText2(new Date(this.selectedStartNewDate.setDate(this.selectedStartNewDate.getDate()+1))));  //조회 날자를 배열로 만들고 형식을 '2021-04-01' 형식으로 변경
      }

        
      this.bonbuVocData.map((item,index)=>{
       
        if(item.voc_gubun.replace(/[\,\/]/g,'')===voc1){
          // console.log('voc1 is ',item.voc_gubun.replace(/ /g,''));
          if(firstJisa===item.jisa){firstJisaVoc1Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc1Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc1Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc1Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc1Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc1Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc1Array.push({'date':item.basedate,'cnt':item.count_sum});}
         
        }
        if(item.voc_gubun===voc2){
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
        if(item.voc_gubun===voc3){
          // console.log('voc3 is ',item.voc_gubun.replace(/[\,\/]/g,''));
          if(firstJisa===item.jisa){firstJisaVoc3Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc3Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc3Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc3Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc3Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc3Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc3Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===voc4){
          // console.log('voc4 is ',item.voc_gubun.replace(/[\,\/]/g,''));
          if(firstJisa===item.jisa){firstJisaVoc4Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc4Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc4Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc4Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc4Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc4Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc4Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===voc5){
          // console.log('voc5 is ',item.voc_gubun.replace(/ /g,''));
          if(firstJisa===item.jisa){firstJisaVoc5Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc5Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc5Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc5Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc5Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc5Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc5Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===voc6){
          // console.log('voc6 is ',item.voc_gubun.replace(/ /g,''));
          if(firstJisa===item.jisa){firstJisaVoc6Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc6Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc6Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc6Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc6Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc6Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc6Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===voc7){
          // console.log('voc7 is ',item.voc_gubun.replace(/ /g,''));
          if(firstJisa===item.jisa){firstJisaVoc7Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc7Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc7Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc7Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc7Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc7Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc7Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===voc8){
          // console.log('voc8 is ',item.voc_gubun.replace(/ /g,''));
          if(firstJisa===item.jisa){firstJisaVoc8Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc8Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc8Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc8Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc8Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc8Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc8Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===voc9){
          // console.log('voc9 is ',item.voc_gubun.replace(/ /g,''));
          if(firstJisa===item.jisa){firstJisaVoc9Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc9Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc9Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc9Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc9Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc9Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc9Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===voc10){
          // console.log('voc10 is ',item.voc_gubun.replace(/ /g,''));
          if(firstJisa===item.jisa){firstJisaVoc10Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc10Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc10Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc10Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc10Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc10Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc10Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===voc11){
          // console.log('voc11 is ',item.voc_gubun.replace(/ /g,''));
          if(firstJisa===item.jisa){firstJisaVoc11Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc11Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc11Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc11Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc11Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc11Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc11Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===voc12){
          // console.log('voc12 is ',item.voc_gubun.replace(/ /g,''));
          if(firstJisa===item.jisa){firstJisaVoc12Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc12Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc12Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc12Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc12Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc12Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc12Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===voc13){
          // console.log('voc13 is ',item.voc_gubun.replace(/ /g,''));
          if(firstJisa===item.jisa){firstJisaVoc13Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc13Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc13Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc13Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc13Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc13Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc13Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===voc14){
          // console.log('voc14 is ',item.voc_gubun.replace(/ /g,''));
          if(firstJisa===item.jisa){firstJisaVoc14Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc14Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc14Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc14Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc14Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc14Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc14Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===voc15){
          // console.log('voc15 is ',item.voc_gubun.replace(/ /g,''));
          if(firstJisa===item.jisa){firstJisaVoc15Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc15Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc15Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc15Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc15Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc15Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc15Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===voc16){
          // console.log('voc16 is ',item.voc_gubun.replace(/ /g,''));
          if(firstJisa===item.jisa){firstJisaVoc16Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc16Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc16Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc16Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc16Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc16Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc16Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===voc17){
          // console.log('voc17 is ',item.voc_gubun.replace(/ /g,''));
          if(firstJisa===item.jisa){firstJisaVoc17Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc17Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc17Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc17Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc17Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc17Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc17Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===voc18){
          // console.log('voc18 is ',item.voc_gubun.replace(/ /g,''));
          if(firstJisa===item.jisa){firstJisaVoc18Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc18Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc18Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc18Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc18Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc18Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc18Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===voc19){
          // console.log('voc19 is ',item.voc_gubun.replace(/ /g,''));
          if(firstJisa===item.jisa){firstJisaVoc19Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc19Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc19Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc19Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc19Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc19Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc19Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===voc20){
          // console.log('voc20 is ',item.voc_gubun.replace(/ /g,''));
          if(firstJisa===item.jisa){firstJisaVoc20Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc20Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc20Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc20Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc20Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc20Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc20Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===voc21){
          // console.log('voc21 is ',item.voc_gubun.replace(/ /g,''));
          if(firstJisa===item.jisa){firstJisaVoc21Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc21Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc21Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc21Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc21Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc21Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc21Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===voc22){
          // console.log('voc22 is ',item.voc_gubun.replace(/ /g,''));
          if(firstJisa===item.jisa){firstJisaVoc22Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc22Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc22Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc22Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc22Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc22Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc22Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===voc23){
          if(firstJisa===item.jisa){firstJisaVoc23Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc23Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc23Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc23Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc23Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc23Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc23Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===voc24){
          if(firstJisa===item.jisa){firstJisaVoc24Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc24Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc24Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc24Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc24Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc24Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc24Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===voc25){
          if(firstJisa===item.jisa){firstJisaVoc25Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc25Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc25Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc25Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc25Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc25Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc25Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===voc26){
          if(firstJisa===item.jisa){firstJisaVoc26Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc26Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc26Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc26Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc26Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc26Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc26Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===voc27){
          if(firstJisa===item.jisa){firstJisaVoc27Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc27Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc27Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc27Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc27Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc27Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc27Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===voc28){
          if(firstJisa===item.jisa){firstJisaVoc28Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc28Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc28Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc28Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc28Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc28Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc28Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===voc29){
          if(firstJisa===item.jisa){firstJisaVoc29Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc29Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc29Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc29Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc29Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc29Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc29Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===voc30){
          if(firstJisa===item.jisa){firstJisaVoc30Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc30Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc30Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc30Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc30Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc30Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc30Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===voc31){
          if(firstJisa===item.jisa){firstJisaVoc31Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc31Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc31Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc31Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc31Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc31Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc31Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===voc32){
          if(firstJisa===item.jisa){firstJisaVoc32Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc32Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc32Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc32Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc32Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc32Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc32Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===voc33){
          if(firstJisa===item.jisa){firstJisaVoc33Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc33Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc33Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc33Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc33Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc33Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc33Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===voc34){
          if(firstJisa===item.jisa){firstJisaVoc34Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc34Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc34Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc34Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc34Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc34Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc34Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===voc35){
          if(firstJisa===item.jisa){firstJisaVoc35Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc35Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc35Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc35Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc35Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc35Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc35Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===voc36){
          if(firstJisa===item.jisa){firstJisaVoc36Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc36Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc36Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc36Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc36Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc36Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc36Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===voc37){
          if(firstJisa===item.jisa){firstJisaVoc37Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc37Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc37Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc37Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc37Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc37Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc37Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===voc38){
          if(firstJisa===item.jisa){firstJisaVoc38Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc38Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc38Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc38Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc38Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc38Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc38Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
        if(item.voc_gubun.replace(/ /g,'')===voc39){
          if(firstJisa===item.jisa){firstJisaVoc39Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(secondJisa===item.jisa){secondJisaVoc39Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(thirdJisa===item.jisa){thirdJisaVoc39Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(fourthJisa===item.jisa){fourthJisaVoc39Array.push({'date':item.basedate,'cnt':item.count_sum}); }
          if(fifthJisa===item.jisa){fifthJisaVoc39Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(sixthJisa===item.jisa){sixthJisaVoc39Array.push({'date':item.basedate,'cnt':item.count_sum});}
          if(seventhJisa===item.jisa){seventhJisaVoc39Array.push({'date':item.basedate,'cnt':item.count_sum});}
        }
           
      });

      // console.log('firstJis voc1 sum is ', 
      //   firstJisaVoc1Array,firstJisaVoc2Array,firstJisaVoc3Array,firstJisaVoc4Array,firstJisaVoc5Array
      //   ,firstJisaVoc6Array,firstJisaVoc7Array,firstJisaVoc8Array,firstJisaVoc9Array,firstJisaVoc10Array
      //   ,firstJisaVoc11Array,firstJisaVoc12Array,firstJisaVoc13Array,firstJisaVoc14Array,firstJisaVoc15Array
      //   ,firstJisaVoc16Array,firstJisaVoc17Array,firstJisaVoc18Array,firstJisaVoc19Array,firstJisaVoc20Array
      //   ,firstJisaVoc21Array,firstJisaVoc22Array,firstJisaVoc23Array,firstJisaVoc24Array,firstJisaVoc25Array
      //   ,firstJisaVoc26Array,firstJisaVoc27Array,firstJisaVoc28Array,firstJisaVoc29Array,firstJisaVoc30Array
      //   ,firstJisaVoc31Array,firstJisaVoc32Array,firstJisaVoc33Array,firstJisaVoc34Array,firstJisaVoc35Array
      //   ,firstJisaVoc36Array,firstJisaVoc37Array,firstJisaVoc38Array,firstJisaVoc39Array
      // );

      const diffDateArray=(a,b)=>a.filter(x=>!b.includes(x));  // 두 배열에서 중복을 제거하고 남은 요소를 다시 배열로.

      //일자별로 voc 카운트 객체 만들기
      firstJisaDatePlusCntArray=Object.values(
        [
          ...firstJisaVoc1Array,...firstJisaVoc2Array,...firstJisaVoc3Array,...firstJisaVoc4Array,...firstJisaVoc5Array
          ,...firstJisaVoc6Array,...firstJisaVoc7Array,...firstJisaVoc8Array,...firstJisaVoc9Array,...firstJisaVoc10Array
          ,...firstJisaVoc11Array,...firstJisaVoc12Array,...firstJisaVoc13Array,...firstJisaVoc14Array,...firstJisaVoc15Array
          ,...firstJisaVoc16Array,...firstJisaVoc17Array,...firstJisaVoc18Array,...firstJisaVoc19Array,...firstJisaVoc20Array
          ,...firstJisaVoc21Array,...firstJisaVoc22Array,...firstJisaVoc23Array,...firstJisaVoc24Array,...firstJisaVoc25Array
          ,...firstJisaVoc26Array,...firstJisaVoc27Array,...firstJisaVoc28Array,...firstJisaVoc29Array,...firstJisaVoc30Array
          ,...firstJisaVoc31Array,...firstJisaVoc32Array,...firstJisaVoc33Array,...firstJisaVoc34Array,...firstJisaVoc35Array
          ,...firstJisaVoc36Array,...firstJisaVoc37Array,...firstJisaVoc38Array,...firstJisaVoc39Array

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
          ,...secondJisaVoc16Array,...secondJisaVoc17Array,...secondJisaVoc18Array,...secondJisaVoc19Array,...secondJisaVoc20Array
          ,...secondJisaVoc21Array,...secondJisaVoc22Array,...secondJisaVoc23Array,...secondJisaVoc24Array,...secondJisaVoc25Array
          ,...secondJisaVoc26Array,...secondJisaVoc27Array,...secondJisaVoc28Array,...secondJisaVoc29Array,...secondJisaVoc30Array
          ,...secondJisaVoc31Array,...secondJisaVoc32Array,...secondJisaVoc33Array,...secondJisaVoc34Array,...secondJisaVoc35Array
          ,...secondJisaVoc36Array,...secondJisaVoc37Array,...secondJisaVoc38Array,...secondJisaVoc39Array
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
          ,...thirdJisaVoc16Array,...thirdJisaVoc17Array,...thirdJisaVoc18Array,...thirdJisaVoc19Array,...thirdJisaVoc20Array
          ,...thirdJisaVoc21Array,...thirdJisaVoc22Array,...thirdJisaVoc23Array,...thirdJisaVoc24Array,...thirdJisaVoc25Array
          ,...thirdJisaVoc26Array,...thirdJisaVoc27Array,...thirdJisaVoc28Array,...thirdJisaVoc29Array,...thirdJisaVoc30Array
          ,...thirdJisaVoc31Array,...thirdJisaVoc32Array,...thirdJisaVoc33Array,...thirdJisaVoc34Array,...thirdJisaVoc35Array
          ,...thirdJisaVoc36Array,...thirdJisaVoc37Array,...thirdJisaVoc38Array,...thirdJisaVoc39Array

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
          ,...fourthJisaVoc16Array,...fourthJisaVoc17Array,...fourthJisaVoc18Array,...fourthJisaVoc19Array,...fourthJisaVoc20Array
          ,...fourthJisaVoc21Array,...fourthJisaVoc22Array,...fourthJisaVoc23Array,...fourthJisaVoc24Array,...fourthJisaVoc25Array
          ,...fourthJisaVoc26Array,...fourthJisaVoc27Array,...fourthJisaVoc28Array,...fourthJisaVoc29Array,...fourthJisaVoc30Array
          ,...fourthJisaVoc31Array,...fourthJisaVoc32Array,...fourthJisaVoc33Array,...fourthJisaVoc34Array,...fourthJisaVoc35Array
          ,...fourthJisaVoc36Array,...fourthJisaVoc37Array,...fourthJisaVoc38Array,...fourthJisaVoc39Array

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
          ,...fifthJisaVoc16Array,...fifthJisaVoc17Array,...fifthJisaVoc18Array,...fifthJisaVoc19Array,...fifthJisaVoc20Array
          ,...fifthJisaVoc21Array,...fifthJisaVoc22Array,...fifthJisaVoc23Array,...fifthJisaVoc24Array,...fifthJisaVoc25Array
          ,...fifthJisaVoc26Array,...fifthJisaVoc27Array,...fifthJisaVoc28Array,...fifthJisaVoc29Array,...fifthJisaVoc30Array
          ,...fifthJisaVoc31Array,...fifthJisaVoc32Array,...fifthJisaVoc33Array,...fifthJisaVoc34Array,...fifthJisaVoc35Array
          ,...fifthJisaVoc36Array,...fifthJisaVoc37Array,...fifthJisaVoc38Array,...fifthJisaVoc39Array

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
          ,...sixthJisaVoc16Array,...sixthJisaVoc17Array,...sixthJisaVoc18Array,...sixthJisaVoc19Array,...sixthJisaVoc20Array
          ,...sixthJisaVoc21Array,...sixthJisaVoc22Array,...sixthJisaVoc23Array,...sixthJisaVoc24Array,...sixthJisaVoc25Array
          ,...sixthJisaVoc26Array,...sixthJisaVoc27Array,...sixthJisaVoc28Array,...sixthJisaVoc29Array,...sixthJisaVoc30Array
          ,...sixthJisaVoc31Array,...sixthJisaVoc32Array,...sixthJisaVoc33Array,...sixthJisaVoc34Array,...sixthJisaVoc35Array
          ,...sixthJisaVoc36Array,...sixthJisaVoc37Array,...sixthJisaVoc38Array,...sixthJisaVoc39Array

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
          ,...seventhJisaVoc16Array,...seventhJisaVoc17Array,...seventhJisaVoc18Array,...seventhJisaVoc19Array,...seventhJisaVoc20Array
          ,...seventhJisaVoc21Array,...seventhJisaVoc22Array,...seventhJisaVoc23Array,...seventhJisaVoc24Array,...seventhJisaVoc25Array
          ,...seventhJisaVoc26Array,...seventhJisaVoc27Array,...seventhJisaVoc28Array,...seventhJisaVoc29Array,...seventhJisaVoc30Array
          ,...seventhJisaVoc31Array,...seventhJisaVoc32Array,...seventhJisaVoc33Array,...seventhJisaVoc34Array,...seventhJisaVoc35Array
          ,...seventhJisaVoc36Array,...seventhJisaVoc37Array,...seventhJisaVoc38Array,...seventhJisaVoc39Array

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
