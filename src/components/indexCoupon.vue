<template>
  <div class="couponContainer">
    <div class="contTitle">优惠券</div>
    <div>
      <scroll-view class="couponScroll" scroll-x scroll-with-animation >
        <div class="couponItem" v-for="(item,index) in couponArr" :key="index">
          <div class="couponTop">
            <van-row>
              <van-col span="8">
                <p>{{item.title}}</p>
              </van-col>
              <van-col span="16">
                <b>{{item.fullReduce}}</b>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="6">
                <span class="preferential">{{item.preferential}}</span>
              </van-col>
              <van-col span="18">
                <div class="moneyNumber">
                  {{item.moneyNumber}}
                  <div class="money">{{item.money}}</div>
                </div>
              </van-col>
            </van-row>
            <div class="couponFooter" v-if="show">{{item.couponFooter}}</div>
            <div class="couponFooter" v-else>{{item.couponFooters}}</div>
          </div>
        </div>
      </scroll-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: "indexCoupon",
    data(){
      return{
        show:false,
        couponArr:[
          {
            title:"优惠券",
            fullReduce:"全场通用满5000元",
            preferential:"可优惠",
            couponFooter:"点击领取",
            moneyNumber:"500",
            money:"元",
            couponFooters:"已领取"
          },{
            title:"优惠券",
            fullReduce:"全场通用满5000元",
            preferential:"可优惠",
            couponFooter:"点击领取",
            moneyNumber:"500",
            money:"元",
            couponFooters:"已领取"
          },{
            title:"优惠券",
            fullReduce:"全场通用满5000元",
            preferential:"可优惠",
            couponFooter:"点击领取",
            moneyNumber:"500",
            money:"元",
            couponFooters:"已领取"
          },{
            title:"优惠券",
            fullReduce:"全场通用满5000元",
            preferential:"可优惠",
            couponFooter:"点击领取",
            moneyNumber:"500",
            money:"元",
            couponFooters:"已领取"
          }
        ]
      }
    }
  };
</script>

<style scoped>
  .couponContainer {
    padding: 10px;
  }
  .contTitle{
    text-align: center;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    padding: 5px;
    position: relative;
  }
  .contTitle:after,.contTitle:before{
    content: '';
    position: absolute;
    top: 52%;
    background: #bebebe;
    width: 39%;
    height: 1px;
  }
  .contTitle:before{
    right: 0;
  }
  .contTitle:after{
    left: 0;
  }
  .couponScroll{
    background-color: white;
    height: 120px;
    white-space: nowrap;
    display: flex;
    padding: 5px;
  }
  .couponItem{
    width: 160px;
    height: 120px;
    margin-right: 12px;
    border-radius: 5px;
    display: inline-block;
    background:linear-gradient(to left, #ff5d74, #ff9966);
    /* background: burlywood; */
  }
  .couponTop{
    height: auto;
    font-size: 12px;
  }
  .couponTop p{
    background: yellow;
    margin: 5px 2px;
    width: 40px;
    height: 20px;
    font-size: 14px;
    padding: 2px 5px;
    color:tomato;
    opacity: 0.8;
    font-weight: bolder;
    border-radius: 2px;
  }
  .couponTop b{
    margin-top: 15px;
    font-size: 12px;
    color: #fff;
    display: inline-block;
    text-align: center;
    position: relative;
    top: -5px
  }
  .couponTop span{
    width: 40px;
    font-size: 14px;
    color:#fff;
    writing-mode: vertical-rl;
    font-weight: bolder;
    text-align: left
  }
  .couponFooter{
    background-color:#fff;
    padding: 4px 10px;
    margin: 0 auto;
    width: 40%;
    text-align: center;
    border-radius: 5px;
    color: crimson;
    font-weight: bold;
    position: relative;
    top: -8px;
  }
  .moneyNumber{
    text-align: left;
    color: #fff;
    font-size: 45px;
    font-weight: bolder;
    position: relative;
    top: -5px
  }
  .money{
    display: inline-block;
    font-size: 18px;
    color: #fff;
    position: relative;
    top: -3px;
    left: -10px;
  }
  .preferential{
    position: relative;
    top: 8px
  }
</style>
