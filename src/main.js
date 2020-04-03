import Vue from 'vue'
import App from './App'
import Fly from './utils/wx-request'
import Commonjs from './utils/common'
import store from './store/index.js'
Vue.prototype.$store = store

Vue.prototype.$http = Fly;
Vue.prototype.GLOBAL = Commonjs;
Vue.config.productionTip = false;
Vue.prototype.constIP = 'https://sp.lyiggroup.com:8443'; //110.185.161.69:8654阿里服务器地址
Vue.prototype.cloudIP = 'https://sp.lyiggroup.com:8443'; //110.185.161.69:58005阿里图片服务器地址
App.mpType = 'app';
const app = new Vue(App);

Vue.prototype.globalData = app.globalData 

app.$mount()
export default {
    //这个字段走app.json
    config: {
        pages:[
            "pages/productDetails/main",
            'pages/index/index/main'

        ],
        window: {
            backgroundTextStyle: "light",
            navigationBarBackgroundColor: "skyblue",
            navigationBarTitleText: "新春有'艾'  宅家GO",
            navigationBarTextStyle: "black"
        }
    },
  globalData: {
    header: { 'Cookie': '***' }
  }

}
