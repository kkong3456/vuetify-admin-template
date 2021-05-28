<template>
  <div>
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
        />
      </template>
      <template v-slot:body.append>
        <tr
          cols="12"
          lg="6"    
        >
          <td />
          <td>
            <v-text-field
              v-model="thisHjCount"
              type="number"
              label="당월해지 건수기준 조회(이하)"
            />
          </td>
          <td colspan="4" />
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from 'axios';
const jisaVocUrl='http://172.21.220.97/api/voc/rit.json/?&kind=jisa&bonbu='

const bonbuJisaObj={
  '북부고객본부':['고양지사','광진지사','광화문지사','노원지사','서대문지사'],
  '동부고객본부':['강릉지사','구리지사','원주지사','의정부지사','춘천지사'],
  '강남고객본부':['강남지사','분당지사','송파지사','수원지사','용인지사','평택지사'],
  '충남/충북고객본부':['대전지사','서대전지사','천안지사','청주지사','충주지사','홍성지사'],
  '대구/경북고객본부':['구미지사','달서지사','동대구지사','서대구지사','안동지사','포항지사'],
  '부산/경남고객본부':['남부산지사','동부산지사','북부산지사','서부산지사','울산지사','진주지사','창원지사'],
  '전남/전북고객본부':['광주지사','목포지사','순천지사','익산지사','전주지사'],
  '서부고객본부':['강서지사','구로지사','부천지사','서인천지사','안산지사','안양지사','인천지사']
}

export default {
  data () {
    return {
      bonbuNetIncreaseData:null,
      bonbuNetIncreaseValueObj:null,  
      totalHjUrlPage:null,         //api url page의 제일 마지막 부분 확인
            
      search:'',        // 테이블 서치
      thisHjCount:'',     //테이블의 당월해지 기준 소트
      desserts:this.desserts,
      
    }
  },

  computed:{
    
  },//data

  async created () {
    await axios.get(jisaVocUrl+'북부고객본부').then((res)=>{
      this.bonbuNetIncreaseData=res.data.results;
      //console.log('this.bonbuNetIncreaseData is ',this.bonbuNetIncreaseData);
     
    }).catch((err)=>{
      console.log('데이터를 가져 오지 못했습니다.',err)
    });

    this.getDesserts('북부고객본부');

    
  
  },

  methods: {  

    async changeBonbu(bonbuName){
      await axios.get(jisaVocUrl+bonbuName).then((res)=>{
        this.bonbuNetIncreaseData=res.data.results;
       
      }).catch((err)=>{
        console.log('데이터를 가져오지 못했습니다.',err);
      })

      this.getDesserts();
    },
    headers(){
      return [
        {
          text:'일자',
          align:'start',
          sortable:false,
          value:'date',
        },
        
        {
          text:this.yyy.firstJisa.jojik[0],
          value:this.yyy.firstJisa.countSum,
          // filter:value=>{
          //   if(!this.thisHjCount) return true
          //   return value < parseInt(this.thisHjCount)
          // },
        },
        {
          text:this.yyy.secondJisa.jojik[0],
          value:this.yyy.secondJisa.countSum,
        },
        {
          text:this.yyy.thirdJisa.jojik[0],
          value:this.yyy.thirdJisa.countSum,
        },
        {
          text:this.yyy.fourthJisa.jojik[0],
          value:this.yyy.fourthJisa.countSum,
        },
        {
          text:this.yyy.fifthJisa.jojik[0],
          value:this.yyy.fifthJisa.countSum,
        },
      ]
    },
    getDesserts(bonbuName){
      const yyy=this.getBonbuNetIncreaseValue(bonbuName);
      console.log('조직 is ',yyy.firstJisa.jojik[0]);
      const dessertArray=new Array();
      if(bonbuName==='북부고객본부' || bonbuName==='동부고객본부'||bonbuName==='전남/전북고객본부'){
        this.datasets={
          date:yyy.firstJisa.sysdate,

        }
      }
  

      // for(let i=0;i<yyy.date.length;i++){
      //   let obj={
      //     name:yyy.jojik[i],                                      //테이블에 보여주는 포맷
      //     date:yyy.date[i]?yyy.date[i]:0,
      //     countSum:yyy.countSum[i]?yyy.countSum[i]:0,
      //   }

      //   dessertsArray.push(obj); 
      //   //console.log('dessertArray',dessertsArray[0]);        
      //   this.desserts=Object.values(dessertsArray);          
      //   //this.desserts=this.desserts.reverse()
      // }
    } , 
    getBonbuNetIncreaseValue(url){    //axios로 받아온 데이터를 상품별로 Obj로 만든다
      let jisaRitVocObj={}
      let firstJisaObj={};
      let secondJisaObj={}
      let thirdJisaObj={}
      let fourthJisaObj={}
      let fifthJisaObj={}
      let sixthJisaObj={}
      let seventhJisaObj={}
      console.log('url is ',url);


      const firstSysdateArray=new Array()
      const firstJojik3Array=new Array()
      const firstCountSumArray=new Array()

      const secondSysdateArray=new Array()
      const secondJojik3Array=new Array()
      const secondCountSumArray=new Array()

      const thirdSysdateArray=new Array()
      const thirdJojik3Array=new Array()
      const thirdCountSumArray=new Array()

      const fourthSysdateArray=new Array()
      const fourthJojik3Array=new Array()
      const fourthCountSumArray=new Array()

      const fifthSysdateArray=new Array()
      const fifthJojik3Array=new Array()
      const fifthCountSumArray=new Array()

      const sixthSysdateArray=new Array()
      const sixthJojik3Array=new Array()
      const sixthCountSumArray=new Array()

      const seventhSysdateArray=new Array()
      const seventhJojik3Array=new Array()
      const seventhCountSumArray=new Array()


      this.bonbuNetIncreaseData.map((item)=>{ 
        //console.log('item is ',item); 
      
        if(item.sy_jojik3===bonbuJisaObj[url][0]){
          firstSysdateArray.push(item.voc_rcv_date);
          //jojik2Array.push(item.jojik.replace('/','').substring(0,4));
          firstJojik3Array.push(item.sy_jojik3);
          firstCountSumArray.push(item.count_sum);
        };

        if(item.sy_jojik3===bonbuJisaObj[url][1]){
          secondSysdateArray.push(item.voc_rcv_date);
          //jojik2Array.push(item.jojik.replace('/','').substring(0,4));
          secondJojik3Array.push(item.sy_jojik3);
          secondCountSumArray.push(item.count_sum);
        };

        if(item.sy_jojik3===bonbuJisaObj[url][2]){
          thirdSysdateArray.push(item.voc_rcv_date);
          //jojik2Array.push(item.jojik.replace('/','').substring(0,4));
          thirdJojik3Array.push(item.sy_jojik3);
          thirdCountSumArray.push(item.count_sum);
        };

        if(item.sy_jojik3===bonbuJisaObj[url][3]){
          fourthSysdateArray.push(item.voc_rcv_date);
          //jojik2Array.push(item.jojik.replace('/','').substring(0,4));
          fourthJojik3Array.push(item.sy_jojik3);
          fourthCountSumArray.push(item.count_sum);
        };

        if(item.sy_jojik3===bonbuJisaObj[url][4]){
          fifthSysdateArray.push(item.voc_rcv_date);
          //jojik2Array.push(item.jojik.replace('/','').substring(0,4));
          fifthJojik3Array.push(item.sy_jojik3);
          fifthCountSumArray.push(item.count_sum);
        };

        if(item.sy_jojik3===bonbuJisaObj[url][5]){
          sixthSysdateArray.push(item.voc_rcv_date);
          //jojik2Array.push(item.jojik.replace('/','').substring(0,4));
          sixthJojik3Array.push(item.sy_jojik3);
          sixthCountSumArray.push(item.count_sum);
        };
       
        if(item.sy_jojik3===bonbuJisaObj[url][6]){
          seventhSysdateArray.push(item.voc_rcv_date);
          //jojik2Array.push(item.jojik.replace('/','').substring(0,4));
          seventhJojik3Array.push(item.sy_jojik3);
          seventhCountSumArray.push(item.count_sum);
        };
      });

      //console.log('fifthSysdataArray is ',fifthSysdateArray);

      firstJisaObj={
        'sysdate':firstSysdateArray,
        'jojik':firstJojik3Array,
        'countSum':firstCountSumArray
      }
      
      secondJisaObj={
        'sysdate':secondSysdateArray,
        'jojik':secondJojik3Array,
        'countSum':secondCountSumArray
      }

      thirdJisaObj={
        'sysdate':thirdSysdateArray,
        'jojik':thirdJojik3Array,
        'countSum':thirdCountSumArray
      }

      fourthJisaObj={
        'sysdate':fourthSysdateArray,
        'jojik':fourthJojik3Array,
        'countSum':fourthCountSumArray
      }
      fifthJisaObj={
        'sysdate':fifthSysdateArray,
        'jojik':fifthJojik3Array,
        'countSum':fifthCountSumArray
      }
      sixthJisaObj={
        'sysdate':sixthSysdateArray,
        'jojik': sixthJojik3Array,
        'countSum':sixthCountSumArray
      }

      seventhJisaObj={
        'sysdate':seventhSysdateArray,
        'jojik':seventhJojik3Array,
        'countSum':seventhCountSumArray,
      }

      //console.log('firsthJisaObj is ',firstJisaObj);
      

      jisaRitVocObj={
        'firstJisa': firstJisaObj,
        'secondJisa': secondJisaObj,
        'thirdJisa': thirdJisaObj,
        'fourthJisa':fourthJisaObj,
        'fifthJisa':fifthJisaObj,
        'sixthJisa':sixthJisaObj,
        'seventhJisa':seventhJisaObj,
      }
      
      return jisaRitVocObj;
    }
  }  // method end    
}
</script>

<style scoped>

</style>
