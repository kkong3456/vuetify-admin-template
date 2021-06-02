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
              :items="['북부고객본부', '동부고객본부']"
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
          <jisa-rit-voc-bugbu-table 
            v-if="selectedBonbu=='북부고객본부'"
          />
          <jisa-rit-voc-dongbu-table
            v-if="selectedBonbu=='동부고객본부'"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <p class="text-h5 text-center">
            [ VOC 해지관련 - 무선]
          </p>
          <jisa-rm-voc-chart 
            ref="changeBonbu2"
          />
        </v-col>
        <v-col>
          <p class="text-h5 text-center">
            [ VOC 해지관련 - 무선 데이터]
          </p>
          <jisa-rm-voc-bugbu-table 
            v-if="selectedBonbu=='북부고객본부'"
          />
          <jisa-rm-voc-dongbu-table
            v-if="selectedBonbu=='동부고객본부'"
          />
        </v-col>
      </v-row>

      <v-row
        class="mt-5"
      >
        <v-col>
          <p class="text-h5 text-center">
            [ VOC 해지관련 - Quility 인터넷/TV ]
          </p>
          <jisa-qit-voc-chart 
            ref="changeBonbu3"
          />
        </v-col>
        <v-col>
          <p class="text-h5 text-center">
            [ VOC 해지관련 - Quility인터넷/TV 데이터]
          </p>
          <jisa-qit-voc-bugbu-table 
            v-if="selectedBonbu=='북부고객본부'"
          />
          <jisa-qit-voc-dongbu-table
            v-if="selectedBonbu=='동부고객본부'"
          />
        </v-col>
      </v-row>

      <v-row
        class="mt-5"
      >
        <v-col>
          <p class="text-h5 text-center">
            [ VOC 해지관련 - Quility 무선 ]
          </p>
          <jisa-qm-voc-chart 
            ref="changeBonbu4"
          />
        </v-col>
        <v-col>
          <p class="text-h5 text-center">
            [ VOC 해지관련 - Quility 무선 - 데이터]
          </p>
          <jisa-qm-voc-bugbu-table 
            v-if="selectedBonbu=='북부고객본부'"
          />
          <jisa-qm-voc-dongbu-table
            v-if="selectedBonbu=='동부고객본부'"
          />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import jisaRitVocChart from '@/components/charts/vocchart/jisaRitVocChart'
import jisaRitVocBugbuTable from '@/components/tables/voctable/jisaRitVocBugbuTable'
import jisaRitVocDongbuTable from '@/components/tables/voctable/jisaRitVocDongbuTable'

import jisaRmVocChart from '@/components/charts/vocchart/jisaRmVocChart'
import jisaRmVocBugbuTable from '@/components/tables/voctable/jisaRmVocBugbuTable'
import jisaRmVocDongbuTable from '@/components/tables/voctable/jisaRmVocDongbuTable'

import jisaQitVocChart from '@/components/charts/vocchart/jisaQitVocChart'
import jisaQitVocBugbuTable from '@/components/tables/voctable/jisaQitVocBugbuTable'
import jisaQitVocDongbuTable from '@/components/tables/voctable/jisaQitVocDongbuTable'

import jisaQmVocChart from '@/components/charts/vocchart/jisaQmVocChart'
import jisaQmVocBugbuTable from '@/components/tables/voctable/jisaQmVocBugbuTable'
import jisaQmVocDongbuTable from '@/components/tables/voctable/jisaQmVocDongbuTable'


export default {
  name:'RSNetworkVoc',
  components:{
    jisaRitVocChart,
    jisaRmVocChart,
    jisaRitVocBugbuTable,
    jisaRitVocDongbuTable,

    jisaRmVocBugbuTable,
    jisaRmVocDongbuTable,

    jisaQitVocChart,
    jisaQitVocBugbuTable,
    jisaQitVocDongbuTable,

    jisaQmVocChart,
    jisaQmVocBugbuTable,
    jisaQmVocDongbuTable,
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
      this.$refs.changeBonbu4.changeBonbu(selectedBonbu);
    }
  }

}
</script>

<style scoped>

</style>
