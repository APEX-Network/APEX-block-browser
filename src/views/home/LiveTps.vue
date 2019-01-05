<template>
      <div class="tps apex-modul fr">
        <p class="apex-title">Live TPS</p>
        <div class="chart-box">
          <div class="chart" id="echartContainer" style="width:100%;"></div>
        </div>
      </div>
</template>
<script>
import echarts from "echarts";

export default {
  name: "livetps",
  components: {   
  },
  data() {
    return {
    };
  },
  created: function() {},
  mounted() {
      this.drawCharts(); 
  },
  methods: {
      drawCharts() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("echartContainer"));
      // 绘制图表
      myChart.setOption({
        color: ["#1AC8FF"],
        grid: {
          left: 0,
          right: 0,
          top: 45,
          bottom: 0,
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "10:08:00",
            "10:08:10",
            "10:08:20",
            "10:08:30",
            "10:08:40",
            "10:08:50",
            "10:09:00",
            "10:09:10",
            "10:09:20"
          ],
          show: false,
          axisLine: {
            show: true,
            lineStyle: {
              color: "#999"
            }
          }
        },
        yAxis: {
          type: "value",
          show: false,
          axisLine: {
            show: false,
            lineStyle: {
              color: "#999"
            }
          },
          splitLine: {
            show: false
          }
        },
        tooltip: {
          show: true,
          trigger: "axis",
          padding: [8, 10],
          backgroundColor: "rgba(161,161,161,0.1)",
          axisPointer: {
            type: "line"
          },
          textStyle: {
            color: "#ffffff",
            fontSize: "14px"
          },
          formatter: function(params, ticket, callback) {
            return "TPS " + params[0].value;
          }
        },
        series: [
          {
            name: "",
            data: [100, 111, 102, 123, 105, 133, 155, 146, 129, 120],
            type: "line",
            smooth: true,
            showSymbol: false,
            symbol: "circle", //设定为实心点
            symbolSize: 6,
            itemStyle: {
              color: "rgba(242, 101, 34, .8)"
            },
            lineStyle: {
              color: "#f26522"
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(255,255,255,.2)"
                },
                {
                  offset: 1,
                  color: "rgb(255,255,255,0)"
                }
              ])
            }
          }
        ]
      });
    }
  },
  computed: {}
};
</script>
<style scoped lang="less">
@import "./../../assets/css/layout";
.home {
  width: 100%;
  height: 100%;
  .bottom-modul,
  .top-modul {
    height: 49%;
    margin-bottom: 2%;
    .apex-modul {
      .apex-title {
        height: 43px;
        span:hover {
          box-shadow: 2px 2px 8px 2px #f26522;
        }
      }
    }
  }
  .tps {
    .chart-box {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      .chart {
        height: 300px;
      }
    }
  }
}
// @media screen and(max-width:1366px) {
//   .home {
//     .tps {
//       .chart-box {
//         .chart {
//           height: 190px;
//         }
//       }
//     }
//   }
// }
</style>
