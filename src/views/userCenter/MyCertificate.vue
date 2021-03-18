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
        <div class="right-box-title" style="font-size:24px;">我的证书</div>
        <div class="el-tabs" >
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="" name="first"></el-tab-pane>
            </el-tabs>
        </div>
        <div style="position:relative;width:100%;min-height:500px;">
            <Certificates></Certificates>
        </div>
    </div>
</template>
<script>
  import NoData from "@/components/NoData";
  import Certificates from "@/components/Certificates";


  export default {
  components: {
    NoData,
    Certificates

  },
  data() {
    return {
        dataList: [],
        activeName: 'first'
    };
  },

  beforeMount() {
      
  },
  mounted() {
    this.getDataList()
  },
  
  methods: {
    getDataList() {
        this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/mycertificate`,{ params:  {} }).then(response => {
            this.dataList=response.data

        })
    },
    handleClick(tab, event) {
        
    },
   

    updateHandel(){
        // consle.log(item)
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
    border: 2px solid #F4F4F4;
    border-radius: 6px;
    padding:20px 15px;
  
   
}

ul li .item:last-child{
    margin-bottom: 0px;
}
.wl-button{
    // margin-bottom: 25px;
    width:132px;
    float: right;
    /deep/ .el-button{
        width: 100%;
        color:#23D3B5;
        border:1px solid #23D3B5
    }
}

   //tabs导航
.el-tabs{
    // background:#fff;
    // margin-top: 20px;
    /deep/ .el-tabs__item{
        font-size:20px;
        height:50px;
        line-height: 50px;
    }
    /deep/ .el-tabs__nav {
        // margin-left:60px;
    }
    /deep/ .el-tab-pane{
        // padding:0 60px;
    }
    /deep/ .el-tabs__item{
        height:0;
    }
}
</style>





