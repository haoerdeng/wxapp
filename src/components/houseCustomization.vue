<template>
  <div class="bookingDiv">
      <div class="top">
        <van-row gutter="5">
          <van-col span="9">
              <van-field placeholder="请输入您的姓名" @change="onFirstChange" id="firstInput" v-model="firstValueName" />
          </van-col>
          <van-col span="15">
            <van-filed>
              <div class="section">
                <picker mode="region" @change="bindRegionChange($event)" :value="regionData" :custom-item="customItem">
                  <!-- <view class="picker">{{regionData}}</view> -->
                  <input type="text" class="picker" placeholder="选择地址" :value="regionData">
                </picker>
              </div>
            </van-filed>
          </van-col>
          <van-col span="24">
              <van-field 
                placeholder="填写手机领取1888元设计礼包" 
                @change="onSecondChange" 
                id="secondInput"  
                :name="txn_tel" 
                v-model="verificationCode" 
                :error-message="Phonemessage" 
                :maxlength="11"
                :disabled="disabled"
                required
                clearable
              />     
          </van-col>
          <van-col span="24">
              <van-field 
                placeholder="验证码" 
                use-button-slot 
                > 
                <van-button slot="button" size="small" type="danger" @click="getCode" id="authCode" v-if="isShowCode">发送验证码</van-button> 
                <van-button slot="button" size="small" type="danger" @click="getphonenumbe" id="authCode" v-else>{{count}}s</van-button> 
              </van-field>      
          </van-col>
        </van-row>
        <button @click="design" class="bottom">抢1元设计</button>
        <!-- <van-button @click="design" size="large" type="danger" class="bottom" custom-class="bottom">抢1元设计</van-button> -->
      </div> 
  </div>
</template>


<script>
export default {
  data() {
    return {
      firstValueName:'',
      secoedValuePhone:'',
      verificationCode:'',
      unKnown:1,
      areaList:[],
      region: [],
      customItem: '全部',
      isShowCode:true,
      count: '',
      timer: null,
      Phonemessage:"",
      disabled:false,
      choiceAddress:"选择地址",
      regionData:""
    }
  },
  computed:{
    imgFormate:function() {
      var me = this;
      me.areaList.forEach(function(i){
        i.picture = me.cloudIP + i.picture;    // image / picture
      });
      return me.areaList
    },
    },
  onShow() {
    var me = this;
    me.getUname();
  },
  methods:{
    getUname(){
      var me = this;
      var param = {
        value:{
              // 空 字段
        }
      };
      param = JSON.stringify(param);
      me.$http.post({
        url:me.GLOBAL.serviceHepler.conn.receivingaddress_list,
        data:{param:param}
      }).then(function(result){
        console.log("打印 NULL value 字段");
        console.log(result);
      })
    },
    bindRegionChange(e) {
      console.log('picker发送选择改变，携带值为', e.mp.detail.value)
      this.region = e.mp.detail.value;
      this.regionData = this.region[0] + this.region[1] + this.region[2]
    },
    getCode(){
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.isShowCode = false;
        this.timer = setInterval(() => {
        if (this.count > 0 && this.count <= TIME_COUNT) {
          this.count--;
        } else {
          this.isShowCode = true;
          clearInterval(this.timer);
          this.timer = null;
        }
        }, 1000)
      }
    }  ,
    onSecondChange(event) {
      let phone = event.mp.detail
      let Reg = /^1[345789]\d{9}$/;
      let message = '';
      let disable = '';
      console.log(phone)
      if(!Reg.test(parseInt(phone))){
        console.log(!Reg.test(parseInt(phone)))
        message = '您输入的手机号码有误';
        this.Phonemessage = message
        if(phone == ""){
          message = '';
          this.Phonemessage = message
        }
      }else{
        message = '';
        this.Phonemessage = message
      }
    },
  }
}
</script>

<style scoped>
  page{
    height:100%;
  } 
  .top{
    width: 95%;
    margin: 0 auto;
    background:linear-gradient(bottom, #ff5d74, #ff9966);
    z-index: 99;
  }
  .bookingDiv>img{
    width: 100%;
    display: block;
    height: 100%;
  }
  .bottom{
    width:100px;
    height:40px;
    line-height: 40px;
    margin:0 auto;
    font-size: 14px;
    border-radius: 5px;
    margin-top: 10px;
    border: none;
    background: #f44;
    color: #fff
  }
  .picker{
    font-size: 14px;
    height: 43px;
    line-height: 43px;
    border-bottom: 1px solid #f1f1f1;
    opacity: 0.7;
    /* margin-bottom: 10px; */
    background: #fff;
  }
  .section{
    width: 100%;
    margin: 0 auto;
  }
  .van-cell{
      background: none !important;
  }

</style>
