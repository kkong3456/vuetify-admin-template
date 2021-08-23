<template>
  <v-container fluid>
    <v-card
      outlined
      class="pa-3"
    >
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
        class="mt-3"
      >
        <v-col>
          <v-card
            outlined
          >
            <v-card-title>영업VOC 인터넷/TV</v-card-title>
            <v-card-content>
              <wordcloud
                :data="InternetTv"
                name-key="name"
                value-key="value"
                :color="Accent"  
                :show-tooltip="true"
                :word-click="wordClickHandler"
                max-height="100"
              />
            </v-card-content>
          </v-card>
        </v-col>
        <v-col>
          <v-card
            outlined
          >
            <v-card-title>영업VOC 무선</v-card-title>
            <v-card-content>
              <wordcloud
                :data="Wireless"
                name-key="name"
                value-key="value"
                :color="Accent"  
                :show-tooltip="true"
                :word-click="wordClickHandler"
              />
            </v-card-content>
          </v-card>
        </v-col>
      </v-row>

      <v-row
        class="mt-3"
      >
        <v-col>
          <p class="text-h5 text-center">
            [ 영업VOC 업무유형별- 인터넷/TV ]
          </p>
          <jisa-rit-voc-chart 
            ref="changeBonbu1"
          />
        </v-col>
        <v-col>
          <p class="text-h5 text-center">
            [ 영업VOC 업무유형별- 인터넷/TV ]
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
            [ 영업VOC 업무유형별 - 무선]
          </p>
          <jisa-rm-voc-chart 
            ref="changeBonbu2"
          />
        </v-col>
        <v-col>
          <p class="text-h5 text-center">
            [ 영업VOC 업무유형별 - 무선 ]
          </p>
          <jisa-rm-voc-bugbu-table 
            v-if="selectedBonbu=='북부고객본부'"
          />
          <jisa-rm-voc-dongbu-table
            v-if="selectedBonbu=='동부고객본부'"
          />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import wordcloud from 'vue-wordcloud'

import jisaRitVocChart from '@/components/charts/vocchart/jisaRitVocChart'
import jisaRitVocBugbuTable from '@/components/tables/voctable/jisaRitVocBugbuTable'
import jisaRitVocDongbuTable from '@/components/tables/voctable/jisaRitVocDongbuTable'

import jisaRmVocChart from '@/components/charts/vocchart/jisaRmVocChart'
import jisaRmVocBugbuTable from '@/components/tables/voctable/jisaRmVocBugbuTable'
import jisaRmVocDongbuTable from '@/components/tables/voctable/jisaRmVocDongbuTable'

// import jisaQitVocChart from '@/components/charts/vocchart/jisaQitVocChart'
// import jisaQitVocBugbuTable from '@/components/tables/voctable/jisaQitVocBugbuTable'
// import jisaQitVocDongbuTable from '@/components/tables/voctable/jisaQitVocDongbuTable'

// import jisaQmVocChart from '@/components/charts/vocchart/jisaQmVocChart'
// import jisaQmVocBugbuTable from '@/components/tables/voctable/jisaQmVocBugbuTable'
// import jisaQmVocDongbuTable from '@/components/tables/voctable/jisaQmVocDongbuTable'


export default {
  name:'RSNetworkVocJisa',
  components:{
    jisaRitVocChart,
    jisaRmVocChart,
    jisaRitVocBugbuTable,
    jisaRitVocDongbuTable,

    jisaRmVocBugbuTable,
    jisaRmVocDongbuTable,

    wordcloud,

    // jisaQitVocChart,
    // jisaQitVocBugbuTable,
    // jisaQitVocDongbuTable,

    // jisaQmVocChart,
    // jisaQmVocBugbuTable,
    // jisaQmVocDongbuTable,
  },

  data(){
    return{
      selectedBonbu:'북부고객본부',

      InternetTv:[
        {
          'name':'끊김',
          'value':26,
        },
        {
          'name':'절단',
          'value':18,
        },
        {
          'name':'혼선',
          'value':19,
        },
        {
          'name':'링안울림',
          'value':16,
        },
        {
          'name':'통화중',
          'value':15,
        },
        {
          'name':'무음',
          'value':9,
        },
        {
          'name':'무응답',
          'value':26,
        },
        {
          'name':'오착신',
          'value':18,
        },
        {
          'name':'수신거부',
          'value':19,
        },
        {
          'name':'음영',
          'value':16,
        },
        {
          'name':'3G천이',
          'value':15,
        },
        {
          'name':'레지불가',
          'value':9,
        }
      ],
      Wireless:[
        {
          'name':'끊김',
          'value':26,
        },
        {
          'name':'절단',
          'value':18,
        },
        {
          'name':'혼선',
          'value':19,
        },
        {
          'name':'링안울림',
          'value':16,
        },
        {
          'name':'통화중',
          'value':15,
        },
        {
          'name':'무음',
          'value':9,
        },
        {
          'name':'무응답',
          'value':26,
        },
        {
          'name':'오착신',
          'value':18,
        },
        {
          'name':'수신거부',
          'value':19,
        },
        {
          'name':'음영',
          'value':16,
        },
        {
          'name':'3G천이',
          'value':15,
        },
        {
          'name':'레지불가',
          'value':9,
        }
      ],
    }
  },
  methods:{
    changeUrl(selectedBonbu){
      console.log(selectedBonbu);
      this.$refs.changeBonbu1.changeBonbu(selectedBonbu);
      this.$refs.changeBonbu2.changeBonbu(selectedBonbu);
      this.$refs.changeBonbu3.changeBonbu(selectedBonbu);
      this.$refs.changeBonbu4.changeBonbu(selectedBonbu);
    },

    wordClickHandler(name,value,vm){
      console.log('wordClickHandler',name,value,vm);
    }
  }

}
</script>

<style scoped>

</style>
