<template>
  <div class="tps apex-modul fr">
    <p class="apex-title">Live TPS</p>
    <div class="chart-box" id="echartContainer" style="width:100%;"></div>
  </div>
</template>
<script>
import echarts from "echarts";
import util from "./../../utils/utils";

export default {
  name: "livetps",
  components: {},
  data() {
    return {
      blockTips_url: "/api/v1.0/state/blockTpsInfos",
      params: { time: "2018-11-20", count: "100" },
      data: [],
      time: [],
      tooltps: [],
      myChart: null
    };
  },
  created() {},
  mounted() {
    this.myChart = echarts.init(document.getElementById("echartContainer"));
    this.postBlockTips();
    const timer = setInterval(() => {
      this.postBlockTips();
    }, 2000);
    this.$once("hook:beforeDestroy", () => {
      clearInterval(timer);
    });
  },
  methods: {
    postBlockTips() {
      this.$axios
        .post(this.blockTips_url, this.params)
        .then(response => {
          let res = response.data.data;
          let time = [];
          let data = [];
          let tooltps = [];
          for (let i = 0; i < res.length; i++) {
            time.push(util.utilMethods.tierAllTime(res[i].timeStamp));
            data.push(res[i].tps);
            tooltps.push(util.utilMethods.tierAllTime(res[i].timeStamp));
          }
          // this.alldata.push({ tps: data, timeStamp: time });
          this.time = time;
          this.tooltps = tooltps;
          this.data = data;
          this.drawCharts();
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    drawCharts() {
      // 绘制图表
      this.myChart.setOption({
        color: ["#1AC8FF"],
        grid: {
          left: -48,
          right: 0,
          top: 0,
          bottom: 5,
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.time.map(item => {
            let x = item.trim().split(" ");
            return x[1];
          }),
          show: true,
          axisLine: {
            show: true,
            lineStyle: {
              color: "#999"
            }
          },
          splitLine: { show: false },
          axisTick: { show: false },
          axisLabel: {
            interval: 2
          }
        },
        yAxis: {
          // type: "value",
          show: false,
          boundaryGap: false,
          axisLine: {
            show: true,
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
          }
          // formatter: function(data) {
          //   let res;
          //   tooltps.forEach(v => {
          //       res = "2019-03-28" + v
          //   });
          //   return "TPS " + res;
          // }
        },
        series: [
          {
            name: "",
            data: this.data,
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
      window.addEventListener("resize", () => {
        this.myChart.resize();
        // this.myChart.setOption.grid = "0"
      });
    }
  },
  destroyed() {
    this.myChart.clear();
  },
  computed: {}
};
</script>
<style scoped lang="less">
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
  .chart-box {
    position: absolute;
    bottom: 0;
    left: 0;
    margin: 0;
    height: calc(~"100% - 60px");
  }
}
@media screen and(max-width:1366px) {
  .home {
    .chart-box {
      height: calc(~"100% - 60px");
    }
  }
}
</style>
