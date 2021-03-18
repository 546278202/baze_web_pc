<template>
    <div class="HeadNavigation">
        <div style="width:1200px;position: relative;margin: 0 auto;height: 70px;">
            <ul class="list" style="overflow: hidden;float: left;">
                <li style="display: flex;align-items: center;margin-right:30px;">
                    <router-link :to="{path:'/home'}" style="display: flex;"> 
                        <img src="@/assets/logo/logo2.png" style="width:124px;height:38px;"/>
                    </router-link>
                </li>
                <li v-for="(item,index) in items" :key="index" @click="routerLink(item,index)" :class="{ 'item-active' : currentIndex == index}" >{{item.text}} </li>
            </ul>
            <div  style="float: left; overflow: hidden;height: 70px;line-height: 70px;width: 250px;">
                <router-link  class="input-mode" :to="{path:'/EducationAuthentication' , query:{tabCode:'2'}}">
                    <input placeholder="学历查询" /> <i class="iconfont icon-sousuo"></i>
                </router-link>
            </div>
           
            <div  v-if="$store.state.baseUser"  @mouseleave="dropDownMenuenter('leave')" style="float: right; overflow: hidden;height: 70px;line-height: 70px;">
                <router-link  @mouseenter.native="dropDownMenuenter('enter')" class="has-right-login" :to="{path:'/userCenter' , query:{}}">
                    <img :src="$store.state.baseUser.headportrait ? Global.img_BASE_URL+$store.state.baseUser.headportrait: require('@/assets/collegeDetail/left-zhaosheng.png')" />
                </router-link>
                 <!-- 个人中心下拉菜单 -->
                <DropDownMenu ref="DropDownMenu"></DropDownMenu>
            </div>        
            <div class="right-login" v-else><a style="padding:0 10px;" @click="login('login')">登录</a>  |  <a style="padding-left:10px;" @click="login('register')">注册</a> </div>
        </div>
    </div>
</template>
<script>
import DropDownMenu from "@/components/HeadNavigation/DropDownMenu";

export default {
    components: {
        DropDownMenu
    },
    data() {
        return {
            currentIndex:this.$store.state.currentIndex,
            items: [
                { path: "/home", text: "首页", icon: "icon-shouye1", active: 0 },
                { path: "/productList", text: "点播课程", icon: "icon-classify_icon", active: 1 },
                { path: "/LiveList", text: "在线课程", icon: "icon-classify_icon", active: 2 },
                { path: "/EducationPromotion", text: "学历提升", icon: "icon-gouwuche", active: 3 },
                { path: "/AboutUs", text: "合作加盟", icon: "icon-wode", active: 4 },

            ],
            menuDataList:[],
            menuItemChildList:[],
        };
    },

    beforeMount() {},
    created(){

    },
    mounted() {
       if(this.$route.fullPath=='/' || this.$route.fullPath=='/home'){
            this.$store.commit('changeActive', 0);
       }
    },
    methods: {
     routerLink(item,index) {
        this.$store.commit('changeActive', index);
        if(item.path=="/AboutUs"){
            this.$router.push({ path: item.path, query: { params: "third" } })
        }else{
            this.$router.push(item.path);
        }
    },
    
    login(val){
        // 未登陆
        if(!this.$store.state.baseUser){
            this.$store.commit('changeShowLoginBox', true); //打开对话框
            this.$store.commit('changeLoginBoxStatus', val); //对话框类型
        }
    },
    
    dropDownMenuenter(event){
        if(event=='enter'){
            this.$nextTick(() => {
                this.$refs.DropDownMenu.$el.style.display="block"   
            });
        }
        if(event=='leave'){
            this.$nextTick(() => {
                this.$refs.DropDownMenu.$el.style.display="none"   
            });
        }
    }
  },
  watch: {
   
  },
  
};
</script>
<style lang="less" scoped>
    /*头部导航 */
.HeadNavigation{
    width:100%;
    height:70px;
    background:#000000;
    color:#fff;
    font-size:14px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1234;
    /* overflow: hidden; */
}
.HeadNavigation .right-login{
    float: right; 
    overflow: hidden;
    height: 70px;
    line-height: 70px;
  
}
.HeadNavigation .has-right-login{
    float: right; 
    overflow: hidden;
    height: 70px;
    line-height: 70px;
    display: flex;
    align-items: center;
    // cursor: pointer;
    img{
        width:50px;height:50px;border-radius: 50%;
    }
    
}

.HeadNavigation .right-login a:hover{
    cursor: pointer;
    color:#23D3B5;
} 
.HeadNavigation ul li{
    float:left;
    margin-right:50px;
    line-height: 70px;
    cursor: pointer;
    position: relative;
    color: #fff;
}
.HeadNavigation ul li{
    float:left;
    margin-right:50px;
    line-height: 70px;
    cursor: pointer;
    position: relative;
    height: 70px;
    box-sizing: border-box;
}
.item-active{
    color:#23D3B5 !important;
    border-bottom: 4px solid #23D3B5;
}

    
.HeadNavigation ul li:hover{
    cursor: pointer;
    color: #22D3B6;
} 
.HeadNavigation .input-mode{
    height: 30px;
    line-height: 30px;
    border: 1px solid #23D3B5;
    border-radius: 6px;
    padding: 0 5px;
    margin-top: 20px;
    position: relative;
    display: inline-block;
    width: 250px;
    box-sizing: border-box;
    color: #fff;
    
}
.HeadNavigation .iconfont{
    font-size: 18px !important;
    position: absolute;
    right: 8px;
    top:0;
    cursor: pointer;

    
}
.HeadNavigation .input-mode input{
    height: 30px;
    width: 100%;
    BACKGROUND-COLOR: transparent;
    border: none;
    outline:none; 
    color: #fff
}



</style>