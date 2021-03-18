
<template>
    <div class="right-content">
        <div class="right-box-title" style="font-size:24px;margin-bottom:5px;">我的课程</div>
        <div class="el-tabs" >
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="全部" name="first"></el-tab-pane>
                <el-tab-pane label="录播" name="second"></el-tab-pane>
                <el-tab-pane label="直播" name="third"> </el-tab-pane>
            </el-tabs>
        </div>
        <div style="position:relative;width:100%;min-height:500px;">
            <div>
                <ul>
                    <li v-for="(item,index) in dataList" :key="index">
                        <div class="img-box">
                            <img :src="Global.img_BASE_URL+item.sCourseImg"  :onerror="Global.defalutLogoUrl"> 
                        </div>
                        <div style="width:380px;">
                            <div class="p-name">{{item.sCourseName}}</div>
                            <div >  
                                <div style="display:flex;margin-bottom:5px;">
                                    <div style="margin-right:50px;"><span>讲师：</span><span>{{item.author}}</span></div>
                                    <div style="color:#999;"><span>标签：</span><span>心理</span></div>
                                </div>
                                <div class="p-time"><span>课程时间：</span><span>{{item.dCreatTime}}</span></div>
                                <div class="p-progress"><span>学习进度：</span><span>80%</span></div>
                            </div>
                        </div>
                        <div class="right-btns">
                            <el-button type="primary" size="mini">继续学习</el-button>
                        </div>
                    </li>
                </ul>
            </div>
            <NoData v-if="dataList.length==0"></NoData>
        </div>
    </div>
</template>
<script>
  import NoData from "@/components/NoData";

  export default {
  components: {
    NoData
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
    this.getList()
    
  },
  
  methods: {
      handleClick(tab, event) {
        if(tab.name=="first"){
            let params={type:null}
            this.getList(params)
        }
        if(tab.name=="second"){
            let params={type:'1'}
            this.getList(params)
        }
        if(tab.name=="third"){
            let params={type:'5'}
            this.getList(params)
        }
    },
    getList(params) {
        this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/mylesson`,{ params: params }).then(response => {
            this.dataList=response.data
        })
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
    display: flex;
    border-bottom: 1px solid #E4E4E4;
    padding: 20px 0;
    .img-box{
        width:213px;height:136px;background:#999;margin-right:30px;border-radius: 10px;
        img{
            width:100%;
            height:100%;
        }
    }
    .p-name{
        font-size:20px;margin-bottom:5px;
    }
    .p-time{
        display:flex;font-size:16px;color:#999;margin-bottom:5px;
    }
    .p-progress{
        display:flex;font-size:16px;color:#999;
    }
    .right-btns{
        margin-left: auto;
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





