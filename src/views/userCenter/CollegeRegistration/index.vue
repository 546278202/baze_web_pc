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
        <div class="right-box-title" style="font-size:24px;margin-bottom:5px;">院校报名</div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="first">
                <detail></detail>
            </el-tab-pane>
                <el-tab-pane label="证件信息" name="second">
                <portrait v-if="activeName=='second'"></portrait>
            </el-tab-pane>
        </el-tabs>
        <!-- <component :is="comName" @togglePage="togglePage(arguments)" :item="item"></component> -->
    </div>
</template>
<script>
  import NoData from "@/components/NoData";
  import detail from "./detail";
  import portrait from "./portrait";
  export default {
  components: {
    NoData,
    detail,
    portrait
  },
  data() {
    return {
        activeName: 'first'
    };
  },

  beforeMount() {
      
  },
  mounted() {
   
  },
  
  methods: {
    handleClick(tab, event) {
        this.activeName=tab.name
    },
    updateHandel(){
    
    },

    handleAcceptCallback(val){
      
    }
  },
  computed:{
  
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





