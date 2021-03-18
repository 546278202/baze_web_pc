<template>
<div>
  <div class="productList" ref="productList" style="background:#F4F4F4;">
    <HeadNavigation></HeadNavigation>
    <!-- <Loop v-if="dataBase.banner" :list="dataBase.banner"></Loop> -->
     <div style="margin-top:70px;">
            <Loop v-if="dataBase.banner" :list="dataBase.banner"></Loop>
        </div>
    <div class="main" ref="main">
        <NavigationMajorFilter @fatherMethod="fatherMethod" :BreadList="['学历提升','专业列表']"></NavigationMajorFilter>
        <div class="class-list" id="class-list">
            <div class="item">
                <div class="top">
                    <div class="el-tabs" >
                        <el-tabs v-model="activeName">
                            <el-tab-pane label="报名量由高到低" name="first" type=""></el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
                <ol style="overflow:hidden;min-height: 500px;position: relative;">
                    <li v-for="(item,index) in dataList" :key="index">
                        <!-- <router-link :to="{ path: '/videoDetail' , query:{id:item.id}}"> -->
                            <div class="left-logo">
                                <el-image :src="Global.img_BASE_URL+item.sMajorImg"></el-image>
                            </div>
                            <div class="right-info" style="float: left;">
                                <div style="font-size: 30px;margin-bottom:15px;color: #000000;">{{item.sName}}</div>
                                <div style="float:left;">
                                    <div style="float:left;margin-right:20px;">
                                        <el-image style="border-radius: 50%;height: 50px;width: 50px;" :src="Global.img_BASE_URL+item.sSchooLogo"></el-image>
                                    </div>
                                    <div style="float:left;width:470px;">
                                        <div style="font-size: 24px;color: #000000;">{{item.sSchooName}} </div>
                                        <div style="height: 13px;font-size: 12px;font-family: Source Han Sans CN;font-weight: 400;color: #FF2324;margin-bottom:15px;">
                                            {{item.sTitle}}
                                        </div>
                                        <div style="margin-bottom:10px;color: #23D3B5;font-size:14px;"><span style="margin-right:10px;width: 90px;height: 22px;border: 1px solid #23D3B5;border-radius: 4px;display:inline-block;text-align: center;line-height: 22px;" v-for="(i,index) in item.sArrangement" :key="index">{{i | sFeaturesFilter}}</span> </div>
                                        <div style="display: flex;align-items: center;justify-content: space-between;">
                                            <div style="margin-bottom:15px;color: #000000;" >层次 : <span  v-for="(e,index) in item.sArrangement" :key="index">{{e | sArrangementFilter}}</span></div>
                                            <div style="margin-bottom:15px;color: #000000;" >学制 {{item.sYear}} 年</div>
                                            <div style="margin-bottom:15px;color: #000000;" >累计报名 {{item.sEnroll}} 人</div>
                                        </div>
                                        <div class="tab-list"><a v-for="(e,index) in item.sLabel" :key="index">{{e | sLabelFilter}}</a></div>
                                        <div class="btn-list">
                                            <router-link style="border: 1px solid #23D3B5;border-radius: 4px;background: #FFFFFF;color:#23D3B5" :to="{ path: '/majorDetail', query:{sid:item.sid}}">了解详情 &nbsp></router-link>
                                            <a @click="signUpHandle(item)"> 立即报名> </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <!-- </router-link>   -->
                    </li>
                    <div class="no-data" v-if="dataList.length==0" style="width:400px;height:340px; position: absolute;transform: translate(-50%,-50%);top: 50%; left: 50%;">
                        <div style="position: absolute;width: 100%; bottom: 50px;left: 50%;transform: translateX(-50%);text-align: center;">
                            <p style="font-size: 14px;color: #999;">抱歉，没有找到你要的内容</p>
                            <p style="font-size: 14px;color: #999;margin-top:10px;">请换个方式查询</p>
                        </div>
                        <img src="@/assets/nodata.png" >
                    </div>
                </ol> 
                <div class="pagination-container" v-if="total>0">
                    <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        layout="total, sizes,prev, pager, next,jumper"
                        :current-page.sync="listQuery.pageNum"
                        :page-size="listQuery.pageSize"
                        :page-sizes="[5,10,15]"
                        :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>   
    </div>
    
    <RightMessageBar></RightMessageBar>
  </div>
  <Footer></Footer>
</div>

</template>
<script>
const defaultListQuery = {
    pageNum: 1,
    pageSize: 10
};
import HeadNavigation from "@/components/HeadNavigation";
import Loop from "@/components/Loop";
import Footer from "@/components/Footer";
import RightMessageBar from "@/components/RightMessageBar";
import NavigationMajorFilter from "@/components/NavigationMajorFilter";
// import NavigationCourseFilter from "@/components/NavigationCourseFilter";
import elementResizeDetectorMaker from "element-resize-detector";


export default {
  components: {
    HeadNavigation,
    NavigationMajorFilter,
    // NavigationCourseFilter,
    Loop,
    Footer,
    RightMessageBar
  },
  data() {
    return {
            IndexMenuDataList:null,
            IndexMenuChild:null,
            activeName: 'first',
            listQuery: Object.assign({}, defaultListQuery),
            listLoading: true,
            total: 0,
            childDataList:[],
            menuDataList:[],
            dataList:[],
            dataBase:[],
            item:[]
          
        };
    },

    beforeMount() {},
    mounted() {
        this.getLoopList()
        this.getDataList(this.listQuery)
        this.watchSize();

        
    },
    methods: {
        watchSize() {
            const _this = this;
            var erd = elementResizeDetectorMaker();
            erd.listenTo(this.$refs.main, (element) => { // 这里的this.$refs.fan指定要监听的元素对象，对应的是<div ref="fan"></div>
                var width = element.offsetWidth;
                var height = element.offsetHeight;
                _this.$nextTick(() => { // 这里填写监听改变后的操作
                    this.$refs.productList.style.height=height+640+'px'
                });
            });
        },
        fatherMethod(event){
            console.log(event)
            this.listQuery=Object.assign(event, defaultListQuery),
            this.getDataList(this.listQuery)

        },
        getLoopList() {
			this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/index`).then(response => {
				this.dataBase=response.data
			})
        },
        getDataList(params){
            this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/speciality`,{ params: params }).then(response => {
                console.log(response)
                this.dataList=response.data
                this.total=Number(response.total)
                
                
            })
        },
        signUpHandle(item){
            console.log(item)
            this.$router.push({ path: '/majorDetailSubmit', query: { params: JSON.stringify(item)}})
        },
        handleSizeChange(val){
            this.listQuery.pageNum = 1;
            this.listQuery.pageSize = val;
            this.getDataList(this.listQuery)
        },
        handleCurrentChange(val){
            this.listQuery.pageNum = val;
            this.getDataList(this.listQuery)
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
    margin: 0 auto;
    z-index: 111;
    position: absolute;
    top: 640px;
    left: 50%;
    transform: translate(-50%);
    -webkit-transform: translate(-50%);
    min-height:1300px;
    overflow: hidden;

}
  /* 课程分类 */
  .class-list{
      background:#F4F4F4;
      max-width:1920px;
      color:#fff;
      font-size:14px;
      box-sizing: border-box;
      /* padding:85px 0; */
  }
  .class-list .item{
      width: 1200px;
      min-height: 770px;
      color: #000;
      margin: 0 auto;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
	  position: relative;
	  padding-bottom: 100px;
  }

  .class-list .item .top {
      overflow: hidden;
  }
  .class-list ol{
      list-style: none;
      overflow: hidden;
  }
  .class-list ol::after{
      width: 40px;
      background: orangered;
  }
  .class-list ol li{
    background: #fff;
    margin-bottom:40px;
    font-size:14px;
    box-sizing: border-box;
    color: #000000;
    padding:20px;
    overflow: hidden;
}
 .class-list ol li .left-logo{
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
.class-list ol li .right-info .tab-list{
    margin-bottom: 30px;
}
.class-list ol li .right-info .tab-list a{
	color: #999999;
    display:inline-block;
    width: 68px;
    height: 18px;
    line-height: 18px;
    border: 1px solid #999999;
    border-radius: 4px;
    text-align: center;
    margin-right:20px;
}
.class-list ol li .right-info .btn-list a{
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

.pagination-container{
    /deep/ .el-pagination{
        text-align: center;
    }
}
.el-tabs{
    /deep/ .el-tabs__item{
        font-size:18px;
        height:70px;
        line-height: 70px;;
    }
}
.class-list ol .no-data img{
    display: block;
    width: 100%;
    opacity: .8;
}
</style>





