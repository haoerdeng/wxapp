<template>
  <div class="ybutton">
    <div class="rbox" @click="navigateToShare">
      <van-icon name="share" color="red" />
      <span v-if="text">{{text}}</span>
    </div>

    <div class="wbox" @click="navigateToDesign">
      <p>0元 <br/>设计</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ybutton",
  data() {
    return {};
  },
  props: {},
  methods: {
    navigateToShare() {
      const url = "/pages/share/main?specialId=" + 1;
      mpvue.navigateTo({ url });
    },
    navigateToDesign() {
      const url = "/pages/freeBooking/main";
      mpvue.navigateTo({ url });
    }
  }
};
</script>

<style scoped>
.ybutton {
  color: #fff;
  position: fixed;
  right: 0;
  top: 15%;
  font-size: 12px;
}
.rbox {
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  width: 45px;
  height: 45px;
  text-align: center;
  line-height: 45px;
}

.wbox {
  background: rgba(228, 95, 95, 0.6);
  border-radius: 50%;
  width: 45px;
  height: 45px;
  text-align: center;
  margin-top: 10px;
}
.wbox p {
  padding-top: 8px;
}
</style>