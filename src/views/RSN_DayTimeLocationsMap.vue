<template>
  <v-container>
    <v-row>
      <v-col style="height:890px">
        <div id="map" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const  key='c7ceaa849e223258bd6f8586b37d5e80';
export default {
  name:'RsnDayTimeLoationMap',
  data(){
    return{
      locationsData:new Array()
    }
  },

  created(){
    // const script=document.createElement('script');
    // script.type="text/javascript";
    
    // script.src=`//dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&libraries=services,clusterer,drawing`
    // document.head.appendChild(script);
    // window.onload=()=>this.initialize();
  

    // document.cookie="same-site-cookie=foo;SameSite=Lax";
    document.cookie="SameSite=None;Secure";

  }, //created
 
 
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
 
      const script = document.createElement('script');
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
      `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${key}&libraries=services,clusterer,drawing`;
      document.head.appendChild(script);
    }
  },

  methods:{
    initMap(){
      const mapContainer=document.getElementById('map');
      const mapOption={
        center:new kakao.maps.LatLng(37.564343,126.947613),
        level:3,
      };

      const map=new kakao.maps.Map(mapContainer,mapOption);
    }
    
  }


} //export


</script>

<style>

</style>