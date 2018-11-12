<template>
    <div class="uchain-pagination">
        <div class="pagination-content">
            <span class="first">First</span>
            <span class="prev"></span>
            <span class="list-number">1-10</span>
            <span class="next"></span>
            <span class="last">Last</span>
        </div>
    </div>
</template>
<script>
export default {
  name: "pagination",
  data() {
    return{
      
    }
  }
};
</script>
<style lang="less" scoped>
.uchain-pagination {
  width: 100%;
  height: 50px;
  padding: 10px 20px;
  box-sizing: border-box;
  text-align: right;
  font-size: 12px;
  color: #333333;
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
      &:hover {
        background-position: center -34px;
      }
    }
    &.next {
      transform: rotate(-180deg);
    }
    &.first,
    &.last {
      transition: all 0.3s;
      &:hover {
        color: #00c1ff;
      }
    }
  }
}
</style>


