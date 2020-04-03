<template>
  <div style="width:100%;background:#fff;margin-bottom:10px">
    <div class="contTitle">爆款推荐</div>
    <div class="contTitles" @click="toMore">更多>></div>
    <swiper class="swiper" :indicator-dots="true"  :duration="500" indicator-active-color="red" :circular='true' >
      <block v-for="(item, index) in hotData" :key="index">
        <swiper-item >
          <van-row custom-class="rowStyle">
            <van-col span="12" v-for="(items,indexs) in item.aaa" :key="indexs">
              <image :src="items.img" class="slide-image" onclick="toGoodsDetails"/>
              <span>{{items.name}}</span>
              <van-col span="12" class="sale">
                已售:{{items.sale}}
              </van-col>
              <van-col span="12" class="price">
                <span style="color:red;display:inline-block;font-size:20px;font-weight:normal">¥</span> {{items.price}}
              </van-col>
            </van-col>
          </van-row>
        </swiper-item>
      </block>
    </swiper>
  </div>
</template>

<script>


export default {
  data(){
    return{
      
    }
  },
  props: {
    hotData: {
      type: Array
    },
    
  },
  // computed:{
  //   imgFormate:function() {
  //     var me = this;
  //     // this.swiper.forEach(function(i){
  //     //   i.image = me.cloudIP + i.image;
  //     // });
  //     this.tt.forEach(function(i){
  //       i.image = me.cloudIP + i.image;
  //     });
  //     return this.tt
  //   }
  // },
  
  methods:{
    toGoodsDetails:function(e){
      console.log("???????????")
    },
    clickSwiper:function(){
      console.log("?????")
      let id = '6c32a319-6851-460f-ace7-165d7984991b'
      const url = '/pages/productdetails/main?id=' + id;
      mpvue.redirectTo({url})
    },
    clickSwip:function(){
      
      console.log("?????")
      let id = '5a420063-0c16-4d26-8a03-1f18aaa9ead9'
      const url = '/pages/productdetails/main?id=' + id;
      mpvue.redirectTo({url})
    }
  }
};
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 240px;
}
.contTitle{
  line-height: 30px;
  font-size: 16px;
  padding: 5px 10px;
  display: inline-block;
  color:#000;
  background: #fff;
}
.contTitles{
  float: right;
  font-size: 14px;
  margin-top: 10px;
  margin-right: 10px;
}
image {
  width: 100%;
}
.slide-image{
  width: 95%;
  height: 150px;
  display: block;
  text-align: center;
  margin: 0 auto;
}
.rowStyle span{
  display: block;
  text-align: center;
  line-height: 30px;
}
.priceSale{
  width: 95%;
  display: block;
  text-align: center;
  margin: 0 auto;
}
.price{
  width: 95%;
  display: block;
  text-align: center;
  margin: 0 auto;
}
.sale{
  width: 95%;
  display: block;
  text-align: center;
  margin: 0 auto;
  line-height: 30px;
  font-size: 14px;
}
</style>


