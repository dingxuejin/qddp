<template>
  <transition name='opacity1'>
    <div class="echart-container">
      <!-- 装机容量俩柱状折线图切换 -->
      <v-chart ref='zj' :options='newOptions'
               :auto-resize='true' />
    </div>
  </transition>

</template>
<script>
import { mapState } from 'vuex'
import echarts from 'echarts'
export default {
  data () {
    return {
      status: 'right1',
      index: 0,
      options: {
        grid: {
          containLabel: true,
          left: 60,
          right: 60,
          top: 100,
          bottom: 60
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
            let head = `<div class='echarttitle'><span  class='iconfont  icon-zongshu  mytubiao'></span> ${params[0].name}</div>`

            if (params[0].value) {
              tol1 = `<div class='betweenbox'><div><span style="color:#D89531;" class='iconfont icon--tubiao mytubiao'></span>前年：</div><div>${
                params[0].value
              }MW</div></div>`
            }
            if (params[1].value) {
              tol2 = `<div class='betweenbox'><div><span style="color:#1371DC;" class='iconfont icon--tubiao mytubiao'></span>去年：</div><div>${
                params[1].value
              }MW</div></div>`
            }

            if (params[2].value) {
              tol3 = `<div class='betweenbox'><div><span style="color:#20CA64;"  class='iconfont icon--tubiao mytubiao'></span>今年：</div><div>${
                params[2].value
              }MW</div></div>`
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
          itemWidth: 75,
          itemHeight: 45,
          textStyle: {
            fontSize: 48,
            color: '#FFFFFF'
          },
          data: ['2017', '2018', '2019']
        },
        xAxis:
          {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#1073C9',
                type: 'dashed'
              }
            },
            axisLabel: {
              color: '#fff',
              fontSize: 42,
              formatter: function (value) {
                for (let i in value) {
                  if (i % 4 === 3) {
                    value = value.slice(0, i) + '\n' + value.slice(i)
                  }
                }
                return value
              }
            },
            data: [
              '1',
              '2',
              '3',
              '4',
              '5',
              '6',
              '7',
              '8',
              '9',
              '10',
              '11',
              '12'
            ]
          },
        yAxis: [
          {
            name: '(MW)',
            nameGap: 50,
            position: 'top',
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
                color: '#1073C9',
                type: 'dashed'
              }
            }
          }
        ],
        series: [
          {
            type: 'line',
            itemStyle: {
              color: '#C98C38'
            },
            lineStyle: {
              width: 4
            },

            data: [
              2.0,
              2.2,
              3.3,
              4.5,
              6.3,
              10.2,
              20.3,
              23.4,
              23.0,
              16.5,
              12.0,
              6.2
            ]
          },
          {
            type: 'line',
            itemStyle: {
              color: '#1E91F8'
            },
            lineStyle: {
              width: 4
            },

            data: [
              20.0,
              21.2,
              13.3,
              40.5,
              61.3,
              100.2,
              10.3,
              13.4,
              13.0,
              6.5,
              22.0,
              16.2
            ]
          },
          {
            type: 'bar',
            barWidth: 52,
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
                      color: 'rgba(32,201,100,0.9)'
                    },
                    {
                      offset: 0.8,
                      color: 'rgba(32,201,100,0.1)'
                    }
                  ],
                  false
                )
              }
            },
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20.0,
              6.4,
              3.3
            ]
          }
        ]
      }
    }
  },
  computed: {
    ...mapState('SecondLeft', ['gfyzzqs', 'gfqxfb']),
    newOptions () {
      let options = this.options
      if (this.status === 'right1') {
        // 绿色
        let year = Number(new Date().getFullYear())
        let nowYear = '' + year
        let laYear = '' + (year - 1)
        let yyYear = '' + (year - 2)
        if (this.gfqxfb && this.gfqxfb.length > 0) {
          let xData = []
          let data1 = []
          let data2 = []
          let data3 = []
          this.gfqxfb.forEach(item => {
            xData.push(item.ORG_NAME)
            data1.push(item.ZJRL_17)
            data2.push(item.ZJRL_18)
            data3.push(item.ZJRL_19)
          })
          options.legend.data = [yyYear, laYear, nowYear]
          options.xAxis.data = xData
          options.series[0].name = yyYear
          options.series[1].name = laYear
          options.series[2].name = nowYear
          options.series[0].data = data1
          options.series[1].data = data2
          options.series[2].data = data3
        }
      } else {
        // 蓝色
        let data = {}
        if (this.gfyzzqs && this.gfyzzqs.length > 0) {
          this.gfyzzqs.forEach(item => {
            if (data[item.YEARS]) {
              data[item.YEARS].push(item)
            } else {
              data[item.YEARS] = [item]
            }
          })
        }
        let yearArr = []
        for (let i in data) {
          yearArr.push(i)
        }
        let xData = data[yearArr[0]].map(val => val.MONS)
        let name1 = yearArr[0]
        let name2 = yearArr[1]
        let name3 = yearArr[2]
        let data1 = data[yearArr[0]].map(val => val.ZJRL)
        let data2 = data[yearArr[1]].map(val => val.ZJRL)
        let data3 = data[yearArr[2]].map(val => val.ZJRL)
        options.xAxis.data = xData
        options.legend.data = yearArr
        options.series[0].name = name1
        options.series[0].data = data1
        options.series[1].name = name2
        options.series[1].data = data2
        options.series[2].name = name3
        options.series[2].data = data3
      }
      return options
    }
  },
  mounted () {
    let time = setTimeout(() => {
      this.autoTooltip()
      clearTimeout(time)
    }, 3000)
  },
  destroyed () {
    if (this.$refs.zj && this.$refs.zj.dispatchAction) {
      this.$refs.zj.dispatchAction({
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
        if (this.$refs.zj && this.$refs.zj.dispatchAction) {
          this.$refs.zj.dispatchAction({
            type: 'hideTip',
            dataIndex: this.index
          })
          this.index++
          if (this.index > 12) {
            this.index = 0
          }
          this.$refs.zj.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: this.index
          })
        }
      }, window.VUE_APP_echartsTime)
    },
    change (val) {
      this.status = val
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
