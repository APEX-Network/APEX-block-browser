<template>
  <div class="overview apex-modul wallet-modul">
    <p class="apex-title">Wallet</p>
    <div class="flex-container1">
      <div class="flex-item1">Address</div>
      <input class="flex-item2" v-model="address" readonly="readonly">
      <div class="flex-item3">CPX: {{CPX}}</div>
    </div>
    <div class="flex-container2">
      <div class="flex-item1">
        <router-link to="/wallet/NewWallet">NEW WALLET</router-link>
        <!-- @click.native="modifyAddress('abc')" -->
      </div>
      <div class="flex-item2">
        <router-link to="/wallet/OpenWallet">OPEN WALLET</router-link>
      </div>
      <div class="flex-item3">
        <router-link to="/wallet/Transfer" @click.native="sendAddress">TRANSFER</router-link>
      </div>
    </div>
    <!-- <div class="flex-container3">
      <div class="flex-item1">CLOSE WALLET</div>
    </div>-->
  </div>
</template>

<script>
// import Vue from 'vue';
import { mapActions, mapGetters } from "vuex";
import Bus from "./../../../utils/bus";
import db from "./../../../utils/myDatabase";
// import vSelect from './components/Select.vue'

// Vue.component('v-select', vSelect)
export default {
  name: "walletpage",
  props: ["address", "privKey"],
  data() {
    return {
      APAddress: [],
      // privKey: null,
      getAllAddress: null,
      accountInfo_url: "/api/v1.0/accounts/account",
      CPX: 0
    };
  },

  components: {},

  beforeMount() {},

  mounted() {
    setTimeout(() => {
      this.getCPX(this.address);
    });
    this.getAllAddress = db.APKStore.where("APAddress")
      .above(0)
      .toArray(APKStore => {
        APKStore.forEach(v => {
          this.APAddress.push(v.APAddress);
        });
      });
  },

  methods: {
    // ...mapActions(["modifyAddress"])
    sendAddress() {
      Bus.$emit("apAddress", this.address);
      setTimeout(() => {
        Bus.$emit("privKey", this.privKey);
      });
    },
    getCPX(address) {
      this.$axios
        .post(this.accountInfo_url, {
          address: address
        })
        .then(response => {
          let res = response.data.data;
          let result = res.toString().indexOf(".");
          if (result != -1) {
            let pointLength = res.balance.toString().split(".")[1].length;
            if (pointLength > 8) {
              this.CPX = Number(res.balance).toFixed(8);
            } else {
              this.CPX = Number(res.balance);
            }
          } else {
            this.CPX = Number(res.balance);
          }
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
          }
        });
    }
  },
  computed: {
    // ...mapGetters(["address"])
  },

  watch: {}
};
</script>
<style lang='less' scoped>
.wallet-modul {
  width: 100%;
  .apex-title {
    height: 43px;
  }
}
.flex-container1 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 30%;
  .flex-item1 {
    width: 120px;
    height: 0px;
    font-size: 18px;
    margin: 50px 0 0 30px;
  }
  .flex-item2 {
    width: 306px;
    height: 33px;
    margin: 50px 0px 0px 0px;
    line-height: 33px;
    color: aliceblue;
    background-color: rgba(255, 255, 255, 0);
    border: 1px solid #f26522;
  }
  .flex-item2:hover {
    box-shadow: 2px 2px 8px 2px #f26522;
  }
  .flex-item3 {
    width: 220px;
    height: 35px;
    margin: 50px 0 0 95px;
    line-height: 35px;
    text-align: center;
    font-size: 22px;
  }
}
.flex-container2 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 30%;
  .flex-item1 {
    width: 135px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    border: 1px solid #f26522;
    margin: 40px 10px 0px 150px;
    a {
      color: #f26522;
    }
    a:hover {
      box-shadow: 2px 2px 8px 2px #f26522;
    }
  }
  .flex-item2 {
    width: 135px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    border: 1px solid #f26522;
    margin: 40px 0px 0px 27px;
    a {
      color: #f26522;
    }
    a:hover {
      box-shadow: 2px 2px 8px 2px #f26522;
    }
  }
  .flex-item3 {
    width: 120px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    border: 1px solid #f26522;
    margin: 40px 20px 0px 136px;
    a {
      color: #f26522;
    }
    a:hover {
      box-shadow: 2px 2px 8px 2px #f26522;
    }
  }
}
.flex-container3 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 30%;
  .flex-item1 {
    width: 110px;
    height: 30px;
    margin-left: 940px;
    margin-top: 20px;
    color: #f26522;
    line-height: 30px;
    text-align: center;
    border: 1px solid #f26522;
  }
}
</style>