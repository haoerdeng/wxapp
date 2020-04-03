<template>
<div class="goods">
  <ul class="goodsContent">
    <li class="toProductDetails"  v-for="(item, index) in goodsList" :key="index" :data-goodsid="item.id" :data-kidsid="item.cid" @click="toProductDetails">
      <van-row>
        <van-col span="8">
          <div class="goodsImage" >
            <image :src="item.imageAdd" alt=""/>
          </div>
        </van-col>
        <van-col span="16" class="goodsBrief">
          <div class="briefName">{{item.itemName}}</div>
          <div class="briefTag"><span>{{item.itemNameSecond}}</span></div>
          <div style="clear: both"></div>
          <div class="briefPrice">￥{{item.price}}</div>
          <div class="briefComment">{{'总销量：' + item.totalSales}}</div> <!-- {{item.num}} -->
        </van-col>
      </van-row>
    </li>
  </ul>
</div>
</template>

<script>
  export default {
    props: {
      goodsList: {
        type: Array
      },
      categoryImg:[]
    },
    computed: {
      // imgFormate: function() {
      //   var me = this;
      //   me.goodsList.forEach(function(i) {
      //     i.image = me.constIP + i.image;
      //   });
      //   return me.goodsList
      // }
    },
    methods: {
      toProductDetails(e) {
        this.$parent.toProductDetails(e.currentTarget.dataset.goodsid,e.currentTarget.dataset.kidsid)
      }
    }
  };
</script>

<style scoped>
  .goods{
    width: 100%;
  }
  ul{
    list-style:none;
    font-size: 14px;
    width: 100%;
  }
  /*商品列表*/
  /* .goodsContent {
    border-top: 1px solid #ddd;
  } */
  .goodsImage {
    width: 100px;
    height: 100px;
    padding: 10px;
  }
  image{
    width: 100%;
    height: 100%;
  }
  .briefName {
    border-top: 1px solid #ddd;
    padding-top: 8px ;
    font-size: 14px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .goodsContent li:first-of-type .briefName{
    border-top: 0px solid #ddd;
  }
  .briefTag{
    font-size: 10px;
  }
  .briefTag span {
    float: left;
    background-color: rgba(221,221,221,.4);
    padding: 2px;
    height: 16px;
    text-align: center;
    color:#bbb;
    display: -webkit-box;
    -webkit-line-clamp:1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height:16px;

  }

  .briefPrice {
    margin-top: 5px;
    font-size: 16px;
    color: #e01222;
  }
  .briefComment{
    font-size: 10px;
    color: #aaa;
    line-height: 16px;
    height: 16px;
  }
</style>
