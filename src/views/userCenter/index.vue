
<template>
  <div class="userCenter">
    <HeadNavigation></HeadNavigation>
    <div style="width:1200px;position:relative;padding:25px 0px;margin:0 auto;margin-top:70px;">
        <BreadNavigation :BreadList="['用户中心']"></BreadNavigation>
    </div>
      <div style=" max-width: 1920px; height: 266px; background: #000000; opacity: 0.9;">
        <div class="data-info" style="width:1200px;position:relative;height:100%;margin:0 auto;">
            <div class="left-box">
                <div style="width:184px;height:184px;float: left;border-radius: 50%;overflow:hidden;margin-right:44px;position: relative;box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);">
                    <img style="width:100%;height: 100%;" :src="$store.state.baseUser.headportrait==null? require('@/assets/collegeDetail/left-zhaosheng.png') : Global.img_BASE_URL+$store.state.baseUser.headportrait "/>
                </div>
                <div style="float: left;display: flex;flex-direction: column;justify-content: center;">
                    <div style="margin-bottom:15px;font-size: 30px;">{{$store.state.baseUser.sNick}}</div>
                    <div style="font-size:16px;">{{$store.state.baseUser.province || '北京'}} -- {{$store.state.baseUser.city || '东城'}}</div>
                </div>
            </div>

            <div class="right-box">
                <ul>
                     <li>
                        <div>关注</div>
                        <div>0</div>
                    </li>
                    <li>
                        <div>收藏</div>
                        <div>0</div>
                    </li>
                    <li>
                        <div>消息</div>
                        <div>0</div>
                    </li>
                </ul>
            </div>
        </div>
      </div>
    <Content></Content>
    <Footer></Footer>
    <RightMessageBar></RightMessageBar>
  </div>
</template>
<script>
  import HeadNavigation from "@/components/HeadNavigation";
  import Footer from "@/components/Footer";
  import RightMessageBar from "@/components/RightMessageBar";
  import BreadNavigation from "@/components/BreadNavigation";
  import Content from "@/views/userCenter/Content";
  export default {
  components: {
    HeadNavigation,
    Footer,
    RightMessageBar,
    BreadNavigation,
    Content
  },
  data() {
    return {
	  dataBase: []
    };
  },
  mounted() {
	this.getList()
  },
  
  methods: {
	

	getList() {
		this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/index`).then(response => {
			this.dataBase=response.data
		})
	}
    
  },
  computed:{
   
  }
};
</script>
<style lang="less" scoped>
    .userCenter{
        background: #F4F4F4;
    }
    .left-box{
      
        color: #fff;
        position: absolute;
        left: 0;
        bottom: -40px;
        display: flex;
      
    }
    .right-box{
        float:right;  
        color: #fff;
        position: absolute;
        bottom: 0;
        right: 0;
        ul{
            overflow: hidden;
            margin-bottom: 15px;

        }
        ul li{
            float: left;
            margin-right:30px;
            font-size:24px;
            text-align: center;
        }
        ul li div:first{
            margin-bottom: 15px;
        }

    }
</style>





