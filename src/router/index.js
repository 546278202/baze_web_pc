import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
//解决路由跳转原路由或者刷新出错
const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
};
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
export default new Router({
    routes: [{
            path: '/',
            name: 'home',
            component: () =>import ('@/views/home'),
            meta: { title: '首页',  auth: false }
        },
        {
            path: '/home',
            name: 'home',
            component: () =>import ('@/views/home'),
            meta: { title: '首页',  auth: false }
        },
        {
            path: '/productList',
            name: 'productList',
            component: () =>import ('@/views/productList'),
            meta: { title: '课程',  auth: false }
        },
        {
            path: '/LiveList',
            name: 'LiveList',
            component: () =>import ('@/views/LiveList'),
            meta: { title: '点播',  auth: false }
        },
        {
            path: '/EducationPromotion',
            name: 'EducationPromotion',
            component: () =>import ('@/views/EducationPromotion'),
            meta: { title: '学历提升', auth: false }
        },

        {
            path: '/videoDetail',
            name: 'videoDetail',
            component: () =>import ('@/views/videoDetail'),
            meta: { title: '录播详情', auth: false }
        },
        {
            path: '/LiveDetail',
            name: 'LiveDetail',
            component: () =>import ('@/views/LiveDetail'),
            meta: { title: '直播详情', auth: false }
        },
        {
            path: '/EducationAuthentication',
            name: 'EducationAuthentication',
            component: () =>import ('@/views/EducationAuthentication'),
            meta: { title: '证书查询', auth: false }
        },
        {
            path: '/EducationAuthenticationDetail',
            name: 'EducationAuthenticationDetail',
            component: () =>import ('@/views/EducationAuthenticationDetail'),
            meta: { title: '证书详情', auth: false }
        },
        {
            path: '/userCenter',
            name: 'userCenter',
            component: () =>import ('@/views/userCenter'),
            meta: { title: '用户中心', auth: true }
            
        },
        {
            path: '/collegesList',
            name: 'collegesList',
            component: () =>import ('@/views/collegesList'),
            meta: { title: '选择院校', auth: false }
        },
        {
            path: '/collegeDetail',
            name: 'collegeDetail',
            component: () =>import ('@/views/collegeDetail'),
            meta: { title: '院校详情', auth: false }
        },
        {
            path: '/collegeRules',
            name: 'collegeRules',
            component: () =>import ('@/views/collegeRules'),
            meta: { title: '招生简章', auth: false }
        },
        {
            path: '/majorList',
            name: 'majorList',
            component: () =>import ('@/views/majorList'),
            meta: { title: '选择专业', auth: false }
        },
        {
            path: '/majorDetail',
            name: 'majorDetail',
            component: () =>import ('@/views/majorDetail'),
            meta: { title: '专业详情', auth: false }
        },
        {
            path: '/majorDetailSubmit',
            name: 'majorDetailSubmit',
            component: () =>import ('@/views/majorDetailSubmit'),
            meta: { title: '提交报名信息', auth: false }
        },
        {
            path: '/AboutUs',
            name: 'AboutUs',
            component: () =>import ('@/views/AboutUs'),
            meta: { title: '关于我们', auth: false }
        },
        {
            path: '/paymentPage',
            name: 'paymentPage',
            component: () =>import ('@/views/paymentPage'),
            meta: { title: '待支付', auth: true }
        },
        {
            path: '/order/detail',
            name: 'order/detail',
            component: () =>import ('@/views/order/detail'),
            meta: { title: '订单详情', auth: true }
        },
        {
            path: '/userAgreement',
            name: 'userAgreement',
            component: () =>import ('@/views/userAgreement'),
            meta: { title: '服务协议', auth: false }
        },
        {
            path: '/userServe',
            name: 'userServe',
            component: () =>import ('@/views/userServe'),
            meta: { title: '售后服务', auth: false }
        },
        {
            path: '/userPrivacy',
            name: 'userPrivacy',
            component: () =>import ('@/views/userPrivacy'),
            meta: { title: '用户隐私', auth: false }
        },
        {
            path: '/bindAccount',
            name: 'bindAccount',
            component: () =>import ('@/views/bindAccount'),
            meta: { title: '账号绑定', auth: false }
        },
        {
            path: '/passwordForget',
            name: 'passwordForget',
            component: () =>import ('@/views/passwordForget'),
            meta: { title: '找回密码', auth: false }
        },
        {
            path: '/enterpriseDetaill',
            name: 'enterpriseDetaill',
            component: () =>import ('@/views/enterpriseDetaill'),
            meta: { title: '合作院校详情', auth: false }
        },
        {
            path: '/newsDetail',
            name: 'newsDetail',
            component: () =>import ('@/views/newsDetail'),
            meta: { title: '文章详情', auth: false }
        },
        {
            path: '/page_404',
            name: 'page_404',
            component: () =>import ('@/views/statusPage/404'),
            meta: { title: '404', auth: false }
        },
        
        { path: '*', redirect: '/' }
    ],
    mode: "history",
    scrollBehavior: () => ({ x: 0, y: 0 }),
})

