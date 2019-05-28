<template>
  <transition name='opacity1'>
    <div class="echart-container">

      <v-chart :options="newOption"
               :auto-resize='true' />

    </div>
  </transition>

</template>
<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      show: false,
      option: {
        grid: {
          containLabel: true,
          left: 60,
          right: 60,
          top: 100,
          bottom: 60
        },
        tooltip: {
          show: true,
          textStyle: {
            fontSize: 42
          }
        },
        xAxis: {
          data: ['市区', '北部', '崂山', '红岛'],
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
          }
        },
        yAxis: {
          name: '(个)',
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
        },
        series: [
          {
            type: 'bar',
            barWidth: 54,

            label: {
              show: true,
              position: 'top',
              fontSize: 48,
              color: '#fff'
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
                      color: '#1ABA9F'
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
            data: [254, 324, 164, 254]
          }
        ]
      }
    }
  },
  props: {
    gradientColor: {
      type: Array,
      default: function () {
        return ['rgba(32,201,100,0.9)', 'rgba(32,201,100,0.1)']
      }
    },
    aDate: {
      type: Array,
      default: function () {
        return [
          {
            dress: '市区',
            value: 254
          },
          {
            dress: '北部',
            value: 324
          },
          {
            dress: '崂山',
            value: 164
          },
          {
            dress: '红岛',
            value: 254
          }
        ]
      }
    }
  },
  computed: {
    newOption () {
      let option = this.option
      let xdata = []
      let vdata = []
      this.aDate.map((k, i) => {
        xdata[i] = k.dress
        vdata[i] = k.value
      })
      option.xAxis.data = xdata
      option.series[0].data = vdata
      option.series[0].itemStyle.normal.color = new echarts.graphic.LinearGradient(
        0,
        0,
        0,
        1,
        [
          {
            offset: 0,
            color: this.gradientColor[0]
          },
          {
            offset: 0.8,
            color: this.gradientColor[1]
          }
        ],
        false
      )
      return option
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
