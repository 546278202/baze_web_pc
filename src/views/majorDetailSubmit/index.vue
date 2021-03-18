<template>
  <div class="productList" style="min-height:800px;background:#F4F4F4;">
    <HeadNavigation></HeadNavigation>
    <div class="main">
        <div class="major-detail-submit">
            <div style="height:64px;line-height:64px;font-size:26px;color:#ffff;text-align:center;background:#23D3B5;">填写报名信息</div>
            <div style="padding:30px;">

                <div style="margin-bottom:5px;font-size:20px;color:#000;font-weight: 500;">专业信息:</div>
                <ul style="margin-bottom:45px;">
                    <li>
                        <div style="margin-bottom:25px;">专业：{{dataBase.sName}}</div>
                        <div>层次：<span  v-for="(e,index) in dataBase.sArrangement" :key="index">{{e | sArrangementFilter}}</span></div>
                    </li>
                <li>
                        <div style="margin-bottom:25px;">院校：{{dataBase.sSchooName}}</div>
                        <div>学制：{{dataBase.sYear}} 年</div>
                    </li>
                    <li>
                        <!-- <div style="width: 104px;height: 104px;background: #999999;border-radius: 50%;"> -->
                        <img style="width: 104px;height: 104px;background: #999999;border-radius: 50%;" :src="Global.img_BASE_URL+ dataBase.sMajorImg" />
                        <!-- </div> -->
                    </li>
                    <!-- {{dataBase.sMajorImg}} -->
                    <!-- https://image.kuaixueli.com/common/image/20201124/202011244aae8428513c464e39409e35.jpg -->
                </ul>

                <div style="margin-bottom:30px;font-size:20px;color:#000;font-weight: 500;">个人信息：</div>
                <ul>
                    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-width="80px" class="login-form" auto-complete="off" label-position="left">
                        <el-form-item prop="username" label="真实姓名">
                            <el-input ref="username" v-model="loginForm.username" placeholder="请输入姓名" name="username" type="text" tabindex="1" auto-complete="off" clearable/>
                        </el-form-item>
                        <el-form-item prop="userphone" label="手机号码">
                            <el-input ref="userphone" v-model="loginForm.userphone" placeholder="请输入手机号" name="userphone" type="text" tabindex="1" auto-complete="off" clearable/>
                        </el-form-item>
                        <el-form-item prop="usercode">
                            <div style="display:flex;justify-content: space-between;">
                                <div class="input-verification-code">
                                    <el-input ref="usercode" v-model="loginForm.usercode" placeholder="请输入验证码" name="usercode" type="text" tabindex="1" auto-complete="off" clearable/>
                                </div>
                                <div class="get-code-btn">
                                    <el-button type="primary" @click="getVerify" :disabled="disabled=!show">
                                        <span v-show="show">获取验证码</span>
                                        <span v-show="!show" class="count">{{count}} s</span>
                                    </el-button>
                                </div>
                            </div>
                        </el-form-item>
                    </el-form>    
                </ul>

                <div style="text-align:center;margin-top:60px;">
                    <div class="submit"><el-button type="primary" @click="commitData">提交报名</el-button></div>
                    <div style="margin-bottom:56px;margin-top:20px;">
                        <el-checkbox v-model="checked">注册表示已阅读并同意《快学历服务协议》</el-checkbox>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer></Footer>
    <RightMessageBar></RightMessageBar>
  </div>
</template>
<script>

import HeadNavigation from "@/components/HeadNavigation";
import Footer from "@/components/Footer";
import RightMessageBar from "@/components/RightMessageBar";
import NavigationMajorFilter from "@/components/NavigationMajorFilter";
const validateUsername = (rule, value, callback) => {
    if (!value) {
        callback(new Error("Please enter the correct user name"));
    } else {
        callback();
    }
};
const validateUserphone = (rule, value, callback) => {
    if (!value) {
        callback(new Error("Please enter the correct user phone"));
    } else {
        callback();
    }
};
const validateUsercode = (rule, value, callback) => {
    if (!value) {
        callback(new Error("Please enter the correct user code"));
    } else {
        callback();
    }
};
export default {
  components: {
    HeadNavigation,
    Footer,
    RightMessageBar
  },
  data() {
    return {
            dataBase:{},
            loginForm: {},
            loginRules: {
                username: [{ required: true, trigger: "blur", validator: validateUsername }],
                userphone: [{ required: true, trigger: "blur", validator: validateUserphone }],
                usercode: [{ required: true, trigger: "blur", validator: validateUsercode }]
            },
            show: true,
            count: "", // 初始化次数
            checked:true
        };
    },

    beforeMount() {},
    mounted() {
        this.dataBase=JSON.parse(decodeURIComponent(this.$route.query.params))
        console.log( this.dataBase)
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
            let phone = this.loginForm.userphone;
            if (!/^1[3456789]\d{9}$/.test(phone)) {
                this.$message.error("请填写正确的手机号");
                return false;
            }
        },
        //发送短信
        getVerificationCode() {
            let params = {
                account: this.loginForm.userphone,
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
                if (valid) {
                     let params={
                        sSpecialityId:this.dataBase.sid,
                        sSignName:this.loginForm.username,
                        sPhone:this.loginForm.userphone,
                        code:this.loginForm.usercode,
                        source:"forgetmessage"
                    }
                    this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/sbomintsign`,{ params: params }).then(response => {
                        console.log(response)
                        if(response.code=='0'){
                            this.$message({ message: '提交成功', type: 'success' })
                        }else{
                            this.$message.error(response.msg);
                        }
                    })
                } else {
                    console.log("error submit!!");
                    return false;
                }
            }); 	
        }
    },
    filters: {
        sellsFilter(value) {
            if(!value) {
                return '0';
            } else {
                return value
            }
        },
        sFeaturesFilter(element){
            let str
            if(element=='1') {
                str= '双一流'
            }else if(element=='2'){
                str="985工程"
            }else if(element=='3'){
                str="211工程"
            }else if(element=='4'){
                str="教育部直属"
            }else if(element=='5'){
                str="省部委共建"
            }else if(element=='6'){
                str="省属重点"
            }else if(element=='7'){
                str="省部共建"
            }else if(element=='8'){
                str="省教育厅直属"
            }else{
                str= 'N/A'
            }
            return str
        },
        sLabelFilter(element){
            let str
            if(element=='1') {
                str= '录取快'
            }else if(element=='2'){
                str="院校推荐"
            }else if(element=='3'){
                str="特殊专业"
            }
            return str
        },
        
        sArrangementFilter(element){
            let str
            if(element=='1') {
                str= '高起专'
            }else if(element=='2'){
                str="高起本"
            }else if(element=='3'){
                str="专升本"
            }    
         return str
        }
    },
};
</script>
<style lang="less" scoped>
.main{
    position: relative;
    width: 1200px;
    margin: 0 auto;
    padding-top: 90px;
    padding-bottom:50px;
}

.major-detail-submit{
    height: 713px;
    background: #FFFFFF;
}
ul{
    font-size:18px;
    margin-left:100px;
    overflow: hidden;
    display: flex;
    align-items: center;
}
ul li{
    float:left;
    margin-right:228px;
}

ul li:last-child{
    float:left;
    margin-right:0;
}
ul li:nth-child(2){
    float:left;
    margin-right:280px !important;
}
.login-form{
    width:350px;
    .input-verification-code {
        // width:188px;
        margin-right: 10px;
    }
    .get-code-btn{
        width:110px;
        /deep/ .el-button {
            width:100%;
        }
    }
}

.submit {
    width:196px;
    height: 48px;
    display: inline-block;
    .el-button{
        width: 100%;
        height: 100%;
        font-size: 20px;
    }
}
</style>





