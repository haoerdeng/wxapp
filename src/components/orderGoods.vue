<template>
    <div style="width:100%">
      <ul class="goodsContent">
        <li v-for="(item, index) in card" :key="index">
          <van-row>
            <van-col span="8">
              <div class="goodsImage">
                <image :src="item.image" alt=""/>
              </div>
            </van-col>
            <van-col span="16" class="goodsBrief">
              <div class="briefName">{{item.title}}</div>
              <div class="briefTag" v-html="item.skuDecription"></div>
              <div>
                <div class="briefPrice">￥{{item.priceCart}}</div>
                <div class="buyNum">×{{item.num}}</div>
              </div>
            </van-col>
          </van-row>
        </li>
      </ul>
      <div  class="costDiv">
        <ul class="costDetails">
          <li class="costItem"> 
            <p class="detailsText">商品金额</p>
            <p class="detailsPrice">￥&nbsp;{{totalAmount}}</p>
          </li>
          <li class="costItem">
            <p class="detailsText">运费</p>
            <p class="detailsPrice">+&nbsp;￥{{postFee}}</p>
          </li>
        </ul>
        <div class="costTotal">
          <p>总价 <strong>￥{{totalFee}}</strong></p>
        </div>
      </div>
      <div class="costDiv">
        <div class="toPay">
          <div class="payContent" @click="testPay">去支付</div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        card:[],
        postFee:0,
        totalFee:0,
        itemNum : 0,
        priceCart:0,
        skuId:"",
        image:"",
        id:0,
        userId:0,
        title:"",
        skuDecription:"",
        totleMoney:"",
        cards:[],
        openid:"",
        userAddressId:0,
        newChoiceAdd:[]
      }
    },
    props: {
      card: {
        type: Array
      },
      userAddressId:"",
      newChoiceAdd:[]
    },
    onLoad(){
      let goodsId = this.$root.$mp.query.goodsId;
      console.log(goodsId)
      console.log(this.newChoiceAdd)
      goodsId = JSON.parse(goodsId)
      this.card.splice(0, this.card.length)
      goodsId.forEach(item => {
        console.log(item)
        this.card.push(item)
      });
      this.totalFee = this.totalAmount + this.postFee;
      console.log(this.totalFee)
      var me = this
      wx.getStorage({
        key: 'openid',
        success(res) {
          console.log(res.data);
          me.openid = res.data
          console.log("-----------openid  action---------");
          console.log(me.openid)
          console.log("-----------openid  over-------------")
          
        }
      });
      // console.log(result);
      
    },
    computed:{
      totalAmount(){
        let total = 0;
        this.card.forEach(item =>{
          total += (item.priceCart*item.num);         
        })
        return total;
      }
    },
    methods:{
      /* 测试支付*/
      testPay:function(index) {
        this.cards = []
        if(this.newChoiceAdd.length == 0){
          wx.showToast({
            title:'请选择地址',
            icon:'loading',
            duration:2000
          })
        }else{
          var goodsId = this.$root.$mp.query.goodsId;
          console.log(goodsId)
          goodsId = JSON.parse(goodsId)
          
          goodsId.forEach(item => {
            this.cards.push(item)
          });
          var param = this.$root.$mp.query.param
          console.log(param)
          if(param != "" && param != null && param != undefined){
            console.log(param)
            param = JSON.parse(param)
            this.id = param.id
            console.log("获取地址ID ------  action")
            console.log(this.id)
            console.log("获取地址ID ------    over")
          }else{
            console.log("没错，我就是这么6")
            this.id = this.userAddressId
            console.log(this.userAddressId)
            console.log(this.id)
          }
          let commitArrs = []
          let commitArr = []
          let commonObj = {}
          commitArr = this.cards.map(item =>{
            return {
              itemNum:item.num,
              cartPrice:item.priceCart,
              skuId:item.skuId,
              imageAddress:item.image,
              skuDecription:item.skuDecription,
              title:item.title
            }
          })
          commitArrs = this.cards.map(item =>{
            return{
              cartId:item.id,
            }
          })
          for (const i in this.cards) {
            commonObj['userId'] = this.cards[i].userId
            commonObj['userAddressId'] = this.id
            commonObj['payment'] = this.totalFee
          }

    

          var param={
            value:{
              addOrder:commitArr,
              cartId:commitArrs,
              order:commonObj
            }
          };
          console.log(param);
          param=JSON.stringify(param);
          this.$http.post({
            url:this.GLOBAL.serviceHepler.conn.order_submit_order,
            data:{
              param:param
            }
          }).then((result)=> {
            let id = result.value.orderId
            var param = {
              value:{
                id:id,
                money:this.totalFee,
                openid:this.openid
              }
            }
            console.log(param)
            this.$http.post({
              url:this.GLOBAL.serviceHepler.conn.pay_order_money,
              data:{
                param:JSON.stringify(param)
              }
            }).then((result)=> {
              console.log(result)
              console.log("调用pay_order_money成功的回调")
              wx.requestPayment({
                'timeStamp': result.value.timeStamp,
                'nonceStr': result.value.nonceStr,
                'package': result.value.package,
                'signType': result.value.signType,
                'paySign': result.value.paySign,
                'success':function(res){
                  console.log(res)
                  var url = '/pages/myOrder/main?pageid=' + 1 + '&status=' + 2;
                  mpvue.redirectTo({url});
                  console.log("success")
                },
                'fail':function(res){
                  console.log(res)
                  var url = '/pages/myOrder/main?pageid=' + 0 + '&status=' + 1;
                  mpvue.redirectTo({url});
                  console.log("失败")
                  console.log("fail")
                },
                'complete':function(res){
                  console.log("不知道什么状态呀")
                  console.log(res)
                  console.log("complete")
                }
              })
            }).catch((err) => {
              console.log(err.msg);
            })
            
          }).catch((err) => {
            console.log("生成订单出错了");
          })
        }
        console.log(this.newChoiceAdd)
        
      }
    },
  };
</script>

<style scoped>
  /*商品列表*/
  .goodsContent {
    width: 95%;
    margin: 0 auto;
    background-color: white;
  }
  .goodsImage {
    width: 100px;
    height: 100px;
    padding: 5px;
  }
  image{
    width: 100%;
    height: 100%;
  }
  .briefName {
    border-top: 1px solid #ddd;
    padding-top: 8px ;
    font-size: 14px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .goodsContent li:first-of-type .briefName{
    border-top: 0px solid #ddd;
  }
  .briefTag{
    font-size: 10px;
    color:#bbb;
  }
  /*.briefTag span {
    display: inline-block;
    padding: 2px;
    height: 16px;
    text-align: center;
  }*/

  .briefPrice {
    margin-top: 18px;
    font-size: 16px;
    color: #e01222;
    float: left;
  }
  .buyNum {
    margin-top: 18px;
    margin-right: 10px;
    float: right;
    font-size: 14px;
    color: #666;
  }

  .costDiv {
    width: 100%;
    background-color: white;
    font-size: 14px;
    color: #333;
    margin-top: 20px;
    padding: 14px;
    position: relative;
    overflow-x: hidden;
    box-sizing:border-box;
  }
  .costDetails {
    padding-bottom: 10px;
  }
  .costItem {
    display: flex;
  }
  .detailsText {
    color: #333;
    flex: 1;
  }
  .detailsPrice {
    color: #e93b3d;
  }
  /*总价*/
  .costTotal {
    text-align: right;
    border-top: 1px solid #f9f9f9;
    padding-top: 10px;
  }
  .costTotal strong {
    color: #e93b3d;
    font-weight: 400;
    display: inline;
  }
  .costDiv {
    width: 100%;
    background-color: white;
    font-size: 14px;
    padding: 14px;
    position: relative;
    overflow-x: hidden;
    box-sizing:border-box;
  }

  .toPay {
    padding: 5px;
  }
  .payContent {
    background-color:#439057 ;
    color: white;
    border-radius: 5px;
    text-align: center;
    height: 40px;
    line-height: 40px;
  }
  .complate{
    background-color:#439057 ;
    color: white;
    border-radius: 5px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    margin-top: 10px;
  }
</style>
