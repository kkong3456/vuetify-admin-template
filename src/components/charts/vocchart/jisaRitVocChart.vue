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

      lastWeekStartDate:'20210413',
      lastWeekEndDate:'20210419',

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

    async changeDate(){
      const bonbuVocDataUrl=`http://172.21.220.97/api/voc.json/?table=rit&bonbu=${this.selectedBonbu}&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&kind1=jisa&kind2=type`;
      const lastBonbuVocDataUrl=`http://172.21.220.97/api/voc.json/?table=rit&bonbu=${this.selectedBonbu}&begin=${this.lastWeekStartDate}&end=${this.lastWeekEndDate}&kind1=jisa&kind2=type`;
    
     
      await axios.all(
        [
          axios.get(bonbuVocDataUrl),
          axios.get(lastBonbuVocDataUrl),
        ]
      ).then(axios.spread((res1,res2)=>{
        this.bonbuVocData=res1.data.results;
        this.lastWeekBonbuVocData=res2.data.results;
        
        
      })).catch((err)=>{
        console.log('금주 일자 데이터를 가져 오지 못했습니다');
      });
      
      this.fillData(this.selectedBonbu)
      this.renderChart(this.dataCollection,this.options);
    },


    async changeBonbu(selectedBonbu){

      const bonbuVocDataUrl=`http://172.21.220.97/api/voc.json/?table=rit&bonbu=${selectedBonbu}&begin=${this.selectedStartDate}&end=${this.selectedEndDate}&kind1=jisa&kind2=type`;
      const lastBonbuVocDataUrl=`http://172.21.220.97/api/voc.json/?table=rit&bonbu=${selectedBonbu}&begin=${this.lastWeekStartDate}&end=${this.lastWeekEndDate}&kind1=jisa&kind2=type`;
    
      //this.selectedJisa=selectedJisa;  //지사 선택시 전역적으로 알려준다
      this.selectedBonbu=selectedBonbu;

      await axios.all(
        [
          axios.get(bonbuVocDataUrl),
          axios.get(lastBonbuVocDataUrl),
        ]
      ).then(axios.spread((res1,res2)=>{
        this.bonbuVocData=res1.data.results;
        this.lastWeekBonbuVocData=res2.data.results;
        
        
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
          labels:yyy.firstJisa.basedate.map((day)=>day.substring(5,10)),
          datasets: [
            {
              label:yyy.firstJisa,     // 범례
              borderColor: '#6697F8',
             
              //backgroundColor:"#6697F8",
              //backgroundColor:'rgba(56,56,155,0.3)',
              data: yyy.firstJisa.countSum,
              fill:false,
              tension:.3,
              pointHoverBorderColor:'#ff0000',
              //borderWidth:1,

            },
            {
              label:yyy.secondJisa,
              borderColor: '#5CE082',
              //backgroundColor:"rgba(92,224,130,.1)",
              data: yyy.secondJisa.countSum,
              fill:false,
              tension:.3,
              pointHoverBorderColor:'#ff0000',
            },
            {
              label: yyy.thirdJisa,
              borderColor: '#F7E872',
              //backgroundColor:"rgba(0,179,0,.1)",
              data: yyy.thirdJisa.countSum,
              fill:false,
              tension:.3,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy.fourthJisa,
              borderColor: '#E0815C',
              backgroundColor:"transparent",
              data: yyy.fourthJisa.countSum,
              fill:false,
              tension:.3,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy.fifthJisa,
              borderColor: '#C641FF',
              backgroundColor:"transparent",
              data: yyy.fifthJisa.countSum,
              fill:false,
              tension:.3,
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
              borderColor: '#6697F8',
              backgroundColor:"transparent",
              data: yyy.firstJisa.countSum,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
              // hoverBorderWith:20,

            },
            {
              label:yyy.secondJisa.jojik[0],
              borderColor: '#5CE082',
              backgroundColor:"transparent",
              data: yyy.secondJisa.countSum,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
            },
            {
              label: yyy.thirdJisa.jojik[0],
              borderColor: '#F7E872',
              backgroundColor:"transparent",
              data: yyy.thirdJisa.countSum,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy.fourthJisa.jojik[0],
              borderColor: '#E0815C',
              backgroundColor:"transparent",
              data: yyy.fourthJisa.countSum,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy.fifthJisa.jojik[0],
              borderColor: '#C641FF',
              backgroundColor:"transparent",
              data: yyy.fifthJisa.countSum,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy.sixthJisa.jojik[0],
              borderColor: '#FF33CC',
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
              borderColor: '#6697F8',
              backgroundColor:"transparent",
              data: yyy.firstJisa.countSum?yyy.firstJisa.countSum:0,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
              // hoverBorderWith:20,

            },
            {
              label:yyy.secondJisa.jojik[0],
              borderColor: '#5CE082',
              backgroundColor:"transparent",
              data: yyy.secondJisa.countSum?yyy.secondJisa.countSum:0,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
            },
            {
              label: yyy.thirdJisa.jojik[0],
              borderColor: '#F7E872',
              backgroundColor:"transparent",
              data: yyy.thirdJisa.countSum?yyy.thirdJisa.countSum:0,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy.fourthJisa.jojik[0],
              borderColor: '#E0815C',
              backgroundColor:"transparent",
              data: yyy.fourthJisa.countSum?yyy.fourthJisa.countSum:0,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy.fifthJisa.jojik[0],
              borderColor: '#C641FF',
              backgroundColor:"transparent",
              data: yyy.fifthJisa.countSum?yyy.fifthJisa.countSum:0,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
            },

            {
              label: yyy.sixthJisa.jojik[0],
              borderColor: '#ff33cc',
              backgroundColor:"transparent",
              data: yyy.sixthJisa.countSum?yyy.sixthJisa.countSum:0,
              fill:false,
              // tension:.5,
              pointHoverBorderColor:'#ff0000',
            },
            {
              label: yyy.seventhJisa.jojik[0],
              borderColor: '#ffbb33',
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


    getBonbuVocValue(selectedBonbu){    
      let bonbuVocDataObj={};

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

      const firstCountSumArray=new Array();
      const firstBaseDateArray=new Array();

      const secondCountSumArray=new Array();
      const secondBaseDateArray=new Array();

      const thirdCountSumArray=new Array();
      const thirdBaseDateArray=new Array();

      const fourthCountSumArray=new Array();
      const fourthBaseDateArray=new Array();

      const fifthCountSumArray=new Array();
      const fifthBaseDateArray=new Array();

      const sixthCountSumArray=new Array();
      const sixthBaseDateArray=new Array();

      const seventhCountSumArray=new Array();
      const seventhBaseDateArray=new Array();
      

      this.bonbuVocData.map((item)=>{
      
        if(item.jisa===bonbuJisaObj[selectedBonbu][0]){
          firstCountSumArray.push(item.count_sum);
          firstBaseDateArray.push(item.basedate);
        }

        if(item.jisa===bonbuJisaObj[selectedBonbu][1]){
          secondCountSumArray.push(item.count_sum);
          secondBaseDateArray.push(item.basedate);
        }

        if(item.jisa===bonbuJisaObj[selectedBonbu][2]){
          thirdCountSumArray.push(item.count_sum);
          thirdBaseDateArray.push(item.basedate);
        }

        if(item.jisa===bonbuJisaObj[selectedBonbu][3]){
          fourthCountSumArray.push(item.count_sum);
          fourthBaseDateArray.push(item.basedate);
        }
        if(item.jisa===bonbuJisaObj[selectedBonbu][4]){
          fifthCountSumArray.push(item.count_sum);
          fifthBaseDateArray.push(item.basedate);
        }
        if(item.jisa===bonbuJisaObj[selectedBonbu][5]){
          sixthCountSumArray.push(item.count_sum);
          sixthBaseDateArray.push(item.basedate);
        }

        if(item.jisa===bonbuJisaObj[selectedBonbu][6]){
          seventhCountSumArray.push(item.count_sum);
          seventhBaseDateArray.push(item.basedate);
        }

      });
         
      firstJisaObj={
        'jisa': firstJisa,
        'basedate':firstBaseDateArray,
        'countSum': firstCountSumArray,
      }

      secondJisaObj={
        'jisa':secondJisa,
        'basedate':secondBaseDateArray,
        'countSum': secondCountSumArray,
      }

      thirdJisaObj={
        'jisa': thirdJisa,
        'basedate':thirdBaseDateArray,
        'countSum': thirdCountSumArray,
      }
      fourthJisaObj={
        'jisa': fourthJisa,
        'basedate':fourthBaseDateArray,
        'countSum': fourthCountSumArray,
      }

      fifthJisaObj={
        'jisa':fifthJisa,
        'basedate':fifthBaseDateArray,
        'countSum': fifthCountSumArray,
      }

      sixthJisaObj={
        'jisa': sixthJisa,
        'basedate':sixthBaseDateArray,
        'countSum': sixthCountSumArray,
      }
    
      seventhJisaObj={
        'jisa': seventhJisa,
        'basedate':seventhBaseDateArray,
        'countSum': seventhCountSumArray,
      }
    
      bonbuVocDataObj={
        'firstJisa': firstJisaObj,
        'secondJisa': secondJisaObj,
        'thirdJisa': thirdJisaObj,
        'fourthJisa':fourthJisaObj,
        'fifthJisa':fifthJisaObj,
        'sixthJisa':sixthJisaObj,
        'seventhJisa':seventhJisaObj,
      }
      return bonbuVocDataObj;
    },
  }  //methods
} //export default end
</script>
<style scoped>

</style>
