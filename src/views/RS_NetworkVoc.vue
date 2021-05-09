<template>
  <div id="app">
    <BonbuBarChart/>
    <BonbuRadarChart/>
    <BonbuPieChart/>
    <BonbuAreaChart/>
    <BonbuLineChart/>
    <Calendar/>
  </div>
</template>

<script>
import BonbuBarChart from '@/components/charts/BonbuBarChart'
import BonbuRadarChart from '@/components/charts/BonbuRadarChart'
import BonbuPieChart from '@/components/charts/BonbuPieChart'
import BonbuAreaChart from '@/components/charts/BonbuAreaChart'
import BonbuLineChart from '@/components/charts/BonbuLineChart'

import Calendar from '@/components/etc/Calendar'

export default {
  name:'',
  components:{
    BonbuBarChart,
    BonbuRadarChart,
    BonbuPieChart,
    BonbuAreaChart,
    BonbuLineChart,

    Calendar,
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
