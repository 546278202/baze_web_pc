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
        <div class="right-box-title" style="font-size:24px;margin-bottom:5px;">我的订单</div>
        <div class="el-tabs" >
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="全部" name="null"></el-tab-pane>
                <el-tab-pane label="待支付" name="0"></el-tab-pane>
                <el-tab-pane label="已支付" name="1"></el-tab-pane>
                <el-tab-pane label="已取消" name="2"></el-tab-pane>
            </el-tabs>
        </div>
        <div class="data-Content" style="position:relative;width:100%;min-height:500px;">
            <div>
                <div style="color:#CCCCCC;font-size:16px;text-align:right;margin-bottom:10px;">订单回收站</div>
                <ul v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" >
                    <li v-for="(item,index) in dataList" :key="index">
                        <div style="height: 43px;line-height:43px;background: #F4F4F4;padding:0 10px;font-size:14px;color:#999;">
                            <el-checkbox  > <span style="margin-right:40px;font-size:14px;color:#999;">订单号：{{item.orderNum}}</span>  </el-checkbox> <span>创建时间：{{item.dCreatTime}}</span>
                        </div>
                        <div style="display:flex;">
                            <div class="img-box">
                                <img :src="Global.img_BASE_URL+item.course.courseImg" :onerror="Global.defalutLogoUrl" />
                            </div>
                            <div class="p-data">
                                <div class="p-name">{{item.course.courseName}}</div>
                                <div style="font-size:12px;color:#999;">1门课程 </div>
                            </div>
                            <div class="p-amount">
                                <span style="color:#FD6766;">¥{{item.payPrice}}</span>
                            </div> 
                            <div class="p-status">
                                <div style="margin-bottom:10px;">{{item.payStatus | orderStatus}}</div>
                                <div class="right-btns">
                                    <el-button type="primary" size="mini" v-if="item.payStatus==0" @click="directionHandle(item)">去支付</el-button>
                                    <router-link v-if="item.payStatus=='1'" :to="{ path: '/userCenter',query:{type:'invoiceManagement',params:'add'}}">申请发票</router-link>
                                    <el-button type="primary" size="mini" v-if="item.payStatus=='2'" @click="directionHandle(item)">已取消</el-button>
                                </div>
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
            </div>
            <NoData v-if="dataList.length=='0'"></NoData>
        </div>
    </div>
</template>
<script>
const defaultListQuery = {
    pageNum: 1,
    pageSize: 10
};
  import NoData from "@/components/NoData";
  export default {
  components: {
    NoData
  },
  data() {
    return {
        dataList: [],
        activeName: 'null',
        listQuery: Object.assign({}, defaultListQuery),
        loading: false,
        total: null,

    };
  },

  beforeMount() {
      
  },
  mounted() {
    this.getDataList(this.listQuery)
    
  },
    filters: {
        orderStatus(value) {
            switch(value){
                case '0' :
                    return '待支付';
                case '1' :
                    return '已支付';
                case '2' :
                    return '已取消';
            }
        }
    },
  methods: {
      handleClick(tab, event) {
        switch(tab.name){
            case "null" :
              
                this.listQuery=Object.assign({}, defaultListQuery)
                this.getDataList(this.listQuery)
                break;
            case "0" :
                this.listQuery=Object.assign({type:tab.name}, defaultListQuery)
                this.getDataList(this.listQuery)
                break;
            case '1' :
                this.listQuery=Object.assign({type:tab.name}, defaultListQuery)
                this.getDataList(this.listQuery)
                break;
            case '2' :
                this.listQuery=Object.assign({type:tab.name}, defaultListQuery)
                this.getDataList(this.listQuery)
                break;
        }
    },
    
    getDataList(params) {
        this.loading=true
        this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/myorder`,{params:params}).then(response => {
            console.log(response)
            this.loading=false
            if(response.code=='0'){
                this.dataList=response.data
                this.total=Number(response.total)
            }else{
                this.$message({ message: response.msg, type: "warning" });
            }
           
        })
    },
    directionHandle(item){       
        if(item.payStatus=='0') {
            let params={type:'detailOrder',id:item.orderNum}
            this.$router.push({ path: `/order/detail`,query:params})
        } 
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
   
    handleAcceptCallback(val){
      
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
ul{
    font-size:16px;
    margin-bottom:70px;
    min-height: 500px;
}
ul li {
    border: 2px solid #E4E4E4;
    margin-bottom: 20px;
    .img-box{
        width:159px;height:96px;background:#999;margin-right:30px;border-radius: 10px;
        margin: 15px 15px 15px 35px;
        overflow: hidden;
        img{
            width: 159px;
            height: 96px;
        }
    }
    .p-data{
        width:190px;border-right: 2px solid #E4E4E4;padding:15px 35px 15px 0;flex-direction: column; display: flex;justify-content: space-between;
        .p-name{
            font-size:16px;margin-bottom:5px;color:#000; font-weight: bold;
        }
    }
    .p-amount{
        width:160px;
        border-right: 2px solid #E4E4E4;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 15px 0;
    }
    .p-status{
        width:140px;
        text-align: center;
        padding:15px 0;
        color:#FD6766;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
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





