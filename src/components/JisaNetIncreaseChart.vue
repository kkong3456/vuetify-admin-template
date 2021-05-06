<script>
import Vue from 'vue'
import { Line, mixins } from 'vue-chartjs'
import axios from 'axios';


// const jisaNetIncreaseUrl='http://172.21.26.252:8000/api/jisa-net-increase-list/';
const jisaNetIncreaseUrl='http://localhost:8000/api/jisa-net-increase-list/';

const { reactiveProp } = mixins

const options={      //chart options prop를 사용하지 않는 하위컴포넌트에서는 data에 변수값으로 처리
        responseive:true,
        maintainAspectRatio:false,  //차트 width,ehgith 크기조절
        legend:{
         // display:false,
        },
        plugins:{
          title:{
            display:true,
            text:'XXX',
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
            display:false,
            gridLines:{
              display:false,
              drawBorder:false,
            }
          }]
        }
      } //end options


export default {
  extends: Line,
  // mixins: [reactiveProp],
  // props: ['options'],

  components:{
    name:'JisaNetIncreaseChart'
  },

  data(){
    return {
      dataCollection:null,
      jisaNetIncreaseData:null,
      jisaNetIncreaseValueObj:null,
      options:options,
    }

  },

  async created () {
    await axios.get(jisaNetIncreaseUrl)
      .then((res)=>{
        this.jisaNetIncreaseData=res.data
        //console.log(this.jisaNetIncreaseData[0].date);
      }).catch((err)=>{
        console.log("데이터를 가져 오지 못했습니다.",err);
      });

      this.fillData();

      //console.log(`this.dataCollection is ${this.dataCollection}`);
      this.renderChart(this.dataCollection,this.options);
  },

  methods: {
    fillData () {
      const yyy=this.getJisaNetIncreaseValue();
      this.dataCollection = {
        labels:this.getJisaLabels(),
        datasets: [
          {
            label:'강릉지사',     // 범례
            borderColor: '#20B2AA',
            data: yyy['강릉지사'],
            fill:false,
            tension:.5,
            pointHoverBorderColor:'#ff0000',

          }, {
            label: '고양지사',
            borderColor: '#5F9EA0',
            data: yyy['고양지사'],
            fill:false,
            tension:.5,
            pointHoverBorderColor:'#ff0000',
          },
          {
            label: '광진지사',
            borderColor: '#7FFFD4',
            data: yyy['광진지사'],
            fill:false,
            tension:.5,
            pointHoverBorderColor:'#ff0000',
          },
          {
            label: '광화문지사',
            borderColor: '#B0E0E6',
            data: yyy['광화문지사'],
            fill:false,
            tension:.5,
            pointHoverBorderColor:'#ff0000',

          },
          {
            label: '구리지사',
            borderColor: '#AFEEEE',
            data: yyy['구리지사'],
            fill:false,
            tension:.5,
            pointHoverBorderColor:'#ff0000',
          },
          {
            label: '노원지사',
            borderColor: '#ADD8E6',
            data: yyy['노원지사'],
            fill:false,
            tension:.5,
            pointHoverBorderColor:'#ff0000',
          },
          {
            label: '서대문지사',
            borderColor: '#B0C4DE',
            data: yyy['서대문지사'],
            fill:false,
            tension:.5,
            pointHoverBorderColor:'#ff0000',
          },
          {
            label: '원주지사',
            borderColor: '#B0C4DE',
            data: yyy['원주지사'],
            fill:false,
            tension:.5,
            pointHoverBorderColor:'#ff0000',
          },{
            label: '의정부지사',
            borderColor: '#87CEEB',
            data: yyy['의정부지사'],
            fill:false,
            tension:.5,
            pointHoverBorderColor:'#ff0000',
          },
          {
            label: '춘천지사',
            borderColor: '#87CEFA',
            data: yyy['춘천지사'],
            fill:false,
            tension:.5,
            pointHoverBorderColor:'#ff0000',
          }
        ]
      };  //dataCollection
    },  //fillData()


    getJisaLabels () {      //그래프의 x 축 데이터 (일자)
      const labelArray=new Array();
      this.jisaNetIncreaseData.map((item)=>{
        labelArray.push(item.date.substring(5));
      })
      return labelArray;
    },

    getJisaNetIncreaseValue(){    //본부별 순익(y축)
      const GangneungJisaArray=Array();
      const GoyangJisaArray=Array();
      const GwanginJisaArray=Array();
      const GwanghwamunJisaArray=Array();
      const GuriJisaArray=Array();
      const NowonJisaArray=Array();
      const SeodaemunJisaArray=Array();
      const WonjuJisaArray=Array();
      const UijeongbuJisaArray=Array();
      const ChuncheonJisaArray=Array();

      this.jisaNetIncreaseData.map((item)=>{
        GangneungJisaArray.push(item.Gangneung_jisa);
        GoyangJisaArray.push(item.Goyang_jisa);
        GwanginJisaArray.push(item.Gwangin_jisa);
        GwanghwamunJisaArray.push(item.Gwanghwamun_jisa);
        GuriJisaArray.push(item.Guri_jisa);
        NowonJisaArray.push(item.Nowon_jisa);
        SeodaemunJisaArray.push(item.Seodaemun_jisa);
        WonjuJisaArray.push(item.Wonju_jisa);
        UijeongbuJisaArray.push(item.Uijeongbu_jisa);
        ChuncheonJisaArray.push(item.Chuncheon_jisa)
      });

      const jisaNetIncreaseValueObj={
        '강릉지사':GangneungJisaArray,
        '고양지사':GoyangJisaArray,
        '광진지사':GwanginJisaArray,
        '광화문지사':GwanghwamunJisaArray,
        '구리지사':GuriJisaArray,
        '노원지사':NowonJisaArray,
        '서대문지사':SeodaemunJisaArray,
        '원주지사':WonjuJisaArray,
        '의정부지사':UijeongbuJisaArray,
        '춘천지사':ChuncheonJisaArray,
      }
      //console.log(bonbuNetIncreaseValueObj);
      return jisaNetIncreaseValueObj;
    },
  }  //methods
} //export default end
</script>
