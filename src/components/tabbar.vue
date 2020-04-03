<template>
  <div>
    <van-tabbar bind:change="onChange" class="tabbar">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item icon="comment-circle-o">购物圈</van-tabbar-item>
      <van-tabbar-item icon="cart-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data: {
    active: 0
  },
  // event.detail 的值为当前选中项的索引
  onChange(event) {
    console.log(event.detail);
  }
};
</script>
