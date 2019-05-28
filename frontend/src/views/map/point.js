class Point {
  constructor (point) {
    this.option = {
      series: [{
        name: ' Top10',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: {
          // brushType: 'stroke',
          scale: 5
        },
        label: {
          normal: {
            show: true,
            position: 'right',
            formatter: '{b}'
          }
        },
        symbolSize: 20,
        itemStyle: {
          normal: {
            color: '#00D280'
          }
        },
        data: point

      }]
    }
  }
}
export default Point
