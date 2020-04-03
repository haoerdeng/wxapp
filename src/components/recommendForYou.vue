<template style="background:#fff">
    <div style="padding: 0rpx 30rpx;">
        <div class="content">
            <div class="title">
                <p>为你推荐</p>
            </div>
            <div class="nav">
                <div class="img">
                    <img src="/static/images/12.jpg" alt="">
                    <p>￥<b>399</b>.00</p>
                </div>
                <div class="img">
                    <img src="/static/images/12.jpg" alt="">
                    <p>￥<b>1278</b>.00</p>
                </div>
                <div class="style">
                    <ul>
                        <li>欧式</li>
                        <li>美式</li>
                        <li>中式</li>
                    </ul>
                </div>
            </div>
            <div style="clear:both"></div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.content{
    background-color: #fff;
    margin-bottom: 20rpx;
}
.title p{
    font-size: 28rpx;
    padding: 10rpx 30rpx;
}
.img{
    width: 25%;
    padding-left:30rpx;
    display: inline-block;
    text-align: center;
}
.img img{
    width: 180rpx;
    height: 180rpx;
    display: block;
    text-align: center;
}
.img p{
    color:#f00;
    font-size: 24rpx;
    display: inline-block;
    text-align: center;
    padding-bottom: 10rpx;
}
.img p b{
    font-weight: normal;
    font-size: 28rpx;
    display: inline-block;
}
.style{
    float: right;
    width: 30%;
    margin-right: 30rpx;
}
.style ul li{
    padding: 10rpx 25rpx;
    background-color: #eee;
    margin-bottom: 10rpx;
    text-align: center;
    font-size: 28rpx;
    color:#333
}
</style>

