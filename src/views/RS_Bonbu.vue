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
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
import BonbuBarChart from '@/components/charts/BonbuBarChart'
export default {
  name:'RS_Bonbu',
  components:{
    BonbuBarChart,
  }
}
</script>

<style scoped>

</style>
