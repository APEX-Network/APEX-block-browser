<template>
  <div class="privateKey">
    <apex-title :title="title"/>
    <apex-back-ground/>
    <div class="flex-container">
      <div class="text">
        <p>Import wallet address by private key.</p>
      </div>
      <div class="enterpwd">
        <input
          spellcheck="false"
          ref="privKey"
          type="text"
          v-model="inputPrivKey"
          @change="getprivKey"
          placeholder="please paste your private key"
        >
        <div class="repatpwd">
          <input
            spellcheck="false"
            type="password"
            ref="pwd"
            v-model="firstPwd"
            @change="getPwd"
            placeholder="please set you password"
          >
          <img src="./../../../assets/images/hiddeneye.jpg" @click="displayPwd" ref="hiddenpwd">
        </div>
      </div>
      <div class="create">
        <router-link to @click.native="privKeyAddress">ENCRYPT</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ApexTitle from "@/components/public/ApexTitle";
import ApexBackGround from "@/components/public/ApexBackGround";
import util from "./../../../utils/utils";
import Bus from "./../../../utils/bus";
import db from "./../../../utils/myDatabase";
const Base58check = require('base58check');

export default {
  name: "PrivateKey",
  props: [""],
  data() {
    return {
      title: "OpenWallet",
      privKey: null,
      pwd: null,
      keyStore: null,
      privKeyStore: null,
      hiddenpwd: null,
      firstClick: 1,
      inputPrivKey: null
    };
  },

  components: {
    ApexBackGround,
    ApexTitle
  },

  computed: {},

  beforeMount() {},

  mounted() {
    this.hiddenpwd = this.$refs.hiddenpwd;
    Bus.$on("keyStore", data => {
      this.keyStore = data;
    });
  },

  methods: {
    getprivKey() {
      this.inputPrivKey = this.$refs.privKey.value;
      let decode_privKey_Hex = Base58check.decode(this.inputPrivKey).data.toString("hex");
      let decode_privKey = decode_privKey_Hex.substring(0,decode_privKey_Hex.length - 2);
      this.privKey = decode_privKey;
    },
    getPwd() {
      this.pwd = this.$refs.pwd.value;
    },
    displayPwd() {
      this.firstClick++;
      if (this.firstClick % 2 == 0 && this.pwd !== null) {
        this.$refs.pwd.type = "text";
        this.hiddenpwd.src =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAMCAYAAABvEu28AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjJDQ0M3RjJDREU1MTExRThCMzdEQ0VDRTMzMkY0MkEyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU5RkU1OEM2REU1MTExRThCMzdEQ0VDRTMzMkY0MkEyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MkNDQzdGMkFERTUxMTFFOEIzN0RDRUNFMzMyRjQyQTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MkNDQzdGMkJERTUxMTFFOEIzN0RDRUNFMzMyRjQyQTIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4342abAAABe0lEQVR42lzTSyjEURTHcTNGnkOTpGw8ZoFioWxIikyUlYWFFBZepYiFskXySKFshMJCGWQ7K4VSFhZIShYehZ1GUozH9+in/v1vfZr/3O4993/OPX9PtKsgzjWSkYcK1KEQCbjDPg5xhagt9i/d/G3yuYIUoRdtCOAd1/qtRCN+sIcFHCFmG72OICHsYkBBThQ0JM0I4wtNWtv32h1MtM0epVaNdeQq6DlalUItshDBC9bQonX2dkOY92rznCPIJ6YUbFYn2yEbSMM0HrXWg1E7zAL1o8yR4jPOVK92pGhDPTpwgVPHej/GvaqHc1gNvpHkqqGNDBU35poPeJXWrWMyG/k6OeKYt//LsKKWuAKN+ZTGCFbUQ/YmgzhGj644HZt4wIwO+h/2IuH/PtpCKiaRiRqsYkILbeTouVMp240tWrFpyg+Po7Pj1QbDaNDcvVKymwyiWEEudXvbBHlzd/aXPgG7kXI1XRVKtdk+iR21wwGedCl/41eAAQB+5Vx/vl4kBAAAAABJRU5ErkJggg==";
      }
      if (this.firstClick % 2 == 1 && this.pwd !== null) {
        this.$refs.pwd.type = "password";
        this.hiddenpwd.src =
          "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAPCAYAAAACsSQRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjEzMDMxMTAzNEQxOTExRTk5NjM2RDE0OUI2NzgxODU4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjEzMDMxMTA0NEQxOTExRTk5NjM2RDE0OUI2NzgxODU4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTMwMzExMDE0RDE5MTFFOTk2MzZEMTQ5QjY3ODE4NTgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTMwMzExMDI0RDE5MTFFOTk2MzZEMTQ5QjY3ODE4NTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4J7CJ6AAAC8klEQVR42lRSzYtcRRD/VXX3zNuZTRxI3BCXjaselkTxIIIQDFEEBTdqIhIS9OBBQjyJf4GgJy9+3IKClxgDCUn2sCQYRWEQRA+BhaAgGNAsLCJEs5udN/NeV5X1Zj/AfhS8bqp//fsoGpyemRIJp7LkT1PAmoUOaPAPiBk57QCZwIgQDCDKiPgXgknACqjW6N5bRjSjvYbwARNeBPJBQP1SmCai/QDmvJLXwOtXr58IUjmC/xK2VqRES6Guj4ulCwZaiKiPSru9TzR8Qw6ojs5+R6m5FG8Dk58z6CNA1rdAwnsHvCEUvxi48HrLW/dHxidqetOMJwqhS0q2oi1+FEz3iRTPgsJJIv0ZpsupWnPJrwBru2fnLaYvSGXK/NXAWCSWl4IKSAl1Ski/D2aGu4o+9cKsZWskI+Xhc527t7/j0c7ejDu26KhTDTVijMRwRCVeCdH3sX5COF1L9Z2V7tLyYaUworEjBuF4vZro7eNhd89ZB3FKNvaK1D6Loi+o2dEyty+Rphudu8P++kO7ztcHen+GUb640a9NXKHs7vnS5efDW2abV1t0RTRe9xeX2epXS26dn0jVybZ0HrP7a8SqulWhvZ0Na32I8ffwB52M4wNy8BHHJ6lYRatYvQyNMLETZTstUiE3tSJUnJ4Zs0YTNDWpLXDB9AZl2zxuogzzqVx9pKP33uFAZ5zybz5v80Pji04AgfRjn60xAJsOJkROc9oZ/0jr1fO6SZBZ2mWc7g/L3Y8b1W+36nIuaj4oSq9J5suuf4E5v9zEHpGPtLL8FX2GYWzfJlRPG+I5UTxIkR6oLCxB7Xvj0Pf56TWzlpWPuegrCaNjzuJrl1U1cZK9OYt1H0lm38fWDrX4rqidclLTY91NU+P8huBbLuNhNrkaUM17Rg5AiFuj22j0b60V6P1S5EP3+CkmnvMou2okifOPTHaj1njCfTsHa10LVr/usu5sg2yDbTg88upv1v+Ws/qKkFkpniW2457Pmf8EGABwNmg2JKFbewAAAABJRU5ErkJggg==";
      }
    },
    privKeyAddress() {
      if (this.privKey !== null && this.pwd !== null) {
        Bus.$emit("privKey", this.privKey);
        let userPrivKey = this.privKey;
        let key = this.pwd;
        let keyStoreParams = {
          data: this.privKey,
          key: this.pwd,
          iv: null
        };
        this.walletAddress = util.utilMethods.privKeyWallet(userPrivKey, key);
        this.privKeyStore = util.utilMethods.produce_KeyStore(keyStoreParams);
        db.APKStore.put({
          APAddress: this.walletAddress,
          KStore: this.privKeyStore
        });
        Bus.$emit("apAddress", this.walletAddress);
        sessionStorage.setItem("apAddress", this.walletAddress);
        this.$router.push("/wallet");
      }
    }
  },

  watch: {}
};
</script>
<style lang='less' scoped>
@import "./../../../assets/css/layout";
.privateKey {
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
      margin-right: 50px;
      p {
        color: rgba(255, 255, 255, 0.7);
      }
    }
    .enterpwd {
      margin-top: 80px;
      margin-left: 35px;
      input {
        margin-left: 0px;
        background: rgba(255, 255, 255, 0.001);
        border: 1px solid #f26522;
        width: 370px;
        height: 30px;
        position: absolute;
        color: aliceblue;
      }
      input:hover {
        box-shadow: 2px 2px 8px 2px #f26522;
      }
      .repatpwd {
        margin: 45px 100px 0 0;
        input {
          margin-left: 0px;
          margin-top: 25px;
          width: 370px;
          height: 30px;
          color: aliceblue;
        }
        input:hover {
          box-shadow: 2px 2px 8px 2px #f26522;
        }
        img {
          z-index: 1000;
          margin-left: 340px;
          margin-top: 33px;
          position: relative;
          cursor: pointer;
        }
      }
    }
    .create {
      color: #f26522;
      border: 1px solid #f26522;
      margin-top: 60px;
      margin-right: 25px;
      text-align: center;
      height: 30px;
      width: 160px;
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