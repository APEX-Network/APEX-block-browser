<template>
  <div class="BlocksInfo">
    <apex-title :title="title"/>
    <apex-back-ground/>
    <div class="data-table">
      <ul class="table-ul">
        <li v-for="(value, key ,index ) in blocksInfo" :key="index" class="row">
          <li v-for="(value, key ,index ) in blocksInfo" :key="index" class="row">
          <span class="col">{{key}} :</span>
          <span class="col col-lg-8" v-if="key === 'producer'">
            <router-link to="/producer">{{value}}</router-link>
          </span>
          <span class="col col-lg-8" v-else-if="key === 'producerSig'">
            <router-link to="/producer/ProducerInfo">{{value}}</router-link>
          </span>
          <span
            class="col col-lg-8"
            v-for="(block,index) in blockHash"
            :key="index"
            v-else-if="key === 'blockHash'"
          >{{block}}</span>
          <span class="col col-lg-8" v-else>{{value}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ApexTitle from "@/components/public/ApexTitle.vue";
import ApexBackGround from "@/components/public/ApexBackGround.vue";
import Pagination from "@/components/public/Pagination.vue";
import eventBus from "../../utils/eventBus";

export default {
  name: "BlocksInfo",
  components: {
    Pagination,
    ApexTitle,
    ApexBackGround
  },
  created() {
    this.getBlocksInfo();
  },
  data() {
    return {
      title: "Blocks Information",
      blocksInfo: '',
      blockHash: ''
    };
  },
  mounted() {
  },
  methods: {
    getBlocksInfo() {
      eventBus.$on("sendUrl", (val) => {
        this.blockHash = val;
        console.log('blockHash',this.blockHash);
        if (val) {
          this.$axios
            .get("/api/v1.0/blocks/blockHash/" + val)
            .then(response => {
              let result = response.data.data;
              this.blocksInfo = result;
              console.log(this.blocksInfo);
            })
            .catch(function(response) {
              console.log(response);
            });
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "./../../assets/css/layout";

.BlocksInfo {
  width: 100%;
  height: 100%;
  background: url(./../../assets/images/shared/yunshi.png) 40% 45% no-repeat;
}
</style>
