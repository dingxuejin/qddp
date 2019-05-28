import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 清楚浏览器默认样式
import './style/normalize.css'
// 自定义的样式（需要自定义公共样式请另外创新的文件再引进）
import './style/dxjstyle.scss'
// 数字滚动插件
import '../public/font/iconfont.css'
import countTo from 'vue-count-to'
import ECharts from 'vue-echarts'
import 'echarts'
// import Highcharts from 'highcharts'
// import VueHighcharts from 'vue-highcharts'
// import Highcharts3D from 'highcharts/highcharts-3d'
// Highcharts3D(Highcharts)

// Vue.use(VueHighcharts)

Vue.config.productionTip = false
Vue.component('countTo', countTo)
Vue.component('v-chart', ECharts)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
