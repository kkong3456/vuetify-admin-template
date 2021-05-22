<template>
  <v-app>
    <default-bar @drawer="drawer=!drawer" />
    <default-drawer v-model="drawer" />
    <default-view />
    <default-footer :xxx="str" />
  </v-app>
</template>

<script>
import DefaultBar from './AppBar'
import DefaultDrawer from './Drawer'
import DefaultView from './View';
import DefaultFooter from './Footer'

export default {
  name:'DefaultLayout',
  components:{
    DefaultBar,
    DefaultDrawer,
    DefaultView,
    DefaultFooter,
  },

  data(){
    return {
      drawer:true,
      str:"Powered by kkong",
    }
  },
  methods:{

  }
}
</script>

<style scoped>


</style>
