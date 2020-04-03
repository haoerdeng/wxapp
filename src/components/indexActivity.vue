<template>
  <div class="activeContainer">
    <van-row gutter="2">
      <van-col span="12">
        <div class="activeItem" @click="toActivityPage(1)">
          <div class="itemTitle left">秒杀活动</div>
          <div class="timeDiv left">
            <van-icon name="clock-o" /><span>{{timeList[0].remainTime}}</span>
          </div>
          <div style="clear: both"></div>
          <van-row gutter="10">
            <van-col span="12"  v-for="(items, indexs) in spikeActivitys" :key="indexs">
              <div>
                <div class="imgCont">
                  <img  :src="items.image" alt="">
                </div>
                <div class="currentPrice">￥{{items.discountprice}}</div>
                <div class="originalPrice">￥{{items.price}}</div>
              </div>
            </van-col>
          </van-row>
        </div>
      </van-col>
      <van-col span="12">
        <div class="activeItem" @click="toActivityPage(0)">
          <div class="itemTitle left">限时抢购</div>
          <div class="timeDiv left">
            <van-icon name="clock-o" /><span>{{timeList[0].remainTime}}</span>
          </div>
          <div style="clear: both"></div>
          <van-row gutter="10">
            <van-col span="12"  v-for="(item, index) in spikeActivity" :key="index">
              <div>
                <div class="imgCont">
                  <img :src="item.image" alt="">
                </div>
                <div class="currentPrice">￥{{item.discountprice}}</div>
                <div class="originalPrice">￥{{item.price}}</div>
              </div>
            </van-col>
          </van-row>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
  export default {
    name: "indexActivity",
    data(){
      return {
        timeList: [
          {remainTime:1562737348000},
          {remainTime:1557991625},
          {remainTime:1557991625}
        ]
      }
    },
    computed:{
      imgFormate:function() {
        var me = this;
        me.spikeActivity.forEach(function(i){
          i.image = me.cloudIP + i.image;
        });
        return me.spikeActivity
      },
      imgFormates:function(){
        var me = this;
        me.spikeActivitys.forEach(function(i){
          i.image = me.cloudIP + i.image;
        });
        return me.spikeActivitys
      }
    },
    props: {
      spikeActivity: {
        type: Array
      },
      spikeActivitys: {
        type:Array
      }
    },
    onLoad() {
      console.log("-----------------------")
      var remain = this.timeList[0].remainTime-new Date().getTime();
      console.log(this.GLOBAL.utilHelper.fromatDate(this.timeList[0].remainTime,1));
      console.log(this.GLOBAL.utilHelper.fromatDate(new Date().getTime(),1));
      console.log(remain);
      console.log(this.GLOBAL.utilHelper.remainTime(remain))
      /*console.log(this.GLOBAL.utilHelper.fromatDate(remain,1))*/
    },
    methods: {
      toActivityPage(index) {
        this.$parent.toActivityPage(index)
      }
    }
  };
</script>

<style scoped>
.activeContainer {
  padding: 10px;
}
.activeItem{
  background-color: white;
  padding: 5px;
}
  .itemTitle{
    font-size: 14px;
    display: -webkit-box;
    -webkit-line-clamp:1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    height: 25px;
    line-height: 25px;
  }
  .imgCont{
    width: 100%;
    height:80px;
  }
  .imgCont img{
    width: 100%;
    height: 100%;
  }
  .currentPrice{
    font-size: 12px;
    color: #f00;
    font-weight: bold;
    text-align: center;
  }
  .originalPrice{
    font-size: 10px;
    color: #666;
    text-align: center;
    text-decoration:line-through
  }
  /* 限时秒杀*/
  .left { 
    float: left;
  }
  .timeDiv {
    color: #f00;
    font-size: 12px;
    text-align: center;
    margin-left: 5px;
    height: 25px;
    line-height: 25px;
  }
</style>
