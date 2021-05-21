<script>
import Vue from 'vue'
import { Line, mixins } from 'vue-chartjs'
import axios from 'axios';

const bonbuNetIncreaseUrl='http://172.21.220.97/api/net/bonbu.json/?kind=start&page=1'; //kind=start순증
// const allHjUrl='http://172.21.220.97/api/dash.json?page=1';
// const allHjUrl2='http://172.21.220.97/api/dash.json?page=';

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
  extends: Line,
  //mixins: [reactiveProp],
  //props: ['options'],


  components:{
    name:'BonbuNetIncreaseLineChart'
  },

  data(){
    return {
      dataCollection:null,
      bonbuNetIncreaseData:null,
      bonbuNetIncreaseValueObj:null,
      options:options,
    }

  },

  async created () {
    await axios.get(bonbuNetIncreaseUrl)
      .then((res)=>{
        this.bonbuNetIncreaseData=res.data.results
        //console.log(this.bonbuNetIncreaseData);
      }).catch((err)=>{
        console.log("데이터를 가져 오지 못했습니다.",err);
      });


      this.fillData();

      //console.log(`this.dataCollection is ${this.dataCollection}`);
      this.renderChart(this.dataCollection,this.options);
  },

  methods: {
    fillData () {
      const yyy=this.getBonbuNetIncreaseValue();
      console.log(`yyyy['강남'] is ${yyy.강남고객본부.sysdate}`)
      this.dataCollection = {
        labels:yyy.date,
        datasets: [
          {
            label:yyy.jojik,     // 범례
            borderColor: '#20B2AA',
            backgroundColor:"transparent",
            data: yyy['북부본부'],
            fill:false,
            // tension:.5,
            pointHoverBorderColor:'#ff0000',
            // hoverBorderWith:20,

          }, {
            label:'동부본부',
            borderColor: '#5F9EA0',
            backgroundColor:"transparent",
            data: yyy['동부본부'],
            fill:false,
            // tension:.5,
            pointHoverBorderColor:' b',
          },
          {
            label: '강남본부',
            borderColor: '#7FFFD4',
            backgroundColor:"transparent",
            data: yyy['강남본부'],
            fill:false,
            // tension:.5,
            pointHoverBorderColor:'#ff0000',
          },
          {
            label: '대구/경북본부',
            borderColor: '#B0E0E6',
            backgroundColor:"transparent",
            data: yyy['대구/경북본부'],
            fill:false,
            // tension:.5,
            pointHoverBorderColor:'#ff0000',
          },
          {
            label: '부산/경남본부',
            borderColor: '#AFEEEE',
            backgroundColor:"transparent",
            data: yyy['부산/경남본부'],
            fill:false,
            // tension:.5,
            pointHoverBorderColor:'#ff0000',
          },
          {
            label: '서부본부',
            borderColor: '#ADD8E6',
            backgroundColor:"transparent",
            data: yyy['서부본부'],
            fill:false,
            // tension:.5,
            pointHoverBorderColor:'#ff0000',
          },
          {
            label: '전남/전북본부',
            borderColor: '#B0C4DE',
            backgroundColor:"transparent",
            data: yyy['전남/전북본부'],
            fill:false,
            // tension:.5,
            pointHoverBorderColor:'#ff0000',
          },
          {
            label: '제주본부',
            borderColor: '#87CEEB',
            backgroundColor:"transparent",
            data: yyy['제주본부'],
            fill:false,
            // tension:.5,
            pointHoverBorderColor:'#ff0000',
          },{
            label: '충남/충북본부',
            borderColor: '#87CEFA',
            backgroundColor:"transparent",
            data: yyy['충남/충북본부'],
            fill:false,
            // tension:.5,
            pointHoverBorderColor:'#ff0000',
          },
        ]
      };  //dataCollection
    },  //fillData()


    getBonbuNetIncreaseValue(){    //본부별 순익(y축)
      let bonbuNetIncreaseValueObj={}
      let customerExperenceBonbuObj={}
      let jejuDanObj={};
      let youngUpBonbuObj={}
      let sudokwanYoungUpDanObj={}
      let gangnamBonbuObj={}
      let daeguBonbuObj={}
      let chungNamBonbuObj={}
      let seobuBonbuObj={}
      let jeonamBonbuObj={}
      let bugbuBonbuObj={}
      let dongbuBonbuObj={}
      let busanBonbuObj={}

      const customerExperenceBonbuSysdateArray=new Array();
      const customerExperenceBonbuJojikArray=new Array();
      const customerExperenceBonbuCountSumArray=new Array();

      const jejuDanSysdateArray=new Array();
      const jejuDanJojikArray=new Array();
      const jejuDanCountSumArray=new Array();

      const youngUpBonbuSysdateArray=new Array();
      const youngUpBonbuJojikArray=new Array();
      const youngUpBonbuCountSumArray=new Array();

      const sudokwanYoungUpDanSysdateArray=new Array();
      const sudokwanYoungUpDanJojikArray=new Array();
      const sudokwanYoungUpDanCountSumArray=new Array();

      const gangnamBonbuSysdateArray=new Array();
      const gangnamBonbuJojikArray=new Array();
      const gangnamBonbuCountSumArray=new Array;

      const daeguBonbuSysdateArray=new Array();
      const daeguBonbuJojikArray=new Array();
      const daeguBonbuCountSumArray=new Array();

      const chungNamBonbuSysdateArray=new Array();
      const chungNamBonbuJojikArray=new Array();
      const chungNamBonbuCountSumArray=new Array();

      const seobuBonbuSysdateArray=new Array();
      const seobuBonbuJojikArray=new Array();
      const seobuBonbuCountSumArray=new Array();

      const jeonamBonbuSysdateArray=new Array();
      const jeonamBonbuJojikArray=new Array();
      const jeonamBonbuCountSumArray=new Array();

      const bugbuBonbuSysdateArray=new Array();
      const bugbuBonbuJojikArray=new Array();
      const bugbuBonbuCountSumArray=new Array();

      const dongbuBonbuSysdateArray=new Array();
      const dongbuBonbuJojikArray=new Array();
      const dongbuBonbuCountSumArray=new Array();

      const busanBonbuSysdateArray=new Array();
      const busanBonbuJojikArray=new Array();
      const busanBonbuCountSumArray=new Array();

      this.bonbuNetIncreaseData.map((item)=>{
        //console.log(`item is ${item.jojik2_name}`);
        if(item.jojik2_name==='고객경험혁신본부'){
          customerExperenceBonbuSysdateArray.push(item.sysdate);
          customerExperenceBonbuJojikArray.push(item.jojik2_name);
          customerExperenceBonbuCountSumArray.push(item.count_sum);
        }
        if(item.jojik2_name==='제주단'){
          jejuDanSysdateArray.push(item.sysdate);
          jejuDanJojikArray.push(item.jojik2_name);
          jejuDanCountSumArray.push(item.count_sum);
        }
        if(item.jojik2_name==='영업본부'){
          youngUpBonbuSysdateArray.push(item.sysdate);
          youngUpBonbuJojikArray.push(item.jojik2_name);
          youngUpBonbuCountSumArray.push(item.count_sum);
        }

        if(item.jojik2_name==='수도권도매영업단'){
          sudokwanYoungUpDanSysdateArray.push(item.sysdate);
          sudokwanYoungUpDanJojikArray.push(item.jojik2_name);
          sudokwanYoungUpDanCountSumArray.push(item.count_sum);
        }

        if(item.jojik2_name==='강남고객본부'){
          gangnamBonbuSysdateArray.push(item.sysdate);
          gangnamBonbuJojikArray.push(item.jojik2_name);
          gangnamBonbuCountSumArray.push(item.count_sum);
        }

        if(item.jojik2_name==='대구/경북고객본부'){
          daeguBonbuSysdateArray.push(item.sysdate);
          daeguBonbuJojikArray.push(item.jojik2_name);
          daeguBonbuCountSumArray.push(item.count_sum);
        }

        if(item.jojik2_name==='충남/충북고객본부'){
          chungNamBonbuSysdateArray.push(item.sysdate);
          chungNamBonbuJojikArray.push(item.jojik2_name);
          chungNamBonbuCountSumArray.push(item.count_sum);
        }

        if(item.jojik2_name==='서부고객보본부'){
          seobuBonbuSysdateArray.push(item.sysdate);
          seobuBonbuJojikArray.push(item.jojik2_name);
          seobuBonbuCountSumArray.push(item.count_sum);
        }

        if(item.jojik2_name==='전남/전북고객본부'){
          jeonamBonbuSysdateArray.push(item.sysdate);
          jeonamBonbuJojikArray.push(item.jojik2_name);
          jeonamBonbuCountSumArray.push(item.count_sum);
        }

        if(item.jojik2_name==='북부고객본부'){
          bugbuBonbuSysdateArray.push(item.sysdate);
          bugbuBonbuJojikArray.push(item.jojik2_name);
          bugbuBonbuCountSumArray.push(item.count_sum);
        }

        if(item.jojik2_name==='동부고객본부'){
          dongbuBonbuSysdateArray.push(item.sysdate);
          dongbuBonbuJojikArray.push(item.jojik2_name);
          dongbuBonbuCountSumArray.push(item.count_sum);
        }

        if(item.jojik2_name==='부산/경남고객본부'){
          busanBonbuSysdateArray.push(item.sysdate);
          busanBonbuJojikArray.push(item.jojik2_name);
          busanBonbuCountSumArray.push(item.count_sum);
        }

     

        customerExperenceBonbuObj={
          'sysdate':customerExperenceBonbuSysdateArray,
          'jojik':customerExperenceBonbuJojikArray,
          'countSum':customerExperenceBonbuCountSumArray,
        }

        jejuDanObj={
          'sysdate':jejuDanSysdateArray,
          'jojik':jejuDanJojikArray,
          'countSum':jejuDanCountSumArray,
        }

        youngUpBonbuObj={
          'sysdate':youngUpBonbuSysdateArray,
          'jojik':youngUpBonbuJojikArray,
          'countSum':youngUpBonbuCountSumArray,
        }

        sudokwanYoungUpDanObj={
          'sysdate':seobuBonbuSysdateArray,
          'jojik':seobuBonbuJojikArray,
          'countSum':seobuBonbuCountSumArray,
        }

        gangnamBonbuObj={
          'sysdate':gangnamBonbuSysdateArray,
          'jojik':gangnamBonbuJojikArray,
          'countSum':gangnamBonbuCountSumArray,
        }

        daeguBonbuObj={
          'sysdate':daeguBonbuSysdateArray,
          'jojik':daeguBonbuJojikArray,
          'countSum':daeguBonbuCountSumArray,
        }

        chungNamBonbuObj={
          'sysdate':chungNamBonbuSysdateArray,
          'jojik':chungNamBonbuJojikArray,
          'countSum':chungNamBonbuCountSumArray,
        }

        seobuBonbuObj={
          'sysdate':seobuBonbuSysdateArray,
          'jojik':seobuBonbuJojikArray,
          'countSum':seobuBonbuCountSumArray,
        }

        jeonamBonbuObj={
          'sysdate':jeonamBonbuSysdateArray,
          'jojik':jeonamBonbuJojikArray,
          'countSum':jeonamBonbuCountSumArray,
        }

        bugbuBonbuObj={
          'sysdate':bugbuBonbuSysdateArray,
          'jojik':bugbuBonbuJojikArray,
          'countSum':bugbuBonbuCountSumArray,
        }

        dongbuBonbuObj={
          'sysdate':dongbuBonbuSysdateArray,
          'jojik':dongbuBonbuJojikArray,
          'countSum':dongbuBonbuCountSumArray,
        }

        busanBonbuObj={
          'sysdate':busanBonbuSysdateArray,
          'jojik':busanBonbuJojikArray,
          'countSum':busanBonbuCountSumArray
        }

        bonbuNetIncreaseValueObj={
          '고객경험혁신본부':customerExperenceBonbuObj,
          '제주단':jejuDanObj,
          '영업본부':youngUpBonbuObj,
          '수도권도매영업단':sudokwanYoungUpDanObj,
          '강남고객본부':gangnamBonbuObj,
          '대구/경북고객본부':daeguBonbuObj,
          '충남/충북고객본부':chungNamBonbuObj,
          '서부고객본부':seobuBonbuObj,
          '전남/전북고객본부':jeonamBonbuObj,
          '북부고객본부':bugbuBonbuObj,
          '동부고객본부':dongbuBonbuObj,
          '부산/경남고객본부':busanBonbuObj,
        }

       

      });

     
      return bonbuNetIncreaseValueObj;
    },
  }  //methods
} //export default end
</script>
<style scoped>

</style>
