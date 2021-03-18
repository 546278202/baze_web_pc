<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2020-11-28 18:39:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-29 19:52:11
-->
<template>
    <div>
        <div style="margin-bottom: 25px;overflow:hidden;">
            <div class="wl-button"><el-button type="text" size="medium" @click="addParent()">联系客服</el-button></div>
        </div>
        <div style="position:relative;width:100%;min-height:500px;">
            <el-table ref="orderTable" :data="dataList" style="width: 100%;"  border>
                <el-table-column label="开票时间" width="180" align="center">
                    <template slot-scope="scope">{{scope.row.time }}</template>
                </el-table-column>
                <el-table-column label="购买课程" align="center">
                    <template slot-scope="scope">{{scope.row.status }}</template>
                </el-table-column>
                 <el-table-column label="开票金额" align="center">
                    <template slot-scope="scope">{{scope.row.status }}</template>
                </el-table-column>
                <el-table-column label="开票状态" align="center">
                    <template slot-scope="scope">{{scope.row.status }}</template>
                </el-table-column>
                <el-table-column label="发票详情" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" @click="updataParent(scope.$index, scope.row)">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <NoData v-if="dataList.length==0"></NoData> -->
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
        activeName: 'first',
        listQuery: Object.assign({}, defaultListQuery),

    };
  },

  beforeMount() {
      
  },
  mounted() {
    this.getList()
    
  },
watch: {
    // id (val) {
    //   let query = this.$router.history.current.query;
    //   let path = this.$router.history.current.path;
    //   //对象的拷贝
    //   let newQuery = JSON.parse(JSON.stringify(query));
    //   // 地址栏的参数值赋值
    //   newQuery.id = val;
    //   this.$router.push({ path, query: newQuery });
    // }
  },

  methods: {
    addParent(){
        this.$emit("togglePage",'add')
    },
    
    updataParent(item){
        this.$emit("togglePage",'detail',item)
    },

    handleClick(tab, event) {
        
    },
   
    getList() {
        this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/consigneeindex`).then(response => {
            // this.dataList=response.data
            this.dataList=[{status:'1',time:'2020-08-09'}]

        })
    },
    handleDelete(item) {
      this.$confirm('是否要进行删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({ type: 'success', message: '操作成功!' });
        let ids = [];
        ids.push(item.id);

        // this.axios.patch(this.Global.BASE_URL + `/goods/batch/${this.operateType}`, ids).then(response => {
        //     if (response.data.status == 200) {
        //         this.$message({ type: 'success', message: '操作成功!' });
        //     }
        // })

      });
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
}
ul li {
    border-bottom: 1px solid #E4E4E4;
    // height: 238px;
    // border: 2px solid #F4F4F4;
    // border-radius: 6px;
    // padding:20px 15px;
    margin-bottom:15px;
    overflow: hidden;
    padding-bottom:20px;
} 
ul li div{
   width:19.33%;
   float:left;
//    display: inline-block;
} 
.wl-button{
    // margin-bottom: 25px;
    width:132px;
    float: right;
    /deep/ .el-button{
        width: 100%;
        height:100%;
        color:#23D3B5;
        // border:1px solid #23D3B5
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
</style>





