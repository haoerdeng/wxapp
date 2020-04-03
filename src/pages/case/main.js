import Vue from 'vue'
import App from './index'

// add this to handle exception
Vue.config.errorHandler = function (err) {
  if (console && console.error) {
    console.error(err)
  }
}

const app = new Vue(App)
app.$mount()
export default {
  //这个字段走app.json
  config: {
    pages: [
      'pages/user/main',
      'pages/logs/main',
      'pages/index/index/main'
    ],

    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "skyblue",
    navigationBarTitleText: "新春有'艾'  宅家GO",
    navigationBarTextStyle: "black"

  }

}