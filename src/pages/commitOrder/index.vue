<template>
  <div id="content" class="container">
    <div class="headerContent">
      <div :style="{height:statusBarHeight + 'px'}"></div>
      <div class="containerHeader">
        <div  @click="clickBack">
          <image src="/static/images/back.png" class="img"></image>
        </div>
        <text class="title">提交订单</text>
      </div>
    </div>
    <div  class="addressDiv" v-if="choiceAdd == 0" @click="exchangeAdd">
      <ul v-if="newChoiceAdd.length == 0">
        <li class="receiverName">
          <span>暂无地址，请添加默认地址</span>
        </li>
      </ul>
      <ul v-else>
        <li class="receiverName">
          <span>{{username}}</span>
          <span>{{phone}}</span>
        </li>
        <li class="receiverAdd">
          <!-- <span class="addressTag">当前</span> -->
          <span>{{area + adress}}</span>
        </li>
      </ul>
      <span class="exchange">></span>
    </div>
    <div class="addressDiv" v-else @click="exchangeAdd">
      <ul>
        <li class="receiverName">
          <span>{{username}}</span>
          <span>{{phone}}</span>
        </li>
        <li class="receiverAdd">
          <!-- <span class="addressTag">当前</span> -->
          <span>{{area + adress}}</span>
        </li>
      </ul>
      <span class="exchanges">></span>
    </div>
    <!-- <orderAddress :userId="userId"></orderAddress> -->
    <orderGoods :card="card" :totalPrice="totalPrice" :postFee="postFee" :totalFee="totalFee" :userAddressId="userAddressId" :newChoiceAdd="newChoiceAdd"></orderGoods>
    <!-- <orderCost @commitOrder="commitOrder"></orderCost> -->
  </div>

</template>

<script>
  import orderAddress from "@/components/orderAddress";
  import orderGoods from "@/components/orderGoods";
  // import orderCost from "@/components/orderCost";
  export default {
    data() {
      return {
        card: [],
        totalPrice:0,
        postFee:0,
        totalFee:0,
        commitContent:{},//生成订单要传的参数
        token:'',
        userId:'',
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
        choiceAdd:0,
        newChoiceAdd:[],
        statusBarHeight:0,
        goIn:"",
        userAddressId:0
      }

    },
    components: {
      orderAddress,
      orderGoods,
      // orderCost
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
      wx.getStorage({
        key: 'wxSession',
        success(res) {
          console.log(res.data);
          me.token = res.data
        }
      });
      wx.getStorage({
        key: 'userId',
        success(res) {
          console.log(res.data);
          me.userId = res.data
        }
      });
      setTimeout(() => {
        var param = {
          value: {
            userId: me.userId
          }
        };
        me.$http.post({
          url: me.GLOBAL.serviceHepler.conn.receivingaddress_list,
          data: {
            param: JSON.stringify(param)
          }
        }).then((result) =>{
          console.log(result.value)
          if(result.value.length == 0){
            this.choiceAdd = 0
            newAdd = 1
            this.newChoiceAdd.length == 0
            console.log("::::::")
            console.log(this.choiceAdd)
          }else{
            this.choiceAdd = this.$root.$mp.query.choiceAdd
            console.log(this.choiceAdd)
            this.choiceAdd = this.$root.$mp.query.choiceAdd == undefined ? 0 : 1
            
            this.newChoiceAdd = result.value
            if(this.choiceAdd == 0){
              console.log("提交订单页面获取默认地址")
              console.log(result.value);
              this.newChoiceAdd = result.value
              this.phone = result.value[0].receiverPhone
              this.username = result.value[0].receiverName
              this.adress = result.value[0].receiverAddress
              this.userAddressId = result.value[0].id
              // let areas = result.value[0].receiverCity
              this.area = result.value[0].receiverCity.replace(/\s/g,"")
            }else{
              var signId = this.$root.$mp.query.signId
              console.log(signId)
              if(signId == ""){
                this.choiceAdd = 0
                console.log("没有数据")
              }else{
                this.choiceAdd = 1 
                var param = this.$root.$mp.query.param
                param = JSON.parse(param)
                this.phone = param.telephone
                console.log(param.telephone)
                this.username = param.consignee
                this.adress = param.detailedAddress
                this.area = param.location.replace(/\s/g,"")
                this.id = param.id
              }
            }
          }
          
          console.log("查看传的值")
          this.goIn = this.$root.$mp.query.goIn
          console.log(this.goIn)
        }).catch((err) => {
          console.log("出错了");
        });

        me.commitContent={};
      }, 100);
      

    },
    onShow(){
      let me = this
      this.choiceAdd = 0
      wx.getStorage({
        key: 'userId',
        success(res){
          console.log(res.data);
          me.userId = res.data
          console.log(me.userId)
        }
      });
      console.log(me.userId)
    },
    mounted() {           //请求数据，操作dom，放在这个里面 必须记住
      let me = this;
      
    },
    methods: {
      /*点击返回上一页 */
      clickBack:function(e){
        if(this.goIn == 1){
          var goodsId = JSON.parse(this.$root.$mp.query.goodsId)
          console.log("我点击返回了")
          console.log(goodsId)
          const url = '/pages/productdetails/main?id=' + goodsId[0].itemId + '&goIn=' + 1;
          mpvue.redirectTo({url})
        }else{
          var goodsId = JSON.parse(this.$root.$mp.query.goodsId)
          console.log("我点击返回了")
          console.log(goodsId)
          const url = '/pages/productdetails/main?id=' + goodsId[0].itemId;
          mpvue.redirectTo({url})
        }
      },
      /*跳转到选择地址页面*/ 
      exchangeAdd:function(e){
        let me = this;
        var goodsId = this.$root.$mp.query.goodsId;
        wx.getStorage({
          key: 'userId',
          success(userRes) {
            me.userInfo.userId = userRes.data;
          }
        });  
        console.log(e)
        if(this.goIn == 1){
          const url = "/pages/choiceAddress/main?userId=" + JSON.stringify(me.userId) + '&goodsId=' + goodsId + '&status=' + 1 + '&goIn=' + 1;
          mpvue.redirectTo ({ url });
          console.log(url)
        }else{
          const url = "/pages/choiceAddress/main?userId=" + JSON.stringify(me.userId) + '&goodsId=' + goodsId + '&status=' + 1;
          mpvue.redirectTo ({ url });
          console.log(url)
        }
      },
    }
  }
</script>
<style scoped>
  #content {
    background-color: #f9f9f9;
  }
  .addressDiv{
    width: 95%;
    margin: 0 auto;
    background-color: white;
    font-size: 14px;
    color: #333;
    border-top: 10px solid #f9f9f9;
    margin-bottom: 10px;
    padding: 14px;
    overflow-x: hidden;
    margin-top:75px;
  }
  .addressDiv ul {
    width: 80%;
  }
  .receiverName {
    font-weight: bold;
  }
  li{
    width:75%;
    height: 20px;
    line-height: 20px;
  }
  span {
    display: inline-block;
    margin-left: 5px;
  }
  .receiverAdd{
    width: 100%;
  }
  .addressTag {
    border: 1px solid #e93b3d;
    color: #e93b3d;
    padding: 2px 5px;
  }
  .choiceAddress{
    width: 55px;
    height: 30px;
    float: right;
    font-size: 12px;
    position: fixed;
    overflow-x: hidden;
    top:22px;
    right:5px;
    background: #f78d1f;
    color:#fff;
  }
  .exchange{
    height: 30px;
    float: right;
    font-size: 16px;
    position: fixed;
    overflow-x: hidden;
    top:15px;
    right:10px;
    /* background: #f78d1f; */
    color:#000
  }
  .exchanges{
    height: 30px;
    float: right;
    font-size: 16px;
    position: fixed;
    overflow-x: hidden;
    top:25px;
    right:10px;
    /* background: #f78d1f; */
    color:#000
  }
  .img{
    position: fixed;
    left: 0;
    width:20px;
    height:20px;
    padding:0 10px;
    margin:5px 0;
    display: inline-block
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
</style>
