<template>
  <div class="transfer">
    <apex-title :title="title"/>
    <apex-back-ground/>
    <div class="flex-container">
      <div class="from">
        <div>From:</div>
        <div>Wallet</div>
        <input type="text" placeholder="ABsdfsadfdsfjksdlafhasdhffdasfsdf">
      </div>

      <div class="to">
        <div>To:</div>
        <input type="text" placeholder="Please Input Address">
        <div>Please enter the correct wallet address</div>
      </div>

      <div class="amount">
        <div>Amount(Available:1.00000004)</div>
        <input type="text" placeholder="Transfer Amount">
        <div>All</div>
        <div>CPX</div>
        <div>Please enter the correct transfer amount</div>
      </div>
      <div class="password">
        <div>Password</div>
        <input type="text">
        <div>Password Incorrect</div>
      </div>
      <div class="send">SEND</div>
    </div>
  </div>
</template>

<script>
import ApexTitle from "@/components/public/ApexTitle";
import ApexBackGround from "@/components/public/ApexBackGround";

export default {
  name: "Transfer",
  props: [""],
  data() {
    return {
      title: "Transfer"
    };
  },

  components: {
    ApexBackGround,
    ApexTitle
  },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {}
};
</script>
<style lang='less' scoped>
@import "./../../../assets/css/layout";
.transfer {
  width: 100%;
  height: 100%;
  background: url(./../../../assets/images/shared/yunshi.png) 25% 35% no-repeat;
  .flex-container {
    display: flex;
    height: auto;
    width: 33.333%;
    margin-left: 33.333%;
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
      }
    }
    .to {
      margin: 8% 0 0 0%;
      input {
        background: rgba(255, 255, 255, 0.001);
        border: 1px solid #f26522;
        width: 300px;
      }
      div:nth-child(1) {
        color: rgba(255, 255, 255, 0.5);
        margin: 0px 0px 5px 0px;
      }
      div:nth-child(3) {
        margin-top: 8px;
        color: #f26522;
      }
    }
    .amount {
      margin: 5% 0 0 -13%;
      input {
        background: rgba(255, 255, 255, 0.001);
        border: 1px solid #f26522;
        width: 200px;
      }
      div:nth-child(3) {
        margin-left: 5%;
        display: inline;
        color: #f26522;
      }
      div:nth-child(4) {
        display: inline;
        position: absolute;
        margin-left: 4%;
        margin-top: 0.5%;
      }
      div:nth-child(5) {
        color: #f26522;
      }
    }
    .password {
      margin: 5% 0 0 0%;
      input {
        background: rgba(255, 255, 255, 0.001);
        border: 1px solid #f26522;
        width: 300px;
      }
      div:nth-child(3) {
        color: #f26522;
      }
    }
    .send {
      margin: 5% 0 0 18%;
      color: #ffffff;
      background: #f26522;
      width: 180px;
      height: 30px;
      margin-right: 18%;
      margin-top: 40px;
      text-align: center;
      line-height: 30px;
    }
  }
}
</style>