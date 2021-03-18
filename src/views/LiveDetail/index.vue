<template>
    <div style="background:#f4f4f4;">
        <HeadNavigation></HeadNavigation>
        <!-- 直播回看 -->
        <div class="bg-video-play">
            <div class="video-play">
                <div class="left-box" id="left-box">
                    <div class="header-title-bar">

                        <div class="left-menu">
                            <a @click="$router.go(-1)"><i class="iconfont icon-fanhui1"></i></a>
                            <a>{{item.title || data.sLiveName }}</a>
                        </div>

                        <div class="right-menu">
                            <a v-if="data.fabulous=='1'" @click="fabulousHandle('5')" class="default-clor"><span> 已点赞</span><i class="iconfont icon-dianzan"></i></a>
                            <a v-else @click="fabulousHandle('5')" ><span>点赞</span><i class="iconfont icon-dianzan"></i></a>
                            
                            <a v-if="data.collection=='1'" @click="collectionHandle('5')" class="default-clor"><span> 已收藏</span><i class="iconfont icon-shoucang"></i></a>
                            <a @click="collectionHandle('5')" v-else  ><span> 收藏</span><i class="iconfont icon-shoucang"></i></a>
                            <a><span> 分享</span><i class="iconfont icon-arrow-"></i></a>
                        </div>
                    </div>

                    <div id="video-box" style="height:480px;">
                        <video src="https://image.bazeskill.com/common/video/20210116/20210116132d8f3a88f3b34bd33d9aa2.mp4" v-if="isShoeVideo" controlsList="nodownload" autoplay="autoplay" loop="loop" muted="muted" controls="controls">
                            您的浏览器不支持 video 标签。
                        </video>
                        <div class="background-data" ref="backgroundData" v-else>
                            <div class="detail-btn" @click="detailHandleClick(item)">进入课堂</div>
                        </div> 
                    </div>
                </div>
                <div class="right-box">
                <div  class="date-title" ><div class="product-title-btn">直播课</div></div>
                <div  class="data-teacher" >
                    <div class="head-portrait">
                        <!-- <img v-if="data.headportrait" :src="Global.img_BASE_URL+data.headportrait" > -->
                        <el-image style=" width: 62px; height: 62px;" v-if="data.headportrait" :src="Global.img_BASE_URL+data.headportrait" fit="cover"></el-image>
                    </div>
                    <div style="height: 62px;float:left;">
                        <div style="font-size:20px;#fff;margin-bottom: 5px;">{{data.author}}</div>
                        <div style="font-size:14px;color:#999;">关注人数：19420</div>
                    </div>
                    <div class="product-title-btn" style="float:right;color:#fff;background: #23D3B5;cursor: pointer;" v-if="data.instructor=='1'" @click="collectionHandle('2')">+已关注</div>
                    <div class="product-title-btn" style="float:right;color:#fff;background: #23D3B5;cursor: pointer;" v-else @click="collectionHandle('2')">+关注</div>
                </div>
                <div class="p-introduction">
                    <div> {{data.sLiveInfo}}</div>
                </div>
                <div style="height:100px;">
                    <p v-if="data.price>0" class="price">价格：￥{{data.price}}</p>
                    <p v-else class="price-data">免费</p>
                </div>
                <div class="buttom-btn-group">
                    
                    <a class="sign-up-btn" @click="SignUpHandle(item)"  v-if="data.class=='0'">立即报名</a>
                    <a class="no-high-light"  v-else >已报名</a>

                    <a class="consult-btn" href="javascript:void(0);" onclick="mantis.requestChat()">立即咨询</a>
                </div>
            </div>
            </div>
        </div>

        <div class="ProductAttribute" style="width:1200px;margin:0 auto;margin-bottom: 150px;background:#fff;padding-bottom:100px;">
            <!-- <div style="height: 3px;background: #147A69;margin-top:5px;"></div>             -->
            <div class="el-tabs" >
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="讲师介绍" name="first">
                        <div>{{data.author}}</div>
                        <div>{{data.info}}</div>
                        <!-- <div>
                            <img v-if="data.sLiveImg" :src="Global.img_BASE_URL+data.sLiveImg">
                        </div> -->
                    </el-tab-pane>
                    <el-tab-pane label="课程介绍" name="second">
                        <div class="html-introduce" v-html="data.introduce"></div>
                    </el-tab-pane>
                    <el-tab-pane label="课程目录" name="third">
                        <ol>
                            <li v-for="(item,index) in data.playbace" :key="index" @click="videoDetailClick(item,index)" >
                                <span>{{1+index}} 课时</span><span>{{item.title}}</span><span>{{item.dCreatTime}}</span>
                            </li>
                        </ol>
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
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <Footer></Footer> 
        <RightMessageBar></RightMessageBar> 
    </div>
</template>
<script>
import HeadNavigation from "@/components/HeadNavigation";
import Footer from "@/components/Footer";
import RightMessageBar from "@/components/RightMessageBar";
const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
};
export default {
  components: {
    HeadNavigation,
    Footer,
    RightMessageBar
  },
    data() {
        return {
            item:{},
            data: {},
            webUrl:null,
            listQuery: Object.assign({}, defaultListQuery),
            listLoading: true,
            total: 5,
            activeName: 'third',

            tabIndex:null,
            isShoeVideo:true
        };
    },

    beforeMount() {},
    mounted() {
        console.log(this.Global)
        this.getList()

    },
    methods: {
        //1点赞课程 ，2点赞讲师，3点赞院校 4，点赞专业 ,5直播回放
        fabulousHandle(type){
            let params
            console.log(this.data)
           
            if(type=='5'){
                params={
                    sType:type,
                    fabuId:this.data.id,
                    fabulous: this.data.fabulous
                    
                }   
            }
            console.log(params)
            this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/fabulous`,{ params: params }).then(response => {
                if(response.code=='0'){
                    this.$message({ message: "操作成功", type: "success" });
                    this.getList()
                }else{
                    this.$message({ message: response.msg, type: 'warning'});
                }
            })
        },
        //1收藏课程 ，2收藏讲师，3收藏院校 4，收藏专业 5直播
        collectionHandle(type){
            let params
            if(type=='2'){
                params={
                    sType:type,
                    colleId:this.data.author,
                    collection:this.data.instructor
                }   
            }
            if(type=='5'){
                params={
                    sType:type,
                    colleId:this.data.id,
                    collection:this.data.collection
                }   
            }

            this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/collection`,{ params: params }).then(response => {
                if(response.code=='0'){
                    this.$message({ message: "操作成功", type: "success" });
                    this.getList()
                }else{
                    this.$message({ message: response.msg, type: 'warning'});
                }
            })
        },
     
        SignUpHandle(){
            // 未登陆 && 要花钱
            if(this.$store.state.baseUser==null && this.data.isAudition=='1'){
                this.$store.commit('changeShowLoginBox', true);
            }else{
                let params= {type: 'createOrder',id:this.data.id,resource_type:'1'}
                this.$router.push({ path: `/paymentPage`,query:params});
            }    
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        detailHandleClick(item) {
            console.log(item)
            // 回放
            this.$nextTick(() => {
                // let webUrl=item.replayUrl
                let webUrl=this.Global.BASE_URL+`/live/playback.html#index?roomid=${this.item.id}=${this.item.recordid}`
                window.open(webUrl);   
            })
        },
       
        videoDetailClick(item,index){
            this.tabIndex=index
            this.isShoeVideo=false
            this.item=item
            console.log(item)
            debugger
            // 回放
            this.$nextTick(() => {
                // let ccMobplaybackUrl=item.replayUrl
                // let ccMobplaybackUrl=`http://wap.kuaixueli.com/live/pado.html#index?roomid=${item.id}&recordid=${item.recordid}`
                let ccMobplaybackUrl=this.Global.BASE_URL+`/live/pado.html#index?roomid=${item.id}&recordid=${item.recordid}`
                var iframe = document.createElement("iframe");
                    iframe.src=ccMobplaybackUrl;
                    iframe.className="frame";
                    iframe.id="iframe";
                    //设置iframe的样式 
                    iframe.style.width = '100%'; 
                    iframe.style.height = '100%'; 
                    iframe.style.margin = '0'; 
                    iframe.style.padding = '0'; 
                    iframe.style.overflow = 'hidden'; 
                    iframe.style.border = 'none'
                    iframe.scrolling = '0'
                    iframe.frameborder = '0'
                    if(document.getElementById("iframe")){
                        document.getElementById("video-box").removeChild(document.getElementById("iframe"))
                    }
                    document.getElementById("video-box").appendChild(iframe);
            });
    },
    handleSizeChange(val){
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
    },
    handleCurrentChange(val){
        this.listQuery.pageNum = val;
        this.getList();
    },
    getList() {
        this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/livecourseinfo&id=${this.$route.query.id}`).then(response => {
            console.log(response)
            this.data=response.data
            this.item=response.data.playbace[0]
        })
    }
  }
};
</script>
<style lang="less" scoped>
    @import  "./style/index.less";
</style>






