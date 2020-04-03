<template>
  <div class="settingDiv container">
    <div class="headerContent">
      <div :style="{height:statusBarHeight + 'px'}"></div>
      <div class="containerHeader">
        <div  @click="clickBack(consignee,telephone,location,detailedAddress,id)">
          <image src="/static/images/back.png" class="img"></image>
        </div>
        <text class="title" style="margin-top:10px">修改收货地址</text>
      </div>
    </div>
    <div class="from">
      <div class="styleSet">
        <label for="username">收货人</label>
        <input type="text" id="username" placeholder="请输入收货人" v-model="username">
      </div>
      <div class="styleSet">
        <label for="phone">联系方式</label>
        <input type="text" id="phone" placeholder="请输入联系方式" v-model="phone" maxlength="11">
      </div>
      <div class="styleSet">
        <label for="area">所在地区</label>
        <picker mode="region" @change="bindRegionChange($event)" :value="regionData" :custom-item="customItem" style="display:inline-block;width:80%">
          <input type="text" class="picker" id="area" placeholder="请输入所在地区" :value="regionDatas" >
        </picker>
       
         <!-- <input type="text" id="area" placeholder="" v-model="area"> -->
      </div>
      <!-- <div class="styleSet">
        <label for="area">所在地区</label>
        <input type="text" id="area" placeholder="请输入所在地区" v-model="area">
      </div> -->
      <div class="styleSet">
        <label for="adress">详细地址</label>
        <input type="text" id="adress" placeholder="详细地址需要填写楼栋楼层或房间信息" v-model="adress">
      </div>
      <div class="styleSet">
        <van-switch-cell title="设置默认地址" :checked="checked" @change="onChange"/>
      </div>
    </div>

    <div style="clear:both"></div>
    <div class="payContent" @click="addAddress">确认</div>
    <div class="delContent" @click="delAddress">删除</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      area: "",
      username: "",
      phone: "",
      adress: "",
      id:"",
      userInfo:{
        nickName:'',
        avatarUrl:'',
        userId:''
      },
      region: [],
      regionData:[],
      regionDatas:"",
      status:"",
      statusBarHeight:0,
      receiverState:"",
      goodsId:""
    }
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
    this.status = me.$root.$mp.query.status
    
    this.goodsId = me.$root.$mp.query.goodsId
    console.log("我还是进来了")
    console.log(this.goodsId)
    console.log(this.status)
  },
  onShow() {
    var me = this;
    me.resultData = me.$root.$mp.query.param;
    console.log(me.resultData)
    
    me.phone = JSON.parse(me.resultData).telephone;
    console.log(me.phone);
    me.adress = JSON.parse(me.resultData).detailedAddress;
    console.log(me.adress);
    me.username = JSON.parse(me.resultData).consignee;
    me.regionDatas = JSON.parse(me.resultData).location;
    console.log(me.area)
    me.id =  JSON.parse(me.resultData).id;
    me.receiverState = JSON.parse(me.resultData).receiverState
    if(me.receiverState == 1){
      this.checked = true
    }else{
      this.checked = false
    }
    wx.getStorage({
      key: 'nickName',
      success(res) {
        me.userInfo.nickName = res.data;
      }
    });

    wx.getStorage({
      key: 'avatarUrl',
      success(userRes) {
        me.userInfo.avatarUrl = userRes.data;
      }
    });

    wx.getStorage({
      key: 'userId',
      success(userRes) {
        me.userInfo.userId = userRes.data;
      }
    });
  
  },
  methods: {
    onChange: function(e) {
      console.log(e.mp.detail);
      this.checked = !this.checked;
      if(e.mp.detail == true){
        this.defaultAddress = 1
      }else{
        this.defaultAddress = 0
      }
      // switch开关键需要手动对 checked 状态进行更新
    },
    /*点击返回上一页 */
    clickBack:function(consignee,telephone,location,detailedAddress,id){
      if(this.status == 1){
        const url = "/pages/choiceAddress/main?userId=" + JSON.stringify(this.userInfo.userId) + "&status=" + this.status +'&goodsId=' + this.goodsId
        mpvue.redirectTo({url})
      }else{
        const url = "/pages/settingAddress/main?userId=" + JSON.stringify(this.userInfo.userId)
        mpvue.redirectTo({url})
      }
      
    },
    bindRegionChange(e) {
      console.log('picker发送选择改变，携带值为', e.mp.detail.value)
      this.region = e.mp.detail.value;
      this.regionData = this.region[0] + this.region[1] + this.region[2]
      this.regionDatas = this.region[0] + " " + this.region[1] + " " + this.region[2] + " "
      console.log(this.regionDatas)
    },
    /*修改收货地址的确认按钮 */
    addAddress(e) {
      var me = this;

      if(this.username == "" || this.username == null || this.username == undefined){
        wx.showToast({
          title: '请填写用户名称',
          icon:'none',
          duration: 10000
        })
        setTimeout(function(){
          wx.hideToast()
        },2000)
      }else if(!(/^1[34578]\d{9}$/.test(this.phone))){
        wx.showToast({
          title: '手机号码有误',
          duration: 2000,
          icon:'none'
        });
        return false;
      }else if(this.regionDatas == "" || this.regionDatas == null || this.regionDatas == undefined){
        wx.showToast({
          title: '请选择区域',
          icon:'none',
          duration: 10000
        })
        setTimeout(function(){
          wx.hideToast()
        },2000)
      }else if(this.adress == "" || this.adress == null || this.adress == undefined){
        wx.showToast({
          title: '请填写详细地址',
          icon:'none',
          duration: 10000
        })
        setTimeout(function(){
          wx.hideToast()
        },2000)
      }else{
        // defaultAddress: me.checked,
        var param = {
          value: {
            receiverName: this.username,
            receiverPhone: this.phone,
            receiverCity: this.regionDatas,
            receiverAddress: this.adress,
            id: this.id,
            receiverState:this.defaultAddress,
            userId: JSON.stringify(me.userInfo.userId),
          }
        };
        me.$http.post({
          url: me.GLOBAL.serviceHepler.conn.receivingaddress_edit,
          data: {
            param: JSON.stringify(param)
          }
        }).then((result)=> {
          console.log("???????????????????????")        
          if (result.code == 1) {
            console.log("???????123")
            if(this.status == 1){
              console.log("我是带1的")
              const url = "/pages/choiceAddress/main?userId=" + JSON.stringify(this.userInfo.userId) + "&status=" + this.status +'&goodsId=' + this.goodsId
              mpvue.redirectTo({url})
            }else{
              console.log("我是bu带1的")
              const url = "/pages/settingAddress/main?userId=" + JSON.stringify(this.userInfo.userId)
              mpvue.redirectTo({url})
            }
          }else{
            wx.showModal({
              title: '提示',
              icon:"none",
              content: '更改失败',
            })
          }
        })   
      }
    },
    delAddress(e) {
      var me = this;
      var param = {
        value: {
          userId: JSON.stringify(me.userInfo.userId),
          id:me.id
        }
      };
      console.log(JSON.stringify(me.userInfo.userId))
      param = JSON.stringify(param);
      me.$http
        .post({
          url: me.GLOBAL.serviceHepler.conn.receivingaddress_del,
          data: {
            param: param
          }
        })
        .then((result)=>{
          console.log(result);
          if (result.code == 1) {
            // me.username = "";
            // me.phone = "";
            // me.area = "";
            // me.adress = "";
            // me.checked = false;
            if(this.status == 1){
              console.log("我是带1的")
              const url = "/pages/choiceAddress/main?userId=" + JSON.stringify(this.userInfo.userId) + "&status=" + this.status +'&goodsId=' + this.goodsId
              mpvue.redirectTo({url})
            }else{
              console.log("我是bu带1的")
              const url = "/pages/settingAddress/main?userId=" + JSON.stringify(this.userInfo.userId) 
              mpvue.redirectTo({url})
            }
          }
          console.log("成功了");
        })
        .catch(()=>{
          console.log("出错了");
        });
    }
  }
};
</script>

<style>
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
  background-color: #f8f8f8;
}
.from{
  width: 95%;
  margin: 0 auto;
  margin-top: 80px;
}
.payContent {
  width: 95%;
  margin: 0 auto;
  background-color: rgb(255, 51, 51);
  margin-top: 5px;
  color: white;
  display: block;
  border-radius: 5px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  margin-top: 20px;
}
.delContent {
  width: 95%;
  margin: 0 auto;
  background-color: rgb(255, 51, 51);
  margin-top: 5px;
  color: white;
  display: block;
  border-radius: 5px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  margin-top: 20px;
}
.defaultAddress {
  background: #fff;
  height: 40px;
  margin-top: 30px;
}
.defaultAddress p {
  font-size: 14px;
  line-height: 40px;
  margin-left: 10px;
  float: left;
}
.from label {
  display: inline-block;
  margin-left: 5px;
  font-size: 14px;
  width: 18%;
  vertical-align: middle;
}
.from input {
  display: inline-block;
  line-height: 50px;
  font-size: 14px;
  margin-left: 10px;
  vertical-align: middle;
  width: 75%;
}
.styleSet {
  width: 100%;
  line-height: 50px;
  background: #fff;
  border-bottom: 1px solid #eee;
}
</style>





