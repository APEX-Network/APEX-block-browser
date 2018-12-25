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
                <router-link to="/blocks/BlocksInfo">{{item.hashCode}}</router-link>
              </span>
              <span class="col">{{item.age}}</span>
              <span class="col txn">{{item.txn}}</span>
              <span class="col">{{item.miner}}</span>
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
  data() {
    return {
      title: "Blocks",
      dataLIst: [
        {
          height: "6353170",
          hashCode:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25",
          age: 18,
          txn: 20,
          miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7"
        },
        {
          height: "6353170",
          hashCode:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25",
          age: 18,
          txn: 20,
          miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7"
        },
        {
          height: "6353170",
          hashCode:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25",
          age: 18,
          txn: 20,
          miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7"
        },
        {
          height: "6353170",
          hashCode:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25",
          age: 18,
          txn: 20,
          miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7"
        },
        {
          height: "6353170",
          hashCode:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25",
          age: 18,
          txn: 20,
          miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7"
        },
        {
          height: "6353170",
          hashCode:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25",
          age: 18,
          txn: 20,
          miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7"
        },
        {
          height: "6353170",
          hashCode:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25",
          age: 18,
          txn: 20,
          miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7"
        },
        {
          height: "6353170",
          hashCode:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25",
          age: 18,
          txn: 20,
          miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7"
        },
        {
          height: "6353170",
          hashCode:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25",
          age: 18,
          txn: 20,
          miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7"
        },
        {
          height: "6353170",
          hashCode:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25",
          age: 18,
          txn: 20,
          miner: "APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7APAau3Dx7"
        }
      ]
    };
  }
};
</script>
<style scoped lang="less">
@import "./../../assets/css/layout";
.Blocks {
  width: 100%;
  height: 100%;
  background: url(./../../assets/images/shared/yunshi.png) 40% 50% no-repeat;
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
