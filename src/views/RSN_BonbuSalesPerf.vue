
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
              @change="changedBonbu(selectedBonbu,selectedProduct)"
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
                {{ ((bonbuNewData-lastBonbuNewData)/lastBonbuNewData*100).toFixed(1) }} 
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
                {{ ((bonbuEndData-lastBonbuEndData)/lastBonbuEndData*100).toFixed(1) }} 
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
                {{ (bonbuNetData-lastBonbuNetData).toLocaleString() }} 
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
            @bonbuNewData="bonbuNewDataFunc"
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
            @bonbuEndData="bonbuEndDataFunc"
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
            @bonbuNetData="bonbuNetDataFunc"
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

      bonbuNewData:0,
      lastBonbuNewData:0,
   

      bonbuEndData:0,
      lastBonbuEndData:0,
     
      bonbuNetData:0,
      lastBonbuNetData:0,  
      
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

    changedProduct(selectedBonbu,selectedProduct){
      this.$refs.changeProduct1.changeProduct(selectedProduct);  
      this.$refs.changeProduct2.changeProduct(selectedProduct);
      this.$refs.changeProduct3.changeProduct(selectedProduct);
      eventBus.$emit('changedBonbu',selectedBonbu,selectedProduct)
    },


    changedBonbu(selectedBonbu,selectedProduct){  
      eventBus.$emit('changedBonbu',selectedBonbu,selectedProduct);
    },

    bonbuNewDataFunc(thisData,lastData){
      this.bonbuNewData=thisData;
      this.lastBonbuNewData=lastData;
    },

    bonbuEndDataFunc(thisData,lastData){
      this.bonbuEndData=thisData;
      this.lastBonbuEndData=lastData;
    },

    bonbuNetDataFunc(thisData,lastData){
      this.bonbuNetData=thisData;
      this.lastBonbuNetData=lastData;
    },

  
   
    
  }

}
</script>

<style scoped>

</style>
