<template>
  <div class="home clearboth">
    <div class="top-modul clearboth">
      <wallet-page />
    </div>
    <div class="bottom-modul clearboth">
      <transfers-list />
      <transactions-list />
    </div>
  </div>
</template>
<script>
import WalletPage from "@/components/home/wallet/walletPage"
import TransfersList from "@/components/home/list/TransfersList"
import TransactionsList from "@/components/home/list/TransactionsList"

export default {
  name: "wallet",
  components: {
    WalletPage,
    TransfersList,
    TransactionsList
  },
  data() {
    return {
    };
  },
  created: function() {},
  methods: {},
  computed: {}
};
</script>
<style scoped lang="less">
.home {
  width: 100%;
  height: 100%;
  background: url(./../../assets/images/shared/yunshi.png) 25% 35% no-repeat;
  .bottom-modul,
  .top-modul {
    height: 49%;
    margin-bottom: 2%;
  }
  .bottom-modul {
    .apex-modul {
      .apex-title {
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
  }
}
</style>
