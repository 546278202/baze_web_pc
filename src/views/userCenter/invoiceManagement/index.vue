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
        <div class="right-box-title" style="font-size:24px;">我的发票</div>
        <div class="el-tabs" >
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="" name="first"></el-tab-pane>
            </el-tabs>
        </div>
        <component :is="comName" @togglePage="togglePage(arguments)" :item="item"></component>
    </div>
</template>
<script>
  import NoData from "@/components/NoData";
  import detail from "./detail";
  import invoiceList from "./invoiceList";
  import add from "./add";

  export default {
  components: {
    NoData,
    invoiceList,
    detail,
    add
  },
  data() {
    return {
        dataList: [],
        activeName: 'first',
        comName:'invoiceList',
        item:null
    };
  },

  beforeMount() {
      
  },
  mounted() {
    if(this.$route.query.params){
        this.comName=this.$route.query.params
    }
  },
  
  methods: {
    handleClick(tab, event) {
        
    },
    togglePage(arr){
        switch(arr[0]){
            case "invoiceList" :
                this.comName = "invoiceList";
                break;
            case 'detail' :
                this.comName = "detail";
                this.item=arr[1]
                break;
            case 'add' :
                this.item=null
                this.comName = "add";
                break;
        }
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
// ul{
//     font-size:16px;
// }
// ul li {
//     border-bottom: 1px solid #E4E4E4;
//     // height: 238px;
//     border: 2px solid #F4F4F4;
//     border-radius: 6px;
//     padding:20px 15px;
//     .item{
//         margin-bottom: 15px;
//         font-size: 20px;
//         overflow: hidden;
//     }
//     .lable{
//         width:100px;
//         float:left;
//         color:#999
//     }
   
// }

// ul li .item:last-child{
//     margin-bottom: 0px;
// }
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





