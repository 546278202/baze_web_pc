
<template>
	<div style="position:relative;width:100%;min-height:500px;padding-top:40px;">
		<el-form ref="form" :model="form" :rules="rules" class="login-form" label-width="100px">
			<el-form-item label="用户名" >
				<el-input class="input-width" v-model="form.sNick"  placeholder="请输入用户名" name="sName"  prefix-icon="el-icon-date" type="text" clearable/>
			</el-form-item>
			<el-form-item label="真实姓名" >
				<el-input class="input-width" v-model="form.realName"  placeholder="请输入用户名" name="sName"  prefix-icon="el-icon-date" type="text" clearable/>
			</el-form-item>
			<el-form-item label="身份证" >
				<el-input class="input-width" v-model="form.idcard"  placeholder="请输入用户名" name="sName"  prefix-icon="el-icon-date" type="text" clearable/>
			</el-form-item>
			<el-form-item label="性别" >
				<el-input class="input-width" v-model="form.sex"  placeholder="请输入用户名" name="sName"  prefix-icon="el-icon-date" type="text" clearable/>
			</el-form-item>
			<el-form-item label="职业" >
				<el-input class="input-width" v-model="form.occupation"  placeholder="请输入用户名" name="sName"  prefix-icon="el-icon-date" type="text" clearable/>
			</el-form-item>
			<el-form-item label="手机号" >
				<el-input class="input-width" v-model="form.sPhone"  placeholder="请输入用户名" name="sName"  prefix-icon="el-icon-date" type="text" clearable/>
			</el-form-item>
		

			<el-form-item label="邮寄地址" prop="name">
				<div style="display:flex;margin-bottom:15px;">
					<el-select v-model="province" placeholder="选择省份" @change="selectChange($event,1)" ref="provce">
							<el-option
								v-for="item in provinceList"
								:key="item.iProID"
								:label="item.sProName"
								:value="item.iProID">
							</el-option>
						</el-select>
						<div style="margin:0 20px;">
							<el-select v-model="city" placeholder="选择城市" @change="selectChange($event,2)" ref="city">
								<el-option
									v-for="item in cityList"
									:key="item.iCityID"
									:label="item.sCityName"
									:value="item.iCityID">
								</el-option>
							</el-select>
						</div> 
						<el-select v-model="county" placeholder="选择区域" @change="selectChange($event,3)" ref="county">
						<el-option
								v-for="item in areaList"
								:key="item.iRegionID"
								:label="item.sRegionName"
								:value="item.iRegionID">
							</el-option>
						</el-select>
				</div>
				<el-form-item label="" prop="addRess">
					<el-input v-model="form.addRess" placeholder="请输入详细地址"  prefix-icon="el-icon-date"  clearable/>
				</el-form-item>
			</el-form-item>

			<el-form-item label="" >
				<el-button  type="primary" @click="resetBack()">保存/更新</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
	import NoData from "@/components/NoData";
	export default {
	components: {
		NoData
	},
	data() {
		return {
			form: {},
			rules:{},
			provinceList:[],
			cityList:[],
			areaList:[],

			province:null,
			city:null,
			county:null,  
			
			provinceItem:{},
			cityItem:{},
			areaItem:{}         

		};
	},
	beforeMount() {
		
	},
	mounted() {
		this.form=this.$store.state.baseUser
		this.getProvinceList()
	},
	watch: {

  	},

	methods: {
		selectChange(val,type){
			if(type=="1"){
				this.getCityList(val)
				this.city=""
				this.county=""

				this.provinceList.forEach(element => {
					if(element.iProID==val){
						this.provinceItem=element
					}	
				});
			}
			if(type=="2"){
				this.getAreaList(val)
				this.county=""

				this.cityList.forEach(element => {
					if(element.iCityID==val){
						this.cityItem=element
					}	
				});
			}
			if(type=="3"){
				this.county=val
				this.areaList.forEach(element => {
					if(element.iRegionID==val){
						this.areaItem=element
					}	
				});
				this.$forceUpdate()
			}
		},
		getProvinceList(){
			this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/province`,{ params: {} }).then(response => {
				this.provinceList=response.data
			})
		},
		getCityList(iProID){
			let params={iProID:iProID}
			this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/city`,{ params: params}).then(response => {
				this.cityList=response.data
			})
		}, 
		getAreaList(iCityID){
			let params={iCityID:iCityID}
			this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/region`,{ params: params}).then(response => {
				this.areaList=response.data
			})
		}, 
		resetBack(){
			  this.$confirm('确定要修改?', '提示', {
                lockScroll:false,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {  
				let params=JSON.parse(JSON.stringify(this.form)) 

				params.province=this.provinceItem.sProName
				params.city=this.cityItem.sCityName
				params.county=this.areaItem.sRegionName

				this.updateUser(params)
			}) 	
		},
		updateUser(params){
            this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/useredit`,{ params: params }).then(response => {
            })
        }
	},
	computed:{
	
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





