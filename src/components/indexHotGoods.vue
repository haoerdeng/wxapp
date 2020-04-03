<template>
    <div class="hotContainer" @click="getHotGoods">
      <div style="width:100%;background:#fff;">
        <div class="contTitle">{{topTitle}}</div>
        <div class="contTitles" @click="toMore">更多>></div>
      </div>
      <div class="hotMain">
        <van-row gutter="10">
          <van-col span="12"  v-for="(items,index) in hotGoods" :key="index">
            <div class="hotItem" @click="linkTo(items)"> 
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
        topTitle:"爆款推荐",
      }
    },
    props:{
      hotGoods:[]
    },
    onLoad(){

    },
    methods: {
      linkTo:function(e){
        console.log(e)
        const url = '/pages/productdetails/main?id=' +  e.jumpUrl + '&specialId=' + 1
        mpvue.redirectTo({url})
        console.log(url)
      },
      toMore(){
        console.log("????")
      },
    }
  }
</script>

<style scoped>
  .hotContainer {
    padding: 10px;
  }
  .contTitle{
    line-height: 30px;
    font-size: 16px;
    padding: 5px 10px;
    display: inline-block;
    color:#000;
    background: #fff;
    margin-top: 5px;
  }
  .contTitles{
    float: right;
    font-size: 14px;
    margin-top: 10px;
    margin-right: 10px;
  }
  /* .contTitle:after,.contTitle:before{
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
  } */
  .hotMain{
    background-color: white;
  }
  .hotItem{
    padding: 10px 10px 0px 10px;
  }
  .itemImage{
    height: 110px;
  }
  .itemImage>img{
    width:100%;
    height:100%;
    box-shadow: 0px 0px 5px #e8e8e8
  }
  .itemTitle{
    font-size: 14px;
    line-height: 30px;
    height: 40px;
    display: -webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-align: center;
    margin-top: 5px;
  }
</style>
