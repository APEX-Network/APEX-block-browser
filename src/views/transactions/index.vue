<template>
  <div class="transactions">
    <div class="transactions apex-modul fr">
      <p class="apex-title">Transactions</p>
      <ul class="apex-list transactions-list">
        <li v-for="(item,index) in transactions" :key="index">
          <div class="bottom">
            <a href="javascript:;">{{item.code}}</a>
            <span>{{item.time}}</span>
          </div>
        </li>
        <Pagination/>
      </ul>
    </div>
  </div>
</template>

<script>
import PublicNav from "@/components/publicnav/index.vue";
import PublicFooter from "@/components/publicfooter/index.vue";
import Pagination from "@/components/public/Pagination.vue";

export default {
  name: "Transactions",
  components: {
    PublicNav,
    PublicFooter,
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
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd15",
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
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd55",
          time: "1 minute ago"
        },
        {
          code:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd55",
          time: "1 minute ago"
        },
        {
          code:
            "0x5ead841ac2c08e14ae45492ff3976160c3d7af7ae004cb557678df4bfcaacd55",
          time: "1 minute ago"
        }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.transactions {
  width: 100%;
  height: 100%;
}
.transactions-list {
  overflow: hidden;
}

</style>
