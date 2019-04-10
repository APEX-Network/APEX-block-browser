<template>
  <div class="transfer">
    <apex-title :title="title"/>
    <apex-back-ground/>
    <div class="flex-container">
      <div class="from">
        <div>From:</div>
        <div>Wallet</div>
        <input v-model="apAddress" readonly="readonly">
      </div>

      <div class="to">
        <div>To:</div>
        <input
          spellcheck="false"
          ref="to"
          @keyup.enter="seInput($event)"
          @change="getToAddress"
          type="text"
          placeholder="Please Input Address"
        >
        <div>Please enter the correct wallet address</div>
      </div>

      <div class="amount">
        <div>
          Amount (Available:
          <span>{{amount}}</span>)
        </div>
        <input
          spellcheck="false"
          type="text"
          ref="inputAmout"
          @keyup.enter="thInput($event)"
          @change="getInputAmout"
          placeholder="Transfer Amount"
        >
        <p class="p1" @click="setAllAmount">
          <router-link to>All</router-link>
        </p>
        <p class="p2">CPX</p>
        <div>Please enter the correct transfer amount</div>
      </div>
      <div class="gasPrice">
        <input
          spellcheck="false"
          type="text"
          ref="inputGasePrice"
          @keyup.enter="foInput($event)"
          @change="getInputGasePrice"
          placeholder="Please enter the  gas price"
        >
        <div>Mp</div>
        <div>Please enter the correct gas price</div>
      </div>
      <div class="password">
        <div>Password</div>
        <input spellcheck="false" type="password" ref="firstPwd" v-model="pwd" @change="getPwd">
        <img src="./../../../assets/images/hiddeneye.jpg" @click="displayPwd" ref="hiddenpwd">
        <div>Password Incorrect</div>
      </div>
      <div class="send" @click="SendTransfer()">
        <router-link to>SEND</router-link>
      </div>
    </div>
    <div class="dialog" ref="dialog">
      <div class="confirm" ref="confirm">
        <div>Successful transfer</div>
        <div @click="confirm()">
          <router-link to="/wallet">CONFIRM</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApexTitle from "@/components/public/ApexTitle";
import ApexBackGround from "@/components/public/ApexBackGround";
import util from "../../../utils/utils";
import Bus from "./../../../utils/bus";
import db from "./../../../utils/myDatabase";
const bigdecimal = require("bigdecimal");

export default {
  name: "Transfer",
  props: [""],
  data() {
    return {
      title: "Transfer",
      serialized_transaction: null,
      url: {
        accountInfo_url: "/api/v1.0/accounts/account",
        transfer_url: "/api/v1.0/transactions/trading"
      },
      signature: null,
      apAddress: null,
      walletAddress: null,
      amount: 0,
      nonce: null,
      KStore: null,
      pwd: null,
      privKey: null,
      toAddress: null,
      message: null,
      inputAmout: null,
      inputGasePrice: null, //用户输入
      inputGasePriceValue: null,
      secondInput: null,
      thereInput: null,
      fourInput: null,
      fiveInput: null,
      allamount: null,
      firstClick: 1,
      transferPwd: null
    };
  },

  components: {
    ApexBackGround,
    ApexTitle
  },

  computed: {},

  mounted() {
    this.transferPwd = this.$refs.hiddenpwd;
    this.getAllInput();
    this.getAddress();
  },

  methods: {
    getAddress() {
      Bus.$on("apAddress", data => {
        this.apAddress = data;
        if (this.apAddress !== null) {
          setTimeout(() => {
            this.getAccountInfo(this.apAddress);
            db.APKStore.get(this.apAddress).then(APKStore => {
              this.KStore = APKStore.KStore;
            });
          });
        } else {
          return;
        }
      });
      Bus.$on("privKey", data => {
        this.privKey = data;
      });
    },

    getToAddress() {
      this.toAddress = this.$refs.to.value;
      if (this.toAddress == this.apAddress) {
        this.$refs.to.value = null;
        alert("账户填写重复!请重新填写");
      }
    },
    getInputAmout() {
      this.inputAmout = this.$refs.inputAmout.value;
      console.log(this.inputAmout);
    },
    setAllAmount() {
      this.$refs.inputAmout.value = this.amount;
      this.inputAmout = this.allamount;
    },
    getInputGasePrice() {
      this.inputGasePriceValue = this.$refs.inputGasePrice.value;
      if (
        this.inputGasePriceValue >= 0.01 &&
        this.inputGasePriceValue <= 1000000000
      ) {
        this.inputGasePrice = this.inputGasePriceValue;
      } else {
        this.$refs.inputGasePrice.value = null;
        alert("gasPrice值输入不正确！请输入0.001~10^9之间的数");
      }
    },
    getPwd() {
      this.pwd = this.$refs.firstPwd.value;
    },
    getAllInput() {
      this.secondInput = this.$refs.inputAmout;
      this.thereInput = this.$refs.inputGasePrice;
      this.fourInput = this.$refs.firstPwd;
    },
    seInput(ev) {
      if (ev.keyCode == 13) {
        this.secondInput.focus();
      }
    },
    thInput(ev) {
      if (ev.keyCode == 13) {
        this.thereInput.focus();
      }
    },
    foInput(ev) {
      if (ev.keyCode == 13) {
        this.fourInput.focus();
      }
    },
    displayPwd() {
      this.firstClick++;
      if (this.firstClick % 2 == 0 && this.pwd !== null) {
        this.$refs.firstPwd.type = "text";
        this.transferPwd.src =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAMCAYAAABvEu28AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjJDQ0M3RjJDREU1MTExRThCMzdEQ0VDRTMzMkY0MkEyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU5RkU1OEM2REU1MTExRThCMzdEQ0VDRTMzMkY0MkEyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MkNDQzdGMkFERTUxMTFFOEIzN0RDRUNFMzMyRjQyQTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MkNDQzdGMkJERTUxMTFFOEIzN0RDRUNFMzMyRjQyQTIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4342abAAABe0lEQVR42lzTSyjEURTHcTNGnkOTpGw8ZoFioWxIikyUlYWFFBZepYiFskXySKFshMJCGWQ7K4VSFhZIShYehZ1GUozH9+in/v1vfZr/3O4993/OPX9PtKsgzjWSkYcK1KEQCbjDPg5xhagt9i/d/G3yuYIUoRdtCOAd1/qtRCN+sIcFHCFmG72OICHsYkBBThQ0JM0I4wtNWtv32h1MtM0epVaNdeQq6DlalUItshDBC9bQonX2dkOY92rznCPIJ6YUbFYn2yEbSMM0HrXWg1E7zAL1o8yR4jPOVK92pGhDPTpwgVPHej/GvaqHc1gNvpHkqqGNDBU35poPeJXWrWMyG/k6OeKYt//LsKKWuAKN+ZTGCFbUQ/YmgzhGj644HZt4wIwO+h/2IuH/PtpCKiaRiRqsYkILbeTouVMp240tWrFpyg+Po7Pj1QbDaNDcvVKymwyiWEEudXvbBHlzd/aXPgG7kXI1XRVKtdk+iR21wwGedCl/41eAAQB+5Vx/vl4kBAAAAABJRU5ErkJggg==";
      }
      if (this.firstClick % 2 == 1 && this.pwd !== null) {
        this.$refs.firstPwd.type = "password";
        this.transferPwd.src =
          "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAPCAYAAAACsSQRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjEzMDMxMTAzNEQxOTExRTk5NjM2RDE0OUI2NzgxODU4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjEzMDMxMTA0NEQxOTExRTk5NjM2RDE0OUI2NzgxODU4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTMwMzExMDE0RDE5MTFFOTk2MzZEMTQ5QjY3ODE4NTgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTMwMzExMDI0RDE5MTFFOTk2MzZEMTQ5QjY3ODE4NTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4J7CJ6AAAC8klEQVR42lRSzYtcRRD/VXX3zNuZTRxI3BCXjaselkTxIIIQDFEEBTdqIhIS9OBBQjyJf4GgJy9+3IKClxgDCUn2sCQYRWEQRA+BhaAgGNAsLCJEs5udN/NeV5X1Zj/AfhS8bqp//fsoGpyemRIJp7LkT1PAmoUOaPAPiBk57QCZwIgQDCDKiPgXgknACqjW6N5bRjSjvYbwARNeBPJBQP1SmCai/QDmvJLXwOtXr58IUjmC/xK2VqRES6Guj4ulCwZaiKiPSru9TzR8Qw6ojs5+R6m5FG8Dk58z6CNA1rdAwnsHvCEUvxi48HrLW/dHxidqetOMJwqhS0q2oi1+FEz3iRTPgsJJIv0ZpsupWnPJrwBru2fnLaYvSGXK/NXAWCSWl4IKSAl1Ski/D2aGu4o+9cKsZWskI+Xhc527t7/j0c7ejDu26KhTDTVijMRwRCVeCdH3sX5COF1L9Z2V7tLyYaUworEjBuF4vZro7eNhd89ZB3FKNvaK1D6Loi+o2dEyty+Rphudu8P++kO7ztcHen+GUb640a9NXKHs7vnS5efDW2abV1t0RTRe9xeX2epXS26dn0jVybZ0HrP7a8SqulWhvZ0Na32I8ffwB52M4wNy8BHHJ6lYRatYvQyNMLETZTstUiE3tSJUnJ4Zs0YTNDWpLXDB9AZl2zxuogzzqVx9pKP33uFAZ5zybz5v80Pji04AgfRjn60xAJsOJkROc9oZ/0jr1fO6SZBZ2mWc7g/L3Y8b1W+36nIuaj4oSq9J5suuf4E5v9zEHpGPtLL8FX2GYWzfJlRPG+I5UTxIkR6oLCxB7Xvj0Pf56TWzlpWPuegrCaNjzuJrl1U1cZK9OYt1H0lm38fWDrX4rqidclLTY91NU+P8huBbLuNhNrkaUM17Rg5AiFuj22j0b60V6P1S5EP3+CkmnvMou2okifOPTHaj1njCfTsHa10LVr/usu5sg2yDbTg88upv1v+Ws/qKkFkpniW2457Pmf8EGABwNmg2JKFbewAAAABJRU5ErkJggg==";
      }
    },
    getAccountInfo(address) {
      this.$axios
        .post(this.url.accountInfo_url, {
          address: address
        })
        .then(response => {
          let res = response.data.data;
          let result = res.balance.toString().indexOf(".");
          this.allamount = res.balance;
          if (result > -1) {
            let pointLength = res.balance.toString().split(".")[1].length;
            if (pointLength > 8) {
              this.amount =
                res.balance.toString().split(".")[0] +
                "." +
                res.balance
                  .toString()
                  .split(".")[1]
                  .substring(0, 8);
            }
            if (pointLength <= 8) {
              this.amount = res.balance;
            }
          }
          if (result == -1) {
            this.amount = res.balance;
          }
          this.nonce = res.nextNonce;
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
          }
        });
    },
    SendTransfer() {
      if (
        this.apAddress == null ||
        this.toAddress == null ||
        this.inputAmout == null ||
        this.inputGasePrice == null ||
        this.pwd == null
      ) {
        alert("请填写完整后进行交易!");
        return;
      }

      if (
        this.apAddress !== null &&
        this.toAddress !== null &&
        this.inputAmout !== null &&
        this.inputAmout !== 0 &&
        this.inputGasePrice !== null &&
        this.inputGasePrice !== 0 &&
        this.pwd !== null
      ) {
        this.checkAddress();
        this.$refs.dialog.style.display = "flex";
        let serializParams = {
          version: "00000001", //不变
          txType: "01", //不变
          from: this.apAddress,
          to: this.toAddress,
          amount: new bigdecimal.BigDecimal(String(this.inputAmout)).subtract(
            new bigdecimal.BigDecimal(
              String(
                Math.pow(10, -18) *
                  String(this.inputGasePrice) *
                  Math.pow(10, 6) *
                  21000
              )
            )
          ),
          nonce: this.nonce, //从服务器获取该账户的nonce值
          data: "00", //不变
          gasPrice: new bigdecimal.BigDecimal(
            String(this.inputGasePrice)
          ).multiply(new bigdecimal.BigDecimal(String(Math.pow(10, 6)))),
          gasLimit: "21000", //程序限制
          executeTime: "0000000000000000" //不变
        };
        if (this.inputAmout !== this.allamount) {
          serializParams.amount =  new bigdecimal.BigDecimal(String(this.inputAmout));
        };
        this.message = util.utilMethods.produce_message(serializParams);
        let signParams = {
          message: this.message,
          privKey: null
        };
        if (this.KStore !== null && this.pwd !== null) {
          signParams.privKey = util.utilMethods.produceKeyPriv(
            this.KStore,
            this.pwd
          );
        }
        if (this.privKey !== null) {
          signParams.privKey = String(this.privKey);
        }
        this.signature = util.utilMethods.Sign(signParams);
        this.serialized_transaction = util.utilMethods.serialized_transaction(
          this.message,
          this.signature
        );
      }
      return;
    },
    checkAddress() {
      this.privKey = util.utilMethods.produceKeyPriv(this.KStore, this.pwd);
      this.walletAddress = util.utilMethods.keyStoreWallet(
        this.KStore,
        this.pwd
      );
      if (this.walletAddress == this.apAddress) {
        alert("密码输入正确,请确定交易!");
      }
      if (this.walletAddress !== this.apAddress) {
        alert("sorry!请输入正确的密码,进行交易!");
        this.$router.push("/wallet/Transfer");
        return;
      }
      return;
    },
    confirm() {
      this.$axios
        .post(this.url.transfer_url, {
          rawTx: this.serialized_transaction
        })
        .then(response => {
          let res = response.data.data;
          console.log(res);
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
          }
        });
    }
  },

  watch: {}
};
</script>
<style lang='less' scoped>
.transfer {
  width: 100%;
  height: 100%;
  .flex-container {
    position: absolute;
    display: flex;
    height: auto;
    width: 33.333%;
    margin-left: 30%;
    flex-direction: column;
    .from {
      margin: 5% 0 0 0%;
      div:nth-child(1) {
        color: rgba(255, 255, 255, 0.5);
        margin: 0px 0px 15px 0px;
      }
      input {
        background: rgba(255, 255, 255, 0.001);
        border: 1px solid #f26522;
        width: 300px;
        color: aliceblue;
      }
      input:hover {
        box-shadow: 2px 2px 8px 2px #f26522;
      }
    }
    .to {
      margin: 5% 0 0 0%;
      input {
        background: rgba(255, 255, 255, 0.001);
        border: 1px solid #f26522;
        width: 300px;
        color: aliceblue;
      }
      input:hover {
        box-shadow: 2px 2px 8px 2px #f26522;
      }
      div:nth-child(1) {
        color: rgba(255, 255, 255, 0.5);
        margin: 0px 0px 5px 0px;
      }
      div:nth-child(3) {
        margin-top: 8px;
        color: #f26522;
        visibility: hidden;
        // visibility:visible;
      }
    }
    .amount {
      position: relative;
      div {
        margin: 0% 5% 0 2%;
        position: relative;
        span {
          color: #f26522;
        }
      }
      input {
        background: rgba(255, 255, 255, 0.001);
        border: 1px solid #f26522;
        width: 200px;
        color: aliceblue;
      }
      input:hover {
        box-shadow: 2px 2px 8px 2px #f26522;
      }
      .p1 {
        display: inline-block;
        margin-left: 25px;
        a {
          color: #f26522;
        }
      }
      .p2 {
        display: inline-block;
        margin-left: 25px;
      }
      div:nth-child(2) {
        margin-left: 5%;
        display: inline;
      }
      div:nth-child(3) {
        display: inline;
        position: absolute;
        margin-left: 4%;
        margin-top: 1.4%;
        z-index: 1;
        a {
          color: #f26522;
        }
      }
      div:nth-child(4) {
        display: inline;
        margin-left: 20%;
      }
      div:nth-child(5) {
        color: #f26522;
        margin-top: 8px;
        margin-left: -2px;
        visibility: hidden;
        // visibility:visible;
      }
    }
    .gasPrice {
      margin: 1% 0 0 -14%;
      input {
        background: rgba(255, 255, 255, 0.001);
        border: 1px solid #f26522;
        width: 200px;
        color: aliceblue;
      }
      input:hover {
        box-shadow: 2px 2px 8px 2px #f26522;
      }
      div:nth-child(2) {
        // margin-left: 5%;
        padding-left: 25px;
        display: inline-block;
      }
      div:nth-child(3) {
        display: inline;
        position: absolute;
        margin-left: 4%;
        margin-top: 1.4%;
        z-index: 1;
        a {
          color: #f26522;
        }
      }
      div:nth-child(3) {
        color: #f26522;
        margin-top: 8px;
        margin-left: -1px;
        visibility: hidden;
        // visibility:visible;
      }
    }
    .password {
      margin: 7% 0 0 0%;
      input {
        background: rgba(255, 255, 255, 0.001);
        border: 1px solid #f26522;
        width: 300px;
        color: aliceblue;
      }
      input:hover {
        box-shadow: 2px 2px 8px 2px #f26522;
      }
      img {
        z-index: 1;
        margin-left: 275px;
        margin-top: -23px;
        position: absolute;
        display: block;
        cursor: pointer;
      }
      div:nth-child(4) {
        color: #f26522;
        margin-top: 15px;
        visibility: hidden;
        // visibility:visible;
      }
    }
    .send {
      margin: 5px 0 0 18%;
      color: #ffffff;
      background: #f26522;
      width: 180px;
      height: 30px;
      margin-right: 18%;
      text-align: center;
      line-height: 30px;
      border-radius: 4px;
      z-index: 2;
      a {
        color: #ffffff;
        border-radius: 4px;
      }
      a:hover {
        box-shadow: 2px 2px 8px 2px #f26522;
      }
    }
  }
  .dialog {
    display: none;
    position: relative;
    width: 100%;
    height: 100%;
    // margin-top: -38px;
    background: rgba(255, 255, 255, 0);
    justify-content: center;
    align-items: center;
    z-index: 2;
    .confirm {
      margin: auto;
      width: 310px;
      height: 180px;
      margin-left: 390px;
      background: #ffffff;
      div:nth-child(1) {
        color: #f26522;
        font-size: 15px;
        margin-left: 80px;
        margin-top: 30px;
      }
      div:nth-child(2) {
        z-index: 1;
        text-align: center;
        width: 100px;
        height: 30px;
        margin-left: 100px;
        margin-top: 50px;
        line-height: 30px;
        border-radius: 4px;
        background: #f26522;
        a {
          color: #ffffff;
        }
        a:hover {
          box-shadow: 2px 2px 8px 2px #f26522;
          border-radius: 4px;
        }
      }
    }
  }
}
</style>