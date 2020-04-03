<template>
  <div style="background:#fff;margin-top:10rpx">
    <van-tabs :active="active" :change="onChange">
      <div class="recommendChange">
        <van-tab title="商品介绍">
          <div v-for="(item, index) in pic" :key="index" class="imgContent">
            <image :src="item.url"/>
          </div>
        </van-tab>
        <van-tab title="规格参数">
          <div class="rule">
            <div class="leftLine"></div>
            <div class="ruleName">规格参数</div>
            <div class="rightLine"></div>
          </div>
          <div class="tableRule" > <!--v-for="(item,indexs) in paramData" :key="indexs"-->
            <table cellpadding="0" cellspacing="1" width="100%" border="0">
              <tr>
                <th>主体</th>
              </tr>
              <tr>
                <td colspan="2">包装尺寸</td>
                <td colspan="2">定制决定</td>
              </tr>
              <tr>
                <td>商品承重(kg)</td>
                <td>定制决定</td>
              </tr>
              <tr>
                <td>组装尺寸</td>
                <td>定制决定</td>
              </tr>
              <tr>
                <th>主体</th>
              </tr>
              <tr>
                <td>商品编号</td>
                <td>10264135135</td>
              </tr>
            </table>
          </div>
        </van-tab>
        <van-tab title="售后保障">
          <div class="rule">
            <div class="leftLine"></div>
            <div class="ruleName">权利声明</div>
            <div class="rightLine"></div>
          </div>
          <p
            class="monstransDeDroit"
          >京东商城上的所有商品信息、客户评价、商品咨询、网友讨论等内容，是京东商城重要的经营资源，未经许可，禁止非法转载使用。本站商品信息均来自于厂商，其真实性、准确性和合法性由信息拥有者（厂商）负责。本站不提供任何保证，并不承担任何法律责任。</p>
          <div class="rule">
            <div class="leftLine"></div>
            <div class="ruleName">服务承诺</div>
            <div class="rightLine"></div>
          </div>
          <p
            class="monstransDeDroit"
          >京东商城向您保证所售商品均为正品行货，京东自营商品开具机打发票或电子发票。凭质保证书及京东商城发票，可享受全国联保服务（奢侈品、钟表除外；奢侈品、钟表由京东联系保修，享受法定三包售后服务），与您亲临商场选购的商品享受相同的质量保证。京东商城还为您提供具有竞争力的商品价格和</p>
        </van-tab>
      </div>
    </van-tabs>
  </div>
</template>
<script>
export default {
  props: {
    pic: {
      type: Array
    },
    paramData:{
      type: Array
    }
  },
  data: {
    active: 1
  },
  onClickDisabled(event) {
    wx.showToast({
      title: `商品介绍 ${event.detail.index} `
    });
  }
};
</script>
<style scoped>
.recommendChange {
  z-index: -1;
  padding-bottom: 120rpx;
}
.tableRule {
  padding: 0 30rpx;
  margin-top: 30rpx;
  box-sizing: border-box;
  width: 100%;
}
table {
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  width: 100%;
  margin-bottom: 10px;
  border-collapse: collapse;
  font-size: 12px;
  border-spacing: 0;
  line-height: 18px;
}
tr {
  width: 100%;
}
table tr td,
table tr th {
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  text-align: center;
}
tr td:first-child {
  width: 38%;
  display: inline-block;
}
tr td:nth-child(2) {
  width: 61.3%;
  float: right;
}
.monstransDeDroit {
  font-size: 24rpx;
  margin-top: 30rpx;
  padding: 0 30rpx;
}
.rule {
  padding: 0 30rpx;
}
.ruleName {
  text-align: center;
  margin: 0 auto;
  font-size: 24rpx;
}
.leftLine {
  width: 35%;
  border: 1rpx solid #eee;
  opacity: 0.5;
  display: inline-block;
  position: relative;
  top: 30rpx;
}
.rightLine {
  width: 35%;
  border: 1rpx solid #eee;
  float: right;
  position: relative;
  top: -19rpx;
  opacity: 0.5;
}
.imgContent {
  margin: 10rpx auto;
  text-align: center;
  width: 100%;
  display: inline-block;
}
.imgContent image{
  width: 100%;
  text-align: center;
}
</style>