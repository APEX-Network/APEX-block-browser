<template>
  <div class="tps apex-modul fr">
    <p class="apex-title">Latest Week's Transactions History</p>
    <div class="chart-box" id="echartContainer" style="width:100%;"></div>
  </div>
</template>
<script>
import echarts from "echarts";
import util from "@/utils/utils";

export default {
  name: "livetps",
  components: {},
  data() {
    return {
      blockTips_url: "/api/v1.0/state/txsDaily",
      params: { count: "100" },
      data: [],
      time: [],
      tooltps: [],
      myChart: null,
      alldata: []
    };
  },
  created() {},
  mounted() {
    this.myChart = echarts.init(document.getElementById("echartContainer"));
    this.postWeekTxs();
  },
  methods: {
    postWeekTxs() {
      this.$axios
        .post(this.blockTips_url, this.params)
        .then(response => {          
          this.data = [];
          this.alldata = [];
          let resData = response.data.data;
          let res;
          if (resData.length >= 9) {
            res = resData.slice(
              resData.length - 8,
              resData.length - 1
            );
          } else {
            res = resData.slice(0, resData.length - 1);
          } 
          let time = [];
          let data = [];
          let tooltps = [];
          for (let i = 0; i < res.length; i++) {
            time.push(util.utilMethods.tierAllTime(res[i].timeStamp));
            data.push(res[i].txs);
            tooltps.push(util.utilMethods.UTCallTime(res[i].timeStamp));
          }
          this.alldata.push({ txs: data, timeStamp: tooltps });
          this.time = time;
          this.tooltps = tooltps;
          this.data = data;
          if (this.data.length !== 0 && resData !== "NotFound") {
            this.drawCharts();
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    drawCharts() {
      // 绘制图表
      this.myChart.setOption({
        title: {
          text: "UTC",
          textStyle: {
            color: "#fff",
            fontSize: "10"
          },
          left: "90.5%",
          top: "79%"
        },
        color: ["#1AC8FF"],
        grid: {
          left: -60,
          right: 0,
          top: 0,
          bottom: 5,
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: this.time,
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
            interval: 0
          }
        },
        yAxis: {
          type: "value",
          show: false,
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLine: { show: false },
          boundaryGap: true
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
              color: "#00c3ff"
            },
            lineStyle: {
              color: "#00c3ff"
            },
            areaStyle: {
              opacity: 0.1,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#00c3ff"
                },
                {
                  offset: 1,
                  color: "#00c3ff"
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
.bottom-modul,
.top-modul {
  height: 49%;
  margin-bottom: 2%;
  .apex-modul {
    .apex-title {
height: 50px;
        line-height: 50px;      span:hover {
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
@media screen and(max-width:1366px) {
  .chart-box {
    height: calc(~"100% - 60px");
  }
}
</style>
