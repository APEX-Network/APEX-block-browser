<template>
  <div class="Blocks">
        <apex-title :title="title"/>
        <apex-back-ground />
        <div class="data-table">
          <ul class="table-ul">
            <li class="row">
              <span class="col">Height</span>
              <span class="col col-lg-6">Hash Code</span>
              <span class="col">Age</span>
              <span class="col">Txn</span>
              <span class="col">Miner</span>
            </li>
            <li v-for="(item,index) in dataLIst" :key="index" class="row">
              <span class="col height">
                <router-link to="/blocks/BlocksInfo">{{item.height}}</router-link>                
              </span>
              <span class="col col-lg-6">
                <router-link to="/blocks/BlocksInfo">{{item.blockHash}}</router-link>
              </span>
              <span class="col">{{item.age}}</span>
              <span class="col txn">{{item.txNum}}</span>
              <span class="col">{{item.producer}}</span>
            </li>
          </ul>
          <Pagination />
        </div>
  </div>
</template>
<script>
import Pagination from "@/components/public/Pagination.vue";
import ApexBackGround from "@/components/public/ApexBackGround.vue"
import ApexTitle from "@/components/public/ApexTitle.vue";


export default {
  name: "blocks",
  components: {
    Pagination,
    ApexBackGround,
    ApexTitle
  },
  mounted() {
    this.getAllBlocks();
  },
  data() {
    return {
      title: "Blocks",
      dataLIst: []
    };
  },
  methods: {
    getAllBlocks() {
      this.$axios
        .post("/api/v1.0/blocks/blockList", {
          start: "0",
          pageSize: "10"
        })
        .then(response => {
          console.log(response.data);
          this.dataLIst = response.data.data;
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
@import "./../../assets/css/layout";
.Blocks {
  width: 100%;
  height: 100%;
  background: url(./../../assets/images/shared/yunshi.png) 40% 45% no-repeat;
  .data-table {
    .table-ul {
      .row {
        .height,
        {
          color: #f26522
        }
      }
    }
  }
}

</style>
