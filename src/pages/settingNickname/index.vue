<template>
  <div class="settingDiv">
    <div class="inputBorder">
      <input @confirm="changeNickname" confirm-type="done" focus/>
    </div>
    <p class="inputTips">注意：昵称最多为6位，不得包含敏感词汇，否则艾格家具有权收回</p>
    <div class="payContent">保存</div>
  </div>
</template>


<script>
export default {
  data() {
    return {
    }
  },
  methods:{
    changeNickname(e){
      console.log(e.target.value);
      const url="/pages/settingPersonal/main";
      mpvue.navigateTo({url})
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
  .inputBorder{
    color: #333;
    height: 40px;
    line-height: 40px;
    background-color: white;
    border-radius: 5px;
  }
  .inputTips{
    margin-top: 5px;
    color: #666;
    font-size: 14px;
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
