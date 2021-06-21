<template>
  <v-container>
    <v-row>
      <v-col>
        <div id="map_div" />
      </v-col>
    </v-row>    
  </v-container>    
</template>

<script>

export default {
  mounted(){
    window.onload=this.initialize;
  },

  methods:{
    initialize(){
      const mapOpts={
        center:new olleh.maps.UTMK(958386.063532902,1941447.5761742294),
        zoom:9,
        mapTypeId:'ROADMAP'
      };
      const map=new olleh.maps.Map(document.getElementById('map_div'),mapOpts);
    }
  }

}
</script>

<style scoped>

</style>