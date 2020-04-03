<template>
    <div style="background-color: white">
      <swiper :indicator-active-color="indicatorActiveColor" class="swipers">
        <swiper-item>
          <van-row type="flex" justify="space-around">
            <van-col span="6" class="list-item"  v-for="(item,index) in icon" :key="index" @click="iconClick">
              <van-icon :name="item.icon"/>
              <div>{{item.title}}</div>
            </van-col>
          </van-row>
        </swiper-item>
      </swiper>
    </div>

</template>

<script>
export default {
  props: {
    icon: {
      type: Array
    }
  },
  computed:{
    imgFormate:function() {
      var me = this;
      me.icon.forEach(function(i){
        i.icon = me.constIP + i.icon;
      });
      return this.icon
    }
  },
  methods:{
    iconClick(e){
      this.$emit('iconClick', e)
    }
  }
};
</script>

<style scoped>
van-icon {
  display: inline-block;
  width: 100%;
  height: 100%;
  vertical-align: middle;
  padding-top: 10px;
}
.list-item {
  color: #666;
  text-align: center;
  margin-bottom: 10px;
  background-clip: content-box;
  font-size: 12px;
}

.swipers {
  height: 100px;
}
image {
  height: 100%;
  width: 100%;
}
.card {
  padding: 10px;
}
</style>


