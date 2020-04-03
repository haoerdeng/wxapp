<template>
  <div style="background:#f8f8f8;" class="container">
    <!-- <div class="headerContent">
      <div :style="{height:statusBarHeight + 'px'}"></div>
      <div class="containerHeader">
        <div  @click="clickBack">
          <image src="/static/images/back.png" class="img"></image>
        </div>
        <text class="title">新春有艾' 宅家GO</text>
      </div>
    </div> -->
    <div class="content">
      <div class="contentTop">
        <p>推荐好友扫码进入,每个好友都有再获取奖励</p>
      </div>
      <div class="step">
        <p>第一步:长按下方海报保存图片发送到朋友圈</p>
        <img src="/static/images/1.png" alt="">
      </div>
      <div class="step">
        <p>第二步:好友识别二维码进入活动即可领取推荐奖励</p>
      </div>
      <div class="line">
      </div>
      <div class="activeImg">
        <img src="/static/images/1.png" alt="">
      </div>
    </div>
  </div>
</template>


<script>
  //注意:创建页面的时候 必须暴露  否则卡死
  export default {
    data() {
      return {
        statusBarHeight:0,
        id:"",
        goIn:"",
        specialId:"",
      }
    },
    components: {
      
    },
    onLoad(){
      let me = this;
      wx.getSystemInfo({
        success: function (res) {
          console.log(res)
          console.log(res.statusBarHeight)
          me.statusBarHeight = res.statusBarHeight + 12
        },
      })
      
    },
    onShow(){
      
      
    },
    onReady(){
      this.stepperShow = true;
      this.goIn = this.$root.$mp.query.goIn
      console.log(this.goIn)
      this.specialId = this.$root.$mp.query.specialId
      console.log(this.specialId)
    },
    
    methods:{
      /*返回上一页*/
      clickBack:function(){
        console.log("点击")
        const url = '/pages/active/main';
        mpvue.switchTab({url})
      },
    },
  };
</script>

<style scoped>
  .content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    /* margin-top:145rpx; */
  }
  .contentTop{
    width: 100%;
  }
  .step{
    width: 100%;
    margin-top: 10px;
  }
  .step p {
    width: 100%;
    font-size: 16px;
    margin-left: 5px;
  }
  .step img{
    width: 95%;
    display: block;
    margin: 0 auto;
    margin-top: 15px;
  }
  .activeImg img{
    width: 95%;
    display: block;
    margin: 0 auto;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .line{
    border: 1px solid #eee;
    width: 100%;
    margin: 20px 0px;
  }
  .contentTop p {
    width: 100%;
    color:red;
    font-size: 16px;
    margin-left: 10px;
  }
  .containerHeader{
    z-index: 99;
    margin-bottom: 7px;
  }
  .img{
    position: fixed;
    left: 0;
    width:20px;
    height:20px;
    padding:0 10px;
    margin:5px 0;
    display: inline-block
  }
  .headerContent{
    background: #fff;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    position: fixed;
    z-index: 99;
  }
  
</style>
