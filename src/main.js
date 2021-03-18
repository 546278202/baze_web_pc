import Vue from 'vue'
import store from './store/store'
import App from './App'
import './theme/index.css'
import ElementUI from 'element-ui'
import './styles/common.css'
// import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import Global from './Base'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import 'swiper/dist/css/swiper.css';
// import 'swiper/swiper-bundle.css'
axios.defaults.withCredentials = true

let loading
let needLoadingRequestCount = 0 // 声明一个对象用于存储请求个数
function startLoading() {
    loading = Vue.prototype.$loading({
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}

function endLoading() {
    loading.close()
}

function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading()
    }
    needLoadingRequestCount++
}

function hideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        endLoading()
    }
}


function _isMobile() {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    return flag;
}

// http request 拦截器
axios.interceptors.request.use(function(config) {
    showFullScreenLoading()
    if (config.method == 'post') {
        config.headers['Content-Type'] = 'application/json; charset=utf-8';
    }
    if (config.method == 'get') {
        config.data = qs.stringify(config.data);
    }
    if (config.method == 'patch') {
        config.headers['Content-Type'] = 'application/json; charset=utf-8';
    }
    return config
}, error => {
    hideFullScreenLoading()
    return Promise.reject(error.response)
});

// http response 拦截器
axios.interceptors.response.use(response => {
    hideFullScreenLoading()
    return response.data;
}, error => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                store.commit('changeLogin', null);
                ElementUI.Message.error('未授权，请登录');
                store.commit("changeShowLoginBox", true);
                break;
            case 404:
                ElementUI.Message.error('404');
                break;
            case 500:
                ElementUI.Message.error(`服务器异常${error.response.status},请联系管理员！`);
        }
    } else {
        ElementUI.Message.error('请求错误或服务器异常,请联系管理员！');
    }
    endLoading()
    return Promise.reject(error); // 返回接口返回的错误信息
});

//路由跳转
router.beforeEach((to, from, next) => {
    NProgress.start()
    const defaultTitle = '即牛教育'
    document.title = to.meta.title ? to.meta.title : defaultTitle
    if(to.matched){
        if (to.matched.some(m => m.meta.auth)) {
            if (JSON.parse(localStorage.getItem("store")).baseUser) {
                next()
            } else {
                router.replace('/home')
            }
        } else {
            next()
        }
    }
})
router.afterEach((to, from, next) => {
    NProgress.done()
})
Vue.prototype.axios = axios;
Vue.prototype.Global = Global;
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})




