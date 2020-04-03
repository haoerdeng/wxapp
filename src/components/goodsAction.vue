<template>
  <div class="contaniner">
    <div class="contentMeum">
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" open-type="contact"/>
        <van-goods-action-icon icon="cart-o" text="购物车" :info="cartNum" icon-class="cartNum" @click="toCart" />
        <!--<van-goods-action-icon icon="shop-o" text="店铺"/>-->
        <van-goods-action-button :disabled="buyHandle" text="加入购物车" type="warning" @click="quickJoin"/>
        <!-- open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotJoin" -->
        <van-goods-action-button :disabled="buyHandle" text="立即购买" @click="quickBuys" />
        <!-- open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotBuy" -->
      </van-goods-action>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo:{
        nickName:"",
        avatarUrl:"",
        userId:""
      }
    }
  },
  props: {
    cartNum: 0,
    buyHandle:{
      type:Boolean
    }
  },
  onLoad(){
    let that = this
    wx.getStorage({
      key:'loginMsg',
      success(res){
        console.log(res.data)
      }
    })
    wx.getStorage({
      key: 'nickName',
      success(res) {
        that.userInfo.nickName = res.data;
        console.log(res)
      }
    });

    wx.getStorage({
      key: 'avatarUrl',
      success(userRes) {
        that.userInfo.avatarUrl = userRes.data;
      }
    });

    wx.getStorage({
      key: 'userId',
      success(userRes) {
        that.userInfo.userId = userRes.data;
      }
    });
  },
  methods:{
    //商品详情页前往购物车
    toCart:function(){
      const url = '/pages/shopCart/main';
      mpvue.navigateTo({url})
    },

    //用户授权弹框
    quickJoin:function(e) {
      var me = this;
      console.log(me.userInfo)
      var detail = e.mp.detail;
      if(me.userInfo.userId == ""){
        wx.showToast({
          title:'请登录后操作',
          icon:'loading',
          duration:2000
        })
      }else{
        me.$parent.joinCart()
      }
      // if(!me.buyHandle){
        
      //   // me.$parent.onGotUserInfo(detail,'join');
      // }

    },
    quickBuys:function(e) {
      var me = this;
      console.log(me.userInfo)
      var detail = e.mp.detail;
      if(me.userInfo.userId == ""){
        wx.showToast({
          title:'请登录后操作',
          icon:'loading',
          duration:2000
        })
      }else{
        me.$parent.quickBuy()
      }
    }
  }
};
</script>
<style>
.contaniner{
  z-index:3;
  position: fixed;
  bottom: 0
}
.contentMeum{
  width: 100%;
  display: inline-block;
}
.cartNum .van-info{
  height: 16px !important;
  line-height: 16px !important;
}
</style>
