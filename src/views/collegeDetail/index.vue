<template>
  <div style="background:#F4F4F4;">
    <HeadNavigation></HeadNavigation>
    <Loop v-if="dataBase.banner" :list="dataBase.banner"></Loop>
    <div style="background: rgb(244, 244, 244);height: 498px;box-sizing: border-box;padding-top: 150px;">
        <div style="display: flex; margin: 0 auto;justify-content: space-between;width:1200px;margin:0 auto;">
            <div class="left-box">
                <img src="@/assets/collegeDetail/left-zhaosheng.png" />
                <div style="width: 555px;height: 64px;background: rgb(127, 124, 172);display: flex;align-items: center;justify-content: center;margin-bottom:15px;margin-top:84px;">
                    <!-- <div class="left-btn">招生简章</div> -->
                    <!-- <div class="left-btn"> -->
                    <router-link class="left-btn" :to="{ path: '/collegeRules', query:{id:detailData.sid}}">招生简章</router-link>
                    <!-- </div> -->
                </div>
                <div style="width: 357px;font-size: 20px;font-family: Source Han Sans CN;font-weight: bold;color: #ECEEE9">充分了解院校详情，科学合理选择院校</div>
            </div>
            <div class="left-box" style="background:#8FB4CD;">
                <img src="@/assets/collegeDetail/right-kefu.png" />
                <div style="width: 555px;height: 64px;background:#6695B3;display: flex;align-items: center;justify-content: center;margin-bottom:15px;margin-top:84px;">
                    <div class="right-btn" onclick="mantis.requestChat()">立即咨询</div>
                </div>
                <div style="width: 357px;font-size: 20px;font-family: Source Han Sans CN;font-weight: bold;color: #ECEEE9">充分了解院校详情，科学合理选择院校</div>
            </div>
        </div>
    </div>

    

    <div class="main">
        <div v-if="detailData" v-html="detailData.sGeneral" style="padding:50px;background:#fff;"></div>
    </div>

    <RightMessageBar></RightMessageBar>
    <Footer></Footer>
  </div>
</template>
<script>
const defaultListQuery = {
    pageNum: 1,
    pageSize: 20
};
import Loop from "@/components/Loop";
import HeadNavigation from "@/components/HeadNavigation";
import Footer from "@/components/Footer";
import RightMessageBar from "@/components/RightMessageBar";

export default {
  components: {
    HeadNavigation,
    Footer,
    Loop,
    RightMessageBar
  },
  data() {
    return {
            dataBase:{},
            detailData:{}
        };
    },

    beforeMount() {},
    mounted() {
        this.getDetail()
        this.getList()


    },
    methods: { 
        getDetail(){
            let params={sid:this.$route.query.id}
            this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/schooinfo`,{ params: params }).then(response => {
                console.log(response)
                this.detailData=response.data
            })
        },
        getList() {
			this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/index`).then(response => {
				this.dataBase=response.data
				console.log(response.data)
			})
		},
    },
    filters: {
        sellsFilter(value) {
            if(!value) {
                return '0';
            } else {
                return value
            }
        },
        sFeaturesFilter(element){
            let str
            if(element=='1') {
                str= '双一流'
            }else if(element=='2'){
                str="985工程"
            }else if(element=='3'){
                str="211工程"
            }else if(element=='4'){
                str="教育部直属"
            }else if(element=='5'){
                str="省部委共建"
            }else if(element=='6'){
                str="省属重点"
            }else if(element=='7'){
                str="省部共建"
            }else if(element=='8'){
                str="省教育厅直属"
            }else{
                str= 'N/A'
            }
            return str
        },
        sLabelFilter(element){
            let str
            if(element=='1') {
                str= '录取快'
            }else if(element=='2'){
                str="院校推荐"
            }else if(element=='3'){
                str="特殊专业"
            }
            return str
        },
        
        sArrangementFilter(element){
            let str
            if(element=='1') {
                str= '高起专'
            }else if(element=='2'){
                str="高起本"
            }else if(element=='3'){
                str="专升本"
            }    
         return str
        }
    },
};
</script>
<style lang="less" scoped>
    .main{
        min-height:600px;
        position: relative;
        width: 1200px;
        margin: 0 auto;
        padding-top: 90px;
        padding-bottom:50px;
        background:#fff
    }
   
    .left-box{
         width: 555px;
        height: 230px;
        background: rgb(137, 133, 184);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        img{
           width: 176px;
            height: 176px;
            position: absolute;
            top: -85px;
            left: 188px;
        }
         .left-btn{
            width: 209px;
            height: 42px;
            background: #FFFFFF;
            box-shadow: 0px 5px 0px 0px #504F6D;
            border-radius: 21px;
            color: #8985B8;
            line-height: 42px;
            text-align: center;
            font-weight: bold;
        }

    }

 .right-btn{
    width: 209px;
    height: 42px;
    background: #FFFFFF;
    box-shadow: 0px 5px 0px 0px #375161;
    border-radius: 21px;
    color: #6695B3;
    line-height: 42px;
    text-align: center;
    font-weight: bold;
    cursor: pointer;
 }
</style>