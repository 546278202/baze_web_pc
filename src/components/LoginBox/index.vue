<template>
    <div class="login-box">
		<el-dialog :visible.sync="dialogVisible" :lock-scroll="false" custom-class="custom-class" :closed="handleClose" :before-close="handleDialogClose">
			<div class="login-left-box">
				<img src="@/assets/login-box.jpg">
			</div>
			<div class="login-right-box" :is="currentView" ></div>
		</el-dialog>
	</div>
</template>
<script>
// 导入子组件
import login from './login';
import register from './register';
export default {
  data() {
    return {
		dialogVisible: true,
    }
  },
  methods: {
    tabChange(tabItem) {
		console.log(tabItem)
	},
	handleClose(){
      	this.$store.commit('changeShowLoginBox', false);
	},
	handleDialogClose(){
      	this.$store.commit('changeShowLoginBox', false);
    }
  },
  components: {
    login,
    register
  },
	computed:{
    	currentView(){
      		return this.$store.state.loginBoxStatus
    	}
  	}
};
</script>
<style lang="less" scoped>
 	.login-box{
       	/deep/  .el-dialog__body{
			padding: 0; 
			color: #606266;
			font-size: 14px;
			word-break: break-all;
			overflow: hidden;
			box-sizing: border-box;
			height:512px;
    	}
    	/deep/	.el-dialog__header{
			padding:0;
			margin:0,
      	}
      	/deep/  .custom-class{
			background: #fff;
			width:738px;
			box-sizing: border-box;
			background: #fff;
      	}
	}

	.login-left-box{
		width:324px;
		height:512px;
		background:#23D3B5;
		float:left;
		img{
			width:100%;
		}
	}
	.login-right-box{
		width:414px;
		height:512px;
		float:left;
		padding: 40px 24px 24px 24px;
		box-sizing: border-box;
	}

</style>
