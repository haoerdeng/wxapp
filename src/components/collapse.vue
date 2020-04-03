<template>
  <div>
    <div class="goodsDisplay">
      <van-row class="detailsTitle">
        <van-col span="22" class="goodsTitle">{{introduce.itemName}}</van-col>
        <!-- <van-col span="2">
          <van-icon name="star-o"/>
          <p class="session">收藏</p>
        </van-col> -->
        <div class="introduce">
          <van-col span="24" custom-class="sellpoint">
            <div v-html="introduce.itemNameSecond"> </div>
          </van-col>
        </div>
        <div v-if="activity" class="detailsMoney">
          <van-row>
            <van-col span="18">
              <div class="moneyLeft">
                <div class="nowPrice left">
                  ￥{{introduction.price == "" ? introduce.price : introduction.price}}
                </div>
                <div class="orginalDiv left">
                  <div class="orginalTitle">商城秒杀</div>
                  <div class="orginalPrice">￥{{introduction.price == "" ? introduce.price : introduction.price}}</div>
                </div>
              </div>
            </van-col>
            <van-col span="6">
              <div class="remainDiv">
                <div class="remainTitle">距结束还剩</div>
                <div class="remainTime">21:59:02</div>
              </div>
            </van-col>
          </van-row>
          <!-- <van-col>降价提醒</van-col> -->
        </div>
        <div v-else class="detailsMoney">
          <div class="normalPrice">
            ￥{{introduction.price == "" ? introduce.price : introduction.price}}
          </div>
        </div>
      </van-row>
    </div>
    <div class="goodsSku">
      <van-collapse :value="[collapseStatus]" @change="collapseChange($event)">
        <van-collapse-item name="1" >
          <div slot="title">
            <span>已选</span>
            <span class="selectedItems">{{introduction.attrname}}</span>
            <span class="selectedItems">{{introduction.productNum}}件</span>
          </div>
          <div class="skuContent">   
            <van-row>
              <van-col span="24">选择规格</van-col>
              <van-col span="24"  v-for="(items,index) in introduce.shopSkuinfo" :key="index">
                <div  class="skuItem"  
                    :class='{ active:skuIndex===index}'
                    :data-tapid="items.id"
                    :data-parentid="index"
                    :data-attrname="items.skuInfo"
                    :data-price="items.price"
                    :data-stock="items.inStock"
                    :data-images="items.shopImage[0].imageAddress"
                    :data-skuInfo="items.skuInfo"
                    @click="navbarTap($event,index)"
                >
                  {{items.skuInfo}}
                </div>
              </van-col>
            </van-row>
          </div>
          <div v-if="stepperShow" >
            <van-row>
              <van-col span="4">数量</van-col>
              <van-col span="8" offset="1">
                <van-stepper value="1"
                  @change="changeNum"
                  input-class="stepClass"
                  :data-num="num"
                  plus-class="stepClass"
                  minus-class="stepClass"
                />
              </van-col>
              <van-col span="10">（库存{{introduction.stock}}件）</van-col>
            </van-row>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // introduce:Object,
    skuGroup:[],//sku  以前[]
     stepperShow:{ // sku完成后再展示步进器
      type:Boolean
    },
    num:Number,
    selectItem:{},
    stock:'',//库存
    activity:false //是否是活动商品
  },
  data() {
    return {
      collapseStatus:'',  //sku折叠面板样式变化*/
      skuIndex: "" ,
      introduction:{
        stock:"",
        attrname:"",
        price:"",
        productNum:1
      },
      id:"",
      introduce:{},
      
    };
  },
  onLoad:function(){
    this.skuIndex = ""
    this.introduction.stock = ""
    this.introduction.attrname = ""
    this.introduction.productNum = 1
    this.introduction.price = ""
    var me = this
    /* 获取商品ID和类ID*/
    console.log(me.$root)
    console.log(me.$root.$mp)
    console.log(me.$root.$mp.query)
    if(me.$root.$mp.query != ""){
      me.goodsId=me.$root.$mp.query.id;
    }else{
      me.goodsId=me.$root.id;
    }
    console.log("获取出来的")
    console.log(me.goodsId)
    /* 获取商品信息*/
    var param={
      value:{
        id:me.goodsId != "" ? me.goodsId : me.id
      }
    };
    console.log(param)
    me.$http.post({
      url:me.GLOBAL.serviceHepler.conn.item_index_get_iteminfo,
      data:{
        param:JSON.stringify(param)
      }
    }).then((result) =>{
      console.log('---------introduce  open--------------');
      console.log(result)
      me.introduce = {}
      me.introduce = result.value[0]
      console.log( me.introduce)
      console.log('---------introduce  over--------------');
    }).catch((err) => {
      console.log("出错了");
    });
  },
  methods: {
    /* sku样式展开与关闭*/
    collapseChange:function(event){
      var me = this;
      console.log(event)
      var status = event.mp.detail;
      if(status.length === 0){
        me.collapseStatus = status
      }else if(status.length !== 0) {
        me.collapseStatus = '1'
      }
    },
    /* 数量改变*/
    changeNum:function(e) {
      this.$emit('changeNum', e)
      // console.log(e)
      this.introduction.productNum = e.mp.detail
    },
    /* sku点击事件*/
    navbarTap(e,index) {
      this.$emit('currentTab', e)
      console.log(e)
      this.skuIndex = index
      this.introduction.stock = e.target.dataset.stock
      this.introduction.attrname = e.target.dataset.attrname
      this.introduction.price = e.target.dataset.price
    }
  }
};
</script>
<style scoped>
  /* 第一个大盒子*/
.goodsDisplay {
  margin-top:5px;
  padding:0 7px;
  background:#fff;
  font-size: 15px;
  font-weight: 400;
  margin-bottom: 10px;
}

  .left{
    float: left;
  }
  /* 第一个大盒子里内容*/
  .detailsTitle .goodsTitle{
  padding: 5px 0 10px 0;
}
  .detailsTitle van-icon {
    position: relative;
    left: 15px;
  }
  .detailsTitle .session {
    text-align: right;
    font-size: 8px;
    color: #666;
  }
  .introduce van-col{
    width: 100%;
    color: #f00 !important;
    display: inline-block;
    -webkit-line-clamp:1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .detailsMoney {
    height: 50px;
  }
  .moneyLeft{
    background-color: lightcoral;
    color: white;
    height: 50px;
    width: 100%;
  }
  .nowPrice{
    font-size: 16px;
    font-weight: bold;
    line-height: 50px;
  }
  .normalPrice{
    font-size: 16px;
    line-height: 50px;
    color: #f00;
    height: 50px;
  }
  .orginalDiv{
    font-size: 12px;
    color: white;
    margin: 5px 10px;
  }
  .orginalTitle{
    border: 1px solid white;
    padding: 2px;
    text-align: center;
  }
  .orginalPrice{
    text-decoration:line-through
  }
  .remainDiv{
    height: 50px;
    background-color: #f3f3f3;
    text-align: center;
    padding: 0 18px;
  }
  .remainTitle {
    font-size: 10px;
    padding-top: 10px;
  }
  .remainTime{
    font-size: 12px;
    background-color: white;
    padding: 2px;
    border: 1px solid #ededed;
    color: lightcoral;
    width: 50px;
  }
  /* sku样式*/
  .skuContent {
    margin-top: 5px;
  }
  .selectedItems {
    margin-left: 10px;
  }
  .skuItem {
    background-color:#efefef;
    color:#333;
    border-radius:5px;
    padding:2px 8px;
    width:fit-content;
    margin-bottom:5px;
    margin-right:18px;
    display:inline-block;
    margin: 5px 0px;
  }
  .active{
    background-color:#f33;
    color:#fff;
  }
</style>
<style>
  /* 步进器样式*/
  .goodsSku .stepClass {
    height: 25px !important;
    width: 30px !important;
  }
</style>
