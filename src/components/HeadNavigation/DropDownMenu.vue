<template>
     <!-- 热门课程 -->
    <div class="DropDownMenu" @mouseleave="dropDownMenuenter('leave')">
        <ul>
            <li v-if="$store.state.baseUser.pid=='2'"><a :href="Global.BASE_URL+'/index.php?r=web/admin/adminindex'"  target="_blank" > 进入后台 </a></li>
            <li><router-link :to="{path:'/userCenter'}"> 我的课程 </router-link></li>
            <li><router-link :to="{path:'/userCenter'}"> 我的收藏 </router-link></li>
            <li><router-link :to="{path:'/userCenter'}"> 我的订单 </router-link></li>
            <li><router-link :to="{path:'/userCenter'}"> 个人信息 </router-link></li>
            <li><router-link :to="{path:'/userCenter'}"> 发票申请 </router-link></li>
            <li><router-link :to="{path:'/userCenter'}"> 账号安全 </router-link></li>
            <li @click="handleSignOut">退出登录</li>
        </ul>
    </div>
</template>
<script>

import mixin from '@/mixin'; // 引入mixin文件
export default {
    mixins: [mixin],
    props:{
        list:Array
    },
    components: {
    
    },
    data() {
        return {
        };
    },

  beforeMount() {},
  mounted() {
    
  },
  methods: {
    dropDownMenuenter(event){
        if(event=='enter'){
            this.$nextTick(() => {
                this.$refs.DropDownMenu.style.display="block"   
            });
        }
        if(event=='leave'){
            this.$nextTick(() => {
                this.$parent.$refs.DropDownMenu.$el.style.display="none"
            });
        }
    },
   
    enter($event) {
        $event.currentTarget.className = 'imghover';
    },
    leave($event) {
        $event.currentTarget.className = 'imghoverout';
    },
    itemClick(item){
        this.$router.push({ path: '/productList' });
    }
  }
};
</script>
<style lang="less" scoped> 
    /* 热门课程 */
    .DropDownMenu{
        position: absolute;
        right:0;
        top:70px;
        width:133px;
        // z-index:-11;
        display: none;

    }
   .DropDownMenu ul{
        margin-top:5px;
        padding:10px 0;
        background: #fff;
        border-radius: 4px;
        font-size: 16px;
        text-align: center;
        color:#000;
        border:1px solid #ebeef5;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
       li{
            height: 33px;
            line-height: 33px;
            cursor: pointer;
            a{
                color: #000;
                display: flex;
                text-align: center;
                justify-content: center;
                align-items: center;
            }
        }
        li:hover{
           background: #22D3B5;
           color:#fff
        }
        li a:hover{
           color:#fff
        }
   }
</style>






