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
        <li ref="bList" v-for="(item,index) in blocksList" :key="index.id">
          <div>
            <div class="top">
              <p>Block Height {{item.height}}</p>
            </div>
            <div class="bottom">
              <span class="hash" @click="setClickValue(item.blockHash)">{{item.blockHash}}</span>
              <span>{{item.timeStamp}}</span>
            </div>
          </div>
        </li>
      </vue-scroll>
    </ul>
  </div>
</template>

<script>
import Bus from "@/utils/bus";
import util from "@/utils/utils";
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
      lastBlock: null,
      newBlock: null,
      time: 500
    };
  },
  mounted() {
    this.getBlocksList();
    const timer = setInterval(() => {
      this.getBlocksList();
    }, 2000);
    this.$once("hook:beforeDestroy", () => {
      clearInterval(timer);
    });
  },
  methods: {
    changeColor() {
      this.newBlock = this.$refs.bList;
      this.newBlock[0].style.opacity = "0";
      setTimeout(() => {
        this.newBlock[0].style.opacity = "1";
        this.newBlock[0].style.transition = "opacity 0.5s linear";
      }, this.time);
    },
    getBlocksList() {
      this.$axios
        .post(this.block_list_url, this.params)
        .then(response => {
          this.blocksList = [];
          let res = response.data.data;
          let serverTime = response.headers.date;
          let time;
          for (let i = 0; i < res.length; i++) {
            let item = res[i];
            time = util.utilMethods.listUTCtime(item.timeStamp, serverTime);
            item.timeStamp = time;
            this.lastBlock = res[0].height;
          }
          this.blocksList = res;
          Bus.$emit("lastBlock", this.lastBlock);
          if (this.blocksList !== []) {
            this.changeColor();
          }
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
  .apex-list {
    li:nth-child(0) {
      opacity: 0;
      transition: opacity 0.5s linear;
    }
  }
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
