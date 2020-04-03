<template>
    <div>
      <van-tabs :active="active" :change="onChange">
        <van-tab title="待付款">待付款</van-tab>
        <van-tab title="待收货">待收货</van-tab>
        <van-tab title="退换/售后">退换/售后</van-tab>
        <van-tab title="全部订单">全部订单</van-tab>
      </van-tabs>
    </div>
</template>

<script>
  export default {

  };
</script>

<style scoped>

</style>
