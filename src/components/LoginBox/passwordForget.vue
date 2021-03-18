<template>
    <div style="width: 1200px; margin: 0px auto;background: #fff;min-height:500px;">
        <div style="line-height: 70px;text-align: center;font-size: 24px; font-weight: 500;color: #fff;background: #22D3B5;">账号安全</div>
        <div style="padding: 20px 18px;">
                <div style="font-size: 18px;text-align: center; margin-bottom: 30px;">
                    找回密码
                </div>
                <el-form ref="loginForm"
                    :model="loginForm"
                    :rules="loginRules"
                    class="login-form"
                    auto-complete="off"
                    label-position="left"
                    >
                    <el-form-item prop="username">
                        <el-input
                        ref="username"
                        v-model="loginForm.username"
                        placeholder="请输入手机号"
                        name="username"
                        type="text"
                        tabindex="1"
                        auto-complete="off"
                        prefix-icon="el-icon-date"
                        clearable
                        />
                    </el-form-item>
                    <el-form-item prop="code">
                        <div style="display:flex;justify-content: space-between;">
                        <div class="input-verification-code" >
                            <el-input
                            ref="code"
                            v-model="loginForm.code"
                            placeholder="请输入验证码"
                            name="code"
                            type="text"
                            tabindex="1"
                            auto-complete="off"
                            prefix-icon="el-icon-date"
                            clearable
                            />
                        </div>
                        <div class="get-code-btn">
                            <el-button
                            type="primary"
                            @click="getVerify"
                            :disabled="(disabled = !show)"
                            >
                            <span v-show="show">获取验证码</span>
                            <span v-show="!show" class="count">{{ count }} s</span>
                            </el-button>
                        </div>
                        </div>
                    </el-form-item> 


					<el-form-item prop="password">
						<el-input ref="password" v-model="loginForm.password" placeholder="设置6-12位登陆密码" name="password" prefix-icon="el-icon-date" type="text" tabindex="1" auto-complete="off" clearable/>
					</el-form-item>
					<el-form-item prop="checkPass">
						<el-input ref="checkPass" v-model="loginForm.checkPass" placeholder="确认密码" name="checkPass" prefix-icon="el-icon-date" type="text" tabindex="1" auto-complete="off" clearable/>
					</el-form-item>
                    <div class="wl-button"> <el-button :loading="loading"  type="primary"  @click.native.prevent="commitData">提交</el-button></div>
        </el-form>
        </div>
     </div>
</template>
<script>
export default {
  name: "SmsLogin",
  props: {},

  components: {},
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
	};
	const validateCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error("Please enter the correct code"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("Please enter the correct user Password"));
      } else {
        callback();
      }
	};
	const validateCheckPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("Please enter the correct user Password"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      show: true,
      count: "", // 初始化次数
      timer: null,
      checked: false, //下次自动登录
      activeName: "second",
      loginForm: {},
      loginRules: {
        username: [{ required: true, trigger: "blur", validator: validateUsername }],
        code: [	{ required: true, trigger: "blur", validator: validateCode }],
		password: [{ required: true, trigger: "blur", validator: validatePassword}],
		checkPass:[{ required: true, trigger: "blur", validator: validateCheckPass}]
      }
    };
  },

  beforeMount() {},
  mounted() {},
  computed: {},
  methods: {
    registerHandleClick(val) {
      this.$store.commit("changeLoginBoxStatus", val);
    },
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

      this.getVerificationCode();
    },
    checkPhone() {
      let phone = this.loginForm.username;
      if (!/^1[3456789]\d{9}$/.test(phone)) {
        this.$message.error("请填写正确的手机号");
        return false;
      }
    },

    loginHandleClick(val) {
      this.$emit("tabChange", val);
    },
    //发送短信
    getVerificationCode() {
      let params = {
        account: this.loginForm.username,
        source: "forgetmessage"
      };
      this.axios
        .get(this.Global.BASE_URL + "/index.php?r=web/site/sendcode", { params: params }).then(response => {
			if (response.code == "0") {
					this.$message({ message: "恭喜你，信息已发送", type: "success" });
			}
        }).catch(response => {

		});
    },

    //注册提交
    commitData() {
      this.$refs.loginForm.validate(valid => {
        console.log(valid);
        if (valid) {
			let params = {
				sPhone: this.loginForm.username,
				code: this.loginForm.code,
				sPassWord:this.loginForm.password,
				source: "forgetmessage",
				word:this.loginForm.checkPass
			};
			console.log(params);
			this.axios.get(this.Global.BASE_URL + "/index.php?r=web/site/forgetphone", { params: params}).then(response => {
				console.log(response);
				if (response.code == "0") {
					this.$store.commit("changeLogin",JSON.stringify(response.data));
					this.$message({ message: response.msg, type: "success" });
          			this.$router.replace('/home')
				} else {
					this.$message.error(response.msg);
				}
				}).catch(response => {});
        } else {
          	return false;
        }
      });
    }
  }
};
</script>
<style>
    body{background: #f4f4f4;}
</style>
<style lang="less" scoped>
.login-others {
  line-height: 40px;
  text-align: center;
  /deep/ .iconfont {
    margin-right: 20px;
    font-size: 36px;
  }
  .iconfont:last-child {
    margin-right: 0;
  }
}
/deep/ .el-form-item {
  margin-bottom: 25px;
}
.input-verification-code {
	margin-right: 15px;
}
.get-code-btn {
  width: 122px;
  /deep/ .el-button {
    width: 100%;
  }
}
.login-form{
	width: 324px;
	margin:0 auto;
	margin-top: 20px;
  .wl-button {
    // height: 40px;
    // line-height: 40px;
    width: 100%;
    margin-bottom: 50px;
    /deep/ .el-button {
    //   height: 100%;
      width: 100%;
    //   font-size: 20px;
    }
  }
}
</style>
