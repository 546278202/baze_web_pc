<template>
    <div style="background:#f4f4f4;">
        <HeadNavigation></HeadNavigation>
        <div class="content">
            <div class="bg">
                <el-form ref="form" :model="form" :rules="rules" label-width="80px" >
                    <el-form-item label="身份证" prop="idcard" >
                        <el-input class="province-certificate" v-model="form.idcard" placeholder="输入身份证号"  prefix-icon="el-icon-date"></el-input>
                    </el-form-item>
                    <el-form-item label="证书编号" prop="sCertificateNum">
                        <el-input class="" v-model="form.sCertificateNum" placeholder="输入证书编号" prefix-icon="el-icon-date"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :loading="loading" @click="onSubmit">查 询</el-button>
                    </el-form-item>
                </el-form>
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
export default {
  components: {
    HeadNavigation,
    Footer,
    RightMessageBar
  },
  data() {
    return {
        loading: false,
        rules: {
            idcard: [
                { required: true, message: '请输入证件号码', trigger: 'blur' },
                { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
            ],
            sCertificateNum: [
                { required: true, message: '请输入证件号码', trigger: 'blur' },
                { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
            ],
        },
        form:{

        }
    }
  },

  beforeMount() {},
  mounted() {},
  methods: {
    handleClick(tab, event) {
        console.log(tab, event);
    },
    onSubmit(){
        this.$refs.form.validate(valid => {
            console.log(valid)
            if (valid) {
                this.loading = true;  
                let params={
                    idcard:this.form.idcard,
                    sCertificateNum:this.form.sCertificateNum   
                }
                this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/certificateindex`,{ params: params }).then(response => {
                    if(response.code=="0"){
                        this.getDetail(response.data)
                    }
                })
            }
        }) 
    },

    getDetail(params){
        this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/certificateinfo`,{ params: params }).then(response => {
            if(response.code=="0"){
                let params=JSON.stringify(response.data)
                this.$router.push({ path: '/EducationAuthenticationDetail', query: { params: params } })
            }
        })
    }
  }
};
</script>
<style lang="less" scoped>
.content{
    min-height: 800px;
    background-image: url(https://www.bazeskill.com/images/cert_bg.png);
    background-repeat: no-repeat;
    background-position: top;
    background-size: cover;
    position: relative;
    .bg{
        background: rgba(92,82,71,1);
        opacity: 0.9;
        height: 570px;
        width: 1200px;
        position: absolute;  
        transform: translate(-50%,-50%);
        top: 50%;  
        left: 50%;   
        display: flex;
        justify-content: center;
        align-items: center;
            .el-form{
                width:360px;
                .el-button {
                    width:100%;
                    background: #22D3B5;
                    color:#fff;
                    border: 1px solid #22D3B5;
                }
                .el-button :hover{
                    color:#fff
                }
                /deep/ .el-form-item__label{
                    color: #fff;
                }
            }
    }
}
</style>






