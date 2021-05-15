<script>
import Vue from 'vue'
import { Line, mixins } from 'vue-chartjs'
import axios from 'axios';

const bonbuNetIncreaseUrl='http://172.21.220.97/api/dash.json?page=1';
//const bonbuNetIncreaseUrl='http://localhost:8000/api/rsai-jojik-list/';

const { reactiveProp } = mixins

const options={      //chart options prop를 사용하지 않는 하위컴포넌트에서는 data에 변수값으로 처리
        responsive:true,
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
              //min:0,
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
  extends: Line,
  //mixins: [reactiveProp],
  //props: ['options'],


  components:{
    name:'BonbuNetIncreaseChart'
  },

  data(){
    return {
      dataCollection:null,
      bonbuNetIncreaseData:null,
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
      console.log('yyy',yyy);
    
      
      this.dataCollection = {
        labels:yyy['북부'].sysdate.map((d)=>d.substring(5)),

        datasets: [
          {
            label:'북부본부',     // 범례
            borderColor: '#20B2AA',
            data: yyy['북부'].this_hj_count,
            fill:false,
            tension:.5,
            pointHoverBorderColor:'#ff0000',
          }, {
            label:'동부본부',
            borderColor: '#5F9EA0',
            data: yyy['동부'].this_hj_count,
            fill:false,
            tension:.5,
            pointHoverBorderColor:' b',
          },
          {
            label: '강남본부',
            borderColor: '#7FFFD4',
            data: yyy['강남'].this_hj_count,
            fill:false,
            tension:.5,
            pointHoverBorderColor:'#ff0000',
          },
        
        ]
      };  //dataCollection
    },  //fillData()


    getBonbuLabels () {      //그래프의 x 축 데이터 (일자)
      const imsiArray=new Array();
      this.bonbuNetIncreaseData.map((item)=>{
        imsiArray.push(item.sysdate.substring(0));
      })
      const set=new Set(imsiArray);
      const labelArray=[...set];
      //console.log(labelArray);
      return labelArray;
    },

    getBonbuNetIncreaseValue(){    //본부(y축)
      let bonbuTotalObj={};
      let bugbuBonbuObj={};
      let dongbuBonbuObj={};
      let gangnamBonbuObj={};
     
      //const bugbuIdArray=Array();
      const bugbuSysdateArray=Array();
      const bugbuProductArray=Array();
      const bugbuJojikArray=Array();
      const bugbuThisHjCountArray=Array();
      const bugbuThisHjRatioArray=Array();
      //const bugbuThatHjCountArray=Array();
      //const bugbuThatHjRatioArray=Array();
      const bugbuUpRatioArray=Array();
      const bugbuRankArray=Array();

      const dongbuSysdateArray=Array();
      const dongbuProductArray=Array();
      const dongbuJojikArray=Array();
      const dongbuThisHjCountArray=Array();
      const dongbuThisHjRatioArray=Array();
      const dongbuUpRatioArray=Array();
      const dongbuRankArray=Array();

      const gangnamSysdateArray=Array();
      const gangnamProductArray=Array();
      const gangnamJojikArray=Array();
      const gangnamThisHjCountArray=Array();
      const gangnamThisHjRatioArray=Array();
      const gangnamUpRatioArray=Array();
      const gangnamRankArray=Array();


     
      this.bonbuNetIncreaseData.map((item)=>{
        //console.log(`item is ${bonbuArray[bonbu]}`);
  
        if(item.jojik==='북부'){
          bugbuSysdateArray.push(item.sysdate);
          bugbuProductArray.push(item.product);
          bugbuJojikArray.push(item.jojik);
          bugbuThisHjCountArray.push(item.this_hj_count);
          bugbuThisHjRatioArray.push(item.this_hj_ratio);
          bugbuUpRatioArray.push(item.up_ratio);
          bugbuRankArray.push(item.rank);
        } 
        if(item.jojik==='동부'){
          dongbuSysdateArray.push(item.sysdate);
          dongbuProductArray.push(item.product);
          dongbuJojikArray.push(item.jojik);
          dongbuThisHjCountArray.push(item.this_hj_count);
          dongbuThisHjRatioArray.push(item.this_hj_ratio);
          dongbuUpRatioArray.push(item.up_ratio);
          dongbuRankArray.push(item.rank);
        }      
        if(item.jojik==='강남'){
          gangnamSysdateArray.push(item.sysdate);
          gangnamProductArray.push(item.product);
          gangnamJojikArray.push(item.jojik);
          gangnamThisHjCountArray.push(item.this_hj_count);
          gangnamThisHjRatioArray.push(item.this_hj_ratio);
          gangnamUpRatioArray.push(item.up_ratio);
          gangnamRankArray.push(item.rank);
        }          

      });

        bugbuBonbuObj={
          'sysdate':bugbuSysdateArray,
          'product':bugbuProductArray,
          'jojik':bugbuJojikArray,
          'this_hj_count':bugbuThisHjCountArray,
          'this_hj_ratio':bugbuThisHjRatioArray,           
          'up_ratio':bugbuUpRatioArray,
          'rank':bugbuRankArray,
        }

        dongbuBonbuObj={
          'sysdate':dongbuSysdateArray,
          'product':dongbuProductArray,
          'jojik':dongbuJojikArray,
          'this_hj_count':dongbuThisHjCountArray,
          'this_hj_ratio':dongbuThisHjRatioArray,           
          'up_ratio':dongbuUpRatioArray,
          'rank':dongbuRankArray,
        }

        gangnamBonbuObj={
          'sysdate':gangnamSysdateArray,
          'product':gangnamProductArray,
          'jojik':gangnamJojikArray,
          'this_hj_count':gangnamThisHjCountArray,
          'this_hj_ratio':gangnamThisHjRatioArray,           
          'up_ratio':gangnamUpRatioArray,
          'rank':gangnamRankArray,
        }

        bonbuTotalObj={
          '북부':bugbuBonbuObj,
          '동부':dongbuBonbuObj,
          '강남':gangnamBonbuObj,
        }
      return bonbuTotalObj;
    }, //end getNetBonbuIncreaseValue
  }  //methods
} //export default end
</script>
<style scoped>

</style>
