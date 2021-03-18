

<template>
    <div class="classified-selection">
           <div style="margin-bottom:50px;  font-size: 18px; font-family: Source Han Sans CN; font-weight: 400;color: #999999;">
                <BreadNavigation :BreadList="BreadList"></BreadNavigation>
            </div>

            <div class="itemDataDomeFirst" ref="itemDataDomeFirst">
                <!-- <div class="left-title">学习方向：</div> -->
                <div style="float: left;margin-right:30px;">
                    <span class="left-title">方向</span>
                    <span  style="cursor: pointer;font-size:20px;" @click="handleResetSearch('1')" :class="IndexMenuParent==null? 'menu-click-active':''">全部</span> 
                </div>
                <ul style="float: left;">
                   <li v-for="(item,index) in menuDataList" :key="index" @click="tabMenuChild(item,index,'1')" :class="IndexMenuParent==index ? 'menu-click-active':''">{{item.sIndustryName}}</li>
                </ul>
                <div class="more-handle"  @click="moreHandle('1')">更多
                    <span :class="Firstflag==true? 'arrowTransform':'arrowTransformReturn'">
                        <i class="iconfont icon-xiangshang2"></i>
                    </span>
                </div>
            </div>
            
            <div class="itemDataDomeFirst" ref="itemDataDome">
                <div style="float: left;margin-right:30px;">
                    <span class="left-title">分类</span>
                    <span  style="cursor: pointer;font-size:20px;"  @click="handleResetSearch('2')" :class="IndexMenuChild==null? 'menu-click-active':''">全部</span> 
                </div>
                <ul style="float: left;">
                  <li v-for="(item,index) in childDataList" :key="index" @click="tabMenuChild(item,index,'2')" :class="IndexMenuChild==index ? 'menu-click-active':''">{{item.sIndustryName}}</li>
                </ul>
                <div class="more-handle"  @click="moreHandle('2')">更多
                    <span :class="flag==true? 'arrowTransform':'arrowTransformReturn'"><i class="iconfont icon-xiangshang2"></i></span></div>
            </div>
        </div>
</template>
<script>
import BreadNavigation from "@/components/BreadNavigation";

export default {
    components: {
        BreadNavigation
    },
    props:{
            BreadList:{type:Array},
    },     
    data() {
        return {
            flag : false,
            IndexMenuChild:null,
            IndexMenuParent:null,
            menuDataList:[],
            childDataList:[],
            Firstflag : false
        }
    },

  mounted() {
    this.getMenuDataList()
  },
  methods: {
    getMenuDataList() {
        this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/lemu`).then(response => {
            console.log(response)
            this.menuDataList=response.data.lemu
            let arr=[]
            response.data.lemu.forEach(element => {
                element.child.forEach(item=>{
                    arr.push(item)
                })
            });
            this.childDataList=arr
        })
    },
    tabMenuChild(item,index,type){
        if(type=='1'){
            this.childDataList=item.child
            this.IndexMenuParent=index
            this.IndexMenuChild=null
            this.$emit('fatherMethod',{ tid:null,pid:item.pid});
        }
        if(type=='2'){
            this.IndexMenuChild=index
            this.$emit('fatherMethod',{ tid:item.tid,pid:item.pid});
        }
        
    },

    handleResetSearch(type) {
        if(type=='1'){
            this.IndexMenuChild=null,
            this.IndexMenuParent=null
            this.$emit('fatherMethod',{ tid:null,pid:null});
            this.getMenuDataList()
        }
        if(type=='2'){
            this.$emit('fatherMethod',{ tid:null,pid:null});
        }
        
    },
    moreHandle(val){
        this.$nextTick(() => {
            if(val=='1'){
                if(this.Firstflag){
                    this.Firstflag=false
                    this.$refs.itemDataDomeFirst.style.height='48px'
                }else{
                    this.Firstflag=true
                    this.$refs.itemDataDomeFirst.style.height='auto'
                }
            }
            if(val=='2'){
                if(this.flag){
                    this.flag=false
                    this.$refs.itemDataDome.style.height='48px'
                }else{
                    this.flag=true
                    this.$refs.itemDataDome.style.height='auto'
                }
            }
        });
    }
  }
};
</script>
<style lang="less" scoped>



      
.classified-selection{
    width:1200px;
    background: #fff;
    border-radius: 10px;
    margin:0 auto;
    padding:30px 0 20px 40px;
    box-shadow: 0 4px 10px rgba(0,0,0,.05);
   
  }
  .classified-selection ul{
      padding-top: 5px;
      overflow: hidden;
      margin-bottom:30px;
      font-size: 20px;
      font-family: Source Han Sans CN;
      font-weight: 300;
      color: #000000;
        width:860px;
  }
  .classified-selection ul li{
      float:left;
      margin-right:30px;
      cursor: pointer;
      margin-bottom:20px;
  }
  .classified-selection .left-title{
      font-size: 24px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #000000;
      margin-right:50px;
  }
    .menu-click-active{
    //   color: #23D3B5 !important;
       color: #23D3B5;
  }

.itemDataDomeFirst{
    overflow: hidden;
    margin-bottom:15px;
    height:48px;
}
// 更多按钮
.itemDataDomeFirst .more-handle{
    padding-top:5px;
    width: 80px;
    float: left;
    text-align: right;
    cursor: pointer;
}
.itemDataDomeFirst .more-handle span{
    display:inline-block;
}

.arrowTransform{
    transition: 0.2s;
    transform-origin: center;
    transform: rotate(180deg);
    
    // transform-origin:3px 5px;//设置的是x轴上为0，y轴上为0，也就相当于是元素左顶点
    // transform-origin:0 0;//设置的是x轴上为0，y轴上为0，也就相当于是元素左顶点

  }
  .arrowTransformReturn{
    transition: 0.2s;
    transform-origin: center;
    transform: rotate(0deg);
    // transform-origin:0 0;//设置的是x轴上为0，y轴上为0，也就相当于是元素左顶点
    
  }

</style>






