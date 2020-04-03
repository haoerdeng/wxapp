<template>
    <div>
      <div class="recomm_mod_title">
        <span class="recomm_mod_title_text">为你推荐</span>
      </div>
      <div class="youwantDiv">
        <van-row class="contentNav">
          <van-col span="12">
            <div class="contentItem">
              <div class="contentImg">
                <image src="/static/images/1.jpg" class="storeImg"/>    <!--item.image-->
              </div>
              <text class="storeName">华硕电脑就是非常大俺家大房间爱空间华硕电脑就是非常大俺家大房间爱空间</text>   <!--{{item.title}}-->
              <div class="storeContent">
                <div class="divleft">
                  <p>￥</p><span>100</span>                <!--{{item.price}}-->
                </div>
                <img src="/static/images/9.jpg" alt="" class="divright">
              </div>
            </div>
          </van-col>
          <van-col span="12">
            <div class="contentItem">
              <div class="contentImg">
                <image src="/static/images/1.jpg" class="storeImg"/>    <!--item.image-->
              </div>
              <text class="storeName">华硕电脑就是非常大俺家大房间爱空间华硕电脑就是非常大俺家大房间爱空间</text>   <!--{{item.title}}-->
              <div class="storeContent">
                <div class="divleft">
                  <p>￥</p><span>100</span>                <!--{{item.price}}-->
                </div>
                <img src="/static/images/9.jpg" alt="" class="divright">
              </div>
            </div>
          </van-col>
        </van-row>

      </div>
    </div>

</template>
<script>
export default {
  props: {},
  data: {}
};
</script>
<style scoped>
/*上方标题*/
  .recomm_mod_title{
    margin: 15px 0;
    height: 1em;
    line-height: 1em;
    text-align: center;
    font-size: 12px;
    position: relative;
  }
.recomm_mod_title .recomm_mod_title_text {
  padding: 0 15px;
  color: #999;
  z-index: 2;
  background-color: #f8f8f8;
  position: relative;
  }
.recomm_mod_title .recomm_mod_title_text::after, .recomm_mod_title .recomm_mod_title_text::before {
  content: "";
  position: absolute;
  top: 50%;
  margin-top: -2px;
  width: 4px;
  height: 4px;
  background-color: #ccc;
  transform: rotate(45deg);
}
.recomm_mod_title .recomm_mod_title_text::after {
  right: 0;
}
.recomm_mod_title .recomm_mod_title_text::before {
  left:0;
}
.recomm_mod_title::after {
  content: "";
  position: absolute;
  z-index: 1;
  pointer-events: none;
  background-color: #ccc;
  height: 1px;
  left: 10px;
  right: 10px;
  top: 50%;
}
  /*下方内容*/
.youwantDiv {
  background-color: white;
  margin-top: 15px;
  padding-bottom: 30px;
}
.contentNav{
  width: 100%;
  height: 100%;
}
.contentNav div:nth-child(2n){
  border-left: 1rpx solid #ccc;
  padding-left: 10rpx;
}
.storeContent{
  text-align: center;
  padding: 0 20rpx;
}
.contentImg {
  padding: 0 10px;
}
img{
  width: 100%;
  height: 100%;
}
.divleft{
  float: left
}
.divright{
  float: right;
}
.divleft p,span{
  display: inline-block;
  color:#f00;
  font-size: 24rpx;
}
.storeImg{
  width: 100%;
  height: 120px;
}
.storeName{
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient: vertical;
  margin-top: 10rpx;
  padding:0 20rpx;
  font-size: 24rpx;
}
/* .shopcart_mod_title {
  position: relative;
  margin: 15px 0;
  height: 1em;
  line-height: 1em;
  text-align: center;
  font-size: 12px;
  color: #999;
}
.shopcart_mod_title_text {
  z-index: 2;
  position: relative;
  padding: 0 15px;
  background-color: #f7f7f7;
}
.shopcart_mod_title_text::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -2px;
  width: 4px;
  height: 4px;
}
.shopcart_mod_title_text::after {
  content: "";
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -2px;
  width: 4px;
  height: 4px;
  background-color: #ccc;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}*/
</style>
