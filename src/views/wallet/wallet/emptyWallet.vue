<template>
  <div class="emptyWallet">
    <div class="data-table">
      <ul>
        <li>
            There are no wallets locally,please create or import wallets.
        </li>

        <li class="second-li">
            Warning:APEX neither holds any of your account infromation nor can it help you get your account back.
        </li>
       <li class="flex-item3">
        <router-link to="/wallet/NewWallet">NEW WALLET</router-link>
      </li>
      <li class="flex-item3">
        <router-link to="/wallet/OpenWallet">OPEN WALLET</router-link>
      </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "emptyWallet",
  props: [""],
  data() {
    return {};
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
@import "./../../../assets/css/layout";
.emptyWallet {
    background: url(./../../../assets/images/shared/yunshi.png) 34% 58%
}
.data-table {
  height: calc(100vh - 210px);
  background-color: hsla(0, 0%, 100%, 0.1);
  ul {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    li {
      list-style: none;
      margin: 0 auto 50px auto;
      font-size: 20px;
      font-family: Semibold, Microsoft YaHei, Open Sans, Arial, Helvetica,
        Sans-serif, Verdana, Tahoma;
      color: #fff;
    }
    .second-li {
       margin: 0 auto 20px auto;
    }
    .flex-item3 {
    width: 120px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    border: 1px solid #f26522;
    font-size: 15px;
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