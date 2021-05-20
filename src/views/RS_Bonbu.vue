<template>
    <v-container>
        <v-card>
            <v-row>
                <v-col
                  col=12
                  lg=6
                >
                    <p class="text-h5 text-center">[순신규 추이]</p>
                    <bonbu-net-increase-line-chart></bonbu-net-increase-line-chart>

                </v-col>
                <v-col
                  col=12
                  lg=6
                >
                  <p class="text-h5 text-center">[순해지 추이]</p>
                  
                </v-col>

                <v-col
                  col=12
                  lg=6
                > 
                  <p class="text-h5 text-center">[순증 추이]</p>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
import BonbuNetIncreaseLineChart from '@/components/charts/BonbuNetIncreaseLineChart'

export default {
  name:'RS_Bonbu',
  components:{
    BonbuNetIncreaseLineChart,
    //BonbuRadarChart,
  }
}
</script>

<style scoped>

</style>
