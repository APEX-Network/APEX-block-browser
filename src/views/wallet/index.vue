<template>
  <div class="home clearboth">
    <div class="top-modul clearboth" v-if="APAddress.length !== 0" v-cloak>
      <wallet-page :address="apAddress" :privKey="privKey"/>
    </div>
    <div class="bottom-modul clearboth" v-if="APAddress.length !== 0" v-cloak>
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
import WalletPage from "@/views/wallet/wallet/walletPage";
import TransfersList from "@/components/list/TransfersList";
import TransactionsList from "@/components/list/TransactionsList";
import Bus from "@/utils/bus";
import db from "@/utils/myDatabase";

export default {
  name: "wallet",
  components: {
    WalletPage,
    TransfersList,
    TransactionsList
  },
  created() {
    this.checkDB();
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
    checkDB() {
      try {
        this.getAllAddress = db.APKStore.where("APAddress")
          .above(0)
          .toArray(APKStore => {
            APKStore.forEach(v => {
              this.APAddress.push(v.APAddress);
            });
          });
      } catch (error) {
        console.log(error);
      }
    },
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
[v-cloak] {
    display: none;
  }
.home {
  width: 100%;
  height: 100%;
  // background: url(./../../assets/images/shared/yunshi.png) 34% 58% no-repeat;
  .emptyWallet {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.1) !important;
    border-radius: 0px 0px 4px 4px;
  }
  .data-table {
    height: e("calc(100% - 40px)");
    border-radius: 4px;
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
        color: #f26522;
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
          border: 1px solid #f26522;
          font-size: 15px;
          color: #f26522;
          margin: 0 50px;
        }
        a:hover {
          box-shadow: 2px 2px 8px 2px #f26522;
        }
      }
    }
  }
  .bottom-modul,
  .top-modul {
    height: 49%;
    margin-bottom: 1.5%;
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
