<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-11-28 18:39:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-29 19:52:11
-->
<template>
    <div class="right-content">
        <div class="right-box-title" style="font-size:24px;margin-bottom:5px;">我的收藏</div>
        <div class="el-tabs" >
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="录播课" name="first">
                    <NoData v-if="dataList.length=='0'"></NoData>
                    <div  class="data-Content" style="position:relative;width:100%;min-height:500px;">
                        <div style="color:#CCCCCC;font-size:16px;text-align:right;margin-bottom:10px;">共有{{total}}个收藏</div>
                        <ol style="overflow:hidden;min-height: 500px;position: relative;">
                            <li v-for="(item,index) in dataList" :key="index">
                                <router-link :to="{ path: '/videoDetail' , query:{id:item.id}}">
                                    <div class="video-top">
                                        <img :src="Global.img_BASE_URL+item.colleImg">      
                                    <div class="video-num"> <i class="iconfont icon-bofang"></i>101.1万</div> 
                                    </div>
                                    <div class="video-bottom">
                                        <div class="describe"> {{item.Collection}} </div>
                                        <div class="describe-data">
                                            <div class="left" v-if="item.DisPrice"><span style="font-size:14px;color:#FF3333;">￥{{item.DisPrice}}</span></div>
                                            <div class="left" v-else><span >{{item.sArrangement}}</span></div>
                                            <div class="right" style="float:right;">已报名 <span >{{item.Enroll | sellsFilter}}</span> 人</div>
                                        </div>
                                    </div>
                                </router-link>  
                            </li>
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
                </el-tab-pane>
                <el-tab-pane label="直播课" name="second">
                    <live-list v-if="activeName=='second'"></live-list>
                </el-tab-pane>
                <el-tab-pane label="讲师" name="three">
                    <teacher v-if="activeName=='three'"></teacher>
                </el-tab-pane>
            </el-tabs>
        </div>
       
    </div>
</template>
<script>
const defaultListQuery = {
    pageNum: 1,
    pageSize: 10
};
import NoData from "@/components/NoData";
import teacher from "./teacher";
import LiveList from './liveList.vue';

export default {
    components: {
        NoData,
        teacher,
        LiveList
    },
    data() {
        return {
            dataList:[],
            activeName: 'first',
            listQuery: Object.assign({}, defaultListQuery),
            listLoading: true,
            total: null
        };
    },

    beforeMount() {
        
    },
    mounted() {
        this.getDataList(this.listQuery)
        
    },
  
    methods: {
        handleSizeChange(val){
            this.listQuery.pageNum = 1;
            this.listQuery.pageSize = val;
            this.getDataList(this.listQuery)
        },
        handleCurrentChange(val){
            this.listQuery.pageNum = val;
            this.getDataList(this.listQuery)
        },
        handleClick(tab, event) {
            console.log(tab.name)
            this.activeName=tab.name
            if(tab.name=='first'){
                this.getDataList(this.listQuery)
            }
        },
        getDataList() {
            this.listQuery=Object.assign({type:1}, defaultListQuery),
            this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/collectionindex`,{ params:  this.listQuery }).then(response => {
                this.dataList=response.data
                this.total=Number(response.total)
            })
        },
        handleAcceptCallback(val){
        
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
    computed:{
        // showLoginBox(){
        //   return this.$store.state.showLoginBox
        // }
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
ol{
    font-size:16px;
    margin-bottom:70px;
    min-height: 500px;
    list-style: none;
    overflow: hidden;
}

ol li{
    font-size: 14px;
    width: 238px;
    // border: 1px solid #f1f1f1;
    float: left;
    border-radius: 10px;
    overflow: hidden;
    margin-right: 14px;
    margin-bottom: 30px;
    cursor: pointer;
    background: #fff;
    box-shadow: 0 4px 10px rgba(0,0,0,.05);
    color:#666666;
    border: 1px solid #E4E4E4;
    box-sizing: border-box;
}
ol li a{
    color:#666666
}
ol li img{
    width: 100%;
    height: 100%;
    cursor: pointer;
    transition: all 0.3s;
}
ol li .video-top{
    height:175px;
    background:#e6e6e6;
    position: relative;
    overflow: hidden;
}
ol li .video-top .video-num {
    position: absolute;
    right: 8px;
    bottom: 8px;
    font-size: 16px;
    color:#fff;
}
ol li .video-top .iconfont {
    font-size: 18px !important;
    margin-right:8px;
}
ol li .video-bottom{
    padding:10px;
    overflow:hidden;
}
ol li .video-bottom .describe{
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #000000;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
ol li .video-bottom .describe:hover{
    color:#22D3B5;
}
ol li .video-bottom .describe-data{
    margin-top:16px;overflow:hidden;  
}
ol li .video-bottom .describe-data .right span:first-child{
    color: #22D3B5;
    font-size: 16px;
}
ol li .video-bottom .describe-data .left{
    float:left;color:#22D3B5;
}

ol li:nth-child(3n+3){
    font-size: 14px;
    width:238px;
    border:1px solid #f1f1f1;
    float:left;
    border-radius: 10px;
    overflow: hidden;
    margin-right:0;
 
}   
//tabs导航
.el-tabs{
    // background:#fff;
    // margin-top: 20px;
    /deep/ .el-tabs__item{
        font-size:20px;
        height:50px;
        line-height: 50px;;
    }
    /deep/ .el-tabs__nav {
        // margin-left:60px;
    }
    /deep/ .el-tab-pane{
        // padding:0 60px;
    }
}
// 分页
.pagination-container{
    /deep/ .el-pagination{
        text-align: center;
    }
}
</style>





