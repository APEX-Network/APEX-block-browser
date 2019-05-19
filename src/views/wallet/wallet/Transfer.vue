<template>
  <div class="transfer">
    <p class="title">{{title}}</p>
    <apex-back-ground class="bg"/>
    <div class="flex-container">
      <div class="from">
        <div>From:</div>
        <div>Wallet</div>
        <input v-model="apAddress" readonly="readonly" autocomplete="off">
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
          autocomplete="new-password"
          readonly
          onfocus="this.removeAttribute('readonly');"
        >
        <div ref="checktoAddress">Please enter the correct wallet address</div>
      </div>

      <div class="amount">
        <div>
          Amount (Available:
          <span @click="setAllAmount">{{amount}}</span>)
        </div>
        <input
          spellcheck="false"
          type="text"
          ref="inputAmout"
          @keyup.enter="thInput($event)"
          @change="getInputAmout"
          placeholder="Transfer Amount"
          autocomplete="new-password"
          onkeyup="value=value.replace(/[^\d\.]/g,'')"
          readonly
          onfocus="this.removeAttribute('readonly');"
        >
        <p class="p1">
          <router-link to></router-link>
        </p>
        <p class="p2">CPX</p>
        <div ref="checkAmount">Please enter the correct transfer amount</div>
      </div>
      <div class="gasPrice">
        <div class="recommend">
          Recommended:
          <span @click="setAllGPrice">{{gasePrice}} KGp</span>
        </div>
        <input
          spellcheck="false"
          type="text"
          ref="inputGasePrice"
          @keyup.enter="foInput($event)"
          @change="getInputGasePrice"
          placeholder="Please enter the gas price"
          autocomplete="new-password"
          onkeyup="value=value.replace(/[^\d\.]/g,'')"
          readonly
          onfocus="this.removeAttribute('readonly');"
        >
        <div>KGp</div>
        <div ref="checkGasPrice">Please enter the correct gas price</div>
      </div>
      <div class="password">
        <div>Password</div>
        <input
          spellcheck="false"
          type="password"
          ref="firstPwd"
          v-model="pwd"
          @change="getPwd"
          onKeyUp="value=value.replace(/[\W]/g,'')"
          placeholder="Please enter the  password"
          autocomplete="new-password"
          readonly
          onfocus="this.removeAttribute('readonly');"
        >
        <img src="./../../../assets/images/hiddeneye.jpg" @click="displayPwd" ref="hiddenpwd">
        <div ref="checkPwd">Password Incorrect</div>
      </div>
      <div class="send" @click="SendTransfer()">
        <router-link to>SEND</router-link>
      </div>
    </div>
    <div class="dialog" ref="dialog">
      <div class="confirm" ref="confirm">
        <div>Broadcast Successful</div>
        <div>
          <router-link to="/wallet">CONFIRM</router-link>
        </div>
        <div>
          {{id}} {{txId}}
          <img
            ref="copyId"
            @click="Copy()"
            style="cursor: pointer; padding-left: 16px;"
            src="./../../../assets/images/copy.png"
            alt
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const ApexTitle = r => require.ensure([], () => r(require("@/components/public/ApexTitle")), 'titleAndBackground');
const ApexBackGround = r => require.ensure([], () => r(require("@/components/public/ApexBackGround")), 'titleAndBackground');
import util from "@/utils/utils";
import Bus from "@/utils/bus";
import db from "@/utils/myDatabase";
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
        gasePrice_url: "/api/v1.0/getAverageGasPrice",
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
      inputGasePrice: null,
      inputGasePriceValue: null,
      secondInput: null,
      thereInput: null,
      fourInput: null,
      fiveInput: null,
      allamount: null,
      firstClick: 1,
      transferPwd: null,
      check: {
        checktoAddress: null,
        checkAmount: null,
        checkGasPrice: null,
        checkPwd: null
      },
      txId: null,
      copyTxId: null,
      txIdImg: null,
      gasePrice: null,
      id: null
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
    this.getAllInputInstances();
    this.getGasePrice();
  },

  methods: {
    setAllGPrice() {
      this.$refs.inputGasePrice.value = this.gasePrice;
      this.check.checkGasPrice.style.visibility = "hidden";
      this.inputGasePrice = this.gasePrice;
    },
    Copy(index) {
      let getCopyText = this.copyTxId;
      this.txIdImg.src = require("../../../assets/images/copied.png");
      this.doCopy(getCopyText);
    },
    doCopy(val) {
      this.$copyText(val).then(
      );
    },
    getAllInputInstances() {
      this.check.checktoAddress = this.$refs.checktoAddress;
      this.check.checkAmount = this.$refs.checkAmount;
      this.check.checkGasPrice = this.$refs.checkGasPrice;
      this.check.checkPwd = this.$refs.checkPwd;
      this.txIdImg = this.$refs.copyId;
    },
    getGasePrice() {
      this.$axios
        .post(this.url.gasePrice_url)
        .then(response => {
          let res = response.data.data;
          if (res == "NotFound") {
            this.gasePrice = 30;
          }
          if (res < 1.0) {
            this.gasePrice = 1.0;
          }
          if (res > 1) {
            this.gasePrice = res;
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    getAddress() {
      this.apAddress = localStorage.getItem("apAddress");
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
      Bus.$on("privKey", data => {
        this.privKey = data;
      });
    },

    getToAddress() {
      try {
        this.toAddress = this.$refs.to.value;
        if (
          this.toAddress.length !== 35 ||
          this.toAddress.slice(0, 2) !== "AP"
        ) {
          this.check.checktoAddress.style.visibility = "visible";
          this.toAddress = null;
          this.$refs.to.value = null;
        }
        if (this.toAddress.length == 35 && this.toAddress.slice(0, 2) == "AP") {
          this.check.checktoAddress.style.visibility = "hidden";
        }
        if (this.toAddress == this.apAddress) {
          this.toAddress = null;
          this.$refs.to.value = null;
          this.check.checktoAddress.style.visibility = "visible";
        }
      } catch (error) {
      }
    },
    getInputAmout() {
      this.inputAmout = this.$refs.inputAmout.value;
      let inputlength = this.inputAmout.toString().length;
      if (inputlength >= 2) {
        let errorinput = this.inputAmout.slice(0, 2);
        if (errorinput.slice(0, 1) == 0 && errorinput.slice(1, 2) !== ".") {
          this.$refs.inputAmout.value = null;
          setTimeout(() => {
            this.check.checkAmount.style.visibility = "visible";
          });
        }
      }

      if (this.amount == 0 || this.inputAmout == 0) {
        this.check.checkAmount.style.visibility = "visible";
      }
      if (this.inputAmout > 0 && this.inputAmout <= this.amount) {
        this.check.checkAmount.style.visibility = "hidden";
        this.inputAmout = this.inputAmout;
      }
      if (parseFloat(this.inputAmout) > parseFloat(this.amount)) {
        this.inputAmout = null;
        this.check.checkAmount.style.visibility = "visible";
      }
    },
    setAllAmount() {
      this.$refs.inputAmout.value = this.amount;
      this.check.checkAmount.style.visibility = "hidden";
      this.inputAmout = this.allamount;
    },
    getInputGasePrice() {
      this.inputGasePriceValue = this.$refs.inputGasePrice.value;
      let inputlength = this.inputGasePriceValue.toString().length;
      if (inputlength >= 2) {
        let errorinput = this.inputGasePriceValue.slice(0, 2);
        if (errorinput.slice(0, 1) == 0 && errorinput.slice(1, 2) !== ".") {
          this.$refs.inputGasePrice.value = null;
          setTimeout(() => {
            this.check.checkGasPrice.style.visibility = "visible";
          });
        }
      }
      if (
        this.inputGasePriceValue >= 0.01 &&
        this.inputGasePriceValue <= 1000000000
      ) {
        this.check.checkGasPrice.style.visibility = "hidden";
        this.inputGasePrice = this.inputGasePriceValue;
      } else {
        this.$refs.inputGasePrice.value = null;
        this.check.checkGasPrice.style.visibility = "visible";
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
        this.transferPwd.src = require("../../../assets/images/eye.png");
      }
      if (this.firstClick % 2 == 1 && this.pwd !== null) {
        this.$refs.firstPwd.type = "password";
        this.transferPwd.src = require("../../../assets/images/hiddeneye.jpg");
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
        if (this.toAddress == null) {
          this.check.checktoAddress.style.visibility = "visible";
        }
        if (this.inputAmout == null) {
          this.check.checkAmount.style.visibility = "visible";
        }
        if (this.inputGasePrice == null) {
          this.check.checkGasPrice.style.visibility = "visible";
        }
        if (this.pwd == null) {
          this.check.checkPwd.style.visibility = "visible";
        }
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
        let bigEightPow = new bigdecimal.BigDecimal(String(Math.pow(10, 18)));
        let tNTwelve = new bigdecimal.BigDecimal(String(Math.pow(10, 12)));
        let handlFee = new bigdecimal.BigDecimal(
              String(Math.pow(10, 12) * String(this.inputGasePrice) * 21000)
            );
        let serializParams = {
          version: "00000001",
          txType: "01",
          from: this.apAddress,
          to: this.toAddress,
          amount: new bigdecimal.BigDecimal(String(this.inputAmout)).multiply(
            bigEightPow
          ),
          nonce: this.nonce,
          data: "00",
          gasPrice: new bigdecimal.BigDecimal(
            String(this.inputGasePrice)
          ).multiply(tNTwelve),
          gasLimit: "21000",
          executeTime: "0000000000000000"
        };
        if (this.inputAmout == this.allamount) {
          serializParams.amount = new bigdecimal.BigDecimal(
            String(this.inputAmout)
          )
            .multiply(bigEightPow)
            .subtract(handlFee);
        }
        this.message = util.utilMethods.produce_message(serializParams);
        let signParams = {
          message: this.message,
          privKey: null
        };
        try {
          if (this.KStore !== null && this.pwd !== null) {
            signParams.privKey = util.utilMethods.produceKeyPriv(
              this.KStore,
              this.pwd
            );
            if (this.privKey !== null) {
              signParams.privKey = String(this.privKey);
            }
            this.signature = util.utilMethods.Sign(signParams);
            this.serialized_transaction = util.utilMethods.serialized_transaction(
              this.message,
              this.signature
            );
            this.confirm();
          }
        } catch (error) {
          console.log(error);
        }
      }
      return;
    },
    checkAddress() {
      try {
        this.privKey = util.utilMethods.produceKeyPriv(this.KStore, this.pwd);
        this.walletAddress = util.utilMethods.keyStoreWallet(
          this.KStore,
          this.pwd
        );
        if (this.walletAddress == this.apAddress) {
          this.$refs.dialog.style.display = "flex";
          this.check.checkPwd.style.visibility = "hidden";
          return;
        }
      } catch (error) {
        this.$refs.dialog.style.display = "none";
        this.check.checkPwd.style.visibility = "visible";
      }
    },
    confirm() {
      try {
        this.$axios
          .post(this.url.transfer_url, {
            rawTx: this.serialized_transaction
          })
          .then(response => {
            this.id = "txId:";
            this.txId = util.utilMethods.produceTxId(
              this.serialized_transaction
            );
            this.copyTxId = this.txId;
            let x = this.txId.slice(0, 6);
            let y = this.txId.slice(-6);
            this.txId = x + "......" + y;
          });
      } catch (error) {
        this.id = "originTx:";
        this.txId = this.serialized_transaction;
        this.copyTxId = this.txId;
        let x = this.txId.slice(0, 6);
        let y = this.txId.slice(-6);
        this.txId = x + "......" + y;
      }
    }
  },

  watch: {}
};
</script>
<style lang='less' scoped>
.transfer {
  width: 100%;
  height: 100%;
  .title {
    padding-left: 18px;
    padding-left: 23px;
    padding-top: 10px;
    padding-bottom: 9px;
    background-color: rgba(255, 255, 255, 0.1) !important;
  }
  .bg {
    height: calc(100% - 113px);
  }
  .flex-container {
    position: absolute;
    display: flex;
    height: 60%;
    width: 33.333%;
    margin-left: 30%;
    flex-direction: column;
    .from {
      margin: 0% 0 0 0%;
      div:nth-child(1) {
        color: rgba(255, 255, 255, 0.5);
        margin: 0px 0px 0px 0px;
      }
      input {
        background: rgba(255, 255, 255, 0.001);
        border: 1px solid #f26522;
        width: 335px;
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
        width: 335px;
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
      }
    }
    .amount {
      position: relative;
      div {
        position: relative;
        span {
          cursor: pointer;
          color: #f26522;
        }
      }
      input {
        background: rgba(255, 255, 255, 0.001);
        border: 1px solid #f26522;
        width: 235px;
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
        margin-left: 43px;
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
      }
    }
    .gasPrice {
      width: 340px;
      position: relative;
      .recommend {
        position: relative;
        span {
          cursor: pointer;
          color: #f26522;
        }
      }
      input {
        background: rgba(255, 255, 255, 0.001);
        border: 1px solid #f26522;
        width: 235px;
        color: aliceblue;
      }
      input:hover {
        box-shadow: 2px 2px 8px 2px #f26522;
      }
      div:nth-child(2) {
        padding-left: 25px;
        display: inline-block;
      }
      div:nth-child(3) {
        display: inline;
        position: absolute;
        margin-left: 23%;
        margin-top: 1.4%;
        z-index: 1;
        a {
          color: #f26522;
        }
      }
      div:nth-child(4) {
        color: #f26522;
        margin-top: 8px;
        visibility: hidden;
      }
    }
    .password {
      margin: 0% 0 0 0%;
      input {
        background: rgba(255, 255, 255, 0.001);
        border: 1px solid #f26522;
        width: 335px;
        color: aliceblue;
      }
      input:hover {
        box-shadow: 2px 2px 8px 2px #f26522;
      }
      img {
        z-index: 1;
        margin-left: 308px;
        margin-top: -23px;
        position: absolute;
        display: block;
        cursor: pointer;
      }
      div:nth-child(4) {
        color: #f26522;
        margin-top: 0px;
        visibility: hidden;
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
    background: rgba(255, 255, 255, 0);
    justify-content: center;
    align-items: center;
    z-index: 2;
    .confirm {
      margin: auto;
      width: 310px;
      height: 180px;
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
        margin-top: 30px;
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
      div:nth-child(3) {
        z-index: 1;
        text-align: center;
        width: 100%;
        height: 30px;
        margin-left: 0px;
        margin-top: 9px;
        line-height: 30px;
        border-radius: 4px;
        color: #f26522;
        font-size: 20px;
      }
    }
  }
}
</style>