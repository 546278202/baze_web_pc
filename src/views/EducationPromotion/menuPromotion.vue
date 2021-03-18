<template>
    <div style=" position: absolute;
            left:50%;
            top:50%;
            width:1200px;
            height:650px;
            box-sizing: border-box;
            display: block;
            z-index: 11;
            transform:translate(-50%,-50%);">   
        <div class="parent-menu" @mouseleave="menuMouseleave()">
            <div>
                <ol style="margin-bottom:30px;">
                    <li>
                        <div class="left-icon" style="width:82px;tealign:center;float:left;text-align:center;"><i class="iconfont icon-tubiaozhizuomoban-37"></i></div>
                        <div class="right-text" style="width:100%;flex: 1;">选专业</div>
                    </li>
                    <li > 
                        <div style="display:inline-block;font-size:14px;"><span  v-for="(item,index) in menuDataList" :key="index" @mouseenter="ParentMenuMouseenter(index,item)" >{{item.sMajorName}}</span></div>
                        <!-- <i class="iconfont  icon-xiangyou1"></i> -->
                    </li>
                </ol>

                <ol>
                    <li>
                        <div class="left-icon" style="width:82px;tealign:center;float:left;text-align:center;"><i class="iconfont icon-tubiaozhizuomoban-37"></i></div>
                        <div class="right-text" style="width:100%;flex: 1;">选院校</div>
                    </li>
                    <li > 
                        <div style="display:inline-block;font-size:14px;"><span v-for="(item,index) in sFeaturesList" :key="index">{{item.features}}</span></div>
                        <!-- <i class="iconfont  icon-xiangyou1"></i> -->
                    </li>
                </ol>
            </div>
        

            <!-- 右侧菜单 -->
            <div class="child-menu" ref="childMenu">
                <ul class="child-menu-ul"  @mouseleave="menuMouseleave()">
                    <li style="padding-left: 35px;font-size:20px;">{{menuItemChildList.sMajorName}}</li>
                    <li > 
                        <div class="titles" style="display:inline-block;font-size:14px;">
                            <span @click="tabClickItem" v-for="(item,index) in menuItemChildList.child" :key="index">{{item.sMajorName}}</span>
                        </div>
                        <!-- <i class="iconfont  icon-xiangyou1"></i> -->
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  components: {
  },
  data() {
    return {
        active: this.$store.state.active,
        menuDataIndex:0,
        menuDataList:[1,2,3,4],
        menuItemChildList:[],
        sFeaturesList:[]
    };
  },

  beforeMount() {},
  created(){
        this.getList()
  },
  mounted() {


  
  },
  methods: {
       getList() {
          this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/major`).then(response => {
            console.log(response)
            this.menuDataList=response.data.majo
            this.sFeaturesList=response.data.sFeatures
          })
      },
 
    tabClickItem(){
        this.$nextTick(() => {
            this.$router.push({ path: '/majorList' });
        });
    },

    menuMouseleave($event) {
        this.$nextTick(() => {
            this.$refs.childMenu.style.display="none"
        });       
    },

    ParentMenuMouseenter(index,item){
        this.$nextTick(() => {
            this.menuItemChildList=item
            this.$refs.childMenu.style.display="block"
        });
    }
  },
  watch: {
   
  },
  
};
</script>
<style lang="less" scoped>

    /* 导航菜单浮框 */
    .parent-menu{
        // position: absolute;
        // left:352px;
        // top:80px;
        // margin-top:10px;
        box-shadow: 0 3px 9px rgba(0,0,0,.15);
        box-sizing: border-box;
        width: 356px;
        height: 535px;
        background: #000000;
        opacity: 0.85;
        padding:30px 0;
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #FFFFFF;
        z-index: 111;
        margin-top:10px;
    }   
    .parent-menu ol {
        overflow: hidden;
    }
    .parent-menu ol li {
        height:45px;
        line-height: 45px;
        padding-left:82px;
        cursor: pointer;
        padding-right:34px;
        box-sizing: border-box;
    }
    .parent-menu ol li div{
        width: 200px;
    }

    .parent-menu ol li span{
        font-size:14px;
        margin-right:10px;
        width: 100px;
        white-space: nowrap;
    }
    .parent-menu ol li span:hover{
        color: #23D3B5 !important;
    }
   
    .parent-menu ol li:first-child {
        font-size: 24px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #FFFFFF;
        margin-bottom:10px;
        padding:0;
    }
    .parent-menu  /deep/ ol li:first-child .iconfont{
        font-size:24px;
    }
  
    .child-menu{
        display: none;
        min-height: 288px;
        position: absolute;
        left: 354px;
        top: 10px;
        overflow: hidden;
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #FFFFFF;
        ul{
                width: 300px;
                background: #000000;
                padding:30px 0;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
                margin-left: 10px;
                height: 535px;
            li{
                height:45px;
                line-height: 45px;
                padding-left:65px;
                padding-right: 34px;
                cursor: pointer;
                // box-sizing: border-box;
                    span{
                        margin-right:10px;
                        min-width: 100px;
                        white-space: nowrap;
                    }
                    span:hover{
                        color: #23D3B5 !important;
                    }
           
            }
        } 
    }
 
 
  
    
        

</style>
