<template>
  <div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="off" label-position="left">
      <el-form-item prop="username">
        <el-input ref="username" v-model="loginForm.username"  placeholder="请输入手机号" name="username" type="text"  prefix-icon="el-icon-date"  clearable/>
      </el-form-item>
      <el-form-item prop="username">
        <div style="display:flex;justify-content: space-between;">
          <div class="input-verification-code">
            <el-input  v-model="loginForm.code" placeholder="请输入验证码" name="code"  prefix-icon="el-icon-date" clearable />
          </div>
          <div class="get-code-btn">
            <el-button type="primary" @click="getVerify" :disabled="(disabled = !show)" >
              <span v-show="show">获取验证码</span>
              <span v-show="!show" class="count">{{ count }} s</span>
            </el-button>
          </div>
        </div>
      </el-form-item> 
	   <div style="font-size:18px;display: flex;justify-content: space-between;align-items: center;color:#CCCCCC;" >
        <el-checkbox>下次自动登陆</el-checkbox>
        <div>
			
          <a style="color:#CCCCCC">忘记密码</a> |
          <a style="color:#23D3B5;" @click="registerHandleClick('register')">注册</a >
        </div>
      </div>
      <div class="wl-button">
        <el-button :loading="loading" type="primary"  @click.native.prevent="commitData" >登陆</el-button>
      </div>
       <LoginOthers></LoginOthers>
    </el-form>
  </div>
</template>
<script>
import LoginOthers from "./LoginOthers";

export default {
  name: "SmsLogin",
  props: {},

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
      loading: false,
      show: true,
      count: "", // 初始化次数
      timer: null,
      checked: false, //下次自动登录
      activeName: "second",
      loginForm: {},
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        code: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
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
        .get(this.Global.BASE_URL + "/index.php?r=web/site/sendcode", {
          params: params
        })
        .then(response => {
          console.log(response);
          if (response.code == "0") {
            this.$message({ message: "恭喜你，信息已发送", type: "success" });
          }
        })
        .catch(response => {});
    },

    //注册提交
    commitData() {
      this.$refs.loginForm.validate(valid => {
        console.log(valid);
        if (valid) {
          let params = {
            sPhone: this.loginForm.username,
            code: this.loginForm.code,
            source: "forgetmessage",
          };
          this.axios.get(this.Global.BASE_URL + "/index.php?r=web/site/phone", { params: params}).then(response => {
              if (response.code == "0") {
                this.$store.commit("changeLogin", JSON.stringify(response.data));
                this.$message({ message: response.msg, type: "success" });
                this.$store.commit("changeShowLoginBox", false);
              } else {
                this.$message.error(response.msg);
              }
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




/deep/ .el-form-item {
  margin-bottom: 25px;
}
.input-verification-code {
  width: 224px;
}
.get-code-btn {
  width: 122px;
  /deep/ .el-button {
    width: 100%;
  }
}

.login-form {
  margin-top: 20px;
  .wl-button {
    height: 40px;
    width: 100%;
    margin-bottom: 50px;
    margin-top: 10px;
    /deep/ .el-button {
      height: 100%;
      width: 100%;
      font-size: 20px;
    }
  }
}
</style>
