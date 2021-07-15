<template>
  <v-container fluid>
    <v-card>
      <v-row>
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
        <v-col>
          <vue-hotel-date-picker />
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-card
            outlined
            tile
            class="text-center pa-2 font-weight-bold"
            color="blue lighten-2"
          >
            순신규가입자수({{ selectedBonbu }})
          </v-card>
          <div class="d-flex">
            <v-card 
              outlined
              class="text-center"
              width="33%"
            >
              <v-card-subtitle>전월</v-card-subtitle>
              <v-divider />
              <v-card-text
                class="font-weight-bold text-md-h5 text-lg-h4"
              >
                {{ netNewIncreaseLastMonth }}
              </v-card-text>
            </v-card>  
            <v-spacer />

            <v-card 
              outlined
              class="text-center"
              width="33%"
            >
              <v-card-subtitle>금월</v-card-subtitle>
              <v-divider />
              <v-card-text
                class="font-weight-bold text-md-h5 text-lg-h4"
              >
                {{ netNewIncreaseThisMonth }}
              </v-card-text>
            </v-card>
            <v-spacer />
        
            <v-card 
              outlined    
              class="text-center"
              width="33%"
            >
              <v-card-subtitle>증감비율(%)</v-card-subtitle>
              <v-divider />
              <v-card-text
                class="font-weight-bold text-md-h5 text-lg-h4"
              >
                {{ netNewIncreaseDiff }} %
              </v-card-text>
            </v-card>
          </div>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-card
            outlined
            class="text-center pa-2 font-weight-bold"
            color="blue lighten-2"
            tile
          >
            순해지가입자수({{ selectedBonbu }})
          </v-card>
          <div class="d-flex">
            <v-card 
              outlined
              class="text-center"
              width="33%"
            >
              <v-card-subtitle>
                전월
              </v-card-subtitle>
              <v-divider />
              <v-card-text
                class="font-weight-bold text-md-h5 text-lg-h4"
              >
                {{ netHjLastMonth }}
              </v-card-text>
            </v-card>  
            <v-spacer />

            <v-card 
              outlined
              class="text-center"
              width="33%"
            >
              <v-card-subtitle>
                금월
              </v-card-subtitle>
              <v-divider />
              <v-card-text
                class="font-weight-bold text-md-h5 text-lg-h4"
              >
                {{ netHjThisMonth }}
              </v-card-text>
            </v-card>
            <v-spacer />
        
            <v-card 
              outlined    
              class="text-center"
              width="33%"
            >
              <v-card-subtitle>증감비율(%)</v-card-subtitle>
              <v-divider />
              <v-card-text
                class="font-weight-bold text-md-h5 text-lg-h4"
              >
                {{ netHjDiff }} %
              </v-card-text>
            </v-card>
          </div>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-card
            outlined
            class="text-center pa-2 font-weight-bold"
            color="blue lighten-2"
            tile
          >
            순증가 가입자수({{ selectedBonbu }})
          </v-card>
          <div class="d-flex">
            <v-card 
              outlined
              class="text-center"
              width="33%"
            >
              <v-card-subtitle>전월</v-card-subtitle>
              <v-divider />
              <v-card-text
                class="font-weight-bold text-md-h5 text-lg-h4"
              >
                {{ netIncreaseLastMonth }}
              </v-card-text>
            </v-card>  
            <v-spacer />

            <v-card 
              outlined
              class="text-center"
              width="33%"
            >
              <v-card-subtitle>금월</v-card-subtitle>
              <v-divider />
              <v-card-text
                class="font-weight-bold text-md-h5 text-lg-h4"
              >
                {{ netIncreaseThisMonth }}
              </v-card-text>
            </v-card>
            <v-spacer />
        
            <v-card 
              outlined    
              class="text-center"
              width="33%"
            >
              <v-card-subtitle>증감비율(%)</v-card-subtitle>
              <v-divider />
              <v-card-text
                class="font-weight-bold text-md-h5 text-lg-h4"
              >
                {{ netIncreaseDiff }} %
              </v-card-text>
            </v-card>
          </div>
        </v-col>
      </v-row>

      <!-- 전체 VOC -->
      <v-row
        class="mt-1"
      >
        <v-col
          cols="6"
        >
          <v-card
            outlined
          >
            <v-card-title>[TV-인터넷 VOC]</v-card-title>
            <v-card-content>
              <tv-internet-voc-word-cloud />
            </v-card-content>
          </v-card>
        </v-col>
        <v-col
          cols="6"
        >
          <v-card
            outlined
          >
            <v-card-title>[모바일 VOC]</v-card-title>
            <v-card-content>
              <mobile-voc-word-cloud />
            </v-card-content>
          </v-card>
        </v-col>
      </v-row>


      <!-- 테이블 -->
      <v-row
        class="mt-5"
      >
        <v-col
          cols="12"
          md="4"
        >
          <p class="text-h5 text-center">
            [지사  TV 순신규]
          </p>
          <jisa-tv-net-new-increase-table 
            ref="changeBonbu4"
            :propsdata="netNewIncreaseData"
            @netNewIncreaseLastMonth="netNewIncreaseLastMonthFunc"
            @netNewIncreaseThisMonth="netNewIncreaseThisMonthFunc"
            @netNewIncreaseDiff="netNewIncreaseDiffFunc"
          />
        </v-col>
    
        <v-col
          cols="12"
          md="4"
        >
          <p class="text-h5 text-center">
            [지사 TV 순해지]
          </p>
          <jisa-tv-hj-table 
            ref="changeBonbu5"
            :propsdata="netHjData"
            @netHjLastMonth="netHjLastMonthFunc"
            @netHjThisMonth="netHjThisMonthFunc"
            @netHjDiff="netHjDiffFunc"
          />
        </v-col>
   
        <v-col
          cols="12"
          md="4"
        >
          <p class="text-h5 text-center">
            [지사 TV 순증/감 추이]
          </p>
          <jisa-tv-net-increase-table 
            ref="changeBonbu6"
            :propsdata="netIncreaseData"
            @netIncreaseLastMonth="netIncreaseLastMonthFunc"
            @netIncreaseThisMonth="netIncreaseThisMonthFunc"
            @netIncreaseDiff="netIncreaseDiffFunc"
          />
        </v-col>
      </v-row>   
    
      <!-- 그래프-->
      <v-row
        class="mt-5"
      >
        <v-col
          cols="12"
          md="4"
        >
          <p class="text-h5 text-center">
            [지사  TV 순신규]
          </p>
          <jisa-tv-net-new-increase-line-chart 
            ref="changeBonbu1"
          />
        </v-col>
    
        <v-col
          cols="12"
          md="4"
        >
          <p class="text-h5 text-center">
            [지사 TV 순해지]
          </p>
          <jisa-tv-hj-line-chart 
            ref="changeBonbu2"
          />
        </v-col>
   
        <v-col
          cols="12"
          md="4"
        >
          <p class="text-h5 text-center">
            [지사 TV 순증/감]
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

import JisaTvNetNewIncreaseTable from '@/components/tables/jisaproducttable/JisaTvNetNewIncreaseTable'
import JisaTvNetIncreaseTable from '@/components/tables/jisaproducttable/JisaTvNetIncreaseTable'
import JisaTvHjTable from '@/components/tables/jisaproducttable/JisaTvHjTable'

import TvInternetVocWordCloud from '@/components/wordcloud/tvInternetVocWordCloud'
import MobileVocWordCloud from '@/components/wordcloud/mobileVocWordCloud';

import VueHotelDatePicker from '@/components/datepicker/vue-hotel-datepicker';


export default {
  name:'RSJisaTv',
  components:{
    JisaTvNetNewIncreaseLineChart,
    JisaTvNetIncreaseLineChart,
    JisaTvHjLineChart,
    //BonbuRadarChart,

    JisaTvNetNewIncreaseTable,
    JisaTvNetIncreaseTable,
    JisaTvHjTable,

    TvInternetVocWordCloud,
    MobileVocWordCloud,

    VueHotelDatePicker,
  },

  data(){
    return{
      selectedBonbu:'북부고객본부',

      netNewIncreaseData:'순신규',
      netHjData:'순해지',
      netIncreaseData:'순증/감',


      //전월/금월/증감
      netNewIncreaseLastMonth:0,
      netHjLastMonth:0,
      netIncreaseLastMonth:0,

      netNewIncreaseThisMonth:0,
      netHjThisMonth:0,
      netIncreaseThisMonth:0,

      netNewIncreaseDiff:0,
      netHjDiff:0,
      netIncreaseDiff:0,

      //wordcloud
      tvInternetVoc:this.tvInternetVoc,
      mobileVoc:this.mobileVoc,

    }
  },
  methods:{
    changeUrl(selectedBonbu){
      console.log(selectedBonbu);
      this.$refs.changeBonbu1.changeBonbu(selectedBonbu);
      this.$refs.changeBonbu2.changeBonbu(selectedBonbu);
      this.$refs.changeBonbu3.changeBonbu(selectedBonbu);
      this.$refs.changeBonbu4.changeBonbu(selectedBonbu);
      this.$refs.changeBonbu5.changeBonbu(selectedBonbu);
      this.$refs.changeBonbu6.changeBonbu(selectedBonbu);
    },

    netNewIncreaseLastMonthFunc(val){
      this.netNewIncreaseLastMonth=val.toLocaleString();
    },

    netNewIncreaseThisMonthFunc(val){
      this.netNewIncreaseThisMonth=val.toLocaleString();
    },

    netNewIncreaseDiffFunc(val){
      this.netNewIncreaseDiff=val.toLocaleString();
    },

    netHjLastMonthFunc(val){
      this.netHjLastMonth=val.toLocaleString();
    },

    netHjThisMonthFunc(val){
      this.netHjThisMonth=val.toLocaleString();
    },

    netHjDiffFunc(val){
      this.netHjDiff=val.toLocaleString();
    },

    netIncreaseLastMonthFunc(val){
      console.log('netIncreaseLastMonth 서부본부',val);
      this.netIncreaseLastMonth=val.toLocaleString();
    },
    netIncreaseThisMonthFunc(val){
      this.netIncreaseThisMonth=val.toLocaleString();
    },
    netIncreaseDiffFunc(val){
      this.netIncreaseDiff=val.toLocaleString();
    }
  }

}
</script>

<style scoped>

</style>
