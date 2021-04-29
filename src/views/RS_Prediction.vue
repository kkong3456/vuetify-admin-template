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
    async mounted () {
      await axios.get(url)
        .then((res)=>{
          console.log(res.data[0].jisa);
          this.rawRsaiData=res.data
        }).catch((err)=>{
          console.log("데이터를 가져 오지 못했습니다.",err);
        })
    },

    methods: {
      fillData () {

        this.datacollection = {
          //labels: [this.getRandomInt(), this.getRandomInt()],  x-축
          labels: this.getLabels(),
          datasets: [
            {
              label: '의정부지사',     // 범례
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }, {
              label: '강북지사',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
      },
      getLabels () {
        const arr=new Array();
        this.rawRsaiData.map((item,idx)=>{
          arr.push(item.day);
        })

        const setImsi=new Set(arr)
        const labelArr=[...setImsi]
        console.log('xxx',labelArr);
        return labelArr;
      },
      getRandomInt(){},
    }
  }
</script>

<style>
  .small {
    max-width: 600px;
    margin:  150px auto;
  }
</style>
