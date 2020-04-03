import Vue from 'vue'
import App from './index'

const app = new Vue(App)

app.$mount()
export default {
    //这个字段走app.json
    config: {
        enablePullDownRefresh: true,
        backgroundTextStyle: "light",
        navigationBarBackgroundColor: "skyblue",
        navigationBarTitleText: "个人中心",
        navigationBarTextStyle: "black"

    }

}