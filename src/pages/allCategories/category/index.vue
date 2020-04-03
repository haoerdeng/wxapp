<template>
  <div class="classify container">
    <form action="/" style="width:100%">
      <van-search placeholder="请输入搜索关键词" :value="searchWords" @search="onSearch" @cancel="onCancel"></van-search>
    </form>
    <!--分类导航栏-->
    <!-- <categoriesList :categoriesList="categoriesList" ref="leftView"></categoriesList> -->
    <!--ref="leftView"定义子组件锚点-->
    <div class="categoriesList">
      <scroll-view class="left-navbar" scroll-y="false" @click="navbarTap">
        <view id="customized" :class="currentTab === 'customized' ? 'active' : ''">{{categoryOne}}</view>
        <view id="finishProduct" :class="currentTab === 'finishProduct' ? 'active' : ''">{{categoryTwo}}</view>
        <view id="endProduct" :class="currentTab === 'endProduct' ? 'active' : ''">{{categoryThree}}</view>
      </scroll-view>
      <scroll-view id="right" scroll-y="true" :scroll-top="scrollTop">
        <div class="rightDiv">
          <div v-if="currentTab==='customized'">
            <div class="cstmdTitle">{{categoryName}}</div>
            <van-row gutter="20">
              <van-col span="12" v-for="(item,index) in categoryLittle" :key="index"> <!--  v-for="(item,index) in categories" :key="index" -->
                <div class="introImg" @click="toPctDetails" :data-listid="item.id">
                  <img :src="item.images" alt="123">
                  <p style="text-algin:center;">{{item.name}}</p>
                </div>
              </van-col>
            </van-row>
            <div class="cstmdTitle" style="margin-top:10px">{{categoryNames}}</div>
            <div class="cstmdImg" @click="toAppointment"> <!-- v-for="(items,ind) in category" :key="ind" -->
              <img :src="freeImage" alt="123">
            </div>
          </div>
          <div v-else-if="currentTab==='finishProduct'">
            <van-row gutter="20">
              <van-col span="12" v-for="(category,index) in finishProducts" :key="index" @click="toCtgDetails"  :data-listid="category.id">
                <div class="categoryImg">
                  <img :src="category.images" alt="23">
                </div>
                <div class="categoryTitle">{{category.name}}</div>
              </van-col>
            </van-row>
          </div>
          <div v-else>
            <van-row gutter="20">
              <van-col span="12" v-for="(endProdu,index) in endProducts" :key="index" @click="toCtg"  :data-listid="endProdu.id">
                <div class="categoryImg">
                  <img :src="endProdu.images" alt="23">
                </div>
                <div class="categoryTitle">{{endProdu.name}}</div>
              </van-col>
            </van-row>
          </div>
        </div>
        <!--<categeriescomtent :categeriescomtent="categeriescomtent"></categeriescomtent>-->
      </scroll-view>
    </div>
  </div>
</template>

<script>
import categoriesList from "@/components/categoriesList";
// import categeriescomtent from "@/components/categeriescomtent";
export default {
  data() {
    return {
      searchWords: "",
      currentTab: "customized", //对应样式变化
      scrollTop: 0, //用作跳转后右侧视图回到顶部
      categoriesList: [],
      categeriescomtent: [],
      banner: "",
      categoryOne:"",
      categoryTwo:"",
      categories: [],
      category: [],
      categoryLittle:[],
      finishProducts:[],
      categoryName:"",
      categoryNames:"",
      freeImage:"",
      statusBarHeight:0,
      endProducts:[],
      categoryThree:""
    };
  },
  components: {
    categoriesList,
    // categeriescomtent
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
  onShow() {
    //请求数据，操作dom，放在这个里面 必须记住
    var me = this;
    let pages = getCurrentPages();
    console.log(pages)
    // me.finishProduct()
    // me.changeRight()
    var param = {
      value: {
        parentId: 0
      }
    };
    param = JSON.stringify(param);
    me.$http.post({
        url: me.GLOBAL.serviceHepler.conn.get_category,
        data: {
          param: param
        }
      }).then((result)=> {
        console.log("???????????")
        // me.categoriesList = result.value;
        this.categoryLittle = result.value[0].childTbItemCat[0].childTbItemCat
        console.log(result.value[0].name)
        this.categoryName = result.value[0].childTbItemCat[0].name
        this.categoryOne = result.value[0].name;
        this.categoryTwo = result.value[1].name;
        this.categories =  result.value[0].childTbItemCat[0].childTbItemCat
        this.finishProducts = result.value[1].childTbItemCat
        this.categoryNames = result.value[0].childTbItemCat[1].name
        this.category =  result.value[0].childTbItemCat
        this.freeImage = result.value[0].childTbItemCat[1].images
        this.endProducts = result.value[2].childTbItemCat
        this.categoryThree = result.value[2].name;
        console.log(this.endProducts)
        this.changeRight(me.categoriesList[0].id); //右边内容
        /* me.changeRight(me.$refs.leftView.currentTab);/!*me.$refs.leftView.currentTab 父组件调用子组件数据*!/*/

        this.scrollTop = 0;
          
      }).catch((err) => {

        console.log("生成订单出错了");
      });
      
  },
  methods: {
    /* 点击左侧选项*/
    navbarTap(e) {
      if (e.target.id) {
        this.currentTab = e.target.id;
      }
    },
    //点击右侧目录去往分类列表页
    toCtgDetails(e) {
      console.log(e);
      var listid = e.currentTarget.dataset.listid
      const url = "/pages/allCategories/categoriesDetails/main?id=" + listid;
      mpvue.navigateTo({ url });
    },
    toCtg(e){
      var listid = e.currentTarget.dataset.listid
      const url = "/pages/allCategories/categoriesDetails/main?id=" + listid;
      mpvue.navigateTo({ url });
    },
    toPctDetails(ev){
      console.log("我被点击了")
      console.log(ev)
      var listid = ev.currentTarget.dataset.listid
      const url = "/pages/allCategories/categoriesDetails/main?id=" + listid;
      mpvue.navigateTo({ url });
      // // var itemId = 
      // const url = "/pages/productdetails/main?id=" + 45;
      // mpvue.redirectTo({url})
    },
    /* 点击去免费预约页面*/
    toAppointment() {
      const url = "/pages/freeBooking/main";
      mpvue.navigateTo({ url });
    },
    /* 搜索*/
    onSearch(e) {
      var me = this;
      var searchWords = e.mp.detail;
      var param = {
        value: {
          title: searchWords
        }
      };
      param = JSON.stringify(param);
      me.$http
        .post({
          url: me.GLOBAL.serviceHepler.conn.item_select_item_blur,
          data: {
            param: param
          }
        })
        .then(function(result) {
          var url = "";
          console.log("长度：" + result.value.length);
          if (result.value.length > 0) {
            url = "/pages/allCategories/categoriesDetails/main?searchWords=" + searchWords;
          } else {
            url = "/pages/blankPage/main";
          }
          mpvue.navigateTo({ url });
        })
        .catch(function() {
          console.log("出错了");
        });
    },
  }
};
</script>
<style scoped>
/* 左边视图*/
.left-navbar {
  position: absolute;
  left: 0;
  width: 25%;
  height: 80%;
  background-color: #eee;
  font-size: 12px;
  white-space: nowrap;
  display: flex;
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
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
.left-navbar view {
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.active {
  background-color: #fff;
  color: red;
  font-size: 14px;
}

/* 右边列表*/
#right {
  position: absolute;
  right: 0;
  width: 75%;
  height: 90%;
}
.rightDiv {
  padding: 15px;
}
/* 全屋定制*/
.cstmdTitle {
  color: #333;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
}
.introImg {
  height: 100px;
  font-size: 14px;
  margin-bottom: 28px;
}
.introImg img {
  height: 100px;
  width: 115px;
}
.cstmdImg {
  height: 150px;
}
.cstmdImg img {
  width: 250px;
  height: 150px;
}
/* 成品*/
.categoryTitle {
  color: #333;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin-bottom: 20px;
}
.categoryImg {
  height: 100px;
  font-size: 14px;
}
.categoryImg img {
  height: 100px;
  width: 115px;
}
/*隐藏滚动条*/
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
.categoriesList{
  width: 100%;
}
</style>
