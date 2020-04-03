// const host = 'https://sp.lyiggroup.com:2443/ag-shop-api/';
const host = 'https://sp.lyiggroup.com:1443/ag-shop-api/';
// const host = 'https://www.lyiggroup.com:1443/ag-shop-api/';
// const host = 'http://192.168.60.242:8080/ag-shop-api/';
// const host = "http://192.168.30.108:8080/ag-shop-api";
// const host = 'http://192.168.1.30:8222/ag-shop-api/';
function request(url, method, data, header = {}) {
    wx.showLoading({
        title: '加载中' // 数据请求前loading
    })
    return new Promise((resolve, reject) => {
        wx.request({
            url: host + url, // 仅为示例，并非真实的接口地址
            method: method,
            data: data,
            header: {"content-type": "application/x-www-form-urlencoded"},
            success: function (res) {
                wx.hideLoading()
                resolve(res.data)
            },
            fail: function (res) {
                wx.hideLoading()
                // reject(false)
            },
            complete: function () {
                wx.hideLoading()
            }
        })
    })
}

function get(obj) {
    return request(obj.url, 'GET', obj.data)
}

function post(obj) {
    return request(obj.url, 'POST', obj.data)
}

export default {
    request,
    get,
    post,
    host
}
