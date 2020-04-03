<template>
  <div class="content container">
    <!-- <div class="headerContent">
      <div :style="{height:statusBarHeight + 'px'}"></div>
      <div style="margin-bottom:5px">
        <text class="title">购物车</text>
      </div>
    </div> -->
    <cardDetails :card="card" :totalAmountArr="totalAmountArr"></cardDetails>
    <!-- <submitBar :totalAmountArr="totalAmountArr"></submitBar> -->
    <!--<youWant :youWant="youWant" ></youWant>-->
  </div>
</template>

<script>
// import submitBar from "@/components/submitBar";
// import youWant from "@/components/youWant";
import cardDetails from "@/components/cardDetails";
//注意:创建页面的时候 必须暴露  否则卡死
export default {
  data() {
    return {
      card: [],
      num:0,
      // youWant:[],
      // totalAmountArr: {
      //   checkAll:false, //全选状态
      //   totalAmount: 0.00,//总金额
      //   commitStatus:true//提交按钮disable
      // },
      token:'',
      userId:'',
      newCard:[],
      statusBarHeight:0,
      goIn:1
    }
  },
  components: {
  //  submitBar,
  //  youWant,
   cardDetails
  },
  onLoad(){
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        console.log(res)
        console.log(res.statusBarHeight)
        that.statusBarHeight = res.statusBarHeight + 12
      },
    })
  },
  methods: {
    /* 获取购物车数据*/
    getCartList(token,userid) {
      var me=this;
      var cartParam ={
        value:{
          userId:userid,
        },
        // token:token
      };
      cartParam = JSON.stringify(cartParam);
      me.$http.post({
        url:me.GLOBAL.serviceHepler.conn.cart_get_cart,
        data:{
          param:cartParam
        }
      }).then(function(result) {
        me.card = result.value;
        console.log(me.card);
        
        me.card.forEach(item => {
          item.select = false;
        })
        for(var i in me.card){
          console.log(me.card[i].num)
        }
        console.log("-------------me.card---------------");
        // if(me.card.length>0){
        //   me.calculateSolo();
        // }else{
        //   me.totalAmountArr = {
        //     checkAll:false,
        //     totalAmount: 0.00,
        //     commitStatus:true
        //   };
        // }
      }).catch(function() {
        console.log("购物车列表返回出错了");
      });
    },

    /* 更改商品数量*/
    changeGoods(changeParam){
      var me = this;
      var param = changeParam;
      param.token = me.token;
      param = JSON.stringify(changeParam)
      me.$http.post({
        url:me.GLOBAL.serviceHepler.conn.cart_edit_cart_num,
        data:{
          param:param
        }
      }).then(function(result) {
        me.getCartList(me.token,me.userId);
      }).catch(function() {
        console.log("出错了");
      });
    },
    
    /* 删除商品*/
    deleteItem(deleteId){
      var me = this;
      var param={
        value:{
          id:deleteId
        },
        token:me.token
      };
      param=JSON.stringify(param);
      me.$http.post({
        url:me.GLOBAL.serviceHepler.conn.cart_del_cart,
        data:{
          "param":param
        }
      }).then(function() {
        me.getCartList(me.token,me.userId);
      }).catch(function() {
        console.log("删除出错了");
      })
    },

    /* 计算商品总价格*/
    // calculateSolo(){
    //   var me = this;
    //   me.totalAmountArr = {
    //     checkAll:true,
    //     totalAmount: 0.00, // 总金额
    //     goodsId:[]
    //   };    //每次重置
    //   var totalNum = 0;
    //   me.card.forEach(function(i) {
    //     me.totalAmountArr.checkAll = me.totalAmountArr.checkAll&&me.card[i].select  === true;
    //     if( me.card[i].select  === true){
    //       me.totalAmountArr.totalAmount  += parseFloat(me.card[i].priceCart)*parseFloat(me.card[i].num)*100;  //每个商品总价
    //       //  me.totalAmountArr.goodsId.push(i.id);
    //       totalNum += me.card[i].num
    //     }
    //   });
    //   me.totalAmountArr.commitStatus = totalNum===0;
    // },

    // /* 提交订单页面*/
    // toCommitOrder() {
    //   var me = this;
    //   // var goodsId = me.totalAmountArr.goodsId.join(',');
    //   //跳转到确认订单页面
    //   const url = '/pages/commitOrder/main?goodsId='+ goodsId + '&goIn=' + 1;
    //   mpvue.redirectTo({url})
    //   console.log(url)
    // },

    /* 全选按钮*/
    handleAllStatus(status,index) {
      var me = this;
      var newArr = this.card.filter(item => {
         if( item.select ){
           return item
         }
      })
      console.log(newArr.length)
      for (const i in newArr) {
        
      }
    }
  },
  onShow() {           //请求数据，操作dom，放在这个里面 必须记住
    var me=this;
    wx.getStorage({
      key: 'wxSession',
      success(res) {
        me.token = res.data;
        wx.getStorage({
          key: 'userId',
          success(userRes) {
            me.userId = userRes.data;
            me.getCartList(me.token,me.userId);
          }
        });
      }
    });
  }
};
</script>

<style scoped>
  .content {
    width: 100%;
    background:#f8f8f8;
    overflow: hidden;
  }
  .headerContent{
    position: fixed;
    text-align: left;
    margin: 0 auto;
    background: #fff;
    z-index: 99;
    width: 100%;
    margin-bottom: 20px;
    padding-left: 35px;
  }
</style>

