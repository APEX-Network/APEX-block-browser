<template>
  <div class="overview apex-modul fl">
    <p class="apex-title">Overview</p>
    <ul class="clearboth">
      <li>
        <p>Last Block</p>
        <p>{{lastBlock}}</p>
      </li>
      <li>
        <p>Max TPS</p>
        <p>{{overView_data.tps}}</p>
      </li>
      <li>
        <p>Daily TX</p>
        <p>{{overView_data.dailyTxs}}</p>
      </li>
      <li>
        <p>Daily Active Accounts</p>
        <p>{{overView_data.dailyActiveAccounts}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
import Bus from "./../../utils/bus";
export default {
  name: "overview",
  components: {},
  data() {
    return {
      overView_url: "/api/v1.0/state/blockStateInfo",
      overView_data: {
        // lastBlock: null,
        tps: null,
        dailyTxs: null,
        dailyActiveAccounts: null
      },
      lastBlock: null
    };
  },
  created: function() {},
  mounted() {
    this.getOverView();
  },
  methods: {
    requesFullScreen(element) {
      let requestMethod = element.requesFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
      if (requestMethod) {
        requestMethod.call(element);
      } else if (typeof window.ActiveXObject !== "undefined") {
        let wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
          wscript.SendKeys("{F11}");
        }
      }
    },
    
    exitFullScreen() {
      let exitMethod = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.webkitExitFullscreen;
      document.webkitExitFullscreen;
      if (exitMethod) {
        exitMethod.call(document);
      } else if (typeof window.ActiveXObject !== "undefined") {
        let wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
          wscript.SendKeys("{F11}");
        }
      }
    },

    getOverView() {
      this.$axios
        .get(this.overView_url)
        .then(response => {
          let res = response.data.data;          
          this.overView_data.tps = res.tps;
          this.overView_data.dailyTxs = res.dailyTxs;
          this.overView_data.dailyActiveAccounts = res.dailyActiveAccounts;
        })
        .catch(function(response) {
          console.log(response);
        });
      Bus.$on("lastBlock", data => {
        this.lastBlock = data;
      });
    }
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
}
</style>
