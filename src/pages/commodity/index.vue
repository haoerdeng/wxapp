<template>
  <div style="background-color: #f8f8f8;overflow:hidden" >
    <swiper :swiper="swiper"/>
    <card :icon="icon"></card>
    <recommendForYou></recommendForYou>
    <advertisingPosition></advertisingPosition>
    <explosion :arr="arr"></explosion>
  <!--  <choiceness :pickList="pickList"></choiceness> -->
  </div>
</template>

<script>
import swiper from "@/components/swiper";
import card from "@/components/card";
import recommendForYou from "@/components/recommendForYou";
import advertisingPosition from "@/components/advertisingPosition";
import explosion from "@/components/explosion";
// import choiceness from "@/components/choiceness";
// import test from "@/components/test";
export default {
  data() {
    return {
      swiper:[],
      icon:[],
      arr:[
        {
          img:"/static/images/12.jpg",
          title:"芝华士1233132132132",
          price:"1299"
        },
        {
          img:"/static/images/12.jpg",
          title:"芝华士1233132132132",
          price:"1299"
        },{
          img:"/static/images/12.jpg",
          title:"芝华士1233132132132",
          price:"1299"
        },{
          img:"/static/images/12.jpg",
          title:"芝华士1233132132132",
          price:"1299"
        },{
          img:"/static/images/12.jpg",
          title:"芝华士1233132132132",
          price:"1299"
        },{
          img:"/static/images/12.jpg",
          title:"芝华士1233132132132",
          price:"1299"
        }
      ]
      // pickList:[],
      // hotList: [],
      // groupBuy:[]
    };
  },
  components: {
    swiper,
    card,
    recommendForYou,
    advertisingPosition,
    explosion
    // choiceness,
    // test
  },
  mounted() {           //请求数据，操作dom，放在这个里面 必须记住
    var me=this;
    me.$http.post({
      url:me.GLOBAL.serviceHepler.conn.index_swiper,
      data:{}
    }).then(function(result) {
      console.log(result);
      var swiper=result.value;
      me.swiper = swiper
    }).catch(function() {
      console.log("出错了");
    })
    me.$http.post({
      url:me.GLOBAL.serviceHepler.conn.index_classification,
      data:{}
    }).then(function(result) {
      console.log(result);
      var icon=result.value;
      me.icon = icon
    }).catch(function() {
      console.log("出错了");
    })
  },
  methods: {
    
  },

  created() {
    //生命周期函数
    // let app = getApp()
  }
};
</script>

<style scoped>
.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
.all {
  width: 7.5rem;
  height: 1rem;
  background-color: blue;
}
.all:after {
  display: block;
  content: "";
  clear: both;
}
.message {
  color: red;
  padding: 10px;
  text-align: center;
}
</style>



