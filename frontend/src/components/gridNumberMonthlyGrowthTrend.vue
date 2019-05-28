<template>
<!-- 并网数量月增长趋势 -->
  <div class="echart-container-other-main"
       style="width:100%;height:100%;">
    <v-chart :options='newOptionsNext'
             :auto-resize='true' />
  </div>
</template>
<script>
/* eslint-disable */
import echarts from "echarts";
export default {
  data() {
    return {
      status: "left1",
      optionsNext: {
        grid: {
          containLabel: true,
          left: 20,
          right: 20,
          top: 20,
          bottom: 20
        },
        legend: {
          data: ["2017", "2018", "2019"]
        },
        xAxis: [
          {
            type: "category",
            axisLine: {
              lineStyle: {
                color: "#1073C9",
                type: "dashed"
              }
            },
            axisLabel: {
              color: "#fff",
              fontSize: 42
            },
            data: [
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "11",
              "12"
            ]
          }
        ],
        yAxis: [
          {
            nameTextStyle: {
              color: "#fff",
              fontSize: 42
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              color: "#fff",
              fontSize: 42
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#1073C9",
                type: "dashed"
              }
            }
          }
        ],
        series: [
          {
            type: "bar",
            barWidth: 18,

            label: {
              show: true,
              position: "top",
              color: "#fff"
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
                      color: "#1C92FC"
                    },
                    {
                      offset: 0.8,
                      color: "#526A7C"
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
          },
          {
            type: "line",
            itemStyle: {
              color: "#E77864"
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
            type: "line",
            itemStyle: {
              color: "#3BDFAC"
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
          }
        ]
      }
    };
  },
  computed: {
    newOptionsNext() {
      let optionsNext = this.optionsNext;
      if (this.status === "left2") {
        optionsNext.series[0].data = [
          2.0,
          4.9,
          27.0,
          23.2,
          25.6,
          76.7,
          135.6,
          162.2,
          32.6,
          20.0,
          6.4,
          3.3
        ];
        optionsNext.series[1].data = [
          12.0,
          14.9,
          71.0,
          23.2,
          25.6,
          76.7,
          135.6,
          162.2,
          32.6,
          20.0,
          16.4,
          13.3
        ];
        optionsNext.series[2].data = [
          2.0,
          44.9,
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
        ];
      } else {
        optionsNext.series[0].data = [
          42.0,
          40.9,
          27.0,
          23.2,
          25.6,
          76.7,
          135.6,
          162.2,
          32.6,
          20.0,
          6.4,
          3.3
        ];
        optionsNext.series[1].data = [
          12.0,
          14.9,
          71.0,
          23.2,
          25.6,
          76.7,
          135.6,
          162.2,
          32.6,
          20.0,
          16.4,
          13.3
        ];
        optionsNext.series[2].data = [
          211.0,
          44.9,
          7.0,
          23.2,
          25.6,
          76.7,
          35.6,
          62.2,
          32.6,
          20.0,
          62.4,
          34.3
        ];
      }
      return optionsNext;
    }
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.echart-container-other-main {
  width: 100%;
  height: 100%;
  .echarts {
    width: 100%;
    height: 100%;
  }
}
</style>
