<template>
  <div class="commonSetting">
    <div style="clear:both"></div>
    <div class="commonSettingContent">
      <!-- <div class="commonSettingAll">
        <div class="commonSettingDetails">常用设置</div>
      </div>-->
      <div class="cellGroup">
        <van-cell-group v-for="(list,index) in listData" :key="index">
          <van-cell :title="list.title" :icon="list.icon" value=">" @click="jumpUrl(list)" />
        </van-cell-group>
        <!-- <van-cell-group>
          <van-cell title="手机号码" value="13072836337" @click="setPhone"/>
        </van-cell-group>-->
        <!-- <van-cell-group>
          <van-cell title="收货地址" value=">" @click="setAddress" :userInfo="userInfo"/>
        </van-cell-group>-->
        <!-- <van-cell-group>
          <van-cell title="我的优惠券" value=">" @click="setCoupon"/>
        </van-cell-group>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // userInfo: {
      //   nickName: "",
      //   avatarUrl: ""
      // }
    };
  },
  props: {
    listData: Array
  },
  methods: {
    jumpUrl(list) {
      mpvue.navigateTo({ url:list.url });
    }
    //设置个人信息
    // setPersonal: function() {
    //   const url = "/pages/settingPersonal/main";
    //   mpvue.redirectTo({ url });
    // },
    //设置手机号码
    // setPhone: function() {
    //   const url = "/pages/settingPhone/main";
    //   mpvue.navigateTo({ url });
    // },
    //设置收货地址
    // setAddress: function() {
    //   const url = "/pages/settingAddress/main";
    //   mpvue.redirectTo({ url });
    // },
    //设置优惠券
    // setCoupon: function() {
    //   const url = "/pages/coupon/main";
    //   mpvue.navigateTo({ url });
    // },
  }
};
</script>

<style scoped>
.commonSetting {
  /* margin: 15px 0; */
  margin-bottom: 15px;
  background-color: white;
  line-height: 72px;
  width: 100%;
}
.commonSettingContent {
  height: 72px;
}
.commonSettingAll {
  padding: 0rpx 25rpx;
  height: 40px !important;
}
.commonSettingDetails {
  font-size: 14px;
  border-bottom: 1px solid #eee;
  line-height: 40px;
  padding-bottom: 3px;
  color: #333;
}
</style>
