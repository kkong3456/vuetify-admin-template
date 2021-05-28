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
              :items="['동부고객본부', '북부고객본부', '서부고객본부', '강남고객본부','충남/충북고객본부','전남/전북고객본부','부산/경남고객본부','대구/경북고객본부']"
              label="광역본부"
              @change="changeUrl(selectedBonbu)"
            >
              <template v-slot:item="{ item, attrs, on }">
                <v-list-item
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-list-item-title
                    :id="attrs['aria-labelledby']"
                    v-text="item"
                  />
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
          <jisa-tv-net-new-increase-line-chart 
            ref="changeBonbu1"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p class="text-h5 text-center">
            [지사 TV 순해지 추이]
          </p>
          <jisa-tv-hj-line-chart 
            ref="changeBonbu2"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p class="text-h5 text-center">
            [지사 TV 순증/감 추이]
          </p>
          <jisa-tv-net-increase-line-chart 
            ref="changeBonbu3"
          />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import JisaTvNetNewIncreaseLineChart from '@/components/charts/jisaproductchart/JisaTvNetNewIncreaseLineChart'
import JisaTvNetIncreaseLineChart from '@/components/charts/jisaproductchart/JisaTvNetIncreaseLineChart'
import JisaTvHjLineChart from '@/components/charts/jisaproductchart/JisaTvHjLineChart'

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
      selectedBonbu:'북부고객본부',
    }
  },
  methods:{
    changeUrl(selectedBonbu){
      console.log(selectedBonbu);
      this.$refs.changeBonbu1.changeBonbu(selectedBonbu);
      this.$refs.changeBonbu2.changeBonbu(selectedBonbu);
      this.$refs.changeBonbu3.changeBonbu(selectedBonbu);
    }
  }

}
</script>

<style scoped>

</style>
