<template>
  <v-footer
    color="primary lighten-1"
    padless
  >
    <v-row
      justify="center"
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
        class="primary lighten-2 py-4 text-center white--text"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>강북/강원 코어 운용센터 — {{xxx}}</strong>
        <v-btn  v-on:click="showLog">show</v-btn>
      </v-col>

    </v-row>



  </v-footer>
</template>

<script>
  export default {
    data() {
      return {
        links:[
          'Home',
          'Contact'
        ]

      }
    },
    props:['xxx'],
  }
</script>
