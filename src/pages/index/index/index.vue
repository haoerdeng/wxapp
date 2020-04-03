<template>
    <div class="allContentBg">
      <form action="/" style="width:100%;">
        <van-search placeholder="请输入搜索关键词"
                    :value="searchWords"
                    @search="onSearch"
                    @cancel="onCancel">
        </van-search>
      </form>
      <div style="width:100%;">
        <swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500" indicator-active-color="#fff" :circular='true' >
          <block v-for="(item, index) in swiper" :key="index">
            <swiper-item >
                <image :src="item.photoUrl" class="slide-image" @click="toGoodsDetails(item)"/> 
            </swiper-item>
          </block>
        </swiper>
      </div>
      <!-- <swiper :swiper="swiper"/> -->

      <div style="background:#fff;width:100%;height:2px"></div>
      <div class="adv">
        <img :src="poster" alt="">
      </div>
      <!-- <indexActivity :spikeActivity="spikeActivity" :spikeActivitys="spikeActivitys"></indexActivity> -->
      <indexHotGoods :hotGoods="hotGoods"></indexHotGoods>
      <!-- <indexCoupon ></indexCoupon> -->
      <endProdect :endProdect="endProdect"></endProdect>
    </div>
    <!-- <houseCustomization></houseCustomization> -->
    <!-- <card :icon="icon" @iconClick="iconClick"></card> -->
    <!-- <test :hotList="hotList" :groupBuy="groupBuy" ></test> -->
     <!-- <choiceness :pickList="pickList"></choiceness> --> 
</template>

<script>
import swiper from "@/components/swiper";
import indexActivity from "@/components/indexActivity";
import indexHotGoods from "@/components/indexHotGoods";
import indexCoupon from "@/components/indexCoupon";
import endProdect from "@/components/endProdect";
import houseCustomization from "@/components/houseCustomization";
// import card from "@/components/card";
// import choiceness from "@/components/choiceness";
// import test from "@/components/test";
export default {
  data() {
    return {
      searchWords:'',
      swiper:[],
      spikeActivity:[], //  现实抢购
      spikeActivitys:[], // 秒杀活动
      // icon:[],
      pickList:[],
      hotList: [],
      groupBuy:[],
      poster:"",
      hotGoods:[],       //  热销产品 
      endProdect:[],
      statusBarHeight:0,
      linkTo:false
    };
  },
  components: {
    // swiper,
    indexActivity, //活动
    indexHotGoods, //热销产品
    indexCoupon, //优惠券
    endProdect,
    houseCustomization
    /*card,*/
    // choiceness,
    // test
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
    //请求数据，操作dom，放在这个里面 必须记住
    var me=this;
    //获取首页广告类型数据包含：轮播图  海报  热销  成品
    var groupParams={
      value:{
        "sdata":"1"
      }
    };
    groupParams=JSON.stringify(groupParams);
    me.$http.post({
      url:me.GLOBAL.serviceHepler.conn.loop_info,
      data:{
        param:groupParams
      }
    }).then((result)=>{
      //先清空后加载  以免forEach循环多次加入数组
      this.swiper = []
      this.poster = ""
      this.hotGoods = []
      this.endProdect = []
      result.value.forEach(item => {
        if(item.mode == 0){
          this.swiper.push(item)
        }else if(item.mode == 1){
          this.poster = item.photoUrl
        }else if(item.mode == 2){
          this.hotGoods.push(item)
        }else{
          this.endProdect.push(item)
        }
      });
    }).catch(()=>{
      console.log("出错了");
    })
  },
  methods: {
    /* 搜索*/
    onSearch(e) {
      var me=this;
      var searchWords = e.mp.detail;
      var param ={
        value:{
          title:searchWords
        }
      };
      param = JSON.stringify(param);
      me.$http.post({
        url:me.GLOBAL.serviceHepler.conn.item_select_item_blur,
        data:{
          param:param
        }
      }).then(function(result) {
        var url = '';
        if(result.value.length>0){
          url = '/pages/allCategories/categoriesDetails/main?searchWords='+searchWords;
        }else{
          url = '/pages/blankPage/main'
        }
        mpvue.redirectTo({url});
      }).catch(function() {
        console.log("出错了");
      })
    },
    toGoodsDetails(e){
      console.log(e)
      if(e.photoType == "2"){
        const url = '/pages/freeBooking/main?specialId=' + 1
        mpvue.redirectTo({url})
        console.log(url)
      }else if(e.photoType == "1"){
        const url = '/pages/productdetails/main?id=' +  e.jumpUrl + '&specialId=' + 1
        mpvue.redirectTo({url})
        console.log(url)
      }else{
        console.log("别惦记我")
      }
    },
    
    /* 点击活动跳转到活动页面*/
    // toActivityPage(index) {
    //   const url = '/pages/activity/main';
    //   mpvue.switchTab({url});
    //   wx.setStorage({
    //     key:'activityIndex',
    //     data:index
    //   });
    // },
    /* /!* icon区点击事件*!/
    iconClick(e){
      console.log(e);
      const url = '/pages/categoriesDetails/main?id='+15;
      mpvue.navigateTo({url})
    }*/
  },

};
</script>

<style scoped>
.allStyle{
  background-color: #f8f8f8;
  width: 100%;
  overflow: hidden;
}
.adv{
  width: 100%;
  height: 450px;
}
.adv img{
  width: 100%;
  height: 100%;
}
.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
.all {
  width: 7.5rem;
  height: 1rem;
  background-color: blue;
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
.all:after {
  display: block;
  content: "";
  clear: both;
}
.message {
  color: red;
  padding: 10px;
  text-align: center;
}
.allContentBg{
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #270ea1;
}
.swiper {
  width: 100%;
  height: 150px !important;
  /* height: 100%; */
}
image {
  height: 100%;
  width: 100%;
}
</style>



