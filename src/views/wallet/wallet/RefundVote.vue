<template>
  <div class="refundVote">
    <p class="title">{{title}}</p>
    <div class="flex-container">
      <div class="from">
        <div>From:</div>
        <div>Wallet</div>
        <input v-model="apAddress" readonly="readonly">
      </div>

      <div class="to">
        <div>Refund node address</div>
        <Select2
          class="flex-item2"
          autocomplete="new-password"
          readonly
          onfocus="this.removeAttribute('readonly');"
          title="Please choose a Refund node address"
          v-model="toAddress"
          :options="targetAddress"
          @change="myChangeEvent($event)"
          @select="mySelectEvent($event)"
        />
        <img
          @click="CopyTo()"
          ref="copy"
          style="margin-top: -25px;cursor: pointer;float: right;margin-right: -30px;"
          src="../../../assets/images/copy.png"
          alt
        >
        <div class="errorAddress" ref="checktoAddress">Please enter the correct wallet address</div>
      </div>

      <div class="amount">
        <div>
          Refund Amount (Available:
          <span @click="setAllAmount">{{amount}}</span>)
        </div>
        <input
          spellcheck="false"
          type="text"
          ref="inputAmout"
          @keyup.enter="thInput($event)"
          @change="getInputAmout"
          placeholder="Refund Amount"
          autocomplete="new-password"
          readonly
          onfocus="this.removeAttribute('readonly');"
        >
        <p class="p1">
          <router-link to></router-link>
        </p>
        <p class="p2">CPX</p>
        <div ref="checkAmount">{{errorAmount}}</div>
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
          readonly
          onfocus="this.removeAttribute('readonly');"
        >
        <div>KGp</div>
        <div ref="checkGasPrice">Please enter the correct gas price</div>
      </div>
      <div class="password">
        <div>Password</div>
        <input
          autocomplete="new-password"
          spellcheck="false"
          type="password"
          ref="firstPwd"
          v-model="pwd"
          @change="getPwd"
          onKeyUp="value=value.replace(/[\W]/g,'')"
          placeholder="Please enter the  password"
          readonly
          onfocus="this.removeAttribute('readonly');"
        >
        <img src="./../../../assets/images/hiddeneye.png" @click="displayPwd" ref="hiddenpwd">
        <div ref="checkPwd">Password Incorrect</div>
      </div>
      <div class="send" @click="SendTransfer()">SEND</div>
    </div>
    <div class="dialog" ref="dialog">
      <div class="confirm" ref="confirm">
        <div>Broadcast Successful</div>
        <div>
          <router-link to="/wallet">CONFIRM</router-link>
        </div>
        <div>
          txId: {{txId}}
          <img
            @click="Copy()"
            ref="copyId"
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
const ApexTitle = r =>
  require.ensure(
    [],
    () => r(require("@/components/public/ApexTitle")),
    "titleAndBackground"
  );
const ApexBackGround = r =>
  require.ensure(
    [],
    () => r(require("@/components/public/ApexBackGround")),
    "titleAndBackground"
  );
import util from "@/utils/utils";
import Bus from "@/utils/bus";
import db from "@/utils/myDatabase";
const bigdecimal = require("bigdecimal");

export default {
  name: "VotingSupport",
  props: [""],
  data() {
    return {
      title: "Refund vote",
      serialized_transaction: null,
      errorAmount: "Please enter the correct Refund amount",
      url: {
        accountInfo_url: "/api/v1.0/accounts/account",
        transfer_url: "/api/v1.0/transactions/trading",
        gasePrice_url: "/api/v1.0/getAverageGasPrice",
        voter_url: "/api/v1.0/vote/getVote"
      },
      voter_params: { address: null },
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
      gasePrice: null,
      targetAddress: [],
      targetAddressAmount: [],
      tAddress: null,
      check: {
        checktoAddress: null,
        checkAmount: null,
        checkGasPrice: null,
        checkPwd: null
      },
      originValue: null,
      txId: null,
      copyImg: null,
      txIdImg: null
    };
  },

  components: {
    ApexBackGround,
    ApexTitle
  },

  computed: {},

  mounted() {
    this.transferPwd = this.$refs.hiddenpwd;
    this.voter_params.address = localStorage.getItem("apAddress");
    this.getAllInput();
    this.getAddress();
    this.getGasePrice();
    this.getAllInputInstances();
  },

  methods: {
    setAllGPrice() {
      this.$refs.inputGasePrice.value = this.gasePrice;
      this.check.checkGasPrice.style.visibility = "hidden";
      this.inputGasePrice = this.gasePrice;
    },
    myChangeEvent(val) {
      this.copyImg.src = require("../../../assets/images/copy.png");
      this.toAddress = val;
      this.check.checktoAddress.style.visibility = "hidden";
    },
    mySelectEvent({ id, text }) {
      this.targetAddressAmount.map(item => {
        if (item.key == { id, text }.id) {
          this.originValue = item.value;
          let result = this.originValue.toString().indexOf(".");
          if (result > -1) {
            let pointLength = this.originValue.toString().split(".")[1].length;
            if (pointLength > 8) {
              this.amount =
                this.originValue.toString().split(".")[0] +
                "." +
                this.originValue
                  .toString()
                  .split(".")[1]
                  .substring(0, 8);
            }
            if (pointLength <= 8) {
              this.amount = this.originValue;
            }
          }
          if (result == -1) {
            this.amount = this.originValue;
          }
          return this.amount;
        }
      });
    },
    CopyTo(index) {
      this.copyImg.src = require("../../../assets/images/copied.png");
      let getCopyText = this.toAddress;
      this.doToCopy(getCopyText);
    },
    doToCopy(val) {
      this.$copyText(val).then();
    },
    Copy(index) {
      this.txIdImg.src = require("../../../assets/images/copied.png");
      let getCopyText = this.copyTxId;
      this.doCopy(getCopyText);
    },
    doCopy(val) {
      this.$copyText(val).then(function(e) {}, function(e) {});
    },
    getAllInputInstances() {
      this.check.checktoAddress = this.$refs.checktoAddress;
      this.check.checkAmount = this.$refs.checkAmount;
      this.check.checkGasPrice = this.$refs.checkGasPrice;
      this.check.checkPwd = this.$refs.checkPwd;
      this.copyImg = this.$refs.copy;
      this.txIdImg = this.$refs.copyId;
    },
    getVoter() {
      if (this.voter_params.address !== null) {
        this.$axios
          .post(this.url.voter_url, {
            address: this.voter_params.address
          })
          .then(response => {
            let res = response.data.data;
            let address_amount = res.target;
            let amount, address;
            for (let i = 0; i < address_amount.length; i++) {
              let item = address_amount[i];
              address = item.split("-")[0].replace(/\s/gi, "");
              amount = item.split("-")[1].replace(/\s/gi, "");
              if (amount !== "0") {
                this.targetAddress.push(address);
                this.targetAddressAmount.push({ key: address, value: amount });
              }
            }
          })
          .catch(function(err) {
            if (err.response) {
              console.log(err.response);
            }
          });
      }
    },
    getAddress() {
      this.apAddress = localStorage.getItem("apAddress");
      if (this.apAddress !== null) {
        setTimeout(() => {
          this.getAccountInfo(this.apAddress);
          this.getVoter();
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
    getToAddress() {
      this.toAddress = this.$refs.to.value;
      if (this.toAddress.length !== 35 || this.toAddress.slice(0, 2) !== "AP") {
        this.check.checktoAddress.style.visibility = "visible";
        this.$refs.to.value = null;
      }
      if (this.toAddress.length == 35 && this.toAddress.slice(0, 2) == "AP") {
        this.check.checktoAddress.style.visibility = "hidden";
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
      //计算手续费不足的情况
      let fee = this.originValue - this.inputAmout;
      if (fee <= 0) {
        this.errorAmount = "Insufficient fee";
        this.check.checkAmount.style.visibility = "visible";
      }
      this.$refs.inputAmout.value = this.amount;
      this.check.checkAmount.style.visibility = "hidden";
      this.inputAmout = this.originValue;
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
        this.transferPwd.src = require("../../../assets/images/hiddeneye.png");
      }
    },
    getAccountInfo(address) {
      this.$axios
        .post(this.url.accountInfo_url, {
          address: address
        })
        .then(response => {
          let res = response.data.data;
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
        let serializParams = {
          version: "00000001",
          txType: "03",
          from: this.apAddress,
          to: "AP1xWDozWvuVah1W86DKtcWzdw1LqMYokMU",
          amount: new bigdecimal.BigDecimal(String(this.inputAmout)).multiply(
            bigEightPow
          ),
          nonce: this.nonce,
          data: this.toAddress,
          gasPrice: new bigdecimal.BigDecimal(
            String(this.inputGasePrice)
          ).multiply(tNTwelve),
          gasLimit: "30000",
          executeTime: "0000000000000000",
          votingRefundType: "01"
        };
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
          }
          if (this.privKey !== null) {
            signParams.privKey = String(this.privKey);
          }
          this.signature = util.utilMethods.Sign(signParams);
          this.serialized_transaction = util.utilMethods.serialized_transaction(
            this.message,
            this.signature
          );
          this.confirm();
        } catch (error) {}
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
      this.$axios
        .post(this.url.transfer_url, {
          rawTx: this.serialized_transaction
        })
        .then(response => {
          this.txId = util.utilMethods.produceTxId(this.serialized_transaction);
          this.copyTxId = this.txId;
          let x = this.txId.slice(0, 6);
          let y = this.txId.slice(-6);
          this.txId = x + "..." + y;
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
.refundVote {
  width: 100%;
  height: 100%;
  padding-right: 20px;
  padding-left: 25px;
  padding-top: 44px;
  .title {
    padding-left: 18px;
    padding-left: 23px;
    padding-top: 10px;
    padding-bottom: 9px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.07);
    background-color: #000 !important;
    border-radius: 4px 4px 0px 0px;
  }
  .flex-container {
    border-radius: 0 0 4px 4px;
    display: flex;
    height: 94%;
    background: #000;
    width: 100%;
    flex-direction: column;
    justify-content: space-between;
    .from {
      margin-bottom: 10px;
      div:nth-child(1) {
        color: rgba(255, 255, 255, 0.5);
        margin: 0px 0px 0px 0px;
      }
      input {
        background: rgba(255, 255, 255, 0.001);
        border: 1px solid #56c4fd;
        width: 335px;
        color: aliceblue;
      }
      input:hover {
        box-shadow: 2px 2px 8px 2px #56c4fd;
      }
    }
    .to {
      margin: 0% 0 0 0%;
      .flex-item2 {
        width: 340px !important;
        height: 35px !important;
        border: 1px solid #56c4fd;
      }
      .flex-item2:hover {
        box-shadow: 2px 2px 8px 2px #56c4fd;
      }
      div:nth-child(1) {
        color: rgba(255, 255, 255, 0.5);
        margin: 0px 0px 5px 0px;
      }
      .errorAddress {
        margin-top: 8px;
        color: #56c4fd;
        visibility: hidden;
      }
    }
    .amount {
      position: relative;
      div {
        margin: 0% 5% 0 2%;
        position: relative;
        span {
          cursor: pointer;
          color: #56c4fd;
        }
      }
      input {
        background: rgba(255, 255, 255, 0.001);
        border: 1px solid #56c4fd;
        width: 235px;
        color: aliceblue;
      }
      input:hover {
        box-shadow: 2px 2px 8px 2px #56c4fd;
      }
      .p1 {
        display: inline-block;
        margin-left: 45px;
        a {
          cursor: pointer;
          color: #56c4fd;
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
          color: #56c4fd;
        }
      }
      div:nth-child(4) {
        display: inline;
        margin-left: 20%;
      }
      div:nth-child(5) {
        color: #56c4fd;
        margin-top: 8px;
        margin-left: -2px;
        visibility: hidden;
      }
    }
    .gasPrice {
      width: 340px;
      position: relative;
      .recommend {
        margin: 0% 5% 0 2%;
        position: relative;
        span {
          cursor: pointer;
          color: #56c4fd;
        }
      }
      input {
        background: rgba(255, 255, 255, 0.001);
        border: 1px solid #56c4fd;
        width: 235px;
        color: aliceblue;
      }
      input:hover {
        box-shadow: 2px 2px 8px 2px #56c4fd;
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
          color: #56c4fd;
        }
      }
      div:nth-child(4) {
        color: #56c4fd;
        margin-top: 8px;
        visibility: hidden;
      }
    }
    .password {
      margin: 0% 0 0 0%;
      input {
        background: rgba(255, 255, 255, 0.001);
        border: 1px solid #56c4fd;
        width: 335px;
        color: aliceblue;
      }
      input:hover {
        box-shadow: 2px 2px 8px 2px #56c4fd;
      }
      img {
        z-index: 1;
        margin-left: 305px;
        margin-top: -23px;
        position: absolute;
        display: block;
        cursor: pointer;
      }
      div:nth-child(4) {
        color: #56c4fd;
        margin-top: 0px;
        visibility: hidden;
      }
    }
    .send {
      margin: 5px 0 0 18%;
      color: #ffffff;
      background: #004a80;
      width: 180px;
      height: 30px;
      margin-right: 18%;
      margin-bottom: 54px;
      text-align: center;
      line-height: 30px;
      border-radius: 4px;
      z-index: 2;
      cursor: pointer;
    }
    .send:hover {
      box-shadow: 2px 2px 8px 2px #004a80;
    }
  }
  .dialog {
    display: none;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0);
    justify-content: center;
    align-items: center;
    z-index: 2;
    bottom: 0;
    left: 15px;
    right: 0;
    position: fixed;
    .confirm {
      margin: auto;
      width: 310px;
      height: 180px;
      background: #ffffff;
      div:nth-child(1) {
        color: #56c4fd;
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
        background: #56c4fd;
        a {
          color: #ffffff;
        }
        a:hover {
          box-shadow: 2px 2px 8px 2px #56c4fd;
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
        color: #56c4fd;
        font-size: 20px;
      }
    }
  }
}
</style>