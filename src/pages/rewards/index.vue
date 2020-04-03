<template>
  <div class="rewards">
    <header>
      <div class="amountWithdrawal">
        <p>提现中金额(元)</p>
        <p style="color: #EA5623;">{{money}}</p>
      </div>

      <div class="balanceWrap">
        <div class="amountWithdrawn">
          <p>{{amountWithdrawn}}</p>
          <p>已提现金额(元)</p>
        </div>
        <div class="balance">
          <p>{{balance}}</p>
          <p>账户余额(元)</p>
        </div>
      </div>
    </header>

    <section>
      <div class="btnWrap">
          <button class="withdrawalBtn" @click="withdrawalClick">立即提现</button>
      </div>
      <commonSetting :listData="listData"></commonSetting>
    </section>
  </div>
</template>

<script>
import commonSetting from "@/components/commonSettings";
export default {
  name: "rewards",
  data() {
    return {
      money: 15.62,
      amountWithdrawn: 346.265,
      balance: 64.348,
      listData: [
        { title: "提现记录", url: "/pages/withdrawalSubsidiary/main", icon: "friends-o" }
      ]
    };
  },
  components: {
    commonSetting
  },
  methods: {
    callBack() {
      mpvue.switchTab({ url: "/pages/myShop/main" });
    },
    withdrawalClick(){
      mpvue.navigateTo({ url: "/pages/withdrawal/main" });
    }
  }
};
</script>

<style scoped>
header {
  width: 100%;
  height: 250px;
  background: #2a2f3b;
  text-align: center;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

header .amountWithdrawal {
  line-height: 78rpx;
}

.balanceWrap {
  width: 80%;
  margin: auto;
  border: 1px solid #e8e8e8;
  border-radius: 10rpx;
  padding: 15px 0;
  position: absolute;
  display: flex;
  font-size: 12px;
  bottom: -10%;
  background: #fff;
  color: #000;
  z-index: 9;
}

.amountWithdrawn {
  border-right: 1px solid #000;
}

.amountWithdrawn,
.balance {
  width: 50%;
  padding: 0 15px;
  text-align: center;
}

.btnWrap {
    width: 100%;
    padding-top: 100px;
    padding-bottom: 10px;
    text-align: center;
}

.withdrawalBtn {
    width: 180px;
    border-radius: 20px;
    border: none;
    color: #fff;
    background-color: sandybrown;
    font-weight: 800;
}
</style>