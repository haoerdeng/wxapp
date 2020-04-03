<template>
    <div style="background-color: white;">
      <van-row>
        <van-col span="12">
          <div class="left">
            <span class="divName">9.9元包邮</span>
            <span class="leftTag">低价好货天天有</span>
            <div v-for="(item, index) in groupBuy" :key="index" class="imgContent lowPrice">
              <image :src="item.pic"></image>
              <div class="price">￥{{item.price}}</div>
            </div>
          </div>
        </van-col>
        <van-col span="6">
          <div class="right">
            <span class="divName">1元福利</span>
            <div v-for="(item, index) in oneBuy" :key="index" class="imgContent">
              <image :src="item.pic"></image>
              <div class="price">￥1</div>
            </div>
          </div>
        </van-col>
        <van-col span="6">
          <div class="right">
            <span class="divName">砍价0元领</span>
            <div v-for="(item, index) in zeroBuy" :key="index" class="imgContent">
              <image :src="item.pic"></image>
              <div class="price">￥1</div>
            </div>
          </div>
        </van-col>
      </van-row>
    </div>
</template>

<script>
  export default {
    props: {
      groupBuy: {
        type: Array
      },
      oneBuy: {
        type: Array
      },
      zeroBuy: {
        type: Array
      }
    },
  };
</script>

<style scoped>
  template{
    box-sizing: border-box;
    background-color: lightblue;
  }
.left {
  border-top: 1px solid #ddd;
  text-align:center;
}
  .right {
    border-top: 1px solid #ddd;
    border-left: 1px solid #ddd;
    height: 130px;
    text-align:center;
  }
  .divName {
    font-size: 14px;
  }
  .leftTag {
    display: inline-block;
    margin-left: 5px;
    font-size: 10px;
    color: #ccc;
  }
  .imgContent {
    width: 98%;
    height: 100px;
    float: left;
  }
  .lowPrice{
    width: 50%;
  }
  .imgContent image {
    width: 70%;
    height: 70%;
  }
  .price{
    font-size: 12px;
    color: #e01222;
    font-weight: bold;
  }
</style>
