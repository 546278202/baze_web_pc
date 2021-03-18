
<template>
	<div style="position:relative;width:100%;min-height:500px;padding-top:40px;">
		<el-form ref="form" :model="form" :rules="rules" class="login-form" label-width="120px">
			<el-form-item label="姓名" >
				<el-input class="input-width" v-model="form.userName"  placeholder="请输入姓名" name="sName"  prefix-icon="el-icon-date" type="text" clearable/>
			</el-form-item>
			
			<el-form-item label="身份证" >
				<el-input class="input-width" v-model="form.idcard"  placeholder="请输入身份证" name="sName"  prefix-icon="el-icon-date" type="text" clearable/>
			</el-form-item>
			<el-form-item label="性别" >
				<el-radio v-model="form.sex" label="1">男</el-radio>
  				<el-radio v-model="form.sex" label="2">女</el-radio>
			</el-form-item>

			<el-form-item label="生日" >
				<el-date-picker v-model="form.birthday" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
			</el-form-item>

			<el-form-item label="民族" >
				<el-select v-model="form.famous" placeholder="选择民族"  >
					<el-option
						v-for="item in NationList"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</el-form-item>

			<el-form-item label="年龄" >
				<el-input class="input-width" v-model="form.age"  placeholder="请输入年龄" name="sName"  prefix-icon="el-icon-date" type="text" clearable/>
			</el-form-item>
			
			<el-form-item label="户籍地址" prop="name">
				<CityMenuLevel v-if="address1" @getLiveAddress="getLiveAddress" :item.sync="address1"></CityMenuLevel>
				<el-form-item label="" prop="addRess">
					<el-input v-model="form.liveAddress" placeholder="请输入详细地址"  prefix-icon="el-icon-date"  clearable/>
				</el-form-item>
			</el-form-item>

			<el-form-item label="政治面貌" >
				<el-select v-model="form.outlook" placeholder="选择面貌"  >
					<el-option
						v-for="item in options"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</el-form-item>


			<el-form-item label="手机号来源" >
				<el-radio v-model="form.phoneFrom" label="1">自买</el-radio>
  				<el-radio v-model="form.phoneFrom" label="2">代买</el-radio>
			</el-form-item>
			<el-form-item label="手机号" >
				<el-input class="input-width" v-model="form.sPhone"  placeholder="请输入手机" name="sName"  prefix-icon="el-icon-date" type="text" clearable/>
			</el-form-item>
			<el-form-item label="报考学校" >
				<el-input class="input-width" v-model="form.school"  placeholder="请输入学校" name="sName"  prefix-icon="el-icon-date" type="text" clearable/>
			</el-form-item><el-form-item label="专业" >
				<el-input class="input-width" v-model="form.major"  placeholder="请输入专业" name="sName"  prefix-icon="el-icon-date" type="text" clearable/>
			</el-form-item>
			<el-form-item label="层次" >
				<el-select v-model="form.layer" placeholder="选择层次"  >
					<el-option
						v-for="item in options2"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="通讯地址" prop="throughAddRess">
				<CityMenuLevel v-if="address2" @getLiveAddress="getLiveAddress2" :item.sync="address2"></CityMenuLevel>
				<el-form-item label="" prop="throughAddRess">
					<el-input v-model="form.throughAddRess" placeholder="请输入通讯地址"  prefix-icon="el-icon-date"  clearable/>
				</el-form-item>
			</el-form-item>

			<el-form-item label="邮箱" >
				<el-input class="input-width" v-model="form.sMail"  placeholder="请输入邮箱" name="sName"  prefix-icon="el-icon-date" type="text" clearable/>
			</el-form-item>
			<el-form-item label="最高学历" >
				<el-select v-model="form.education" placeholder="选择学历"  >
					<el-option
						v-for="item in options3"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="单位名称" >
				<el-input class="input-width" v-model="form.Unit"  placeholder="请输入单位名称" name="sName"  prefix-icon="el-icon-date" type="text" clearable/>
			</el-form-item>
			<el-form-item label="毕业学校" >
				<el-input class="input-width" v-model="form.graduationSchool"  placeholder="请输入学校" name="sName"  prefix-icon="el-icon-date" type="text" clearable/>
			</el-form-item>
				<el-form-item label="毕业专业" >
				<el-input class="input-width" v-model="form.graduationMajor"  placeholder="请输入专业" name="sName"  prefix-icon="el-icon-date" type="text" clearable/>
			</el-form-item>
			<el-form-item label="毕业学校代码" >
				<el-input class="input-width" v-model="form.graduationSchoolCode"  placeholder="请输入学校代码" name="sName"  prefix-icon="el-icon-date" type="text" clearable/>
			</el-form-item>
			<el-form-item label="毕业日期" >
				<el-date-picker v-model="form.graduationDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
			</el-form-item>
			<el-form-item label="毕业证书编号" >
				<el-input class="input-width" v-model="form.geaduationCode"  placeholder="请输入证书编号" name="sName"  prefix-icon="el-icon-date" type="text" clearable/>
			</el-form-item>		
			<el-form-item label="学习方式" >
				<el-radio v-model="form.learning" label="1">待修</el-radio>
  				<el-radio v-model="form.learning" label="2">自修</el-radio>
			</el-form-item>
			<el-form-item label="" >
				<el-button  type="primary" @click="resetBack()">保存/更新</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import CityMenuLevel from "@/components/CityMenuLevel";
	import NationList from "@/utils/NationList.json";
	export default {
	components: {
		CityMenuLevel
	},
	data() {
		return {
			NationList:NationList,
			options: [{
				value: '1',
				label: '群众'
				}, {
				value: '2',
				label: '团员'
				}, {
				value: '3',
				label: '党员'
				}, {
				
			}],
			options2: [
				{value: '1',label: '高起专'},
				{value: '2',label: '专起本'},
				{value: '3',label: '高起本'}, 
				{value: '4',label: '考研'}
			],
			options3: [
				{value: '1',label: '小学'},
				{value: '2',label: '初中'},
				{value: '3',label: '高中'}, 
				{value: '4',label: '中专'},
				{value: '5',label: '大专'},
				{value: '6',label: '本科'},
				{value: '7',label: '研究生'}, 
				{value: '8',label: '博士'}
			],
			form: {},
			rules:{},
			address1:{},
			address2:{}
		};
	},
	beforeMount() {
		
	},
	mounted() {
		this.getItem()
	},
	watch: {

  	},
	methods: {
		getLiveAddress(params){
			this.form.liveProvince=params.province,
			this.form.liveCity=params.city,
			this.form.liveCounty=params.county
		},
		getLiveAddress2(params){
			this.form.throughProvince=params.province,
			this.form.throughCity=params.city,
			this.form.throughCounty=params.county
		},
		resetBack(){
			  this.$confirm('确定要提交?', '提示', {
                lockScroll:false,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {  
				// let params=JSON.parse(JSON.stringify(this.form)) 
				let params={
					userName:this.form.userName,
					idcard:this.form.idcard,
					sex:this.form.sex,
					birthday:this.form.birthday,
					famous:this.form.famous,
					age:this.form.age,
					
					liveAddress:this.form.liveAddress,
					outlook:this.form.outlook,
					phoneFrom:this.form.phoneFrom,
					sPhone:this.form.sPhone,
					school:this.form.school,
					major:this.form.major,
					layer:this.form.layer,
					Unit:this.form.Unit,
					
					throughAddRess:this.form.throughAddRess,
					sMail:this.form.sMail,
					education:this.form.education,
					graduationSchool:this.form.graduationSchool,
					graduationSchoolCode:this.form.graduationSchoolCode,
					graduationMajor:this.form.graduationMajor,
					graduationDate:this.form.graduationDate,
					geaduationCode:this.form.geaduationCode,
					learning:this.form.learning,

					liveProvince:this.form.liveProvince,
					liveCity:this.form.liveCity,
					liveCounty:this.form.liveCounty,

					throughProvince:this.form.throughProvince,
					throughCity:this.form.throughCity,
					throughCounty:this.form.throughCounty
				}
				if(this.form.id){
					params.id=this.form.id
				}
				this.updateUser(params)
			}) 	
		},
		
		updateUser(params){
            this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/educationedit`,{params:params}).then(response => {
				if(response.code=='0'){
					this.$message({message: response.msg,type: 'success',duration: 1000});
				}else{
					this.$message({message: response.msg,type: 'warning',duration: 1000});
				}
            })
		},
		getItem(){
			this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/educationedit`).then(response => {
			
				if(response.code=='0'){
					this.form=response.data
					this.address1={
						province: response.data.liveProvince,
						city: response.data.liveCity,
						county: response.data.liveCounty
					}
					this.address2={
						province: response.data.throughProvince,
						city: response.data.throughCity,
						county: response.data.throughCounty
					}
				}
            })
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





