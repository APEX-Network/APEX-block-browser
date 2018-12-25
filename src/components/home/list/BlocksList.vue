<template>
  <div class="min-height">
    <div class="main">
      <div class="uchain-box">
        <div class="uchain-title">
          <p>Blacks</p>
        </div>
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
              <span class="col">{{item.height}}</span>
              <span class="col col-lg-6">
                <router-link to="/home/blocks/details">{{item.hashCode}}</router-link>
              </span>
              <span class="col">{{item.age}}</span>
              <span class="col">{{item.txn}}</span>
              <span class="col">{{item.miner}}</span>
            </li>
          </ul>
          <Pagination />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "@/components/public/Pagination.vue";
export default {
  name: "blocks",
  components: {
    Pagination
  },
  data() {
    return {
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
</style>
