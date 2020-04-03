<template>
  <div class="allStyle container">
    <!-- 名片呈现 -->
    <div class="card"></div>
    <!-- 轮播图 -->
    <swiper :swiper="swiper"></swiper>
    <!-- 爆款推荐 -->
    <swiperHot :hotData="hotData"></swiperHot>
    <!-- VR全景 -->
    <swiperVR :vrData="vrData"></swiperVR>
    <!-- 产品相册 -->
    <swiperPic :picData="picData"></swiperPic>
    <!-- 悬浮按钮 -->
    <y-button></y-button>
    <div class="laodMore">
      <div v-show="logStatus === 0">
        <div>上拉加载</div>
      </div>
      <div v-show="logStatus === 1">
        <div>正在加载</div>
      </div>
      <div v-show="logStatus === 2">
        <div>没有更多数据了</div>
      </div>
    </div>
  </div>
</template>

<script>
import swiper from '../../components/swiper'
import YButton from '../../components/YButton'
import swiperHot from '../../components/swiperHot'
import swiperVR  from '../../components/swiperVR'
import swiperPic from '../../components/swiperPic'
export default {
  data() {
    return {
      swiper:[],
      hotGoods:[],
      activeStart: false,
      logStatus:"",
      noData: false,
      vrData:[
        {
          aaa:[
            {
              name:"aaa",
              img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
            },
            {
              name:"aaa",
              img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
            },
            {
              name:"aaa",
              img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
            },
            {
              name:"aaa",
              img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
            },
            {
              name:"aaa",
              img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
            },
            {
              name:"aaa",
              img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
            }
          ]
        },
        {
          aaa:[
            {
              name:"aaa",
              img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
            },
            {
              name:"aaa",
              img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
            },
            {
              name:"aaa",
              img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
            },
            {
              name:"aaa",
              img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
            },
            {
              name:"aaa",
              img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
            },
            {
              name:"aaa",
              img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
            }
          ]
        },
        {
          aaa:[
            {
              name:"aaa",
              img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
            },
            {
              name:"aaa",
              img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
            },
            {
              name:"aaa",
              img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
            },
            {
              name:"aaa",
              img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
            },
            {
              name:"aaa",
              img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
            },
            {
              name:"aaa",
              img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
            }
          ]
        }
      ],
      hotData:[
        {
          aaa:[
            {
              name:"aaa",
              img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
              price:"123",
              sale:"998"
            },
            {
              name:"aaa",
              img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
              price:"123",
              sale:"998"
            }
          ]
        },
        {
          aaa:[
            {
              name:"aaa",
              img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
              price:"123",
              sale:"998"
            },
            {
              name:"aaa",
              img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
              price:"123",
              sale:"998"
            }
          ]
        },
        {
          aaa:[
            {
              name:"aaa",
              img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
              price:"123",
              sale:"998"
            },
            {
              name:"aaa",
              img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
              price:"123",
              sale:"998"
            }
          ]
        }
      ],
      picData:[
        {
          aaa:[
            {
              name:"aaa",
              img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
            },
            {
              name:"aaa",
              img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
            },
            {
              name:"aaa",
              img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
            },
            {
              name:"aaa",
              img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
            }
          ]
        },
        {
          aaa:[
            {
              name:"aaa",
              img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
            },
            {
              name:"aaa",
              img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
            },
            {
              name:"aaa",
              img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
            },
            {
              name:"aaa",
              img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
            }
          ]
        },
        {
          aaa:[
            {
              name:"aaa",
              img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
            },
            {
              name:"aaa",
              img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
            },
            {
              name:"aaa",
              img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
            },
            {
              name:"aaa",
              img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg",
            }
          ]
        }
      ],
      animate: false
    };
  },
  components: {
    swiper,
    YButton,
    swiperHot,
    swiperVR,
    swiperPic
  },
  onShareAppMessage: function() {
    return {
      title: "做任务赢积分",
      imageUrl: "/images/a.png"
    };
  },
  //页面加载的时候
  onLoad() {
    var that = this;
  },
  //页面显示后加载
  onShow() {
    //请求数据，操作dom，放在这个里面 必须记住
    var me = this;
    //获取首页广告类型数据包含：轮播图  海报  热销  成品
    var groupParams = {
      value: {
        sdata: "1"
      }
    };
    groupParams = JSON.stringify(groupParams);
    me.$http.post({
      url: me.GLOBAL.serviceHepler.conn.loop_info,
      data: {
        param: groupParams
      }
    }).then(result => {
      //先清空后加载  以免forEach循环多次加入数组
      this.swiper = [];
      this.poster = "";
      this.hotGoods = [];
      this.endProdect = [];
      result.value.forEach(item => {
        if (item.mode == 0) {
          this.swiper.push(item);
        } else if (item.mode == 1) {
          this.poster = item.photoUrl;
        } else if (item.mode == 2) {
          this.hotGoods.push(item);
        } else {
          this.endProdect.push(item);
        }
      });
      let listArr = []
      let tempArr = []
      for (const i in this.hotGoods) {
        if(i%(this.hotGoods.length/2) == 0){
          listArr.push(this.hotGoods[i])
          console.log(listArr)
        }else{
          tempArr.push(this.hotGoods[i])
          console.log(tempArr)
        }
      }
    }).catch(() => {
      console.log("出错了");
    });
  },
  //下拉刷新事件
  onPullDownRefresh () {
    console.log('下拉刷新')
    mpvue.stopPullDownRefresh()
  },
  //上拉加载事件
  onReachBottom () {
    console.log('上拉加载')
  },
  //跳转详情页的事件
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
  }
};
</script>

<style scoped>
/*卡片 */
.card{
  width: 95%;
  height: 200px;
  border: 1px solid #000;
  border-radius: 10px;
  margin: 5px 0;
}
/* 消息滚动 */
#msgBox {
  width: 100%;
  height: 30px;
  overflow: hidden;
  /* padding-left: 30px; */
  /* border: 1px solid black; */
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  font-size: 12px;
  text-align: center;
}

.anim {
  transition: all 0.5s;
  margin-top: -30px;
}

#msgLi li {
  list-style: none;
  line-height: 30px;
  height: 30px;
}

#msgLi li div {
  width: 15px;
  height: 15px;
  line-height: 15px;
  border-radius: 50%;
  background: #fff;
  text-align: center;
  display: inline-block;
}
#msgLi li div img {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}
/* 消息滚动 */

.allStyle {
  background-color: #f8f8f8;
  width: 100%;
  overflow: hidden;
  height: 100%;
  /* margin-top: 40px; */
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
  /* background-color: blue; */
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
.allContentBg {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  margin-top: 10px;
  /* background: #270ea1; */
  /* margin-top: 35px; */
}
.activeImg {
  width: 100%;
  height: 270px;
  background: skyblue;
}
.activeImg image {
  width: 95%;
  height: 250px;
  text-align: center;
  margin: 10px;
}
.activeTime {
  width: 100%;
  height: 40px;
  position: relative;
  font-size: 12px;
  color: #fff;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
}
.activeTime .time {
  width: 50%;
  height: 40px;
  border: 1px solid #aaa;
  border-left: none;
  border-top: none;
  border-bottom: none;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  text-align: center;
  display: inline-block;
  background: #f96705;
}
.activeTime .time .van-icon {
  vertical-align: middle;
}
.activeTime .sortTime {
  width: 57%;
  line-height: 40px;
  font-size: 12px;
  display: inline-block;
  padding-left: 5px;
  text-align: center;
}
.contain {
  width: 100%;
  border-bottom: 1px solid #aaa;
}
.list span {
  margin-top: 10px;
  display: block;
  width: 100%;
  font-size: 14px;
  text-align: center;
  color: red;
}
.list p {
  display: block;
  width: 100%;
  font-size: 14px;
  text-align: center;
  margin-bottom: 10px;
}
.share {
  width: 100%;
  height: 50px;
}
.pushRecieve {
  border: 1px solid #eee;
  line-height: 50px;
  font-size: 14px;
  text-align: center;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  padding-left: 20px;
  background: url("http://110.185.161.69:58005/ffff//2a09659c965abf550b7d9ea139b454ee/lALPDgQ9rupEEwHMyMzI_200_200.png");
  background-size: 50rpx 50rpx;
  background-repeat: no-repeat;
  background-position: 15px 15px;
}
.activeRecieve {
  border: 1px solid #eee;
  line-height: 50px;
  font-size: 16px;
  text-align: center;
  color: #fff;
  border-top-left-radius: 15px;
  background: #f96705;
  border-bottom-left-radius: 15px;
}
.share p image {
  display: inline-block;
}
.styleLession {
  line-height: 40px;
  font-size: 14px;
  text-align: center;
  padding-left: 10px;
}
.section {
  line-height: 55px;
  margin: 10px 0px 0px 10px;
  font-size: 14px;
  border-bottom: 1px solid #eee;
}
.picker {
  margin-bottom: 15px !important;
  margin-left: 7px;
}
.quickRecieve {
  width: 30%;
  margin-top: 10px;
  background: #f30;
  color: #fff;
  line-height: 35px;
  font-size: 16px;
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



