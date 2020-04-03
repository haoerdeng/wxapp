<template>
  <div class="allStyle container">
    <div class="allContentBg">
      <div style="width:100%;">
        <swiper class="swiper" @change="swiperChange" :indicator-dots="true"  :duration="500" indicator-active-color="#fff" :circular='true' >
          <block v-for="(item, index) in swiper" :key="index">
            <swiper-item >
                <image :src="item.photoUrl" class="slide-image" @click="toGoodsDetails(item)"/> 
            </swiper-item>
          </block>
        </swiper>
        <!-- <div class="imageCount">{{current+1}}/{{swiper.length}}</div> -->
      </div>
      <div class="propagate">
        <p>嘿！李兰妈妈~ 哇？ 都从口那绕~~~~~ 也不拎个老四，也不拎个笼，也不拎个违法佛么要厚嘿！李兰妈妈~ 哇？ 都从口那绕~~~~~ 也不拎个老四，也不拎个笼，也不拎个违法佛么要厚</p>
      </div>
      <div class="functional">
        <van-row>
          <van-col span="5">
            <button class="share" open-type="share">
              <img src="/static/icons/shares.png" alt="">
              <p>分享</p>
            </button>
          </van-col>
          <van-col span="5">
            <button class="collection" @click="collecte">
              <img :src="collections" alt="" v-if="status == 1">
              <img :src="collections" alt="" v-else>
              <p v-if="status == 1">收藏</p>
              <p v-else>已收藏</p>
            </button>
          </van-col>
          <van-col span="14">
            <button class="wantDesign" @click="toFree">我要免费设计同款</button>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="VRurl" @click="linkToVR">
      <p>VR <br/>实景</p>
    </div>
    <y-button></y-button>
  </div>
</template>

<script>
import YButton from '../../components/YButton'
// import swiper from "@/components/swiper";
export default {
  data() {
    return {
      searchWords:'',
      swiper:[
        {
          photoUrl:"/static/images/1.jpg"
        },{
          photoUrl:"/static/images/2.jpg"
        }
      ],
      collections:"/static/icons/good.png",
      statusBarHeight:0,
      linkTo:false,
      status:1
    };
  },
  components: {
    // swiper,
    YButton
  },
  /**
   * 分享
   */
  onShareAppMessage(res){
    // let gbid = res.target.dataset.info.order_id;
    return {
      title: '分享',
      path: '/pages/details/main',
      imageUrl: 'https://......./img/groupshare.png',  //用户分享出去的自定义图片大小为5:4,
      success: function (res) {
        // 转发成功
        wx.showToast({
          title: "分享成功",
          icon: 'success',
          duration: 2000
        })
      },
      fail: function (res) {
        // 分享失败
      },
    }
  },
  onLoad(){
    var that = this
    
  },
  swiperChange: function (e) {
    console.log(e.detail)
    console.log(e.detail.source)
    var that = this;
    if (e.detail.source == 'touch') {
      that.setData({
        current: e.detail.current
      })
    }
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
    /**
     *收藏事件
     */
    collecte(){
      console.log(this.status)
      if(this.status == 1){
        this.collections = "/static/icons/good-selected.png"
        console.log("我在第一次里面")
        this.status = 0
        console.log(this.status)
      }else{
        this.status = 1
        console.log("我在第er次里面")
        this.collections = "/static/icons/good.png"
        console.log(this.status)
      }
    },
    //点击进入VR实景
    linkToVR:function(){
      console.log("我点击了VR")
      const url = "/pages/out/main"
      mpvue.navigateTo({url})
    },
    /*返回上一页*/
    clickBack:function(){
      console.log("点击")
      const url = '/pages/case/main';
      mpvue.switchTab({url})
    },
    /*
    *跳转到免费预约
    */
    toFree(){
      console.log("点击")
      // const url = "https://www.lyiggroup.com/"
      const url = '/pages/freeBooking/main';
      mpvue.navigateTo({url})
    },
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
.VRurl{
  color: #fff;
  position: fixed;
  left: 0;
  top: 25%;
  font-size: 12px;
  background: rgba(228, 95, 95, 0.6);
  border-radius: 50%;
  width: 45px;
  height: 45px;
  text-align: center;
  margin-top: 10px;
}
.VRurl p {
  padding-top: 8px;
}
.allStyle{
  background-color: #fff;
  width: 100%;
  overflow: hidden;
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
.propagate p{
  width: 95%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  text-indent: 0.5rem;
  -webkit-line-clamp:3;
  line-height: 25px;
  font-size: 16px;
  word-break: break-all;
  -webkit-box-orient: vertical;
  text-align: center;
  margin: 0 auto;
  margin-top: 15px;
}
.functional{
  width: 100%;
  margin: 20px 0px;
}
.share::after{
  border: none !important;
  outline: none !important;
}
.collection::after{
  border: none !important;
  outline: none !important;
}
.functional .share{
  width: 100%;
  margin: 0 auto; 
  background-color: transparent;
  background: #fff;
  overflow:visible;
  padding:0
}
.share img{
  display: block;
  margin: 0 auto;
  text-align: center;
  width: 25px;
  height: 25px;
}
.share p {
  text-align: center;
  font-size: 12px;
  position: relative;
  top:-5px
}
.functional .collection{
  width: 100%;
  margin: 0 auto;
  
  background: #fff;
}
.collection img{
  display: block;
  margin: 0 auto;
  text-align: center;
  width: 25px;
  height: 25px;
}
.collection p {
  text-align: center;
  font-size: 12px;
  position: relative;
  top:-5px
}
.wantDesign{
  width: 90%;
  display: block;
  background: #f30;
  color:#fff;
  border-radius: 15px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
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
  position: relative;
}
.swiper {
  width: 100%;
  height: 250px !important;
  /* height: 100%; */
}
.imageCount {
  width:120rpx;
  height:50rpx;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius:40rpx;
  line-height:50rpx;
  color:#fff;
  text-align:center;
  font-size:26rpx;
  position:absolute;
  left:13px;
  bottom:20rpx;
}

image {
  height: 100%;
  width: 100%;
}
</style>


