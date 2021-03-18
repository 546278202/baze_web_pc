<template>
  <div class="content">
    <div class="left-nav">
       <ul >
            <li style="font-size:30px;background:#23D3B5;color:#fff;"><span>个人中心</span></li>
            <li v-for="(item,index) in leftNavList" :key="index" @click="togglePage(item)" :class="comName==item.path ? 'active_class' : '' "> <i :class="'iconfont ' + item.icon"></i><span>{{item.name}}</span></li>
            <li @click="handleSignOut"> <i class="iconfont icon-tuichudenglu"></i><span>退出登录</span></li>
        </ul>
    </div>
     <!-- <keep-alive> -->
      <component :is="comName"></component>
    <!-- </keep-alive> -->
  </div>
</template>
<script>
  import Course from "./Course";
  import Orders from "./Orders";
  import Collection from "./Collection";
  import AddressManagement from "./AddressManagement";
  import MyCertificate from "./MyCertificate";
  import invoiceManagement from "./invoiceManagement";
  import information from "./information";
  import CollegeRegistration from "./CollegeRegistration";

  import mixin from '@/mixin'; // 引入mixin文件
  export default {
    mixins: [mixin],
    components: {
        Course,
        Orders,
        Collection,
        AddressManagement,
        MyCertificate,
        invoiceManagement,
        information,
        CollegeRegistration
    },
  data() {
    return {
        comName:'Course',
        leftNavList: [
            {name:"我的课程",path:'Course',icon:'icon-wodekecheng'},
            {name:"我的收藏",path:'Collection',icon:'icon-fav'},
            {name:"我的订单",path:'Orders',icon:'icon-wodedingdan2'},
            {name:"院校报名",path:'CollegeRegistration',icon:'icon-gerenxinxi'},
            {name:"个人信息",path:'information',icon:'icon-gerenxinxi'},
            {name:"收货地址",path:'AddressManagement',icon:'icon-dizhi'},
            {name:"发票申请",path:'invoiceManagement',icon:'icon-fapiaoguanli'},
            {name:"我的证书",path:'MyCertificate',icon:'icon-zhengshu'}
            ],
        activeName: 'first'

    };
  },

  beforeMount() {
      
  },
  mounted() {
      
    if(this.$route.query.type){
        this.comName=this.$route.query.type
    }
  },
  methods: {
    // 设置页面scrollTop值
	setScrollTop(){
		let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
		document.documentElement.scrollTop=420
	},
    togglePage(item){
        this.$router.push({ path: '/userCenter', query:{type:item.path}});
        
        this.$nextTick(() => {
           this.setScrollTop()
        });
        switch(item.path){
            case "Course" :
                this.comName = "Course";
                break;
            case 'Orders' :
                this.comName = "Orders";
                break;
            case 'Collection' :
                this.comName = "Collection";
                break;
            case 'AddressManagement' :
                this.comName = "AddressManagement";
                break;
            case 'invoiceManagement' :
                this.comName = "invoiceManagement";
                break;
            case 'MyCertificate' :
                this.comName = "MyCertificate";
                break;   
            case 'information' :
                this.comName = "information";
                break;   
            case 'CollegeRegistration' :
                this.comName = "CollegeRegistration";
                break;   
        }
    }
  },
  computed:{

  }
};
</script>
<style lang="less" scoped>
    .content{
       min-height:600px;
       margin:0 auto;
       margin-top:70px;
       width:1200px;
       position:relative;
       height:100%;
       margin:0 auto;
       overflow: hidden;
       margin-top: 100px;
       margin-bottom: 100px;
       padding: 20px;

    }
    
    .content .left-nav{
        float:left;
        min-height:800px;
        width:346px;
        border:1px solid #ebeef5;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        background: #23D3B5;
        border-radius: 10px;
        overflow: hidden;
        background: #fff;
        font-size: 24px;
        color:#666;
    }
    .content .left-nav ul{
        width:100%;
       li{
            height: 62px;
            line-height: 62px;
            cursor: pointer;
            .iconfont{
                font-size: 22px;
                margin-right:20px;
            }
            padding-left:64px;
            box-sizing: border-box;
            border-bottom:2px solid #E4E4E4;
        }
        li:last-child{
            border-bottom:0;
        }
        li:hover{
           background: #22D3B5;
           color:#fff
       }
   }
.active_class{
    background: rgb(35, 211, 181);
    color:#fff;

}
   //tabs导航
.el-tabs{
    // background:#fff;
    // margin-top: 20px;
    /deep/ .el-tabs__item{
        font-size:20px;
        height:50px;
        line-height: 50px;;
    }
    /deep/ .el-tabs__nav {
        // margin-left:60px;
    }
    /deep/ .el-tab-pane{
        // padding:0 60px;
    }
}
</style>





