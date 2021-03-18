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
            <el-form-item label="收货人" prop="sName">
                <el-input ref="sName" class="input-width" v-model="form.sName" placeholder="请输入手机号" name="sName"  prefix-icon="el-icon-date" type="text" clearable/>
            </el-form-item>

            <el-form-item label="邮寄地址" prop="name">
               <div style="display:flex;margin-bottom:15px;">
                   <el-select v-model="form.province" placeholder="选择省份" @change="selectChange($event,1)" ref="provce">
						<el-option
							v-for="item in provinceList"
							:key="item.iProID"
							:label="item.sProName"
							:value="item.iProID">
						</el-option>
                    </el-select>
                    <div style="margin:0 20px;">
                        <el-select v-model="form.city" placeholder="选择城市" @change="selectChange($event,2)" ref="city">
                            <el-option
								v-for="item in cityList"
								:key="item.iCityID"
								:label="item.sCityName"
								:value="item.iCityID">
							</el-option>
                        </el-select>
                    </div> 
                    <el-select v-model="form.county" placeholder="选择区域" @change="selectChange($event,3)" ref="county">
                       <el-option
							v-for="item in areaList"
							:key="item.iRegionID"
							:label="item.sRegionName"
							:value="item.iRegionID">
						</el-option>
                    </el-select>
               </div>

               <el-form-item label="" prop="addRess">
                    <el-input ref="sName" v-model="form.addRess" placeholder="请输入详细地址" name="sName"  prefix-icon="el-icon-date" type="text" tabindex="1" auto-complete="off" clearable/>
               </el-form-item>
            

            </el-form-item>
            <el-form-item label="手机号码" prop="sPhone">
                <el-input ref="sName" class="input-width" v-model="form.sPhone" placeholder="请输入手机号" name="sName"  prefix-icon="el-icon-date" type="text" tabindex="1" auto-complete="off" clearable/>
            </el-form-item>
            <el-form-item label="邮编" prop="Postcode">
                <el-input ref="sName" class="input-width" v-model="form.Postcode" placeholder="请输入邮编" name="sName"  prefix-icon="el-icon-date" type="text" tabindex="1" auto-complete="off" clearable/>
            </el-form-item>

			 <el-form-item label="默认地址" prop="Postcode">
				<el-switch v-model="form.status"  inactive-value='0' active-value='1'></el-switch>
            </el-form-item>
			
            <el-form-item>
                <el-button type="primary" @click="submitForm()">保存/使用</el-button>
                <el-button @click="resetBack()">返回</el-button>
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
        form:this.item || {status:'1'},
        loginRules: {
            sName: [{ required: true, trigger: "blur", validator: validateUsername }]
		},
		provinceCurrentIndex:null,
		cityCurrentIndex:null,
		areaCurrentIndex:null,
		provinceList:[],
		cityList:[],
		areaList:[],
		options: [],
		province:null,
		city:null,
		county:null          

    };
  },

  beforeMount() {
      
  },
  mounted() {
	// this.form=this.item
	console.log(this.form)
    this.getProvinceList()
    
  },
  
  methods: {
	  selectChange(val,type){
		if(type=="1"){
			this.getCityList(val)
			this.form.city=""
			this.form.county=""

			this.provinceList.forEach(element => {
				if(element.iProID==val){
					this.form.provinceItem=element
				}	
			});
		}
		if(type=="2"){
			this.getAreaList(val)
			this.form.county=""

			this.cityList.forEach(element => {
				if(element.iCityID==val){
					this.form.cityItem=element
				}	
			});
		}
		if(type=="3"){
			this.form.county=val
			this.areaList.forEach(element => {
				if(element.iRegionID==val){
					this.form.areaItem=element
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
	
    handleClick(tab, event) {
        
    },
    handleSignOut(){
        this.$confirm('确定退出登录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {   
            this.$store.commit('changeLogin', null);
            this.$router.replace({path: `/home`})
            localStorage.removeItem("store")
            this.$message({message: '退出成功！', type: 'success',duration: 1000 });
      })
    },
	resetBack(){
		this.$emit("togglePage","AddressList")
	},
    submitForm(){
		// 编辑
		let params
		if(this.item){
			params=this.form
			// params={
			// 	sName:this.form.sName,
			// 	sPhone:this.form.sPhone,
			// 	province:this.form.province,
			// 	city:this.form.city,
			// 	county:this.form.county,
			// 	addRess:this.form.addRess,
			// 	Postcode:this.form.Postcode,
			// 	status:this.form.status
			// }
		}else{
			params={
				sName:this.form.sName,
				sPhone:this.form.sPhone,
				province:this.form.provinceItem.sProName,
				city:this.form.cityItem.sCityName,
				county:this.form.areaItem.sRegionName,
				addRess:this.form.addRess,
				Postcode:this.form.Postcode,
				status:this.form.status
			}
		}

		this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/consignee`,{ params: params}).then(response => {
			if(response.code=='0'){
				this.$message({ message: '操作成功', type: 'success' });
				this.$emit("togglePage","AddressList")
			}
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
.input-width {width:230px}
.login-form{
    width:540px;
}
</style>





