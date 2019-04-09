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
        <input
          spellcheck="false"
          type="password"
          ref="firstPwd"
          @keyup.enter="nextInput($event)"
          v-model="firstPwd"
          @change="getPwd"
        >
        <!-- <input type="text" ref="firstPwdCover" v-model="firstPwdCover" @change="coverFirstPwd"> -->
        <img src="../../../assets/images/hiddeneye.jpg" @click="displayFirstPwd" ref="firstEye">
        <div class="repatpwd">
          <span>Repeat Password</span>
          <input
            spellcheck="false"
            type="password"
            ref="secondPwd"
            @keyup.enter="prevInput($event)"
            v-model="secondPwd"
            @change="getPwd"
          >
          <!-- <input type="text" ref="secondPwdCover" v-model="secondPwdCover" @change="coverSecondPwd"> -->
          <img src="../../../assets/images/hiddeneye.jpg" @click="displaySecondPwd" ref="secondEye">
        </div>
        <div class="epd">Enter Password differ</div>
        <div class="agreePolicy">
          <img
            src="./../../../assets/images/nocheckbox.jpg"
            @click="changeCheckBox"
            ref="nocheckbox"
          >
          <span>
            I Agree to the
            <span
              style="
            cursor: pointer;
            "
              @click="privacyPolicy"
            >Service and Privacy Policy</span>
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
import ECPair from "bitcoinjs-lib/src/ecpair";
import Bus from "./../../../utils/bus";
import db from "./../../../utils/myDatabase";

export default {
  name: "NewWallet",
  props: [""],
  data() {
    return {
      title: "NewWallet",
      apAddress: null,
      firstPwd: null,
      firstPwdCover: null,
      secondPwd: null,
      secondPwdCover: null,
      keyStore: null,
      firstInput: null,
      secondInput: null,
      nocheckbox: null,
      firstEye: null,
      secondEye: null,
      firstClick: 1
    };
  },

  components: {
    ApexBackGround,
    ApexTitle
  },

  computed: {},

  beforeMount() {},

  mounted() {
    this.firstInput = this.$refs.firstPwd;
    this.secondInput = this.$refs.secondPwd;
    this.nocheckbox = this.$refs.nocheckbox;
    this.firstEye = this.$refs.firstEye;
    this.secondEye = this.$refs.secondEye;
  },

  methods: {
    getPwd() {
      this.first = this.$refs.firstPwd.value;
      this.second = this.$refs.secondPwd.value;
    },
    nextInput(ev) {
      if (ev.keyCode == 13) {
        this.secondInput.focus();
      }
    },
    produceSign() {
      if (this.firstPwd != null && this.secondPwd != null) {
        if (this.first != this.second) {
          alert("两次密码输入不正确,请重新输入!");
          this.$router.push("/wallet/NewWallet");
          return;
        }
        let ap = "0548";
        let signParams = {
          privKey: ECPair.makeRandom().privateKey.toString("hex")
        };
        Bus.$emit("privKey", signParams.privKey);
        this.apAddress = util.utilMethods.produce_address(
          signParams.privKey,
          ap
        );
        Bus.$emit("apAddress", this.apAddress);
        sessionStorage.setItem("apAddress", this.apAddress);
        let keyStoreParams = {
          data: signParams.privKey,
          key: this.secondPwd,
          iv: null
        };
        this.keyStore = util.utilMethods.produce_KeyStore(keyStoreParams);
        Bus.$emit("keyStore", this.keyStore);
        db.APKStore.put({
          APAddress: this.apAddress,
          KStore: this.keyStore
        });
      }
      if (this.firstPwd == null || this.secondPwd == null) {
        alert("请输入密码!");
        this.$router.push("/wallet/NewWallet");
        return;
      }
    },
    displayFirstPwd() {
      this.firstClick++;
      if (this.firstClick % 2 == 0 && this.firstPwd !== null) {
        this.$refs.firstPwd.type = "text";
        this.firstEye.src =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAMCAYAAABvEu28AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjJDQ0M3RjJDREU1MTExRThCMzdEQ0VDRTMzMkY0MkEyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU5RkU1OEM2REU1MTExRThCMzdEQ0VDRTMzMkY0MkEyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MkNDQzdGMkFERTUxMTFFOEIzN0RDRUNFMzMyRjQyQTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MkNDQzdGMkJERTUxMTFFOEIzN0RDRUNFMzMyRjQyQTIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4342abAAABe0lEQVR42lzTSyjEURTHcTNGnkOTpGw8ZoFioWxIikyUlYWFFBZepYiFskXySKFshMJCGWQ7K4VSFhZIShYehZ1GUozH9+in/v1vfZr/3O4993/OPX9PtKsgzjWSkYcK1KEQCbjDPg5xhagt9i/d/G3yuYIUoRdtCOAd1/qtRCN+sIcFHCFmG72OICHsYkBBThQ0JM0I4wtNWtv32h1MtM0epVaNdeQq6DlalUItshDBC9bQonX2dkOY92rznCPIJ6YUbFYn2yEbSMM0HrXWg1E7zAL1o8yR4jPOVK92pGhDPTpwgVPHej/GvaqHc1gNvpHkqqGNDBU35poPeJXWrWMyG/k6OeKYt//LsKKWuAKN+ZTGCFbUQ/YmgzhGj644HZt4wIwO+h/2IuH/PtpCKiaRiRqsYkILbeTouVMp240tWrFpyg+Po7Pj1QbDaNDcvVKymwyiWEEudXvbBHlzd/aXPgG7kXI1XRVKtdk+iR21wwGedCl/41eAAQB+5Vx/vl4kBAAAAABJRU5ErkJggg==";
      }
      if (this.firstClick % 2 == 1 && this.firstPwd !== null) {
        this.$refs.firstPwd.type = "password";
        this.firstEye.src =
          "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAPCAYAAAACsSQRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjEzMDMxMTAzNEQxOTExRTk5NjM2RDE0OUI2NzgxODU4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjEzMDMxMTA0NEQxOTExRTk5NjM2RDE0OUI2NzgxODU4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTMwMzExMDE0RDE5MTFFOTk2MzZEMTQ5QjY3ODE4NTgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTMwMzExMDI0RDE5MTFFOTk2MzZEMTQ5QjY3ODE4NTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4J7CJ6AAAC8klEQVR42lRSzYtcRRD/VXX3zNuZTRxI3BCXjaselkTxIIIQDFEEBTdqIhIS9OBBQjyJf4GgJy9+3IKClxgDCUn2sCQYRWEQRA+BhaAgGNAsLCJEs5udN/NeV5X1Zj/AfhS8bqp//fsoGpyemRIJp7LkT1PAmoUOaPAPiBk57QCZwIgQDCDKiPgXgknACqjW6N5bRjSjvYbwARNeBPJBQP1SmCai/QDmvJLXwOtXr58IUjmC/xK2VqRES6Guj4ulCwZaiKiPSru9TzR8Qw6ojs5+R6m5FG8Dk58z6CNA1rdAwnsHvCEUvxi48HrLW/dHxidqetOMJwqhS0q2oi1+FEz3iRTPgsJJIv0ZpsupWnPJrwBru2fnLaYvSGXK/NXAWCSWl4IKSAl1Ski/D2aGu4o+9cKsZWskI+Xhc527t7/j0c7ejDu26KhTDTVijMRwRCVeCdH3sX5COF1L9Z2V7tLyYaUworEjBuF4vZro7eNhd89ZB3FKNvaK1D6Loi+o2dEyty+Rphudu8P++kO7ztcHen+GUb640a9NXKHs7vnS5efDW2abV1t0RTRe9xeX2epXS26dn0jVybZ0HrP7a8SqulWhvZ0Na32I8ffwB52M4wNy8BHHJ6lYRatYvQyNMLETZTstUiE3tSJUnJ4Zs0YTNDWpLXDB9AZl2zxuogzzqVx9pKP33uFAZ5zybz5v80Pji04AgfRjn60xAJsOJkROc9oZ/0jr1fO6SZBZ2mWc7g/L3Y8b1W+36nIuaj4oSq9J5suuf4E5v9zEHpGPtLL8FX2GYWzfJlRPG+I5UTxIkR6oLCxB7Xvj0Pf56TWzlpWPuegrCaNjzuJrl1U1cZK9OYt1H0lm38fWDrX4rqidclLTY91NU+P8huBbLuNhNrkaUM17Rg5AiFuj22j0b60V6P1S5EP3+CkmnvMou2okifOPTHaj1njCfTsHa10LVr/usu5sg2yDbTg88upv1v+Ws/qKkFkpniW2457Pmf8EGABwNmg2JKFbewAAAABJRU5ErkJggg==";
      }
    },
    displaySecondPwd() {
      this.firstClick++;
      if (this.firstClick % 2 == 0 && this.secondPwd !== null) {
        this.$refs.secondPwd.type = "text";
        this.secondEye.src =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAMCAYAAABvEu28AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjJDQ0M3RjJDREU1MTExRThCMzdEQ0VDRTMzMkY0MkEyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU5RkU1OEM2REU1MTExRThCMzdEQ0VDRTMzMkY0MkEyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MkNDQzdGMkFERTUxMTFFOEIzN0RDRUNFMzMyRjQyQTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MkNDQzdGMkJERTUxMTFFOEIzN0RDRUNFMzMyRjQyQTIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4342abAAABe0lEQVR42lzTSyjEURTHcTNGnkOTpGw8ZoFioWxIikyUlYWFFBZepYiFskXySKFshMJCGWQ7K4VSFhZIShYehZ1GUozH9+in/v1vfZr/3O4993/OPX9PtKsgzjWSkYcK1KEQCbjDPg5xhagt9i/d/G3yuYIUoRdtCOAd1/qtRCN+sIcFHCFmG72OICHsYkBBThQ0JM0I4wtNWtv32h1MtM0epVaNdeQq6DlalUItshDBC9bQonX2dkOY92rznCPIJ6YUbFYn2yEbSMM0HrXWg1E7zAL1o8yR4jPOVK92pGhDPTpwgVPHej/GvaqHc1gNvpHkqqGNDBU35poPeJXWrWMyG/k6OeKYt//LsKKWuAKN+ZTGCFbUQ/YmgzhGj644HZt4wIwO+h/2IuH/PtpCKiaRiRqsYkILbeTouVMp240tWrFpyg+Po7Pj1QbDaNDcvVKymwyiWEEudXvbBHlzd/aXPgG7kXI1XRVKtdk+iR21wwGedCl/41eAAQB+5Vx/vl4kBAAAAABJRU5ErkJggg==";
      }
      if (this.firstClick % 2 == 1 && this.secondPwd !== null) {
        this.$refs.secondPwd.type = "password";
        this.secondEye.src =
          "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAPCAYAAAACsSQRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjEzMDMxMTAzNEQxOTExRTk5NjM2RDE0OUI2NzgxODU4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjEzMDMxMTA0NEQxOTExRTk5NjM2RDE0OUI2NzgxODU4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTMwMzExMDE0RDE5MTFFOTk2MzZEMTQ5QjY3ODE4NTgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTMwMzExMDI0RDE5MTFFOTk2MzZEMTQ5QjY3ODE4NTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4J7CJ6AAAC8klEQVR42lRSzYtcRRD/VXX3zNuZTRxI3BCXjaselkTxIIIQDFEEBTdqIhIS9OBBQjyJf4GgJy9+3IKClxgDCUn2sCQYRWEQRA+BhaAgGNAsLCJEs5udN/NeV5X1Zj/AfhS8bqp//fsoGpyemRIJp7LkT1PAmoUOaPAPiBk57QCZwIgQDCDKiPgXgknACqjW6N5bRjSjvYbwARNeBPJBQP1SmCai/QDmvJLXwOtXr58IUjmC/xK2VqRES6Guj4ulCwZaiKiPSru9TzR8Qw6ojs5+R6m5FG8Dk58z6CNA1rdAwnsHvCEUvxi48HrLW/dHxidqetOMJwqhS0q2oi1+FEz3iRTPgsJJIv0ZpsupWnPJrwBru2fnLaYvSGXK/NXAWCSWl4IKSAl1Ski/D2aGu4o+9cKsZWskI+Xhc527t7/j0c7ejDu26KhTDTVijMRwRCVeCdH3sX5COF1L9Z2V7tLyYaUworEjBuF4vZro7eNhd89ZB3FKNvaK1D6Loi+o2dEyty+Rphudu8P++kO7ztcHen+GUb640a9NXKHs7vnS5efDW2abV1t0RTRe9xeX2epXS26dn0jVybZ0HrP7a8SqulWhvZ0Na32I8ffwB52M4wNy8BHHJ6lYRatYvQyNMLETZTstUiE3tSJUnJ4Zs0YTNDWpLXDB9AZl2zxuogzzqVx9pKP33uFAZ5zybz5v80Pji04AgfRjn60xAJsOJkROc9oZ/0jr1fO6SZBZ2mWc7g/L3Y8b1W+36nIuaj4oSq9J5suuf4E5v9zEHpGPtLL8FX2GYWzfJlRPG+I5UTxIkR6oLCxB7Xvj0Pf56TWzlpWPuegrCaNjzuJrl1U1cZK9OYt1H0lm38fWDrX4rqidclLTY91NU+P8huBbLuNhNrkaUM17Rg5AiFuj22j0b60V6P1S5EP3+CkmnvMou2okifOPTHaj1njCfTsHa10LVr/usu5sg2yDbTg88upv1v+Ws/qKkFkpniW2457Pmf8EGABwNmg2JKFbewAAAABJRU5ErkJggg==";
      }
    },
    privacyPolicy() {
      this.$router.push("/home");
    },
    changeCheckBox() {
      this.firstClick++;
      if (this.firstClick % 2 == 0) {
        this.nocheckbox.src =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkRBNEJFMERFREU1MTExRThCMzdEQ0VDRTMzMkY0MkEyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkRBNEJFMERGREU1MTExRThCMzdEQ0VDRTMzMkY0MkEyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTlGRTU4Q0ZERTUxMTFFOEIzN0RDRUNFMzMyRjQyQTIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTlGRTU4RDBERTUxMTFFOEIzN0RDRUNFMzMyRjQyQTIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/8bXkAAAA20lEQVR42mL8lKpkx8DAEATEP4H4PwN+wArEZ1iARDQQbwbiK0DMSEATMxAXgTS9AuJLvLPuPmIgAnxOU37EBGVzEqkB5BImJiIVdwGxM9A1YD/DNP0HCrLg0DAfSP0G4uNQmxhgCr8CsTRQsBLkUaCJ36AKlgLxZSC/Hcl5cJt4gBIPgfQFIJ4HlLQA0ouA+DRMAzJA8RNQwQwgNQ2IJwLxMiC/H5uTMfwBVHgISJnjCxiYTX+ICUVo6P0H2SQGxEJAfzwmQh9IvTgjMO35Axkgj38kUtNLgAADAKnPRmYhrfmrAAAAAElFTkSuQmCC";
      }
      if (this.firstClick % 2 == 1) {
        this.nocheckbox.src =
          "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjEzMDMxMTA3NEQxOTExRTk5NjM2RDE0OUI2NzgxODU4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjEzMDMxMTA4NEQxOTExRTk5NjM2RDE0OUI2NzgxODU4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTMwMzExMDU0RDE5MTFFOTk2MzZEMTQ5QjY3ODE4NTgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTMwMzExMDY0RDE5MTFFOTk2MzZEMTQ5QjY3ODE4NTgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7m2MR/AAAAx0lEQVR42ozSQQrCMBAF0D/TVEQKpTvd6VUEEcFb9Jq6dCO49AaCgogoglg147QutLVpHAgN4b8kQ0qXtD95Mo8IcgTAaCgbhJ32+bA0lnkcwM5EsPYg4XuWZHGcGgh2IKx0cQtPWQLzgzb5zqQjIvKAIkaRtsGl67jgG3zqp4cqrAK4GuciR7XAifKw6JFEfyLJwdcJdZCbgAvmSDR6c4ESFM0RidFZV8ADBVff43LACVvpKcJcG5/qd+j9I0wrbJ32i5cAAwDJOzsyIvtPoAAAAABJRU5ErkJggg==";
      }
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
        cursor: pointer;
      }
      .epd {
        margin-left: 130px;
        margin-top: 16px;
        color: #f26522;
        visibility: hidden;
      }
      .agreePolicy {
        margin-top: 10px;
        img {
          margin-left: 132px;
          margin-right: 10px;
          margin-top: 0px;
          cursor: pointer;
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
          margin-top: 8px;
          position: absolute;
          cursor: pointer;
        }
      }
    }
    .create {
      color: #f26522;
      border: 1px solid #f26522;
      margin-top: 30px;
      margin-left: 60px;
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