<template>
    <v-container>
        <v-card>
            <v-row>
                <v-col
                  col=12
                  lg=6
                >
                    <p class="text-h5 text-center">3.1 본부별 전주 비교</p>
                    <bonbu-bar-chart></bonbu-bar-chart>

                </v-col>
                <v-col
                  col=12
                  lg=6
                >
                  <p class="text-h5 text-center">3.1 본부별 전주 비교</p>
                  <bonbu-radar-chart></bonbu-radar-chart>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
import BonbuBarChart from '@/components/charts/BonbuBarChart'
import BonbuRadarChart from '@/components/charts/BonbuRadarChart'
export default {
  name:'RS_Bonbu',
  components:{
    BonbuBarChart,
    BonbuRadarChart,
  }
}
</script>

<style scoped>

</style>
