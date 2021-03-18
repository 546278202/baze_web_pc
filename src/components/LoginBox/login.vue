<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" :stretch="true">
    <el-tab-pane label="账号登陆" name="first">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="off" label-position="left">
        <el-form-item prop="username">
          <el-input  ref="username" v-model="loginForm.username" placeholder="请输入手机号/邮箱"  name="username" type="text" clearable prefix-icon="el-icon-date" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input ref="password" v-model="loginForm.password" placeholder="请输入密码" show-password name="password"  prefix-icon="el-icon-date" />
        </el-form-item>
        <div style="font-size:18px;display: flex;justify-content: space-between;align-items: center;color:#CCCCCC;">
          <el-checkbox>下次自动登陆</el-checkbox>
        <div>
            <router-link :to="{ path: '/passwordForget'}" target="_blank"  tag="a" style="color:#CCCCCC"> 忘记密码 </router-link> |
            <a style="color:#23D3B5;" @click="registerHandleClick('register')" >注册</a>
          </div>
        </div>
        <div class="wl-button">
          <el-button :loading="loading" type="primary"  @click.native.prevent="handleLogin" v-on:keyup.13.native="handleLogin" >登陆</el-button>
        </div>
       <LoginOthers></LoginOthers>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="短信登录" name="second">
      <SmsLogin></SmsLogin>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import qs from 'qs'
import SmsLogin from "./SmsLogin";
import LoginOthers from "./LoginOthers";

export default {
  name: "LoginBox",
  props: {
   
  },
  components: {
	SmsLogin,
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
      activeName: "first",
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      loading: false
    };
  },
  created(){
    var _this = this;
    document.onkeydown = function(e) {
      let key = window.event.keyCode;
      if (key == 13) {
        _this.handleLogin();
      }
    };
  },
  mounted() {

  },
  methods: {
    handleClick(tab, event) {
	  console.log(tab, event);
    },
    registerHandleClick(val) {
      this.$store.commit("changeLoginBoxStatus", val);
    },

    // 登陆
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          let params = {
            account: this.loginForm.username,
            sPassWord: this.loginForm.password
          };
          this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/login`, { params: params}).then(response => {
            if (response.code == "0") {
                this.$store.commit("changeLogin", JSON.stringify(response.data));
                localStorage.setItem( "store", JSON.stringify(this.$store.state));
                this.$message({ message: "登陆成功", type: "success" });
                this.$store.commit("changeShowLoginBox", false);
                this.loading = false;
              } else {
                this.$message.error(response.msg);
                this.loading = false;
              }
            }).catch(response => {
              	this.loading = false;
            });
        }
      });
	}
  }
};
</script>
<style lang="less" scoped>

.el-tabs {
  /deep/ .el-tabs__item {
    font-size: 22px;
    height: 60px;
    line-height: 60px;
  }
  /deep/ .el-tabs__nav-wrap {
    width: 90%;
    margin: 0 auto;
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

/deep/ .el-checkbox__label {
	font-size: 18px;
}
/deep/ .el-form-item {
	margin-bottom: 25px;
}

</style>
