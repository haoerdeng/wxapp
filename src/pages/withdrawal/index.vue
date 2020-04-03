<template>
  <div class="withdrawal">
    <div class="title">
      <p>提现至微信零钱</p>
    </div>

    <div class="moneyValue">
      <van-icon name="balance-o" size="40px" />
      <input type="text" v-model="money" />
    </div>
    <div class="tips">
      <div class="tipsIcon">
        <van-icon name="info-o" color="#FF6600" />
      </div>
      <div class="text">
        <p>最低提现金额10.00元</p>
        <p>微信最大提现金额2000元</p>
        <p>不需要手续费即可提现哦，每日可提现一次</p>
      </div>
    </div>
    <div class="btnWrap">
      <button @click="apply">申请提现</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "withdrawal",
  data() {
    return {
      money: "0.00"
    };
  },
  methods: {
    apply() {}
  }
};
</script>

<style scoped>
.withdrawal {
  width: 100%;
  height: 100%;
}

.title {
  width: 100%;
  height: 120px;
  line-height: 120px;
  padding-left: 10px;
}

.moneyValue {
  width: 90%;
  height: 60px;
  margin: auto;
  border-bottom: 1px solid #e8e8e8;
}

.moneyValue input {
  display: inline-block;
  margin-left: 1%;
  width: 60%;
}

.tips {
  width: 90%;
  height: auto;
  margin: 10px auto;
  display: flex;
}

.tipsIcon {
  margin-right: 1%;
}

.btnWrap {
  width: 100%;
  margin-top: 60px;
  text-align: center;
}

.btnWrap button{
  width: 80%;
  /* height: 60px; */
  border-radius: 5px;
  background: #FF6600;
  color: #fff;
}
</style>