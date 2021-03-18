<template>
    <div style="background:#f4f4f4;">
        <HeadNavigation></HeadNavigation>
        <div class="main">
        <div class="order-pay">
        <p style="font-size: 18px; margin-bottom: 16px; line-height: 26px;"> 课程信息  </p>
        <div  class="course-info" style="height:135px;border:1px solid #eaedec;padding: 20px 20px;box-sizing: border-box;" >
            <div style="width: 100%; overflow: hidden;float: left;">
            <div style="float:left;margin-right: 20px;">
                <img v-if="data.course" :src="Global.img_BASE_URL+data.course.sCourseImg" style="width:158px;height:90px;" :onerror="Global.defalutLogoUrl"/>
            </div>

            <div style="float:left;">
                <div style="margin-bottom: 40px; font-size: 16px; font-weight: 400;" v-if="data.course">{{data.course.sCourseName}}
                </div>
                <div style="color: #999; font-size: 14px;">1门课程</div>
            </div>
            <div style="font-size: 18px;font-weight: 500;  color: #eb5144;float:right;height: 94px;line-height: 94px;margin-right: 100px;"> ￥{{data.payPrice}} </div> </div>
        </div>
        </div>

        <div class="order-pay">
			<p style="font-size: 18px; margin-bottom: 16px; line-height: 26px;">支付信息</p>
			<div class="course-info" style="padding: 20px 0;box-sizing: border-box;">
				<div style="float:left;margin-right: 200px;" v-if="data.course">   订单金额 ：{{data.course.DisPrice}} </div>
				<div style="float:left;margin-right: 200px;" v-if="data.course">  优惠金额：0.00 </div>
				<div style="float:left;margin-right: 200px;" v-if="data.course"> 应付金额：{{data.course.DisPrice}} </div>
			</div>
        </div>
        <div class="order-pay">
			<p style="font-size: 18px; margin-bottom: 16px; line-height: 26px;">
				支付方式
			</p>
			<div id="order-pay"  class="course-info" style="padding: 20px 0;box-sizing: border-box;overflow: hidden;">
				<div class="pay-btn" :class="payMethod=='1'? 'current-pay-btn':'default-pay-btn'" @click="payMethod='1'">微信</div>
				<div class="pay-btn" :class="payMethod=='2'? 'current-pay-btn':'default-pay-btn'" @click="payMethod='2'">支付宝</div>
			</div>
			<div style="font-size: 14px;color: #999;">
				付款时需跳转到以下对应的支付渠道进行支付。支付成功后，系统将自动为您开通课程学习权限。
			</div>
        </div>
        <div class="order-pay">
        <div class="course-info" style="padding: 20px 0;box-sizing: border-box;overflow: hidden;">
            <div style="float:right;">
				<div style="float:left;color: #999;font-size: 14px;text-align: center;margin-right:20px;line-height: 50px;">
					<span>应付金额：</span><span style="font-size: 24px;color: #eb5144;">￥{{data.payPrice}}</span>
				</div>
				<div class="submit-handle">
					<el-button @click="submitHandle" :disabled='submitHandleStatus'>确认支付</el-button>					
				</div>
			</div>
        </div>
        </div>
    </div>
    <RightMessageBar></RightMessageBar>
    <Footer></Footer>
	<el-dialog  title="扫码支付" :visible.sync="dialogPayment" :lock-scroll='false' width="300px"  :close-on-click-modal="false"  center  :before-close="handleClose">
        <div id="qrcode" class="qrcode" ref="qrcode"></div>

		<el-alert v-if="orderStatus=='1' " title="支付成功" type="success" :closable="false" center show-icon></el-alert>
		<el-alert v-else title="请在手机端完成支付" type="info" :closable="false" center show-icon></el-alert>

        <!-- <span slot="footer" class="dialog-footer"> -->
       		<!-- <el-button @click="handleClose">支付成功</el-button> -->
        <!-- </span> -->
    </el-dialog>
 </div>      
</template>
<script>
import HeadNavigation from "@/components/HeadNavigation";
import Footer from "@/components/Footer";
import RightMessageBar from "@/components/RightMessageBar";
import QRCode from 'qrcodejs2'
const defaultListQuery = {
  pageNum: 1,
  pageSize: 5
};
export default {
  	components: {
		HeadNavigation,
		Footer,
		RightMessageBar,
		QRCode
  	},
  	data() {
		return {
			dialogPayment:false,
			listQuery: Object.assign({}, defaultListQuery),
			listLoading: true,
			data:{},
			payMethod:'1', //支付方式
			codeUrl:'',
			qrcode:null,
			orderNum:null,
			timer:null,
			orderStatus:null
		};
  	},
	computed:{
		submitHandleStatus:function(){
			
			if(this.data.payPrice>0){
				return false
			}
			return true
		}
	},
  	beforeMount() {

  	},
  	mounted() {
		//创建订单
		if(this.$route.query.type=="createOrder"){
			// this.getList()
		}
		//订单详情
		if(this.$route.query.type=="detailOrder"){
			this.getOrderDetail()
		}
  	},
 	methods: {
		 
		getOrderDetail() {
			let params
			if(this.$route.query.type=="createOrder"){
				params={ orderNum:this.orderNum}
				
			}else{
				params={ orderNum:this.$route.query.id}
			}
			
            this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/orderinfo`, { params: params }).then(response => {
				this.data=response.data

				// 微信 当收款码弹出
				if(this.payMethod=='1'){
					if(this.qrcode && response.data.payStatus=='1'){
						this.orderStatus=response.data.payStatus
						// 五秒后关闭收款码
						setTimeout(() => {
							this.handleClose()	
							this.$router.replace({ path: '/userCenter', query: { type: 'Orders' }})
						}, 5);
					}
				}
				
				//支付宝
				if(this.payMethod=='2'){
					if(response.data.payStatus=='1'){
						this.orderStatus=response.data.payStatus
						// 五秒后关闭收款码
						setTimeout(() => {
							this.$router.replace({ path: '/userCenter', query: { type: 'Orders' }})
						}, 5);
					}
				}
            })
		},
		// getList() {
        //     this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/courseinfo&id=${this.$route.query.id}`).then(response => {
        //         this.data=response.data
        //     })
		// },
		submitHandle(){
			if(this.$route.query.type=="createOrder"){
				this.commitOrder()
			}
			if(this.$route.query.type=='detailOrder'){
				if(this.payMethod=='1'){
					let params={
						orderNum:this.$route.query.id
					}
					this.wechatPayment(params)
				}
				if(this.payMethod=='2'){
					let params={
						orderNum:this.$route.query.id
					}
					this.alipayPayment(params)
				}
			}
		},
		commitOrder(){
			console.log(this.data)
			let params={
				leesonid:this.data.id,
				type:'1', //1全款 2分期
				from:this.$route.query.resource_type, //1直播,2录播
				pid: this.data.pid,
				tid: this.data.tid,
				oPrice:this.data.DisPrice,
				rPrice:this.data.DisPrice,
				pPrice:this.data.DisPrice,
				payMethod:this.payMethod //1微信 ，2支付宝
			}
			this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/addorder`,{ params: params }).then(response => {
				if(response.code=='0'){
					if(this.payMethod=='1'){
						this.orderNum=response.data.orderNum
						this.wechatPayment({orderNum:response.data.orderNum})
					}
					if(this.payMethod=='2'){
						this.orderNum=response.data.orderNum
						this.alipayPayment({orderNum:response.data.orderNum})
					}
				}else{
					this.$message({message: response.msg ,type: 'warning'});
				}
			})
		},
		wechatPayment(params){
			this.axios.get(this.Global.BASE_URL + `/index.php?r=web/wxpay/orderwxpay`,{ params: params }).then(response => {
				if(response.code=='0'){
					// 微信收款二维码弹框
					this.codeUrl=response.data.code_url
					this.qrCode()
				}else{
					this.$message({message: response.msg ,type: 'warning'});
				}
			})
		},
	
		qrCode(){
			this.dialogPayment = true
			this.$nextTick(() => {
				if( this.codeUrl &&  this.codeUrl!==''){
					if(this.qrcode !== null){
						this.qrcode.clear();
						this.qrcode.makeCode(this.codeUrl);
					}else{
						this.qrcode = new QRCode('qrcode', {
							width: 200,
							height: 200, /** 高度 **/
							text: this.codeUrl /** 二维码内容 **/
						})
					}
					// 开启订单查询
					this.timer = setInterval(() => {
						this.getOrderDetail()
					}, 3000);
				}
			})
		},

		handleClose() {
			this.dialogPayment = false
			this.qrcode=null
			this.$refs.qrcode.innerHTML = ''

			window.clearInterval(this.timer);
			console.log("关闭了定时器");
		},
		//支付宝付款
		alipayPayment(params){
			this.axios.get(this.Global.BASE_URL + `/index.php?r=web/alipay/orderalipay`,{ params: params }).then(response => {
				let params
				if(this.$route.query.type=="createOrder"){
					params={ orderNum:this.orderNum}
				}else{
					params={ orderNum:this.$route.query.id}
				}
				let myurl="http://wap.bazeskill.com/index.php?r=web/alipay/orderalipay&orderNum="+params.orderNum
				// window.location.href = myurl
				// 开启订单查询
				this.timer = setInterval(() => {
					this.getOrderDetail()
				}, 3000);
				
        		window.open(myurl, '_blank')
			})
			
		}
	},
	beforeDestroy() {    //页面关闭时清除定时器  
		window.clearInterval(this.timer);
	},
};
</script>
<style lang="less" scoped>
	.main {
		min-height: 700px;
		padding-top: 80px;
	}
	.order-pay {
		width: 1200px;
		margin: 29px auto;
		background: #fff;
		padding: 20px 30px;
	}

	/* 支付、 */
	.default-pay-btn {
		float: left;
		margin-right: 200px;
		min-width: 149px;
		padding: 16px 0;
		margin-right: 12px;
		margin-bottom: 12px;
		text-align: center;
		border: 1px solid #e6e6e6;
		border-radius: 2px;
		background: #fafafa;
		cursor: pointer;

		
	}
	.current-pay-btn{
		background:#22D3B5;
		float: left;
		margin-right: 200px;
		min-width: 149px;
		padding: 16px 0;
		margin-right: 12px;
		margin-bottom: 12px;
		text-align: center;
		// border: 1px solid #e6e6e6;
		border-radius: 2px;
		cursor: pointer;
		color:#fff;
	}
	.click-active {
		float: left;
		margin-right: 200px;
		min-width: 149px;
		padding: 16px 0;
		margin-right: 12px;
		margin-bottom: 12px;
		text-align: center;
		border: 1px solid #e6e6e6;
		border-radius: 2px;
		background: #f2fcf9;
		cursor: pointer;
	}
	.submit-handle{
			float:left;
			
		.el-button{
			height:50px;
			font-size: 18px;
			background:#eb5144;
			border: none;
			color:#fff;
			width:180px;
			text-align: center;
			border-radius:0
		}
		.el-button:hover{
			opacity: 0.8;
		}
	}
	

	//支付二维码
	/deep/ .el-dialog__body{
		text-align: center;
	}
	/deep/ .el-alert{
		background: none;
	}
	.qrcode{
		display: inline-block;
	
		img {
			width: 132px;
			height: 132px;
			background-color: #fff; //设置白色背景色
			padding: 6px; // 利用padding的特性，挤出白边
			box-sizing: border-box;
		}
	}
</style>
