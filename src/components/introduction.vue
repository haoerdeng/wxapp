<template>
  <div style="margin-top:10rpx;padding:0 15rpx;background:#fff">
    <van-row class="detailsTitle">
      <van-col span="22" class="title">{{introduces.title}}</van-col>
      <van-col span="2">
        <van-icon name="star-o"/>
        <p>收藏</p>
      </van-col>
      <div class="introduce">
        <van-col span="24">{{introduces.sellpoint}}</van-col>
      </div>
      <div class="detailsMoney">
        <van-col>￥{{introduces.price}}</van-col>
        <van-col>降价提醒</van-col>
      </div>
    </van-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
        introduces: {},
        id:"",
        cid:""

    }
  },
  onLoad(){
    var me=this;    
    me.id=me.$root.$mp.query.id;
    me.cid=me.$root.$mp.query.cid;
    me.$http.post({
      url:me.GLOBAL.serviceHepler.conn.details_swiper+"?id="+me.id,
      data:{}
    }).then(function(result) {
      if(result.code){
        me.introduces = JSON.parse(result.value);
        console.log("--------------------------------------")
        console.log(me.introduces)
        console.log("--------------------------------------")
      }else{
        console.log('返回出错了。')
      }
    }).catch(function() {
      console.log("出错了");
    })
  }
    
};
</script>
<style scoped>
.title{
  padding: 10rpx 0rpx 20rpx;
}
page{
    height: 100%;
}
p {
  text-align: right;
  font-size: 16rpx;
  color: #666;
}
van-icon {
  position: relative;
  left: 30rpx;
}
.detailsMoney {
  width: 100%;
}
.detailsMoney van-col:first-child {
  font-size: 24rpx;
  color: #f00;
  float: left;
  margin-top: 20rpx;
}
.detailsMoney van-col:nth-child(2) {
  width: 100rpx;
  padding: 5rpx;
  float: right;
  font-size: 24rpx;
  border: 1rpx solid #eee;
  margin-top: 20rpx;
}
.introduce van-col{
  color: #f00 !important;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  clear: both;
}
.detailsTitle van-col {
  position: relative;
  font-size: 30rpx;
  font-weight: 400;
  margin-bottom: 20rpx;
}
</style>
