<script>
import { Mixed } from 'vue-chartjs'

export default {
  extends: Mixed,
  props: ['data', 'options'],
  mounted() {
    this.renderChart(this.data, this.options)
  }
}
</script>
