<template>
  <div id="ytable">
    <van-row>
      <van-col span="6" style="text-align: center;">
        <van-cell :title="title1" />
      </van-col>
      <van-col span="6" style="text-align: center;">
        <van-cell :title="title2" />
      </van-col>
      <van-col span="12" style="text-align: center;">
        <van-cell :title="title3" />
      </van-col>
    </van-row>

    <van-row style="margin-bottom: 30px;" v-for="item in data" :key="item.id">
      <van-col span="6" style="text-align: center;">
        <van-cell :title="item.money" />
      </van-col>
      <van-col span="6" style="text-align: center;">
          <van-cell :icon="item.res" />
      </van-col>
      <van-col span="12" style="text-align: center;">
        <van-cell :title="item.time" />
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: "ytable",
  props: {
    title1: {
      type: String,
      default: "提现金额"
    },
    title2: {
      type: String,
      default: "执行结果"
    },
    title3: {
      type: String,
      default: "操作时间"
    },
    data: Array
  }
};
</script>

<style scoped>
#ytable {
  width: 100%;
  height: 100%;
}
</style>