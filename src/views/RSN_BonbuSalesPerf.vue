
<template>
  <v-container fluid>
    <v-card>
      <v-row>
        <!-- 기간별 조회 -->
        <v-col>
          <vue-hotel-date-picker-sales />
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
        <!-- 상품별 조회 -->
        <v-col>
          <template>
            <v-select
              v-model="selectedProduct"             
              :items="['인터넷','미디어','무선']"
              label="상품"
              @change="changedProduct(selectedProduct)"
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
        <v-spacer />
      </v-row>

      <!-- 전체 cloud VOC -->
  
      <!-- <v-row
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
      </v-row> -->
    
     
      <v-row>
        <p
          style="margin:0 20px;font-size:.8rem;"
        >
          ※ 조회기간기준 1주전 데이터 비교
        </p>
      </v-row>

      <!-- 신규 비교 -->
      <v-row style="margin-top:0;">
        <v-col>
          <v-card
            class="text-center pa-2 font-weight-bold"
            color="blue lighten-2"
            tile
          >
            신규 ({{ selectedBonbu }} - {{ selectedProduct }})
          </v-card>
          <div
            class="d-flex"
            style="height:80px;"
          >
            <v-card 
              outlined
              class="text-center"
              width="34%"
              tile
            >
              <v-card-subtitle
                class="text-left py-0"
              >
                1주전
              </v-card-subtitle>
              <v-card-text
                class="font-weight-bold text-md-h5 text-lg-h4 py-0"
              >
                {{ bonbuVocItLastSum }}
              </v-card-text>
            </v-card>  
            

            <v-card 
              outlined
              class="text-center"
              width="34%"
              tile
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
            <v-card 
              outlined    
              class="text-center"
              tile
              width="32%"
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
          </div>
        </v-col>


        <!-- 전주비교 지사-유선 -->
        <v-col>
          <v-card
            class="text-center pa-2 font-weight-bold"
            color="blue lighten-2"
            tile
          >
            해지 ({{ selectedBonbu }} - {{ selectedProduct }})
          </v-card>
          <div
            class="d-flex"
            style="height:80px;"
          >
            <v-card 
              outlined
              class="text-center"
              width="34%"
              tile
            >
              <v-card-subtitle
                class="text-left py-0"
              >
                1주전
              </v-card-subtitle>
              <v-card-text
                class="font-weight-bold text-md-h5 text-lg-h4 py-0"
              >
                {{ bonbuVocItLastSum }}
              </v-card-text>
            </v-card>  
            

            <v-card 
              outlined
              class="text-center"
              width="34%"
              tile
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
            <v-card 
              outlined    
              class="text-center"
              tile
              width="32%"
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
          </div>
        </v-col>

      
        <v-col>
          <v-card
            class="text-center pa-2 font-weight-bold"
            color="blue lighten-2"
            tile
          >
            순 증감 ({{ selectedBonbu }} - {{ selectedProduct }})
          </v-card>
          <div
            class="d-flex"
            style="height:80px;"
          >
            <v-card 
              outlined
              class="text-center"
              width="34%"
              tile
            >
              <v-card-subtitle
                class="text-left py-0"
              >
                1주전
              </v-card-subtitle>
              <v-card-text
                class="font-weight-bold text-md-h5 text-lg-h4 py-0"
              >
                {{ bonbuVocItLastSum }}
              </v-card-text>
            </v-card>  
            

            <v-card 
              outlined
              class="text-center"
              width="34%"
              tile
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
            <v-card 
              outlined    
              class="text-center"
              tile
              width="32%"
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
          <p class="text-h6 text-center">
            [ 본부별 신규 가입자 현황]<br>
            <span class="text-h6 text-center">
              '{{ selectedStartDate.substring(2,4)+'.'+selectedStartDate.substring(4,6)+'.'+selectedStartDate.substring(6,8) }} 
              ~ {{ selectedEndDate.substring(2,4)+'.'+selectedEndDate.substring(4,6)+'.'+selectedEndDate.substring(6,8) }} 
            </span>
          </p>
          <bonbu-sales-table 
            ref="changeProduct1"
            :propsdata="start"
          />
        </v-col>
    
        <v-col
          cols="12"
          md="4"
        >
          <p class="text-h6 text-center">
            [해지 가입자 현황]<br>
            <span
              class="text-center text-h6"
            >
              '{{ selectedStartDate.substring(2,4)+'.'+selectedStartDate.substring(4,6)+'.'+selectedStartDate.substring(6,8) }} 
              ~ {{ selectedEndDate.substring(2,4)+'.'+selectedEndDate.substring(4,6)+'.'+selectedEndDate.substring(6,8) }} 
            </span>
          </p>
          <bonbu-sales-table 
            ref="changeProduct2"
            :propsdata="end"
          />
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <p class="text-h6 text-center">
            [순증(NET) 가입자 현황]<br>
            <span
              class="text-center text-h6"
            >
              '{{ selectedStartDate.substring(2,4)+'.'+selectedStartDate.substring(4,6)+'.'+selectedStartDate.substring(6,8) }} 
              ~ {{ selectedEndDate.substring(2,4)+'.'+selectedEndDate.substring(4,6)+'.'+selectedEndDate.substring(6,8) }} 
            </span>
          </p>
          <bonbu-sales-table
            ref="changeProduct3"
            :propsdata="net"
          />
        </v-col>
      </v-row>   
    
      <!-- 그래프-->
    </v-card>
  </v-container>
</template>


<script>
import eventBus from '@/js/eventBus.js'


import BonbuSalesTable from '@/components/tables/bonbusalestable/bonbuSalesTable';

import VueHotelDatePickerSales from '@/components/datepicker/vue-hotel-datepicker-sales';



export default {
  name:'RSNBonbuSalesPerf',
  components:{

    BonbuSalesTable, //증가/해지/순즘감 컴포넌트
    VueHotelDatePickerSales,
    
  },

  data(){
    return{
      selectedBonbu:'북부고객본부',
      // selectedJisaArray:['고양지사','광진지사','광화문지사','노원지사','서대문지사'],
      // selectedJijumArray:['CS부','마케팅부','영업기획팀'],
      
      // selectedJisa:'고양지사',
      // selectedJijum:'CS부',
      selectedProduct:'인터넷',

      
      
      selectedStartDate:'20210220',
      selectedEndDate:'20210226',


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

      start:"start",  //순증테이블 컴포넌트로 props전달
      end:"end",
      net:"net",

    }
  },

  async created(){
    eventBus.$on('pickedDates',(dateResult)=>{  //RSN_HjVoc.vue에서 기간 선택시 그 자식 컨포넌트인 vue-hotel-datepicker.vue에서 시작일자와 종료일자를 받아옴  
      // const imsiThisStart=dateResult.start.replace(/\//gi,',');
      // const imsiThisEnd=dateResult.end.replace(/\//gi,',');

      this.selectedStartDate=dateResult.start.replace(/\//gi,'')  //현재 선택
      this.selectedEndDate=dateResult.end.replace(/\//gi,'')
      // console.log('selectedstartDate',this.selectedStartDate,this.selectedEndDate);

      this.lastWeekStart=new Date(imsiThisStart);
      this.lastWeekStart.setDate(this.lastWeekStart.getDate() - 7);
      this.lastWeekStart=this.displayDateText(this.lastWeekStart);
      this.lastWeekStartDate=this.lastWeekStart.replace(/\//gi,"");  //현재 선택 1주일전

      this.lastWeekEnd=new Date(imsiThisEnd);
      this.lastWeekEnd.setDate(this.lastWeekEnd.getDate()- 7);
      this.lastWeekEnd=this.displayDateText(this.lastWeekEnd);
      this.lastWeekEndDate=this.lastWeekEnd.replace(/\//gi,"");
    })

  },

  methods:{
    changedProduct(selectedProduct){
      this.$refs.changeProduct1.changeProduct(selectedProduct);  
      this.$refs.changeProduct2.changeProduct(selectedProduct);
      this.$refs.changeProduct3.changeProduct(selectedProduct);
    
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
