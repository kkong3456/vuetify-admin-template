<template>
  <v-row>
    <v-col style="height:890px;">
      <div id="map_div" />
    </v-col>
  </v-row>       
</template>

<script>
import axios from 'axios';
const  bugbuGoYangUrl='http://172.21.220.97/api/map/latlon.json/?yyyymm=202101&bonbu=북부고객본부&jisa=고양지사'
const  bugbuGwangJinUrl='http://172.21.220.97/api/map/latlon.json/?yyyymm=202101&bonbu=북부고객본부&jisa=광진지사'
const  bugbuGwangWhaMoonUrl='http://172.21.220.97/api/map/latlon.json/?yyyymm=202101&bonbu=북부고객본부&jisa=광화문지사';
const  bugbuNoWonUrl='http://172.21.220.97/api/map/latlon.json/?yyyymm=202101&bonbu=북부고객본부&jisa=노원지사';
const  bugbuSeoDaeMoonUrl='http://172.21.220.97/api/map/latlon.json/?yyyymm=202101&bonbu=북부고객본부&jisa=서대문지사';

const dongbuGangNeungUrl='http://172.21.220.97/api/map/latlon.json/?yyyymm=202101&bonbu=동부고객본부&jisa=강릉지사';
const dongbuGuriUrl='http://172.21.220.97/api/map/latlon.json/?yyyymm=202101&bonbu=동부고객본부&jisa=구리지사';
const dongbuWonjuUrl='http://172.21.220.97/api/map/latlon.json/?yyyymm=202101&bonbu=동부고객본부&jisa=원주지사';
const dongbuUijungbuUrl='http://172.21.220.97/api/map/latlon.json/?yyyymm=202101&bonbu=동부고객본부&jisa=의정부지사';
const dongbuChuncheonUrl='http://172.21.220.97/api/map/latlon.json/?yyyymm=202101&bonbu=동부고객본부&jisa=춘천지사';


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
  name:'RsRsLocationMap',
  data(){
    return{
      locationsData:new Array(),
    }
  },

  async created(){
    const bugbuGoYangReq=axios.get(bugbuGoYangUrl);
    const bugbuGwangJinReq=axios.get(bugbuGwangJinUrl);
    const bugbuGwangWhaMoonReq=axios.get(bugbuGwangWhaMoonUrl);
    const bugbuNoWonReq=axios.get(bugbuNoWonUrl);
    const bugbuSeoDaeMoonReq=axios.get(bugbuSeoDaeMoonUrl);

    const dongbuGangNeungReq=axios.get(dongbuGangNeungUrl);
    const dongbuGuriReq=axios.get(dongbuGuriUrl);
    const dongbuWonjuReq=axios.get(dongbuWonjuUrl);
    const dongbuUijungbuReq=axios.get(dongbuUijungbuUrl);
    const dongbuChuncheonReq=axios.get(dongbuChuncheonUrl);

    const key="82a9120746aa758b280c9be03affbaf6fe06f203eee2043da224220bb43d8a3d5516760f&addressText=서울특별시 서초구 우면동 17";
    
    await axios.get(`https://gis.kt.com/search/v1.0/utilities/geocode?key=${key}`).then((res)=>{
      console.log('우면동 연구소 위경도는 : ',res.data.residentialAddress[0].parcelAddress[0].geographicInformation.point);
     
    }).catch((err)=>{
      console.log('주소에 해당하는 위/경도를 찾지 못했습니다.');
    })
    
    await axios.all(
      [
        bugbuGoYangReq,bugbuGwangJinReq,bugbuGwangWhaMoonReq,bugbuNoWonReq,bugbuSeoDaeMoonReq,
        dongbuGangNeungReq,dongbuGuriReq,dongbuWonjuReq,dongbuUijungbuReq,dongbuChuncheonReq
      ]
    ).then(axios.spread((...res)=>{
      const response0=res[0].data.results;
      const response1=res[1].data.results;
      const response2=res[2].data.results;
      const response3=res[3].data.results;
      const response4=res[4].data.results;

      const response5=res[5].data.results;
      const response6=res[6].data.results;
      const response7=res[7].data.results;
      const response8=res[8].data.results;
      const response9=res[9].data.results;
      this.locationsData=[
        ...response0,
        ...response1,
        ...response2,
        ...response3,
        ...response4,
        ...response5,
        ...response6,
        ...response7,
        ...response8,
        ...response9,
      ]
      this.loadScript();
    })).catch((err)=>{
      console.log('지도 데이터를 가져오지 못했습니다.',err);
    });
    
  },

  // mounted(){
  //   this.loadScript();
  // },

  methods:{
    initialize(){
      const mapOpts={
        // center:new olleh.maps.UTMK(951755.70,1948215.52),
        center:new olleh.maps.LatLng(37.57730,127.00160),
        zoom:11,
        mapTypeId:'ROADMAP'
        //mapTypeId:'HYBRID',
      };
      const map=new olleh.maps.Map(document.getElementById('map_div'),mapOpts);

      const clusterer=new olleh.maps.overlay.MarkerClusterer({
        gap:80,
      });

      this.locationsData.forEach((item)=>{
        //console.log(item.ncn);
        const marker=new olleh.maps.overlay.Marker({
          position : new olleh.maps.LatLng(item.day_lat,item.day_lon),
          title:('지사 : '+item.sj_jojik3+'</br> ncn : '+item.ncn.toString()+'</br> lat : '+item.night_lat),
        });
        clusterer.add(marker);
      })

     
      clusterer.setMap(map);
      // const marker=new olleh.maps.overlay.Marker({
      //   // position:new olleh.maps.LatLng(37.57730,127.00160),

      //   position:new olleh.maps.UTMK(951755.70 + Math.random() * 4000,1948215.52 + Math.random() * 3000),
      //   animation:olleh.maps.overlay.Marker.BOUNCE,
      //   title:'강북/강원코어센터',
      //   map:map,
      // });

      marker.onEvent('click',function(event,payload){
        // map.zoomIn();
        console.dir('marker is ',marker);
        
      });
    },

    loadScript(){
      const head=document.getElementsByTagName('head')[0];
      const script=document.createElement('script');
      script.type='text/javascript';
      script.onreadystatechange=function(){
        if(this.readyState=='complete') this.initialize();
      }

      script.onload=this.initialize;
      script.src="https://gis.kt.com/maps/v3.0/sdk.js?key=82a9120746aa758b280c9be03affbaf6fe06f203eee2043da224220bb43d8a3d5516760f";
      head.appendChild(script);
    }
  }

}
</script>

<style scoped>
#map_div{height:100%};
html,body{height:100%};
</style>