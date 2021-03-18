<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-11-28 18:39:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-29 19:52:11
-->
<template>
    <div style="position:relative;width:100%;min-height:500px;">
        <el-form ref="form" :model="form" :rules="loginRules" class="login-form" label-width="100px">
            <el-form-item label="发票类型" >
                <el-input ref="sName" class="input-width" v-model="type" :readonly='true' placeholder="请输入发票类型" name="sName"  prefix-icon="el-icon-date" type="text" clearable/>
            </el-form-item>

			<el-form-item label="抬头发票" >
                <el-radio v-model="radio" label="1">企业单位</el-radio>
  				<el-radio v-model="radio" label="2">个人/非企业</el-radio>
            </el-form-item>
		</el-form>


		<el-form v-if="radio=='1'" ref="form" :model="form" :rules="loginRules" class="login-form" label-width="100px">
			<el-form-item label="发票抬头" >
                <el-input  class="input-width" v-model="form.name" :readonly='true' placeholder="请输入发票抬头"/>
            </el-form-item>
			<el-form-item label="发票税号">
                <el-input  class="input-width" v-model="form.account" :readonly='true' placeholder="请输入发票税号" />
            </el-form-item>
			<el-form-item label="发票内容" >
                <el-input  class="input-width" v-model="form.content" :readonly='true' placeholder="请输入发票内容"/>
            </el-form-item>
			<el-form-item label="发票金额" >
                <el-input  class="input-width" v-model="form.amount" :readonly='true' placeholder="请输入发票金额"/>
            </el-form-item>
	    </el-form>

		<el-form ref="form"  class="login-form" label-width="100px">
            <el-form-item label="" >
               <el-button type="primary" @click="submitForm()">提交电子发票</el-button>
            </el-form-item>
		</el-form>
    </div>
</template>
<script>
//   import NoData from "@/components/NoData";
 const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error("Please enter the correct user name"));
      } else {
        callback();
      }
};
  export default {
	props: {
		item:Object
  },
  components: {
    // NoData
  },
  data() {
    return {
		type:"电子发票",
		radio:"1",
        form:{
			name:"xxxxxxxx",
			account:9898989898,
			content:9898989898, 
			amount:9898989898 


		},
        loginRules: {
            sName: [{ required: true, trigger: "blur", validator: validateUsername }]
		}
    };
  },

  beforeMount() {
      
  },
  mounted() {
  },
  
  methods: {
	  
	getdataList(){
		let params={id:''}
		this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/city`,{ params: params}).then(response => {

		})
	}, 
    submitForm(){
		this.$message({ message: "提交成功", type: "success",duration: 1000 });
		let params={type:'invoiceManagement'}
		
		setTimeout(()=>{
        	this.$router.push({ path:'/userCenter', query:params })
		},1000)

		
    },
    handleAcceptCallback(val){
      
    }
  },
  computed:{
   
  }
};
</script>
<style lang="less" scoped>
	.input-width {width:230px}
	.login-form{
		width:540px;
	}
</style>





