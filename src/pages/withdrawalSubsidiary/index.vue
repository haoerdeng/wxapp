<template>
  <div class="withdrawalSubsidiary">
    <ytable :data="data"></ytable>
  </div>
</template>

<script>
import ytable from "../../components/YTable";
export default {
  name: "withdrawalSubsidiary",
  data() {
    return {
      data:[
        {money:"20.00",res:"passed",time:"2020-20-20 20:20:20"},
        {money:"20.00",res:"close",time:"2020-20-20 20:20:20"},
        {money:"20.00",res:"close",time:"2020-20-20 20:20:20"},
        {money:"20.00",res:"passed",time:"2020-20-20 20:20:20"},
        {money:"20.00",res:"close",time:"2020-20-20 20:20:20"},
      ]
    };
  },
  components: {
    ytable
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

.btnWrap button {
  width: 80%;
  /* height: 60px; */
  border-radius: 5px;
  background: #ff6600;
  color: #fff;
}
</style>