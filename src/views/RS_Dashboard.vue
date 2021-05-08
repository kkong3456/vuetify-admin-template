<template>
<v-container class='grey lighten-5' fluid>
    <v-row>
    <v-col
      cols="12"
      lg="6"
    >
      <div class="text-h5 font-weight-medium text-center text--secondary">[본부별 순익 변동 추이]</div>

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
       <div class="text-h5 font-weight-medium text-center text--secondary">[본부별 순익 변동 데이터]</div>
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
      <div class="text-h5 font-weight-medium text-center text--secondary">[지사별 순익 변동 추이]</div>
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
      <div class="text-h5 font-weight-medium text-center text--secondary">[지사별 순익 변동 데이터]</div>
      <v-card
        class='pa-2'
        outlined
        tile
      >
        <jisa-net-increase-table></jisa-net-increase-table>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col
      cols="12"
      lg="6"
    >
      <div class="text-h5 font-weight-medium text-center text--secondary">[본부별 가입자 순증 데이터(전주비교)]</div>
      <v-card
        class='pa-2'
        outlined
        tile
      >
        <bonbu-bar-chart></bonbu-bar-chart>

      </v-card>
    </v-col>
    <v-col
      cols="12"
      lg="6"
    >
      <div class="text-h5 font-weight-medium text-center text--secondary">[본부별 가입자 순증 데이터(전주비교2)]</div>
      <v-card
        class='pa-2'
        outlined
        title
      >
        <bonbu-radar-chart></bonbu-radar-chart>
      </v-card>
    </v-col>
  </v-row>

</v-container>

</template>

<script>
  import BonbuNetIncreaseChart from '../components/BonbuNetIncreaseChart';
  import JisaNetIncreaseChart from '../components/JisaNetIncreaseChart';
  import BonbuNetIncreaseTable from '../components/BonbuNetIncreaseTable';
  import JisaNetIncreaseTable from '../components/JisaNetIncreaseTable';
  import BonbuBarChart from '@/components/charts/BonbuBarChart';
  import BonbuRadarChart from '@/components/charts/BonbuRadarChart';

  export default {
    components: {
      BonbuNetIncreaseChart,
      JisaNetIncreaseChart,
      BonbuNetIncreaseTable,
      JisaNetIncreaseTable,
      BonbuBarChart,
      BonbuRadarChart,
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
