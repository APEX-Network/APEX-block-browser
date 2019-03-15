<template>
  <div class="newWallet">
    <apex-title :title="title"/>
    <apex-back-ground/>
    <div class="flex-container">
      <div class="text">
        <p>Password is Used To Encrypt Private Key And Authorize Transaction</p>
        <p>So It's Very Important To Set A Invulnerable Password.</p>
        <p>APEX Wallet Neither Store Your Password Nor Retrieve Them For You.</p>
        <p>Please Keep It In A Safe Place.</p>
      </div>
      <div class="enterpwd">
        <span>Enter Password</span>
        <input>
        <img src="./../../../assets/images/eye.png">
        <div class="repatpwd">
          <span>Repeat Password</span>
          <input type="text">
          <img src="./../../../assets/images/eye.png">
        </div>
        <div class="epd">Enter Password differ</div>
        <div class="agreePolicy">
          <img src="./../../../assets/images/checkbox.png">
          <span>
            I Agree to the
            <span>Service and Privacy Policy</span>
          </span>
        </div>
      </div>
      <div class="create" @click="produceSign">
        <router-link to="/wallet/NewWallet/CreatedKeystore">CREATE</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ApexTitle from "@/components/public/ApexTitle";
import ApexBackGround from "@/components/public/ApexBackGround";
import util from "../../../utils/utils";
import Crypto from "bitcoinjs-lib/src/crypto";
import Base58check from "base58check";
import ECPair from "bitcoinjs-lib/src/ecpair";
import ecc from "tiny-secp256k1";
import bitcoin from "bitcoinjs-lib";

export default {
  name: "NewWallet",
  props: [""],
  data() {
    return {
      title: "NewWallet"
    };
  },

  components: {
    ApexBackGround,
    ApexTitle
  },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    produceSign() {
      let apex = "0548";
      let message = "416c616e20547572696e67";
      let privKey =
        "48cd9eea1e9ab9bef56186ea7bc9496caf5187e65ee0d79e3bd239c3b1564946";
      let privKeyToBuffer = Buffer.from(privKey, "hex");

      let privKeyToWif = ECPair.fromPrivateKey(privKeyToBuffer).toWIF();
      let privKeyToPub = ECPair.fromPrivateKey(privKeyToBuffer).publicKey;
      //03d310db58713724b747f55e27f9ce97507e21900b602a9db3f201f70f03236612
      //03d310db58713724b747f55e27f9ce97507e21900b602a9db3f201f70f03236612

      let pubHash = Crypto.ripemd160(Crypto.sha256(privKeyToPub)).toString(
        "hex"
      );
      //3dab439f4f42104e484a1d6f30be25a85e33f746
      //3dab439f4f42104e484a1d6f30be25a85e33f746
      
      let apexAddress = Base58check.encode(pubHash, apex);
      //AP7aac9ufff1kwyeq6Eb34suDroeW16zRGY
      //AP7aac9ufff1kwyeq6Eb34suDroeW16zRGY
      

      let test_signature = util.utilMethods.produceSign(message, privKey);

      let test_from = Crypto.ripemd160(Crypto.sha256(test_signature)).toString(
        "hex"
      );
      //6f198af9c949705f319a5f92db515c9d279b14c2

      //Base58check encode
      // let from = "e2a4b7c6582f4e837668504eb2f4eaa796e908e4";
      let decodefrom = Base58check.encode(test_from, apex);
      //304402207063ae83e7f62bbb171798131b4a0564b956930092b33b07b395615d9ec7e15c022058dfcc1e00a35e1572f366ffe34ba0fc47db1e7189759b9fb233c5b05ab388ea
      let version = "00000001";//不变
      let txType = "01"; //不变
      let from = "APNctFxoeKJV9cXBzWarUmxmwoxxwfMXurX";
      let toPubKeyHash = "APGMmPKLYdtTNhiEkDGU6De8gNCk3bTsME9";
      let amount = util.utilMethods.toByteArray("1.000000000000000000").toString("hex");
      // let amount_encode = Base58check.encode(amount);
      
      let nonce = "0000000000000002";
      let data = "00"; //不变
      let gasPrice = "020237";
      let gasLimit = "020315";
      let executeTime = "0000000000000000"; //不变
      let signature =
        "46304402206afddf1f5fa1bbe9f91b9b4a39006a9196a07ca1acf106f5c5a13a327196b47702202def3ffd84b293b324fe95cc67504816f3185690425d51d580cea1707daedd8a";
      // let signature = a;
      let b = util.utilMethods.serialized_transaction(
        version,
        txType,
        from,
        toPubKeyHash,
        amount,
        nonce,
        data,
        gasPrice,
        gasLimit,
        executeTime,
        signature
      );
      //0000000101e2a4b7c6582f4e837668504eb2f4eaa796e908e49df7fc7ca2358cc2c0535e4d08532d9733e2bf58080de0b6b3a7640000000000000000000200020237020315000000000000000046304402206afddf1f5fa1bbe9f91b9b4a39006a9196a07ca1acf106f5c5a13a327196b47702202def3ffd84b293b324fe95cc67504816f3185690425d51d580cea1707daedd8a
    }
  },

  watch: {}
};
</script>
<style lang='less' scoped>
@import "./../../../assets/css/layout";
.newWallet {
  width: 100%;
  height: 100%;
  background: url(./../../../assets/images/shared/yunshi.png) 25% 35% no-repeat;
  .flex-container {
    display: flex;
    height: auto;
    width: 60%;
    margin-left: 20%;
    flex-direction: column;
    .text {
      margin-top: 80px;
      p:nth-child(1) {
        color: rgba(255, 255, 255, 0.7);
      }
      p:nth-child(2) {
        color: rgba(255, 255, 255, 0.7);
        text-indent: 40px;
        padding-top: 2px;
      }
      p:nth-child(3) {
        padding-top: 2px;
      }
      p:nth-child(4) {
        padding-top: 2px;
        text-indent: 80px;
      }
    }
    .enterpwd {
      margin-top: 40px;
      margin-left: 35px;
      input {
        margin-left: 30px;
        background: rgba(255, 255, 255, 0.001);
        border: 1px solid #f26522;
        width: 250px;
        height: 30px;
        position: absolute;
        color: aliceblue;
      }
      input:hover {
        box-shadow: 2px 2px 8px 2px #f26522;
      }
      img {
        z-index: 1000;
        margin-left: 256px;
        position: relative;
        margin-top: 6px;
      }
      .epd {
        margin-left: 130px;
        margin-top: 15px;
        color: #f26522;
        visibility: hidden;
      }
      .agreePolicy {
        margin-top: 10px;
        img {
          margin-left: 132px;
          margin-right: 10px;
          margin-top: 0px;
        }
        span {
          margin-right: 5px;
          span {
            color: #f26522;
          }
        }
      }
      .repatpwd {
        margin: 45px 100px 0 0;
        input {
          margin-left: 20px;
          width: 251px;
          color: antiquewhite;
        }
        input:hover {
          box-shadow: 2px 2px 8px 2px #f26522;
        }
        img {
          z-index: 1000;
          margin-left: 246px;
          margin-top: 6px;
          position: relative;
        }
      }
    }
    .create {
      color: #f26522;
      border: 1px solid #f26522;
      margin-top: 30px;
      text-align: center;
      height: 30px;
      width: 120px;
      line-height: 30px;
      z-index: 1;
      a {
        color: #f26522;
      }
      a:hover {
        box-shadow: 2px 2px 8px 2px #f26522;
      }
    }
  }
}
</style>