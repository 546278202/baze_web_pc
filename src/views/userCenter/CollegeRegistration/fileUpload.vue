
<template>
	<div>
        <el-upload
            class="avatar-uploader"
            action="String"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl || data.url" :src="imageUrl || Global.img_BASE_URL+data.url" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传{{data.format}}文件，且不超过{{data.size}}kb, 尺寸{{data.width}}X{{data.height}} </div>
        </el-upload>

	</div>
</template>
<script>
	export default {
	components: {
    },
    props:{
        data:{
            type: Object
        }, 
        blockType:{
            type:String
        }
    },
	data() {
		return {
            imageUrl: ''

		};
	},
	beforeMount() {
		
	},
	mounted() {
	},
	watch: {

  	},

	methods: {
        beforeAvatarUpload(file) {
            console.log(file)
            const isJPG = file.type === 'image/jpeg';
            const isPNG = file.type === 'image/png';
            const isLt2M = file.size / 1024 < this.data.size; //单位kb

            
            if (isJPG || isPNG) {
                
            }else{
                this.$message.error('上传头像图片只能是 JPG / PNG');
                return false;
            }
            if (!isLt2M) {
                this.$message.error(`上传头像图片大小不能超过 ${this.data.size}kb!`);
                return false;
            }
            const isSize = new Promise((resolve, reject)=>{
                    let _URL = window.URL || window.webkitURL;
                    let img = new Image();
                    img.onload = ()=>{
                        let valid = img.width == this.data.width && img.height == this.data.height;
                        valid ? resolve() : reject();
                    }
                    img.src = _URL.createObjectURL(file);
                }).then(()=>{ return file; }, ()=>{

                    this.$message({ message:`展会广告图尺寸只能是 ${this.data.width}*${this.data.height}px!请重新选择!`, type: 'warning'});
                    return Promise.reject()
                    return false;
            })
            return isJPG && isLt2M && isSize

            let param = new FormData();
            param.append('UploadForm[imageFile]',file);//通过append向form对象添加数据
            console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
            let config = {headers:{'Content-Type':'multipart/form-data'}}; 
            this.axios.post(this.Global.BASE_URL+'/index.php?r=web/upload/upload',param,config).then(response=>{
                if(response.code=='0'){
                    this.imageUrl = URL.createObjectURL(file)
                    let obj={
                        blockType:this.blockType,
                        url:response.data.url,
                        name:response.data.model.name, 
                    }
                    console.log(obj)
                    this.$emit('setParams',obj);
                };
            })
        }
	},
	computed:{
	
	}
};
</script>
<style lang="less">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 78px;
    height: 78px;
    line-height: 78px;
    text-align: center;
  }
  .avatar {
    width: 78px;
    height: 78px;
    display: block;
  }

</style>





