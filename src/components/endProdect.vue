<template>
    <div class="hotContainer">
      <div class="contTitle">成品推荐</div>
      <div class="hotMain">
        <van-row gutter="10">
          <van-col span="12" v-for="(items,index) in endProdect" :key="index">
            <div class="hotItem" @click="thisClick(items)">
              <div class="itemImage">
                <img :src="items.photoUrl" alt=""> 
              </div>
              <div class="itemTitle">{{items.photoTitle}}</div>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
</template>

<script>
  export default {
    name: "indexHotGoods",
    data(){
      return {
        image:"",
      }
    },
    props:{
      endProdect:[]
    },
    methods: {
      thisClick:function(e){
        const url = '/pages/productdetails/main?id=' + e.jumpUrl + '&specialId=' + 1;
        mpvue.redirectTo({url})
        console.log(url)
      }
    },
  };
</script>

<style scoped>
  .hotContainer {
    width: 90%;
    margin: 0 auto;
    padding: 10px;
  }
  .contTitle{
    text-align: center;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    padding: 5px;
    color: #fff;
    position: relative;
  }
  .contTitle:after,.contTitle:before{
    content: '';
    position: absolute;
    top: 52%;
    background: #bebebe;
    width: 39%;
    height: 1px;

  }
  .contTitle:before{
    right: 0;
  }
  .contTitle:after{
    left: 0;
  }
  .hotMain{
    background-color: white;
  }
  .hotItem{
    padding: 10px;
  }
  .itemImage{
    width: 140px;
    height: 140px;
    margin: 0 auto;
  }
  .itemImage>img{
    width: 100%;
    height: 100%;
  }
  .itemTitle{
    font-size: 14px;
    line-height: 20px;
    height: 40px;
    display: -webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-align: center;
  }
</style>
