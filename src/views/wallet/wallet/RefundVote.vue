<template>
  <div class="refundVote">
    <apex-title :title="title" class="title"/>
    <apex-back-ground class="bg"/>
    <div class="flex-container">
      <div class="from">
        <div>From:</div>
        <div>Wallet</div>
        <input v-model="apAddress" readonly="readonly">
      </div>

      <div class="to">
        <div>Refund node address</div>
        <!-- <input
          spellcheck="false"
          ref="to"
          @keyup.enter="seInput($event)"
          @change="getToAddress"
          type="text"
          placeholder="Please Input Address"
          autocomplete="off"
        >-->
        <Select2
          class="flex-item2"
          readonly="readonly"
          autocomplete="off"
          title="Please choose a Refund node address"
          v-model="toAddress"
          :options="targetAddress"
          :settings="{ settingOption: value, settingOption: value }"
          @change="myChangeEvent($event)"
          @select="mySelectEvent($event)"
        />
        <div ref="checktoAddress">Please enter the correct wallet address</div>
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
          autocomplete="off"
        >
        <p class="p1" @click="setAllAmount">
          <router-link to>All</router-link>
        </p>
        <p class="p2">CPX</p>
        <div ref="checkAmount">Please enter the correct transfer amount</div>
      </div>
      <div class="gasPrice">
        <div class="recommend">
          Recommended:
          <span>{{gasePrice}} Mp</span>
        </div>
        <input
          spellcheck="false"
          type="text"
          ref="inputGasePrice"
          @keyup.enter="foInput($event)"
          @change="getInputGasePrice"
          placeholder="Please enter the  gas price"
          autocomplete="off"
        >
        <div>Mp</div>
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
          txId: {{txId}}
          <img
            @click="Copy(index)"
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
import ApexTitle from "@/components/public/ApexTitle";
import ApexBackGround from "@/components/public/ApexBackGround";
import util from "../../../utils/utils";
import Bus from "./../../../utils/bus";
import db from "./../../../utils/myDatabase";
const bigdecimal = require("bigdecimal");

export default {
  name: "VotingSupport",
  props: [""],
  data() {
    return {
      title: "Refund vote",
      serialized_transaction: null,
      url: {
        accountInfo_url: "/api/v1.0/accounts/account",
        transfer_url: "/api/v1.0/transactions/trading",
        gasePrice_url: "/api/v1.0/getAverageGasPrice",
        voter_url: "/api/v1.0/vote/getVote" //getVote接口
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
      inputGasePrice: null, //用户输入
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
      }
    };
  },

  components: {
    ApexBackGround,
    ApexTitle
  },

  computed: {},

  mounted() {
    this.transferPwd = this.$refs.hiddenpwd;
    this.voter_params.address = sessionStorage.getItem("apAddress");
    this.getAllInput();
    this.getAddress();
    this.getGasePrice();
    this.getAllInputInstances();
  },

  methods: {
    myChangeEvent(val) {
      this.toAddress = val;
        this.check.checktoAddress.style.visibility = "hidden";
      // sessionStorage.setItem("apAddress", this.address);
    },
    mySelectEvent({ id, text }) {
      this.targetAddressAmount.map(item => {
        // console.log(item.key);
        if (item.key == { id, text }.id) {
          this.amount = item.value;
          // console.log(this.amount + this.toAddress);
          return this.amount;
        }
        // console.log({ id, text });
      });
    },
    Copy(index) {
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
              address = address_amount[i].split("-")[0].replace(/\s/gi, "");
              amount = address_amount[i].split("-")[1].replace(/\s/gi, "");
              // let result = amount.toString().indexOf(".");
              // if (result > -1) {
              //   let pointLength = amount.toString().split(".")[1].length;
              //   if (pointLength > 8) {
              //     this.Balance =
              //       amount.toString().split(".")[0] +
              //       "." +
              //       amount
              //         .toString()
              //         .split(".")[1]
              //         .substring(0, 8);
              //   }
              //   if (pointLength <= 8) {
              //     this.Balance = amount;
              //   }
              // }
              // if (result == -1) {
              //   this.Balance = amount;
              // }
              this.targetAddress.push(address);
              this.targetAddressAmount.push({ key: address, value: amount });
            }
            // console.log(this.targetAddressAmount);
          })
          .catch(function(err) {
            if (err.response) {
              console.log(err.response);
            }
          });
      }
    },
    getAddress() {
      Bus.$on("apAddress", data => {
        this.apAddress = data;
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
      });
      Bus.$on("privKey", data => {
        this.privKey = data;
      });
    },
    getGasePrice() {
      this.$axios
        .post(this.url.gasePrice_url)
        .then(response => {
          let res = response.data.data;
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
        console.log(this.check.checktoAddress);
        this.check.checktoAddress.style.visibility = "visible";
        this.$refs.to.value = null;
      }
      if (this.toAddress.length == 35 && this.toAddress.slice(0, 2) == "AP") {
        this.check.checktoAddress.style.visibility = "hidden";
      }
    },
    getInputAmout() {
      this.inputAmout = this.$refs.inputAmout.value;
      console.log(this.inputAmout);
       if (this.amount == 0 || this.inputAmout == 0) {
        this.check.checkAmount.style.visibility = "visible";
      }
      if (this.inputAmout > 0 && this.inputAmout <= this.amount) {
        this.check.checkAmount.style.visibility = "hidden";
        this.inputAmout = this.inputAmout;
      }
      if (this.inputAmout > this.amount) {
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
      console.log(this.pwd);
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
          // let result = res.balance.toString().indexOf(".");
          // this.allamount = res.balance;
          // if (result > -1) {
          //   let pointLength = res.balance.toString().split(".")[1].length;
          //   if (pointLength > 8) {
          //     this.amount =
          //       res.balance.toString().split(".")[0] +
          //       "." +
          //       res.balance
          //         .toString()
          //         .split(".")[1]
          //         .substring(0, 8);
          //   }
          //   if (pointLength <= 8) {
          //     this.amount = res.balance;
          //   }
          // }
          // if (result == -1) {
          //   this.amount = res.balance;
          // }
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
        this.$refs.dialog.style.display = "flex";
        let serializParams = {
          version: "00000001", //不变
          txType: "03", //不变
          from: this.apAddress,
          to: "AP1xWDozWvuVah1W86DKtcWzdw1LqMYokMU", //合约地址
          amount: new bigdecimal.BigDecimal(String(this.inputAmout)).subtract(
            new bigdecimal.BigDecimal(
              String(
                Math.pow(10, -18) *
                  String(this.inputGasePrice) *
                  Math.pow(10, 6) *
                  30000
              )
            )
          ),
          nonce: this.nonce, //从服务器获取该账户的nonce值
          data: this.toAddress, //被赎回地址
          gasPrice: new bigdecimal.BigDecimal(
            String(this.inputGasePrice)
          ).multiply(new bigdecimal.BigDecimal(String(Math.pow(10, 6)))),
          gasLimit: "30000", //程序限制
          executeTime: "0000000000000000", //不变
          votingRefundType: "01"
        };
        if (this.inputAmout !== this.allamount) {
          serializParams.amount = new bigdecimal.BigDecimal(
            String(this.inputAmout)
          );
        }
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
        this.confirm();

        console.log(this.serialized_transaction);
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
        this.check.checkPwd.style.visibility = "hidden";
        return;
      }
      if (this.walletAddress !== this.apAddress) {
        this.check.checkPwd.style.visibility = "visible";
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
          this.copyTxId = res.txId;
          let x = res.txId.slice(0, 6);
          let y = res.txId.slice(-6);
          this.txId = x + "..." + y;
          console.log(res.txId);
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
  .bg {
    background: url(./../../../assets/images/shared/yunshi.png) 34% 58%
      no-repeat;
  }
  .flex-container {
    position: absolute;
    display: flex;
    height: 60%;
    width: 33.333%;
    margin-left: 30%;
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
        border: 1px solid #f26522;
        width: 335px;
        color: aliceblue;
      }
      input:hover {
        box-shadow: 2px 2px 8px 2px #f26522;
      }
    }
    .to {
      margin: 0% 0 0 0%;
      .flex-item2 {
        width: 340px !important;
        height: 35px !important;
        border: 1px solid #f26522;
        /deep/ .form-control:focus {
          border: 1px solid #f26522;
        }
        /deep/ .select2-container--focus {
          outline: none;
        }
        /deep/ .select2-container--open {
          /deep/ .select2-selection--single {
            outline: none;

            /deep/ .select2-selection__arrow {
              /deep/ b {
                left: 0;
                margin-left: 0;
                display: inline-block;
                content: " ";
                height: 14px;
                width: 14px;
                border-width: 2px 0px 0px 2px;
                border-color: #f26522;
                border-style: solid;
                transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
                transform-origin: center;
                transition: transform 0.3s;
                position: absolute;
                top: 75%;
                right: 8px;
                margin-top: -12px;
              }
            }
          }
        }

        /deep/.select2-selection--single {
          outline: none;
          line-height: 30px;
          background-color: transparent;
          border: 0px solid;
          border-radius: 0px;
          line-height: 33px;
          height: 33px;
          /deep/ .select2-selection__rendered {
            color: #fff;
            line-height: 35px;
          }
          /deep/ .select2-selection__arrow {
            height: 33px;
            position: absolute;
            top: 1px;
            right: 1px;
            width: 22px;
            /deep/ b {
              left: 0;
              margin-left: 0px;
              display: inline-block;
              content: " ";
              height: 14px;
              width: 14px;
              border-width: 0 2px 2px 0;
              border-color: #f26522;
              border-style: solid;
              transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
              transform-origin: center;
              transition: transform 0.3s;
              position: absolute;
              top: 75%;
              right: 8px;
              margin-top: -20px;
            }
          }
        }
      }
      .flex-item2:hover {
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
        margin: 0% 5% 0 2%;
        position: relative;
        span {
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
      }
    }
    .gasPrice {
      width: 340px;
      position: relative;
      .recommend {
        margin: 0% 5% 0 2%;
        position: relative;
        span {
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
        margin-left: 4%;
        margin-top: 1.4%;
        z-index: 1;
        a {
          color: #f26522;
        }
      }
      div:nth-child(3) {
        margin-top: 8px;
        margin-left: 30px;
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
        margin-left: 305px;
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