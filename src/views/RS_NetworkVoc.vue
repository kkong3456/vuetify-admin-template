<template>
  <div id="app">
    <BonbuBarChart/>
    <BonbuRadarChart/>
    <PieChart/>
    <BonbuAreaChart/>
    <LineChart/>
  </div>
</template>

<script>
import BonbuBarChart from '@/components/charts/BonbuBarChart'
import BonbuRadarChart from '@/components/charts/BonbuRadarChart'
import PieChart from '@/components/charts/PieChart'
import BonbuAreaChart from '@/components/charts/BonbuAreaChart'
import LineChart from '@/components/charts/LineChart'

export default {
  name:'',
  components:{
    BonbuBarChart,
    BonbuRadarChart,
    PieChart,
    BonbuAreaChart,
    LineChart,
  },

  data(){
    return{
      chartData:{
        Books:24,
        Magazine:30,
        Newspapers:10
      }
    }
  }



}
</script>
