<template>
  <div v-if = "status ===1" class="container">
    <div class="headerContent">
      <div :style="{height:statusBarHeight + 'px'}"></div>
      <div style="margin-bottom:5px">
        <text class="title">授权登录</text>
      </div>
    </div>
    <div class="loginImg">
      <img src="../../../static/images/logo.jpg" alt="">
      <!-- <img src="../../../static/images/1.png" alt=""> -->
    </div>
    <div class="loginInfo">
      <p class="loginTile">莱茵艾格申请获取以下权限：</p>
      <p class="loginItem"><i></i>获得你的公开信息（昵称、头像）</p>
    </div>
    <div style="clear: both"></div>
    <div class="loginBtns">
      <button class="errBtn" lang="zh_CN" @click="back">拒绝授权</button>
      <button class="loginBtn" open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">授权登陆</button>
    </div>
  </div>

</template>

<script>
  export default {
    data(){
      return{
        status:0,// 加载完成标识 0 未加载完  ，1已完成
        nickname:'',
        avatarUrl:'',
        statusBarHeight:0
      }
    },
    onLoad(){
      var that = this
      wx.getSystemInfo({
        success: function (res) {
          console.log(res)
          console.log(res.statusBarHeight)
          that.statusBarHeight = res.statusBarHeight + 12
        },
      })
    },
    onShow() {
      var me = this;
      console.log('----onShow---')
      wx.login({     //获取code
        success(loginRes){
          if(loginRes.code) {
            me.code = loginRes.code;
            console.log(me.code);

            wx.getSetting({   //检测是否已授权
              success(res) {
                console.log(res);
                if (res.authSetting['scope.userInfo']) {
                  console.log('已授权');

                  wx.getUserInfo({
                    success(res) {
                      const userInfo = res.userInfo;
                      console.log(userInfo);
                      me.nickname = userInfo.nickName;
                      me.avatarUrl = userInfo.avatarUrl;
                      me.getSession();
                    },
                    fail(data){
                      console.log("获取用户信息失败");
                      console.log(data)
                    }
                  });
                }
                else{
                  console.log('未授权');
                  me.status = 1;
                }
              }
            });
          }else {
            console.log('获取code失败' + loginRes.errMsg)
          }
        }
      });
    },
    methods:{
      onGotUserInfo(e){
        var me = this;
        console.log(e);
        if(e.mp.detail.userInfo){ // 允许授权
          me.nickName = e.mp.detail.userInfo.nickName;
          me.avatarUrl = e.mp.detail.userInfo.avatarUrl;
          me.getSession();
          // this.globalData.nickName = me.nickName
          setTimeout(() => {
            const url = '/pages/myShop/main';
            mpvue.switchTab({url})
          }, 1000);
        }else{ // 拒绝授权
          const url = '/pages/myShop/main';
          mpvue.switchTab({url})
          console.log("拒绝授权");
          wx.setStorage({
            key:'wxSession',
            data:''
          });
          wx.setStorage({
            key:'userId',
            data:''
          });
          
        }
      },
      back(){
        const url = '/pages/myShop/main';
        mpvue.switchTab({url})
      },
      /* ----------------获取session--------------------*/
      getSession(){
        var me = this;
        var params={
          value:{
            "js_code":me.code,
            "nickName":me.nickname,
            "head_src":me.avatarUrl
          }
        };
        console.log(params);
        params=JSON.stringify(params);
        me.$http.post({
          url:me.GLOBAL.serviceHepler.conn.login_code,
          data:{
            param:params
          }
        }).then((result)=>{
          console.log("----------session  action---------");
          console.log(result);
          console.log("openid : " + result.value.value.openid)
          console.log("-----------session  over-------------")
          wx.setStorage({
            key:'wxSession',
            data:result.value.value.token
          });
          wx.setStorage({
            key:'userId',
            data:result.value.value.id
          });
          wx.setStorage({
            key:'nickName',
            data:result.value.value.nickName
          });
          wx.setStorage({
            key:'avatarUrl',
            data:result.value.value.head_src
          });
          wx.setStorage({
            key:'openid',
            data:result.value.value.openid
          });
          wx.setStorage({
            key:'loginMsg',
            data:result.value.value
          });
          setTimeout(() => {
            const url = '/pages/myShop/main';
            mpvue.switchTab({url});
          }, 1000);
        }).catch((err)=>{
          console.log("登录页面失败回调")
          const url = '/pages/myShop/main';
          mpvue.switchTab({url})
        })
      }

    }
  }
</script>
<style scoped>
  .headerContent{
    position: fixed;
    text-align: left;
    margin: 0 auto;
    background: #fff;
    z-index: 99;
    width: 100%;
    margin-bottom: 20px;
    padding-left: 35px;
  }
  .loginImg{
    width: 50px;
    height: 50px;
    padding: 30px 0;
    margin: 0 auto;
    overflow: hidden;
    padding-top: 80px;
  }
  .loginImg img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .loginInfo {
    width: 75%;
    margin: 0 auto;
    border-top: 0.5px solid #efefef;
    margin: 20px ;
    padding-top: 15px;
    padding-left: 10px;
    line-height: 40px;
  }
  .loginTile {
     font-size: 16px;
   }
  .loginItem{
    color: #999;
    font-size: 14px;
    float: left;
    width: 85%;
  }
  .loginItem i{
    width: 5px;
    height: 5px;
    background-color: #999;
    border-radius: 50%;
    float: left;
    margin: 17px 10px 0 0;
  }
  .errBtn{
    width: 30%;
    background-color: #ec0d32;
    height: 45px;
    line-height: 45px;
    font-size: 18px;
    border-radius: 5px;
    color: white;
    display: inline-block;
    text-align: center;
    margin-left: 10px
  }
  .loginBtn{
    width: 30%;
    background-color: #1AAD16;
    height: 45px;
    line-height: 45px;
    font-size: 18px;
    border-radius: 5px;
    color: white;
    display: inline-block;
    text-align: center;
    margin-left: 10px
  }
  .loginBtns{
    width: 100%;
    height: 45px;
    line-height: 45px;
    font-size: 18px;
    border-radius: 5px;
    color: white;
    text-align: center;
  }
</style>
