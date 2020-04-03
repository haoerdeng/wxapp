<template>
  <div>
    <van-submit-bar
      :price="totalAmountArr.totalAmount"
      button-text="提交订单"
      @submit="onClickButton"
      custom-class="van-submit-bar"
      :tip="false"
      :disabled="totalAmountArr.commitStatus"
    >
      <div class="checkAll" @click="onChange">
        <van-checkbox :value="totalAmountArr.checkAll">全选</van-checkbox>
      </div>
      </van-submit-bar>
  </div>
</template>
<script>
  export default {
    props: {
      totalAmountArr: {}
    },
    methods: {
      onClickButton() {
        this.$parent.toCommitOrder();
      },
      onChange(){
        console.log(this.totalAmountArr.checkAll);
        var status = this.totalAmountArr.checkAll?'0':'1';
        this.$parent.handleAllStatus(status);
      }
    }
  };
</script>
<style scoped>
  .checkAll {
    margin-left: 7px;
  }

</style>
