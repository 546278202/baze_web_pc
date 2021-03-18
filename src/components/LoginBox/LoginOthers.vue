<template>
    <div  :class="accept=='register'? 'register':'login-others'">
        <div class="title"> 第三方账号登陆</div>
        <div>
            <i class="iconfont icon-weixin1" style="color:#46BB36;" @click="weixinLogin"></i>
            <i class="iconfont icon-sign_qq"></i>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
export default {
  name: "LoginOthers",
  props: {
    accept:String
  },
  components: {
  },
  data() {
    return {

    };
  },
  mounted() {
	  
  },
  methods: {
	weixinLogin(){
		this.axios .get(this.Global.BASE_URL + `/index.php?r=web/site/login`, { params: {}}).then(response => {
			console.log(response);
			if (response.code == "0") {
				let data=response.data
				//微信登录
				let params={
					appid:data.wx_appid,
					redirect_uri:data.wx_redirect_uri,
					response_type:data.wx_response_type,
					scope :data.wx_scope,
					state :data.wx_state,
				}
				let webUrl='https://open.weixin.qq.com/connect/qrconnect?'
				window.location.replace(webUrl+qs.stringify(params) +'#wechat_redirect')
			}
		}) 	
	}
  }
};
</script>
<style lang="less" scoped>
.login-others {
  text-align: center;
  .title{
		font-size:16px;
		color:#CCCCCC;
		margin-bottom:20px;
	}
  /deep/ .iconfont {
    margin-right: 20px;
	font-size: 36px;
	cursor: pointer;
  }
  .iconfont:hover{
	color:#46BB36;
  }
  .iconfont:last-child {
    margin-right: 0;
  }
}

.register {
	display: flex;
    justify-content: center;
    align-items: center;
    justify-content: space-between;
	.title{
		font-size:16px;
		color:#CCCCCC;
	}
	/deep/ .iconfont {
		margin-right: 20px;
		font-size: 36px;
		cursor: pointer;
	}
	.iconfont:hover{
		color:#46BB36;
	}
	.iconfont:last-child {
		margin-right: 0;
	}
}
</style>
