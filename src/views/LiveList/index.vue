<template>
    <div>
    <div class="productList" ref="productList" style="background:#F4F4F4;">
    <HeadNavigation></HeadNavigation>
    <div style="margin-top:70px;">
        <Loop v-if="bannerList.length>0" :list="bannerList"></Loop>
    </div>
    <div class="main" ref="main">
        <NavigationCourseFilter @fatherMethod="fatherMethod" :BreadList="['直播列表']"></NavigationCourseFilter>
        <div class="class-list" id="class-list">
            <div class="item">
                <div class="top">
                    <div class="el-tabs" >
                        <el-tabs v-model="activeName" @tab-click="tabHandleClick">
                            <el-tab-pane label="所有课程" name="first" type=""></el-tab-pane>
                            <el-tab-pane label="免费课程" name="second" data-type="1"> </el-tab-pane>
                            <el-tab-pane label="VIP课程" name="three" type="2"></el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
                <ol style="overflow:hidden;min-height: 500px;position: relative;">
                    <li v-for="(item,index) in dataList" :key="index" @click="detailHandle(item)">
                        <div class="video-top">
                            <img :src="Global.img_BASE_URL+item.sLiveImg" @mouseover="enter($event)" @mouseleave="leave($event)">      
                            <div class="video-num" v-if="item.liveStatus=='1'" > 
                                <img  src="@/assets/Living.gif" style="width:16px;height:16px;margin-rightL5px;" />
                                <span style="color:#22D3B5;">直播中</span>
                            </div> 
                        </div>
                        <div class="video-bottom">
                            <div class="describe"> {{item.sLiveName}} </div>
                            <div class="describe-data">
                                <div class="left" v-if="item.author"><span>主讲人：{{item.author}}</span></div>
                                <div class="right" style="float:right;">已报名 <span >{{item.sells | sellsFilter}}</span> 人</div>
                            </div>
                        </div>
                    </li>
                   <NoData v-if="dataList.length=='0' && loading==false"></NoData>
                </ol> 
                <div class="pagination-container">
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
import Loop from "@/components/Loop";
import Footer from "@/components/Footer";
import RightMessageBar from "@/components/RightMessageBar";
import NavigationCourseFilter from "@/components/NavigationCourseFilter";
import elementResizeDetectorMaker from "element-resize-detector";
import NoData from "@/components/NoData";

export default {
  components: {
    HeadNavigation,
    BreadNavigation,
    NavigationCourseFilter,
    Loop,
    Footer,
    RightMessageBar,
    NoData
    
  },
  data() {
    return {
            activeName: 'first',
            listQuery: Object.assign({}, defaultListQuery),
            total: 30,
            dataList:[],
            bannerList:[],
            item:[],
            loading:true,

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
            this.listQuery=Object.assign(event, defaultListQuery),
            this.getDataList(this.listQuery)
        },
        detailHandle(item){
            // 正常进入下级页面
            if(item.liveStatus=='0'){
                 this.$router.push({ path: '/LiveDetail', query:{id:item.id}});
            }
            // 跳转直播详情
            if(item.liveStatus=='1'){
                let webUrl=`http://wap.kuaixueli.com/live/live.html#index?roomid=${item.id}`  
                // window.location.href = webUrl
                window.open(webUrl);   
            }
        },
     
       
        
        tabHandleClick(tab, event){
            console.log(this.activeName)
            let priceType=null
            if(tab.name=="first"){
                priceType=null
            }
            if(tab.name=="second"){
                priceType='1'
            }
            if(tab.name=="three"){
                priceType='2'
            }                        
            this.listQuery=Object.assign({},this.listQuery, {"isAudition":priceType})
            this.getDataList(this.listQuery)
        },
        getLoopList() {
			this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/banner`).then(response => {
				this.bannerList=response.data
			})
        },
    
        getDataList(params){
            this.loading=true
            this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/livecourseindex`,{ params: params }).then(response => {
                this.dataList=response.data
                this.total=Number(response.total)
                this.loading=false
            })
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
      overflow: hidden  
  }
  .class-list ol::after{
      width: 40px;
      background: orangered;
  }
  .class-list ol li{
      font-size: 14px;
      width: 277px;
    //   border: 1px solid #f1f1f1;
      float: left;
      border-radius: 10px;
      overflow: hidden;
      margin-right: 30px;
      margin-bottom: 40px;
      box-sizing: border-box;
      cursor: pointer;
      background: #fff;
      box-shadow: 0 4px 10px rgba(0,0,0,.05);
      color:#666666
    }
   .class-list ol li a{
     
        color:#666666
  }
  .class-list ol li img{
      width: 100%;
      height: 100%;
      cursor: pointer;
      transition: all 0.3s;
  }
  .class-list ol li .video-top{
      height:175px;
      background:#e6e6e6;
      position: relative;
      overflow: hidden;
  }
  .class-list ol li .video-top .video-num {
      position: absolute;
      right: 8px;
      bottom: 8px;
      font-size: 16px;
      color:#fff;
  }
//   .class-list ol li .video-top .iconfont {
//       font-size: 18px !important;
//       margin-right:8px;
//   }
  .class-list ol li .video-bottom{
      padding:10px;
      overflow:hidden;
  }
  .class-list ol li .video-bottom .describe{
        font-size: 18px;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #000000;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
  }
  .class-list ol li .video-bottom .describe:hover{
    color:#22D3B5;
  }
  .class-list ol li .video-bottom .describe-data{
      margin-top:16px;overflow:hidden;  
  }
  .class-list ol li .video-bottom .describe-data .right span:first-child{
      color: #22D3B5;
      font-size: 16px;
  }
  .class-list ol li .video-bottom .describe-data .left{
      float:left;
    //   color:#22D3B5;
  }

  .class-list ol li:nth-child(4n+4){
      font-size: 14px;
      width:277px;
    //   border:1px solid #f1f1f1;
      float:left;
      border-radius: 10px;
      overflow: hidden;
      margin-right:0;
      margin-bottom:40px;
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





