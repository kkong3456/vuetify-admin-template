<template>
    <v-container>
        <v-card>
            <v-row>
                <v-col>
                    <p class="text-h5 text-center">[지사  TV 순신규 추이]</p>
                    <jisa-tv-net-new-increase-line-chart></jisa-tv-net-new-increase-line-chart>

                </v-col>
            </v-row>
             <v-row>
                <v-col>
                  <p class="text-h5 text-center">[지사 TV 순해지 추이]</p>
                  <jisa-tv-hj-line-chart></jisa-tv-hj-line-chart>
                  
                </v-col>
             </v-row>
             <v-row>

                <v-col> 
                  <p class="text-h5 text-center">[지사 TV 순증/감 추이]</p>
                  <jisa-tv-net-increase-line-chart></jisa-tv-net-increase-line-chart>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
import JisaTvNetNewIncreaseLineChart from '@/components/charts/JisaTvNetNewIncreaseLineChart'
import JisaTvNetIncreaseLineChart from '@/components/charts/JisaTvNetIncreaseLineChart'
import JisaTvHjLineChart from '@/components/charts/JisaTvHjLineChart'

export default {
  name:'RS_JisaTv',
  components:{
    JisaTvNetNewIncreaseLineChart,
    JisaTvNetIncreaseLineChart,
    JisaTvHjLineChart,
    //BonbuRadarChart,
  }
}
</script>

<style scoped>

</style>
