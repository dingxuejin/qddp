<template>
  <transition name='opacity1'
              appear>
    <div class="echart-container">

      <v-chart :options="newOption" ref="gzsc"
               :auto-resize='true' />

    </div>
  </transition>
</template>
<script>
import { mapState } from 'vuex'
import echarts from 'echarts'
let imgbg = require('../../../assets/barbg.png')
export default {
  data () {
    return {
      status: 'right1',
      index: 0,
      options: {
        grid: {
          left: 20,
          bottom: 50,
          top: 50,
          right: '10%',
          containLabel: true
        },

        xAxis: {
          name: '(分钟)',
          nameGap: -50,
          position: 'top',
          nameTextStyle: {
            fontSize: 48,
            color: '#fff'
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        yAxis: {
          type: 'category',
          data: [
            '国能电气',
            '栋良电气',
            '德辉电气',
            '益和电气',
            '方大电气',
            '宇辰电气',
            '德辉电气',
            '益和电气',
            '方大电气',
            '宇辰电气'
          ],
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        dataZoom: {
          backgroundColor: '#192B4F',
          yAxisIndex: 0,
          fillerColor: 'rgba(32,200,100,0.9)',
          endValue: 10,
          zoomLock: true,
          startValue: 0,
          right: '3%',
          left: '93%',
          top: 120,
          bottom: 80,
          textStyle: {
            color: '#fff'
          }
        },
        series: [
          {
            type: 'pictorialBar',
            barWidth: 120,
            symbol: 'image://' + imgbg,
            symbolSize: ['100%', '100%'],
            symbolOffset: [-6, -34],
            label: {
              show: true,
              fontSize: 26,
              offset: [10, -75],
              position: 'insideLeft',
              formatter: function (params) {
                return params.name
              }
            },
            itemStyle: {
              normal: {
                color: 'rgba(250,250,250,0.1)'
              }
            },

            data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
          },
          {
            type: 'pictorialBar',
            symbol: 'rect',
            barWidth: 90,
            barGap: '-100%',
            barMinHeight: 1,
            symbolRepeat: true,
            symbolSize: [25, 60],
            symbolOffset: [10, 0],
            label: {
              fontSize: 42,
              show: true,
              formatter: function (params) {
                return params.value
              },
              offset: [10, 0],
              position: 'right',
              color: '#fff'
            },
            itemStyle: {
              color: 'rgba(33,206,101,0.9)'

            },
            data: [11, 11, 22, 22, 22, 33, 33, 33, 33, 55, 55]
          },
          {
            type: 'bar',
            barWidth: 60,
            label: {
              show: false
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  1,
                  0,
                  [
                    {
                      offset: 0.1,
                      color: 'rgba(0,0,0,0.6)'
                    },
                    {
                      offset: 0.9,
                      color: 'rgba(0,0,0,0)'
                    }
                  ],
                  false
                )
              }
            },
            data: [11, 11, 22, 22, 22, 33, 33, 33, 33, 55, 55]
          }
        ]
      }
    }
  },
  computed: {
    ...mapState('FirstLeft', ['scfx_gzpcsc']),
    newOption () {
      let data = this.scfx_gzpcsc
      let options = this.options
      if (this.status === 'right2') {
        if (data && data.length > 0) {
          let dataRight = JSON.parse(JSON.stringify(data))
          dataRight = dataRight.sort((a, b) => {
            return (b.AVG_GZPCSC - a.AVG_GZPCSC)
          }).filter(val => {
            return val.AVG_GZPCSC && val.AVG_GZPCSC !== 0
          })
          let data0 = []
          let data1 = dataRight.map(val => val.AVG_GZPCSC)

          data0.length = data1.length
          data0.fill(1.2 * Math.max(...data1))
          options.xAxis.max = 1.2 * Math.max(...data1)
          options.series[0].data = data0
          options.series[1].data = data1
          options.series[2].data = data0.map(val => val / 2)
          options.yAxis.data = dataRight.map(val => val.ORG_NAME)
        }
      } else {
        if (data && data.length > 0) {
          let dataLeft = JSON.parse(JSON.stringify(data))
          dataLeft = dataLeft.sort((a, b) => {
            return (b.AVG_GZCLSC - a.AVG_GZCLSC)
          }).filter(val => {
            return val.AVG_GZCLSC && val.AVG_GZCLSC !== 0
          })
          let data0 = []
          let data1 = dataLeft.map(val => val.AVG_GZCLSC)
          data0.length = data1.length
          data0.fill(1.2 * Math.max(...data1))
          options.xAxis.max = 1.2 * Math.max(...data1)
          options.series[0].data = data0
          options.series[1].data = data1
          options.series[2].data = data0.map(val => val / 2)
          options.yAxis.data = dataLeft.map(val => val.ORG_NAME)
        }
      }
      return options
    }
  },
  mounted () {
    if (this.time) {
      clearInterval(this.time)
      this.time = null
    }
    this.changeDataZoom()
    this.time = setInterval(() => {
      this.changeDataZoom()
    }, window.VUE_APP_echartsTime)
  },
  destroyed () {
    if (this.time) {
      clearInterval(this.time)
      this.time = null
    }
  },
  methods: {
    change (val) {
      this.status = val
    },
    changeDataZoom () {
      let totalShow = 7
      let length = 0
      if (this.status === 'right2') {
        length = this.scfx_gzpcsc.filter(val => {
          return val.AVG_GZPCSC && val.AVG_GZPCSC !== 0
        }).length
      } else {
        length = this.scfx_gzpcsc.filter(val => {
          return val.AVG_GZCLSC && val.AVG_GZCLSC !== 0
        }).length
      }
      if (this.index >= length - totalShow) {
        this.index = 0
      }
      this.$refs.gzsc.dispatchAction({
        type: 'dataZoom',
        // 开始位置的数值
        startValue: this.index,
        // 结束位置的数值
        endValue: this.index + totalShow
      })
      this.index++
    }
  }
}
</script>
<style lang="scss" scoped>
.echart-container {
  width: 100%;
  height: 100%;
  .echarts {
    width: 100%;
    height: 100%;
  }
}
</style>
