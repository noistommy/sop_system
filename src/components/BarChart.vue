<script>
import { Bar, mixins } from 'vue-chartjs'

export default {
  extends: Bar,
  mixins: [mixins.reactiveProp],
  props: {
    chartData: Object
  },
  data () {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options)
  },
  watch: {
    chartData () {
      console.log('update')
      this.$data._chart.update()
    }
  }

}
</script>
