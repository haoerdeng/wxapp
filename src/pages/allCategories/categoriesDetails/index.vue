<template>
  <div class="container">
    <form action="/" style="width:100%;">
      <van-search placeholder="请输入搜索关键词"
                  :value="searchWords"
                  @search="onSearch"
                  @cancel="onCancel">
      </van-search>
    </form>
    <div class="filter">
      <ul class="filter1Content" @click="rank">
        <li class="filter-col1" data-rank="multiple" :class="{'active':active[0]}">综合</li>
        <li class="filter-col1" data-rank="selectseniority" :class="{'active':active[1]}">销量</li>
        <li class="filter-col1" data-rank="instore" :class="{'active':active[2]}">最新上架</li>
        <li class="filter-col1" data-rank="price" :class="{'active':active[3]}">价格</li>
      </ul>
      <div style="clear: both"></div>
      <van-cell-group :class="hide === 'price' ? '' : 'hide'" @click="priceSelect" class="priceDiv">
        <van-cell title="价格从低到高" :class="{price:price[0]}" value=" " data-index="0"></van-cell>
        <van-cell title="价格从高到低" :class="{price:price[1]}" value=" " data-index="1" ></van-cell>
      </van-cell-group>

      <!--<div class="filter2Content">
        <van-row type="flex" gutter="10">
          <van-col span="6" class="filter-col2"><div class="col2-item">领优惠券</div></van-col>
          <van-col span="6" class="filter-col2"><div class="col2-item">领优惠券</div></van-col>
          <van-col span="6" class="filter-col2"><div class="col2-item">领优惠券</div></van-col>
          <van-col span="6" class="filter-col2"><div class="col2-item">领优惠券</div></van-col>
        </van-row>
      </div>-->
    </div>
    <goodsList :goodsList="goodsList" :categoryImg="categoryImg"></goodsList>
  </div>
</template>

<script>
import goodsList from "@/components/goodsList";
export default {
  data () {
    return {
      active:[],/* 排序样式显示*/
      show:false,/* 价格排序下拉框显示*/
      price:[],/* 价格下拉框样式显示*/
      priceActive:[true,false],
      hide:null,
      goodsList:[],
      param:{
        value:{
          // salesvolume:''
        }
      },
      url:'',
      categoryImg:[],
      statusBarHeight:0,
      storeImg:{}
    }
  },
  components: {
    goodsList
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
  onShow() {           //请求数据，操作dom，放在这个里面 必须记住
    var me=this;
    let pages = getCurrentPages();
    console.log(pages)
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    console.log(currPage)
    console.log(prevPage)
    me.show = false;
    me.hide = null;
    me.active = [true,false,false,false];
    me.price = [false,false];
    // me.param.value.salesvolume = "";
    var cid = me.$root.$mp.query.id; //接受其他页面传来的数据
    var searchWords = me.$root.$mp.query.searchWords;
    if(cid) {
      me.param.value.id = cid;
      delete me.param.value.searchWords;
      me.url = me.GLOBAL.serviceHepler.conn.item_select_item_attr;
    }else if(searchWords) {
      me.param.value.title = searchWords;
      me.url = me.GLOBAL.serviceHepler.conn.item_select_item_blur;
    }
    me.getList();
  },
  methods: {
    clickBack:function(){
      const url = '/pages/allCategories/category/main';
      mpvue.switchTab({url})
    },
    getList() {
      var me = this;
      me.goodsList = []
      var param = JSON.stringify(me.param);
      me.$http.post({
        url:me.url,
        data:{
          param:param
        }
      }).then((result) => {
        console.log(result);
        me.goodsList = result.value;
        me.goodsList.forEach(item => {
          this.storeImg = item.imageInfo.filter(o => o.pid == 0)
          console.log(this.storeImg[0].imageAddress)
          item['imageAdd'] = this.storeImg[0].imageAddress
          console.log(item)
        });
        console.log(me.goodsList)
      }).catch((err) => {
        console.log("出错了");
      })

    },
    toProductDetails(goodsid,kidsid) {
      console.log("商品id:"+goodsid+"；种类id:"+kidsid);

      wx.setStorage({
        key:"goodsId",
        data:goodsid
      })
      console.log(goodsid)
      const url = '/pages/productdetails/main?id='+goodsid+"&cid="+kidsid;
      mpvue.navigateTo({url})
    },
    onSearch(e) {
      var me=this;
      var searchWords = e.mp.detail;
      me.param.value.title = searchWords;
      delete me.param.value.cid;
      me.url = me.GLOBAL.serviceHepler.conn.item_select_item_blur;
      var param ={
        value:{
          title:searchWords
        }
      };
      param = JSON.stringify(param);
      me.$http.post({
        url:me.url,
        data:{
          param:param
        }
      }).then(function(result) {
        var url = '';
        if(result.value.length>0){
          me.goodsList = result.value;
        }else{
          url = '/pages/blankPage/main';
          mpvue.navigateTo({url});
        }
      }).catch(function() {
        console.log("出错了");
      });
      me.active = [true,false,false,false];
      me.price = [false,false];
    },
    priceSelect(event){
      var me = this;
      var index = event.target.dataset.index;
      console.log(index);
      switch (index) {
        case '0':
          me.priceActive = [true,false];
          me.param.value.salesvolume = 3;
          me.hide = null;
          me.price = [true,false];
          me.getList();
          break;
        case '1':
          me.priceActive = [false,true];
          me.param.value.salesvolume = 4;
          me.hide = null;
          me.price = [false,true];
          me.getList();
          break;
      }
    },
    rank(event){
      var me = this;
      console.log(me.param);
      var rankName = event.target.dataset.rank;
      me.active = [false,false,false,false];
      me.hide = me.hide === rankName ? null:rankName;
      switch (rankName) {
        case "multiple":
          me.active[0] = true;
          me.param.value.salesvolume = '';
          me.price = [false,false];
          me.getList();
          break;
        case "selectseniority":
          me.active[1] = true;
          me.param.value.salesvolume = 1;
          me.price = [false,false];
          me.getList();
          break;
        case "instore":
          me.active[2] = true;
          me.param.value.salesvolume = 2;
          me.price = [false,false];
          me.getList();
          break;
        case "price":
          me.show = true;
          me.active[3] = true;
        /*me.param.value.salesvolume = 3;*/
          break;
      }
    }
  }
}
</script>

<style scoped>
  ul{
    list-style:none;
    font-size: 14px;
    width: 100%;
  }
  li{
    float: left;
  }
  .active {
    color: #f50;
  }
  .van-cell {
    color: #f50 !important;
  }
  .hide {
    display: none;
  }
  /*filter*/
  .filter1Content {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    height: 35px;
    color: #333;
  }
  .filter-col1{
    text-align: center;
    width: 90px;
    font-size: 14px;
    height: 35px;
    line-height: 35px;
  }
</style>
<style>
  .price .van-cell {
    color: #f50 !important;
  }
  .priceDiv {
    position: absolute !important;
    width: 100% !important;
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
    position: fixed;
    text-align: center;
    margin: 0 auto;
    background: #fff;
    z-index: 99;
    width: 100%;
    margin-bottom: 20px;
  }
</style>
