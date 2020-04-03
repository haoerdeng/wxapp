<template>
    <div class="myOrder">
      <div class="myOrderContent">
        <!-- <div class="myAllOrder">
          <div class="myAllOrderDetails">我的订单<p><img src="/static/images/left.png" /></p></div>
        </div> -->
        <div style="clear:both"></div>
        <div class="topBox" @click="toMyOrder">
          <div data-page="0" class="orderItem unpay">
            <labal class="entranceText">待付款</labal>
          </div>
          <div data-page="1" class="orderItem unrecieve">
            <labal class="entranceText">待发货</labal>
          </div>
          <div data-page="2" class="orderItem uncomment">
            <labal class="entranceText">待收货</labal>
          </div>
          <!--<div data-page="" class="orderItem uncomment">
            <labal class="entranceText">待评价</labal>
          </div>-->
          <div data-page="4" class="orderItem consult">
            <labal class="entranceText">退换/售后</labal>
          </div>
          <!-- <div data-page="3" class="orderItem orders">
            <labal class="entranceText">全部订单</labal>
            </div> -->
        </div>
        <div style="clear:both"></div>
      </div>
      <div style="clear:both"></div>
    </div>
</template>

<script>
  export default {
    methods: {
      toMyOrder(e) {
        var pageId = e.target.dataset.page;
        switch (pageId) {
          case "0":
          case "1":
          case "2":
          case "3":
            const url = '/pages/myOrder/main?pageid=' + pageId;
            mpvue.redirectTo({url});
            break;
          case "4":
            console.log("售后页面，暂无");
            break;
        }

      }
    }
  }
</script>

<style scoped>
  .myOrder {
    width: 100%;
    margin: 15px 0;
    background-color: white;
    line-height: 72px;
  }
  .topBox {
    display: flex;
    position: relative;
    flex-direction:row;
  }
  .orderItem {
    flex:1;
    text-align: center;
  }
  .unpay {
    background: url('../../static/icons/待付款.png') 50% 30%/auto 20px no-repeat
  }
  .unrecieve {
    background: url('../../static/icons/待收货.png') 50% 30%/auto 20px no-repeat
  }
  .uncomment {
    background: url('../../static/icons/待评价.png') 50% 30%/auto 20px no-repeat
  }
  .consult {
    background: url('../../static/icons/售后.png') 50% 30%/auto 20px no-repeat
  }
  /* .orders {
    background: url('../../static/icons/全部订单.png') 50% 30%/auto 20px no-repeat
  } */
  .entranceText {
    color: #666;
    font-size: 12px;
    position: relative;
    top: 15px;
  }
  .myAllOrder{
    padding:0rpx 25rpx;
    height: 40px !important;
  }
  .myAllOrderDetails{
    font-size: 14px;
    border-bottom: 1px solid #eee;
    line-height: 40px;
    padding-bottom:3px;
    color:#333;
  }
  .myAllOrderDetails p img{
    float: right;
    display: block;
    color: #ccc;
    width: 12px;
    height: 12px;
    position: relative;
    top: -50rpx
  }
</style>
