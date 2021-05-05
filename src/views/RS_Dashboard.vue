<template>
<v-container class='grey lighten-5' fluid>
    <v-row>
    <v-col
      cols="12"
      lg="6"
    >
<<<<<<< HEAD
      <div class="text-h5 font-weight-medium text-center text--secondary">[본부별 가입자 변동 추이]</div>
=======
      <div class="text-h5 font-weight-medium text-center text--secondary">[본부별 순익 변동 추이]</div>
>>>>>>> 3e18ce119b6b27384196c3dc05d65fc1f22c4d58

      <v-card
        class='pa-2 elevation-5'
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
<<<<<<< HEAD
       <div class="text-h5 font-weight-medium text-center text--secondary">[본부별 가입자 변동 데이터]</div>
=======
       <div class="text-h5 font-weight-medium text-center text--secondary">[본부별 순익 변동 데이터]</div>
>>>>>>> 3e18ce119b6b27384196c3dc05d65fc1f22c4d58
      <v-card
        class='pa-2 elevation-5'
        outlined
        tile
      >
        <bonbu-net-increase-table></bonbu-net-increase-table>

      </v-card>
    </v-col>

  </v-row>

   <v-row>
    <v-col
      cols="12"
      lg="6"
    >
<<<<<<< HEAD
      <div class="text-h5 font-weight-medium text-center text--secondary">[지사별 가입자 변동 추이]</div>
=======
      <div class="text-h5 font-weight-medium text-center text--secondary">[지사별 순익 변동 추이]</div>
>>>>>>> 3e18ce119b6b27384196c3dc05d65fc1f22c4d58
      <v-card
        class='pa-2 elevation-5'
        outlined
        tile
      >
        <jisa-net-increase-chart></jisa-net-increase-chart>
      </v-card>
    </v-col>
    <v-spacer/>
    <v-col
      cols="12"
      lg="6"
    >
<<<<<<< HEAD
      <div class="text-h5 font-weight-medium text-center text--secondary">[지사별 가입자 변동 데이터]</div>
=======
      <div class="text-h5 font-weight-medium text-center text--secondary">[지사별 순익 변동 데이터]</div>
>>>>>>> 3e18ce119b6b27384196c3dc05d65fc1f22c4d58
      <v-card
        class='pa-2'
        outlined
        tile
      >
        <jisa-net-increase-table></jisa-net-increase-table>
      </v-card>
    </v-col>
  </v-row>
    <button @click="fillData()">Randomize</button>
</v-container>

</template>

<script>
  import BonbuNetIncreaseChart from '../components/BonbuNetIncreaseChart';
  import JisaNetIncreaseChart from '../components/JisaNetIncreaseChart';
  import BonbuNetIncreaseTable from '../components/BonbuNetIncreaseTable';
  import JisaNetIncreaseTable from '../components/JisaNetIncreaseTable';

  // const BonbuNetIncreaseChart=()=>import ('../components/BonbuNetIncreaseChart');


  export default {
<<<<<<< HEAD
    name:'RS_Dashboard',
=======
>>>>>>> 3e18ce119b6b27384196c3dc05d65fc1f22c4d58
    components: {
      BonbuNetIncreaseChart,
     
      JisaNetIncreaseChart,
      BonbuNetIncreaseTable,
      JisaNetIncreaseTable,
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
