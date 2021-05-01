<template>
  <div class="small">
    <realtime-line-chart :chart-data="datacollection"></realtime-line-chart>
    <button @click="fillData()">Randomize</button>
  </div>
</template>

<script>
  import RealtimeLineChart from '../components/RealTimeLineChart'
  import axios from 'axios';

  const url='http://localhost:8000/rsai/';

  export default {
    components: {
      RealtimeLineChart
    },
    data () {
      return {
        datacollection: null,
        rawRsaiData:null,
      }
    },
    async created () {
      await axios.get(url)
        .then((res)=>{
          //console.log(res.data[0].jisa);
          this.rawRsaiData=res.data
        }).catch((err)=>{
          console.log("데이터를 가져 오지 못했습니다.",err);
        });

        this.fillData();
    },


    methods: {
      fillData () {
        //this.getLabels();
        const xxx=this.getJisaSalesValue();
        console.log(`xxx is ${xxx.의정부지사}`);

        this.datacollection = {
          labels:this.getLabels(),
          datasets: [
            {
              label: '의정부지사',     // 범례
              backgroundColor: '#f87979',
              data: xxx.의정부지사
            }, {
              label: '성북지사',
              backgroundColor: '#f24979',
              data: xxx.성북지사
            }
          ]
        }
      },
     
     getLabels () {      //그래프의 x 축 데이터 (일자)
        const arr=new Array();
        this.rawRsaiData.map((item)=>{
          arr.push(item.day);
          //console.log(item);
        })

        const setImsi=new Set(arr)
        const labelArray=[...setImsi]
        //console.log('xxx',labelArray);
        return labelArray;
      },
      getJisaSalesValue(){    //지사별 매출액(y축)

        const ujbSalesValueArray=new Array();
        const sbSalesValueArray=new Array();

        this.rawRsaiData.map((value)=>{

          value.jisa=='의정부지사'?ujbSalesValueArray.push(value.sales):null;
          value.jisa=='성북지사'?sbSalesValueArray.push(value.sales):null;
        })


        const jisaSaleValueObj={
          '의정부지사':ujbSalesValueArray,
          '성북지사':sbSalesValueArray,
        }
        return jisaSaleValueObj;
      },
    }
  }
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>
