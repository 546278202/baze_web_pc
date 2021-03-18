<template>
    <div>
        <HeadNavigation></HeadNavigation>
        <div class="about-us" style="min-height:800px;padding-top:80px;width:1200px;margin:0 auto;">
            <div class="my-el-tabs" >
                <el-tabs v-model="activeName" @tab-click="tabHandleClick">
                    <el-tab-pane label="公司简介" name="first">
                        <introduction></introduction>
                    </el-tab-pane>
                    <el-tab-pane label="联系我们" name="second">
                        <company-address></company-address>
                    </el-tab-pane>
                    <el-tab-pane label="合作加盟" name="third">
                        <CooperationAlliance></CooperationAlliance>
                    </el-tab-pane>
                    <el-tab-pane label="服务协议" name="fourth">
                        <UserAgreement></UserAgreement>
                    </el-tab-pane>
                    <el-tab-pane label="校企合作" name="fifth">
                        <enterprise></enterprise>
                    </el-tab-pane>
                     <!-- <el-tab-pane label="校企共建" name="sixth" type="2">
                        <enterpriseNext></enterpriseNext>
                    </el-tab-pane> -->
                </el-tabs>
            </div>
        </div>
        <Footer></Footer>
        <RightMessageBar></RightMessageBar>
    </div>
</template>
<script>
import HeadNavigation from "@/components/HeadNavigation";
import Loop from "@/components/Loop";
import Footer from "@/components/Footer";
import RightMessageBar from "@/components/RightMessageBar";
import BreadNavigation from "@/components/BreadNavigation";
import enterprise from "./enterprise";
import introduction from "./introduction";
import CompanyAddress from "./CompanyAddress";
import CooperationAlliance from "./CooperationAlliance";
import UserAgreement from "./UserAgreement";
import enterpriseNext from "./enterpriseNext";
export default {
  components: {
    HeadNavigation,
    BreadNavigation,
    Loop,
    Footer,
    RightMessageBar,
    enterprise,
    introduction,
    CompanyAddress,
    CooperationAlliance,
    UserAgreement,
    enterpriseNext

  },
  data() {
    return {
            activeName:'first'
        };
    },

    beforeMount() {

    },
    mounted() {
        if(this.$route.query.params){
            this.activeName=this.$route.query.params
        }
        
    },
    methods: {
        tabHandleClick(tab, event){
            console.log(this.activeName)
        },  
    }
};
</script>
<style lang="less" scoped>
   
   .my-el-tabs{
     
        margin-bottom:50px;
        /deep/ .el-tabs__item{
            font-size:18px;
            height:70px;
            line-height: 70px;;
        }
        /deep/ .el-tabs__nav {
            margin-left:60px;
        }
        /deep/ .el-tab-pane{
            // min-height:300px;
            // padding:0 60px;
        }
        /deep/ .el-tabs__header{
            margin:0;
        }

        /deep/  .el-tabs__nav-scroll{
            background: #f4f4f4;
        }

        /deep/  .el-tabs__nav-wrap::after{
            display: none;
        }
        /deep/  .el-tabs__content{
            overflow: visible;
        }
       
        
    }
</style>





