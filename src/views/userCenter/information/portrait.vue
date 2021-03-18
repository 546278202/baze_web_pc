
<template>
	<div style="position:relative;width:100%;min-height:500px;padding-top:40px;">
        <div style="overflow:hidden;">
            <div style="float:left;margin-right: 80px;">{{$store.baseUser}}
                <div style="width:160px;height:164px;border-radius: 50%;overflow:hidden;position: relative;box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);">
                    <!-- <img style="width:100%;" :src="Global.img_BASE_URL+$store.state.baseUser.headportrait || require('@/assets/collegeDetail/left-zhaosheng.png')" /> -->
                    <el-avatar  style="width:160px;height:164px;"  fit="cover" :src="$store.state.baseUser.headportrait==null? require('@/assets/collegeDetail/left-zhaosheng.png') : Global.img_BASE_URL+ $store.state.baseUser.headportrait"></el-avatar>
                </div>
                <div class="current-wl-button">
                    <el-button type="text" @click="resetBack()">当前头像</el-button>
                </div>
            </div>

            <div style="float: left;">
                <!-- <div style="width:160px;height:164px;border-radius: 50%;overflow:hidden;position: relative;box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);">
                    <img style="width:100%;" src="@/assets/collegeDetail/left-zhaosheng.png" />
                </div> -->

                <el-upload
                    class="avatar-uploader"
                    :action="Global.BASE_URL+'/index.php?r=web/upload/upload'"
                    :show-file-list="false"
                    name="UploadForm[imageFile]"
                    :with-credentials="true"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :auto-upload="true"
                    >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                
                <div class="wl-button" style="position: relative;" >
                    <!-- <el-button >上传头像</el-button> -->
                    <div style="position: absolute;left: 18px;bottom: -28px;width: 400px;text-align: left;color: rgb(153, 153, 153);">(支持200kb以下JPG、PNG、bmg格式的图片)</div>
                </div>
                

                <!-- <div class="wl-button" style="margin-top:90px;">
                    <el-button >保存头像</el-button>
                </div> -->
            </div>
        </div>

        
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
			form: {
                name:'xxx',
            },
            imageUrl: ''
            
		};
	},
	beforeMount() {
		
	},
	mounted() {
		// this.form=this.$store.state.baseUser
		// this.getProvinceList()
	},
	watch: {

  	},

	methods: {
        //图片上传成功
        handleAvatarSuccess(res, file) {
            if(res.code=='0'){
                let params={iUserID:this.$store.state.baseUser.iUserID,headportrait: res.data.url}
                this.updateUser(params)
            }
            this.imageUrl = URL.createObjectURL(file.raw);
        },

        updateUser(params){
            this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/useredit`,{ params: params }).then(response => {
                if(response.code=='0'){
                    let baseUser=JSON.parse(JSON.stringify(this.$store.state.baseUser))
                    baseUser.headportrait=params.headportrait
                    this.$store.commit('changeLogin', JSON.stringify(baseUser)); 
                    this.$message({message: response.msg || '更新成功' , type: 'success'});
                }else{
                    this.$message({message: response.msg || '更新失败' , type: 'warning'});
                }
              
            })
        },
        beforeAvatarUpload(file) {
            // const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            // if (!isJPG) {
            // this.$message.error('上传头像图片只能是 JPG 格式!');
            // }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isLt2M;
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
.login-form{
	width:540px;
}
.current-wl-button{
    margin-top: 20px;
    width:100%;
    text-align: center;
    /deep/ .el-button{
        width: 120px;
        color:#000;
        // border:1px solid #23D3B5
    }
}
.wl-button{
    margin-top: 20px;
    width:100%;
    text-align: center;
    /deep/ .el-button{
        width: 120px;
        color:#23D3B5;
        border:1px solid #23D3B5
    }
}


/deep/ .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
/deep/  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
/deep/  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 160px;
    height: 160px;
    line-height: 160px;
    text-align: center;
  }
  .avatar {
    width: 160px;
    height: 160px;
    display: block;
  }

</style>





