<template>
<div>
    <van-swipe-cell  :right-width="80" :close="onClose">
        <van-cell-group>
            <ul class="goodsContent">
                <li class="toProductDetails"  @click="toProductDetails">
                <van-row ><!-- v-for="(item, index) in collectionList" :key="index" :data-goodsid="item.id" :data-kidsid="item.cid"-->
                    <van-col span="8">
                    <div class="goodsImage">
                        <image src="/static/images/12.jpg" alt=""/> <!--:src="item.image"-->
                    </div>
                    </van-col>
                    <van-col span="16" class="goodsBrief">
                    <div class="briefName">12345上山打老虎,12345上山打老虎,12345上山打老虎,12345上山打老虎,12345上山打老虎,12345上山打老虎,12345上山打老虎</div> <!-- {{item.title}}-->
                    <div style="clear: both"></div>
                    <div class="briefPrice">￥299.00</div><!--{{item.price}}-->
                    </van-col>
                </van-row>
                </li>
            </ul>
        </van-cell-group>
        <view slot="right" class="del">
            取消收藏
        </view>
    </van-swipe-cell>
</div>
</template>

<script>
  export default {
    props: {
      collectionList: {
        type: Array
      }
    },
    methods: {
        toProductDetails(e) {
            this.$parent.toProductDetails(e.currentTarget.dataset.goodsid,e.currentTarget.dataset.kidsid)
        },
        onClose(event) {
            const { position, instance } = event.detail;
            switch (position) {
            case 'left':
            case 'cell':
                instance.close();
                break;
            case 'right':
                Dialog.confirm({
                message: '确定删除吗？'
                }).then(() => {
                instance.close();
                });
                break;
            }
        }
    }
  };
</script>

<style scoped>
    ul{
        list-style:none;
        font-size: 14px;
        width: 100%;
    }
  /*商品列表*/
    .goodsContent {
        border-top: 1px solid #ddd;
        background-color: #fff
    }
    .goodsImage {
        width: 100px;
        height: 100px;
        padding: 5px;
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
    .briefPrice {
        margin-top: 5px;
        font-size: 16px;
        color: #e01222;
        text-align-last: left;
        margin-top: 70rpx;
        margin-left: 20rpx;
    }
    .briefComment{
        font-size: 10px;
        color: #aaa;
        line-height: 16px;
        height: 16px;
    }
    .del{
        width: 80px;
        height: 110px;
        color:#fff;
        background-color: #e01222;
        padding-right: 0rpx;
        overflow: hidden;
        font-size: 16px;
        text-align: center;
        line-height: 110px
    }
</style>
