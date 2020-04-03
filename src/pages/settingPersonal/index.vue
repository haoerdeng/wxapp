<template>
  <div class="settingDiv container">
    <div class="headerContent">
      <div :style="{height:statusBarHeight + 'px'}"></div>
      <div class="containerHeader">
        <div  @click="clickBack()">
          <image src="/static/images/back.png" class="img"></image>
        </div>
        <text class="title" style="margin-top:10px">个人信息</text>
      </div>
    </div>
    <div class="settingCont">
      <van-cell is-link title="用户头像" title-class="settingTitle" @click="changeAvatar" >
        <div class="currentAvatar">
          <img :src="userInfo.avatarUrl" alt="头像" mode="aspectFitf">
      </div>
      </van-cell>
      <van-cell title="会员名" title-class="settingTitle" :value="userInfo.userId"/>
      <van-cell title="昵称" title-class="settingTitle" :value="userInfo.nickName" />
      <!-- is-link  link-type="navigateTo" url="/pages/settingNickname/main" -->
      <van-cell title="性别"  title-class="settingTitle" is-link>
        <picker @change="changeSex" :range="sexArr">
            保密
        </picker>
      </van-cell>
    </div>
  </div>
</template>
修改个人信息
<script>
export default {
  data() {
    return {
      userInfo:{
        nickName:'',
        avatarUrl:''
      },
      sexArr: ['男','女','保密'],
      statusBarHeight:0
    }
  },
  methods:{
    /* 修改头像*/
    changeAvatar(){
      var me = this;
      console.log("修改头像");
      wx.chooseImage({
        count: 1, // 最多可以选择的图片张数
        sizeType: ['original', 'compressed'],// 所选的图片的尺寸
        sourceType: ['album', 'camera'], // 选择图片的来源
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          console.log(res);
          me.userInfo.avatarUrl = res.tempFilePaths[0];
        }
      });
    },
    /* 修改性别*/
    changeSex(e){
     console.log("changeSex");
      var sexIdx = e.target.value;
      console.log(this.sexArr[sexIdx]);
    },
    /*返回上一页事件 */
    clickBack:function(){
      var me = this
      const url = "/pages/myShop/main";
      mpvue.switchTab({ url });
    },
  },
  onLoad() {
    let me = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        console.log(res.statusBarHeight)
        me.statusBarHeight = res.statusBarHeight + 12
      },
    })
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
  .headerContent{
    background: #fff;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    position: fixed;
    z-index: 99;
  }
  .containerHeader{
    padding-bottom: 10px;
  }
  .img{
    position: fixed;
    left: 0;
    width:20px;
    height:20px;
    padding:0 10px;
    margin:5px 0;
  }
  .settingCont{
    width: 100%;
    color: #999;
    min-height:100vh;
    padding-top: 80px
  }
  .currentAvatar{
    width: 30px;
    height: 30px;
    border: 1px solid hsla(0,0%,100%,.4);
    border-radius: 60px;
    overflow: hidden;
    float: right;
  }
  .currentAvatar img{
    width: 100%;
    height: 100%;
  }
</style>
<style>
  .settingTitle{
    color: #999;
  }
</style>
