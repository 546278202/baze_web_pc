

<template>
    <div class="bread-navigation">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">您现在的位置： 首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item,index) in BreadList" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script>
export default {
    props:{
        BreadList:Array  
    },
    components: {
   
    },
    data() {
       return{

       }
    },

    beforeMount() {},
    mounted() {
        
    },
    methods: {
  
    }
};
</script>
<style lang="less" scoped>
.bread-navigation{
    .el-breadcrumb{
        // height: 70px;
        // line-height: 70px;
        overflow: hidden
    }
 
    /deep/ .el-breadcrumb__item{
        .is-link{
            font-weight: normal;
        }
        /deep/ .el-breadcrumb__inner{
            color:#999999;
            font-size:18px;
        }
        color:#999999;
        font-size:18px;
        // margin-bottom:20px
    }
 
}

</style>






