<template>
  <div class="overview apex-modul wallet-modul">
    <p class="apex-title">Wallet</p>
    <div class="flex-container1">
      <div class="flex-item1">Address</div>
      <input
        class="flex-item2"
        v-model="address"
        readonly="readonly"
        placeholder="Please create or import your wallet"
      >
      <!-- <div class="flex-item2">
        <select
          class="select-option"
          ref="mySelect"
          readonly="readonly"
          title="Please create or import your wallet"
        >
          <option
            class="option-item"
            v-for="(address, index) in APAddress"
            :key="index"
            @click="setAddress()"
          >{{address}}</option>
        </select>
      </div> -->
      <div class="flex-item3">CPX: {{CPX}}</div>
    </div>
    <div class="flex-container2">
      <div class="flex-item1">
        <router-link to="/wallet/NewWallet">NEW WALLET</router-link>
        <!-- @click.native="modifyAddress('abc')" -->
      </div>
      <div class="flex-item2">
        <router-link to="/wallet/OpenWallet">IMPORT WALLET</router-link>
      </div>
      <div class="flex-item3">
        <router-link to="/wallet/Transfer" @click.native="sendAddress">TRANSFER</router-link>
      </div>
      <div class="flex-item4">
        <router-link to="/wallet/VotingSupport" @click.native="sendAddress">VOTE</router-link>
      </div>
      <div class="flex-item5">
        <router-link to="/wallet/RefundVote" @click.native="sendAddress">REFUND</router-link>
      </div>
    </div>
    <!-- <div class="flex-container3">
      <div class="flex-item1">CLOSE WALLET</div>
    </div>-->
  </div>
</template>

<script>
import Vue from "vue";
// import { mapActions, mapGetters } from "vuex";
import Bus from "./../../../utils/bus";
import db from "./../../../utils/myDatabase";

export default {
  name: "walletpage",
  props: ["address", "privKey"],
  data() {
    return {
      APAddress: [],
      // selected: null,
      // privKey: null,
      getAllAddress: null,
      accountInfo_url: "/api/v1.0/accounts/account",
      CPX: 0,
      mySelect: null
    };
  },

  components: {},

  beforeMount() {},

  mounted() {
    this.mySelect = this.$refs.mySelect;
    this.address = sessionStorage.getItem("apAddress");
    setTimeout(() => {
      if (this.address !== null) {
        sessionStorage.setItem("apAddress", this.address);
        this.getCPX(this.address);
      }
    });
    const timer = setInterval(() => {
      if (this.address !== null) {
        this.getCPX(this.address);
      }
    }, 1500);
    this.$once("hook:beforeDestroy", () => {
      clearInterval(timer);
    });
    this.getAllAddress = db.APKStore.where("APAddress")
      .above(0)
      .toArray(APKStore => {
        APKStore.forEach(v => {
          this.APAddress.push(v.APAddress);
        });
      });
    console.log(this.APAddress);
  },

  methods: {
    setAddress() {
      this.address = this.mySelect.options[this.mySelect.selectedIndex].text;
      console.log(this.mySelect.options[this.mySelect.selectedIndex].text);
      Bus.$emit(
        "apAddress",
        this.mySelect.options[this.mySelect.selectedIndex].text
      );
      sessionStorage.setItem(
        "apAddress",
        this.mySelect.options[this.mySelect.selectedIndex].text
      );
    },
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
          let result = res.balance.toString().indexOf(".");
          if (result > -1) {
            let pointLength = res.balance.toString().split(".")[1].length;
            if (pointLength > 8) {
              this.CPX =
                res.balance.toString().split(".")[0] +
                "." +
                res.balance
                  .toString()
                  .split(".")[1]
                  .substring(0, 8);
            }
            if (pointLength <= 8) {
              this.CPX = res.balance;
            }
          }
          if (result == -1) {
            this.CPX = res.balance;
          }
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
          }
        });
    }
  },
  computed: {},

  watch: {}
};
</script>
<style lang='less' scoped>
@import "../../../assets/css/layout";
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
    padding-left: 5px;
    width: 335px;
    height: 33px;
    margin: 50px 0px 0px 0px;
    line-height: 33px;
    color: aliceblue;
    background-color: rgba(255, 255, 255, 0);
    border: 1px solid #f26522;
    display: block;
    // font-size: 28px;
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
    // &::after {
    //   content: " ";
    //   position: absolute;
    //   right: 6px;
    //   top: 50%;
    //   margin-top: -5px;
    //   width: 0px;
    //   height: 0px;
    //   border-left: 10px solid transparent;
    //   border-right: 10px solid transparent;
    //   border-top: 10px solid #fff;
    //   font-size: 0px;
    //   line-height: 0px;
    // }
    background: url("../../../assets/images/shared/dropDownArrow.png") no-repeat
      scroll 96% center transparent;
    select::-ms-expand {
      display: none;
    }
    .select-option {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      position: relative;
      outline: none;
      border: 0 none;
      position: relative;
      padding: 0 0 0 5px;
      width: 100%;
      color: #fff;
      background: none;
      background-color: transparent;
      z-index: 99;
      overflow: hidden;
    }
    &.back-after {
      width: 240px;
      margin: 0 30px 0 0;
      &::after {
        border-top-color: #666;
      }
      .select-option {
        color: #f26522;
      }
    }
    &.filter-search {
      width: 150px;
      margin: 0;
    }
  }
  .flex-item2:hover {
    box-shadow: 2px 2px 8px 2px #f26522;
  }
  .flex-item3 {
    // width: 220px;
    height: 35px;
    margin: 50px 0 0 164px;
    line-height: 35px;
    text-align: center;
    font-size: 22px;
  }
}
.flex-container2 {
  width: 100%;
  margin-top: 2%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 30%;
  justify-content: space-between;
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
    margin: 40px 0px 0px 55px;
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
    margin: 40px 20px 0px 47px;
    a {
      color: #f26522;
    }
    a:hover {
      box-shadow: 2px 2px 8px 2px #f26522;
    }
  }
  .flex-item4 {
    width: 120px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    border: 1px solid #f26522;
    margin: 40px 20px 0px;
    a {
      color: #f26522;
    }
    a:hover {
      box-shadow: 2px 2px 8px 2px #f26522;
    }
  }
  .flex-item5 {
    width: 120px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    border: 1px solid #f26522;
    margin: 40px 20px 0px;
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
@media screen and(max-width:1366px) {
  .wallet-modul {
    .flex-container2 {
      .flex-item3 {
        margin-left: 20%;
      }
    }
  }
}
</style>