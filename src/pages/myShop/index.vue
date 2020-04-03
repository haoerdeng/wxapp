<template>
  <div style="background:#fff;" class="container">
    <!-- <div class="headerContents">
      <div :style="{height:statusBarHeight + 'px'}"></div>
      <div style="margin-bottom:5px">
        <text class="title">个人中心</text>
      </div>
    </div>-->
    <div class="headerContent" style="position: relative;">
      <div class="myHeader" v-if="isHeaderShow == true">
        <div class="userInfo">
          <div class="avatar_wrap">
            <div class="avatar">
              <img class="imageInfo" alt :src="userInfo.avatarUrl" />
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
          </div>-->
        </div>
      </div>
      <div class="myHeader" v-else>
        <div class="userInfo">
          <div class="avatar_wrap">
            <div class="avatar">
              <img class="imageInfo" alt />
            </div>
          </div>
          <div class="personal_wrap">
            <button
              class="login"
              open-type="getUserInfo"
              lang="zh_CN"
              @getuserinfo="onGotUserInfo"
            >登录/注册</button>
          </div>
          <!-- 
             @click="loginIn"
            <div class="account_wrap" @click="settingClick">
            <div class="setticon"><van-icon name="setting" /></div>
            <div class="account_wrap_content">
              账号管理
            </div>
          </div>-->
        </div>
      </div>

      <!-- 推广和奖励 -->
      <div class="promotionRewards">
        <div class="promote">
          <p>推广拉新</p>
          <p style="color:#FFAB03;">{{promote}}</p>
        </div>
        <div class="rewards" @click="rewardsClick">
          <p>我的奖励</p>
          <p style="color:#FFAB03;">￥{{rewards}}</p>
        </div>
      </div>
    </div>

    <!--上方用户信息卡片-->
    <!-- <myStoreHeader :userInfo="userInfo"></myStoreHeader> -->
    <!--我的订单-->
    <!-- <myOrder></myOrder> -->
    <!--常用设置-->
    <commonSetting :listData="listData"></commonSetting>
    <!--我的收藏足迹-->
    <!--4月任务-->
    <!-- <myCollection></myCollection> -->
    <!--为你推荐-->
    <!-- <youWant></youWant> -->
  </div>
</template>


<script>
import myStoreHeader from "@/components/myStoreHeader";
import myOrder from "@/components/myOrder";
import commonSetting from "@/components/commonSettings";
// import myCollection from "@/components/myCollection";
// import youWant from "@/components/youWant";
//注意:创建页面的时候 必须暴露  否则卡死
export default {
  data() {
    return {
      userInfo: {
        nickName: "",
        avatarUrl: "",
        userId: ""
      },
      statusBarHeight: 0,
      isHeaderShow: false,
      listData: [
        { title: "我的团购", url: "/pages/rewards/main", icon: "friends-o" },
        { title: "我的秒杀", url: "/pages/settingPhone/main", icon: "fire-o" },
        {
          title: "我的优惠卷",
          url: "/pages/settingAddress/main",
          icon: "coupon-o"
        },
        {
          title: "我的报名",
          url: "/pages/settingPersonal/main",
          icon: "records"
        },
        {
          title: "我的地址",
          url: "/pages/settingPersonal/main",
          icon: "location-o"
        }
      ],
      promote: 200,
      rewards: 1500
    };
  },
  components: {
    myStoreHeader,
    myOrder,
    commonSetting
    // youWant,
    // myCollection
  },
  mounted() {
    console.log(this.userInfo.nickName);
    if (this.userInfo.nickName != "") {
      this.isHeaderShow = true;
    }
  },
  onLoad() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        console.log(res);
        console.log(res.statusBarHeight);
        that.statusBarHeight = res.statusBarHeight + 12;
      }
    });
  },
  onShow() {
    var me = this;

    /*var me=this;
    var param = {
      value:{userId:1}
    };
    param = JSON.stringify(param)
    me.$http.post({
      url:me.GLOBAL.serviceHepler.conn.order_manage+"?param="+param,
      data:{}
    }).then(function(result) {
      console.log(result);
      var orderList=result.value;
      me.orderList = orderList
    }).catch(function() {
      console.log("出错了");
    })*/
  },
  methods: {
    rewardsClick(){
      mpvue.navigateTo({ url: "/pages/rewards/main" });
    },
    // loginIn(){
    //   const url = '/pages/login/main';
    //   mpvue.redirectTo({url})
    // },
    onGotUserInfo(e) {
      var me = this;
      wx.login({
        //获取code
        success(loginRes) {
          if (loginRes.code) {
            me.code = loginRes.code;
            console.log(me.code);
            console.log(
              "?????????????????????????????????????????????????????"
            );
            wx.getSetting({
              //检测是否已授权
              success(res) {
                console.log(res);
                if (res.authSetting["scope.userInfo"]) {
                  console.log("已授权");

                  wx.getUserInfo({
                    success(res) {
                      const userInfo = res.userInfo;
                      console.log(userInfo);
                      me.nickname = userInfo.nickName;
                      me.avatarUrl = userInfo.avatarUrl;
                      me.getSession();
                      console.log("me.getsession");
                    },
                    fail(data) {
                      console.log("获取用户信息失败");
                      console.log(data);
                    }
                  });
                } else {
                  console.log("未授权");
                  me.status = 1;
                }
              }
            });
          } else {
            console.log("获取code失败" + loginRes.errMsg);
          }
        }
      });
      // console.log(e);
      // if(e.mp.detail.userInfo){ // 允许授权
      //   me.nickName = e.mp.detail.userInfo.nickName;
      //   me.avatarUrl = e.mp.detail.userInfo.avatarUrl;
      //   console.log(e.mp.detail)
      //   me.getSession();
      //   // this.globalData.nickName = me.nickName
      // }else{ // 拒绝授权
      //   console.log("拒绝授权");
      //   wx.setStorage({
      //     key:'wxSession',
      //     data:''
      //   });
      //   wx.setStorage({
      //     key:'userId',
      //     data:''
      //   });

      // }
    },
    getSession() {
      var me = this;
      var params = {
        value: {
          js_code: me.code,
          nickName: me.nickname,
          head_src: me.avatarUrl
        }
      };
      console.log(params);
      params = JSON.stringify(params);
      me.$http
        .post({
          url: me.GLOBAL.serviceHepler.conn.login_code,
          data: {
            param: params
          }
        })
        .then(result => {
          console.log("----------session  action---------");
          console.log(result);
          this.userInfo.nickName = result.value.nickName;
          this.userInfo.avatarUrl = result.value.head_src;
          this.userInfo.userId = result.value.id;
          console.log(this.userInfo.userId);
          console.log(this.userInfo.avatarUrl);
          console.log(this.userInfo.nickName);
          if (me.userInfo.nickName != "") {
            this.isHeaderShow = true;
          }
          wx.setStorage({
            key: "wxSession",
            data: result.value.token
          });
          wx.setStorage({
            key: "userId",
            data: result.value.id
          });
          wx.setStorage({
            key: "nickName",
            data: result.value.nickName
          });
          wx.setStorage({
            key: "avatarUrl",
            data: result.value.head_src
          });
          wx.setStorage({
            key: "openid",
            data: result.value.openid
          });
          wx.setStorage({
            key: "loginMsg",
            data: result.value
          });
          console.log("openid : " + result.value.openid);
          console.log("-----------session  over-------------");
        })
        .catch(err => {});
    }
  }
};
</script>

<style scoped>
.promotionRewards {
  display: flex;
  border: 1px solid #e8e8e8;
  padding: 15px 0;
  border-radius: 5px;
  background: #fff;
  bottom: -25%;
  left: 16%;
  position: absolute;
}

.promote {
  border-right: 1px solid #000;
}

.promote,
.rewards {
  padding: 0 15px;
  text-align: center;
}

.headerContents {
  position: fixed;
  text-align: left;
  margin: 0 auto;
  background: #fff;
  z-index: 99;
  width: 100%;
  margin-bottom: 20px;
  padding-left: 35px;
}
.headerContent {
  width: 95%;
  margin: 0 auto 15% auto;
  background-color: white;
  padding: 10px;
  border-top: 1px solid #e5e5e5;
  max-width: 100vm;
}
.myHeader {
  background: linear-gradient(90deg, #ff8532, #ff8532);
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(33, 98, 120, 0.4);
}
.login {
  background: none;
  border-radius: 10px;
  color: #000;
  border: 1px solid #000;
}
.userInfo {
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
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  border: 1px solid hsla(0, 0%, 100%, 0.4);
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
  color: #000;
}

/* 账号设置*/
.account_wrap {
  position: absolute;
  right: 15px;
  top: 0;
  height: 32px;
  line-height: 32px;
  overflow: hidden;
  color: rgba(6, 38, 111, 0.7);
  font-size: 12px;
}
.setticon {
  float: left;
}
.account_wrap_content {
  float: left;
  margin-left: 3px;
}
</style>
