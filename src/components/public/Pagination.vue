<template>
  <div class="apex-pagination">
    <div class="pagination-content">
      <a class="first">First</a>
      <img ref="left" class="prev"  src="../../assets/images/shared/leftWhiteArrow.png" alt>
      <span class="list-number">{{pageNumber}}</span>
      <img ref="right" class="next" src="../../assets/images/shared/rightWhiteArrow.png" alt>
      <a class="last">Last</a>
    </div>
  </div>
</template>
<script>
export default {
  name: "pagination",
  data() {
    return {
      start: 0,
      pageNumber: "1-10"
    };
  },
  methods: {
    // getNextBlocks() {
    //   console.log("next");
    //   sessionStorage.setItem("nextBlocks", this.start++);
    // },
    // getPreviousBlocks() {
    //   console.log("previous");
    //   sessionStorage.setItem("nextBlocks", this.start--);
    // }
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
  .pagination-content {
    .prev {
      cursor: pointer;
      padding-left: 5px;
    }
    .next {
      cursor: pointer;
      padding-right: 5px;
    }
    a {
      display: inline-block;
      padding: 9px 0;
      margin: 0 4px;
      cursor: pointer;
      font-family: "Semibold";
      vertical-align: middle;
      &.list-number {
        cursor: initial;
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
}
</style>


