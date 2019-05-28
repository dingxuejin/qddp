<template>
  <transition name='opacity1'>
    <div class="echart-container">
      <v-chart :options='newOption'
      ref="pie"
               :auto-resize='true' />

    </div>
  </transition>

</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      status: 'left1',
      options: {
        color: [
          'rgba(0,206,123,0.9)',
          'rgba(0,180,123,0.8)',
          'rgba(0,160,123,0.7)',
          'rgba(0,140,123,0.6)',
          'rgba(0,120,123,0.5)',
          'rgba(0,100,123,0.4)',
          'rgba(0,206,123,0.3)',
          'rgba(0,206,123,0.2)',
          'rgba(0,206,123,0.9)',
          'rgba(0,180,123,0.8)',
          'rgba(0,160,123,0.7)',
          'rgba(0,140,123,0.6)',
          'rgba(0,120,123,0.5)',
          'rgba(0,100,123,0.4)',
          'rgba(0,206,123,0.3)',
          'rgba(0,206,123,0.2)'
        ],
        title: {
          text: '{zs|总数：}{per|6133}',
          left: 'center',
          top: 20,
          borderColor: '#1694FB',
          borderWidth: 2,
          padding: [20, 60],
          textStyle: {
            color: '#fff',
            rich: {
              per: {
                fontFamily: 'digitfont',
                color: '#FBEF50',
                fontSize: 60,
                align: 'center'
              },
              zs: {
                color: '#fff',
                fontFamily: 'digitfont',
                fontSize: 60,
                align: 'center'
              }
            }
          }
        },
        grid: {
          left: 10,
          bottom: 10,
          top: 10,
          right: 10
        },
        series: [
          {
            type: 'pie',
            center: ['50%', '55%'],
            radius: ['30%', '50%'],
            minAngle: 35,
            // roseType: true,
            z: 2,
            itemStyle: {
              borderWidth: 1,
              borderColor: '#fff'

            },
            hoverOffset: 10,
            label: {
              show: true,
              color: '#fff',
              formatter: '{per|{c}} {b| ( {d}% )}\n{hr|}\n{c|{b}}',
              rich: {
                b: {
                  color: '#FBEF50',
                  fontFamily: 'digitfont',
                  borderTopWidth: 1,
                  borderTopColor: '#fff',
                  fontSize: 48,
                  height: 80,
                  align: 'center'
                },
                c: {
                  color: '#fff',
                  borderTopWidth: 1,
                  borderTopColor: '#fff',
                  fontSize: 48,
                  height: 80,
                  align: 'center'
                },
                hr: {
                  borderColor: '#fff',
                  width: 280,
                  borderWidth: 1,
                  height: 0,
                  align: 'center'
                },
                per: {
                  fontFamily: 'digitfont',
                  color: '#FBEF50',
                  height: 80,
                  fontSize: 48,
                  align: 'center'
                }
              }
            },
            labelLine: {
              length: 50,
              length2: 0,
              lineStyle: {
                color: '#fff'
              }
            },
            data: [
              {
                name: '客户原因',
                value: 100
              },
              {
                name: '运行维护不担当',
                value: 90
              },
              {
                name: '安装不当',
                value: 80
              },
              {
                name: '设备本体',
                value: 70
              },
              {
                name: '停限电',
                value: 60
              },
              {
                name: '外力破坏',
                value: 50
              },
              {
                name: '变电设施影响',
                value: 45
              }
            ]
          }
        ]
      }
    }
  },
  computed: {
    ...mapState('FirstRight', ['cfData', 'gdyyData']),
    newOption () {
      let options = JSON.parse(JSON.stringify(this.options))
      if (this.status === 'left2') {
        let data = this.cfData
        if (data && data.length > 0) {
          data = data[0]
          options.series[0].data = [
            {
              name: '一次',
              value: data.REPEAT_NUM_1
            },
            {
              name: '两次',
              value: data.REPEAT_NUM_2
            },
            {
              name: '三次',
              value: data.REPEAT_NUM_3
            },
            {
              name: '四次',
              value: data.REPEAT_NUM_4
            },
            {
              name: '五次',
              value: data.REPEAT_NUM_5
            }
          ]
          options.series[0].data = options.series[0].data.filter(item => {
            if (item.value !== 0) {
              return item
            }
          })
          let total =
            data.REPEAT_NUM_1 +
            data.REPEAT_NUM_2 +
            data.REPEAT_NUM_3 +
            data.REPEAT_NUM_4 +
            data.REPEAT_NUM_5
          options.title.text = '{zs|总数：}{per|' + total + '}'
        }
      } else {
        let data = this.gdyyData
        if (data && data.length > 0) {
          let total = 0
          options.series[0].data = data.map(val => {
            total += val.GDSL
            return {
              name: val.GDYY,
              value: val.GDSL
            }
          })

          options.title.text = '{zs|总数：}{per|' + total + '}'
        }
        options.series[0].data = options.series[0].data.filter(item => {
          if (item.value !== 0) {
            return item
          }
        })
      }
      return options
    }
  },
  methods: {
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
