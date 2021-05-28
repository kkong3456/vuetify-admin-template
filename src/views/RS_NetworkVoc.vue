<template>
  <v-container fluid>
    <v-card>
      <v-row
        class="mb-5"
      >
        <v-col>
          <template>
            <v-select
              v-model="selectedBonbu"
              :items="['동부고객본부', '북부고객본부']"
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
            [ VOC 해지관련 - 인터넷/TV ]
          </p>
          <jisa-rit-voc-chart 
            ref="changeBonbu1"
          />
        </v-col>
        <v-col>
          <p class="text-h5 text-center">
            [ VOC 해지관련 - 인터넷/TV 데이터]
          </p>
          <jisa-rit-voc-table 
            ref="changeBonbu2"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p class="text-h5 text-center">
            [ VOC 해지관련 - 무선]
          </p>
          <jisa-rm-voc-chart 
            ref="changeBonbu3"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p class="text-h5 text-center">
            [지사 TV 순증/감 추이]
          </p>
          <!-- <jisa-tv-net-increase-line-chart 
            ref="changeBonbu3"
          /> -->
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import jisaRitVocChart from '@/components/charts/vocchart/jisaRitVocChart'
import jisaRmVocChart from '@/components/charts/vocchart/jisaRmVocChart'
import jisaRitVocTable from '@/components/tables/voctable/jisaRitVocTable'

export default {
  name:'RSNetworkVoc',
  components:{
    jisaRitVocChart,
    jisaRmVocChart,
    jisaRitVocTable,

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
