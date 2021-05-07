<template>
<v-fade-transition mode="in-out">
  <router-view/>
</v-fade-transition>
</template>

<script>

import '@/styles/overrides.sass'
export default {
  name: 'App',
};
</script>

<style scoped>


</style>
