<template>
  <div class="block apex-modul fl">
    <p class="apex-title">
      Blocks
      <span>
        <router-link to="/blocks">ALL</router-link>
      </span>
    </p>
    <ul class="apex-list">
      <vue-scroll :ops="ops">
        <li v-for="(item,index) in blocksList" :key="index">
          <div>
            <div class="top">
              <p>Block {{item.height}} Bytes</p>
              <!-- <span>{{item.size}} Bytes</span> -->
            </div>
            <div class="bottom">
              <router-link to="/blocks/BlocksInfo" @click.native="setClickValue">{{item.blockHash}}</router-link>
              <span>{{item.timeStamp}} seconds ago</span>
            </div>
          </div>
        </li>
      </vue-scroll>
    </ul>
  </div>
</template>

<script>
import Bus from "./../../utils/bus";
import util from "./../../utils/utils";
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
      }
    };
  },
  mounted() {
    this.getBlocksList();
    setInterval(() => {
      this.getBlocksList();
    }, 10000);
  },
  methods: {
    getBlocksList() {
      this.$axios
        .post(this.block_list_url, this.params)
        .then(response => {
          let res = response.data.data;
          let seconds;
          for (let i = 0; i < res.length; i++) {
            const item = res[i];
            seconds = util.utilMethods.getSec(item.timeStamp);
            item.timeStamp = seconds;
          }
          this.blocksList = res;
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
          }
        });
    },
    setClickValue(e) {
      this.clickValue.value = e.target.innerHTML;
      Bus.$emit("clickValue", JSON.stringify(this.clickValue));
    }
  },
  beforeDestroy() {}
};
</script>

<style scoped lang="less">
.apex-modul {
  .apex-title {
    height: 43px;
    span {
      a {
        color: #f26522;
      }
    }
    span:hover {
      box-shadow: 2px 2px 8px 2px #f26522;
    }
  }
}
</style>
