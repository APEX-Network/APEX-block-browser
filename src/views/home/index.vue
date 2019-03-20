<template>
  <div class="home clearboth">
    <div class="top-modul clearboth">
      <keep-alive>
        <over-view/>
      </keep-alive>
      <keep-alive>
        <live-tps/>
      </keep-alive>
    </div>
    <div class="bottom-modul clearboth">
      <keep-alive>
        <blocks-list/>
      </keep-alive>
      <keep-alive>
        <transactions-list/>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import LiveTps from "@/views/home/LiveTps";
import OverView from "@/views/home/OverView";
import BlocksList from "@/components/list/BlocksList";
import TransactionsList from "@/components/list/TransactionsList";

export default {
  name: "home",
  components: {
    LiveTps,
    OverView,
    BlocksList,
    TransactionsList
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
