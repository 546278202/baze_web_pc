<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-11-28 18:39:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-29 19:52:11
-->
<template>
    <div>
        <div style="margin-bottom: 25px;overflow:hidden;">
            <div class="wl-button"><el-button size="medium" type="text">联系客服</el-button></div>
        </div>
        <div style="position:relative;width:100%;min-height:500px;">
			<el-row>
				<el-col :span="12">
					<span>发票类型: </span>
					<span >N/A</span>
				</el-col>
				<el-col :span="12">
					<span>抬头类型: </span>
					<span>N/A</span>
				</el-col>
				<el-col :span="12">
					<span>发票抬头: </span>
					<span>N/A</span>
				</el-col>
				<el-col :span="12">
					<span>税号: </span>
					<span>N/A</span>
				</el-col>
				<el-col :span="12">
					<span>发票内容: </span>
					<span>N/A</span>
				</el-col>
				<el-col :span="12">
					<span>发票金额: </span>
					<span>N/A</span>
				</el-col>
				<el-col :span="12">
					<span>提交时间: </span>
					<span>N/A</span>
				</el-col>
				<el-col :span="12">
					<span>收件人: </span>
					<span>N/A</span>
				</el-col>
				<el-col :span="12">
					<span>接收邮箱: </span>
					<span>N/A</span>
				</el-col>
				<el-col :span="12">
					<span>开票状态: </span>
					<span>N/A</span>
				</el-col>
			</el-row>
			<div style="margin-bottom: 25px;overflow:hidden;">
				<div class="wl-button"><el-button size="medium"  @click="resetBack()">返回</el-button></div>
			</div>
        </div>
    </div>
</template>
<script>
	const defaultListQuery = {
		pageNum: 1,
		pageSize: 10
	};
	import NoData from "@/components/NoData";

	export default {
	components: {
		NoData
	},
	data() {
		return {
			item: {},
			listQuery: Object.assign({}, defaultListQuery),

		};
	},
	beforeMount() {
		
	},
	mounted() {
		this.getList()
		
	},
	watch: {

  	},

	methods: {
		resetBack(){
			this.$emit("togglePage","invoiceList")
		},
		handleClick(tab, event) {
			
	
		},
		getList() {
			this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/consigneeindex`).then(response => {
				this.dataList=response.data
			})
		},
		
		handleAcceptCallback(val){
		
		}
	},
	computed:{
		// showLoginBox(){
		//   return this.$store.state.showLoginBox
		// }
	}
};
</script>
<style lang="less" scoped>
.right-content{
    float:right;
    min-height:800px;
    width:834px;
    border:1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border-radius: 4px;
    border: 1px solid #ebeef5;
    border-radius: 10px;
    overflow: hidden;
    padding:30px 45px;
    box-sizing: border-box;
    background: #FFFFFF;
}
// ul{
//     font-size:16px;
// }
// ul li {
//     border-bottom: 1px solid #E4E4E4;
//     // height: 238px;
//     border: 2px solid #F4F4F4;
//     border-radius: 6px;
//     padding:20px 15px;
//     margin-bottom:15px;
//     .item{
//         margin-bottom: 15px;
//         font-size: 20px;
//         overflow: hidden;
//     }
//     .lable{
//         width:100px;
//         float:left;
//         color:#999
//     }
   
// }

.el-row {
	background: #F4F4F4;
	padding:10px;
	font-size:18px;
	margin-bottom: 20px;
}
.el-row .el-col{
	margin-bottom:15px;
}
.el-row .el-col span:first-child{
	display: inline-block;
	width:100px;
	color:#999999;
}
.wl-button{
    width:132px;
    float: right;
    /deep/ .el-button{
        width: 100%;
        height:100%;
        // color:#23D3B5;
        // border:1px solid #23D3B5
    }
}

   //tabs导航
.el-tabs{
    // background:#fff;
    // margin-top: 20px;
    /deep/ .el-tabs__item{
        font-size:20px;
        height:50px;
        line-height: 50px;;
    }
    /deep/ .el-tabs__nav {
        // margin-left:60px;
    }
    /deep/ .el-tab-pane{
        // padding:0 60px;
    }
}
</style>





