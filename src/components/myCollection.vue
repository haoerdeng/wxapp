<template>
  <div class="myDiv">
    <div class="myCollectionContent">
      <div class="topBox" @click="toMyCollection">
        <div data-page="0" class="orderItem Collection">
          <labal class="entranceText">我的收藏</labal>
        </div>
        <div data-page="1" class="orderItem footprint">
          <labal class="entranceText">我的足迹</labal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      toMyCollection(e) {
        var pageId = e.target.dataset.page;
        const url = '/pages/myCollection/main?pageid=' + pageId;
        mpvue.navigateTo({url})
      }
    }
  }
</script>

<style scoped>
  .myDiv {
    margin: 15px 0;
    background-color: white;
    line-height: 72px;
  }
  .myCollectionContent {
    height: 72px;
  }
  .topBox {
    display: flex;
    position: relative;
    flex-direction:row;
  }
  .orderItem {
    flex:1;
    text-align: center;
  }
  .Collection {
    background: url('../../static/icons/待付款.png') 50% 30%/auto 20px no-repeat
  }
  .footprint {
    background: url('../../static/icons/待收货.png') 50% 30%/auto 20px no-repeat
  }
  .entranceText {
    color: #666;
    font-size: 12px;
    position: relative;
    top: 15px;
  }
</style>
