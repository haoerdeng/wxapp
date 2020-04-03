<template>
    <div>
        <div class="content">
            <div class="nav">
                <p class="explosion">爆款推荐</p>
                <div class="explosionDetails">
                    <ul>
                        <li v-for="(item,index) in arr" :key="index">
                            <img :src="item.img" alt="">
                            <p>{{item.title}}</p>
                            <span>￥<b>{{item.price}}</b>.00</span>
                        </li>
                    </ul>
                </div>
                <div style="clear:both"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        arr:Array
    }
}
</script>
<style scoped>
.content{
    padding:0rpx 0rpx 0rpx 30rpx;
    width: 100%;
}
.nav{
    background-color: #fff;
}
.explosion{
    padding: 10rpx 25rpx;
    font-size: 28rpx;
}
.explosionDetails{
    padding: 0rpx 20rpx;
    width: 100%;
    
}
.explosionDetails ul{
    width: 100%;
    
}
.explosionDetails ul li{
    float: left;
    width: 150rpx;
    margin-right: 30rpx;
}
.explosionDetails ul li img{
    width: 150rpx;
    height: 150rpx;
}
.explosionDetails ul li p{
    overflow: hidden;/*超出部分隐藏*/
    white-space: nowrap;/*不换行*/
    text-overflow:ellipsis;/*超出部分文字以...显示*/
    font-size: 24rpx;
}
.explosionDetails ul li span{
    text-align: center;
    display: inline-block;
    color:#f00;
    font-size: 24rpx;
}
.explosionDetails ul li span b{
    font-weight: normal;
    display: inline-block
}
</style>
