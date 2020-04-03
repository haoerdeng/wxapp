<template>
  <div style="background:#f8f8f8;" class="container">
    <!-- <div class="headerContent">
      <div :style="{height:statusBarHeight + 'px'}"></div>
      <div class="containerHeader">
        <div  @click="clickBack">
          <image src="/static/images/back.png" class="img"></image>
        </div>
        <text class="title">商品详情页面</text>
      </div>
    </div> -->
    <div class="content">
      <!-- <van-tabs :active="active" sticky @click="clickScroll($event)" class="tabsTitle">
        <van-tab data-title="goods" title="商品"></van-tab>
        <van-tab data-title="details" title="详情"></van-tab>
        <van-tab data-title="introduce" title="推荐"></van-tab>
      </van-tabs> -->
      <!--<tab></tab>-->
      <!-- <scroll-view
        scroll-with-animation="false"
        :style="{'height': winHeight + 'px'}"
        :scroll-into-view="toView"
        scroll-y="true"
        class="maincontent"
        @scroll="scrollEve"
      > -->
        <div id="goods">
          <!--轮播图-->
          <swiperDetails :Newbanner="Newbanner"></swiperDetails>
          <!--商品信息及选择商品sku-->
          <collapse  :stepperShow="stepperShow"  
                    :selectItem="selectItem"
                    :skuGroup="skuGroup"
                    :stock="stock"
                    @changeNum="changeNum"
                    :num="num"
                    @currentTab="currentTab"
          ></collapse>
          <!-- :introduce="introduce" -->
          <!--<lovely :image="image"></lovely>-->
        </div>
        <van-tabs :active="active"  class="tabsTitle">
          <van-tab data-title="details" title="详情">
            <div v-for="(items,index) in detailsImg" :key="index" id="details">
              <image :src="items.imageAddress" alt="" id="detailsImg" mode='widthFix'> </image>
            </div>
          </van-tab>
          <van-tab data-title="canshu" title="参数"></van-tab>
          <van-tab data-title="introduce" title="推荐">
             <div>这是推荐</div>
          </van-tab>
        </van-tabs>
        <!-- <div id="details">
          
        </div>
        <div id="introduce">
         
        </div> -->
      <!-- </scroll-view> -->
    </div>
    <!--下方操作栏-->
    <goodsAction  :cartNum="cartNum" :buyHandle="buyHandle"></goodsAction>
    <!--<recommend :pic="pic"></recommend>-->
  </div>
</template>


<script>
  import tab from "@/components/tab";
  import swiperDetails from "@/components/swiperDetails";
  import collapse from "@/components/collapse";
  import goodsAction from "@/components/goodsAction";
  // import lovely from "@/components/lovely";
  // import recommend from "@/components/recommend";
  //注意:创建页面的时候 必须暴露  否则卡死
  export default {
    data() {
      return {
        Newbanner:[],
        goodsId:0,//商品ID
        myArray:[], // 轮播图
        introduce: {},//商品简介
        stepperShow:1,//步进器显示
        cartNum:0,//购物车数量
        buyHandle:false,//购买按钮权限
        selectItem:{
          skuTitle:'',//sku折叠面板已选的标题
          skuSelectArr:[], // 被选中的sku在数组中Id
          goodsPrice:0//商品sku的价格
        },
        num:1,
        skuGroup:[],//格式化返回的sku
        skuParam:{
          value:{
            saleattributeids:'',
            salepropertiesids:'',
            saleattributevalueids:''
          }
        },
        skuSelect:{ // 选中的sku具体数据
          skuSelectValue:[], // 被选中的sku名称
          saleattributevalueids:[], // 被选中的属性值id
          saleattributeids:[],//被选中的sku属性组id,比如,颜色,基材,厚度
          salepropertiesids:[]//属性项
        } ,
        stock:'0',// 库存

        active:0,
        // goodsScrollTop:0,   //商品在页面中的位置
        // detailsScrollTop:0, //详情在页面中的位置
        // introduceScrollTop:0,//推荐在页面中的位置
        // toView:'',//tab栏activeId
        // winHeight:0,//页面总高度

        saveParam:{},//加入购物车要传的参数
        saveParams:{},//加入购物车要传的参数

        session:'', // 用户session
        userId:'', //用户Id
        goodsIds:[],//跳转购买保存数据的数组
        detailsImg:[],//详情页面的详情图
        varParam:{},
        statusBarHeight:0,
        id:"",
        goIn:"",
        specialId:"",
        userInfo:{
          nickName:"",
          avatarUrl:"",
          userId:""
        }
      }
    },
    components: {
      tab,
      swiperDetails,
      // lovely,
      // recommend,
      collapse,
      goodsAction
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
      me.skuSelect = {
        skuSelectValue:[], // 被选中的sku名称
        saleattributevalueids:[], // 被选中的属性值id
        saleattributeids:[],//被选中的sku属性组id,比如,颜色,基材,厚度
        salepropertiesids:[]//属性项
      };
      me.selectItem.goodsNum = 1;
      wx.getStorage({
        key:'loginMsg',
        success(res){
          console.log(res.data)
        }
      })
      wx.getStorage({
        key: 'nickName',
        success(res) {
          me.userInfo.nickName = res.data;
          console.log(res)
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
    onShow(){
      // this.goodsIds = []
      // this.getDataList()
      this.saveParams = {}
      let pages = getCurrentPages();
      console.log(pages)
      var currPage = pages[pages.length - 1];   //当前页面
      var prevPage = pages[pages.length - 2];  //上一个页面
      let me = this;
      me.getDataList()
      me.skuSelect = {
        skuSelectValue:[], // 被选中的sku名称
        saleattributevalueids:[], // 被选中的属性值id
        saleattributeids:[],//被选中的sku属性组id,比如,颜色,基材,厚度
        salepropertiesids:[]//属性项
      };
      me.selectItem.goodsNum = 1;
      wx.getStorage({
        key: 'wxSession',
        success(res) {
          me.session = res.data;
          wx.getStorage({
            key: 'userId',
            success(userRes) {
              me.userId = userRes.data;
              me.getCartNum(me.session,me.userId);
              me.getDataList()
              // console.log('--------------------me.session,me.userId---------------------');
              // console.log(me.session,me.userId)
            }
          });
        }
      });
      
    },
    
    // onUnload(){
    //   let pages = getCurrentPages();
    //   var currPage = pages[pages.length - 1];   //当前页面
    //   var prevPage = pages[pages.length - 2];  //上一个页面
    //   // wx.navigateBack({
    //   //   delta:pages
    //   // })
    // },
    
    
    onReady(){
      this.stepperShow = true;
      this.goIn = this.$root.$mp.query.goIn
      console.log(this.goIn)
      this.specialId = this.$root.$mp.query.specialId
      console.log(this.specialId)
    },
    
    methods:{
      // getSession(){
      //   var me = this;
      //   var params={
      //     value:{
      //       "js_code":me.code,
      //       "nickName":me.nickname,
      //       "head_src":me.avatarUrl
      //     }
      //   };
      //   console.log(params);
      //   params=JSON.stringify(params);
      //   me.$http.post({
      //     url:me.GLOBAL.serviceHepler.conn.login_code,
      //     data:{
      //       param:params
      //     }
      //   }).then((result)=>{
      //     console.log("---------session---------");
      //     console.log(result);
      //     wx.setStorage({
      //       key:'wxSession',
      //       data:result.value.value.token
      //     });
      //     wx.setStorage({
      //       key:'userId',
      //       data:result.value.value.id
      //     });
      //     wx.setStorage({
      //       key:'nickName',
      //       data:result.value.value.nickName
      //     });
      //     wx.setStorage({
      //       key:'avatarUrl',
      //       data:result.value.value.head_src
      //     });
      //   })
      // },
      
      getDataList(){
        var me = this
        /* 获取商品ID和类ID*/
        console.log(me.$root.$mp)
        me.goodsId=me.$root.$mp.query.id;
        console.log(me.goodsId)
        wx.getStorage({//获取本地缓存
          key:"goodsId",
          success:(res)=>{
            this.id = res.data
            console.log(this.id )
          },
        })
        console.log(this.id )
        console.log("获取出来的")
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
          me.myArray = result.value[0].imageInfo
          me.introduce = result.value[0]
          console.log(me.introduce)
          this.saveParams['title'] = this.introduce.itemName ;
          this.saveParams['itemId'] = this.introduce.id;
          this.Newbanner = me.myArray.filter(o => o.pid == 2 )
          this.detailsImg = me.myArray.filter(o => o.pid == 1)
          me.skuGroup = result.value[0].shopSkuinfo
          let shopimage= result.value[0].shopSkuinfo[0].shopImage.filter(o=>o.pid == 0)  
          this.saveParams['image'] = shopimage[0].imageAddress
          me.stock = me.skuGroup.inStock;
          console.log('---------introduce  over--------------');
        }).catch((err) => {
          console.log("出错了");
        });
        
        wx.getSystemInfo({
          success:(res)=> {
            me.winHeight =res.windowHeight;
            console.log(res.windowWidth);
          }
        });
      },
      /* 滚动事件*/
      scrollEve:function(event) {
        var me = this;
        console.log(me.goodsScrollTop+','+me.detailsScrollTop+','+me.introduceScrollTop);
        console.log(event.target.scrollTop);
        if(event.target.scrollTop<me.detailsScrollTop-20){
          me.active = 0;
        }else if(event.target.scrollTop>me.detailsScrollTop-20 && event.target.scrollTop<me.introduceScrollTop-20){
          me.active = 1;
        }else if(event.target.scrollTop>me.introduceScrollTop-20){
          me.active = 2;
        }
      },
      // /* 数量修改事件*/
      changeNum:function(e) {
        if(e.mp.detail == 1){
          console.log(e.mp.detail)
          this.saveParams['num'] = 1
        }else{
          console.log(e.mp.detail)
          this.num = e.mp.detail
          this.saveParams['num'] = this.num;
          console.log(this.num)
        }
      },
      /* sku点击事件*/
      currentTab:function(e) {
        
        console.log(e)
        console.log(e.target)
        console.log("欧耶耶----------------------------哦哟哟我又开始了")
        this.saveParams['skuId'] = e.target.dataset.tapid;
        // this.saveParams['image'] = e.target.dataset.images;
        this.saveParams['priceCart'] = e.target.dataset.price;
        this.saveParams['skuDecription'] = e.target.dataset.skuinfo;
        this.saveParams['userId'] = this.userId;
        this.saveParams['num'] = this.num
        this.saveParams['choceNum'] = 1
        console.log(this.saveParams)
        console.log("欧耶耶----------------------------哦哟哟我又结束了")
      },
      /* 加入购物车*/
      joinCart:function() {
        var me = this;
        console.log(me.userInfo)
        if(me.userInfo.userId == ""){
          wx.showToast({
            title:'请登录后操作',
            icon:'loading',
            duration:2000
          })
        }else{
          if(this.saveParams['choceNum'] == 1){
            var param={
              value:me.saveParams
            };
            param=JSON.stringify(param);
            me.$http.post({
              //购物车状态重置
              url:me.GLOBAL.serviceHepler.conn.cart_add_cart,
              data:{
                param:param
              }
            }).then((res) =>{
              me.getCartNum(me.session,me.userId);
              wx.showToast({
                title:'添加成功',
                icon:'success',
                duration:2000
              })
            }).catch((err) => {
              console.log("修改状态出错了");
            })
          }else{
            wx.showToast({
              title:'请选择商品',
              icon:'loading',
              duration:2000
            })
          }
        }
      },
      /* 立即购买*/
      quickBuy:function(event,index) {
        this.$forceUpdate();
        var me = this;
        if(me.userInfo.userId == ""){
          wx.showToast({
            title:'请登录后操作',
            icon:'loading',
            duration:2000
          })
        }else{
          this.goodsIds = [];
          //跳转到确认订单页面
          let ParamsArr = [];
          ParamsArr.push(me.saveParams)
          let saveArr = ParamsArr;
          this.goodsIds = JSON.stringify(saveArr)
          console.log(this.goodsIds)
          if(this.saveParams['choceNum'] == 1){
            if(this.goIn == 1){
              const url = '/pages/commitOrder/main?goodsId='+this.goodsIds + '&goIn=' + 1;
              mpvue.navigateTo({url})
            }else{
              const url = '/pages/commitOrder/main?goodsId='+this.goodsIds;
              mpvue.navigateTo({url})
            }
          }else{
            wx.showToast({
              title:'请选择商品',
              icon:'loading',
              duration:2000
            })
          } 
        }
      },
      /* 获取购物车数量*/
      getCartNum:function(session,userid) {
        var me = this;
        var getCartNum={
          value:{
            userId:userid,
          },
          token:session
        };
        getCartNum=JSON.stringify(getCartNum);
        me.$http.post({
          url:me.GLOBAL.serviceHepler.conn.cart_get_cart_num,
          data:{
            param:getCartNum
          }
        }).then(function(result){
          me.cartNum=result.value;
          console.log('-----------购物车数量----------------')
          console.log(me.cartNum)
        }).catch(function() {
          console.log("获取购物车数量出错")
        })
      },
      // /*返回上一页*/
      // clickBack:function(){
      //   if(this.goIn == 1){
      //     console.log("返回购物车")
      //     const url = '/pages/shopCart/main'
      //     mpvue.navigateTo({url})
      //     console.log(url)
      //   }else if(this.specialId == 1){
      //     const url = '/pages/index/index/main';
      //     mpvue.navigateTo({url})
      //   }else{
      //     const url = '/pages/allCategories/categoriesDetails/main';
      //     mpvue.navigateTo({url})
      //   }
      // },
    },
  };
</script>

<style scoped>
  .content {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .containerHeader{
    z-index: 99;
    margin-bottom: 7px;
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
  .tabsTitle {
    width: 100%;
    z-index: 0;
  }
  .maincontent ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }
  #details{
    width: 100%;
  }
  #detailsImg{
    width: 100%;
    margin-bottom: 50px;
  }
  #introduce{
    padding-bottom: 50px;
  }
  
</style>
