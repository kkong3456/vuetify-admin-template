<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <!-- <v-app-bar-nav-icon v-on:click="$emit('drawer')">{{$route.name}}</v-app-bar-nav-icon> -->
    <v-app-bar-nav-icon @click="$emit('drawer')" />
    <v-spacer />
    xxx
  </v-app-bar>
</template>
<script>
export default {
  name:'DefaultBar',
  

}
</script>
<style scoped>

</style>
