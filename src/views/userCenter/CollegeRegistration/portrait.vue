
<template>
	<div style="position:relative;width:100%;min-height:500px;padding-top:40px;">
        <el-form ref="form" :rules="rules" class="login-form" label-width="120px">
            <el-form-item prop="username" label="选择学校">
                <el-select v-model="sType" @change="change" >
					<el-option
						v-for="item in options3"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
            </el-form-item>
               
            <el-form-item prop="username" label="个人照片" v-if="item.picture">
                <fileUpload  :data="item.picture" blockType="picture" @setParams="setParams"> </fileUpload>
            </el-form-item> 
                 
            <el-form-item prop="username" label="一寸照片" v-if="item.inchPhoto">
                <fileUpload  :data="item.inchPhoto" blockType="inchPhoto" @setParams="setParams"> </fileUpload>
            </el-form-item> 
            
            <el-form-item prop="username" label="身份证(正)" v-if="item.ID_card">
                <fileUpload  :data="item.ID_card" blockType="ID_card" @setParams="setParams"></fileUpload>
            </el-form-item> 
             <el-form-item prop="username" label="身份证(反)" v-if="item.ID_card_f">
                <fileUpload  :data="item.ID_card_f" blockType="ID_card_f" @setParams="setParams"></fileUpload>
            </el-form-item> 
              <el-form-item prop="username" label="考试照片" v-if="item.examination">
                <fileUpload  :data="item.examination" blockType="examination" @setParams="setParams"></fileUpload>
            </el-form-item> 
            <el-form-item prop="username" label="毕业证" v-if="item.diploma">
                <fileUpload  :data="item.diploma" blockType="diploma" @setParams="setParams"></fileUpload>
            </el-form-item> 
            <el-form-item prop="username" label="认证报告" v-if="item.report">
                <fileUpload  :data="item.report" blockType="report" @setParams="setParams"></fileUpload>
            </el-form-item> 
             <el-form-item prop="username" label="实名手机" v-if="item.realPhone">
                <fileUpload  :data="item.realPhone" blockType="realPhone" @setParams="setParams"></fileUpload>
            </el-form-item> 
            <el-form-item label="" >
				<el-button  type="primary" @click="resetBack()">保存/更新</el-button>
			</el-form-item>
        </el-form>
	</div>
</template>
<script>

  import fileUpload from "./fileUpload";
  import schoolFileUpload from "@/utils/schoolFileUpload.json";
	export default {
	components: {
        fileUpload
	},
	data() {
		return {
            sType:"1",
            id:null,
            options3: [
				{value: '1',label: '北京外国语大学'},
				{value: '2',label: '中国石油大学'},
				{value: '3',label: '天津大学'}, 
				{value: '4',label: '西南大学'},
				{value: '5',label: '西安交通大学'},
				{value: '6',label: '西北工业大学'},
				{value: '7',label: '四川农业大学'}, 
                {value: '8',label: '南开大学'},
				{value: '9',label: '山东大学'},
				{value: '10',label: '中国传媒大学'},
				{value: '11',label: '奥鹏平台'}  
			],
			rules:{},
            schoolFileUpload:schoolFileUpload,
            item:{},
            loading:false

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
        change(val){  
            this.schoolFileUpload.forEach(element => {
                if(element.value==val){
                    this.item=element
                    return 
                }
            });
        },
        setParams(obj){
            switch(obj.blockType){
                case "picture" :
                    this.item.picture.url=obj.url
                    this.item.picture.name=obj.name
                    break;
                case "inchPhoto":
                    this.item.inchPhoto.url=obj.url
                    this.item.inchPhoto.name=obj.name
                    break;    
                case 'ID_card' :
                    this.item.ID_card.url=obj.url
                    this.item.ID_card.name=obj.name
                    break;
                case 'ID_card_f' :
                    this.item.ID_card_f.url=obj.url
                    this.item.ID_card_f.name=obj.name
                    break;
                case 'examination' :
                    this.item.examination=obj.url
                    this.item.examinationName=obj.name
                    break;
                case 'diploma' :
                    this.item.diploma.url=obj.url
                    this.item.diploma.name=obj.name
                    break;
                case 'report' :
                    this.item.report.url=obj.url
                    this.item.report.name=obj.name
                    break;
                case 'realPhone' :
                    this.item.realPhone.url=obj.url
                    this.item.realPhone.name=obj.name
                    break;    
                    
            }
        },
        resetBack(){
            let params={}
            if(this.item.picture){
                params.sPhoto=this.item.picture.url
                params.sPhotoName=this.item.picture.name
            }
            if(this.item.inchPhoto){
                params.inchPhoto=this.item.inchPhoto.url
                params.inchPhoto=this.item.inchPhoto.name

            }
            if(this.item.ID_card){
                params.identityID=this.item.ID_card.url
                params.identityIDName=this.item.ID_card.name

            }
            if(this.item.ID_card_f){
                params.identityIDF=this.item.ID_card_f.url
                params.identityIDName=this.item.ID_card_f.name

            }
            if(this.item.diploma){
                params.graduation=this.item.diploma.url
                params.graduationName=this.item.diploma.name

            }

            if(this.item.report){
                params.report=this.item.report.url
                params.reportName=this.item.report.name

            }
            if(this.item.realPhone){
                params.realName=this.item.realPhone.url
                params.reName=this.item.realPhone.name

            }
            if(this.id){
                params.id=this.id
            }
            params.sType=this.item.value
            this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/educationpictedit`,{ params: params }).then(response => {
                if(response.code=='0'){
                    this.$message({message: response.msg || '更新成功' , type: 'success'});
                }else{
                    this.$message({message: response.msg || '更新失败' , type: 'warning'});
                }
            })
        },
        getItem(){
            this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/educationpictedit`).then(response => {
                if(response.code=='0'){
                    this.loading=true
                    this.sType=response.data.sType
                    this.id=response.data.id
                    this.schoolFileUpload.forEach(element => {
                        if(element.value==response.data.sType){
                            this.item=element
                            return 
                        }
                    });
                    if(this.item.picture){
                        this.item.picture["url"]=response.data.sPhoto
                        this.item.picture["name"]=response.data.sPhotoName
                    }
                    if(this.item.inchPhoto){
                        this.item.inchPhoto["url"]=response.data.inchPhoto
                        this.item.inchPhoto["name"]=response.data.inchPhotoName
                    }
                    if(this.item.ID_card){
                        this.item.ID_card["url"]=response.data.identityID
                        this.item.ID_card["name"]=response.data.identityIDName
                    }
                    if(this.item.ID_card_f){
                        this.item.ID_card_f["url"]=response.data.identityIDF
                        this.item.ID_card_f["name"]=response.data.identityIDName
                    }
                    if(this.item.diploma){
                        this.item.diploma["url"]=response.data.graduation
                        this.item.diploma["name"]=response.data.graduationName
                    }
                    if(this.item.report){
                        this.item.report["url"]=response.data.report
                        this.item.report["name"]=response.data.reportName
                    }
                    if(this.item.realPhone){
                        this.item.realPhone["url"]=response.data.realName
                        this.item.realPhone["name"]=response.data.reName
                    }
                }
              
            })
        }
	},
	computed:{
	
	}
};
</script>
<style lang="less">


</style>





