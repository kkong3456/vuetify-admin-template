<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <!-- <v-app-bar-nav-icon v-on:click="$emit('drawer')">{{$route.name}}</v-app-bar-nav-icon> -->
    <v-app-bar-nav-icon @click="$emit('drawer')" />
    
    <v-spacer />
    {{ breadcrumbData }}
  </v-app-bar>
</template>
<script>
import eventBus from '@/js/eventBus'

export default {
  name:'DefaultBar',
  data(){
    return{
      breadcrumbData:'',
      breadcrumbUrl:'',
    }
  },
  
  created(){
    eventBus.$on('triggerEventBus',(value)=>{
      this.breadcrumbData=value[0];
      this.breadcrumbUrl=value[1];
    });
  }
}
</script>
<style scoped>

</style>
