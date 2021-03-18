<template>
    <div style="width:1200px;margin:0 auto;padding-bottom:100px;">
        <div style="text-align:center;font-weight: 400;font-size:30px;color: #333333;margin:50px 0;">售后服务</div>
        <ul>
            <li>
                <h3> 售后联系方式：</h3>
                <el-table ref="orderTable" :data="dataList" style="width: 100%;"  border>
                    <el-table-column label="售后部门" width="180" align="center">
                        <template slot-scope="scope">{{scope.row.department}}</template>
                    </el-table-column>
                    <el-table-column label="联系方式" align="center">
                        <template slot-scope="scope">{{scope.row.phone}}</template>
                    </el-table-column>
                    <el-table-column label="联系邮箱" align="center">
                        <template slot-scope="scope">{{scope.row.email}}</template>
                    </el-table-column>
                    <el-table-column label="工作职责" align="center">
                        <template slot-scope="scope">{{scope.row.content}}</template>
                    </el-table-column>
                </el-table>
            </li>
            <li>
                <h3> 一、登录/注册</h3>
                <div>
                    (1)您可以使用快学历官方网站，进行注册操作
                    <br>
                    第一步：登录快学历官网：<a href="http://www.kuaixueli.com" target="_blank">https://www.kuaixueli.com</a> 
                    <br>
                    第二步：在登录页面点击右上角的【注册】
                    <br>
                    第三步：在注册页面输入“手机号、账户密码”然后点击“获取验证码”按钮；
                    <br>
                    第四步：填写您收到的验证码，最后点击“注册”按钮，即可注册成功
                </div>
            </li>

            <li>
                <h3> 二、支付/订单</h3>
                <div>
                    (1)如何报名支付？如果您需要报名课程，为保证您的权益，请按如下步骤操作
                    <br>
                    方法1:在快学历官方网站报名
                    <br>
                    ①使用电脑打开网址：<a href="http://www.kuaixueli.com" target="_blank">https://www.kuaixueli.com</a> 
                    <br>
                    ②使用您的快学历账户登录账户密码；
                    <br>
                    ③选择您需要的VIP课程课程，点击“我要报名”，然后根据页面提示操作即可。
                </div>
                 <div>
                    (2)报班的钱可以直接私下转给老师吗？
                    <br>
                    快学历官方的工作人员不会以任何形式要求用户私下转账/汇款（微信、支付宝、银行转账等）。
                    如您在学习过程中遇到自称快学历&指尖动力教育官方工作人员要求您私下转账/汇款的，均为诈骗信息，请勿轻信此类信息，做到“不信、不理、不转”，时刻并保护好您的个人财产安全。
                    您也可以将要求您转账的个人联系方式（如电话号码、微信号码等）通过截图或文字的方式向我们举报。您可以通过以下方式与我们取得联系
                    <br>
                    1、在快学历官网投诉电话400-156-7867；
                    <br>
                    2、关注“快学历”公众号，留言举报。
                    <br>
                    快学历课程正规购买方式是：
                    <br>
                    1、在快学历官网<a href="http://www.kuaixueli.com" target="_blank">https://www.kuaixueli.com</a> 内支付购买；
                    <br>
                    2、在快学历官方网站或者APP支付购买（PC网站、手机网站）；
                    <br>
                    3、向北京指尖动力教育科技有限公司企业对公账户转账购买。
                    <br>
                </div>
            </li>
            <li>
                <h3> 三、课程协议</h3>
                <div>
                    (1)协议信息填写错了怎么办？
                    <br>
                    如果您在签署协议时失误提交了错误的信息，可以立即联系您的班主任老师帮您处理~
                     <br>
                    (2)协议可以不签吗？
                     <br>
                    为保证您的学习权益，部分班型需要签署协议。
                     <br>
                    具体的，课程是否需要签署协议则视班型规则而定，如班型中包含听课协议，则您需要协议。若课程中不包含协议，则您无需签署课程协议。
                     <br>
                    (3)如何签署课程协议？
                     <br>
                    在电脑上签署协议：
                     <br>
                    第一步：登陆网址 <a href="http://www.kuaixueli.com" target="_blank">https://www.kuaixueli.com</a> 
                     <br>
                    第二步：在页面右上角点击您的头像，在弹出窗口中点击“我的课程”进入课程中心；
                     <br>
                    第三步：在我的课程页面，点击“我的vip课 - 等待签约”-点击“立即签署”；
                     <br>
                    第四步：在协议详情页点击底部的【立即签署】按钮
                     <br>
                    第五步：在协议签署弹框中填写姓名和身份证号，最后点击“确认签署”按钮协议即可。
                </div>
            </li>
            <li>
                <h3> 四、使用规则</h3>
                <div>
                    APP电子资料服务说明：
                    <br>
                    (1)什么是电子资料教材？
                    <br>

                    资料教材是我们提供给用户的电子版资料、教材内容，用户可以在“资料教材”和“VIP资料”功能中下载和阅读。
                    <br>

                    (2)什么是VIP资料？
                    <br>

                    VIP资料是指定VIP课/班级专享的资料，仅指定VIP/班级学员有权下载、阅读。
                    <br>

                    (3)购买一个VIP就可以查看所有VIP资料吗？
                    <br>

                    不可以。当您购买某VIP课/班级后，仅可以查看这个VIP课/班级中包含的VIP资料，而不是美快学历全平台的VIP资料。
                    <br>

                    (4)我的VIP课为什么没有资料？
                    <br>

                    没有资料可能有以下原因：
                    <br>

                    1、当前VIP课的资料以讲义形式关联在每个课程中；
                    <br>

                    2、当前VIP课未上传VIP资料。
                    <br>

                    (5)资料的有效期怎么算？
                    <br>

                    1、普通资料在购买后永久有效；
                    <br>

                    2、VIP资料在VIP课/班级过期后同时失效，不可下载、阅读。
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  components: {

  },
  data() {
        return {
            dataList:[
                {department:'教务部',phone:'15311180753',email:'99547797@qq.com',content:''},
                {department:'售后班主任',phone:'18210712532',email:'99618132@qq.com',content:''}
            ]
        }
    },

    beforeMount() {

    },
    mounted() {

    },
    methods: {
        
    },
    filters: {
        
    },
};
</script>
<style lang="less" scoped>
  
    h3{
        margin-bottom:20px;
    }
    ul{
        font-size:18px;
    }
    ul li{
        margin-bottom:30px;
        line-height:40px;
    }
 
</style>





