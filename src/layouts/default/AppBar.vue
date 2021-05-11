<template>
  <v-app-bar
      app
      color="primary"
      dark
    >
      <!-- <v-app-bar-nav-icon v-on:click="$emit('drawer')">{{$route.name}}</v-app-bar-nav-icon> -->
      <v-app-bar-nav-icon v-on:click="$emit('drawer')"></v-app-bar-nav-icon>
      <v-spacer />
      <v-btn
        to='/scenario'
        color="primary"
      >{{xxx}}
      </v-btn>
      <v-spacer/>
      <p>{{xxx}}</p>
      <v-spacer/>
      <p>{{xxx}}</p>
  </v-app-bar>
</template>
<script>
export default {
  name:'DefaultBar',
  props:['xxx'],

}
</script>
<style scoped>

</style>
