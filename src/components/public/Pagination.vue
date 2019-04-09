<template>
  <div class="apex-pagination">
    <div class="pagination-content">
      <span class="first">First</span>
      <span class="prev" @click="getPreviousBlocks"></span>
      <span class="list-number">1-10</span>
      <span class="next" @click="getNextBlocks"></span>
      <span class="last">Last</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "pagination",
  data() {
    return {
      start: 0
    };
  },
  methods: {
    getNextBlocks() {
      console.log("next");
      sessionStorage.setItem("nextBlocks", this.start++);
    },
    getPreviousBlocks() {
      console.log("previous");
      sessionStorage.setItem("nextBlocks", this.start--);
    }
  }
};
</script>
<style lang="less" scoped>
@import "./../../assets/css/layout";
.apex-pagination {
  width: 100%;
  height: 50px;
  padding: 10px 35px;
  box-sizing: border-box;
  text-align: right;
  font-size: 12px;
  span {
    display: inline-block;
    padding: 9px 0;
    margin: 0 4px;
    cursor: pointer;
    font-family: "Semibold";
    vertical-align: middle;
    &.list-number {
      cursor: initial;
    }
    &.prev,
    &.next {
      padding: 9px;
      background: url("../../assets/images/shared/page.png") no-repeat center
        2px;
      color: #f26522;

      &:hover {
        background-position: center -34px;
        color: #f26522;
      }
    }
    &.next {
      transform: rotate(-180deg);
    }
    &.first,
    &.last {
      transition: all 0.3s;
      &:hover {
        color: #f26522;
      }
    }
  }
}
</style>


