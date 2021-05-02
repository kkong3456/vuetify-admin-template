<template>
<v-container class='grey lighten-5' fluid>


  <v-row>
    <v-col
      cols="12"
      lg="6"
    >
      <v-card
        class='pa-2'
        outlined
        tile
      >
        <bonbu-net-increase-chart></bonbu-net-increase-chart>
      </v-card>
    </v-col>
    <v-spacer/>
    <v-col
      cols="12"
      lg="6"
    >
      <v-card
        class='pa-2'
        outlined
        tile
      >
         <jisa-net-increase-chart></jisa-net-increase-chart>
      </v-card>
    </v-col>

  </v-row>


    <button @click="fillData()">Randomize</button>


</v-container>
</template>

<script>
  import BonbuNetIncreaseChart from '../components/BonbuNetIncreaseChart';
  import JisaNetIncreaseChart from '../components/JisaNetIncreaseChart';
  export default {
    components: {
      BonbuNetIncreaseChart,
      JisaNetIncreaseChart
    },
    data () {
      return {

      }
    },




  }
</script>

<style>
  .small {
    /* max-width: 600px;
    margin:  150px auto; */
  }
</style>
