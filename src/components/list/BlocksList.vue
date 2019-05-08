<template>
  <div class="block apex-modul fl">
    <p class="apex-title">
      Latest Blocks
      <router-link to="/blocks">
        <span>ALL</span>
      </router-link>
    </p>
    <ul class="apex-list">
      <vue-scroll :ops="ops">
        <li v-for="(item,index) in blocksList" :key="index.id">
          <!-- <transition name="bounceUp" tag="li"> -->
            <div>
              <div class="top">
                <p>Block Height {{item.height}}</p>
                <!-- <span>{{item.size}} Bytes</span> -->
              </div>
              <div class="bottom">
                <router-link to @click.native="setClickValue(item.blockHash)">{{item.blockHash}}</router-link>
                <span>{{item.timeStamp}}</span>
              </div>
            </div>
          <!-- </transition> -->
        </li>
      </vue-scroll>
    </ul>
  </div>
</template>

<script>
import Bus from "./../../utils/bus";
import util from "./../../utils/utils";
require("vue2-animate/dist/vue2-animate.min.css");
export default {
  name: "blockslist",
  components: {},
  data() {
    return {
      ops: {},
      blocksList: [],
      block_list_url: "/api/v1.0/blocks/blockList",
      params: {
        start: "0",
        pageSize: "10"
      },
      clickValue: {
        type: "hash",
        value: null
      },
      lastBlock: null
    };
  },
  mounted() {
    this.getBlocksList();
    const timer = setInterval(() => {
      this.getBlocksList();
    }, 1500);
    this.$once("hook:beforeDestroy", () => {
      clearInterval(timer);
    });
  },
  methods: {
    getBlocksList() {
      this.$axios
        .post(this.block_list_url, this.params)
        .then(response => {
          let res = response.data.data;
          let serverTime = response.headers.date;
          let time;
          for (let i = 0; i < res.length; i++) {
            const item = res[i];
            time = util.utilMethods.listUTCtime(item.timeStamp, serverTime);
            item.timeStamp = time;
            this.lastBlock = res[0].height;
          }
          this.blocksList = res;
          Bus.$emit("lastBlock", this.lastBlock);
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
          }
        });
    },
    setClickValue(data) {
      this.$router.push({
        path: "/blocks/BlocksInfo",
        query: {
          id: data
        }
      });
    },
    offListener() {
      Bus.$off("clickValue");
      Bus.$off("lastBlock");
    }
  },
  beforeDestroy() {
    this.offListener();
  }
};
</script>

<style scoped lang="less">
.apex-modul {
  .apex-title {
    height: 43px;
    a {
      display: inline;
      span {
        color: #f26522;
      }
    }
    span:hover {
      box-shadow: 2px 2px 8px 2px #f26522;
    }
  }
}
</style>
