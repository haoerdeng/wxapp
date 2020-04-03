<template>
  <div class="settingDiv">
    <div class="inputTitle">请输入手机号码</div>
    <van-row gutter="20" class="inputContent">
      <van-col span="4">+86</van-col>
      <van-col span="18" class="inputBorder">
        <input @confirm="changeNickname" confirm-type="done" focus placeholder="手机号码"/>
      </van-col>
    </van-row>

    <div class="payContent" @click="saveNumber">保存</div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      newNumber:''
    }
  },
  methods:{
    changeNickname(e){
      this.newNumber = e.target.value;
    },
    saveNumber(){
      console.log(this.newNumber);
      /*const url="/pages/settingPersonal/main";
      mpvue.navigateTo({url})*/
    }
  }

};
</script>

<style scoped>
  .settingDiv{
    background-color: #f8f8f8;
    min-height:100vh;
    padding:9px 15px;
  }
  .inputTitle{
    color: #333;
    font-size: 14px;
  }
  .inputContent{
    font-size: 14px;
  }
  .inputBorder{
    color: #333;
    height: 40px;
    line-height: 40px;
    background-color: white;
    border-radius: 5px;
  }
  .payContent {
    background-color:rgb(255, 51, 51) ;
    margin-top: 5px;
    color: white;
    border-radius: 5px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
  }
</style>
