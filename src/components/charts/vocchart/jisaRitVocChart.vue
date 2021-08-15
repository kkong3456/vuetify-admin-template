<script>
import Vue from 'vue'
import { Line, mixins} from 'vue-chartjs'
import axios from 'axios';
import eventBus from '@/js/eventBus';


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
  mixins: [reactiveProp],


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

      console.log('dateResult.start',dateResult.start);

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

    async changeDate(){
      const bonbuVocDataUrl=`http://172.21.220.97/api/voc.json/?table=rit&bonbu=${this.selectedBonbu}&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&kind1=jisa&kind2=type`;
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

      const bonbuVocDataUrl=`http://172.21.220.97/api/voc.json/?table=rit&bonbu=${selectedBonbu}&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&kind1=jisa&kind2=type`;
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
     
      console.log('yyyy is ', yyy);
      
      if(selectedBonbu==='북부고객본부' || selectedBonbu==='동부고객본부' || selectedBonbu==='전남/전북고객본부'){
      
        this.dataCollection = {
          labels:yyy.basedate.map((day)=>day[0].substring(5,10)),
          datasets: [
            {
              label:yyy.jisa,     // 범례
              borderColor: '#6697F8',
             
              //backgroundColor:"#6697F8",
              //backgroundColor:'rgba(56,56,155,0.3)',
              data: yyy.vocSum,
              fill:false,
              tension:.3,
              pointHoverBorderColor:'#ff0000',
              //borderWidth:1,

            },
            // {
            //   label:yyy.secondJisa,
            //   borderColor: '#5CE082',
            //   //backgroundColor:"rgba(92,224,130,.1)",
            //   data: yyy.secondJisa.countSum,
            //   fill:false,
            //   tension:.3,
            //   pointHoverBorderColor:'#ff0000',
            // },
            // {
            //   label: yyy.thirdJisa,
            //   borderColor: '#F7E872',
            //   //backgroundColor:"rgba(0,179,0,.1)",
            //   data: yyy.thirdJisa.countSum,
            //   fill:false,
            //   tension:.3,
            //   pointHoverBorderColor:'#ff0000',
            // },

            // {
            //   label: yyy.fourthJisa,
            //   borderColor: '#E0815C',
            //   backgroundColor:"transparent",
            //   data: yyy.fourthJisa.countSum,
            //   fill:false,
            //   tension:.3,
            //   pointHoverBorderColor:'#ff0000',
            // },

            // {
            //   label: yyy.fifthJisa,
            //   borderColor: '#C641FF',
            //   backgroundColor:"transparent",
            //   data: yyy.fifthJisa.countSum,
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
      let bonbuVocDataObj={};

      const voc1='KT업무/정책불만';
      const voc2='KTShop문의';
      const voc3='서비스불만';
      const voc4='약정문의';
      const voc5='요금불만';
      const voc6='위약금(할인반환금)문의';
      const voc7='품질불만';
      const voc8='혜택문의';

      

      let firstJisaObj={};
      let secondJisaObj={};
      let thirdJisaObj={};
      let fourthJisaObj={};
      let fifthJisaObj={};
      let sixthJisaObj={};
      let seventhJisaObj={};
      // console.log('url is xxxx ',bonbuJisaObj[selectedBonbu]);



      const firstJisa=bonbuJisaObj[selectedBonbu][0];
      const secondJisa=bonbuJisaObj[selectedBonbu][1];
      const thirdJisa=bonbuJisaObj[selectedBonbu][2];
      const fourthJisa=bonbuJisaObj[selectedBonbu][3];
      const fifthJisa=bonbuJisaObj[selectedBonbu][4];
      const sixthJisa=bonbuJisaObj[selectedBonbu][5];
      const seventhJisa=bonbuJisaObj[selectedBonbu][6];

      let firstJisaDatePlusCntArray=[];

      const firstJisaVocSumArray=[];
      const firstJisaBaseDateArray=[];
      const firstJisaVoc1Array=[];
      const firstJisaVoc2Array=[];
      const firstJisaVoc3Array=[];
      const firstJisaVoc4Array=[];
      const firstJisaVoc5Array=[];
      const firstJisaVoc6Array=[];
      const firstJisaVoc7Array=[];
      const firstJisaVoc8Array=[];
      

      let secondJisaVoc2Array=[];
      let secondJisaBaseDateArray=[];

      let thirdJisaVoc3Array=[];
      let thirdJisaBaseDateArray=[];

      let fourthJisaVoc4Array=[];
      let fourthJisaBaseDateArray=[];

      let fifthJisaVoc5Array=[];
      let fifthJisaBaseDateArray=[];

      let sixthJisaVoc6Array=[];
      let sixthJisaBaseDateArray=[];

      let seventhJisaVoc7Array=[];
      let seventhJisaBaseDateArray=[];
       
      let vocSum=0;

    
      this.bonbuVocData.map((item,index)=>{
        if(item.voc_gubun.replace(/ /g,'')===voc1){
          if(firstJisa===item.jisa){
            firstJisaVoc1Array.push({'date':item.basedate,'cnt':item.count_sum});
          }
        }

     
        if(item.voc_gubun.replace(/ /g,'')===voc2){
          if(firstJisa===item.jisa){
            firstJisaVoc2Array.push({'date':item.basedate,'cnt':item.count_sum});
          }
        }

      
        if(item.voc_gubun.replace(/ /g,'')===voc3){
          if(firstJisa===item.jisa){
            firstJisaVoc3Array.push({'date':item.basedate,'cnt':item.count_sum});
          }
        }

      
        if(item.voc_gubun.replace(/ /g,'')===voc4){
          if(firstJisa===item.jisa){
            firstJisaVoc4Array.push({'date':item.basedate,'cnt':item.count_sum});
          }
        }

        
        if(item.voc_gubun.replace(/ /g,'')===voc5){
          if(firstJisa===item.jisa){
            firstJisaVoc5Array.push({'date':item.basedate,'cnt':item.count_sum});
          }
        }

      
        if((item.voc_gubun.replace(/ /g,'')===voc6) || (item.voc_gubun.replace(/ /g,'')==='할인반환금문의')){
          if(firstJisa===item.jisa){
            firstJisaVoc6Array.push({'date':item.basedate,'cnt':item.count_sum});
          }
        }
       
        if(item.voc_gubun.replace(/ /g,'')===voc7){
          if(firstJisa===item.jisa){
            firstJisaVoc7Array.push({'date':item.basedate,'cnt':item.count_sum});
          }
        }

       
        if(item.voc_gubun.replace(/ /g,'')===voc8){
          if(firstJisa===item.jisa){
            firstJisaVoc8Array.push({'date':item.basedate,'cnt':item.count_sum});
          }
        }   
     
      });

      //일자별로 voc 카운트 객체 만들기
      firstJisaDatePlusCntArray=Object.values([...firstJisaVoc1Array,...firstJisaVoc2Array,...firstJisaVoc3Array,...firstJisaVoc4Array,...firstJisaVoc5Array,...firstJisaVoc6Array,...firstJisaVoc7Array,...firstJisaVoc8Array].reduce((acc,{date,cnt})=>{
      
        if(acc[date]) acc[date].cnt+=parseInt(cnt);
        else acc[date]={date,cnt:parseInt(cnt)};
       
        return acc;
      },{}));

      console.log('일자별 합계는',firstJisaDatePlusCntArray); //[{date:'2021-04-00',cnt:184},{},{}..]

      //일자별로 오름차순으로 정렬하기

      const compare=(key)=>(a,b)=>{
        return a[key]>a[key]?1:a[key]<b[key]?-1:0;
      };

      firstJisaDatePlusCntArray=firstJisaDatePlusCntArray.sort(compare('date'));


      

      let firstJisaDayArray=[];
      let firstJisaDayVocArray=[];

      for(let i=0;i<firstJisaDatePlusCntArray.length;i++){
        firstJisaDayArray.push(firstJisaDatePlusCntArray[i].date);
        firstJisaDayVocArray.push(firstJisaDatePlusCntArray[i].cnt);
               
      }
     


    
    
      firstJisaObj={
        'jisa':firstJisa,
        'basedate':firstJisaDayArray,
        'vocSum':firstJisaDayVocArray,
      }
      return firstJisaObj;
    }
  }
}      
    

</script>
<style scoped>

</style>
