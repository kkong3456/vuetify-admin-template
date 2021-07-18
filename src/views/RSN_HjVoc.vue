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
        <!-- (유선)지점명 조회 -->
        <v-col>
          <template>
            <v-select
              v-model="selectedJijum"             
              :items="selectedJijumArray"
              label="지점"
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
        <!-- VOC 유형별 조회 -->
        <v-col>
          <template>
            <v-select
              v-model="selectedVocType"             
              :items="selectedVocTypeArray"
              label="VOC유형"
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

      <!-- 전체 cloud VOC -->
      <v-row
        class="mt-1"
      >
        <v-col>
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
              />
            </v-card-content>
          </v-card>
        </v-col>
        <v-col>
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
              />
            </v-card-content>
          </v-card>
        </v-col>
        <v-col>
          <v-card
            outlined
          >
            <v-card-title>{{ selectedJijum }}</v-card-title>

            <v-card-content>
              <jijum-tv-internet-voc-word-cloud
                ref="changeJijum7"
                :propsbonbudata="selectedBonbu"
                :propsjisadata="selectedJisa"
                :propsjijumdata="selectedJijum"
              />
            </v-card-content>
          </v-card>
        </v-col>
      </v-row>
    
      <!-- 전월비교 -->
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

import BonbuTvInternetVocWordCloud from '@/components/wordcloud/BonbuTvInternetVocWordCloud'
import JisaTvInternetVocWordCloud from '@/components/wordcloud/JisaTvInternetVocWordCloud'
import MobileVocWordCloud from '@/components/wordcloud/mobileVocWordCloud';

import VueHotelDatePicker from '@/components/datepicker/vue-hotel-datepicker';



export default {
  name:'RSNHjVoc',
  components:{
    JisaTvNetNewIncreaseLineChart,
    JisaTvNetIncreaseLineChart,
    JisaTvHjLineChart,
    //BonbuRadarChart,

    // JisaTvNetNewIncreaseTable,
    JisaTvNetIncreaseTable,
    JisaTvHjTable,

    BonbuTvInternetVocWordCloud,
    JisaTvInternetVocWordCloud,

    VueHotelDatePicker
    
  },

  data(){
    return{
      selectedBonbu:'북부고객본부',
      selectedJisaArray:['고양지사','광진지사','광화문지사','노원지사','서대문지사'],
      selectedJijumArray:['CS부','마케팅부','영업기획팀'],
      
      selectedJisa:'고양지사',
      selectedJijum:'CS부',

      selectedVocType:'약정 문의',
      selectedVocTypeArray:['KT 업무/정책 불만','KTShop문의','단말기 할부대금 및 잔여기간문의','서비스 불만','약정 문의','요금 불만','위약금(할인반환금)문의','품질 불만','할인반환금문의','혜택문의'],

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
    changeJisa(selectedJisa){
      this.selectedJisa=selectedJisa;
      this.$refs.changeJisa7.changedJisa(selectedJisa);
      
    },

    changeJijum(selectedJijum){
      this.selectedJijum=selectedJijum;
      this.$refs.changeJijum7.changedJijum(selectedJijum);
      
    },
    changeBonbu(selectedBonbu){
      console.log('fire works!');
      if(this.selectedBonbu==='북부고객본부'){
        this.selectedJisaArray=['고양지사','광진지사','광화문지사','노원지사','서대문지사'];
        this.selectedJisa='고양지사';
        
      }

      if(this.selectedBonbu==='동부고객본부'){
        this.selectedJisaArray=['강릉지사','구리지사','원주지사','의정부지사','춘천지사']; 
        this.selectedJisa='강릉지사';
      }

      if(this.selectedBonbu==='강남고객본부'){
        this.selectedJisaArray=['강남지사','분당지사','송파지사','수원지사','용인지사','평택지사'];
        this.selectedJisa='강남지사'; 
      }

      if(this.selectedBonbu==='충남/충북고객본부'){
        this.selectedJisaArray=['대전지사','서대전지사','천안지사','청주지사','충주지사','홍성지사'];
        this.selectedJisa='대전지사';
      }

      if(this.selectedBonbu==='대구/경북고객본부'){
        this.selectedJisaArray=['구미지사','달서지사','동대구지사','서대구지사','안동지사','포항지사'];
        this.selectedJisa='구미지사';
      }

      if(this.selectedBonbu==='부산/경남고객본부'){
        this.selectedJisaArray=['남부산지사','동부산지사','북부산지사','서부산지사','울산지사','진주지사','창원지사'];
        this.selectedJisa='남부산지사';
      }

      if(this.selectedBonbu==='전남/전북고객본부'){
        this.selectedJisaArray=['광주지사','목포지사','순천지사','익산지사','전주지사'];
        this.selectedJisa='광주지사';
      }
      if(this.selectedBonbu==='서부고객본부'){
        this.selectedJisaArray=['강서지사','구로지사','부천지사','서인천지사','안산지사','안양지사','인천지사'];
        this.selectedJisa='강서지사';
      }

            
      this.$refs.changeBonbu7.changedBonbu(selectedBonbu);
      
     
      //   this.$refs.changeBonbu2.changeBonbu(selectedBonbu);
      //   this.$refs.changeBonbu3.changeBonbu(selectedBonbu);
    //   this.$refs.changeBonbu4.changedBonbu(selectedBonbu);
    //   this.$refs.changeBonbu5.changeBonbu(selectedBonbu);
    //   this.$refs.changeBonbu6.changeBonbu(selectedBonbu);
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
