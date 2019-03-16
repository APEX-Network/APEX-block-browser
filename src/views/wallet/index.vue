<template>
  <div class="home clearboth">
    <div class="top-modul clearboth">
      <wallet-page :address = "apAddress"/>
    </div>
    <div class="bottom-modul clearboth">
      <transfers-list />
      <transactions-list />
    </div>
  </div>
</template>
<script>
import WalletPage from "@/views/wallet/wallet/walletPage";
import TransfersList from "@/components/list/TransfersList";
import TransactionsList from "@/components/list/TransactionsList";
import Bus from './../../utils/bus';

export default {
  name: "wallet",
  components: {
    WalletPage,
    TransfersList,
    TransactionsList
  },
  data() {
    return {
      apAddress: null
    };
  },
  mounted() {
    this.getlastAddress();
  },
  methods: {
    getlastAddress() {
      Bus.$on("apAddress", data => {
        this.apAddress = data;
      });
    },
  },
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
