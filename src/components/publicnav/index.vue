<template>
  <div class="nav">
    <div class="main clearboth">
      <div class="logo fl">
        <a href="/home">
          <img src="../../assets/images/logo.png" alt>
        </a>
      </div>
      <div class="search-box fl clearboth">
        <input
          class="fl"
          ref="search"
          @change="getSearchValue"
          type="text"
          placeholder="Search Accounts/Transactions/Blocks"
          maxlength="100"
        >
        <div class="fl search-btn" @click="startSearch"></div>
      </div>
      <div class="language" :class="isShow ? 'active' : ''" @click="changeLang">
        <i></i>
        <span class="language-span" v-show="isShow" @click.stop="changeLangEvent">{{language}}</span>
      </div>
    </div>
    <div class="nav-bar">
      <ul class="fl">
        <li
          v-for="(item, index) in nav"
          :key="index"
          :class=" ((item.path === defaultNav) || ( defaultNav === '/' &&  index == '0')) ? 'active' : ''"
        >
          <router-link :to="item.path"></router-link>
        </li>
      </ul>
    </div>
    <!-- <div class="nav about" @click="showAbout()"><img src="../../assets/images/about.png"/></div> -->
    <!-- <div class="aboutus"><img src="../../assets/images/aboutus.png"/></div> -->
  </div>
</template>
<script>
import Bus from "./../../utils/bus";
const Base58check = require("base58check");

export default {
  name: "PublicNav",
  props: ["active"],
  data() {
    return {
      navIndex: 0,
      isShow: false,
      language: "中文",
      search: null,
      url: {
        blockHash_url: "/api/v1.0/blocks/blockHash/",
        blockHeight_url: "/api/v1.0/blocks/blockHeight/",
        transactions_url: "/api/v1.0/transactions/",
        accountInfo_url: "/api/v1.0/accounts/account"
      },
      searchHeight: {
        type: null,
        value: null
      },
      searchBlock: {
        type: null,
        value: null
      }
    };
  },
  computed: {
    nav() {
      return [
        { title: this.$t("nav.home"), path: "/home" },
        { title: this.$t("nav.wallet"), path: "/wallet" },
        { title: "", path: "/blocks" },
        { title: "", path: "/transactions" },
        { title: "", path: "/producer" }
      ];
    },
    defaultNav() {
      return "/" + this.$route.path.split("/")[1];
    }
  },
  mounted() {
    let _this = this;
    document.addEventListener("click", function(e) {
      // let flag = e.target.contains(document.getElementsByClassName("language-span")[0]);
      let flag = e.target.className == "language";
      if (flag) return;
      _this.isShow = false;
    });
  },
  methods: {
    getSearchValue() {
      this.search = this.$refs.search.value;
      console.log(this.search);
    },

    startSearch() {
      console.log(this.search.slice(0, 2));
      if (
        !!this.search &&
        this.search.length == 35 &&
        this.search.slice(0, 2) == "AP"
      ) {
        let account = Base58check.decode(this.search).data.toString("hex");
        console.log("跳转到账户详情页");
        this.$axios
          .post(this.url.accountInfo_url, {
            address: this.search
          })
          .then(response => {
            if (response.data.data == null) {
              return;
            }
            if (response.data.status == 200) {
              let res = response.data.data;
              if (res.length !== 0) {
                this.$router.push("/transactions/TransactionsInfo/AccountInfo");
                Bus.$emit("accountValue", this.search);
              }
            }
          })
          .catch(function(err) {
            if (err.response) {
              console.log(err.response);
            }
          });
      }
      if (!!this.search && Number.isInteger(Number(this.search)) == true) {
        this.$axios
          .get(this.url.blockHeight_url + this.search)
          .then(response => {
            if (response.data.status == 404) {
              // console.log("跳转到错误页面!");
              return;
            }
            if (response.data.status == 200) {
              let res = response.data.data;
              if (res.length !== 0) {
                this.searchHeight = {
                  type: "height",
                  value: this.search
                };
                this.$router.push("/blocks/BlocksInfo");
                Bus.$emit("clickValue", JSON.stringify(this.searchHeight));
              }
            }
          })
          .catch(function(response) {
            console.log(response);
          });
        return;
      }

      if (!!this.search && this.search.length == 64) {
        this.$axios
          .get(this.url.blockHash_url + this.search)
          .then(response => {
            if (response.data.status == 404) {
              // console.log("跳转到错误页面!");
              return;
            }
            if (response.data.status == 200) {
              let res = response.data.data;
              if (res.length !== 0) {
                this.searchBlock = {
                  type: "hash",
                  value: this.search
                };
                Bus.$emit("clickValue", JSON.stringify(this.searchBlock));
                this.$router.push("/blocks/BlocksInfo");
                return;
              }
            }
          })
          .catch(function(response) {
            console.log(response);
          });
        this.$axios
          .get(this.url.transactions_url + this.search)
          .then(response => {
            if (response.data.status == 404) {
              // console.log("跳转到错误页面!");
              return;
            }
            if (response.data.status == 200) {
              let res = response.data.data;
              if (res.length !== 0) {
                this.$router.push("/transactions/TransactionsInfo");
                Bus.$emit("txHash", this.search);
                return;
              }
            }
          })
          .catch(function(response) {});
      }
    },
    changeLang() {
      this.isShow = !this.isShow;
    },
    changeLangEvent() {
      console.log(this.$i18n.locale);
      if (this.$i18n.locale === "ZH") {
        this.language = "English";
        localStorage.setItem("locale", "EN");
        this.$i18n.locale = localStorage.getItem("locale");
      } else {
        this.language = "中文";
        localStorage.setItem("locale", "ZH");
        this.$i18n.locale = localStorage.getItem("locale");
      }
    },
    showAbout() {
      console.log("clicked");
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
  height: 90px;
  .about {
    z-index: 10000;
    width: 30px;
    height: 30px;
    left: 110px;
    top: 520px;
  }
  .main {
    position: relative;
  }
  .logo {
    img {
      margin-top: 34px;
    }
  }

  .search-box {
    padding-top: 26px;
    height: 56px;
    position: relative;
    margin-left: 20px;
    input {
      width: 710px;
      height: 100%;
      border: 0px;
      border-radius: 4px;
      font-size: 14px;
      padding: 4px 56px 4px 15px;
      background: rgba(255, 255, 255, 0.2);
      color: #fff;
      border: 1px solid #f26522;
    }
    input:hover {
      box-shadow: 2px 2px 8px 2px #f26522;
    }
    .search-btn {
      position: absolute;
      right: 0;
      cursor: pointer;
      width: 50px;
      height: 30px;
      background: url(../../assets/images/shared/search.png) center 6px
        no-repeat;
    }
    // .search-btn:hover {
    //   box-shadow: 2px 2px 7px 2px #f26522;
    // }
  }
  .language {
    position: absolute;
    top: 25px;
    right: -55px;
    line-height: 32px;
    height: 32px;
    color: #fff;
    width: 100px;
    cursor: pointer;
    background: url(../../assets/images/shared/lang.png) left center no-repeat;
    i {
      position: absolute;
      right: 0;
      top: 0;
      display: block;
      width: 20px;
      height: 100%;
      background: url(../../assets/images/shared/icon-fix.png) no-repeat;
      background-position: center -75px;
      // transition: all .3s;
    }
    span {
      position: absolute;
      top: 32px;
      display: block;
      width: 100%;
      box-sizing: border-box;
      height: 32px;
      text-align: center;
      cursor: pointer;
    }
    &.active {
      i {
        transform: rotate(-180deg);
      }
    }
  }
  .nav-bar {
    z-index: 9999;
    position: fixed;
    bottom: 200px;
    left: 106px;
    width: 30px;
    height: 350px;
    ul {
      li {
        width: 30px;
        height: 30px;
        margin-bottom: 25px;
        background: url(../../assets/images/nav-fix.png) no-repeat;
        background-position: center 3px;
        a {
          display: block;
          width: 100%;
          height: 100%;
        }
        &:hover,
        &.active {
          background-position: center -34px;
        }
        &:nth-child(2) {
          background-position: center -68px;
          &:hover,
          &.active {
            background-position: center -99px;
          }
        }
        &:nth-child(3) {
          background-position: center -134px;
          &:hover,
          &.active {
            background-position: center -171px;
          }
        }
        &:nth-child(4) {
          background-position: center -209px;
          &:hover,
          &.active {
            background-position: center -246px;
          }
        }
        &:nth-child(5) {
          background-position: center -283px;
          &:hover,
          &.active {
            background-position: center -320px;
          }
        }
      }
    }
  }
}
// .aboutus {
//   z-index: 10000;
//   display: flex;
//   position: relative;
//   padding: 680px 0px 0px 63px;
// }
@media screen and(max-width:1366px) {
  .nav {
    .nav-bar {
      left: 55px;
    }
  }
}
</style>


