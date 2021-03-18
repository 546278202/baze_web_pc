<template>
  <div class="productList" style="min-height:800px;background:#F4F4F4;">
    <HeadNavigation></HeadNavigation>
    <Loop v-if="dataBase.banner" :list="dataBase.banner"></Loop>
    <div class="main">
        <NavigationFilter @fatherMethod="fatherMethod"></NavigationFilter>
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
                            <el-image :src="Global.img_BASE_URL+item.sSchonLogo"></el-image>
                        </div>
                        <div class="right-info" style="float: left;width:470px;">
                            <div style="font-size: 24px;margin-top:20px;color: #000000;">{{item.sSchooName}} </div>
                            <div class="tab-list"><a>{{item.sAddress}}</a><a>{{item.sType}}</a></div>
                            <div style="margin-top:20px;margin-bottom:5px;color: #000000;">层次 : <span style="margin-right:10px;" v-for="(i,index) in item.sArrangement" :key="index">{{ i | schoolFilter }}</span> </div>
                            <div style="margin-bottom:15px;color: #000000;" >累计报名{{item.sEnroll}}</div>
                            <div class="btn-list">
                                <router-link :to="{ path: '/collegeRules', query:{id:item.sid}}">招生简章</router-link>
                                <router-link :to="{ path: '/collegeDetail', query:{id:item.sid}}">院校详情</router-link>              
                            </div>
                        </div>
                        <div style="float: left;width: 1px;height: 168px;background: #CCCCCC;margin-right:100px;margin-top:30px;"></div>

                        <div class="right-module" style="float: left;">
                            <div style="font-size: 16px;margin-top:20px;color: #000000;">推荐专业<a style="font-size: 12px;font-family: Source Han Sans CN;font-weight: 300;color: #999999;float:right;">更多&nbsp></a></div>
                            <div class="tab-list"><a v-for="(i,index) in item.speciality" :key="index">{{i.sName}}</a></div>
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
import Loop from "@/components/Loop";
import Footer from "@/components/Footer";
import RightMessageBar from "@/components/RightMessageBar";
import NavigationFilter from "@/components/NavigationFilter";

export default {
  components: {
    HeadNavigation,
    NavigationFilter,
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
            total: 30,
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
    },
    methods: {
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
            this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/schoo`,{ params: params }).then(response => {
                this.dataList=response.data
                this.total=Number(response.total)
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
        },
        schoolFilter(element){
        // let arr=[]
        let str
        // list.forEach(element => {
            if(element=='1') {
                str= '高起专'
            }else if(element=='2'){
                str="高起本"
            }else if(element=='3'){
                str="专升本"
            }
            // arr.push(str)
    
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
    padding-top: 180px;
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
    //   margin-top: 50px;
  }
  .class-list ol::after{
      width: 40px;
      background: orangered;
  }
  .class-list ol li{
    height: 228px;
    background: #fff;
    margin-bottom:40px;
    font-size:14px;
    box-sizing: border-box;
	color: #000000;
    padding-right:60px;
    padding-left:30px;
    border-radius: 5px;
    
}
 .class-list ol li .left-logo{
     width: 160px;
    height: 100%;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 30px;
}


.class-list ol li .right-info .tab-list{
 
    margin-top:15px;
}
.class-list ol li .right-info .tab-list a{
	color: #000000;
    display:inline-block;
    width: 90px;
    height: 22px;
    line-height: 22px;
    border: 1px solid #23D3B5;
    border-radius: 5px;
    color:#23D3B5;
    text-align:center;
    margin-right:10px;
}
.class-list ol li .right-info .btn-list a{
    display: inline-block;
    width: 111px;
    height: 28px;
    background: #23D3B5;
    border-radius: 6px;
    margin-right: 50px;
    line-height: 28px;
    text-align: center;
	color: #fff;
	
}
  



 .class-list ol li .right-module{
     float: left;
	 width: 344px;
	.tab-list{
		margin-top: 20px;
		overflow: hidden;
		 a{
			display: block;
			float: left;
			padding: 0 15px;
			height: 20px;
			line-height: 20px;
			border: 1px solid #000000;
			border-radius: 5px;
			text-align: center;
			margin-right: 12px;
			margin-bottom: 12px;
			color: #000000;
		}
 	}
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





