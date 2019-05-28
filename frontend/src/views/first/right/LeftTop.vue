<template>
  <transition name='opacity1'>
    <div class="echart-container">
      <v-chart :options="newOption"
               ref='qxhj'
               :auto-resize='true' />

    </div>
  </transition>

</template>
<script>
import echarts from 'echarts'
import { mapState } from 'vuex'
export default {
  //  当日抢修环节效率监控
  data () {
    return {
      show: false,
      index: 0,
      status: 'left1',
      option: {
        grid: {
          containLabel: true,
          left: 50,
          right: 50,
          top: 120,
          bottom: '10%',
          show: true
        },
        dataZoom: {
          backgroundColor: '#192B4F',
          fillerColor: 'rgba(0,206,123,0.9)',
          endValue: 8,
          top: '92%',
          bottom: '5%',
          textStyle: {
            fontSize: 48,
            color: '#fff'
          }
        },
        tooltip: {
          show: true,
          textStyle: {
            fontSize: 42
          }
        },
        xAxis: {
          data: [
            '国能电气',
            '栋良电气',
            '德辉电气',
            '方大电气',
            '宇辰电气',
            '益和电气'
          ],
          axisLine: {
            lineStyle: {
              color: '#8C919B'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#fff',
            fontSize: 42,
            formatter: function (val) {
              let value = ''
              if (val) {
                value = val.replace(/-/g, '')
              }
              for (let i in value) {
                if (i % 4 === 3) {
                  value = value.slice(0, i) + '\n' + value.slice(i)
                }
              }
              return value
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: '#8C919B'
            }
          }
        },
        yAxis: {
          name: '（分钟）',
          nameTextStyle: {
            padding: 30,
            color: '#fff',
            fontSize: 48
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#fff',
            fontSize: 42
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: '#EFEFEF',
              type: 'dashed'
            }
          }
        },
        series: [
          {
            type: 'bar',
            name: '当日',
            barWidth: 72,
            label: {
              show: true,
              fontSize: 42,
              color: '#fff',
              position: 'top'
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: 'rgba(0,206,123,0.9)'
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(0,206,123,0.1)'
                    }
                  ],
                  false
                )
              }
            },
            data: [12, 354, 165, 144, 477, 211]
          }
        ]
      }
    }
  },
  computed: {
    ...mapState('FirstRight', ['scfx_hdl']),
    newOption () {
      let option = this.option
      if (this.status === 'left2') {
        if (this.scfx_hdl && this.scfx_hdl.length > 0) {
          let data = this.scfx_hdl
          data = data.sort((a, b) => {
            return (b.AVG_ZDHDL - a.AVG_ZDHDL)
          }).filter(val => {
            return val.AVG_ZDHDL && val.AVG_ZDHDL !== 0
          })
          option.series[0].data = data.map(val => val.AVG_ZDHDL)
          option.xAxis.data = data.map(val => val.ORG_NAME)
          option.yAxis.name = '(%)'
        }
      } else {
        if (this.scfx_hdl && this.scfx_hdl.length > 0) {
          let data = this.scfx_hdl
          data = data.sort((a, b) => {
            return (b.AVG_ZDJDSC - a.AVG_ZDJDSC)
          }).filter(val => {
            return val.AVG_ZDJDSC && val.AVG_ZDJDSC !== 0
          })
          option.series[0].data = data.map(val => val.AVG_ZDJDSC)
          option.xAxis.data = data.map(val => val.ORG_NAME)
          option.yAxis.name = '(分钟)'
        }
      }

      return option
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
      let totalShow = 3
      this.$refs.qxhj.dispatchAction({
        type: 'dataZoom',
        // 开始位置的数值
        startValue: this.index,
        // 结束位置的数值
        endValue: this.index + totalShow
      })
      this.index++
      let length = this.scfx_hdl.filter(val => {
        return val.AVG_ZDJDSC && val.AVG_ZDJDSC !== 0
      }).length
      if (this.index >= length - totalShow) {
        this.index = 0
      }
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
