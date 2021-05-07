<template>
  <div id="app">
    <BarChart/>
    <RadarChart/>
    <PieChart/>
    <AreaChart/>
    <LineChart/>
  </div>
</template>

<script>
import BarChart from '@/components/charts/BarChart'
import RadarChart from '@/components/charts/RadarChart'
import PieChart from '@/components/charts/PieChart'
import AreaChart from '@/components/charts/AreaChart'
import LineChart from '@/components/charts/LineChart'

export default {
  name:'',
  components:{
    BarChart,
    RadarChart,
    PieChart,
    AreaChart,
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
