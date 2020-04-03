<template>
  <div class="cartContent">
    <div v-if="card.length===0" class="blankContent">暂无商品，再逛一逛吧
      <div class="contentImg">
        <img src="/static/images/商品.png" alt="">
      </div>
    </div>
    <div v-else>
      <div v-for="(item,index) in card" :key="index">
        <van-swipe-cell :right-width="65">
          <van-cell-group>
            <div class="cartItem">
              <van-row>
                <van-col span="2">
                  <van-checkbox
                    :name="item.title"
                    v-model="item.select"
                    :data-select="item.select"
                    class="item"
                    @change="changeStatus($event,index)"
                  >
                  <!-- item.statusCart==='1' -->
                  </van-checkbox> 
                </van-col>
                <van-col span="22">
                  <div class="productContent" @click="toGoodsDetails($event,index)">
                    <image :src="item.image" class="imgdiv"/>
                    <div class="cartInformation">
                      <span class="title">{{item.title}}</span>
                      <span class="describ" v-html="item.skuDecription"></span>
                      <span class="money">￥
                        <b>{{item.priceCart}}</b>
                      </span>
                      <div class="number">
                        <van-stepper
                          stepperdiv:stepperdiv
                          integer
                          :value="item.num"
                          class="stepBug"
                          @change = "changeNum($event,index)"
                          @click.stop = "">
                        </van-stepper>

                      </div>
                    </div>
                  </div>
                </van-col>
              </van-row>
            </div>

          </van-cell-group>
          <view slot="right" class="delete" @click="deleteItem($event,index)">
            删除
          </view>
        </van-swipe-cell>
      </div>
    </div>
    <div>
      <van-submit-bar
      :price="totalAmount"
      button-text="提交订单"
      @submit="onClickButton($event,index)"
      custom-class="van-submit-bar"
      :tip="false"
      :disabled="totalAmountArr.commitStatus"
    >
      <div class="checkAll" @click="onChange">
        <van-checkbox :value="totalAmountArr.checkAll">全选</van-checkbox>
      </div>
      </van-submit-bar>
    </div>
  </div>

</template>


<script>
  export default {
    data(){
      return{
        newArr:[],
        num:0,
        totalAmountArr: {
          checkAll:false,
          totalAmount: 0.00,//总金额
          commitStatus:true//提交按钮disable
        },
      }
    },
    props: {
      card: [],
      newCard:[],
      num:0
    },
    computed: {
      totalAmount(){
          let total = 0;
          this.newArr.forEach(item =>{
          total += (item.priceCart*item.num) * 100;      
        })
        return total; 
      }
    },
    onShow(){
      this.newArr = []
      this.totalAmountArr.checkAll = false
      this.totalAmountArr.commitStatus = true
      if(this.totalAmountArr.checkAll == false){
        this.totalAmountArr.commitStatus = true
        this.totalAmountArr.checkAll == false
      }else{
        this.totalAmountArr.commitStatus = false
      }
    },
    // onLoad(){
    //   this.newArr = []
      
    // },
    methods:{
      //单选改变状态
      changeStatus(event,index){
        var select = this.card[index].select
        this.$set( this.card[index], "select", !select )
        this.card = [].concat(this.card);
        console.log(this.card)
        this.newArr = this.card.filter(item => {
          if( item.select ){
            return item
          }
        })
        if(this.newArr.length == 0){
          this.totalAmountArr.commitStatus = true
        }else{
          this.totalAmountArr.commitStatus = false
        }
        let count = 0;
        for(let i = 0; i < this.card.length; ++i){
          if(this.card[i].select){
            ++count;
          }
        }
        if(count == this.card.length){
          this.totalAmountArr.checkAll = true
          this.totalAmountArr.commitStatus = false
        }else{
          this.totalAmountArr.checkAll = false
        }
        
        // this.$parent.changeStatus(event,index);
      },
      changeNum(event,index){
        var me = this;
        console.log(event)
        var id = me.card[index].id;
        console.log(id)
        var number = event.mp.detail;
        var changeParam = {
          value:{
            id: id,
            num:number,
          }
        };
        me.$http.post({
          url:me.GLOBAL.serviceHepler.conn.cart_edit_cart_num,
          data:{
            param:JSON.stringify(changeParam)
          }
        }).then((result) => {
          if(result.code == 1){
            let tmpObj = this.card.filter(o => o.id == me.card[index].id);
            console.log(tmpObj);
            tmpObj[0].num = number
          }else{
            console.log("复制失败")
          }
        }).catch(function() {
          console.log("出错了");
        });
      },

      deleteItem(event,index){
        var me = this;
        var deleteId = me.card[index].id;
        this.$parent.deleteItem(deleteId);
      },
      
      toGoodsDetails(event,index) {
        var me = this;
        var goodsId = me.card[index].itemId;
        console.log("商品id:"+goodsId);
        const url = '/pages/productdetails/main?id='+goodsId + '&goIn=' + 1;
        mpvue.navigateTo({url})
      },
      //提交订单
      onClickButton(event,index) {
        var me = this;
        console.log(event)
        let goodsId = this.card.filter(o => o.select == true)
        goodsId.forEach(item => {
          item.select = false
          console.log(this.totalAmount)
        })
        console.log(goodsId)
        let goodsIds = JSON.stringify(goodsId) 
        //跳转到确认订单页面
        const url = '/pages/commitOrder/main?goodsId='+goodsIds +  '&goIn=' + 1;
        mpvue.navigateTo({url})
        this.totalAmountArr.checkAll = false
        // this.$parent.toCommitOrder();
        console.log(this.totalAmount)
        console.log(url)
      },
      //购物车全选计算
      onChange(){
        this.totalAmountArr.checkAll = !this.totalAmountArr.checkAll
        this.card.forEach(item => {
          item.select = this.totalAmountArr.checkAll
        });
        this.newArr = this.card.filter(item => {
          if( item.select ){
            return item
          }
        })
        if(this.totalAmountArr.checkAll == false){
          this.totalAmountArr.commitStatus = true
        }else{
          this.totalAmountArr.commitStatus = false
        }
        console.log(this.newArr)
        if(this.newArr.length == 0){
          this.totalAmountArr.commitStatus = true
        }
      }
    }
  };
</script>
<style scoped>
  /*内容大盒子*/
  .cartContent {
    width: 100%;
    overflow:hidden;
    height: 90vh;
  }
  .cartContent::-webkit-scrollbar {
    display: none;
  }
  /*每个商品的大盒子*/
  .cartItem {
    background-color: white;
    margin-bottom: 5px;
    transform:translate3d(0,0,0);
    height: 120px;
  }
  /*选择按钮*/
 
  .item{
    position: relative;
    left: 8px;
    top: 36px;
  }
  /*商品图片与名称等全部信息*/
  .productContent {
    height: 100px;
    position: relative;

  }
  .checkAll {
    margin-left: 7px;
  }
  /*图片盒子*/
  .imgdiv {
    position: absolute;
    left: 5px;
    display: block;
    width: 75px;
    height: 75px;
    top:13px;
  }
  .stepBug {
    padding: 0 1px;
  }
  .cartInformation {
    position:absolute;
    right:0;
    display:block;
    width:250px;
    height:75px;
    top:5px;
  }
  .number{
    position: relative;
    top: -35px;
    left:104px
  }
.title {
  display: block;
  font-size: 14px;
  margin: 5px 15px 0 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.describ {
  display: block;
  font-size: 12px;
  margin-left: 15px;
  color: #999;
}
.money {
  display: inline-block;
  font-size: 10px;
  margin-left: 15px;
  color: #f00;
}
.money b {
  display: inline-block;
  font-size: 14px;
}

  /*删除*/
  .delete{
    font-size: 17px;
    display: inline-block;
    width: 65px;
    height: 120px;
    line-height: 120px;
    color: #fff;
    text-align: center;
    background-color: #f44;
  }
  /* 无商品*/
   .blankContent{
     text-align: center;
     color: #8a8a8a;
     font-size: 16px;
     margin-top: 20px;
   }
  .blankContent .contentImg {
    width: 100px;
    height: 100px;
    margin: 20px auto;
  }
  .blankContent img{
    width: 100%;
    height: 100%;
  }
  </style>
