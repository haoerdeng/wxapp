<template>
  <div class="settingDiv">
    <div style="width:100%;border-top:1px solid #eee"></div>
    <div class="container" v-for="(item,index) in resultData" :key="index">
      <van-row>
        <van-col span="20">
          <div class="addressContent">
            <div class="addressHeader">
              <p>{{item.receiverName}}</p>
              <span>{{item.receiverPhone}}</span>
            </div>
            <div class="address">
              <span v-if="defalut">默认</span>
              <p>{{item.receiverCity + item.receiverAddress}}</p>
            </div>
          </div>
        </van-col>
        <van-col span="4">
          <div class="addressRight">
            <div class="addressEdit">
              <div class="line">|</div>
              <p @click="editAddress(item.receiverName,item.receiverPhone,item.receiverCity,item.receiverAddress,item.id,item.receiverState)">编辑</p>
            </div>
          </div>
        </van-col>
      </van-row>
    </div>
    
    <div class="payContent" @click="addAddress">新增收货地址</div>
  </div>
</template>
<script>
export default {
  props: {
    defalut: false,
    userInfo: {
      nickName: "",
      avatarUrl: "",
      userId: ""
    },
    consignee: "",
    defaultAddress: "",
    detailedAddress: "",
    location: "",
    memberId: "",
    telephone: "",
    resultData: "",
    id:""
  },
  onShow(){
    var me = this;
    var param = {
      value: {
        userId: JSON.stringify(me.userInfo.userId)
      }
    };
    me.$http.post({
      url: me.GLOBAL.serviceHepler.conn.receivingaddress_list,
      data: {
        param: JSON.stringify(param)
      }
    }).then((result)=>{
      console.log(result.value);
      me.resultData = result.value;
      me.telephone = result.value.telephone;
    })
    .catch(()=>{
      console.log("出错了");
    });
  },
  onLoad() {
    var me = this;
    var param = {
      value: {
        userId: JSON.stringify(me.userInfo.userId)
      }
    };
    me.$http
      .post({
        url: me.GLOBAL.serviceHepler.conn.receivingaddress_list,
        data: {
          param: JSON.stringify(param)
        }
      })
      .then((result)=>{
        console.log(result.value);
        me.resultData = result.value;
        me.telephone = result.value.telephone;
      })
      .catch(()=>{
        console.log("出错了");
      });
  },
  methods: {
    addAddress: function() {
      const url = "/pages/addAddress/main";
      // mpvue.navigateTo({ url });
      mpvue.redirectTo({ url })                   
    },
    editAddress(consignee,telephone,location,detailedAddress,id,receiverState) {
      console.log("这破B微信小程序")
      var me = this;
      var param = {
        telephone:telephone,
        detailedAddress:detailedAddress,
        consignee:consignee,
        location:location,
        id:id,
        receiverState:receiverState
      }
      console.log(JSON.stringify(param))
      const url = "/pages/editAddress/main?param=" + JSON.stringify(param);
      mpvue.redirectTo({ url })
    }
  }
};
</script>
<style scoped>
.settingDiv {
  background-color: #fff;
  min-height: 100vh;
  width: 100%;
  padding-top: 60px;
  /* padding: 0px 15px; */
}
.payContent {
  background-color: rgb(255, 51, 51);
  margin-top: 5px;
  color: white;
  display: block;
  border-radius: 5px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  width: 90%;
  margin: 10px auto;
}
.addressContent {
  padding: 0 10px;
}
.addressHeader {
  width: 100%;
}
.addressHeader p {
  font-size: 16px;
  display: inline-block;
  margin-right: 10px;
}
.addressHeader span {
  font-size: 12px;
  display: inline-block;
  color: #666;
}
.address span {
  font-size: 12px;
  padding: 5px 10px;
  display: inline-block !important;
  margin-top: 10px;
  border: 1px solid #eee;
  margin-right: 10px;
}
.address p {
  margin-top: 10px;
  display: inline-block !important;
  font-size: 14px;
  margin-bottom: 5px;
}
.addressRight {
  float: right;
  line-height: 52px;
  padding: 0 10px;
}
.line {
  width: 5px;
  color: #999;
}
.addressEdit p {
  font-size: 14px;
  line-height: 52px;
  margin-left: 9px;
  color: #999;
}
view {
  display: inline-block;
}
.container {
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #eee;
}
</style>