
var serviceHepler = {};
serviceHepler.conn = {
  /**
   * 服务器接口
   */
  login_code:"login/onlogin", //发送用户code给后台
  activity_list:"indexactivitytable/lst", //获取活动列表
  item_recommend:"item/recommend",  // 获取热销产品
  kids_list:"classification/lst",  //获取分类列表
  // goods_list:"shopitemshow/classifylst", //获取商品列表页
  item_select_item_attr:"item/select-item-attr",//分类列表详情
  item_select_item_blur:"item/select-item-blur",//搜索框查询
  // 新版本购物车
  cart_add_cart:"cart/add-cart",//添加到购物车
  cart_get_cart:"cart/get-cart",//获取购物车信息
  cart_edit_cart_num:"cart/edit-cart-num",//修改购物车数量
  cart_del_cart:"cart/del-cart",//删除购物车商品
  order_submit_order:"order/submit-order",//提交购物车
  cart_get_cart_num:"cart/get-cart-num",//获取购物车数量

  //新版本查询订单
  order_get_user_order:"order/get-index-order",//查询订单状态接口
  order_cancel_order:"order/cancel-order",//删除订单
  order_modify_order  :"order/modify-order",//取消订单
  
  /* 商品详情页*/
  item_index_get_iteminfo:"item/index-get-iteminfo", //获取商品详情
  details_swiper:"shopitemshow/classdetails", //获取商品详情轮播图
  details_introduction:"shopitemshow/surmiselike",//获取商品详情介绍内容
  details_skuquery:"shopitemshow/skuquery", //获取商品详情选中的SKU的组合价

  index_swiper:"navigation/lst",//获取首页轮播图
  index_classification:"navigation/dh",//获取首页商品分类
  shop_choice:"shopitem/lst",//首页购精选
  index_recommend:"shopitem/activitylst",//首页推荐位

  submit_order:"order/save",//详情页提交订单

  order_manage:"order/lst",//我的订单页面
  cart_list:"cart/lst",//获取购物车列表
  cart_save:"cart/save",//提交到购物车
  change_num:"cart/edit", //修改购物车商品数量/状态
  cart_delete:"cart/del", //删除购物车商品
  cart_allcheckbox:"cart/allcheckbox",//购物车全选按钮
  order_save:"close/lst",//获取确认订单页面的商品
  cart_statusupdate:"cart/statusupdate",//设置购物车所有商品勾选状态为false
  specification:"shopitemshow/specification",//商品详情页规格参数
  search_items:"search/lst", //搜索
  order_edit:"order/edit", //修改订单状态
  indexactivitydiscountpackageList:"indexactivitydiscountpackage/lst",//优惠套餐接口
  receivingaddress_list:"user-address/lst", //收货地址
  receivingaddress_increase:"user-address/save", // 新增收货地址
  receivingaddress_edit:"user-address/edit", // 修改收货地址
  receivingaddress_del:"user-address/del", //删除收货地址
  baseimage_edit:"baseimage/edit",  //修改 （头像）
  basenickname_edit:"basenickname/edit ", // (昵称） 修改
  basephone_edit:"basephone/edit",//(手机号码） 修改
  basesex_edit:"basesex/edit", //性别 修改
  itemclasshousemade_lst:"itemclasshousemade/lst",  //全屋定制分类列表查询
  itemclasssetmeal_lst:"itemclasssetmeal/lst",  //成品分类列表查询
  activity_lst:"activity/lst", //首页跳转活动界面
  // product_sdata:"item/product-sdata",//首页热销推荐
  activityName_lst:"activityName/lst" ,//测试
  get_category:"classification/get-category", //获取分类
  pay_order_money:"pay/order-money",//获取订单金额以及传参付款
  hpageproduct_recommend:"item/product-recommendation", // 获取 成品推荐
  modify_order :"order/modify-order",//改变订单状态
  loop_info:"loop/get-loop-info",//首页广告轮播图
};
/**
 * 工具类
 */
var utilHelper = {};
/**
 * 订单状态
 */
utilHelper.fromatOrderState = function(tempState){
  switch(tempState){
    case 1:tempState = '未支付';break;
    case 2:tempState = '已付款';break;
    case 3:tempState = '已发货';break;
    case 4:tempState = '交易完成';break;
    case 5:tempState = '交易关闭';break;
  }
  return tempState;
};

/**
* 时间戳转换为时间
*/
utilHelper.fromatDate = function(timestamp, type) { // 如果type==1,显示时分秒,其他的就不显示
  if (timestamp === 0 || timestamp == null) {
    return ''
  } else {
    var d = new Date(timestamp);// 根据时间戳生成的时间对象
    var tempDate = (d.getFullYear()) + '-' +
      (d.getMonth() + 1) + '-' +
      (d.getDate()) + ' ';
    if (type === 1) {
      tempDate = tempDate +
        (d.getHours()) + ':' +
        (d.getMinutes()) + ':' +
        (d.getSeconds())
    }
    return tempDate
  }
};

/**
 * 剩余时间
 */
utilHelper.remainTime = function(timestamp) {

  // 天数位
  var day = Math.floor(timestamp / 3600 / 24/1000);
  var dayStr = day.toString();
  if (dayStr.length === 1) {
    dayStr = '0' + dayStr;
  }

  // 小时位
  var hr = Math.floor(timestamp / 3600/ 1000 % 24);
 // var hr = Math.floor(timestamp / 3600);  //直接转为小时 没有天 超过1天为24小时以上

  var hrStr = hr.toString();
  if (hrStr.length === 1) {
    hrStr = '0' + hrStr;
  }

  // 分钟位
  var min = Math.floor(timestamp / 60/ 1000 % 60);
  var minStr = min.toString();
  if (minStr.length === 1) {
    minStr = '0' + minStr;
  }

  // 秒位
  var sec = Math.floor(timestamp/ 1000 % 60);
  var secStr = sec.toString();
  if (secStr.length === 1) {
    secStr = '0' + secStr;
  }

  return dayStr+ "天" + hrStr + ":" + minStr + ":" + secStr;
};

export default {
  serviceHepler,
  utilHelper
}
