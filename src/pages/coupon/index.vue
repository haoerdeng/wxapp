<template>
  <div class="settingDiv">
    <van-tabs :active="active" swipeable>
      <van-tab title="未使用">
        <div class="couponList">
            <img src="/static/images/bigCoupon.png" alt="">
        </div>
        <div class="couponList">
            <img src="/static/images/bigCoupon.png" alt="">
        </div>
        <div class="couponList">
            <img src="/static/images/bigCoupon.png" alt="">
        </div>
        <div class="couponList">
            <img src="/static/images/bigCoupon.png" alt="">
        </div>
      </van-tab>
      <van-tab title="已使用">
        <div class="couponList">
            <img src="/static/images/bigCoupon.png" alt="">
        </div>
      </van-tab>
      <van-tab title="已过期">
        <div class="couponList">
            <img src="/static/images/bigCoupon.png" alt="">
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>


<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.index + 1}`,
      icon: 'none'
    });
  },
  methods: {
    // addAddress: function() {
    //   const url = "/pages/settingPersonal/main";
    //   mpvue.navigateTo({ url });
    // }
  }
};
</script>

<style scoped>
.settingDiv {
  background-color: #f8f8f8;
  min-height: 100vh;
  padding: 9px 15px;
}
.couponList img{
  width: 360px;
  height:85px;
  margin-top:10px;
}
</style>
