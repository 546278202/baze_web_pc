<template>
  <div>
	<div class="tabs">
		<ul>
			<li> <span style="font-size: 24px;font-family: Source Han Sans CN;font-weight: 400;color: #000000;">快速注册</span></li>
			<li style="font-size:14px;">  <div  @click="loginHandleClick('login')">已有账号，<span style="color:#23D3B5;">马上登陆</span></div></li>
		</ul>
	</div>
	<el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="off" label-position="left">
		<el-form-item prop="username">
		<el-input ref="username" v-model="loginForm.username" placeholder="请输入手机号" name="username"  prefix-icon="el-icon-date" type="text" tabindex="1" auto-complete="off" clearable/>
		</el-form-item>
		<el-form-item prop="username">
		<div style="display:flex;justify-content: space-between;">
			<div class="input-verification-code">
				<el-input ref="code" v-model="loginForm.code" placeholder="请输入验证码" name="code" prefix-icon="el-icon-date" type="text" tabindex="1" auto-complete="off" clearable/>
			</div>
			<div class="get-code-btn">
                <el-button type="primary" @click="getVerify" :disabled="disabled=!show">
                    <span v-show="show">获取验证码</span>
                    <span v-show="!show" class="count">{{count}} s</span>
                </el-button>
            </div>
		</div>
		</el-form-item>

		<el-form-item prop="password">
		<el-input ref="password" v-model="loginForm.password" placeholder="设置6-12位登陆密码" name="password" prefix-icon="el-icon-date" type="text" tabindex="1" auto-complete="off" clearable/>
		</el-form-item>
		<div class="wl-button">
			<el-button  type="primary" style="width:100%;" @click.native.prevent="commitData">注册</el-button>
		</div>
		<div style="margin-bottom:36px;margin-top:10px;">
			<el-checkbox v-model="checked">注册表示已阅读并同意 
				<router-link :to="{ path: '/userAgreement' , query:{id:888}}"  target="_blank"  tag="a"> 《快学历服务协议》 </router-link>
			</el-checkbox>
		</div>
		<LoginOthers :accept="'register'"></LoginOthers>
	
	</el-form> 
  </div>
</template>
<script>
import LoginOthers from "./LoginOthers";
export default {
  name: 'LoginBox',
  props: {
   
  },

  components: {
   	LoginOthers
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
     if (!value) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
    };
    return {
        show: true,
        count: "", // 初始化次数
        timer: null,
        checked: false,  //下次自动登录
        activeName: 'second',
        loginForm: {},
        loginRules: {
            username: [{ required: true, trigger: "blur", validator: validateUsername }],
            password: [{ required: true, trigger: "blur", validator: validatePassword }]
        }
    };
  },

  beforeMount() {},
  mounted() {
    
  },
  computed: {
      
  },
  methods: {
       getVerify() {
            // 验证手机号
            if (this.checkPhone() == false) {
                return false;
            } else {
                const TIME_COUNT = 60; //更改倒计时时间
                if (!this.timer) {
                    this.count = TIME_COUNT;
                    this.show = false;
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                            this.count--;
                        } else {
                            this.show = true;
                            clearInterval(this.timer); // 清除定时器
                            this.timer = null;
                        }
                    }, 1000);
                }
            }

            this.getVerificationCode()
        },
        checkPhone() {
            let phone = this.loginForm.username;
            if (!/^1[3456789]\d{9}$/.test(phone)) {
                this.$message.error("请填写正确的手机号");
                return false;
            }
        },

	loginHandleClick(val) {
	  	// this.$emit("tabChange",val)
	  	this.$store.commit('changeLoginBoxStatus', val);
    },
    //发送短信
    getVerificationCode() {
      	let params = {
          account: this.loginForm.username,
          source:"forgetmessage",
        }
      this.axios.get(this.Global.BASE_URL + "/index.php?r=web/site/sendcode", { params: params }).then(response => {
			console.log(response)
			if (response.code=="0") {
				this.$message({ message: '恭喜你，信息已发送', type: 'success' });
			}
		}).catch(response => {
			
		});
	},
	
	//注册提交
    commitData() {
		this.$refs.loginForm.validate(valid => {
            console.log(valid)
            if (valid) {
                let params = {
                    sPhone: this.loginForm.username,
                    code:this.loginForm.code,
                    sPassWord:this.loginForm.password,
                    source:"forgetmessage",
                    sNick: this.loginForm.username,

                }
                this.axios.get(this.Global.BASE_URL + "/index.php?r=web/site/registerphone", { params: params }).then(response => {
                    if (response.code == '0') {
						this.$store.commit('changeLogin', JSON.stringify(response.data));
                       	this.$message({message: response.msg,type: 'success'});
                        this.$store.commit('changeShowLoginBox', false);
						// window.location.reload()
                    }else{
                        this.$message.error(response.msg);
                    }
                }).catch(response => {

                });
            
            } else {
                console.log("error submit!!");
                return false;
            }
        }); 	
	}
  }
};
</script>
<style lang="less" scoped>
  .tabs{
      border-bottom: 2px solid #CCCCCC;
      height: 50px;
      box-sizing: border-box;
      margin-bottom: 20px;
       ul {
        overflow: hidden;
        color: #23D3B5;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
       
        height: 50px;
        display: flex;
        justify-content:space-between
        
        }
        ul li{
        float: left;
        height: 50px;
        box-sizing: border-box;
        color:#000000;
        line-height: 50px;
        cursor: pointer;
        }
   
  }

  /deep/ .el-form-item{
    margin-bottom:25px;
  }
	.input-verification-code {
            width:224px;
        }
  .get-code-btn{
        width:122px;
        /deep/ .el-button {
            width:100%;
        }
  }
.login-form{
		margin-top:20px;
		.wl-button{
			height: 40px;
			line-height: 40px;
			width:100%;
			margin-bottom:50px;
			margin-top:10px;
			/deep/ .el-button{
				height:100%;
				width: 100%;
				font-size: 20px;
			}
		}
	}
</style>






