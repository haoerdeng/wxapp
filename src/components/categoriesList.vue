<template>
  <scroll-view class='left-navbar' scroll-y="true" @click="navbarTap">
    <!--<view v-for="(item, index) in categoriesList" :key="index" :class="currentTab === index ? 'active' : ''"
           @click="navbarTap"  :data-screenid="item.id" :data-tapid="index">
      {{item.name}}
    </view>-->
    <view id="customized" :class="currentTab === 'customized' ? 'active' : ''">
      全屋定制
    </view>
    <view id="finishProduct" :class="currentTab === 'finishProduct' ? 'active' : ''">
      成品推荐
    </view>
  </scroll-view>

</template>

<script>
  export default {
    data() {
      return {
        currentTab:0,  //对应样式变化

      }
    },
    props: {
      categoriesList: {
        type: Array
      },
      categoriesId:{
        type:Number
      }
    },
    methods: {
      navbarTap(e) {
        if (this.currentTab !== e.target.dataset.tapid) {
          var kidsId = e.target.dataset.screenid;
          this.currentTab = e.target.dataset.tapid;
          this.$parent.changeRight(kidsId);
        }
      }
    }
  };
</script>

<style scoped>
  .left-navbar{
    position:absolute;
    left:0;
    width:25%;
    height:512px;
    background-color:#eee;
    font-size:12px;
    white-space: nowrap;
    display: flex;
  }
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }
  .left-navbar view {
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .active{
    background-color:#FFF;
    color:red;
    font-size:14px;
  }
</style>
