<template>
  <!-- 分布式光伏分类统计 -->
  <div class="bottom-container">
    <div class="betweenbox bottom-title">
      <div>
        <span>占比/并网数量（个）</span>
      </div>
      <div>
        <span>占比/装机容量（MW）</span>
      </div>
    </div>
    <v-chart :options='newOption'
             :auto-resize='true' />
  </div>

</template>

<script>
/* eslint-disable */
import echarts from "echarts";
export default {
  props: {
    fbsgf: {
      type: Object,
      default() {
        return {
          bw: [
            {
              value: 3,
              total: 12
            },
            {
              value: 5,
              total: 32
            },
            {
              value: 30,
              total: 120
            }
          ],
          zj: [
            {
              value: 3,
              total: 12
            },
            {
              value: 5,
              total: 32
            },
            {
              value: 30,
              total: 120
            }
          ]
        };
      }
    }
  },
  data() {
    return {
      options: {
        grid: [
          {
            left: 60,
            top: 60,
            bottom: 60,
            width: 450
            // containLabel: true
          },
          {
            right: 60,
            top: 60,
            bottom: 60,
            width: 450
            // containLabel: true
          }
        ],
        xAxis: [
          {
            show: false,
            type: "value",
            gridIndex: 0,
            inverse: true
          },
          {
            show: false,
            type: "value",
            gridIndex: 1
          }
        ],
        yAxis: [
          {
            show: false,
            type: "category",
            position: "right",
            gridIndex: 0,
            data: ["10kV及以上", "380V", "220V"]
          },
          {
            // show: false,
            type: "category",
            gridIndex: 1,
            axisLine: {
              show: false
            },
            axisLabel: {
              color: "#fff",
              align: "right",
              width: 330,
              formatter: function(params) {
                return `{a|${params}}`;
              },
              rich: {
                a: {
                  align: "center",
                  fontSize: 60
                }
              }
            },
            data: ["10kV及以上", "380V", "220V"]
          }
        ],
        series: [
          {
            type: "bar",
            xAxisIndex: 0,
            yAxisIndex: 0,
            barWidth: 60,
            itemStyle: {
              color: "#0B1240",
              borderColor: "#1B2052",
              borderWidth: 1,
              barBorderRadius: [15, 0, 0, 15]
            },
            data: [100, 100, 100]
          },
          {
            type: "bar",
            xAxisIndex: 0,
            yAxisIndex: 0,
            label: {
              show: true,
              fontFamily: "digitfont",
              fontSize: 80,
              formatter: function(params) {
                let string = `${params.value}%/${params.data.total}`;
                return string;
              },
                position: 'insideTopRight',
                   offset:[0,-110],
              color: "#23e7ad"
            },
            barWidth: 66,
            barGap: "-100%",
            itemStyle: {
              color: {
                type: "linear",
                x: 1,
                y: 0,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "#0B1240" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#23e7ad" // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              },
              barBorderRadius: [15, 0, 0, 15]
            },
            data: [10, 20, 15]
          },
          {
            type: "bar",
            xAxisIndex: 1,
            yAxisIndex: 1,
            barWidth: 66,
            itemStyle: {
              color: "#0B1240",
              borderColor: "#1B2052",
              borderWidth: 1,
              barBorderRadius: [0, 15, 15, 0]
            },
            data: [100, 100, 100]
          },
          {
            type: "bar",
            xAxisIndex: 1,
            yAxisIndex: 1,
            barWidth: 66,
            barGap: "-100%",
            label: {
              show: true,
              fontFamily: "digitfont",
              fontSize: 75,
              formatter: function(params) {
                let string = `${params.value}%/${params.data.total}`;
                return string;
              },
             position: 'insideTopLeft',
             offset:[0,-110],
              color: "#1595ff"
            },
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "#0B1240" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#1595ff" // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              },
              barBorderRadius: [0, 15, 15, 0]
            },
            data: [90, 20, 15]
          }
        ]
      }
    };
  },
  computed: {
    newOption() {
      let options = this.options;
      options.series[1].data = this.fbsgf.bw;
      options.series[3].data = this.fbsgf.zj;
      return options;
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.bottom-container {
  width: 100%;
  height: 100%;
  .bottom-title {
    padding: 20px;
    font-size: 66px;
    height: 150px;
  }
  .echarts {
    width: 100%;
    height: calc(100% - 200px);
  }
}
</style>
