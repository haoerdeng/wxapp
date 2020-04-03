<template>
  <div class="allStyle container">
    <div class="allContentBg">
      <van-tabs swipeable>
        <van-tab title="涨知识">
          <div class="addRecieve" v-for="(item,index) in recieve" :key="index">
            <van-row>
              <van-col span="13">
                <van-col span="24">
                  <h6 class="titleMessage">{{item.title}}</h6>
                </van-col>
                <van-col span="24">
                  <span class="viewNum">涨知识.浏览{{item.num}}次</span>
                </van-col>
              </van-col>
              <van-col span="10" offset="1">
                <van-col span="24">
                  <img :src="item.img" alt="" class="imgRecieve">
                </van-col>
              </van-col>
            </van-row>
          </div>
        </van-tab>
        <van-tab title="家装案例">家装案例</van-tab>
        <van-tab title="家装案例">
          <div class="photos">
            <ul class="list">
              <li class="list-item" v-for="(item,index) in listImg" :key="index">
                <div class="item-content" v-if="index%2==0">
                  <div @click="linkToo">
                    <img class="avatar" :src="item.img" mode="widthFix"/>
                    <div class="titles">
                      {{item.name}}
                    </div>
                  </div>
                  <van-row>
                    <van-col span="12">
                      <div class="clickView linkTo">
                        <img src="/static/icons/view.png" alt="" class="pic">
                        <p>123</p>
                      </div>
                    </van-col>
                    <van-col span="12">
                      <div class="clickGood linkTo">
                        <img src="/static/icons/good.png" alt="" class="pic">
                        <p>321</p>
                      </div>
                    </van-col>
                  </van-row>
                </div>
              </li>
            </ul>
            <ul class="list">
              <li class="list-item" v-for="(item,index) in listImg" :key="index">
                <div class="item-content" v-if="index%2==1">
                  <div @click="linkToo">
                    <img class="avatar" :src="item.img" mode="widthFix"/>
                    <div class="titles">
                      {{item.name}}
                    </div>
                  </div>
                  <van-row>
                    <van-col span="12">
                      <div class="clickView linkTo">
                        <img src="/static/icons/view.png" alt="" class="pic">
                        <p>123</p>
                      </div>
                    </van-col>
                    <van-col span="12">
                      <div class="clickGood linkTo">
                        <img src="/static/icons/good.png" alt="" class="pic">
                        <p>321</p>
                      </div>
                    </van-col>
                  </van-row>
                </div>
              </li>
            </ul>
          </div>
        </van-tab>
        <van-tab title="VR全景">
          <div class="VRList">
            <van-row>
              <van-col span="12"  v-for="(item,index) in VRlist" :key="index">
                <img :src="item.img" alt="" class="VRimg">
                <span class="VRName">{{item.name}}</span>
              </van-col>
            </van-row>
          </div>
        </van-tab>
        <van-tab title="产品相册">
          <div class="productList">
            <van-row>
              <van-col span="12"  v-for="(item,index) in productList" :key="index">
                <img :src="item.img" alt="" class="VRimg">
                <span class="VRName">{{item.name}}</span>
              </van-col>
            </van-row>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productList:[
        {
          name:"产品相册的名称",
          img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg"
        }, {
          name:"产品相册的名称",
          img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg"
        }, {
          name:"产品相册的名称",
          img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg"
        }, {
          name:"产品相册的名称",
          img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg"
        }
      ],
      VRlist:[
        {
          name:"VR的名称",
          img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg"
        }, {
          name:"VR的名称",
          img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg"
        }, {
          name:"VR的名称",
          img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg"
        }, {
          name:"VR的名称",
          img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg"
        }
      ],
      recieve:[
        {
          title:"全案时代,智享未莱。莱茵艾格2020春季新品隆重发布！智享未莱。莱茵艾格2020春季新品隆重发布!",
          num:"1",
          img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg"
        },{
          title:"全案时代,智享未莱。莱茵艾格2020春季新品隆重发布！智享未莱。莱茵艾格2020春季新品隆重发布!",
          num:"1",
          img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg"
        },{
          title:"全案时代,智享未莱。莱茵艾格2020春季新品隆重发布！智享未莱。莱茵艾格2020春季新品隆重发布!",
          num:"1",
          img:"http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg"
        }
      ],
      listImg:[
        {
          img:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2190451205,3903763302&fm=26&gp=0.jpg",
          name:"嘿！李兰妈妈~ 哇？ 都从口那绕~~~~~ 也不拎个老四，也不拎个笼，也不拎个违法佛么要厚"
        },{
          img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582522048544&di=4c704c16a07ecc501a1372abfde712a1&imgtype=0&src=http%3A%2F%2Fimg010.hc360.cn%2Fm2%2FM03%2F00%2FB6%2FwKhQclQkDNaELzhCAAAAAKE2VGk237.jpg",
          name:"嘿！李兰妈妈~ 哇？ 都从口那绕~~~~~ 也不拎个老四，也不拎个笼，也不拎个违法佛么要厚"
        },{
          img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582522048543&di=e6e5d9bfec796d467065b285625783ba&imgtype=0&src=http%3A%2F%2Fimage.it168.com%2Fn%2F640x480%2F3%2F3530%2F3530861.jpg",
          name:"嘿！李兰妈妈~ 哇？ 都从口那绕~~~~~ 也不拎个老四，也不拎个笼，也不拎个违法佛么要厚3"
        },{
          img:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1965453035,893720880&fm=26&gp=0.jpg",
          name:"嘿！李兰妈妈~ 哇？ 都从口那绕~~~~~ 也不拎个老四，也不拎个笼，也不拎个违法佛么要厚"
        },{
          img:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2190451205,3903763302&fm=26&gp=0.jpg",
          name:"嘿！李兰妈妈~ 哇？ 都从口那绕~~~~~ 也不拎个老四，也不拎个笼，也不拎个违法佛么要厚"
        },{
          img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582522048544&di=4c704c16a07ecc501a1372abfde712a1&imgtype=0&src=http%3A%2F%2Fimg010.hc360.cn%2Fm2%2FM03%2F00%2FB6%2FwKhQclQkDNaELzhCAAAAAKE2VGk237.jpg",
          name:"嘿！李兰妈妈~ 哇？ 都从口那绕~~~~~ 也不拎个老四，也不拎个笼，也不拎个违法佛么要厚"
        },{
          img:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1582522048543&di=e6e5d9bfec796d467065b285625783ba&imgtype=0&src=http%3A%2F%2Fimage.it168.com%2Fn%2F640x480%2F3%2F3530%2F3530861.jpg",
          name:"嘿！李兰妈妈~ 哇？ 都从口那绕~~~~~ 也不拎个老四，也不拎个笼，也不拎个违法佛么要厚"
        },{
          img:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1965453035,893720880&fm=26&gp=0.jpg",
          name:"嘿！李兰妈妈~ 哇？ 都从口那绕~~~~~ 也不拎个老四，也不拎个笼，也不拎个违法佛么要厚"
        }
      ]
    };
  },
  onShow() {           
    //请求数据，操作dom，放在这个里面 必须记住
    var me=this;
    
  },
  methods: {
    linkToo(){
      const url = '/pages/details/main'
      mpvue.navigateTo({url})
      console.log(url)
    },
    onConfirm() {
      this.$refs.item.toggle();
    }
  },

};
</script>

<style scoped>
.VRList{
  background: #fff;
}
.productList{
  background: #fff;
}
.imgRecieve{
  width: 100%;
  height: 100px;
  margin-top: 5px;
}
.VRimg{
  width: 80%;
  height: 120px;
  text-align: center;
  display: block;
  margin: 10px auto;
}
.VRName{
  display: block;
  text-align: center;
  margin-bottom: 10px;
}
.titleMessage{
  text-align: left;
  margin-bottom: 10px;
  margin-top: 5px;
  margin-left: 5px;
  font-size: 14px;
  overflow:hidden; 
  text-overflow:ellipsis;
  display:-webkit-box; 
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2; 
}
.addRecieve{
  background: #fff;
  margin:2px 0;
  padding: 5px;
}
.viewNum{
  display: block;
  text-align: left;
  margin-left: 5px;
  margin-top: 30px;
}
.allStyle{
  background-color: #f8f8f8;
  width: 100%;
}
.photos {
  display: flex;
}
.list {
  width: 400rpx;
}
.list-item {
  margin: 20rpx;
}
.avatar {
  width: 100%;
}
.titles{
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  text-indent: 0.5rem;
  -webkit-line-clamp:3;
  font-size: 12px;
  word-break: break-all;
  -webkit-box-orient: vertical;
}
/* .clickView{
  height: 40px;
}
.clickGood{
  height: 40px;
} */
.linkTo{
  height: 40px;
}
.linkTo p {
  display: inline-block;
  text-align: center;
  font-size: 14px;
  position: relative;
  top:-10px
}
.pic{
  width: 30px;
  height: 30px;
  margin-top: 10px;
  text-align: center;
}
.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
.all {
  width: 7.5rem;
  height: 1rem;
  /* background-color: blue; */
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
.allContentBg{
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
.swiper {
  width: 100%;
  height: 150px !important;
  /* height: 100%; */
}
image {
  height: 100%;
  width: 100%;
}
._van-col{
  text-align: center;
  vertical-align: middle;
}
.van-row{
  background: #fff;
}
._van-row{
  background: #fff !important;
}
._p{
  display: inline-block;
}
.van-icon{
  padding-top: 10px;
}
</style>



