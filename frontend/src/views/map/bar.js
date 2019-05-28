import * as echarts from 'echarts'
class Bar {
  constructor () {
    this.option = {
      color: ['#3398DB'],
      grid: {
        left: 20,
        right: 20,
        bottom: 20,
        top: 30,
        containLabel: true,
        z: 22
      },
      xAxis: [
        {
          type: 'category',
          gridIndex: 0,
          data: ['1月', '2月', '3月', '4月', '5月', '6月'],
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            lineStyle: {
              color: '#0c3b71'
            }
          },
          axisLabel: {
            show: true,
            color: 'rgb(170,170,170)',
            fontSize: 16
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          gridIndex: 0,
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          max: 100,
          axisLine: {
            lineStyle: {
              color: '#0c3b71'
            }
          },
          axisLabel: {
            color: 'rgb(170,170,170)',
            formatter: '{value} %'
          }
        },
        {
          type: 'value',
          gridIndex: 0,
          max: 100,
          splitNumber: 12,
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: [
                'rgba(250,250,250,0.0)',
                'rgba(250,250,250,0.05)'
              ]
            }
          }
        }
      ],
      series: [
        {
          name: '合格率',
          type: 'bar',
          barWidth: '30%',
          xAxisIndex: 0,
          yAxisIndex: 0,
          itemStyle: {
            normal: {
              barBorderRadius: 30,
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: '#00feff'
                  },
                  {
                    offset: 0.5,
                    color: '#027eff'
                  },
                  {
                    offset: 1,
                    color: '#0286ff'
                  }
                ]
              )
            }
          },
          data: [22, 33, 44, 55, 66, 77],
          zlevel: 11
        },
        {
          name: '背景',
          type: 'bar',
          barWidth: '50%',
          xAxisIndex: 0,
          yAxisIndex: 1,
          barGap: '-135%',
          data: [100, 100, 100, 100, 100, 100, 100],
          itemStyle: {
            normal: {
              color: 'rgba(255,255,255,0.1)'
            }
          },
          zlevel: 9
        }
      ]
    }
  }
}
export default Bar
