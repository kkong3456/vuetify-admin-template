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
      <v-row>
        <v-col>
          <p class="text-h5 text-center">
            [지사 무선 순신규 추이]
          </p>
          <jisa-wireless-net-new-increase-line-chart 
            ref="changeBonbu1"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p class="text-h5 text-center">
            [지사 무선 순해지 추이]
          </p>
          <jisa-wireless-hj-line-chart 
            ref="changeBonbu2"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col> 
          <p class="text-h5 text-center">
            [지사 무선 순증/감 추이]
          </p>
          <jisa-wireless-net-increase-line-chart 
            ref="changeBonbu3"
          />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import JisaWirelessNetNewIncreaseLineChart from '@/components/charts/jisaproductchart/JisaWirelessNetNewIncreaseLineChart'
import JisaWirelessNetIncreaseLineChart from '@/components/charts/jisaproductchart/JisaWirelessNetIncreaseLineChart'
import JisaWirelessHjLineChart from '@/components/charts/jisaproductchart/JisaWirelessHjLineChart'

export default {
  name:'RSJisaTv',
  components:{
    JisaWirelessNetNewIncreaseLineChart,
    JisaWirelessNetIncreaseLineChart,
    JisaWirelessHjLineChart,
    //BonbuRadarChart,
  },

  data(){
    return{
      selectedBonbu:'북부고객본부'
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
