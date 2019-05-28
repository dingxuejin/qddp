<template>
  <div class="threePieWrap">
    <!-- <Highcharts ref="highcharts" :options="drawpie" style="width:100%;height:100%"/> -->
    <div ref="highcharts"
         style="width:100%;height:100%"></div>
  </div>
</template>
<script>
import HighCharts from 'highcharts'
import Highcharts3D from 'highcharts/highcharts-3d'
Highcharts3D(HighCharts)
export default {
  name: 'threePie',
  components: {},
  props: {
    piedata: {
      type: Array,
      default () {
        return [
          {
            name: '工单总数',
            total: '14',
            data: [['离线', 8], ['故障', 6]]
          }
        ]
      }
    }
  },
  data () {
    return {}
  },
  watch: {
    piedata: {
      handler (val) {
        this.initChart()
      },
      deep: true
    }
  },
  computed: {
    drawpie () {
      const options = this.options
      options.series = this.piedata
      return options
    }
  },
  methods: {
    initChart () {
      let options = {
        chart: {
          type: 'pie',
          backgroundColor: 0,
          // borderColor: 0,
          options3d: {
            enabled: true,
            alpha: 30,
            beta: 0 // 3D 图表的外旋转角度，以 x 轴为轴的旋转角度
          },
          margin: [0, 10, 10, 0]
        },
        title: {
          align: 'center',
          verticalAlign: 'middle', // 标题在环的中间显示
          text: this.piedata[0].name + '<br/>' + this.piedata[0].total, // 图表的标题文字
          style: {
            fontSize: '60px',
            color: '#fff',
            fontWeight: '300'
          },
          // x: -82,
          y: 5
        },
        colors: [
          '#19B59C',
          '#C735C4',
          '#FEDD2E',
          '#F07461',
          '#009DE6',
          '#2E61A0'
        ],
        credits: {
          enabled: false // 隐藏highcharts.com标识
        },
        plotOptions: {
          pie: {
            showInLegend: true,
            center: ['50%', '50%'],
            slicedOffset: 0, // 突出距离
            allowPointSelect: true, // 每个扇块能否选中
            cursor: 'pointer', // 鼠标指针
            innerSize: '50%', // 设置环，内环占比
            size: '60%', // 设置环，内环占比
            depth: 150, // 饼图的厚度
            dataLabels: {
              // enabled: false, // 是否显示饼图的线形tip
              // format: '{series.name}: <b>{point.percentage:.1f}%}' // tip显示内容{point.name}:{point.y}
              formatter: function () {
                let percentage = 0
                if (this.colorIndex === 0) {
                  let total = 0
                  this.series.data.forEach((val, i) => {
                    if (i > 0) {
                      total += parseInt(val.percentage * 10) / 10
                    }
                  })
                  percentage = 100 - total
                } else {
                  percentage = this.percentage
                }
                return `<div style='color:${this.color}; font-size:36px;'>${this.key}</div>
                <br/>
                <div style='color:${this.color}; font-size:32px;'>${this.y}(${parseInt(percentage * 10) / 10}%)</div>`
              }
            },
            events: {
              click: function (e) {
                console.log(e)
              }
            },
            tooltip: {
              // pointFormatter: (v) => {
              //   console.log(v)
              // }
            }
          }
        },
        tooltip: {
          enabled: false
          // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        legend: {
          enabled: false,
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'center',
          x: -18,
          y: 55,
          floating: true,
          squareSymbol: true,
          symbolRadius: 0,
          symbolHeight: 16,
          symbolPadding: 15,
          itemStyle: {
            color: '#fff',
            cursor: 'pointer',
            fontSize: '48px',
            fontWeight: '100'
          },
          // 图例点击后颜色
          itemHiddenStyle: {
            color: '#00ffff'
          },
          // 鼠标放上样式
          itemHoverStyle: {
            color: '#00ffff'
          },
          // labelFormat: '<span style="{color}">{name} : {value}</span>'
          labelFormatter: function () {
            let y = this.y
            let total = this.total
            let ratio = Math.round((y * 1000 / total)) / 10
            return this.name + ':' + y + ' ' + '(' + ratio + '%' + ')'
          }
        },
        series: this.piedata
      }
      HighCharts.chart(this.$refs.highcharts, options)
    }
  },
  mounted () {
    this.initChart()
  }
}
</script>
<style lang="scss" scoped>
.threePieWrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
</style>
