<template>
    <div class="headerContent">
      <div class="myHeader" v-if="isHeaderShow == true">
        <div class="userInfo">
          <div class="avatar_wrap">
            <div class="avatar">
              <img class="imageInfo" alt="" :src=userInfo.avatarUrl />
            </div>
          </div>
          <div class="personal_wrap">
            <div class="name">
              <span class="line1">{{userInfo.nickName}}</span>
            </div>
            <span class="pin">用户名：{{userInfo.userId}}</span>
          </div>
          <!-- <div class="account_wrap" @click="settingClick">
            <div class="setticon"><van-icon name="setting" /></div>
            <div class="account_wrap_content">
              账号管理
            </div>
          </div> -->
        </div>
      </div>
      <div class="myHeader" v-else>
        <div class="userInfo">
          <div class="avatar_wrap">
            <div class="avatar">
              <img class="imageInfo" alt="" />
            </div>
          </div>
          <div class="personal_wrap">
            <button class="login" @click="loginIn">登录/注册</button>
          </div>
          <!-- <div class="account_wrap" @click="settingClick">
            <div class="setticon"><van-icon name="setting" /></div>
            <div class="account_wrap_content">
              账号管理
            </div>
          </div> -->
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    props: {
      userInfo: {
        nickName:"",
        avatarUrl:"",
        userId:""
      }
    },
    data() {
      return {
        isHeaderShow:false,
        userInfo: {
          nickName:"",
          avatarUrl:"",
          userId:""
        }
      }
    },
    onShow(){
      let me = this
      wx.getStorage({
        key: 'nickName',
        success(res) {
          me.userInfo.nickName = res.data;
          console.log(res)
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
    mounted() {
      let me = this
      wx.getStorage({
        key: 'nickName',
        success(res) {
          me.userInfo.nickName = res.data;
          console.log(res)
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
    methods:{
      settingClick(){
        console.log("click setting");
        const url = '/pages/accountSetting/main';
        mpvue.redirectTo({url})
      },
      loginIn(){
        const url = '/pages/login/main';
        mpvue.redirectTo({url})
      }
    }
  };
</script>

<style scoped>
.headerContent{
  width: 95%;
  margin: 0 auto;
  background-color: white;
  padding: 10px;
  border-top: 1px solid #e5e5e5;
  max-width: 100vm;
  padding-top: 80px;
}
.myHeader {
  background: linear-gradient(90deg,#84ADC4	,#95B3C4);
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(33,98,120,.4);
}
.login{
  background: none;
  border-radius: 10px;
  color:#fff;
  border: 1px solid #fff;
}
  .userInfo{
    width: 100%;
    height: 120px;
    position: relative;
  }
  .avatar_wrap {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
  }
  .avatar {
    width: 60px;
    height: 60px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0,0,0,.15);
    border: 1px solid hsla(0,0%,100%,.4);
    border-radius: 60px;
  }
  .imageInfo {
    width: 60px;
    height: 60px;
  }
.personal_wrap {
  position: absolute;
  left: 85px;
  top: 50%;
  transform: translateY(-50%);
}
.name {
  font-size: 14px;
  color: #fff;
}
.line1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
 .pin {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: hsla(0,0%,100%,.7);
}

  /* 账号设置*/
.account_wrap {
  position: absolute;
  right: 15px;
  top: 0;
  height: 32px;
  line-height: 32px;
  overflow: hidden;
  color: rgba(6,38,111,.7);
  font-size: 12px;
}
.setticon{
  float: left;
}
.account_wrap_content {
  float: left;
  margin-left: 3px;
}
</style>
