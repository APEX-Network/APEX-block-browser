<template>
  <div class="BlocksInfo">
    <apex-title :title="title"/>
    <apex-back-ground/>
    <div class="data-table">
      <ul class="table-ul">
        <li v-for="(value, key ,index ) in blocksInfo" :key="index" class="row">
          <span class="col">{{key}} :</span>
          <span class="col col-lg-8" v-if="key === 'Parent Hash'">
            <router-link to="/blocks/BlocksInfo">{{value}}</router-link>
          </span>
          <span class="col col-lg-8" v-else-if="key === 'Mined By'">
            <router-link to="/producer/ProducerInfo">{{value}}</router-link>
          </span>
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

export default {
  name: "BlocksInfo",
  components: {
    Pagination,
    ApexTitle,
    ApexBackGround
  },
  data() {
    return {
      title: "Blocks Information",
      blocksInfo: {
        'Height': "6353170",
          'Age': 18,
          'Txn': 20,
          'TimeStamp':'55 mins ago (Sep-18-2018 07:33:22 AM +UTC)',
          'Transactions': '61 transactions  in this block',
          'Hash': '0x3591fcb0ae47862ffdef0e00a42786d03629ffbae12390ae7c0e1e5468c0d65e',
          'Parent Hash' : '0x25c9bb623bfe86a15127b95365256533042a84a993e5db1e315f50a03290e44b',
          'Mined By': '0xea674fdde714fd979de3edf0f56aa9716b898ec8  in 3 secs',
          'Size' :'17996 bytes',
          'Gas Used' :'7,992,394',
          'Nonce' : '0x6e1e6ce40242e82d'
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "./../../../assets/css/layout";

.BlocksInfo {
  width: 100%;
  height: 100%;
  background: url(./../../../assets/images/shared/yunshi.png) 40% 45% no-repeat;
}
</style>
