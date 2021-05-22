<template>
  <v-container>
    <v-card>
      <v-row
        class="mb-5"
      >
        <v-col>
          <template>
            <v-select
              v-model="selectedBonbu"
              :items="['동부고객본부', '북부고객본부', '서부고객본부', '강남고객본부']"
              label="광역본부"
            >
              <template v-slot:item="{ item, attrs, on }">
                <v-list-item
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-list-item-title
                    :id="attrs['aria-labelledby']"
                    v-text="item"
                  ></v-list-item-title>
                </v-list-item>
              </template>
            </v-select>
          </template>
        </v-col>
      </v-row>

      <v-row
        class="mt-5"
      >
        <v-col>
          <p class="text-h5 text-center">
            [지사  TV 순신규 추이]
          </p>
          <jisa-tv-net-new-increase-line-chart v-bind:selectedBonbu="selectedBonbu"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p class="text-h5 text-center">
            [지사 TV 순해지 추이]
          </p>
          <jisa-tv-hj-line-chart />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p class="text-h5 text-center">
            [지사 TV 순증/감 추이]
          </p>
          <jisa-tv-net-increase-line-chart />
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
  name:'RSJisaTv',
  components:{
    JisaTvNetNewIncreaseLineChart,
    JisaTvNetIncreaseLineChart,
    JisaTvHjLineChart,
    //BonbuRadarChart,
  },

  data(){
    return{
      selectedBonbu:'',
    }
  }

}
</script>

<style scoped>

</style>
