<template>
  <v-app>
    <page-app-bar></page-app-bar>
    <page-view></page-view>

  
  </v-app>

</template>
<script>
import PageAppBar from './AppBar'
import PageView from './View'

export default {
  name:'PageLayout',
  components:{
    PageAppBar,
    PageView,
  }
}
</script>
