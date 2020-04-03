<template>
  <div style="width:100%;">
    <swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500" indicator-active-color="#fff" :circular='true' >
      <block v-for="(item, index) in swiper" :key="index">
        <swiper-item >
            <image :src="item.photoUrl" class="slide-image" onclick="toGoodsDetails"/> 
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
    swiper: {
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
  height: 150px !important;
  /* height: 100%; */
}
image {
  height: 100%;
  width: 100%;
}
</style>


