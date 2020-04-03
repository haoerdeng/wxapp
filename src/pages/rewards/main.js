import Vue from 'vue'
import App from './index'

const app = new Vue(App)

app.$mount()
export default {
    //这个字段走app.json
    config: {
        pages: [
            'pages/index/main',
            'pages/productdetails/main'
        ],

        enablePullDownRefresh: true,
        backgroundTextStyle: "light",
        navigationBarBackgroundColor: "skyblue",
        navigationBarTitleText: "我的奖励",
        navigationBarTextStyle: "black"

    }

}