<template>
    <div>
        <div style="min-height:1300px;padding-top: 50px;">
            <div style="font-size:26px;border-bottom:1px solid #E4E4E4;height:80px;line-height:80px;margin-bottom:30px;">合作加盟</div>
            <div>
                <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="off" label-position="left" style="width:500px;float:left;">
                    <el-form-item prop="Company">
                        <el-input ref="Company" v-model="loginForm.Company" placeholder="请输入/单位名称" name="Company" type="text" tabindex="1" auto-complete="off" clearable  prefix-icon="el-icon-date" />
                    </el-form-item>
                    <el-form-item prop="leader">
                        <el-input ref="leader" v-model="loginForm.leader" placeholder="请输入/负责人" name="leader" type="text" tabindex="1" auto-complete="off" clearable  prefix-icon="el-icon-date" />
                    </el-form-item>
                    <el-form-item prop="direction">
                        <el-input ref="direction" v-model="loginForm.direction" placeholder="请输入/加盟方向" name="direction" type="text" tabindex="1" auto-complete="off" clearable  prefix-icon="el-icon-date" />
                    </el-form-item>
                    <el-form-item prop="Address">
                        <div style="position: relative;">
                            <el-input ref="Address" v-model="loginForm.Address" placeholder="请输入/城市" name="Address" readonly type="text" tabindex="1" @focus="showLevelLinkageBox('focus')" @blur="showLevelLinkageBox('blur')" auto-complete="off"  prefix-icon="el-icon-date" />
                            <div class="level-linkage" ref="levelLinkage">
                                <ul>
                                    <li v-for="(item,index) in provinceList" :key="index" @click="provinceHandle(item,index)" :class="provinceCurrentIndex==index? 'active-class':''">{{item.sProName}}</li>
                                </ul>
                                <ul>
                                    <li v-for="(item,index) in cityList" :key="index" @click="cityHandle(item,index)" :class="cityCurrentIndex==index? 'active-class':''">{{item.sCityName}}</li>
                                </ul>
                                <ul>
                                <li v-for="(item,index) in areaList" :key="index" @click="areaHandle(item,index)" :class="areaCurrentIndex==index? 'active-class':''">{{item.sRegionName}}</li>
                                </ul>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item prop="phone">
                        <el-input ref="username" v-model="loginForm.phone" placeholder="请输入/电话" name="phone" type="text" tabindex="1" auto-complete="off" clearable  prefix-icon="el-icon-date" />
                    </el-form-item>
                    <el-form-item prop="email">
                        <el-input ref="username" v-model="loginForm.email" placeholder="请输入/邮箱" name="email" type="text" tabindex="1" auto-complete="off" clearable  prefix-icon="el-icon-date" />
                    </el-form-item>
                    <div class="wl-button">
                        <el-button :loading="loading" type="primary" @click.native.prevent="handleCommit">提交</el-button>
                    </div>
                </el-form> 

                <div class="right-cooperation-alliance-box">
                    <div style="margin-bottom:20px;font-size:20px;color:#000;">注：加盟请联系</div>
                    <div class="alliance-item">
                        <div class="item-left-text">
                            <div style="margin-bottom:20px;">招商经理-刘老师</div>
                            <div style="margin-bottom:20px;">电话：13011159617</div>
                            <div>微信：扫描右侧二维码</div>
                        </div>

                        <div class="item-right-imgbox">
                           <img src="@/assets/about_us/liuli.jpg" />
                        </div>
                    </div>
                    <div class="alliance-item">
                        <div class="item-left-text">
                            <div style="margin-bottom:20px;">校企合作负责人-孙老师</div>
                            <div style="margin-bottom:20px;">13263432357</div>
                            <div>微信：扫描右侧二维码</div>
                        </div>
                        <div class="item-right-imgbox">
                           <img src="@/assets/about_us/wangyunlong.jpg" />
                        </div>
                    </div>
                    <div class="alliance-item">
                        <div class="item-left-text">
                            <div style="margin-bottom:20px;">校区合作经理-Amy老师</div>
                            <div style="margin-bottom:20px;">19520388121</div>
                            <div>微信：扫描右侧二维码</div>
                        </div>
                        <div class="item-right-imgbox">
                           <img src="@/assets/about_us/amy.jpg" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
const validateCompany = (rule, value, callback) => {
    if (!value) {
        callback(new Error("Please enter the correct user name"));
    } else {
        callback();
    }
};
const validatePassword = (rule, value, callback) => {
    if (!value) {
        callback(new Error("Please enter the correct user name"));
    } else {
        callback();
    }
};
const validateAddress = (rule, value, callback) => {
    if (!value) {
        callback(new Error("Please enter the correct user address"));
    } else {
        callback();
    }
};
const defaultListQuery = {
    pageNum: 1,
    pageSize: 10
};
let id = 0;
export default {
  components: {

  },
  data() {
        return {
            loginForm:{},
            loginRules: {
                Company: [
                    { required: true, trigger: "blur", validator: validateCompany }
                ],
               
                Address:[
                    { required: true, trigger: "blur", validator: validateAddress }
                ]
            },
            loading:false,
            provinceCurrentIndex:null,
            cityCurrentIndex:null,
            areaCurrentIndex:null,
            provinceList:[],
            cityList:[],
            areaList:[],
            options: [],
            province:null,
            city:null,
            area:null          
        }
    },

    beforeMount() {

    },
    mounted() {
        this.getProvinceList()

        
    },
    computed:{
        
    },
    methods: {
        getAddress(){
            let arr=[]
            if(this.province){
                arr.push(this.province.sProName)
            }
            if(this.city){
                arr.push(this.city.sCityName)
            }
            if(this.area){
                arr.push(this.area.sRegionName)
            }
            if(arr.length>0){
                this.$set(this.loginForm, 'Address', arr.toString().replace(/\,/g,' —'))
            }else{
                this.$set(this.loginForm, 'Address', '')
            }
        },
        showLevelLinkageBox(val){
            if(val=='focus'){
                this.$refs.levelLinkage.style.display="block"
            }
            if(val=='blur'){
                // this.$refs.levelLinkage.style.display="none"
            }
        },
       
        provinceHandle(item,index){
            this.getCityList(item)
            this.province=item
            this.provinceCurrentIndex=index
            this.areaList=[]
            this.city=''
            this.area=''
            this.getAddress()
            this.cityCurrentIndex=null
            this.areaCurrentIndex=null
        },
        cityHandle(item,index) {
            this.getAreaList(item)
            this.city=item
            this.area=''
            this.cityCurrentIndex=index
            this.areaCurrentIndex=null
            this.areaList=[]
            this.getAddress()

        },
        areaHandle(item,index){
            this.area=item
            this.areaCurrentIndex=index
            this.$refs.levelLinkage.style.display="none"
            this.getAddress()
        },

        getProvinceList(){
            this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/province`,{ params: {} }).then(response => {
                this.provinceList=response.data
            })
        },
        getCityList(item){
            let params={iProID:item.iProID}
            this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/city`,{ params: params}).then(response => {
                this.cityList=response.data
                if(this.cityList.length==0){
                    this.$refs.levelLinkage.style.display="none"
                }
            })
        }, 
        getAreaList(item){
            let params={iCityID:item.iCityID}
            this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/region`,{ params: params}).then(response => {
                this.areaList=response.data
                if(this.areaList.length==0){
                    this.$refs.levelLinkage.style.display="none"
                }
            })
        }, 
        handleCommit(){
            let params={
                    sCityName:this.province.sProName,
                    sMail:this.loginForm.email,
                    direction:this.loginForm.direction,
                    sPhone:this.loginForm.phone,
                    person:this.loginForm.leader
                }
            console.log(params)
            this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/join`,{ params: params}).then(response => {
                if(response.code=='0'){
                    this.$message({ message: '提交成功', type: 'success'});
                }else{
                    this.$message({ message: response.msg, type: 'warning'});
                }
            })
        }
    },
    filters: {
        
    },
};
</script>
<style lang="less" scoped>
    .introduction{
        height: 450px;
        // background: rgb(204, 204, 204);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-size:18px;
        color:#333
    }
    /deep/ .el-input__inner{
        height: 60px;
        line-height: 60px;
    }
    .wl-button{
        height: 60px;
        line-height: 60px;
        width:100%;
        // margin-bottom:50px;
        // margin-top:10px;
        /deep/ .el-button{
            height:100%;
            width: 100%;
            font-size: 24px;
           
        }
    }
    
    .level-linkage{
        position: absolute;
        width:100%;
        height:300px;
        background: #fff;
        margin-top:10px;
        border: 1px solid #ebeef5;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        z-index: 111;
        display: none;
        ul{
            overflow-y: auto;
            cursor: pointer;
            // flex: 1;
            height:100%;
            width:33.33%;
            box-sizing: border-box;
            text-align: center;
            float:left;
            li{
                height:45px;
                line-height:45px;
            }
        }
    }
    
    .right-cooperation-alliance-box{
        float: right;
        width:380px;
        font-size:18px;
        color:#666;

        .alliance-item{
            margin-bottom:50px;
            overflow: hidden;
            .item-left-text{
                overflow:hidden;
                padding-left: 32px;
                float:left
            }
            .item-right-imgbox{
                width:120px;
                height:120px;
                background: #666666;
                border: 0px solid #3F82BB;
                float:right;
                img{
                    width:100;
                    height:100%;
                }
            }
            
        }
    }
    .active-class{
        background:#f4f4f4;

    }
</style>





