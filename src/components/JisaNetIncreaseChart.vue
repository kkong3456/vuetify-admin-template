<script>
import Vue from 'vue'
import { Line, mixins } from 'vue-chartjs'
import axios from 'axios';

const bonbuNetIncreaseUrl='http://localhost:8000/bonbu-net-increase-list/';
const jisaNetIncreaseUrl='http://localhost:8000/jisa-net-increase-list/';

const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],

  components:{
    name:'JisaNetIncreaseChart'
  },

  data(){
    return {
      dataCollection:null,
      jisaNetIncreaseData:null,
      jisaNetIncreaseValueObj:null,
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

  mounted () {
    //console.log(`this.dataCollection is ${this.dataCollection}`);
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    //this.renderChart(this.chartData, this.options)
    //this.renderChart(this.bonbuNetIncreaseValueObj,this.options);
  },

  methods: {
    fillData () {
      const yyy=this.getJisaNetIncreaseValue();
      this.dataCollection = {
        labels:this.getJisaLabels(),
        datasets: [
          {
            label:'강릉지사',     // 범례
            backgroundColor: '#f87979',
            data: yyy['강릉지사']
          }, {
            label: '고양지사',
            backgroundColor: '#f24979',
            data: yyy['고양지사']
          },
          {
            label: '광진지사',
            backgroundColor: '#f24979',
            data: yyy['광지진사']
          },
          {
            label: '광화문지사',
            backgroundColor: '#f24979',
            data: yyy['광화문지사']
          },
          {
            label: '구리지사',
            backgroundColor: '#f24979',
            data: yyy['구리지사']
          },
          {
            label: '노원지사',
            backgroundColor: '#f24979',
            data: yyy['노원지사']
          },
          {
            label: '서대문지사',
            backgroundColor: '#f24979',
            data: yyy['서대문지사']
          },
          {
            label: '원주지사',
            backgroundColor: '#f24979',
            data: yyy['원주지사']
          },{
            label: '의정부지사',
            backgroundColor: '#f24979',
            data: yyy['의정부지사']
          },
          {
            label: '춘천지사',
            backgroundColor: '#f24979',
            data: yyy['춘천지사']
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
