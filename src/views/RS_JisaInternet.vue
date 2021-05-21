<template>
    <v-container>
        <v-card>
            <v-row>
                <v-col>
                    <p class="text-h5 text-center">[지사 인터넷 순신규 추이]</p>
                    <jisa-internet-net-new-increase-line-chart></jisa-internet-net-new-increase-line-chart>

                </v-col>
            </v-row>
             <v-row>
                <v-col>
                  <p class="text-h5 text-center">[지사 인터넷 순해지 추이]</p>
                  <jisa-internet-hj-line-chart></jisa-internet-hj-line-chart>
                  
                </v-col>
             </v-row>
             <v-row>

                <v-col> 
                  <p class="text-h5 text-center">[지사 인터넷 순증/감 추이]</p>
                  <jisa-internet-net-increase-line-chart></jisa-internet-net-increase-line-chart>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
import JisaInternetNetNewIncreaseLineChart from '@/components/charts/JisaInternetNetNewIncreaseLineChart'
import JisaInternetNetIncreaseLineChart from '@/components/charts/JisaInternetNetIncreaseLineChart'
import JisaInternetHjLineChart from '@/components/charts/JisaInternetHjLineChart'

export default {
  name:'RS_JisaTv',
  components:{
    JisaInternetNetNewIncreaseLineChart,
    JisaInternetNetIncreaseLineChart,
    JisaInternetHjLineChart,
    //BonbuRadarChart,
  }
}
</script>

<style scoped>

</style>
