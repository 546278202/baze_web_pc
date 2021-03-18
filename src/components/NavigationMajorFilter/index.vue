

<template>
    <div class="classified-selection">
        <div style="margin-bottom:50px;  font-size: 18px; font-family: Source Han Sans CN; font-weight: 400;color: #999999;">当前位置 ：首页 &nbsp > &nbsp 专业分类</div>
       
        <div class="itemDataDomeFirst" ref="itemDataDomeFirst">
            <div style="float: left;margin-right:30px;">
                <span class="left-title">选择方向</span>
                <span  style="cursor: pointer;font-size:20px;" @click="handleResetSearch(1)" :class="IndexParent==null ? 'menu-click-active':''" >全部</span> 
            </div>
            <ul style="float: left;">
                <li v-for="(item,index) in menuDataList" :key="item.id" @click="tabMenuClick(item,index,1)" :class="IndexParent==index ? 'menu-click-active':''">{{item.sMajorName}}</li>
            </ul>

            <div class="more-handle"  @click="moreHandle('1')">更多
                <span :class="Firstflag==true? 'arrowTransform':'arrowTransformReturn'">
                    <i class="iconfont icon-xiangshang2"></i>
                </span>
            </div>
        </div>

       <div class="itemDataDomeFirst" ref="itemDataDomeSecond">
            <div style="float: left;margin-right:30px;">
                <span class="left-title">选择专业</span>
                <span style="cursor: pointer;font-size:20px;" @click="handleResetSearch(2)" :class="IndexChild==null ? 'menu-click-active':''" >全部</span> 
            </div>
            <ul style="float: left;">
               <li v-for="(item,index) in menuChildList" :key="item.id" @click="tabMenuClick(item,index,2)" :class="IndexChild==index ? 'menu-click-active':''">{{item.sMajorName}}</li>
            </ul>
            <div class="more-handle"  @click="moreHandle('2')">更多
                <span :class="flag==true? 'arrowTransform':'arrowTransformReturn'">
                    <i class="iconfont icon-xiangshang2"></i>
                </span>
            </div>
        </div>   
        <div class="itemDataDomeFirst" ref="itemDataDomeThird">
            <div style="float: left;margin-right:30px;">
                <span class="left-title">选择层次</span>
                <span style="cursor: pointer;font-size:20px;" @click="handleResetSearch(3)" :class="IndexArrangement==null ? 'menu-click-active':''" >全部</span> 
            </div>
            <ul style="float: left;">
               <li v-for="(item,index) in arrangementList" :key="item.value" @click="tabMenuClick(item,index,3)" :class="IndexArrangement==index ? 'menu-click-active':''">{{item.name}}</li>
            </ul>
            <!-- <div class="more-handle"  @click="moreHandle('3')">更多
                <span :class="thirdFlag==true? 'arrowTransform':'arrowTransformReturn'">
                    <i class="iconfont icon-xiangshang2"></i>
                </span>
            </div> -->
        </div>   
    </div>
</template>
<script>
export default {
  components: {
   
  },
  data() {
    return {
        menuDataList:[],
        menuChildList:[],
        arrangementList:[
            { value:1,name:'高起专' },
            { value:2,name:'高起本' },
            { value:3,name:'专升本' } 
        ],
        IndexParent:null,
        IndexChild:null,
        IndexArrangement:null,
        sMajorId:null,
        sMajorTowId:null,
        sArrangement:[],
        Firstflag : false,
        flag : false,
        thirdFlag:false
    };
  },

  beforeMount() {},
  mounted() {
    this.getList()

  },
  methods: {
    getList() {
        this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/major`).then(response => {
            console.log(response)
            this.menuDataList=response.data.majo
            let arr=[]
            response.data.majo.forEach(element => {
                if(element.child){
                    element.child.forEach(item=>{
                        arr.push(item)
                    })
                }
              
            });
            this.menuChildList=arr
        })
    },
    tabMenuClick(item,index,type){
        if(type=="1"){
            this.IndexParent=index
            this.sMajorId=item.sMajorId

        }
        if(type=="2"){
            this.IndexChild=index
            this.sMajorTowId=item.sMajorTowId
           let pid=item.pid
            let _data=this.menuDataList
            for(var i=0;i<_data.length;i++){
                if(_data[i].sMajorId==pid){
                    this.IndexParent=i
                }
            }
        }
        if(type=="3"){
            this.IndexArrangement=index
            this.sArrangement=item.value
        }
        this.$emit('fatherMethod',{sMajorId:this.sMajorId, sMajorTowId:this.sMajorTowId,sArrangement:this.sArrangement});
    },
    handleResetSearch(val){
        if(val=='1'){
            this.IndexParent=null
            this.IndexChild=null
            this.sMajorId=null
            this.sMajorTowId=null

        }
        if(val=='2'){
            this.IndexChild=null
            this.sMajorTowId=null
        }
        this.$emit('fatherMethod',{sMajorId:this.sMajorId, sMajorTowId:this.sMajorTowId});
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
                    this.$refs.itemDataDomeSecond.style.height='48px'
                }else{
                    this.flag=true
                    this.$refs.itemDataDomeSecond.style.height='auto'
                }
            }
            if(val=='3'){
                if(this.thirdFlag){
                    this.thirdFlag=false
                    this.$refs.itemDataDomeThird.style.height='48px'
                }else{
                    this.thirdFlag=true
                    this.$refs.itemDataDomeThird.style.height='auto'
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






