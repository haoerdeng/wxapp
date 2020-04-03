<template>
  <div class="orderDiv">
    <!--页面tab栏-->
    <van-tabs :active="active" @change="onChange">
      <van-tab title="我的收藏">
        <div class="orderContent">
          <div>
            <collectionList :collectionList="collectionList"></collectionList>
            <lovely :image="image"></lovely>
          </div>
        </div>
      </van-tab>
      <van-tab title="我的足迹">
        <div class="orderContent">你暂时没有足迹</div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import collectionList from "@/components/collectionList";
  import lovely from "@/components/lovely";
  export default {
    data() {
      return{
        active:0,
        collectionList:[],
        image:[],
      }
    },
    components: {
      collectionList,
      lovely,
    },
    mounted() {           //请求数据，操作dom，放在这个里面 必须记住
      var me = this;
      var pageId = me.$root.$mp.query.pageid;
      console.log(pageId);
      me.active = parseInt(pageId);
      var cid = me.$root.$mp.query.id;
      console.log("----------------------")
      console.log(cid)
      console.log("----------------------")
      //   var param ={
      //     value:{
      //       cid:cid
      //     }
      //   };
      //   param = JSON.stringify(param);
      //   me.$http.post({
      //     url:me.GLOBAL.serviceHepler.conn.goods_list,
      //     data:{
      //       param:param
      //     }
      //   }).then(function(result) {
      //     console.log(result);
      //     me.collectionList = result.value;
      //   }).catch(function() {
      //     console.log("出错了");
      // })
      me.$forceUpdate();
        var id=me.$root.$mp.query.id;
        var cid=me.$root.$mp.query.cid;
        console.log(id)
        console.log(cid)
        var detailsParam={
          value:{
            "cid":cid
          }
        }
        var detailsParam=JSON.stringify(detailsParam)
        me.$http.post({
          url:me.GLOBAL.serviceHepler.conn.details_introduction,
          data:{
            param:detailsParam
          }
        }).then(function(result) {
          var image=result.value;
          me.image = image
        }).catch(function() {
          console.log("出错了");
        })
    },
    methods: {
      onChange(e) {
        console.log(e.target.dataset)
      },
      toProductDetails(goodsid,kidsid) {
        console.log("商品id:"+goodsid+"；种类id:"+kidsid);
        const url = '/pages/productdetails/main?id='+goodsid+"&cid="+kidsid;
        mpvue.navigateTo({url})
      }
    },
  }
</script>
<style scoped>
  .orderDiv {
    background-color: #f8f8f8;
  }
  .orderContent{
    text-align: center;
    font-size: 12px;
    color: #999;
    line-height: 20px;
    height: 20px;
    min-height:100vh;
  }
</style>
