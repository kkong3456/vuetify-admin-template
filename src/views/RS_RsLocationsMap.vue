<template>
  <v-row>
    <v-col style="height:890px;">
      <div id="map_div" />
    </v-col>
  </v-row>       
</template>

<script>

export default {
  mounted(){
    this.loadScript();
  },

  methods:{
    initialize(){
      const mapOpts={
        // center:new olleh.maps.UTMK(958386.063532902,1941447.5761742294),
        center:new olleh.maps.LatLng(37.57730,127.00160),
        zoom:11,
        //mapTypeId:'ROADMAP'
        mapTypeId:'HYBRID',
      };
      const map=new olleh.maps.Map(document.getElementById('map_div'),mapOpts);
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