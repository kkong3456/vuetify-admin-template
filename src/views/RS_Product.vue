<template>
  <v-container>
    <v-card>
      <v-row>
        <v-col>
          <p class="text-h5 text-center">
            [상품별 순신규 추이]
          </p>
          <product-net-new-increase-line-chart />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p class="text-h5 text-center">
            [상품별 순해지 추이]
          </p>
          <product-hj-line-chart />
        </v-col>
      </v-row>
      <v-row>
        <v-col> 
          <p class="text-h5 text-center">
            [상품별 순증/감 추이]
          </p>
          <product-net-increase-line-chart />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import ProductNetNewIncreaseLineChart from '@/components/charts/ProductNetNewIncreaseLineChart'
import ProductNetIncreaseLineChart from '@/components/charts/ProductNetIncreaseLineChart'
import ProductHjLineChart from '@/components/charts/ProductHjLineChart'

export default {
  name:'RSBonbu',
  components:{
    ProductNetNewIncreaseLineChart,
    ProductNetIncreaseLineChart,
    ProductHjLineChart,
    //BonbuRadarChart,
  }
}
</script>

<style scoped>

</style>
