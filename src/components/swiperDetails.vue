<template>
  <div>
    <swiper class="swiper"
            indicator-dots="true"
            autoplay="true"
            interval="3000"
            duration="500"
            indicator-active-color="#fff"
            circular="true"
    >
      <block v-for="(item,index) in Newbanner" :key="index">
          <swiper-item>
              <image :src="item.imageAddress" class="slide-image" mode="aspectFill"/>
          </swiper-item>
      </block>
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    Newbanner: []
  },
  // computed:{
  //   imgFormate:function() {
  //     var me = this;
  //     me.myArray.forEach(function(i,j){
  //       console.log(i,j)
  //       me.myArray[j] = me.constIP + i;
  //     });
  //     return me.myArray
  //   }
  // },
}
</script>

<style scoped>
.swiper {
  height: 375px !important;
}
image {
  height: 100%;
  width: 100%;
}
</style>


