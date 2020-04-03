<template>
  <div>
    <van-tabs :active="active" :change="onChange" class="headerTab" >
      <van-tab title="商品"></van-tab>

      <!-- <van-tab title="评价"></van-tab> -->
      <van-tab title="详情"></van-tab>
      <van-tab title="推荐"></van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  data: {
    active: 1
  },
  onClickDisabled(event) {
    wx.showToast({
      title: `商品 ${event.detail.index } `
    });
  }
};
</script>
<style scoped>
/* .headerTab{
  z-index:5;
  position: fixed;
  top: 100px
} */
</style>
