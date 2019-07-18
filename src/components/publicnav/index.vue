<template>
  <div class="nav">
    <div class="main clearboth">
      <!-- <div class="logo fl" @click="hiddenAboutUs">
        <router-link to="/home">
          <img src="../../assets/images/logo.png" alt>
        </router-link>
      </div>-->
      <div class="search-box fl clearboth" style="border-bottom: 4px solid #004a80;">
        <input
          @click="hiddenAboutUs"
          spellcheck="false"
          class="fl"
          ref="search"
          @change="getSearchValue"
          @keyup.enter="enterSearch($event)"
          type="text"
          placeholder="Search Accounts/Transactions/Blocks"
          maxlength="100"
        >
        <div class="fl search-btn" @click="startSearch"></div>
      </div>
    </div>
    <div class="nav-bar">
      <ul class="fl" style="border-right: 4px solid #004a80;">
        <li style="height:50px; border-right: 4px solid #000;">
          <router-link to="/home">
            <img
              style="padding-left: 15px;
    padding-top: 12px;"
              src="../../assets/images/apex.png"
              alt
            >
          </router-link>
        </li>
        <li
          v-for="(item, index) in nav"
          :key="index"
          :class=" ((item.path === defaultNav) || ( defaultNav === '/' &&  index == 0)) ? 'active' : ''"
        >
          <router-link :to="item.path" ref="bars">
            <img
              style="padding-left: 18px;
    width: 40px;
    padding-top: 23px;"
              :src="item.url"
              alt="home"
            >
          </router-link>
        </li>
        <li class="fl about">
          <img src="./../../assets/images/about.png" alt @click="showAboutUs">
        </li>
      </ul>
    </div>
    <div ref="wrapAboutUs" class="wrapAboutUs" @click="hiddenAboutUs">
      <div ref="aboutUs" class="aboutus">
        <p class="common-title">Join the Conversation</p>
        <ul class="clearboth">
          <li>
            <a href="https://t.me/APEXcommunity" target="_blank">
              <div class="img-box">
                <img src="../../assets/bottom/logo-1.png" alt>
              </div>
              <p>
                Telegram
                (Global)
              </p>
            </a>
          </li>
          <li class="wechat">
            <a href="javascript:;">
              <div class="img-box">
                <img src="../../assets/bottom/logo-2.png" alt>
              </div>
              <p>Wechat</p>
            </a>
            <div class="wechatCode">
              <img src="../../assets/bottom/wechatCode.jpg" alt>
            </div>
          </li>
          <li>
            <a href="https://open.kakao.com/o/gOXjb3H" target="_blank">
              <div class="img-box">
                <img src="../../assets/bottom/logo-3.png" alt>
              </div>
              <p>
                Kakao
                (Korea)
              </p>
            </a>
          </li>
          <li>
            <a href="https://twitter.com/APEXnetworkCPX" target="_blank">
              <div class="img-box">
                <img src="../../assets/bottom/logo-4.png" alt>
              </div>
              <p>Twitter</p>
            </a>
          </li>
          <li>
            <a href="https://www.reddit.com/r/APEXtoken/" target="_blank">
              <div class="img-box">
                <img src="../../assets/bottom/logo-5.png" alt>
              </div>
              <p>Reddit</p>
            </a>
          </li>
          <li>
            <a href="https://github.com/APEX-Network" target="_blank">
              <div class="img-box">
                <img src="../../assets/bottom/logo-6.png" alt>
              </div>
              <p>Github</p>
            </a>
          </li>
          <li>
            <a href="https://medium.com/apex-network" target="_blank">
              <div class="img-box">
                <img src="../../assets/bottom/logo-7.png" alt>
              </div>
              <p style="padding-top:16px;">Medium</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Bus from "@/utils/bus";
import db from "@/utils/myDatabase";

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
      about: null,
      wrapDiv: null,
      clickValue: 0,
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
      },
      getAllAddress: null,
      APAddress: [],
      walletUrl: null,
      selectedBar: null
    };
  },
  created() {},
  computed: {
    nav() {
      return [
        {
          title: this.$t("nav.home"),
          path: "/home",
          url: require("../../assets/images/home.png")
        },
        {
          title: this.$t("nav.wallet"),
          path: "/wallet",
          url: require("./../../assets/images/wallet.png")
        },
        {
          title: "",
          path: "/blocks",
          url: require("./../../assets/images/blocks.png")
        },
        {
          title: "",
          path: "/transactions",
          url: require("./../../assets/images/retweet.png")
        },
        {
          title: "",
          path: "/producer",
          url: require("./../../assets/images/producer.png")
        }
      ];
    },
    defaultNav() {
      return "/" + this.$route.path.split("/")[1];
    }
  },
  mounted() {
    this.selectedBar = this.$refs.bar;
    this.about = this.$refs.aboutUs;
    this.wrapDiv = this.$refs.wrapAboutUs;
    this.search = this.$refs.search;
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
      this.about.style.height = "0px";
      this.wrapDiv.style.height = "0vh";
      this.search = this.$refs.search.value;
    },
    startSearch() {
      if (this.search !== null) {
        if (
          (this.search.length == 35 && this.search.slice(0, 2) == "AP") ||
          Number.isInteger(Number(this.search)) == true ||
          this.search.length == 64
        ) {
          if (
            !!this.search &&
            this.search.length == 35 &&
            this.search.slice(0, 2) == "AP"
          ) {
            try {
              let account = Base58check.decode(this.search).data.toString(
                "hex"
              );
              this.$router.push({
                path: "/transactions/TransactionsInfo/AccountInfo",
                query: {
                  id: this.search
                }
              });
              this.$refs.search.value = null;
            } catch (error) {
              this.$router.push("/error");
              this.$refs.search.value = null;
              return;
            }
          }
          if (!!this.search && Number.isInteger(Number(this.search)) == true) {
            this.$axios
              .get(this.url.blockHeight_url + this.search)
              .then(response => {
                if (response.data.data == "NotFound") {
                  this.$router.push("/error");
                  this.$refs.search.value = null;
                  return;
                }
                if (response.data.status == 200) {
                  let res = response.data.data;
                  if (res.length !== 0) {
                    this.$router.push({
                      path: "/blocks/BlocksInfo",
                      query: {
                        id: Number(this.search)
                      }
                    });
                    this.$refs.search.value = null;
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
                if (response.data.data == "NotFound") {
                  // this.$router.push("/error");
                  this.$refs.search.value = null;
                  return;
                }
                if (response.data.status == 200) {
                  let res = response.data.data;
                  if (res.length !== 0) {
                    this.$router.push({
                      path: "/blocks/BlocksInfo",
                      query: {
                        id: this.search
                      }
                    });
                    this.$refs.search.value = null;
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
                if (response.data.data == "NotFound") {
                  // this.$router.push("/error");
                  this.$refs.search.value = null;
                  return;
                }
                if (response.data.status == 200) {
                  let res = response.data.data;
                  if (res.length !== 0) {
                    this.$router.push({
                      path: "/transactions/TransactionsInfo",
                      query: {
                        id: this.search
                      }
                    });
                    this.$refs.search.value = null;
                    return;
                  }
                }
              })
              .catch(function(response) {});
          }
        } else {
          this.$router.push("/error");
          this.$refs.search.value = null;

          return;
        }
      }
    },
    enterSearch(ev) {
      if (ev.keyCode == 13) {
        this.about.style.height = "0px";
        this.wrapDiv.style.height = "0vh";
        this.startSearch();
      }
    },
    changeLang() {
      this.isShow = !this.isShow;
    },
    changeLangEvent() {
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
    showAboutUs() {
      this.about.style.height = "240px";
      this.wrapDiv.style.height = "100vh";
    },
    hiddenAboutUs() {
      this.about.style.height = "0px";
      this.wrapDiv.style.height = "0vh";
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
  .wrapAboutUs {
    z-index: 12000;
    width: 100vw;
    height: 0vh;
    transition: height 0.6s;
    .aboutus {
      height: 0px;
      width: 100vw;
      z-index: 10000;
      position: fixed;
      bottom: 0;
      transition: height 0.6s;
      background-image: url("../../assets/bottom/bottombg.jpg");
      .common-title {
        margin: 0 auto;
        font-size: 24px;
        color: #666666;
        padding: 50px 0 50px 90px;
        line-height: 30px;
        text-align: center;
        font-family: "Semibold";
        color: #fff;
      }
      .clearboth {
        display: inline-block;
        list-style: none;
        margin: 0;
        padding-left: 45px;
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
      ul {
        li.wechat a:hover + .wechatCode {
          opacity: 1;
        }
        display: inline-block;
        li:hover a img {
          opacity: 0.7;
        }
        li {
          position: relative;
          width: 46px;
          margin: 0 15px;
          text-align: center;
          float: left;
          a p {
            font-size: 14px;
            color: #fff;
            line-height: 18px;
            padding-top: 10px;
            text-align: center;
          }
          a img {
            -webkit-transition: all 0.3s;
            -moz-transition: all 0.3s;
            -ms-transition: all 0.3s;
            transition: all 0.3s;
          }
          .wechatCode {
            position: absolute;
            bottom: 97px;
            left: -37px;
            width: 120px;
            height: 120px;
            -webkit-transition: all 0.5s;
            -moz-transition: all 0.5s;
            -ms-transition: all 0.5s;
            transition: all 0.5s;
            opacity: 0;
          }
        }
      }
    }
  }

  .main {
    display: flex;
    width: 100%;
    padding: 0px 0px 0px 39px;
  }
  .logo {
    img {
      margin-top: 34px;
    }
  }

  .search-box {
    height: 54px;
    position: relative;
    width: 100%;
    z-index: 10000;
    margin-left: 17px;
    border-bottom: 4px solid rgb(0, 74, 128);
    input {
      width: 100%;
      height: 50px;
      border: 0px;
      font-size: 14px;
      padding: 4px 56px 4px 24px;
      background: #333333;
      color: #fff;
    }
    .search-btn {
      right: 0;
      background: center 6px no-repeat;
      position: absolute;
      right: 20px;
      cursor: pointer;
      width: 50px;
      height: 100%;
      background: url(../../assets/images/shared/search.png) center 16px
        no-repeat;
    }
  }
  .language {
    position: absolute;
    top: 25px;
    margin-left: 96%;
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
      a {
        color: #f26522;
      }
    }
  }
  .nav-bar {
    z-index: 9999;
    position: fixed;
    width: 60px;
    height: 100%;
    background: #000000;
    .about {
      bottom: 0px;
      cursor: pointer;
      position: absolute;
      img {
        padding-left: 11px;
        width: 40px;
      }
    }
    ul {
      li {
        width: 56px;
        height: 70px;
        span {
          padding-left: 5px;
          padding-top: 29px;
          font-size: 14px;
          color: #999999;
          position: fixed;
        }
        a {
          display: block;
          width: 100%;
          height: 100%;
          color: #999999;
          font-size: 16px;
        }
        &.active {
          a {
            background: #004a80;
          }
        }
      }
    }
  }
}
</style>


