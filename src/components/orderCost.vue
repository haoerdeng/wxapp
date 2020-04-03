<template>
    <div class="costDiv">
      <div class="toPay">
        <div class="payContent" @click="commitOrder">微信支付</div>
        <div class="complate" @click="testPay">测试完成支付</div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "orderCost",
    methods:{
      commitOrder(){
        this.$emit('commitOrder');
      },
      testPay(){
        this.$parent.testPay();
      }
    }
  };
</script>

<style scoped>
  .costDiv {
    width: 100%;
    background-color: white;
    font-size: 14px;
    padding: 14px;
    position: relative;
    overflow-x: hidden;
    box-sizing:border-box;
  }

  .toPay {
    margin-top: 20px;
    padding: 5px;
  }
  .payContent {
    background-color:#439057 ;
    color: white;
    border-radius: 5px;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }
  .complate{
    background-color:#439057 ;
    color: white;
    border-radius: 5px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    margin-top: 10px;
  }
</style>
