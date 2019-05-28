
<template>
  <transition name="opacity1"
              appear>
    <div class="echart-container">
      <v-chart :options="newOption" ref="vueChart"
               :auto-resize="true" />
    </div>
  </transition>
</template>
<script>
import { mapState } from 'vuex'
import echarts from 'vue-echarts'
export default {
  data () {
    return {
      show: false,
      status: 1,
      option: {
        textStyle: {
          fontSize: 48,
          color: '#FFFFFF'
        },
        color: ['#d67025', '#2874ce', '#1afa29'],
        grid: {
          containLabel: true,
          top: 120,
          left: 20,
          right: 20,
          bottom: '10%'
        },
        legend: {
          itemWidth: 75,
          itemHeight: 45,
          textStyle: {
            fontSize: 48,
            color: '#FFFFFF'
          },
          data: ['2017年工单', '2018年工单', '2019年工单']
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          textStyle: {
            fontSize: 42
          }
        },
        xAxis: {
          splitLine: {
            show: false
          },
          axisLabel: {
            fontSize: 42
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#8c919b',
              type: 'dotted'
            }
          },
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        },
        yAxis: [
          {
            name: '(个)',
            nameGap: 50,
            position: 'top',
            nameTextStyle: {
              fontSize: 48,
              color: '#fff'
            },
            axisLabel: {
              fontSize: 42,
              interval: 0
            },
            splitLine: {
              show: false

            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#8c919b'
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '2017年工单',
            type: 'line',
            smooth: true,
            symbol: 'none',
            symbolSize: 0,
            areaStyle: {
              // 区域填充样式
              normal: {
                // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    { offset: 0, color: 'rgba(214,112,37, 0.9)' },
                    { offset: 0.9, color: 'rgba(73,118,163, 0)' }
                  ],
                  false
                ),

                shadowColor: 'rgba(214,112,37, 0.9)', // 阴影颜色
                shadowBlur: 20 // shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              }
            },
            data: [
              1000,
              3000,
              5000,
              2800,
              5000,
              2000,
              4000,
              6500,
              2100,
              5000,
              2000,
              4000
            ]
          },
          {
            name: '2018年工单',
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: {
              // 区域填充样式
              normal: {
                // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    { offset: 0, color: 'rgba(40,116,206, 0.9)' },
                    { offset: 0.9, color: 'rgba(73,118,163, 0)' }
                  ],
                  false
                ),

                shadowColor: 'rgba(40,116,206, 0.9)', // 阴影颜色
                shadowBlur: 20 // shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              }
            },
            data: [
              2000,
              5000,
              4000,
              6000,
              7000,
              6000,
              5000,
              7000,
              1000,
              5000,
              2000,
              4000
            ]
          },
          {
            name: '2019年工单',
            type: 'line',
            symbol: 'none',
            smooth: true,
            areaStyle: {
              // 区域填充样式
              normal: {
                // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    { offset: 0, color: 'rgba(19, 138, 128, 0.9)' },
                    { offset: 0.9, color: 'rgba(73,118,163, 0)' }
                  ],
                  false
                ),

                shadowColor: 'rgba(19, 138, 128, 0.9)', // 阴影颜色
                shadowBlur: 20 // shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              }
            },
            data: [2000, 3000]
          }
        ]
      }
    }
  },
  computed: {
    ...mapState('FirstLeft', ['gdtbqsData', 'drgd24dfb']),
    newOption () {
      let option = JSON.parse(JSON.stringify(this.option))
      if (this.status === 'left2') {
        let data = this.drgd24dfb
        if (data && data.length > 0) {
          let YearArr1 = []
          let YearArr2 = []
          data.forEach((item, i) => {
            if (i === 0) {
              YearArr1.push(item)
            } else {
              if (YearArr1[0].YEARS && YearArr1[0].YEARS === item.YEARS) {
                YearArr1.push(item)
              } else {
                YearArr2.push(item)
              }
            }
          })
          if (YearArr1[0].YEARS) {
            option.legend.data.push(YearArr1[0].YEARS)
          }
          if (YearArr2[0].YEARS) {
            option.legend.data.push(YearArr2[0].YEARS)
          }

          option.xAxis.data = YearArr1.map(item => item.HOURS)
          option.series[0].data = YearArr1.map(item => item.GDSL)
          option.series[1].data = YearArr2.map(item => item.GDSL)
          option.series[0].name = YearArr1[0].YEARS
          option.series[1].name = YearArr2[0].YEARS
          option.series[2] = null
          option.tooltip.formatter = function (params) {
            let html1 = ''
            let html2 = ''
            if (params[1] && params[1].value) {
              if (params.length > 1 && params[1].value) {
                let icon = 'icon-xiajiang green'
                if (params[1].value > params[0].value) {
                  icon = 'icon-zengchang red'
                }
                if (params[0].value === 0) {
                  html1 = `同比去年：100%<i class="iconfont ${icon}"></i>`
                } else {
                  html1 = `同比去年：${(
                    ((params[1].value - params[0].value) / params[0].value) *
                  100
                  ).toFixed(2)}%<i class="iconfont ${icon}"></i>`
                }
              }
            }

            let html = `<div>${html1}${html2}</div>`
            return html
          }
        }
      } else {
        let gdtbqsData = this.gdtbqsData
        if (gdtbqsData && gdtbqsData.length > 0) {
          let yearArr = []
          let nowYear = new Date().getFullYear()
          let lastYear = new Date().getFullYear() - 1
          let beforeYear = new Date().getFullYear() - 2
          yearArr.push(String(nowYear))
          yearArr.push(String(lastYear))
          yearArr.push(String(beforeYear))
          let monthArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
          let allData = {}
          monthArr.forEach(val => {
            allData[val] = {}
          })
          gdtbqsData.forEach(val => {
            allData[val.MONS][val.YEARS] = val.GDSL
          })
          let data1 = []
          let data2 = []
          let data3 = []
          for (let month of monthArr) {
            data1.push(allData[month][yearArr[0]])
            data2.push(allData[month][yearArr[1]])
            data3.push(allData[month][yearArr[2]])
          }
          option.series[0].data = data1
          option.series[0].name = yearArr[0]
          option.series[1].data = data2
          option.series[1].name = yearArr[1]
          option.series[2].data = data3
          option.series[2].name = yearArr[2]
          // })
          option.legend.data = yearArr
          option.xAxis.data = monthArr
          option.tooltip.formatter = function (params) {
            let html1 = ''
            let html2 = ''
            if (params[0].value) {
              if (params.length > 1 && params[1].value) {
                let icon = 'icon-xiajiang green'
                if (params[0].value > params[1].value) {
                  icon = 'icon-zengchang red'
                }
                if (params[1].value === 0) {
                  html1 = `同比去年：100%<i class="iconfont ${icon}"></i>`
                } else {
                  html1 = `同比去年：${(
                    ((params[0].value - params[1].value) / params[1].value) *
                  100
                  ).toFixed(2)}%<i class="iconfont ${icon}"></i>`
                }
              }
              if (params.length > 2 && params[2].value) {
                let icon = 'icon-xiajiang green'
                if (params[0].value > params[2].value) {
                  icon = 'icon-zengchang red'
                }
                html2 = `<br/>同比前年：100%<i class="iconfont ${icon}"></i>`
                if (params[0].value === 0) {
                } else {
                  html2 = `<br/>同比前年：${(
                    ((params[0].value - params[2].value) / params[2].value) *
                  100
                  ).toFixed(2)}%<i class="iconfont ${icon}"></i>`
                }
              }
            }

            let html = `<div>${html1}${html2}</div>`
            return html
          }
        }
      }

      return option
    }
  },
  methods: {
    change (val) {
      this.status = val
    }
  }
}
</script>
<style lang="scss">
.echart-container {
  .green {
    font-size: 42px;
    color: green;
  }
  .red {
    font-size: 42px;
    color: red;
  }
}
</style>
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
