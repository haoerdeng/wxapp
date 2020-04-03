<template>
  <div class="container">
    <div class="headerContent">
      <div :style="{height:statusBarHeight + 'px'}"></div>
      <div class="containerHeader">
        <div  @click="clickBack(consignee,telephone,location,detailedAddress,id)">
          <image src="/static/images/back.png" class="img"></image>
        </div>
        <text class="title" style="margin-top:10px">地址列表</text>
      </div>
    </div>
    <div class="containers" v-for="(item,index) in resultData" :key="index">
      <van-row>
        <van-col span="20" @click="clickThis(item.receiverName,item.receiverPhone,item.receiverCity,item.receiverAddress,item.id)">
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
              <p @click="editAddress(item.receiverName,item.receiverPhone,item.receiverCity,item.receiverAddress,item.id)">编辑</p>
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
    id:"",
    statusBarHeight:0
  },
  onLoad(){
    let me = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        console.log(res.statusBarHeight)
        me.statusBarHeight = res.statusBarHeight + 12
      },
    })
  },
  mounted() {
    var me = this 
    this.memberId = me.$root.$mp.query.userId
    console.log(this.memberId)
    var param = {
      value: {
        userId: me.$root.$mp.query.userId
      }
    };
    me.$http.post({
      url: me.GLOBAL.serviceHepler.conn.receivingaddress_list,
      data: {
        param: JSON.stringify(param)
      }
    })
    .then(function(result) {
      console.log(result.value);
      me.resultData = result.value;
      me.telephone = result.value.telephone;
    })
    .catch(function() {
      console.log("出错了");
    });
      
  },
  methods: {
    /*新增地址 */
    addAddress: function() {
      const url = "/pages/addAddress/main";
      mpvue.navigateTo({ url });
    },
    /*选择地址列表的地址 */
    clickThis:function(consignee,telephone,location,detailedAddress,id){
      var me = this
      var goodsId = this.$root.$mp.query.goodsId;
      console.log(goodsId)
      var param = {
        telephone:telephone,
        detailedAddress:detailedAddress,
        consignee:consignee,
        location:location,
        id:id
      }
      const url = "/pages/commitOrder/main?param=" + JSON.stringify(param) + '&goodsId=' + goodsId;
      mpvue.navigateTo({ url });
      console.log(url)
    },
    /*点击返回上一页 */
    clickBack:function(consignee,telephone,location,detailedAddress,id){
      var goodsId = JSON.parse(this.$root.$mp.query.goodsId)
      var param = {
        telephone:telephone,
        detailedAddress:detailedAddress,
        consignee:consignee,
        location:location,
        id:id
      }
      const url = "/pages/commitOrder/main?param=" + JSON.stringify(param) + '&goodsId=' + goodsId;
      mpvue.redirectTo({url})
    },
    editAddress(consignee,telephone,location,detailedAddress,id) {
      console.log(111111)
      var me = this;
      var param = {
        telephone:telephone,
        detailedAddress:detailedAddress,
        consignee:consignee,
        location:location,
        id:id
      }
      console.log(JSON.stringify(param))
      const url = "/pages/editAddress/main?param=" + JSON.stringify(param);
      mpvue.navigateTo({ url });
    }
  }
};
</script>
<style scoped>
.container{
  width: 100%;
}
.headerContent{
  background: #fff;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  position: fixed;
  z-index: 99;
}
.containerHeader{
  padding-bottom: 10px;
}
.img{
  position: fixed;
  left: 0;
  width:20px;
  height:20px;
  padding:0 10px;
  margin:5px 0;
}
.settingDiv {
  background-color: #fff;
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
  display: inline-block;
}
.addressEdit p {
  font-size: 14px;
  line-height: 52px;
  margin-left: 9px;
  color: #999;
  display: inline-block;
}
.containers {
  width: 100%;
  background: #fff;
  border-top: 1px solid #f4f4f5;
  border-bottom: 1px solid #eee;
  margin-top: 80px;
}
  
</style>