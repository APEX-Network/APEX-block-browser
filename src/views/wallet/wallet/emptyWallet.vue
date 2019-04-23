<template>
  <div class="emptyWallet apex-modul">
    <p class="apex-title">Wallet</p>
    <div class="data-table">
      <ul>
        <li class="tip-li">
          There are no wallets locally,please create or import wallets.
        </li>

        <li class="second-li">
          Warning:APEX neither holds any of your account infromation nor can it help you get your account back.
        </li>
        <li class="flex-btn">
          <router-link to="/emptyWallet/NewWallet">NEW WALLET</router-link>
          <router-link to="/emptyWallet/OpenWallet">OPEN WALLET</router-link>
        </li>
       <!-- <li class="flex-item3">
        <router-link to="/emptyWallet/NewWallet">NEW WALLET</router-link>
      </li>
      <li class="flex-item3">
        <router-link to="/emptyWallet/OpenWallet">OPEN WALLET</router-link>
      </li> -->
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "emptyWallet",
  props: [""],
  data() {
    return {
    
    };
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    // backHome() {
    //   this.$router.push("/home")
    // }
  },

  watch: {}
};
</script>
<style lang='less' scoped>

.apex-modul{
  width:100%;
  height:100%;
  background: url(./../../../assets/images/shared/yunshi.png) 34% 58% no-repeat;
}
.data-table {
  height: e("calc(100% - 40px)");
  border-radius:4px;
  position: relative;
  padding: 0;
  ul {
    position: absolute;
    top: 30%;
    left: 0;
    width: 100%;

    li {
      list-style: none;
      font-size: 20px;
      font-family: Semibold, Microsoft YaHei, Open Sans, Arial, Helvetica,
        Sans-serif, Verdana, Tahoma;
      color: #e1e1e1;
      width: 100%;
      text-align: center;
      box-sizing: border-box;
    }
    .tip-li {
      font-size: 24px;
      padding-bottom: 50px;
    }
    .second-li {
      font-family: "Regular";
      color: #f26522;
      font-size: 14px;
    }
    .flex-btn {
      padding-top: 50px;
      a {
        display: inline-block;
        width: 120px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        border: 1px solid #f26522;
        font-size: 15px;
        color: #f26522;
        margin: 0 50px;
      }
      a:hover {
        box-shadow: 2px 2px 8px 2px #f26522;
      }
    }
  }
}
</style>