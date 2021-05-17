<template>
<div>
<v-card>
    <div class="text-h5 text-center font-weight-medium text--secondary">[TV 상품]</div>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :items-per-page="10"
    class="elevation-1"
    :search="search"
    :custom-filter="filterOnlyCaptsText"
  >
    <template v-slot:top>
        <v-text-field
            v-model="search"
            label="기관명/일자으로 조회"
            class="mx-4"
        ></v-text-field>
    </template>
    <template v-slot:body.append>
        <tr
            cols="12"
            lg="6"    
        >
            <td></td>
            <td>
                <v-text-field
                    v-model="thisHjCount"
                    type="number"
                    label="당월해지 건수기준 조회(이하)"
                ></v-text-field>
            </td>
            <td colspan="4"></td>
        </tr>
    </template>
  </v-data-table>
<!-- <button v-on:click="getBonbuDesserts()">vvv</button> -->
</v-card>
</div>
</template>



<script>
  import axios from 'axios';



  const allHjUrl='http://172.21.220.97/api/dash.json?page=1';
  const allHjUrl2='http://172.21.220.97/api/dash.json?page=';
  //const allHjUrl3='http://172.21.220.97/api/dash.json?page=3';

 
  export default {
    // name:MobileHjTable,
    data () {
      return {
        bonbuNetIncreaseData:null,
        bonbuNetIncreaseValueObj:null,  
        totalHjUrlPage:null,         //api url page의 제일 마지막 부분 확인
        
        search:'',        // 테이블 서치
        thisHjCount:'',     //테이블의 당월해지 기준 소트
        desserts:this.dessertsArray,
      }
    },//data

    async created () {
      await axios.get(allHjUrl).then((res,err)=>{
          this.totalHjUrlPage=res.data.count;   // 약 8000여개 이상의 데이터가 있고, 1page당 100개 row가 있음
          this.totalHjUrlPage=Math.ceil(this.totalHjUrlPage/100);
      }).catch((err)=>{
          console.log(err);
      });

      await axios.all(
          [
            axios.get(allHjUrl2+this.totalHjUrlPage),
            axios.get(allHjUrl2+(this.totalHjUrlPage-1)),
            axios.get(allHjUrl2+(this.totalHjUrlPage-2)),
            axios.get(allHjUrl2+(this.totalHjUrlPage-3)),
            axios.get(allHjUrl2+(this.totalHjUrlPage-4)),
            axios.get(allHjUrl2+(this.totalHjUrlPage-5)),
            axios.get(allHjUrl2+(this.totalHjUrlPage-6)),
            axios.get(allHjUrl2+(this.totalHjUrlPage-7)),
            axios.get(allHjUrl2+(this.totalHjUrlPage-8)),
            axios.get(allHjUrl2+(this.totalHjUrlPage-9)),
          ]
        ).then(axios.spread((...res)=>{
            const resp1=res[0].data.results;
            const resp2=res[1].data.results;
            const resp3=res[2].data.results;
            const resp4=res[3].data.results;
            const resp5=res[4].data.results;
            const resp6=res[5].data.results;
            const resp7=res[6].data.results;
            const resp8=res[7].data.results;
            const resp9=res[8].data.results;
            const resp10=res[9].data.results;
            const resp=[...resp1,...resp2,...resp3,...resp4,...resp5,...resp6,...resp7,...resp8,...resp9,...resp10];
        
            this.bonbuNetIncreaseData=resp;
        })).catch((err)=>{
          console.log("데이터를 가져 오지 못했습니다.",err);
        });

        this.getBonbuNetIncreaseValue();
        this.getDesserts();
    },

    mounted(){
    
    },
    computed:{
        headers(){
            return [
                {
                    text:'기관명',
                    align:'start',
                    sortable:false,
                    value:'name',
                },
                {
                    text:'일자',
                    value:'date',
                },
                {
                    text:'당월해지',
                    value:'thisHjCount',
                    filter:value=>{
                        if(!this.thisHjCount) return true
                        return value < parseInt(this.thisHjCount)
                    },
                },
                {
                    text:'당월비율',
                    value:'thisHjRatio',
                },
                {
                    text:'전월해지',
                    value:'thatHjCount',
                },
                {
                    text:'전월비율',
                    value:'thisHjRatio',
                },
                {
                    text:'개선율',
                    value:'upRatio',
                },
                {
                    text:'랭킹',
                    value:'rank',
                }
            ]
        }
    },

    methods: {  
      getDesserts(){
        const yyy=this.getBonbuNetIncreaseValue();
        //console.log(yyy.rank);
        const dessertsArray=new Array();

        for(let i=0;i<yyy.date.length;i++){
            let obj={
                name:yyy.jojik[i],                                      //테이블에 보여주는 포맷
                date:yyy.date[i]?yyy.date[i]:0,
                thisHjCount:yyy.thisHjCount[i]?yyy.thisHjCount[i]:0,
                thisHjRatio:yyy.thisHjRatio[i]?yyy.thisHjRatio[i]:0,
                thatHjCount:yyy.thatHjCount[i]?yyy.thatHjCount[i]:0,
                thatHjRatio:yyy.thatHjRatio[i]?yyy.thatHjRatio[i]:0,
                upRatio:yyy.upRatio[i]?yyy.upRatio[i]:0,
                rank:yyy.rank[i]?yyy.rank[i]:0,
            }

            dessertsArray.push(obj);         
            this.kkk=Object.values(dessertsArray);          
            this.desserts=this.kkk.reverse()
        }
      } , 
      getBonbuNetIncreaseValue(){    //axios로 받아온 데이터를 상품별로 Obj로 만든다
        let mobileHjObj={}
        let jojikArray=new Array()
        let dateArray=new Array()
        let thisHjCountArray=new Array()
        let thisHjRatioArray=new Array()
        let thatHjCountArray=new Array()
        let thatHjRatioArray=new Array()
        let upRatioArray=new Array()
        let rankArray=new Array()


        this.bonbuNetIncreaseData.map((item)=>{
            //console.log(item);
            if(item.product==='tv'){  
                dateArray.push(item.sysdate);
                jojikArray.push(item.jojik);
                thisHjCountArray.push(item.this_hj_count);
                thisHjRatioArray.push(item.this_hj_ratio);
                thatHjCountArray.push(item.that_hj_count);
                thatHjRatioArray.push(item.that_hj_ratio);
                upRatioArray.push(item.up_ratio);
                rankArray.push(item.rank);                        
            }
        });

        //console.log('조직은',rankArray);
        
       
        mobileHjObj={
           date:dateArray,
           jojik:jojikArray,
           thisHjCount:thisHjCountArray,
           thisHjRatio:thisHjRatioArray,
           thatHjCount:thatHjCountArray,
           thatHjRatio:thatHjRatioArray,
           upRatio:upRatioArray,
           rank:rankArray,
        }
        return mobileHjObj;
      },

     }
  }
</script>
