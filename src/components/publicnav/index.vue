<template>
  <div class="nav">
    <div class="main clearboth">
      <div class="logo fl">
        <a href="/home">
          <img src="../../assets/images/shared/logo.png" alt=""></a>
      </div>
      <ul class="fl">
        <li v-for="(item, index) in nav" :key="index" :class=" ((item.path === defaultNav) || ( defaultNav === '/' &&  index == '0')) ? 'active' : ''">
          <router-link :to="item.path">{{item.title}}</router-link>
        </li>
      </ul>
      <div class="search-box fr clearboth">
        <input class="fl" type="text" placeholder=" e.g.  Account  /  Transaction  /  Block number">
        <div class="fl"></div>
      </div>
      <div class="language">
        <span @click="changeLangEvent">{{$i18n.locale}}</span>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: "PublicNav",
  props: ["active"],
  data() {
    return {
      navIndex: 0
    };
  },
  computed: {
    nav() {
      return [
        { title: this.$t("nav.home"), path: "/home" },
        { title: this.$t("nav.wallet"), path: "/wallet" }
        // { title: this.$t("nav.producer"), path: "/producer" }
      ];
    },
    defaultNav() {
      return "/" + this.$route.path.split("/")[1];
    }
  },
  methods: {
    // checkRouterLocal(path) {
    //   this.navIndex = this.nav.findIndex(item => item.path === path);
    // },
    changeLangEvent() {
      if (this.$i18n.locale === "ZH") {
        localStorage.setItem("locale", "EN");
        this.$i18n.locale = localStorage.getItem("locale");
      } else {
        localStorage.setItem("locale", "ZH");
        this.$i18n.locale = localStorage.getItem("locale");
      }
    }
  }
};
</script>
<style lang="less" scoped>
.nav {
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: #00c1ff;
  border-bottom: 1px dashed #3699ff;
  .main {
    position: relative;
  }
  .logo {
    img {
      margin-top: 16px;
    }
  }
  ul {
    margin-left: 60px;
    padding-top: 16px;
    li {
      float: left;
      padding: 0 22px;
      a {
        line-height: 26px;
        color: #fff;
        opacity: 0.6;
        -moz-transition: all 0.3s;
        -o-transition: all 0.3s;
        -webkit-transition: all 0.3s;
      }
      &:hover,
      &.active {
        a{
          opacity: 1;
        }
      }
    }
  }
  .search-box {
    padding-top: 14px;
    height: 48px;
    position: relative;
    input {
      width: 400px;
      height: 100%;
      border: 0px;
      padding: 4px 56px 4px 6px;
    }
    div.fl {
      position: absolute;
      right: 0;
      cursor: pointer;
      width: 50px;
      height: 34px;
      background:  url(../../assets/images/shared/search.png) center 6px no-repeat;
    }
  }
  .language {
    position: absolute;
    top: 16px;
    left: calc(~"100% + 36px");
    line-height: 32px;
    color: #fff;
    width: 45px;
    span {
      display: block;
      width: 100%;
      padding-left: 20px;
      box-sizing: border-box;
      background: url(../../assets/images/shared/lang.png) left center no-repeat;
      cursor: pointer;
    }
  }
}
</style>


