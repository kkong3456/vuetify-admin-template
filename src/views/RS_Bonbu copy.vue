<template>
  <v-container>
    <v-card>
      <v-row>
        <v-col>
          <p class="text-h5 text-center">
            [본부별 순신규 추이]
          </p>
          <bonbu-net-new-increase-line-chart />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p class="text-h5 text-center">
            [본부별 순해지 추이]
          </p>
          <bonbu-net-hj-line-chart />
        </v-col>
      </v-row>
      <v-row>
        <v-col> 
          <p class="text-h5 text-center">
            [본부별 순증/감 추이]
          </p>
          <bonbu-net-increase-line-chart />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import BonbuNetNewIncreaseLineChart from '@/components/charts/bonbuincreasechart/BonbuNetNewIncreaseLineChart'
import BonbuNetIncreaseLineChart from '@/components/charts/bonbuincreasechart/BonbuNetIncreaseLineChart'
import BonbuNetHjLineChart from '@/components/charts/bonbuincreasechart/BonbuNetHjLineChart'

export default {
  name:'RSBonbu',
  components:{
    BonbuNetNewIncreaseLineChart,
    BonbuNetIncreaseLineChart,
    BonbuNetHjLineChart,
    //BonbuRadarChart,
  }
}
</script>

<style scoped>

</style>
