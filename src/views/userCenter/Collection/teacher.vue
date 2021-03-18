<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-11-28 18:39:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-29 19:52:11
-->
<template>
    <div class="data-Content" style="position:relative;width:100%;min-height:500px;">
        <div style="color:#CCCCCC;font-size:16px;text-align:right;margin-bottom:10px;">共有{{total}}个收藏</div>
        <ul>
            <li v-for="(item,index) in dataList" :key="index">
                <div class="video-top"> 
                    <div class="portrait">
                        <el-image style=" width: 96px; height: 96px;" v-if="item.colleImg" :src="Global.img_BASE_URL+item.colleImg" fit="cover"></el-image>
                    </div>
                </div>
                <div style="padding:15px;padding-top: 40px;">
                    <div class="t-name">{{item.Collection}}</div>
                    <div class="describe-data">
                        <span>女</span><span >河南</span><span >心理咨询师</span>
                    </div>
                    <div style="text-align:center;margin-bottom:15px;font-size:14px;">2545粉丝</div>
                    <div class="t-btns">
                        <div class="wl-button"><el-button size="mini" type="primary">+关注</el-button></div>
                        <div class="wl-button"><el-button size="mini" type="primary">私信</el-button></div>
                    </div>
                </div>
            </li>
        </ul>    
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
        <NoData v-if="dataList.length=='0'"></NoData>
    </div>
</template>
<script>
const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    type:2
};
import NoData from "@/components/NoData";
export default {
    components: {
        NoData
    },
    data() {
        return {
            dataList:[],
            listQuery: Object.assign({}, defaultListQuery),
            listLoading: true,
            total: null,

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
      
        getDataList(params) {
            this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/collectionindex`,{ params: params }).then(response => {
                if(response.code=='0'){
                    this.dataList=response.data
                    this.total=Number(response.total)
                }
               
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
ul{
    font-size:16px;
    list-style: none;
    overflow: hidden;
    min-height: 500px;
    position: relative;
}

ul li{
    font-size: 14px;
    width: 238px;
    border: 1px solid #f1f1f1;
    float: left;
    border-radius: 10px;
    overflow: hidden;
    margin-right: 14px;
    margin-bottom: 30px;
    cursor: pointer;
    background: #fff;
    box-shadow: 0 4px 10px rgba(0,0,0,.05);
    color:#666666;
    box-sizing: border-box;
    position: relative;
}
ul li a{
    color:#666666;
   
}
ul li .t-btns a{
    display: inline-block; 
}

ul li .t-btns{
    display: flex;
    justify-content: space-between;

}
 
// ul li {
//     width: 100%;
//     // height: 100%;
//     cursor: pointer;
//     transition: all 0.3s;
// }
ul li .video-top{
    height: 82px;
    background: #F4F4F4;;
    position: relative;
}

ul li .describe{
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #000000;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-bottom:10px;
}
ul li .portrait{
    width: 90px;
    height: 90px;
    background: #999999;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 20px;
    transform: translate(-50%);
    overflow: hidden;
    border:3px solid #ccc;
    img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s;
    }
}


ul li .t-name{
    text-align:center;
    font-size:24px;
    color:#000;
    margin-bottom:15px;

}
ul li .describe:hover{
    color:#22D3B5;
}

ul li  .describe-data{
   margin-bottom:10px;
}
ul li .describe-data span{
    margin-right:20px;
    font-size:16px;
}
ul li .t-btns{
    font-size:16px;
    display: flex;
    justify-content: space-between;
   .wl-button{
       width:98px;
        /deep/ .el-button{
            width:100%;
        }
   }
}

ul li:nth-child(3n+3){
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





