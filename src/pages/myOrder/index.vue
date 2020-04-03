<template>
  <div class="orderDiv container">
    <div class="headerContent">
      <div :style="{height:statusBarHeight + 'px'}"></div>
      <div class="containerHeader">
        <div  @click="clickBack()">
          <image src="/static/images/back.png" class="img"></image>
        </div>
        <text class="title" style="margin-top:10px">我的订单</text>
      </div>
    </div>
    <!-- <van-search placeholder="请输入搜索关键词" v-model="value" /> -->
    <!--页面tab栏-->
    <div style="width:100%;padding-top:75px">
      <van-tabs :active="active" sticky @change="onChange">
        <van-tab title="待付款">
        </van-tab>
        <van-tab title="待发货">
        </van-tab>
        <van-tab title="待收货">
        </van-tab>
        <van-tab title="已完成">
        </van-tab>
        <van-tab title="已取消">
        </van-tab>
        <!-- <van-tab title="全部订单">
        </van-tab> -->
      </van-tabs>
      <div v-if="orderList.length===0">
        <div class="orderContent">
          暂无订单
        </div>
      </div>
      <div v-else>
        <div class="orderContent">
          <div class="orderItem" v-for="(item, index) in orderList" :key="index">
            <div class="orderStatus">订单号：{{item.ordeCode}}</div>
            <div v-for="(item2, index2) in item.shopOrderCommodity" :key="index2">
              <van-row>
                <van-col span="8">
                  <div class="goodsImage">
                    <image :src="item2.imageAddress" alt=""/>
                  </div>
                </van-col>
                <van-col span="10">
                  <div class="goodsBrief">
                    <div class="briefName">{{item2.title}}</div>
                    <div class="briefNames">{{item2.skuDecription}}</div>
                  </div>
                </van-col>
                <van-col span="6">
                  <div class="briefPrice">
                    <div class="goodsPrice">￥{{item2.cartPrice}}</div>
                    <div class="goodsNum">×{{item2.itemNum}}</div>
                    <div style="clear: both"></div>
                  </div>
                </van-col>
              </van-row>
          </div>
          <div>
            <div class="totalPrice"><em>应付金额：</em><i>￥</i>{{item.payment}}</div>
            <div class="totalNum">共{{item.shopOrderCommodity.length}}件商品</div>
            <div style="clear: both"></div>
          </div>
          <div class="orderHandle">
            <div v-show="unpay[index]" class="handleItem">
              <van-button size="small" type="danger" @click="toPay(item)" :data-id="item.orderId" :data-userId ="item.userId" >去支付</van-button>
            </div>
            <div v-show="unrecieve[index]" class="handleItem">
              <van-button size="small" type="danger" @click="confirm" :data-id="item.orderId" :data-userId ="item.userId">确认收货</van-button>
            </div>
            <!-- <div v-show="repurchase[index]" class="handleItem">
              <van-button size="small" type="danger" @click="reBuy(item)" :data-id="item.orderId" :data-userId ="item.userId">再次购买</van-button>
            </div> -->
            <div v-show="closed[index]" class="handleItem">
              <van-button size="small" disabled  type="primary" @click="close" :data-id="item.orderId" :data-userId ="item.userId">已关闭</van-button>
            </div>
            <!-- <div v-show="consignment[index]" class="handleItem">
              <van-button size="small" type="danger" @click="consignment" :data-id="item.orderId" :data-userId ="item.userId">催发货</van-button>
            </div> -->
            <div v-show="cancelbtn[index]" class="handleItem">
              <van-button size="small" type="danger" @click="orderCancel" :data-id="item.orderId" :data-userId ="item.userId">取消订单</van-button>
            </div>
            <div style="clear: both"></div>
          </div>
        </div>
        <div class="nomore">~~没有更多订单啦~~</div>
        </div>
      </div>
    </div>
    <!--<van-dialog
      use-slot
      async-close
      id="van-dialog"
      :show="dialog"
      message = "确认取消订单吗"
      show-cancel-button
      @close="onClose"
    >
    </van-dialog>-->

  </div>

</template>

<script>
  import Dialog from "@/../static/vant/dialog/dialog";

  export default {
    data() {
      return{
        userId:"",
        newId:"",
        active:0,
        orderList:[],
        unpay:[],
        unrecieve:[],
        repurchase :[],
        closed:[],
        cancelbtn:[],
        consignment:[],
        orderLists:[],
        dialog:false,
        orderLength:0,
        orderId:"",
        param:{
          value: {
            userId:''
          },
          token:''
        },
        changeParam:{ //修改订单传的参数

        },
        status:"",
        statusBarHeight:0,
        openid:""
      }
    },
    computed:{
      totalAmount(){
        let total = 0;
        this.orderLists.forEach(item =>{
          total += (item.cartPrice*item.itemNum);         
        })
        return total;
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
      
      var status = me.$root.$mp.query.status
      if(status == 1){
        console.log(status)
      }else if(status == 2){
        console.log(status)
        wx.getStorage({
          key: 'wxSession',
          success(res) {
            me.param.token = res.data;
            var status = me.$root.$mp.query.status
            wx.getStorage({
              key: 'userId',
              success(userRes) {
                me.param.value.userId = userRes.data;
                me.changeParam = me.param;
                if(status){
                  console.log(status)
                  me.getList(status);
                }else{
                  me.getList('');
                }
              }
            });
          }
        });
      }
      
    },
    mounted() {           //请求数据，操作dom，放在这个里面 必须记住
      var me = this;
      var pageId = me.$root.$mp.query.pageid;
      var status = '';
      console.log("???????????")
      console.log(pageId);
      console.log("???????????")
      switch(pageId){
        case '0':
          status = 1;
          console.log("1")
          me.active = parseInt(pageId);
          break;
        case '1':
          status = 2;
          console.log("2")
          me.active = parseInt(pageId);
          break;
        case '2':
          status = 3;
          console.log("3")
          me.active = parseInt(pageId);
          break;
        case '3':
          status = 4;
          console.log("4")
          me.active = parseInt(pageId);
          break;
        // default:
        //   status = '';
        //   me.active = 5;
        //   break;
      }
      console.log(status)
      wx.getStorage({
        key: 'wxSession',
        success(res) {
          me.param.token = res.data;
          wx.getStorage({
            key: 'userId',
            success(userRes) {
              me.param.value.userId = userRes.data;
              me.changeParam = me.param;
              if(status){
                console.log(status)
                me.getList(status);
              }else{
                me.getList('');
              }
            }
          });
        }
      });

    },
    methods: {
      /*返回上一页事件 */
      clickBack:function(){
        var me = this
        const url = "/pages/myShop/main";
        mpvue.switchTab({ url });
      },
      getList(status,selectStatus) {
        //请求订单
        var me = this;
        me.unpay = [];
        me.undelivery = [];
        me.unrecieve = [];
        me.cancelbtn = [];
        me.consignment = [];
        me.repurchase = [];
        me.closed = [];
        if(status){
          me.param.value.status = status;
        }else{
          delete me.param.value.status;
        }
        console.log('-----------me.param-----------');
        console.log(me.param);
        var param = JSON.stringify(me.param);
        console.log(param);
        me.$http.post({
          url:me.GLOBAL.serviceHepler.conn.order_get_user_order,
          data:{
            param:param
          }
        }).then((result)=>{
          console.log(result)
          me.orderList = result.value;
          console.log(me.orderList)

          let orderObj = []
          me.orderList.forEach(item => {
            console.log(item.status)
            orderObj.push(item.status)
             for (const i in orderObj) {
              orderObj[i] = me.GLOBAL.utilHelper.fromatOrderState(orderObj[i]);
              console.log(orderObj[i])
              switch(orderObj[i]){
                case "未支付":
                  me.unpay.push(true);
                  me.unrecieve.push(false);
                  me.repurchase.push(false);
                  me.cancelbtn.push(true);
                  me.consignment.push(false);
                  me.closed.push(false)
                  break;
                case "已付款":
                  me.unpay.push(false);
                  me.unrecieve.push(false);
                  me.repurchase.push(false);
                  me.consignment.push(true);
                  me.cancelbtn.push(false);
                  me.closed.push(false)
                  break;
                case "已发货": 
                  me.unpay.push(false);
                  me.unrecieve.push(true);
                  me.repurchase.push(false);
                  me.cancelbtn.push(false);
                  me.consignment.push(false);
                  me.closed.push(false)
                  break;
                case "交易完成":
                  me.repurchase.push(true);
                  me.unpay.push(false);
                  me.unrecieve.push(false);
                  me.cancelbtn.push(false);
                  me.consignment.push(false);
                  me.closed.push(false)
                  break;
                case "交易关闭":
                  me.repurchase.push(true);
                  me.unpay.push(false);
                  me.unrecieve.push(false);
                  me.cancelbtn.push(false);
                  me.consignment.push(false);
                  me.closed.push(true)
                  break;
              }
            }
          });
        }).catch((err)=>{
          console.log("出错了");
        })
      },
      /* 切换tab栏*/
      onChange(e) {
        var me = this;
        var index = e.target.index;
        var selectStatus = '';
        switch (index) {
          case 0:
            console.log("待付款");
            selectStatus = "1";
            break;
          case 1:
            console.log("待发货");
            selectStatus = "2";
            break;
          case 2:
            console.log("待收货");
            selectStatus = "3";
            break;
          case 3:
            console.log("已完成");
            selectStatus = "4";
            break;
          case 4:
            console.log("已取消");
            selectStatus = "5";
            break;
          // case 5:
          //   console.log("全部订单");
          //   selectStatus = "";
          //   break;
        }
        console.log('selectStatus')
        console.log(selectStatus)
        me.getList(selectStatus);
      },
      /*再次购买*/
      reBuy(item){
        console.log("再次购买")
        console.log(item)
      },
      /*催发货*/
      consignment:function(e){
        console.log(e)
        console.log("催发货")
        wx.showToast({
          title: '目前暂不支持',
          icon:'none',
          duration: 10000
        })
        setTimeout(function(){
          wx.hideToast()
        },2000)
      },
      /* 去支付*/
      toPay(item) {
        var me = this;
        console.log(item)
        let id = item.orderId
        var param = {
          value:{
            id:id,
            money:item.payment,
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
              me.changeStatus(id,2)
            },
            'fail':function(res){
              console.log(res)
              me.changeStatus(id,1)
            },
            'complete':function(res){
              console.log("不知道什么状态呀")
              console.log(res)
              console.log("complete")
            }
          })
        })
      },
      /* 修改订单状态*/
      changeStatus(id,status){
        var me = this;
        var oldStatus ='';
        if(me.param.value.status){
          oldStatus = me.param.value.status
        }else{
          oldStatus = ''
        }
        me.param.value.status = status;
        me.param.value.orderId = id;
        var param = JSON.stringify(me.param);
        me.$http.post({
          url:me.GLOBAL.serviceHepler.conn.modify_order,
          data:{
            param:param
          }
        }).then(function(result) {
          console.log(result);
          if(oldStatus){
            me.getList(oldStatus);
          }else{
            me.getList('');
          }
        }).catch(function() {
          console.log("出错了");
        })
      },
      /* 确认收货*/
      confirm(e) {
        var me = this;
        var id = e.target.dataset.id;
        wx.showModal({
          title: '提示',
          content: '确定已收到吗',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定');
              me.changeStatus(id,4)
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        /*me.dialog = true;
        Dialog.confirm({
          title: '是否确认收货'
        }).then(() => {
          // 确认按钮
          var param = {
            value:{
              status:4,
              orderId:e.target.dataset.id
            }
          };
          param = JSON.stringify(param);
          me.$http.post({
            url:me.GLOBAL.serviceHepler.conn.order_edit,
            data:{
              param:param
            }
          }).then(function(result) {
            console.log(result);
            me.getList();
          }).catch(function() {
            console.log("出错了");
          })
        }).catch(() => {
          // 取消按钮
          console.log("1111取消");
        });*/
      },
      /* 取消订单*/
      orderCancel(e) {
        var me =this;
        me.newId = e.target.dataset.id;
        console.log(me.newId)
        me.userId = e.target.dataset.userid
        console.log(me.userId)
        wx.showModal({
          title: '提示',
          content: '确定取消订单吗',
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定');
              // me.deleteOrder(me.newId,me.userId)
              me.changeStatus(me.newId,5)
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        /*this.dialog = true;
        Dialog.confirm({
          title: '标题',
          message: '弹窗内容'
        }).then(() => {
          // 确认按钮
          console.log("1111确认");
        }).catch(() => {
          // 取消按钮
          console.log("1111取消");
        });*/
      },
      /*删除订单或者取消订单*/
      deleteOrder(){
        var me = this;
        var param = {
          value:{
            userId:me.userId,
            orderId:me.newId,
            status:5
          }
        }
        param = JSON.stringify(param)
        me.$http.post({
          url:me.GLOBAL.serviceHepler.conn.order_modify_order,
          data:{
            param:param
          }
        }).then(function(result) {
          console.log(result);
          if(oldStatus){
            me.getList(oldStatus);
          }else{
            me.getList('');
          }
        }).catch(function() {
          console.log("出错了");
        })
      }
    },
  }
</script>
<style scoped>
  .orderDiv {
    background-color: #f8f8f8;
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
  .orderContent{
    width: 100%;
    text-align: center;
    font-size: 12px;
    color: #999;
    line-height: 20px;
    min-height:100vh;
  }
  .orderItem {
    background-color: white;
    margin: 15px;
    padding: 10px;
    border-radius: 5px;
  }
  .orderStatus{
    text-align: left;
    border-bottom: 1px solid #f8f8f8;
    color: #e93b3d;
    font-size: 14px;
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
  .goodsBrief{
    padding: 5px 0px 5px 15px;
  }
  .briefName {
    font-size: 14px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-align: left;
  }
  briefNames{
    font-size: 14px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-align: left !important;
    color:#999
  }
  .totalNum{
    font-size: 10px;
    float: right;
    margin-right: 10px;
  }
  .totalPrice{
    float: right;
  }
  em{
    font-size: 12px;
    float: left;
  }
  i{
    font-size: 12px;
    float: left;
  }
  .orderHandle {
    border-top: 1px solid #f8f8f8;
    text-align: right;
    color: #e93b3d;
    font-size: 14px;
    padding-top: 5px;
    height: 25px;
  }
  .handleItem {
    float: right;
    margin-left: 5px;
  }
  .nomore {
    color: #999;
    text-align: center;
    font-size: 12px;
  }
</style>
