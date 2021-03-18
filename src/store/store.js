/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-11-28 18:39:56
 * @LastEditors: 
 * @LastEditTime: 2020-11-29 15:54:28
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

//定义vuex
const store = new Vuex.Store({

    state: {
        baseUser: null,
        showLoginBox: false, //登录框
        title: null,
        searchModel: 0,
        menuDataIndex: 0,
        currentIndex: '0',
        // historyList: [],
        loginBoxStatus:'login'

    },
    mutations: {
        changeLogin(state, data) {
            state.baseUser = JSON.parse(data)
        },
        changeTitle(state, msg) {
            state.title = msg
        },

        getsearchModel(state, msg) {
            state.searchModel = msg
        },
        // 登录框
        changeShowLoginBox(state, msg) {
            state.showLoginBox = msg
        },
        // 导航
        changeMenuDataIndex(state, msg) {
            state.menuDataIndex = msg
        },
        // 导航
        changeActive(state, msg) {
            state.currentIndex = msg
        },
        // changeHistoryList(state, msg) {
        //     state.historyList.push(msg)
        //     state.historyList = state.historyList.slice(-2)

           
        // },
        //注册框 // 登录 //短信
        changeLoginBoxStatus (state, msg) {
            state.loginBoxStatus = msg
        },

    }
})
export default store