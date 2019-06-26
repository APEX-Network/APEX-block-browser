<template>
  <div class="home clearboth">
    <div class="top-modul clearboth" v-if="APAddress.length !== 0">
      <wallet-page :address="apAddress" :privKey="privKey"/>
    </div>
    <div class="bottom-modul clearboth" v-if="APAddress.length !== 0">
      <transfers-list/>
      <transactions-list/>
    </div>

    <div class="emptyWallet" v-else v-cloak>
      <p class="apex-title">Wallet</p>
      <div class="data-table">
        <ul>
          <li class="tip-li">There are no wallets locally,please create or import wallets.</li>

          <li
            class="second-li"
          >Warning:APEX neither holds any of your account infromation nor can it help you get your account back.</li>
          <li class="flex-btn">
            <router-link to="/wallet/NewWallet">NEW WALLET</router-link>
            <router-link to="/wallet/OpenWallet">OPEN WALLET</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Bus from "@/utils/bus";
const WalletPage = r =>
  require.ensure(
    [],
    () => r(require("@/views/wallet/wallet/walletPage")),
    "Wallet"
  );
const TransfersList = r =>
  require.ensure(
    [],
    () => r(require("@/components/list/TransfersList")),
    "Wallet"
  );
const TransactionsList = r =>
  require.ensure(
    [],
    () => r(require("@/components/list/TransactionsList")),
    "Wallet"
  );

export default {
  name: "wallet",
  components: {
    WalletPage,
    TransfersList,
    TransactionsList
  },
  created() {
    if (!!localStorage.getItem("apAddress")) {
      this.APAddress.push(localStorage.getItem("apAddress"));
    }
  },
  data() {
    return {
      apAddress: null,
      privKey: null,
      APAddress: []
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
      Bus.$on("privKey", data => {
        this.privKey = data;
      });
    }
  },
  computed: {}
};
</script>
<style scoped lang="less">
.home {
  width: 100%;
  height: 102%;
  .emptyWallet {
    width: 100%;
    height: 100%;
    padding-top: 44px;
    padding-left: 24px;
    padding-right: 20px;
    padding-bottom: 16px;
    border-radius: 0px 0px 4px 4px;
    .apex-title {
      background: #000;
      padding-left: 23px;
      height: 50px;
      line-height: 50px;
      border-bottom: rgba(255, 255, 255, 0.07) 2px solid;
    }
  }
  .data-table {
    background: #000;
    height: e("calc(100% - 40px)");
    position: relative;
    padding: 0;
    ul {
      position: absolute;
      top: 30%;
      left: 0;
      width: 100%;

      li {
        list-style: none;
        font-size: 20px;
        font-family: Semibold, Microsoft YaHei, Open Sans, Arial, Helvetica,
          Sans-serif, Verdana, Tahoma;
        color: #e1e1e1;
        width: 100%;
        text-align: center;
        box-sizing: border-box;
      }
      .tip-li {
        font-size: 24px;
        padding-bottom: 50px;
      }
      .second-li {
        font-family: "Regular";
        color: #56c4fd;
        font-size: 14px;
      }
      .flex-btn {
        padding-top: 50px;
        a {
          display: inline-block;
          width: 120px;
          height: 35px;
          line-height: 35px;
          text-align: center;
          border: 1px solid #56c4fd;
          font-size: 15px;
          color: #56c4fd;
          margin: 0 50px;
        }
        a:hover {
          box-shadow: 2px 2px 8px 2px #56c4fd;
        }
      }
    }
  }
  .bottom-modul {
    height: 50%;
    padding-top: 5px;
    padding-right: 20px;
    padding-bottom: 10px;
    padding-left: 25px;
  }
  .top-modul {
    height: 50%;
    padding-top: 44px;
    padding-right: 20px;
    padding-bottom: 15px;
    padding-left: 25px;
  }
  .bottom-modul {
    .apex-modul {
      .apex-title {
        height: 50px;
        line-height: 50px;
        span {
          a {
            color: #56c4fd;
          }
        }
        span:hover {
          box-shadow: 2px 2px 8px 2px #56c4fd;
        }
      }
    }
  }
}
</style>
