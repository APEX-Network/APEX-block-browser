<template>
  <div class="min-height">
    <div class="main">
      <div class="uchain-box">
        <div class="uchain-title">
          <p>Transactions</p>
        </div>
        <div class="data-table transactions-table">
           <ul class="table-ul">
            <li v-for="(list,index) in transactions" :key="index" class="row">
              <span class="col col-lg-10">
                <router-link to='/home/transactions/details'>{{list.code}}</router-link>
              </span>
              <span class="col">{{list.time }}</span>
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
  name: "transactions",
  components: {
    Pagination
  },
  data() {
    return {
      transactions: [
        {
          code:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd15",
          time: "1 minute ago"
        },
        {
          code:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd25",
          time: "1 minute ago"
        },
        {
          code:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd35",
          time: "1 minute ago"
        },
        {
          code:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd45",
          time: "1 minute ago"
        },
        {
          code:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd55",
          time: "1 minute ago"
        },
        {
          code:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd65",
          time: "1 minute ago"
        },
        {
          code:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd55",
          time: "1 minute ago"
        },
        {
          code:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd65",
          time: "1 minute ago"
        },
        {
          code:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd55",
          time: "1 minute ago"
        },
        {
          code:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd65",
          time: "1 minute ago"
        }
      ]
    };
  }
};
</script>

<style scoped lang="less">
</style>
