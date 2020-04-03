<template>
  <div class="container">
    <div class="headerContent">
      <div :style="{height:statusBarHeight + 'px'}"></div>
      <div class="containerHeader">
        <div  @click="clickBack()">
          <image src="/static/images/back.png" class="img"></image>
        </div>
        <text class="title" style="margin-top:10px">商品列表</text>
      </div>
    </div>
    <form action="/">
      <van-search placeholder="请输入搜索关键词"
                  :value="searchWords"
                  @search="onSearch"
                  @cancel="onCancel">
      </van-search>
    </form>
    <div class="content">
      暂无相关商品，换一个关键词试试
      <div class="contentImg">
        <img src="/static/images/noPro.png" alt="">
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        searchWords:'',
        statusBarHeight:0
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
    methods: {
      clickBack:function(){
        const url = '/pages/index/index/main';
        mpvue.switchTab({url});
      },
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
          url:me.GLOBAL.serviceHepler.conn.search_items,
          data:{
            param:param
          }
        }).then(function(result) {
          var url = '';
          console.log(result.value.length);
          if(result.value.length>0){
            url = '/pages/categoriesDetails/main?searchWords='+searchWords;
            mpvue.navigateTo({url});
          }else {
            me.reload()
          }
        }).catch(function() {
          console.log("出错了");
        })
      }
    }
  }
</script>
<style scoped>
.content{
  text-align: center;
  color: #8a8a8a;
  font-size: 16px;
  margin-top: 80px;
}
.contentImg {
  width: 100px;
  height: 100px;
  margin: 20px auto;
}
img{
  width: 100%;
  height: 100%;
}
.headerContent{
  background: #fff;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  position: fixed;
  z-index: 99;
}
.containerHeader{
  padding-bottom: 10px;
}
.img{
  position: fixed;
  left: 0;
  width:20px;
  height:20px;
  padding:0 10px;
  margin:5px 0;
}
</style>
