<template>
  <div class="conDiv container">
    <div class="headerContent">
      <div :style="{height:statusBarHeight + 'px'}"></div>
      <div style="margin-bottom:5px">
        <text class="title">活动</text>
      </div>
    </div>
    <div class="tabPtop">
      <img src="/static/images/active.jpg" alt="">
      <!-- <van-tabs :active="active" sticky animated>
        <van-tab title="限时特价">
          <div class="activeCon">
            <van-row
              :gutter="20"
              v-for="(item, index) in specialsActivity"
              :key="index"
              custom-class="activeItem"
              @click="toSpecials(item.itemid)"
            >
              <van-col span="8">
                <div class="itemImage">
                  <img :src="item.image" alt>
                </div>
              </van-col>
              <van-col span="16">
                <div class="itemTitle">{{item.intro}}</div>
                <div class="itemMan">
                  <div class="itemPrice">
                    <div class="currentPrice">
                      <span class="discountTitle">惊喜价</span>
                      ￥{{item.currentPrice}}
                    </div>
                    <div class="originalPrice">
                      <span class="oldPriceTitle">原价</span>
                      ￥{{item.price}}
                    </div>
                  </div>
                  <div class="buyBtn">立即抢购</div>
                </div>
              </van-col>
            </van-row>
          </div>
        </van-tab>
        <van-tab title="商城秒杀">
          <div class="activeCon">
            <van-row
              :gutter="20"
              v-for="(item, index) in spikeActivity"
              :key="index"
              custom-class="activeItem"
              @click="toGoodsDetails(item.itemid)"
            >
              <van-col span="8">
                <div class="itemImage">
                  <img :src="item.image" alt>
                </div>
              </van-col>
              <van-col span="16">
                <div class="itemTitle">{{item.intro}}</div>
                <div class="remainTime">
                  <van-icon name="clock-o"/>
                  <span>{{countTime[index]}}</span>
                </div>
                <div class>
                  <div class="itemPrice">
                    <div class="currentPrice">
                      <span class="discountTitle">秒杀价</span>
                      ￥{{item.currentPrice}}
                    </div>
                    <div class="originalPrice">
                      <span class="oldPriceTitle">原价</span>
                      ￥{{item.price}}
                    </div>
                  </div>
                  <div class="buyBtn">立即抢购</div>
                </div>
              </van-col>
            </van-row>
          </div>
        </van-tab>
        <van-tab title="优惠套餐">
          <div class="activeCon">
            <div class="manTitle">成品推荐</div>
            <van-row
              :gutter="20"
              v-for="(item, index) in productActivity"
              :key="index"
              custom-class="activeItem"
              @click="toProductActivity(item.itemid)"
            >
              <van-col span="8">
                <div class="itemImage">
                  <img :src="item.picture" alt>
                </div>
              </van-col>
              <van-col span="16">
                <div class="itemTitle">{{item.headline}}</div>
                <div class="remainTime">
                  <van-icon name="clock-o"/>
                  <span>{{countTime[index]}}</span>
                </div>
                <div class>
                  <div class="itemPrice">
                    <div class="currentPrice">
                      <span class="discountTitle">优惠价</span>
                      ￥{{item.pricespike}}
                    </div>
                    <div class="originalPrice">
                      <span class="oldPriceTitle">原价</span>
                      ￥{{item.originalcost}}
                    </div>
                  </div>
                  <div class="buyBtn">立即抢购</div>
                </div>
              </van-col>
            </van-row>
            <div class="manTitle">定制组合</div>
            <van-row
              :gutter="20"
              v-for="(item, index) in customCombination "
              :key="index"
              custom-class="activeItem"
              @click="tocustomCombination(item.itemid)"
            >
              <van-col span="8">
                <div class="itemImage">
                  <img :src="item.picture" alt>
                </div>
              </van-col>
              <van-col span="16">
                <div class="itemTitle">{{item.headline}}</div>
                <div class="remainTime">
                  <van-icon name="clock-o"/>
                  <span>{{countTime[index]}}</span>
                </div>
                <div class>
                  <div class="itemPrice">
                    <div class="currentPrice">
                      <span class="discountTitle">优惠价</span>
                      ￥{{item.pricespike}}
                    </div>
                    <div class="originalPrice">
                      <span class="oldPriceTitle">原价</span>
                      ￥{{item.originalcost}}
                    </div>
                  </div>
                  <div class="buyBtn">立即抢购</div>
                </div>
              </van-col>
            </van-row>
          </div>
        </van-tab>
      </van-tabs> -->
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      active: "0", //tab活动标签
      spikeActivity: [], //秒杀活动
      specialsActivity: [], //限时特价
      productActivity: [], //成品推荐
      customCombination: [], //定制组合
      time: [], //剩余时间时间戳
      countTime: [], // 剩余时间格式化
      timer: "",
      statusBarHeight:0
    };
  },
  computed: {
    spikeImgFormate: function() {
      var me = this;
      me.spikeActivity.forEach(function(i) {
        i.image = me.cloudIP + i.image;
      });
      return me.spikeActivity;
    },
    specialsForamte: function() {
      var me = this;
      me.specialsActivity.forEach(function(i) {
        i.image = me.cloudIP + i.image;
      });
      return me.specialsActivity;
    },
    specialsForamtes: function() {
      var me = this;
      me.productActivity.forEach(function(i) {
        i.picture = me.cloudIP + i.picture;
      });
      return me.productActivity;
    },
    specialsForamties: function() {
      var me = this;
      me.customCombination.forEach(function(i) {
        i.picture = me.cloudIP + i.picture;
      });
      return me.customCombination;
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
    wx.getStorage({
      key: "activityIndex",
      success(res) {
        me.active = res.data;
        console.log(res);
      }
    });
    // this.getSpikeList();
    // this.getSpecials();
    // this.getProduct();
    // this.getCustomCombination();
  },
  onHide() {
    clearTimeout(this.timer);
  },
  methods: {
    /* 获取秒杀活动列表*/
    // getSpikeList() {
    //   var me = this;
    //   me.time = [];
    //   var param = {
    //     value: {
    //       activityNameId: 4
    //     }
    //   };
    //   param = JSON.stringify(param);
    //   me.$http
    //     .post({
    //       url: me.GLOBAL.serviceHepler.conn.activity_list,
    //       data: { param: param }
    //     })
    //     .then(function(result) {
    //       if (result.value.length > 0) {
    //         console.log("秒杀活动列表：");
    //         me.spikeActivity = result.value;
    //         me.spikeActivity.forEach(function(i) {
    //           if (i.stoptime - new Date() > 0) {
    //             me.time.push(i.stoptime - new Date());
    //           } else {
    //             me.time.push(0);
    //           }
    //         });

    //         me.setCountDown();
    //       }
    //       console.log(result);
    //     })
    //     .catch(function() {
    //       console.log("出错了");
    //     });
    // },
    /* 获取限时特价列表*/
    getSpecials() {
      // var me = this;
      // var param = {
      //   value: {
      //     activityNameId:3
      //   }
      // };
      // param = JSON.stringify(param);
      // me.$http
      //   .post({
      //     url: me.GLOBAL.serviceHepler.conn.activity_list,
      //     data: { param: param }
      //   })
      //   .then(function(result) {
      //     if (result.value.length > 0) {
      //       console.log("限时特价列表：");
      //       me.specialsActivity = result.value;
      //     }
      //     console.log(result);
      //   })
      //   .catch(function() {
      //     console.log("出错了");
      //   });
    },
    /* 获取成品推荐列表*/
    getProduct() {
      // var me = this;
      // var param = {
      //   value: {
      //     // pid: 1,
      //     // id:2
      //   }
      // };
      // param = JSON.stringify(param);
      // me.$http
      //   .post({
      //     url: me.GLOBAL.serviceHepler.conn.indexactivitydiscountpackageList,
      //     data: { param: param }
      //   })
      //   .then(function(result) {
      //     console.log("法国海军麦凯")
      //       me.productActivity = result.value[0].indexactivityproductrecommend;
      //       me.customCombination = result.value[1].indexactivityproductrecommend;
      //   });
    },
    /* 倒计时*/
    setCountDown() {
      var me = this;
      me.countTime = [];
      var time = 1000;
      var timeoutStatus = false;
      console.log("----------计时分割线---------");
      me.time.forEach(function(key, index) {
        console.log(key);
        me.countTime.push(me.GLOBAL.utilHelper.remainTime(key));
        if (key <= 0) {
          key = 0;
          console.log("已截止");
        } else {
          timeoutStatus = true;
          me.$set(me.time, index, (key -= time));
        }
        var formatTime = me.GLOBAL.utilHelper.remainTime(key);
        console.log(formatTime);
      });
      if (timeoutStatus) {
        me.timer = setTimeout(me.setCountDown, time);
      }
    },
    /* 前往商品详情页*/
    toGoodsDetails(itemid) {
      console.log(itemid);
      const url = "/pages/productdetails/main?id=" + itemid + "&cid=" + itemid;
      mpvue.navigateTo({ url });
    }
  }
};
</script>

<style>
.conDiv {
  background: #f8f8f8; 
}
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
.tabPtop{
  width: 100%;
  padding-top: 75px;
}
.tabPtop img{
  width: 100%;

}
.activeCon {
  width: 100%;
  overflow: hidden;
}
.activeItem {
  margin-bottom: 5px;
  padding: 5px;
  background-color: white;
}
.itemImage {
  width: 100%;
  height: 115px;
}
.itemImage img {
  width: 100%;
  height: 100%;
}
.itemTitle {
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.remainTime {
  font-size: 14px;
  color: #f00;
  font-weight: bold;
  padding: 15px 0;
}
.remainTime span {
  display: inline-block;
  margin-left: 5px;
}
.itemMan {
  margin-top: 50px;
}
.discountTitle {
  display: inline-block;
  border: 1px solid #f00;
  padding: 2px;
}
.oldPriceTitle {
  display: inline-block;
}
.itemPrice {
  float: left;
}
.currentPrice {
  font-size: 14px;
  color: #f00;
  font-weight: bold;
}
.originalPrice {
  font-size: 10px;
  color: #666;
  margin-top: 2px;
  text-decoration: line-through;
}
.buyBtn {
  float: right;
  font-size: 14px;
  color: white;
  width: 80px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  border-radius: 0.75rem;
  background-image: linear-gradient(90deg, #e93b3d, #ff9574);
  box-shadow: 0 0.1rem 0.25rem 0 rgba(233, 59, 61, 0.2);
}
.left {
  float: left;
}
.limitTime {
  color: #f00;
  margin-left: 5px;
  font-size: 14px;
  font-family: "Times New Roman";
}
/* 优惠套餐*/
.combTitle {
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.combFooter {
  float: right;
}
.footerTag {
  border: 1px solid #f00;
  padding: 2px;
  font-size: 14px;
  color: #f00;
}
.footerPrice {
  color: #f00;
  font-size: 16px;
  font-weight: bold;
}
.manTitle {
  text-align: center;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  padding: 5px;
  position: relative;
  color:mediumspringgreen
}
.manTitle:after,
.manTitle:before {
  content: "";
  position: absolute;
  top: 52%;
  background: #bebebe;
  width: 39%;
  height: 1px;
}
.manTitle:before {
  right: 0;
}
.manTitle:after {
  left: 0;
}
</style>
