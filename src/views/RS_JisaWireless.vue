<template>
    <v-container>
        <v-card>
            <v-row>
                <v-col>
                    <p class="text-h5 text-center">[지사 무선 순신규 추이]</p>
                    <jisa-wireless-net-new-increase-line-chart></jisa-wireless-net-new-increase-line-chart>

                </v-col>
            </v-row>
             <v-row>
                <v-col>
                  <p class="text-h5 text-center">[지사 무선 순해지 추이]</p>
                  <jisa-wireless-hj-line-chart></jisa-wireless-hj-line-chart>
                  
                </v-col>
             </v-row>
             <v-row>

                <v-col> 
                  <p class="text-h5 text-center">[지사 무선 순증/감 추이]</p>
                  <jisa-wireless-net-increase-line-chart></jisa-wireless-net-increase-line-chart>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
import JisaWirelessNetNewIncreaseLineChart from '@/components/charts/JisaWirelessNetNewIncreaseLineChart'
import JisaWirelessNetIncreaseLineChart from '@/components/charts/JisaWirelessNetIncreaseLineChart'
import JisaWirelessHjLineChart from '@/components/charts/JisaWirelessHjLineChart'

export default {
  name:'RS_JisaTv',
  components:{
    JisaWirelessNetNewIncreaseLineChart,
    JisaWirelessNetIncreaseLineChart,
    JisaWirelessHjLineChart,
    //BonbuRadarChart,
  }
}
</script>

<style scoped>

</style>
