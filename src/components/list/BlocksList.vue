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
              <p>Block {{item.height}}</p>
              <!-- <span>{{item.size}} Bytes</span> -->
            </div>
            <div class="bottom">
              <router-link to="/blocks/BlocksInfo">{{item.blockHash}}</router-link>
              <span>{{item.timeStamp}}</span>
            </div>
          </div>
        </li>
      </vue-scroll>
    </ul>
  </div>
</template>

<script>
export default {
  name: "blockslist",
  components: {},
  data() {
    return {
      ops: {},
      blocksList: []
    };
  },
  mounted() {
    this.getBlocksList();
  },
  methods: {
    getBlocksList() {
      this.$axios
        .post("/api/v1.0/blocks/blockList", {
          start: "0",
          pageSize: "3"
        })
        .then(response => {
          console.log(response.data);
          this.blocksList = response.data.data;
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
          }
        });
    }
  }
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
