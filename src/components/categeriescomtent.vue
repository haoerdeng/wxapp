<template>
  <div class="categoryCont">
    顶部图片
    <div class="goods-banner">
      <image class="img-banner" src="../../static/images/listbanner.jpg"  mode="scaleToFill"></image>
    </div>
    <!--商品展示-->
    <div class="goods-list"  v-for="(item, index) in categeriescomtent" :key="index">
      <div class="goods-title">{{item.name}}</div>
      <div class="goods" v-for="(item2, index2) in item.children" :key="index2"  :data-listid="item2.id" @click="toCtgDetails">
        <image class="imgdiv" :src="item2.images"></image>
        <text>{{item2.name}}</text>
      </div>
    </div>
    <!--<div>套餐推荐</div>
    <div>免费预约</div>-->
  </div>

</template>

<script>
  export default {
    props: {
      categeriescomtent: {
        type: Array
      }
    },
    computed: {
      imgFormate: function() {
        var me = this;
        me.categeriescomtent.forEach(function(i) {
          i.children.forEach(function(i) {
            i.images = me.constIP + i.images;
          });
        });
        return me.categeriescomtent
      }
    },
    methods: {
      toCtgDetails(e){
        this.$parent.toCtgDetails(e.currentTarget.dataset.listid)
      }
    }
  };
</script>

<style scoped>
  .categoryCont{
    padding: 20px;
  }

  /* 第一版*/
  .img-banner {
    height: 75px;
    width: 100%;
  }
  .goods-list{
    display:flex;
    flex-wrap:wrap;
    margin-top:15px;
  }
  .goods-title{
    width:100%;
    font-size:15px;
    font-weight:bold;
    padding-left:5px;
  }
  .goods{
    width:75px;
    font-size:14px;
    margin:8px;
    text-align:center;
  }
  .imgdiv {
    width: 70px;
    height: 70px;
  }
</style>
