<template>
  <div class="guessLove">
    <p>猜你喜欢</p>
    <div class="guessContent">
        <div class="oneConent" v-for="(itemName, index) in image" :key="index">
            <image :src="itemName.image" class="guessImg"/>
            <text class="guessName">{{itemName.title}}</text>
            <text class="guessMoney">￥{{itemName.price}}</text>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        image:{
            type:Array
        }
    },
  data() {
    return {
     
    };
  }
};
</script>
<style scoped>
.guessLove{
    margin-top: 10rpx;
    background: #fff;
}
.guessLove p{
    padding: 10rpx;
    font-size: 30rpx;
}
.oneConent:nth-child(3n+1){
    border-left: none
}
.oneConent{
    width: 33%;
    display: flex;
    flex-wrap:wrap;
    border-top: 1rpx solid #ccc;
    border-left: 1rpx solid #ccc;    
}

page{
    width: 100%;
    height: 100%;
}
.swiper{
    height: 500rpx;
}
p{
    font-size: 32rpx;
}
.guessContent {
    display: flex;
    flex-wrap:wrap;
}
.guessImg {
    height: 150rpx;
    margin-top: 20rpx;
    padding: 0 20rpx;
}
.guessName {
    padding: 2px 20rpx;
    width: 100%;
    font-size: 24rpx;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-align: left;
}
.guessMoney {
    text-align: left;
    font-size: 24rpx;
    color: #f00;
    padding: 2px 18rpx;
}

image {
    height: 100%;
    width: 100%;
}
</style>

