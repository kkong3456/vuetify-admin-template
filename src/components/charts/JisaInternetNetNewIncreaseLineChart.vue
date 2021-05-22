<script>
import Vue from 'vue'
import { Line, mixins } from 'vue-chartjs'
import axios from 'axios';

const jisaNetNewIncreaseUrl='http://172.21.220.97/api/net/jisa.json/?prod=인터넷&bonbu=북부고객본부&kind=start'  
const jisaNetNewIncreaseUrl2='http://172.21.220.97/api/net/jisa.json/?prod=인터넷&bonbu=동부고객본부&kind=start' 
// const jisaNetIncreaseUrl='http://172.21.220.97/api/net/jisa.json/?prod=미디어&bonbu=북부고객본부&kind=net' 


const { reactiveProp } = mixins

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

          },

        scales:{
          yAxes:[{
            ticks:{
              min:0,
              // max:2500,
              //stepSize:500,
              //fontSie:52,
            },
            gridLines:{
              //display:false,
              drawBorder:false,
            }
          }],
          xAxes:[{
            display:true,
            gridLines:{
              display:false,
              drawBorder:false,
            }
          }]
        }
      } //end options



export default {
  //mixins: [reactiveProp],
  //props: ['options'],


  components:{
    name:'JisaInternetNetNewIncreaseLineChart'
  },
  extends: Line,

  data(){
    return {
      dataCollection:null,
      bonbuNetIncreaseData:null,
      bonbuNetIncreaseValueObj:null,
      options:options,
    }

  },

  async created () {
    await axios.all(
      [
        axios.get(jisaNetNewIncreaseUrl),
        axios.get(jisaNetNewIncreaseUrl2),
      ]
    ).then(axios.spread((...res)=>{
      const resp1=res[0].data.results;
      const resp2=res[1].data.results;

      const resp=[...resp1,...resp2];
      this.bonbuNetIncreaseData=resp;
    })).catch((err)=>{
      console.log('데이터를 가져오지 못했습니다',err);
    });

      this.fillData();

      //console.log(`this.dataCollection is ${this.dataCollection}`);
      this.renderChart(this.dataCollection,this.options);
  },

  methods: {
    fillData () {
      const yyy=this.getBonbuNetIncreaseValue();
      //console.log(`yyyy['강남'] is ${yyy.고양지사.countSum}`)
      this.dataCollection = {
        labels:yyy.고양지사.sysdate.map((day)=>day.substring(5,10)),
        datasets: [
          {
            label:yyy.고양지사.jojik[0],     // 범례
            borderColor: '#20B2AA',
            backgroundColor:"transparent",
            data: yyy.고양지사.countSum,
            fill:false,
            // tension:.5,
            pointHoverBorderColor:'#ff0000',
            // hoverBorderWith:20,

          }, 
          {
            label:yyy.광진지사.jojik[0],
            borderColor: '#5F9EA0',
            backgroundColor:"transparent",
            data: yyy.광진지사.countSum,
            fill:false,
            // tension:.5,
            pointHoverBorderColor:'#ff0000',
          },
          {
            label: yyy.광화문지사.jojik[0],
            borderColor: '#7FFFD4',
            backgroundColor:"transparent",
            data: yyy.광화문지사.countSum,
            fill:false,
            // tension:.5,
            pointHoverBorderColor:'#ff0000',
          },

          {
            label: yyy.노원지사.jojik[0],
            borderColor: '#7FFFD4',
            backgroundColor:"transparent",
            data: yyy.노원지사.countSum,
            fill:false,
            // tension:.5,
            pointHoverBorderColor:'#ff0000',
          },

           {
            label: yyy.서대문지사.jojik[0],
            borderColor: '#8FFFD4',
            backgroundColor:"transparent",
            data: yyy.서대문지사.countSum,
            fill:false,
            // tension:.5,
            pointHoverBorderColor:'#ff0000',
          },
          {
            label: yyy.강릉지사.jojik[0],
            borderColor: '#9FFFD4',
            backgroundColor:"transparent",
            data: yyy.강릉지사.countSum,
            fill:false,
            // tension:.5,
            pointHoverBorderColor:'#ff0000',
          },

           {
            label: yyy.구리지사.jojik[0],
            borderColor: '#AFFFD4',
            backgroundColor:"transparent",
            data: yyy.구리지사.countSum,
            fill:false,
            // tension:.5,
            pointHoverBorderColor:'#ff0000',
          },

           {
            label: yyy.원주지사.jojik[0],
            borderColor: '#BFFFD4',
            backgroundColor:"transparent",
            data: yyy.원주지사.countSum,
            fill:false,
            // tension:.5,
            pointHoverBorderColor:'#ff0000',
          },

           {
            label: yyy.의정부지사.jojik[0],
            borderColor: '#CFCCD4',
            backgroundColor:"transparent",
            data: yyy.의정부지사.countSum,
            fill:false,
            // tension:.5,
            pointHoverBorderColor:'#ff0000',
          },

           {
            label: yyy.춘천지사.jojik[0],
            borderColor: '#7FDDD4',
            backgroundColor:"transparent",
            data: yyy.춘천지사.countSum,
            fill:false,
            // tension:.5,
            pointHoverBorderColor:'#ff0000',
          },
        ]
      };  //dataCollection
    },  //fillData()


    getBonbuNetIncreaseValue(){    //본부별 순익(y축)
      let bonbuNetIncreaseValueObj={}
      let goYangJisaObj={}
      let gwangJinJisaObj={}
      let gwangWhaMoonJisaObj={}
      let noWonJisaObj={}
      let seoDaeMoonJisaObj={}

      let kangNeungJisaObj={}
      let guRiJisaObj={}
      let wonJuJisaObj={}
      let uiJeongBuJisaObj={}
      let chunCheonJisaObj={}

      

      const goYangSysdateArray=new Array();
      const goYangjojik2Array=new Array();
      const goYangjojik3Array=new Array();
      const goYangProductArray=new Array();
      const goYangCountSumArray=new Array();

      const gwangJinSysdateArray=new Array();
      const gwangJinjojik2Array=new Array();
      const gwangJinjojik3Array=new Array();
      const gwangJinProductArray=new Array();
      const gwangJinCountSumArray=new Array();


      const gwangWhaMoonSysdateArray=new Array();
      const gwangWhaMoonjojik2Array=new Array();
      const gwangWhaMoonjojik3Array=new Array();
      const gwangWhaMoonProductArray=new Array();
      const gwangWhaMoonCountSumArray=new Array();

      const noWonSysdateArray=new Array();
      const noWonjojik2Array=new Array();
      const noWonjojik3Array=new Array();
      const noWonProductArray=new Array();
      const noWonCountSumArray=new Array();


      const seoDaeMoonSysdateArray=new Array();
      const seoDaeMoonjojik2Array=new Array();
      const seoDaeMoonjojik3Array=new Array();
      const seoDaeMoonProductArray=new Array();
      const seoDaeMoonCountSumArray=new Array();

      const kangNeungSysdateArray=new Array();
      const kangNeungjojik2Array=new Array();
      const kangNeungjojik3Array=new Array();
      const kangNeungProductArray=new Array();
      const kangNeungCountSumArray=new Array();

      const guRiSysdateArray=new Array();
      const guRijojik2Array=new Array();
      const guRijojik3Array=new Array();
      const guRiProductArray=new Array();
      const guRiCountSumArray=new Array();

      const wonJuSysdateArray=new Array();
      const wonJujojik2Array=new Array();
      const wonJujojik3Array=new Array();
      const wonJuProductArray=new Array();
      const wonJuCountSumArray=new Array();

      const uiJeongBuSysdateArray=new Array();
      const uiJeongBujojik2Array=new Array();
      const uiJeongBujojik3Array=new Array();
      const uiJeongBuProductArray=new Array();
      const uiJeongBuCountSumArray=new Array();

      const chunCheonSysdateArray=new Array();
      const chunCheonjojik2Array=new Array();
      const chunCheonjojik3Array=new Array();
      const chunCheonProductArray=new Array();
      const chunCheonCountSumArray=new Array();

      this.bonbuNetIncreaseData.map((item)=>{
        //console.log('item is ',item);

        if(item.jojik3_name==='고양지사'){
          goYangSysdateArray.push(item.sysdate);
          goYangjojik3Array.push(item.jojik3_name);
          goYangProductArray.push(item.prod2);
          goYangCountSumArray.push(item.count_sum);
        }

        if(item.jojik3_name==='광진지사'){
          gwangJinSysdateArray.push(item.sysdate);
          gwangJinjojik3Array.push(item.jojik3_name);
          gwangJinProductArray.push(item.prod2);
          gwangJinCountSumArray.push(item.count_sum);
        }

        if(item.jojik3_name==='광화문지사'){
          gwangWhaMoonSysdateArray.push(item.sysdate);
          gwangWhaMoonjojik3Array.push(item.jojik3_name);
          gwangWhaMoonProductArray.push(item.prod2);
          gwangWhaMoonCountSumArray.push(item.count_sum);
        }
        if(item.jojik3_name==='노원지사'){
          noWonSysdateArray.push(item.sysdate);
          noWonjojik3Array.push(item.jojik3_name);
          noWonProductArray.push(item.prod2);
          noWonCountSumArray.push(item.count_sum);
        }

        
         if(item.jojik3_name==='서대문지사'){
          seoDaeMoonSysdateArray.push(item.sysdate);
          seoDaeMoonjojik3Array.push(item.jojik3_name);
          seoDaeMoonProductArray.push(item.prod2);
          seoDaeMoonCountSumArray.push(item.count_sum);
        }

         if(item.jojik3_name==='강릉지사'){
          kangNeungSysdateArray.push(item.sysdate);
          kangNeungjojik3Array.push(item.jojik3_name);
          kangNeungProductArray.push(item.prod2);
          kangNeungCountSumArray.push(item.count_sum);
        }
         if(item.jojik3_name==='구리지사'){
          guRiSysdateArray.push(item.sysdate);
          guRijojik3Array.push(item.jojik3_name);
          guRiProductArray.push(item.prod2);
          guRiCountSumArray.push(item.count_sum);
        }
         if(item.jojik3_name==='원주지사'){
          wonJuSysdateArray.push(item.sysdate);
          wonJujojik3Array.push(item.jojik3_name);
          wonJuProductArray.push(item.prod2);
          wonJuCountSumArray.push(item.count_sum);
        }
         if(item.jojik3_name==='의정부지사'){
          uiJeongBuSysdateArray.push(item.sysdate);
          uiJeongBujojik3Array.push(item.jojik3_name);
          uiJeongBuProductArray.push(item.prod2);
          uiJeongBuCountSumArray.push(item.count_sum);
        }

  
         if(item.jojik3_name==='춘천지사'){
          chunCheonSysdateArray.push(item.sysdate);
          chunCheonjojik3Array.push(item.jojik3_name);
          chunCheonProductArray.push(item.prod2);
          chunCheonCountSumArray.push(item.count_sum);
        }
       


        goYangJisaObj={
          'sysdate': goYangSysdateArray,
          'jojik':goYangjojik3Array,
          'product': goYangProductArray,
          'countSum': goYangCountSumArray,
        }

        gwangJinJisaObj={
          'sysdate': gwangJinProductArray,
          'jojik':gwangJinjojik3Array,
          'product': gwangJinProductArray,
          'countSum': gwangJinCountSumArray,
        }

        gwangWhaMoonJisaObj={
          'sysdate': gwangWhaMoonSysdateArray,
          'jojik':gwangWhaMoonjojik3Array,
          'product': gwangWhaMoonProductArray,
          'countSum': gwangWhaMoonCountSumArray,
        }
        noWonJisaObj={
          'sysdate': noWonSysdateArray,
          'jojik':noWonjojik3Array,
          'product': noWonProductArray,
          'countSum': noWonCountSumArray,
        }

        seoDaeMoonJisaObj={
          'sysdate': seoDaeMoonSysdateArray,
          'jojik':seoDaeMoonjojik3Array,
          'product': seoDaeMoonProductArray,
          'countSum': seoDaeMoonCountSumArray,
        }

        kangNeungJisaObj={
          'sysdate': kangNeungSysdateArray,
          'jojik':kangNeungjojik3Array,
          'product': kangNeungProductArray,
          'countSum': kangNeungCountSumArray,
        }

        guRiJisaObj={
          'sysdate': guRiSysdateArray,
          'jojik':guRijojik3Array,
          'product': guRiProductArray,
          'countSum': guRiCountSumArray,
        }

        wonJuJisaObj={
          'sysdate': wonJuSysdateArray,
          'jojik': wonJujojik3Array,
          'product': wonJuProductArray,
          'countSum': wonJuCountSumArray,
        }

        uiJeongBuJisaObj={
          'sysdate': uiJeongBuSysdateArray,
          'jojik': uiJeongBujojik3Array,
          'product': uiJeongBuProductArray,
          'countSum': uiJeongBuCountSumArray,
        }

        chunCheonJisaObj={
          'sysdate': chunCheonSysdateArray,
          'jojik': chunCheonjojik3Array,
          'product': chunCheonProductArray,
          'countSum': chunCheonCountSumArray,
        }
       
        bonbuNetIncreaseValueObj={
          '고양지사': goYangJisaObj,
          '광진지사': gwangJinJisaObj,
          '광화문지사':gwangWhaMoonJisaObj,
          '노원지사':noWonJisaObj,
          '서대문지사':seoDaeMoonJisaObj,

          '강릉지사':kangNeungJisaObj,
          '구리지사':guRiJisaObj,
          '원주지사':wonJuJisaObj,
          '의정부지사':uiJeongBuJisaObj,
          '춘천지사':chunCheonJisaObj,
        }
      });

     
      return bonbuNetIncreaseValueObj;
    },
  }  //methods
} //export default end
</script>
<style scoped>

</style>
