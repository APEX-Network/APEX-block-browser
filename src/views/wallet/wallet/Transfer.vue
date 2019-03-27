<template>
  <div class="transfer">
    <apex-title :title="title"/>
    <apex-back-ground/>
    <div class="flex-container">
      <div class="from">
        <div>From:</div>
        <div>Wallet</div>
        <input v-model="apAddress">
      </div>

      <div class="to">
        <div>To:</div>
        <input ref="to" @change="getToAddress" type="text" placeholder="Please Input Address">
        <div>Please enter the correct wallet address</div>
      </div>

      <div class="amount">
        <span v-if="amount !== null">Amount (Available:{{amount}})</span>
        <input type="text" ref="inputAmout" @change="getInputAmout" placeholder="Transfer Amount">
        <div>
          <router-link to>All</router-link>
        </div>
        <div>CPX</div>
        <div>Please enter the correct transfer amount</div>
      </div>
      <div class="gasPrice">
        <input type="text" ref="inputGasePrice" @change="getInputGasePrice" placeholder="Please enter the  gas price">
        <div>Mp</div>
        <div>Please enter the correct gas price</div>
      </div>
      <div class="password">
        <div>Password</div>
        <input type="password" ref="firstPwd" v-model="pwd" @change="getPwd">
        <img src="./../../../assets/images/eye.png">
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

export default {
  name: "Transfer",
  props: [""],
  data() {
    return {
      title: "Transfer",
      serialized_transaction: null,
      accountInfo_url: "/api/v1.0/accounts/account",
      signature: null,
      apAddress: null,
      walletAddress: null,
      amount: null,
      nonce: null,
      KStore: null,
      pwd: null,
      privKey: null,
      toAddress: null,
      message: null,
      inputAmout: null,
      inputGasePrice: null //用户输入
    };
  },

  components: {
    ApexBackGround,
    ApexTitle
  },

  computed: {},

  mounted() {
    this.getAddress();
    // if (this.apAddress !== null) {
        setTimeout(() => {
          // this.apAddress = "APMMCd8qWPm9QRzgspFXEBn8zGGuwrYYAJs";
          this.getAccountInfo(this.apAddress);
        });
        // }
  },

  methods: {
    getAddress() {
      Bus.$on("apAddress", data => {
        this.apAddress = data;        
      });
      // if (this.apAddress !== null) {
        setTimeout(() => {
          db.APKStore.get(this.apAddress).then(APKStore => {
            console.log(APKStore.KStore);
            this.KStore = APKStore.KStore;
          });
        });
      // }
    },

    getToAddress() {
      this.toAddress = this.$refs.to.value;
      console.log("获得用户粘贴的to地址:" + this.toAddress);
      
    },
    getInputAmout() {
      this.inputAmout = this.$refs.inputAmout.value;
      console.log("获得用户输入的amount值:" + this.inputAmout);
    },
    getInputGasePrice() {
      this.inputGasePrice = this.$refs.inputGasePrice.value;
      console.log("获得用户输入的GasePrice值:" + this.inputAmout);
    },
    // getPSAddress() {
    //   this.psAddress = this.$refs.psAddress.value;
    //   db.APKStore.get(this.psAddress).then(APKStore => {
    //     console.log("通过用户粘贴的地址获得KStore" + APKStore.KStore);
    //     this.KStore = APKStore.KStore;
    //   });
    //   this.getAccountInfo(this.psAddress);
    // },
    getPwd() {
      this.pwd = this.$refs.firstPwd.value;
      console.log(this.pwd);
    },
    getAccountInfo(address) {
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
              this.amount = Number(res.balance).toFixed(8);
            } else {
              this.amount = Number(res.balance);
            }
          } else {
            this.amount = Number(res.balance);
          }
          this.nonce = res.nextNonce;
          console.log(
          parseFloat(this.nonce)
          );
          console.log("该账户的nonce值为===========" + this.nonce);
        })
        .catch(function(err) {
          if (err.response) {
            console.log(err.response);
          }
        });
    },
    SendTransfer() {
      this.checkAddress();
      this.$refs.dialog.style.display = "flex";
      let serializParams = {
        version: "00000001", //不变
        txType: "01", //不变
        from: this.apAddress,
        to: this.toAddress,
        amount: this.inputAmout * Math.pow(10, 18),
        nonce: "0000000000000002", //从服务器获取该账户的nonce值
        data: "00", //不变
        gasPrice: this.inputGasePrice * Math.pow(10, -18),//用户输入
        gasLimit: 100000, //程序限制
        executeTime: "0000000000000000", //不变
      };
      this.message = util.utilMethods.produce_message(serializParams);
      let signParams = {
        message: this.message,
        privKey: this.privKey
      };
      this.signature = util.utilMethods.Sign(signParams);
      alert("生成签名:" + this.signature);
      this.serialized_transaction = util.utilMethods.serialized_transaction(
        this.message, this.signature
      );
      alert("序列化交易:" + this.serialized_transaction);
    },
    checkAddress() {
      this.privKey = util.utilMethods.produceKeyPriv(this.KStore, this.pwd);
      console.log("根据KStore导出的私钥" + this.privKey);

      this.walletAddress = util.utilMethods.keyStoreWallet(
        this.KStore,
        this.pwd
      );
      if (this.walletAddress == this.apAddress) {
        alert("恭喜您输入密码正确,您可以给我转钱了");
      }
      if (this.walletAddress !== this.apAddress) {
        alert("sorry!请输入正确的密码,才能给我转钱哦😯");
          this.$router.push("/wallet/Transfer");
          return;
      }
      console.log(this.walletAddress);
    },
    confirm() {
      // this.$refs.dialog.style.display = "none";
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
      margin: 8% 0 0 0%;
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
        margin-left: 10px;
        visibility: hidden;
        // visibility:visible;
      }
    }
    .amount {
      margin: 5% 0 0 11.5%;
      // span {
      //   position: absolute;
      // }
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
        margin-left: 10px;
        visibility: hidden;
        // visibility:visible;
      }
    }
    .gasPrice {
      margin: 5% 0 0 -16.5%;
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
        padding-left: 10px;
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
        margin-left: 10px;
        visibility: hidden;
        // visibility:visible;
      }
    }
    .password {
      margin: 10% 0 0 0.1%;
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
        position: relative;
        display: block;
      }
      div:nth-child(4) {
        color: #f26522;
        margin-top: 15px;
        margin-left: 10px;
        visibility: hidden;
        // visibility:visible;
      }
    }
    .send {
      margin: 5% 0 0 18%;
      color: #ffffff;
      background: #f26522;
      width: 180px;
      height: 30px;
      margin-right: 18%;
      margin-top: 30px;
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
    height: 102%;
    margin-top: -38px;
    background: rgba(255, 255, 255, 0.1);
    justify-content: center;
    align-items: center;
    z-index: 1;
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