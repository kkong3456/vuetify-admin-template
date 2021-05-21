<template>
    <v-container>
        <v-card>
            <v-row>
                <v-col>
                    <p class="text-h5 text-center">[본부별 순신규 추이]</p>
                    <bonbu-net-new-increase-line-chart></bonbu-net-new-increase-line-chart>

                </v-col>
            </v-row>
             <v-row>
                <v-col>
                  <p class="text-h5 text-center">[본부별 순해지 추이]</p>
                  <bonbu-net-hj-line-chart></bonbu-net-hj-line-chart>
                  
                </v-col>
             </v-row>
             <v-row>

                <v-col> 
                  <p class="text-h5 text-center">[본부별 순증/감 추이]</p>
                  <bonbu-net-increase-line-chart></bonbu-net-increase-line-chart>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
import BonbuNetNewIncreaseLineChart from '@/components/charts/BonbuNetNewIncreaseLineChart'
import BonbuNetIncreaseLineChart from '@/components/charts/BonbuNetIncreaseLineChart'
import BonbuNetHjLineChart from '@/components/charts/BonbuNetHjLineChart'

export default {
  name:'RS_Bonbu',
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
