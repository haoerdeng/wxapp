<template>
  <div class="settingDiv">
    <div class="settingCont">
      <van-cell title="当前登陆账号" />
      <van-cell >
        <div class="currentAvatar">
          <img :src="userInfo.avatarUrl" alt="头像">
        </div>
        <div class="fixInfo">
          <div class="currentId">123</div>
          <div class="currentEmile">邮箱：未设置</div>
        </div>
      </van-cell>
      <van-cell title="修改个人信息" title-class="settingTitle" is-link url="/pages/settingPersonal/main" link-type="navigateTo" />
      <van-cell title="绑定手机号码" title-class="settingTitle" is-link url="/pages/settingPhone/main" link-type="navigateTo" />
      <van-cell title="绑定邮箱" title-class="settingTitle" is-link url="/pages/settingPersonal/main" link-type="navigateTo" />
      <van-cell title="收货地址管理" title-class="settingTitle" is-link url="/pages/settingPersonal/main" link-type="navigateTo" />
      <van-cell title="增票资质" title-class="settingTitle" is-link url="/pages/settingPersonal/main" link-type="navigateTo" />
      <van-cell title="退出登陆" title-class="settingTitle"/>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      userInfo:{
        nickName:'',
        avatarUrl:''
      }
    }
  },
  onShow() {
    var me = this;
    wx.getStorage({
      key: 'nickName',
      success(res) {
        me.userInfo.nickName = res.data;
      }
    });

    wx.getStorage({
      key: 'avatarUrl',
      success(userRes) {
        me.userInfo.avatarUrl = userRes.data;
      }
    });

    wx.getStorage({
      key: 'userId',
      success(userRes) {
        me.userInfo.userId = userRes.data;
      }
    });
  },

};
</script>

<style scoped>
  .settingDiv{
    background-color: #f8f8f8;
  }
  .settingCont{
    color: #999;
    min-height:100vh;
  }
  .currentAvatar{
    float: left;
    width: 60px;
    height: 60px;
    border: 1px solid hsla(0,0%,100%,.4);
    border-radius: 60px;
    overflow: hidden;
  }
  .currentAvatar img{
    width: 100%;
    height: 100%;
  }
  .fixInfo{
    float: left;
    margin-left: 10px;
    text-align: left;
  }
  .currentId{
    color: #333;
  }
</style>
<style>
  .settingTitle{
    color: #999;
  }
</style>
