<template>
  <transition name='opacity1'
              appear>
    <div class="echart-container">

      <v-chart :options="newOption"
               ref='rt'
               :auto-resize='true' />

    </div>
  </transition>

</template>
<script>
import { mapState } from 'vuex'
import echarts from 'echarts'
export default {
  // 当日抢修环节效率监控
  data () {
    return {
      show: false,
      index: 0,
      time: null,
      option: {
        grid: {
          containLabel: true,
          left: 20,
          right: 20,
          top: 100,
          bottom: 50
        },
        tooltip: {
          trigger: 'axis',
          padding: 1,
          // position: ['50%', '50%'],
          show: true,
          formatter: function (params) {
            let html = ''
            let tol1 = ''
            let tol2 = ''
            let tol3 = ''
            let head = `<div class='echarttitle'><span  class='iconfont  icon-zongshu  mytubiao'></span> ${
              params[0].name
            }</div>`

            if (params[0]) {
              tol1 = `<div class='betweenbox'><div><span style="color:#20CA64;" class='iconfont icon--tubiao mytubiao'></span>今年：</div><div>${
                params[0].value
              }分钟</div></div>`
            }
            if (params[1]) {
              tol2 = `<div class='betweenbox'><div><span style="color:#1371DC;" class='iconfont icon--tubiao mytubiao'></span>去年：</div><div>${
                params[1].value
              }分钟</div></div>`
            }

            if (params[2]) {
              let value = Number(params[2].value)
              let icon = ''
              if (value > 0) {
                icon = `<span style="color:#E75311;" class='iconfont icon-zengchang mytubiao'></span>`
              } else {
                icon = `<span style="color:#00F942;" class='iconfont icon-xiajiang mytubiao'></span>`
              }
              tol3 = `<div class='betweenbox'><div><span style="color:#D89531;"  class='iconfont icon--tubiao mytubiao'></span>同比：</div><div>${
                params[2].value
              }%${icon}</div></div>`
            }
            html += head
            html += tol1
            html += tol2
            html += tol3
            return `<div class="tooltip-container">${html}</div>`
          },
          textStyle: {
            fontSize: 42
          }
        },
        legend: {
          data: ['今年', '去年', '同比'],
          itemWidth: 75,
          itemHeight: 45,
          textStyle: {
            fontSize: 48,
            color: '#EFEFEF'
          }
        },
        xAxis: {
          data: [
            '接单派工',
            '终端接单',
            '到达现场',
            '现场处理',
            '故障持续',
            '故障审核'
          ],
          axisLine: {
            lineStyle: {
              color: '#EFEFEF',
              type: 'dashed'
            }
          },
          axisLabel: {
            color: '#fff',
            fontSize: 42,
            formatter: function (value) {
              for (let i in value) {
                if (i % 3 === 2) {
                  value = value.slice(0, i) + '\n' + value.slice(i)
                }
              }
              return value
            }
          }
        },
        yAxis: [
          {
            name: '(分钟)',
            nameGap: 50,
            nameTextStyle: {
              fontSize: 48,
              color: '#fff'
            },

            axisLine: {
              show: false
            },
            axisLabel: {
              color: '#fff',
              fontSize: 42
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#EFEFEF',
                type: 'dashed'
              }
            }
          },
          {
            name: '(%)',
            nameGap: 50,
            position: 'right',
            nameTextStyle: {
              fontSize: 48,
              color: '#fff'
            },

            axisLine: {
              show: false
            },
            axisLabel: {
              color: '#fff',
              fontSize: 42
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            type: 'bar',
            name: '今年',
            barMaxWidth: 90,
            barMinWidth: 30,
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
                      color: '#1478EF'
                    },
                    {
                      offset: 0.8,
                      color: '#093B48'
                    }
                  ],
                  false
                )
              }
            },

            data: [12, 354, 165, 144, 477, 211]
          },
          {
            type: 'bar',
            name: '去年',
            barMaxWidth: 90,
            barMinWidth: 30,
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
                      color: '#21CE65'
                    },
                    {
                      offset: 0.8,
                      color: '#093B48'
                    }
                  ],
                  false
                )
              }
            },
            data: [254, 324, 154, 254, 457, 101]
          },
          {
            type: 'line',
            name: '同比',
            barWidth: 54,
            yAxisIndex: 1,
            itemStyle: {
              color: '#D89531'
            },
            data: [-5, 5, 154, 1, 457, 101]
          }
        ]
      }
    }
  },
  computed: {
    ...mapState('FirstLeft', ['ddrqxhj']),
    newOption () {
      let option = this.option
      if (this.ddrqxhj && this.ddrqxhj.length > 0) {
        let data1 = []
        let data2 = []
        let data3 = []

        data1.push(this.ddrqxhj[0].DN_AVG_JDPG)
        data1.push(this.ddrqxhj[0].DN_AVG_ZDJD)
        data1.push(this.ddrqxhj[0].DN_AVG_DDXC)
        data1.push(this.ddrqxhj[0].DN_AVG_XCCL)
        data1.push(this.ddrqxhj[0].DN_AVG_GZCX)
        data1.push(this.ddrqxhj[0].DN_AVG_GZSH)
        data2.push(this.ddrqxhj[0].QN_AVG_JDPG)
        data2.push(this.ddrqxhj[0].QN_AVG_ZDJD)
        data2.push(this.ddrqxhj[0].QN_AVG_DDXC)
        data2.push(this.ddrqxhj[0].QN_AVG_XCCL)
        data2.push(this.ddrqxhj[0].QN_AVG_GZCX)
        data2.push(this.ddrqxhj[0].QN_AVG_GZSH)

        data3 = data1.map((val, i) => {
          if (data2[i]) {
            let c = val - data2[i]
            if (c === 0) {
              return 0
            } else {
              return ((c / val) * 100).toFixed(2)
            }
          } else {
            return 0
          }
        })
        option.series[0].data = data1
        option.series[1].data = data2
        option.series[2].data = data3
      }
      return option
    }
  },
  mounted () {
    let time = setTimeout(() => {
      this.autoTooltip()
      clearTimeout(time)
    }, 3000)
  },
  destroyed () {
    if (this.$refs.rt && this.$refs.rt.dispatchAction) {
      this.$refs.rt.dispatchAction({
        type: 'hideTip'

      })
    }
    clearInterval(this.time)
    this.time = null
  },
  methods: {
    autoTooltip () {
      if (this.time) {
        clearInterval(this.time)
        this.time = null
      }
      this.time = setInterval(() => {
        if (this.$refs.rt && this.$refs.rt.dispatchAction) {
          this.$refs.rt.dispatchAction({
            type: 'hideTip',
            dataIndex: this.index
          })
          this.index++
          if (this.index > 5) {
            this.index = 0
          }
          this.$refs.rt.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: this.index
          })
        }
      }, window.VUE_APP_echartsTime)
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
<style lang="scss" >
.echart-container {
  .tooltip-container {
    background: rgba(58, 53, 144, 0.8);
    padding: 6px 20px;
    .echarttitle {
      font-size: 48px;
      border-bottom: 2px solid #1376eb;
    }
    .mytubiao {
      font-size: 42px;
    }
  }
}
</style>
