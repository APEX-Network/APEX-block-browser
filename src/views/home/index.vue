<template>
  <div class="home clearboth">
    <div class="top-modul clearboth">
        <over-view/>
        <live-tps/>
    </div>
    <div class="bottom-modul clearboth">
        <blocks-list/>
        <home-transactions-list/>
    </div>
  </div>
</template>
<script>
import LiveTps from "@/views/home/LiveTps";
import OverView from "@/views/home/OverView";
import BlocksList from "@/components/list/BlocksList";
import HomeTransactionsList from "./HomeTransactionsList";

export default {
  name: "home",
  components: {
    LiveTps,
    OverView,
    BlocksList,
    HomeTransactionsList
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  computed: {}
};
</script>
<style scoped lang="less">
@import "./../../assets/css/layout";
.home {
  width: 100%;
  height: 100%;
  background: url(./../../assets/images/shared/yunshi.png) 15% 20% no-repeat;
  .bottom-modul,
  .top-modul {
    height: 49%;
    margin-bottom: 2%;
  }
}
</style>
