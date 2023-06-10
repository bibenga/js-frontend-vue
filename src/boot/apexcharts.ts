import VueApexCharts from 'vue3-apexcharts'
import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
    console.log('[apexchart] init')
    app.use(VueApexCharts)
})
