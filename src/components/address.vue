<template>
  <div>
    <van-row>
      <van-col span="4">送至</van-col>
      <van-col span="16">
        <van-row>
          <van-col span="24">成都市温江区学府芳邻怀古苑7号</van-col>
          <van-col span="24"> <p>【现货】</p>下单后<span>{{num}}</span>天发货</van-col>
        </van-row>
      </van-col>
      <van-col span="4">...</van-col>
    </van-row>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        num:3
      }
    }
};
</script>
<style scoped>
</style>
