
<template>
  <v-container fluid>
    <v-card>
      <v-row>
        <!-- 기간별 조회 -->
        <v-col>
          <vue-hotel-date-picker />
        </v-col>
        <!-- 본부별 조회(검색) -->
        
        <v-col>
          <template>
            <v-select
              v-model="selectedBonbu"
              :items="['북부고객본부', '동부고객본부', '서부고객본부', '강남고객본부','충남/충북고객본부','전남/전북고객본부','부산/경남고객본부','대구/경북고객본부']"
              label="광역본부"

              outlined
              prepend-inner-icon="mdi-content-copy"
              @change="changeBonbu(selectedBonbu)"
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
        <!-- 지사별 조회 -->
        <v-col>
          <template>
            <v-select
              v-model="selectedJisa"             
              :items="selectedJisaArray"
              label="지사"
              outlined
              prepend-inner-icon="mdi-content-copy"
              @change="changeJisa(selectedJisa)"
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
       
       
        <v-spacer />
      </v-row>

      <!-- 전체 cloud VOC -->
      <v-row pa-0>
        <v-col>
          <div class="text-h5 text-center">
            [TV-인터넷] 해지징후 VOC
          </div>
        </v-col>
        <v-divider
          vertical
        />
        <v-col>
          <div class="text-h5 text-center">
            [무선] 해지징후 VOC
          </div>
        </v-col>
      </v-row>
      <v-row
        class="mt-1"
      >
        <v-col
          cols="12"
          md="6"
          lg="3"
        >
          <v-card
            outlined
          >
            <v-card-title>{{ selectedBonbu }}</v-card-title>
            <v-card-content>
              <bonbu-tv-internet-voc-word-cloud
                ref="changeBonbu7"
                :propsbonbudata="selectedBonbu"
                :propsjisadata="selectedJisa"
                :propsjijumdata="selectedJijum"
                @bonbuVocItThisSum="bonbuVocItThisSumFunc"
                @bonbuVocItLastSum="bonbuVocItLastSumFunc"
                @bonbuVocItSumDiff="bonbuVocItSumDiffFunc"
              />
            </v-card-content>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          md="6"
          lg="3"
        >
          <v-card
            outlined
          >
            <v-card-title>{{ selectedJisa }}</v-card-title>

            <v-card-content>
              <jisa-tv-internet-voc-word-cloud
                ref="changeJisa7"
                :propsbonbudata="selectedBonbu"   
                :propsjisadata="selectedJisa"
                :propsjijumdata="selectedJijum"
                @jisaVocItThisSum="jisaVocItThisSumFunc"
                @jisaVocItLastSum="jisaVocItLastSumFunc"
                @jisaVocItSumDiff="jisaVocItSumDiffFunc"
              />
            </v-card-content>
          </v-card>
        </v-col>

        <v-divider
          vertical
          inset
        />

        <v-col
          cols="12"
          md="6"
          lg="3"
        >
          <v-card
            outlined
          >
            <v-card-title>{{ selectedBonbu }}</v-card-title>
            <v-card-content>
              <bonbu-mobile-voc-word-cloud
                ref="changeBonbu8"
                :propsbonbudata="selectedBonbu"
                :propsjisadata="selectedJisa"
                :propsjijumdata="selectedJijum"
                @bonbuVocMobileThisSum="bonbuVocMobileThisSumFunc"
                @bonbuVocMobileLastSum="bonbuVocMobileLastSumFunc"
                @bonbuVocMobileSumDiff="bonbuVocMobileSumDiffFunc"
              />
            </v-card-content>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          md="6"
          lg="3"
        >
          <v-card
            outlined
          >
            <v-card-title>{{ selectedJisa }}</v-card-title>

            <v-card-content>
              <jisa-mobile-voc-word-cloud
                ref="changeJisa8"
                :propsbonbudata="selectedBonbu"
                :propsjisadata="selectedJisa"
                :propsjijumdata="selectedJijum"
                @jisaVocMobileThisSum="jisaVocMobileThisSumFunc"
                @jisaVocMobileLastSum="jisaVocMobileLastSumFunc"
                @jisaVocMobileSumDiff="jisaVocMobileSumDiffFunc"
              />
            </v-card-content>
          </v-card>
        </v-col>
      </v-row>
    
      <!-- 전주비교 본부-->
      <v-row>
        <v-col>
          <v-card
            outlined
            tile
            class="text-center pa-2 font-weight-bold"
            color="blue lighten-2"
          >
            전주대비 증감률({{ selectedBonbu }})
          </v-card>
          <div
            class="d-flex"
            style="height:80px;"
          >
            <v-card 
              outlined
              class="text-center"
              width="50%"
            >
              <v-card-subtitle
                class="text-left py-0"
              >
                조회기간(1주일전)
              </v-card-subtitle>
              <v-card-text
                class="font-weight-bold text-md-h5 text-lg-h4 py-0"
              >
                {{ bonbuVocItLastSum }}
              </v-card-text>
            </v-card>  
            <v-spacer />

            <v-card 
              outlined
              class="text-center"
              width="50%"
            >
              <v-card-subtitle
                class="text-left py-0"
              >
                조회기간
              </v-card-subtitle>
              <v-card-text
                class="font-weight-bold text-md-h5 text-lg-h4"
              >
                {{ bonbuVocItThisSum }}
              </v-card-text>
            </v-card>
            <!-- <v-spacer /> -->
          </div>
        
          <v-card 
            outlined    
            class="text-center"
            style="height:90px;"
          >
            <v-card-subtitle
              class="text-left py-0"
            >
              증감비율(%)
            </v-card-subtitle>
            <v-card-text
              class="font-weight-bold text-md-h4 text-lg-h3"
            >
              {{ bonbuVocItSumDiff }} %
            </v-card-text>
          </v-card>
        </v-col>


        <!-- 전주비교 지사-유선 -->
        <v-col>
          <v-card
            outlined
            tile
            class="text-center pa-2 font-weight-bold"
            color="blue lighten-2"
          >
            전주대비 증감률({{ selectedJisa }})
          </v-card>
          <div
            class="d-flex"
            style="height:80px;"
          >
            <v-card 
              outlined
              class="text-center"
              width="50%"
            >
              <v-card-subtitle
                class="text-left py-0"
              >
                조회기간(1주일전)
              </v-card-subtitle>
              <v-card-text
                class="font-weight-bold text-md-h5 text-lg-h4 py-0"
              >
                {{ jisaVocItLastSum }}
              </v-card-text>
            </v-card>  
            <v-spacer />

            <v-card 
              outlined
              class="text-center"
              width="50%"
            >
              <v-card-subtitle
                class="text-left py-0"
              >
                조회기간
              </v-card-subtitle>
              <v-card-text
                class="font-weight-bold text-md-h5 text-lg-h4"
              >
                {{ jisaVocItThisSum }}
              </v-card-text>
            </v-card>
            <!-- <v-spacer /> -->
          </div>
        
          <v-card 
            outlined    
            class="text-center"
            style="height:90px;"
          >
            <v-card-subtitle
              class="text-left py-0"
            >
              증감비율(%)
            </v-card-subtitle>
            <v-card-text
              class="font-weight-bold text-md-h4 text-lg-h3"
            >
              {{ jisaVocItSumDiff }} %
            </v-card-text>
          </v-card>
        </v-col>

        <v-divider
          vertical
          inset
        />

        <!-- 전주비교 본부-무선 -->
        <v-col>
          <v-card
            outlined
            tile
            class="text-center pa-2 font-weight-bold"
            color="blue lighten-2"
          >
            전주대비 증감률({{ selectedBonbu }})
          </v-card>
          <div
            class="d-flex"
            style="height:80px;"
          >
            <v-card 
              outlined
              class="text-center"
              width="50%"
            >
              <v-card-subtitle
                class="text-left py-0"
              >
                조회기간(1주일전)
              </v-card-subtitle>
              <v-card-text
                class="font-weight-bold text-md-h5 text-lg-h4 py-0"
              >
                {{ bonbuVocMobileLastSum }}
              </v-card-text>
            </v-card>  
            <v-spacer />

            <v-card 
              outlined
              class="text-center"
              width="50%"
            >
              <v-card-subtitle
                class="text-left py-0"
              >
                조회기간
              </v-card-subtitle>
              <v-card-text
                class="font-weight-bold text-md-h5 text-lg-h4"
              >
                {{ bonbuVocMobileThisSum }}
              </v-card-text>
            </v-card>
            <!-- <v-spacer /> -->
          </div>
        
          <v-card 
            outlined    
            class="text-center"
            style="height:90px;"
          >
            <v-card-subtitle
              class="text-left py-0"
            >
              증감비율(%)
            </v-card-subtitle>
            <v-card-text
              class="font-weight-bold text-md-h4 text-lg-h3"
            >
              {{ bonbuVocMobileSumDiff }} %
            </v-card-text>
          </v-card>
        </v-col>

        <!-- 전주비교 지사-무선 -->
        <v-col>
          <v-card
            outlined
            tile
            class="text-center pa-2 font-weight-bold"
            color="blue lighten-2"
          >
            전주대비 증감률({{ selectedJisa }})
          </v-card>
          <div
            class="d-flex"
            style="height:80px;"
          >
            <v-card 
              outlined
              class="text-center"
              width="50%"
            >
              <v-card-subtitle
                class="text-left py-0"
              >
                조회기간(1주일전)
              </v-card-subtitle>
              <v-card-text
                class="font-weight-bold text-md-h5 text-lg-h4 py-0"
              >
                {{ jisaVocMobileLastSum }}
              </v-card-text>
            </v-card>  
            <v-spacer />

            <v-card 
              outlined
              class="text-center"
              width="50%"
            >
              <v-card-subtitle
                class="text-left py-0"
              >
                조회기간
              </v-card-subtitle>
              <v-card-text
                class="font-weight-bold text-md-h5 text-lg-h4"
              >
                {{ jisaVocMobileThisSum }}
              </v-card-text>
            </v-card>
            <!-- <v-spacer /> -->
          </div>
        
          <v-card 
            outlined    
            class="text-center"
            style="height:90px;"
          >
            <v-card-subtitle
              class="text-left py-0"
            >
              증감비율(%)
            </v-card-subtitle>
            <v-card-text
              class="font-weight-bold text-md-h4 text-lg-h3"
            >
              {{ jisaVocMobileSumDiff }} %
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>


      <!-- 테이블 -->
      <v-row
        class="mt-10"
      >
        <v-col
          cols="12"
          md="4"
        >
          <v-tooltip top>
            <template v-slot:activator="{on,attrs}">
              <span
                v-bind="attrs"
                v-on="on"
              >
                <p class="text-h6 text-center">
                  [{{ selectedBonbu }} - VOC누적현황]
                </p>
              </span>
            </template>
           
            <span class="text-h6 text-center">
              '{{ selectedStartDate.substring(2,4)+'.'+selectedStartDate.substring(4,6)+'.'+selectedStartDate.substring(6,8) }} 
              ~ {{ selectedEndDate.substring(2,4)+'.'+selectedEndDate.substring(4,6)+'.'+selectedEndDate.substring(6,8) }} 
            </span>
          </v-tooltip>
         
          <jisa-m-it-hj-voc-table 
            ref="changeBonbu9"
          />
        </v-col>
    
        <v-col
          cols="12"
          md="4"
        >
          <v-tooltip top>
            <template v-slot:activator="{on,attrs}">
              <span
                v-bind="attrs"
                v-on="on"
              >
                <p class="text-h6 text-center">
                  [{{ selectedJisa }} - VOC 유형 - 유선]
                </p>
              </span>
            </template>
           
            <span class="text-h6 text-center">
              '{{ selectedStartDate.substring(2,4)+'.'+selectedStartDate.substring(4,6)+'.'+selectedStartDate.substring(6,8) }} 
              ~ {{ selectedEndDate.substring(2,4)+'.'+selectedEndDate.substring(4,6)+'.'+selectedEndDate.substring(6,8) }} 
            </span>
          </v-tooltip>        
      
          <jisa-it-hj-voc-bar 
            ref="changeJisa9"
          />
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <v-tooltip top>
            <template v-slot:activator="{on,attrs}">
              <span
                v-bind="attrs"
                v-on="on"
              >
                <p class="text-h6 text-center">
                  [{{ selectedJisa }} - VOC 유형 - 무선]
                </p></span>
            </template>
           
            <span class="text-h6 text-center">
              '{{ selectedStartDate.substring(2,4)+'.'+selectedStartDate.substring(4,6)+'.'+selectedStartDate.substring(6,8) }} 
              ~ {{ selectedEndDate.substring(2,4)+'.'+selectedEndDate.substring(4,6)+'.'+selectedEndDate.substring(6,8) }} 
            </span>
          </v-tooltip>
                  
          <jisa-m-hj-voc-bar 
            ref="changeJisa10"
          />
        </v-col>
      </v-row>   
    
      <!-- 그래프-->
      <v-row
        class="mt-10"
      >
        <v-col
          cols="12"
          md="3"
        >
          <p class="text-h5 text-center">
            [유선-총 VOC 추이]
          </p>
          <jisa-rit-voc-chart 
            ref="changeBonbu10"
          />
        </v-col>
    
        <v-col
          cols="12"
          md="3"
        >
          <p class="text-h5 text-center">
            [유선-혜택문의]
          </p>
          <jisa-rit-voc-type1-chart
            ref="changeBonbu11"
          />
        </v-col>
   
        <v-col
          cols="12"
          md="3"
        >
          <p class="text-h5 text-center">
            [유선-약정문의]
          </p>
          <jisa-rit-voc-type2-chart 
            ref="changeBonbu12"
          />
        </v-col>
        <v-col
          cols="12"
          md="3"
        >
          <p class="text-h5 text-center">
            [유선-위약금문의]
          </p>
          <jisa-rit-voc-type3-chart
            ref="changeBonbu13"
          />
        </v-col>
      </v-row>
      <v-row
        class="mt-5"
      >
        <v-col
          cols="12"
          md="3"
        >
          <p class="text-h5 text-center">
            [무선-총 VOC 추이]
          </p>
          <jisa-rm-voc-chart 
            ref="changeBonbu14"
          />
        </v-col>
    
        <v-col
          cols="12"
          md="3"
        >
          <p class="text-h6 text-center">
            [무선-단말기할부대금 및 잔여기간 문의]
          </p>
          <jisa-rm-voc-type1-chart
            ref="changeBonbu15"
          />
        </v-col>
   
        <v-col
          cols="12"
          md="3"
        >
          <p class="text-h5 text-center">
            [무선-약정문의]
          </p>
          <jisa-rm-voc-type2-chart 
            ref="changeBonbu16"
          />
        </v-col>
        <v-col
          cols="12"
          md="3"
        >
          <p class="text-h5 text-center">
            [무선-위약금문의]
          </p>
          <jisa-rm-voc-type3-chart
            ref="changeBonbu17"
          />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>


<script>
import eventBus from '@/js/eventBus.js'

// import JisaTvNetNewIncreaseLineChart from '@/components/charts/jisaproductchart/JisaTvNetNewIncreaseLineChart'
// import JisaTvNetIncreaseLineChart from '@/components/charts/jisaproductchart/JisaTvNetIncreaseLineChart'
// import JisaTvHjLineChart from '@/components/charts/jisaproductchart/JisaTvHjLineChart'

// import JisaTvNetNewIncreaseTable from '@/components/tables/jisaproducttable/JisaTvNetNewIncreaseTable'
// import JisaTvNetIncreaseTable from '@/components/tables/jisaproducttable/JisaTvNetIncreaseTable'
// import JisaTvHjTable from '@/components/tables/jisaproducttable/JisaTvHjTable'


import BonbuTvInternetVocWordCloud from '@/components/wordcloud/BonbuTvInternetVocWordCloud'
import BonbuMobileVocWordCloud from '@/components/wordcloud/BonbuMobileVocWordCloud'
import JisaTvInternetVocWordCloud from '@/components/wordcloud/JisaTvInternetVocWordCloud'
import JisaMobileVocWordCloud from '@/components/wordcloud/JisaMobileVocWordCloud';

import JisaItHjVocBar from '@/components/bars/vocbars/jisaItHjVocBar';
import JisaMHjVocBar from '@/components/bars/vocbars/jisaMHjVocBar';

import JisaMItHjVocTable from '@/components/tables/voctable/jisaMItHjVocTable';

import JisaRitVocChart from '@/components/charts/vocchart/jisaRitVocChart.vue';
import JisaRitVocType1Chart from '@/components/charts/vocchart/jisaRitVocType1Chart';
import JisaRitVocType2Chart from '@/components/charts/vocchart/jisaRitVocType2Chart';
import JisaRitVocType3Chart from '@/components/charts/vocchart/jisaRitVocType3Chart';

import JisaRmVocChart from '@/components/charts/vocchart/jisaRmVocChart';
import JisaRmVocType1Chart from '@/components/charts/vocchart/jisaRmVocType1Chart';
import JisaRmVocType2Chart from '@/components/charts/vocchart/jisaRmVocType2Chart';
import JisaRmVocType3Chart from '@/components/charts/vocchart/jisaRmVocType3Chart';


import VueHotelDatePicker from '@/components/datepicker/vue-hotel-datepicker';



export default {
  name:'RSNHjVoc',
  components:{
    //JisaTvNetNewIncreaseLineChart,
    // JisaTvNetIncreaseLineChart,
    // JisaTvHjLineChart,
    //BonbuRadarChart,

    // JisaTvNetNewIncreaseTable,
    // JisaTvNetIncreaseTable,
    // JisaTvHjTable,

    JisaMItHjVocTable,

    BonbuTvInternetVocWordCloud,
    BonbuMobileVocWordCloud,
    JisaTvInternetVocWordCloud,
    JisaMobileVocWordCloud,

    JisaItHjVocBar,
    JisaMHjVocBar,

    JisaRitVocChart,
    JisaRitVocType1Chart,
    JisaRitVocType2Chart,
    JisaRitVocType3Chart,

    JisaRmVocChart,
    JisaRmVocType1Chart,
    JisaRmVocType2Chart,
    JisaRmVocType3Chart,
    
    VueHotelDatePicker,
    
  },

  data(){
    return{
      selectedBonbu:'북부고객본부',
      selectedJisaArray:['고양지사','광진지사','광화문지사','노원지사','서대문지사'],
      selectedJijumArray:['CS부','마케팅부','영업기획팀'],
      
      selectedJisa:'고양지사',
      selectedJijum:'CS부',

      selectedItVocType:'약정 문의',
      selectedItVocTypeArray:['KT 업무/정책 불만','KTShop문의','단말기 할부대금 및 잔여기간문의','서비스 불만','약정 문의','요금 불만','위약금(할인반환금)문의','품질 불만','할인반환금문의','혜택문의'],

      selectedMobileVocType:'약정 문의',
      selectedMobileVocTypeArray:['단말기 할부대금 및 잔여기간문의','약정 문의','위약금(할인반환금)문의'],
      
      selectedStartDate:'20210420',
      selectedEndDate:'20210426',


      bonbuVocItThisSum:0,
      bonbuVocItLastSum:0,
      bonbuVocItSumDiff:0,

      bonbuVocMobileThisSum:0,
      bonbuVocMobileLastSum:0,
      bonbuVocMobileSumDiff:0,

      jisaVocItThisSum:0,  //금주 Voc건수
      jisaVocItLastSum:0,  //전주 VOC건수
      jisaVocItSumDiff:0,

      jisaVocMobileThisSum:0,
      jisaVocMobileLastSum:0,
      jisaVocMobileSumDiff:0,
      
      //wordcloud
      tvInternetVoc:this.tvInternetVoc,
      mobileVoc:this.mobileVoc,
    }
  },

  async created(){
    eventBus.$on('pickedDates',(dateResult)=>{  //RSN_HjVoc.vue에서 기간 선택시 그 자식 컨포넌트인 vue-hotel-datepicker.vue에서 시작일자와 종료일자를 받아옴  
      // const imsiThisStart=dateResult.start.replace(/\//gi,',');
      // const imsiThisEnd=dateResult.end.replace(/\//gi,',');

      this.selectedStartDate=dateResult.start.replace(/\//gi,'')  //현재 선택
      this.selectedEndDate=dateResult.end.replace(/\//gi,'')
      // console.log('selectedstartDate',this.selectedStartDate,this.selectedEndDate);

      // this.lastWeekStart=new Date(imsiThisStart);
      // this.lastWeekStart.setDate(this.lastWeekStart.getDate() - 7);
      // this.lastWeekStart=this.displayDateText(this.lastWeekStart);
      // this.lastWeekStartDate=this.lastWeekStart.replace(/\//gi,"");  //현재 선택 1주일전

      // this.lastWeekEnd=new Date(imsiThisEnd);
      // this.lastWeekEnd.setDate(this.lastWeekEnd.getDate()- 7);
      // this.lastWeekEnd=this.displayDateText(this.lastWeekEnd);
      // this.lastWeekEndDate=this.lastWeekEnd.replace(/\//gi,"");
    })

  },

  methods:{
    changeJisa(selectedJisa){
      this.selectedJisa=selectedJisa;
      this.selectedBonbu=this.selectedBonbu;
      this.$refs.changeJisa7.changedJisa(selectedJisa,this.selectedBonbu);  //it word cloud
      this.$refs.changeJisa8.changedJisa(selectedJisa,this.selectedBonbu);
      this.$refs.changeJisa9.changedJisa(selectedJisa,this.selectedBonbu);  //it bar graph
      this.$refs.changeJisa10.changedJisa(selectedJisa,this.selectedBonbu);
      
    },

    changeJijum(selectedJijum){
      this.selectedJijum=selectedJijum;
      this.$refs.changeJijum7.changedJijum(selectedJijum);
      
    },
    changeBonbu(selectedBonbu){
      if(this.selectedBonbu==='북부고객본부'){
        this.selectedJisaArray=['고양지사','광진지사','광화문지사','노원지사','서대문지사'];
        this.selectedJisa='고양지사';
        this.$refs.changeJisa7.changedJisa(this.selectedJisa,this.selectedBonbu);  //본부를바꾸면 지사가 바뀌면서 유선 워드 클라우드 데이터 표시
        this.$refs.changeJisa8.changedJisa(this.selectedJisa,this.selectedBonbu);  // 상동 ,무선 클라우드 데이터 표시
        this.$refs.changeJisa9.changedJisa(this.selectedJisa,this.selectedBonbu);
        this.$refs.changeJisa10.changedJisa(this.selectedJisa,this.selectedBonbu);
        
      }

      if(this.selectedBonbu==='동부고객본부'){
        this.selectedJisaArray=['강릉지사','구리지사','원주지사','의정부지사','춘천지사']; 
        this.selectedJisa='강릉지사';
        this.$refs.changeJisa7.changedJisa(this.selectedJisa,this.selectedBonbu);
        this.$refs.changeJisa8.changedJisa(this.selectedJisa,this.selectedBonbu);
        this.$refs.changeJisa9.changedJisa(this.selectedJisa,this.selectedBonbu);
        this.$refs.changeJisa10.changedJisa(this.selectedJisa,this.selectedBonbu);
      }

      if(this.selectedBonbu==='강남고객본부'){
        this.selectedJisaArray=['강남지사','분당지사','송파지사','수원지사','용인지사','평택지사'];
        this.selectedJisa='강남지사'; 
        this.$refs.changeJisa7.changedJisa(this.selectedJisa);
        this.$refs.changeJisa8.changedJisa(this.selectedJisa);
        this.$refs.changeJisa9.changedJisa(this.selectedJisa,this.selectedBonbu);
        this.$refs.changeJisa10.changedJisa(this.selectedJisa,this.selectedBonbu);
      }

      if(this.selectedBonbu==='충남/충북고객본부'){
        this.selectedJisaArray=['대전지사','서대전지사','천안지사','청주지사','충주지사','홍성지사'];
        this.selectedJisa='대전지사';
        this.$refs.changeJisa7.changedJisa(this.selectedJisa); 
        this.$refs.changeJisa8.changedJisa(this.selectedJisa);
        this.$refs.changeJisa9.changedJisa(this.selectedJisa,this.selectedBonbu);
        this.$refs.changeJisa10.changedJisa(this.selectedJisa,this.selectedBonbu);
      }

      if(this.selectedBonbu==='대구/경북고객본부'){
        this.selectedJisaArray=['구미지사','달서지사','동대구지사','서대구지사','안동지사','포항지사'];
        this.selectedJisa='구미지사';
        this.$refs.changeJisa7.changedJisa(this.selectedJisa);
        this.$refs.changeJisa8.changedJisa(this.selectedJisa);
        this.$refs.changeJisa9.changedJisa(this.selectedJisa,this.selectedBonbu);
        this.$refs.changeJisa10.changedJisa(this.selectedJisa,this.selectedBonbu);
      }

      if(this.selectedBonbu==='부산/경남고객본부'){
        this.selectedJisaArray=['남부산지사','동부산지사','북부산지사','서부산지사','울산지사','진주지사','창원지사'];
        this.selectedJisa='남부산지사';
        this.$refs.changeJisa7.changedJisa(this.selectedJisa);
        this.$refs.changeJisa8.changedJisa(this.selectedJisa);
        this.$refs.changeJisa9.changedJisa(this.selectedJisa,this.selectedBonbu);
        this.$refs.changeJisa10.changedJisa(this.selectedJisa,this.selectedBonbu);
      }

      if(this.selectedBonbu==='전남/전북고객본부'){
        this.selectedJisaArray=['광주지사','목포지사','순천지사','익산지사','전주지사'];
        this.selectedJisa='광주지사';
        this.$refs.changeJisa7.changedJisa(this.selectedJisa);
        this.$refs.changeJisa8.changedJisa(this.selectedJisa);
        this.$refs.changeJisa9.changedJisa(this.selectedJisa,this.selectedBonbu);
        this.$refs.changeJisa10.changedJisa(this.selectedJisa,this.selectedBonbu);
      }
      if(this.selectedBonbu==='서부고객본부'){
        this.selectedJisaArray=['강서지사','구로지사','부천지사','서인천지사','안산지사','안양지사','인천지사'];
        this.selectedJisa='강서지사';
        this.$refs.changeJisa7.changedJisa(this.selectedJisa);
        this.$refs.changeJisa8.changedJisa(this.selectedJisa);
        this.$refs.changeJisa9.changedJisa(this.selectedJisa,this.selectedBonbu);
        this.$refs.changeJisa10.changedJisa(this.selectedJisa,this.selectedBonbu);
      }

      // 본부가 바뀌면 각 컴포넌트의 changeBonbu 함수를 실행시켜 데이터를 바꾼다.   
      this.$refs.changeBonbu7.changedBonbu(selectedBonbu);
      this.$refs.changeBonbu8.changedBonbu(selectedBonbu);
      this.$refs.changeBonbu9.changedBonbu(selectedBonbu); //voc 테이블 컴포넌터
      this.$refs.changeBonbu10.changeBonbu(selectedBonbu); // 유선 VOC추이(지사별)
      this.$refs.changeBonbu11.changeBonbu(selectedBonbu); // 유선VOC- 혜택문의 추이
      this.$refs.changeBonbu12.changeBonbu(selectedBonbu); //유선VOC - 약정문의 추이
      this.$refs.changeBonbu13.changeBonbu(selectedBonbu);  //유선Voc - 위약금 문의 추이

      this.$refs.changeBonbu14.changeBonbu(selectedBonbu); // 무선 VOC추이(지사별)
      this.$refs.changeBonbu15.changeBonbu(selectedBonbu); // 무선VOC- 혜택문의 추이
      this.$refs.changeBonbu16.changeBonbu(selectedBonbu); //무선VOC - 약정문의 추이
      this.$refs.changeBonbu17.changeBonbu(selectedBonbu);  //무선Voc - 위약금 문의 추이
    },

  
    bonbuVocItThisSumFunc(val){     
      this.bonbuVocItThisSum=val.toLocaleString(); 
    },
    bonbuVocItLastSumFunc(val){     
      this.bonbuVocItLastSum=val.toLocaleString(); 
    },
    bonbuVocItSumDiffFunc(val){     
      this.bonbuVocItSumDiff=val.toLocaleString(); 
    },

    jisaVocItThisSumFunc(val){
      this.jisaVocItThisSum=val.toLocaleString();
    },
    jisaVocItLastSumFunc(val){
      this.jisaVocItLastSum=val.toLocaleString();
    },

    jisaVocItSumDiffFunc(val){
      this.jisaVocItSumDiff=val.toLocaleString();
    },

    bonbuVocMobileThisSumFunc(val){
      this.bonbuVocMobileThisSum=val.toLocaleString();
    },

    bonbuVocMobileLastSumFunc(val){
      this.bonbuVocMobileLastSum=val.toLocaleString();
    },

    bonbuVocMobileSumDiffFunc(val){
      this.bonbuVocMobileSumDiff=val.toLocaleString();
    },

    jisaVocMobileThisSumFunc(val){
      this.jisaVocMobileThisSum=val.toLocaleString();
    },

    jisaVocMobileLastSumFunc(val){
      this.jisaVocMobileLastSum=val.toLocaleString();
    },

    jisaVocMobileSumDiffFunc(val){
      this.jisaVocMobileSumDiff=val.toLocaleString();
    },
    
  }

}
</script>

<style scoped>

</style>
