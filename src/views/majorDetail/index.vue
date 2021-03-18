<template>
  <div class="productList" style="min-height:800px;background:#F4F4F4;">
    <HeadNavigation></HeadNavigation>
    <div class="main" >
         <div style="padding:15px 0px;  font-size: 18px; font-family: Source Han Sans CN; font-weight: 400;color: #999999;">
            <BreadNavigation :BreadList="['专业详情']"></BreadNavigation>
        </div>
        <ol style="overflow:hidden;position: relative;">
            <li>
                <div class="left-logo">
                    <el-image v-if="item.sSchooLogo" :src="Global.img_BASE_URL+item.sSchooLogo"></el-image>
                </div>
                <div class="right-info">
                    <div style="display: flex;align-items: center;justify-content: space-between;">
                        <div style="font-size: 30px;margin-bottom:15px;color: #000000;float-right;font-weight: 400;">{{item.sName}}</div>
                        <div class="tab-list" style="float-right"><a v-for="(e,index) in item.sLabel" :key="index">{{e | sLabelFilter}}</a></div>
                    </div>
                    <div>
                        <div style="font-size: 20px;font-family: Source Han Sans CN;font-weight: 400;color:#000;margin-bottom:15px;">
                            {{item.sTitle}}
                        </div>
                        <div style="display: flex;align-items: center;font-size:16px;#000;">
                            <div style="margin-bottom:15px;color: #000000;margin-right:150px;font-weight: 400;" >学制 : {{item.sYear}} 年</div>
                            <div style="margin-bottom:15px;color: #000000;" >累计报读 : {{item.sEnroll}} 人</div>
                        </div>
                        <div class="data-school">
                            <div style="height: 30px;line-height: 30px; margin-right: 30px;">选择院校 :</div>
                            <div class="right-list">
                                
                                <a v-for="(e,index) in item.sSchooName" :key="index" @click="getDetail(e,index)" :class="currentIndex==index? 'school-active':'school-default'">{{e.sSchooName}}</a> 
                            </div>
                        </div>
                         <div class="data-school">
                            <div style="height: 30px;line-height: 30px; margin-right: 30px;">选择层次 :</div>
                            <div class="right-list">
                                <a  v-for="(e,index) in item.sArrangement" :key="index">{{e | sArrangementFilter}}</a>
                            </div>
                        </div>
                        <div class="btn-list">
                            <a style="border: 1px solid #23D3B5;border-radius: 4px;background: #FFFFFF;color:#23D3B5" @click="signUpHandle(item)">立即报名 &nbsp></a>
                            <a href="javascript:void(0);" onclick="mantis.requestChat()" >报名咨询 &nbsp></a>                                
                        </div>
                    </div>
                </div>
            </li>
            <div class="no-data" v-if="!item" style="width:400px;height:340px; position: absolute;transform: translate(-50%,-50%);top: 50%; left: 50%;">
                <div style="position: absolute;width: 100%; bottom: 50px;left: 50%;transform: translateX(-50%);text-align: center;">
                    <p style="font-size: 14px;color: #999;">抱歉，没有找到你要的内容</p>
                    <p style="font-size: 14px;color: #999;margin-top:10px;">请换个方式查询</p>
                </div>
                <img src="@/assets/nodata.png" >
            </div>
        </ol> 

         <div class="el-tabs" >
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="专业介绍" name="first"></el-tab-pane>
                <el-tab-pane label="报名须知" name="second"></el-tab-pane>
                <el-tab-pane label="考试与毕业" name="third"> </el-tab-pane>
            </el-tabs>
        </div>
        <div style="background:#fff;min-height:500px;padding: 30px;" v-html="strhtml">
            
        </div>
    </div>
    <Footer></Footer>
    <RightMessageBar></RightMessageBar>
  </div>
</template>
<script>
const defaultListQuery = {
    pageNum: 1,
    pageSize: 10
};
import HeadNavigation from "@/components/HeadNavigation";
import BreadNavigation from "@/components/BreadNavigation";
import Footer from "@/components/Footer";
import RightMessageBar from "@/components/RightMessageBar";
import NavigationMajorFilter from "@/components/NavigationMajorFilter";

export default {
  components: {
    HeadNavigation,
    BreadNavigation,
    Footer,
    RightMessageBar
  },
  data() {
    return {
            currentIndex:0,
            IndexMenuDataList:null,
            IndexMenuChild:null,
            activeName: 'first',
            listQuery: Object.assign({}, defaultListQuery),
            listLoading: true,
            total: 30,
            childDataList:[],
            menuDataList:[],
            dataBase:[],
            item:[],
            strhtml:null
          
        };
    },

    beforeMount() {},
    mounted() {
        this.getDataList(this.$route.query)

    },
   
    methods: {
        getDetail(item,index){
            this.currentIndex=index
            this.getDataList({sid:item.sid})
        },
        signUpHandle(item){
            let obj=JSON.parse(JSON.stringify(item)) 
            obj.sSchooName=obj.sSchooName[this.currentIndex].sSchooName
            let params=JSON.stringify(obj).replace(/%/g, '%25');
            this.$router.push({ path: '/majorDetailSubmit', query: { params: params}})
        },
        handleClick(tab, event) {
            if(tab.name=="first"){
                this.strhtml=this.item.sIntroduce
            }
            if(tab.name=="second"){
                this.strhtml=this.item.sNotice
            }
            if(tab.name=="third"){
                this.strhtml=this.item.sGraduation
            }
        },
        
        fatherMethod(event){
            console.log(event)
            this.listQuery=Object.assign(event, defaultListQuery),
            this.getDataList(this.listQuery)
        },
        
        getDataList(params){
            this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/specialityinfo`,{ params: params }).then(response => {
                this.item=response.data
                this.strhtml=response.data.sIntroduce
            })
        },
       
        enter($event) {
            $event.currentTarget.className = 'imghover';
        },
        leave($event) {
            $event.currentTarget.className = 'imghoverout';
        }
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
    position: relative;
    width: 1200px;
    margin: 0 auto;
    margin-top: 70px;
    padding-bottom:50px;
}
   .top {
      overflow: hidden;
  }
   ol{
      list-style: none;
      overflow: hidden;
  }
//    ol::after{
//       width: 40px;
//       background: orangered;
//   }
   ol li{
    background: #fff;
    font-size:14px;
    box-sizing: border-box;
    color: #000000;
    padding:20px;
    overflow: hidden;
}
  ol li .left-logo{
    width: 424px;
    height: 268px;
    background: #666666;
    border-radius: 6px;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 30px;
    overflow: hidden;

}
 ol li .right-info .tab-list{
    margin-bottom: 30px;
}
 ol li .right-info .tab-list a{
    display:inline-block;
    width: 68px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    margin-right:20px;
    border: 1px solid #23D3B5;
    border-radius: 4px;
    color: #23D3B5;
    font-size:12px;
}
 ol li .right-info .btn-list a{
    display: inline-block;
    width: 111px;
    height: 32px;
    background: #23D3B5;
    border-radius: 6px;
    margin-right: 50px;
    line-height: 32px;
    text-align: center;
    color: #fff;
    font-size: 16px;
    box-sizing: border-box;
	
}
.school-default {
    color: #000;
    height: 28px;
    border: 1px solid hsl(0, 0%, 80%);
    border-radius: 4px;
}
.school-active {
    color: #23D3B5 !important;
    height: 28px;
    border: 1px solid #23D3B5  !important;
    border-radius: 4px;
}
    


.right-info .data-school{
    display:flex;
    margin-bottom: 15px;
}
.right-info .data-school .right-list a{
    height: 28px;
    border: 1px solid rgb(204, 204, 204);
    border-radius: 4px;
    line-height: 28px;
    padding: 0 15px;
    display: block;
    float: left;
    margin-right:30px;
}

//tabs导航
.el-tabs{
    background:#fff;
    margin-top: 20px;
    /deep/ .el-tabs__item{
        font-size:18px;
        height:70px;
        line-height: 70px;;
    }
    /deep/ .el-tabs__nav {
        margin-left:60px;
    }
    /deep/ .el-tab-pane{
        padding:0 60px;
    }
}

 ol .no-data img{
    display: block;
    width: 100%;
    opacity: .8;
}
</style>





