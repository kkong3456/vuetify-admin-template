<template>
  <v-footer
    color="primary lighten-1"
    padless
  >
    <v-row
      no-gutters
    >
      <!-- <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        text
        to='/'
        rounded
        class="my-2"
      >
        {{ link }}
      </v-btn> -->
      <v-col
        v-if="drawer"
        class="primary lighten-2 py-4 text-right pr-12 white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>강북/강원 코어 운용센터 — {{ xxx }}</strong>
      </v-col>
      <v-col
        v-else
        class="primary lighten-2 py-4 text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>강북/강원 코어 운용센터 — {{ xxx }}</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  props:['xxx','drawer'],
  data() {
    return {
      links:[
        'Home',
        'Contact'
      ]

    }
  },
}
</script>
