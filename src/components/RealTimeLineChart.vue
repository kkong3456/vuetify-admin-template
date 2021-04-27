<script>
import { Line,mixins} from 'vue-chartjs';

export default{
  extends: Line,
  mixins:[mixins.reactiveProp],
  props: ['options'],
  mounted() {
    console.log('Realtime chart mount!!');
    console.log('Realtime chart this.chartData',this.charData);
    console.log('RealTime chart this.options',this.options);
    this.renderChart(this.chartData, this.options);
  },
};
</script>

<style>

</style>