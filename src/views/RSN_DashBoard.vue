
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
          <!-- <template> -->
          <v-select
            v-model="selectedBonbu"
            :items="['북부고객본부', '동부고객본부', '서부고객본부', '강남고객본부','충남/충북고객본부','전남/전북고객본부','부산/경남고객본부','대구/경북고객본부']"
            label="광역본부"
            outlined
            prepend-inner-icon="mdi-content-copy"
             
            @change="changedBonbuProduct(selectedBonbu,selectedProduct)"
          >
            <!-- <template v-slot:item="{ item, attrs, on }">
                <v-list-item
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-list-item-title
                    :id="attrs['aria-labelledby']"
                    v-text="item"
                  />
                </v-list-item>
              </template> -->
          </v-select>
          <!-- </template> -->
        </v-col>

       
        <!-- 상품별 조회 -->
        <v-col>
          <!-- <template> -->
          <v-select
            v-model="selectedProduct"             
            :items="['인터넷','미디어','무선']"
            label="상품"
            outlined
            prepend-inner-icon="mdi-content-copy"
              
            @change="changedBonbuProduct(selectedBonbu,selectedProduct)"
          >
            <!-- <template v-slot:item="{ item, attrs, on }">
                <v-list-item
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-list-item-title
                    :id="attrs['aria-labelledby']"
                    v-text="item"
                  />
                </v-list-item>
              </template> -->
          </v-select>
          <!-- </template> -->
        </v-col>
        <v-spacer />
      </v-row>
     
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
                {{ lastBonbuNewData.toLocaleString() }}
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
                {{ bonbuNewData.toLocaleString() }}
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
                class="font-weight-bold text-md-h5 text-lg-h4"
              >
                {{ diffNewData }} 
              </v-card-text>
            </v-card>
          </div>
        </v-col>


        <!-- 해지 데이터 -->
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
                {{ lastBonbuEndData.toLocaleString() }}
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
                {{ bonbuEndData.toLocaleString() }}
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
                class="font-weight-bold text-md-h5 text-lg-h4"
              >
                {{ diffEndData }} 
              </v-card-text>
            </v-card>
          </div>
        </v-col>

      
        <!-- 순 증감 데이터 -->
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
                {{ lastBonbuNetData.toLocaleString() }}
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
                {{ bonbuNetData.toLocaleString() }}
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
                증감건수
              </v-card-subtitle>
              <v-card-text
                class="font-weight-bold text-md-h5 text-lg-h4"
              >
                {{ diffNetData }} 
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
          <v-tooltip top>
            <template v-slot:activator="{on,attrs}">
              <span
                v-bind="attrs"
                v-on="on"
              >
                <p class="text-h6 text-center">
                  [ 신규 - {{ selectedBonbu.substring(0,2) }} - {{ selectedProduct }}]
                </p>
              </span>
            </template>
           
            <span class="text-h6 text-center">
              '{{ selectedStartDate.substring(2,4)+'.'+selectedStartDate.substring(4,6)+'.'+selectedStartDate.substring(6,8) }} 
              ~ {{ selectedEndDate.substring(2,4)+'.'+selectedEndDate.substring(4,6)+'.'+selectedEndDate.substring(6,8) }} 
            </span>
          </v-tooltip>

          <jisa-sales-table 
            ref="changeProduct1"          
            :propsdata="start"
            @bonbuNewData="bonbuNewDataFunc"
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
                  [ 해지 - {{ selectedBonbu.substring(0,2) }} - {{ selectedProduct }}]
                </p>
              </span>
            </template>
           
            <span class="text-h6 text-center">
              '{{ selectedStartDate.substring(2,4)+'.'+selectedStartDate.substring(4,6)+'.'+selectedStartDate.substring(6,8) }} 
              ~ {{ selectedEndDate.substring(2,4)+'.'+selectedEndDate.substring(4,6)+'.'+selectedEndDate.substring(6,8) }} 
            </span>
          </v-tooltip>
          <jisa-sales-table 
            ref="changeProduct2"
            :propsdata="end"
            @bonbuEndData="bonbuEndDataFunc"
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
                  [ 순증(NET) - {{ selectedBonbu.substring(0,2) }} - {{ selectedProduct }}]
                </p>
              </span>
            </template>
           
            <span class="text-h6 text-center">
              '{{ selectedStartDate.substring(2,4)+'.'+selectedStartDate.substring(4,6)+'.'+selectedStartDate.substring(6,8) }} 
              ~ {{ selectedEndDate.substring(2,4)+'.'+selectedEndDate.substring(4,6)+'.'+selectedEndDate.substring(6,8) }} 
            </span>
          </v-tooltip>
          <jisa-sales-table
            ref="changeProduct3"
            :propsdata="net"
            @bonbuNetData="bonbuNetDataFunc"
          />
        </v-col>
      </v-row> 
      <v-row
        class="mt-5"
      >
        <v-col
          cols="12"
          md="6"
        >
          <v-tooltip top>
            <template v-slot:activator="{on,attrs}">
              <span
                v-bind="attrs"
                v-on="on"
              >
                <p class="text-h6 text-center">
                  [{{ selectedBonbu.substring(0,2) }} - 유선 - 해지징후 VOC ]
                </p>
              </span>
            </template>
           
            <span class="text-h6 text-center">
              '{{ selectedStartDate.substring(2,4)+'.'+selectedStartDate.substring(4,6)+'.'+selectedStartDate.substring(6,8) }} 
              ~ {{ selectedEndDate.substring(2,4)+'.'+selectedEndDate.substring(4,6)+'.'+selectedEndDate.substring(6,8) }} 
            </span>
          </v-tooltip>
          <jisa-dash-board-voc-bar
            ref="changeProduct4"
            :height="100"
            :propsdata="rit"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-tooltip top>
            <template v-slot:activator="{on,attrs}">
              <span
                v-bind="attrs"
                v-on="on"
              >
                <p class="text-h6 text-center">
                  [{{ selectedBonbu.substring(0,2) }} - 무선 - 해지징후 VOC ]
                </p>
              </span>
            </template>
           
            <span class="text-h6 text-center">
              '{{ selectedStartDate.substring(2,4)+'.'+selectedStartDate.substring(4,6)+'.'+selectedStartDate.substring(6,8) }} 
              ~ {{ selectedEndDate.substring(2,4)+'.'+selectedEndDate.substring(4,6)+'.'+selectedEndDate.substring(6,8) }} 
            </span>
          </v-tooltip>
          <jisa-dash-board-voc-bar
            ref="changeProduct5"
            :height="100"
            :propsdata="rm"
          />
        </v-col>
      </v-row> 
      <v-row
        class="mt-5"
      >
        <v-col
          cols="12"
          md="6"
        >
          <v-tooltip top>
            <template v-slot:activator="{on,attrs}">
              <span
                v-bind="attrs"
                v-on="on"
              >
                <p class="text-h6 text-center">
                  [{{ selectedBonbu.substring(0,2) }} - 유선 - 품질 VOC ]
                </p>
              </span>
            </template>
           
            <span class="text-h6 text-center">
              '{{ selectedStartDate.substring(2,4)+'.'+selectedStartDate.substring(4,6)+'.'+selectedStartDate.substring(6,8) }} 
              ~ {{ selectedEndDate.substring(2,4)+'.'+selectedEndDate.substring(4,6)+'.'+selectedEndDate.substring(6,8) }} 
            </span>
          </v-tooltip>
          <jisa-dash-board-voc-bar
            ref="changeProduct6"
            :height="100"
            :propsdata="qit"
          />
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <v-tooltip top>
            <template v-slot:activator="{on,attrs}">
              <span
                v-bind="attrs"
                v-on="on"
              >
                <p class="text-h6 text-center">
                  [{{ selectedBonbu.substring(0,2) }} - 무선 - 품질 VOC ]
                </p>
              </span>
            </template>
           
            <span class="text-h6 text-center">
              '{{ selectedStartDate.substring(2,4)+'.'+selectedStartDate.substring(4,6)+'.'+selectedStartDate.substring(6,8) }} 
              ~ {{ selectedEndDate.substring(2,4)+'.'+selectedEndDate.substring(4,6)+'.'+selectedEndDate.substring(6,8) }} 
            </span>
          </v-tooltip>
          <jisa-dash-board-voc-bar
            ref="changeProduct7"
            :height="100"
            :propsdata="qm"
          />
        </v-col>
      </v-row> 
      <v-divider
        class="ma-5"
      />
    </v-card>
  </v-container>
</template>


<script>
import eventBus from '@/js/eventBus.js'
import axios from 'axios';
// import BonbuSalesTable from '@/components/tables/salestable/bonbuSalesTable';
import JisaSalesTable from '@/components/tables/salestable/jisaSalesTable';
import VueHotelDatePickerSales from '@/components/datepicker/vue-hotel-datepicker-sales';

import JisaDashBoardVocBar from '@/components/bars/vocbars/jisaDashBoardVocBar'


export default {
  name:'RSNBonbuSalesPerf',
  components:{

    // BonbuSalesTable, //증가/해지/순즘감 컴포넌트
    JisaSalesTable,

    JisaDashBoardVocBar,
    
    // BonbuSalesChart, // 본부별/상품별 시계열 그래프
    VueHotelDatePickerSales,
    
  },

  data(){
    return{
      selectedBonbu:'북부고객본부',
      selectedJisaArray:['고양지사','광진지사','광화문지사','노원지사','서대문지사'],
      selectedBonbu1:'북부고객본부',    
      
      selectedJisa:'고양지사',
      selectedJijum:'CS부',
     
      selectedProduct:'인터넷',
      
      selectedStartDate:'20210220',
      selectedEndDate:'20210226',

      lastWeekStartDate:'20210213',
      lastWeekEndDate:'20210219',

      bonbuNewData:0,
      lastBonbuNewData:0,
      diffNewData:'^^;',

      bonbuEndData:0,
      lastBonbuEndData:0,
      diffEndData:'^^;',
     
      bonbuNetData:0,
      lastBonbuNetData:0,
      diffNetData:'^^;',  
      
      //wordcloud
      tvInternetVoc:this.tvInternetVoc,
      mobileVoc:this.mobileVoc,

      start:"start",  //순증테이블 컴포넌트로 props전달
      end:"end",
      net:"net",

      rit:"rit",
      rm:"rm",
      qit:"qit",
      qm:"qm",

      internet:"인터넷",
      tv:"미디어",
      wireless:'무선',

    }
  },

  async created(){
    eventBus.$on('pickedDates',(dateResult)=>{  //RSN_HjVoc.vue에서 기간 선택시 그 자식 컨포넌트인 vue-hotel-datepicker.vue에서 시작일자와 종료일자를 받아옴  
      const imsiThisStart=dateResult.start.replace(/\//gi,',');
      const imsiThisEnd=dateResult.end.replace(/\//gi,',');

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

    // this.changedBonbu(this.selectedBonbu);

  },

  methods:{

    displayDateText (datetime) {
      if (datetime) {
        datetime = typeof (datetime) === 'string' ? new Date(datetime) : datetime
        const yyyy = datetime.getFullYear()
        const mm = datetime.getMonth() + 1 > 9 ? datetime.getMonth() + 1 : `0${datetime.getMonth() + 1}`
        const dd = datetime.getDate() > 9 ? datetime.getDate() : `0${datetime.getDate()}`
        const displayStr = (this.format || 'YYYY/MM/DD').replace('YYYY', yyyy).replace('MM', mm).replace('DD', dd)
        return displayStr
      } else {
        return undefined
      }
    },
   
    changedBonbuProduct(selectedBonbu,selectedProduct){  //테이블
  
      this.$refs.changeProduct1.changeBonbuProduct(selectedBonbu,selectedProduct);  //chart
      this.$refs.changeProduct2.changeBonbuProduct(selectedBonbu,selectedProduct);
      this.$refs.changeProduct3.changeBonbuProduct(selectedBonbu,selectedProduct);

      this.$refs.changeProduct4.changeBonbuProduct(selectedBonbu,selectedProduct);  //bar
      this.$refs.changeProduct5.changeBonbuProduct(selectedBonbu,selectedProduct);
      this.$refs.changeProduct6.changeBonbuProduct(selectedBonbu,selectedProduct);
      this.$refs.changeProduct7.changeBonbuProduct(selectedBonbu,selectedProduct);
       
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
  
    },
    
    //신규/해지/순증감 데이터
    bonbuNewDataFunc(lastData,thisData){
     
      this.lastBonbuNewData=lastData;
      this.bonbuNewData=thisData;
      this.diffNewData=((this.bonbuNewData-this.lastBonbuNewData)/this.lastBonbuNewData*100).toFixed(1)
    },

    bonbuEndDataFunc(lastData,thisData){
      this.bonbuEndData=thisData;
      this.lastBonbuEndData=lastData;
      this.diffEndData=((this.bonbuEndData-this.lastBonbuEndData)/this.lastBonbuEndData*100).toFixed(1)
    },

    bonbuNetDataFunc(lastData,thisData){
      this.bonbuNetData=thisData;
      this.lastBonbuNetData=lastData;
      this.diffNetData=(this.bonbuNetData-this.lastBonbuNetData)
    },
    
  }

}
</script>

<style>
  div.col{
    padding-bottom:0;
  }
</style>
