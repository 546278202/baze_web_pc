<template>
    <!-- 课程分类 -->
    <div class="class-list" id="class-list" :style="currentStyle" :productType="productType">
        <div class="item">
            <div class="top">
                <div class="title" style="font-size:30px; color:#000;">{{title}}</div>
                <ul>
                    <li  v-for="(item,index) in navList" :key="index" @click="moreHandle(item)">{{item.sIndustryName}}</li>
                    <li style="color:#999999;" @click="moreHandle">更多 >></li>                
                </ul>
            </div>
            <ol style="float:left;overflow:hidden;" id="PersonalShowVideoList">
                <li v-for="(item,index) in dataList" :key="index"   @mouseenter="videoEnter(item.id)" @mouseleave="videoLeave(item.id)" >
                    <div class="video-top" >
                        <video :ref="item.id"  :src="item.sVideoUrl" width="100%" height="100%" v-if="item.sVideoUrl"  controlsList="nodownload"  >  您的浏览器不支持 video 标签。 </video>
                        <!-- <video id="videoPlay" width="100%" height="" :poster="Global.img_BASE_URL+item.sVideoImg" style="object-fit: cover;display: block;">
                            <source :src="item.sVideoUrl" type="video/mp4">您的浏览器不支持 HTML5 video 标签。
                        </video> -->
                        <!-- <el-image v-if="item.sCourseImg" :src="Global.img_BASE_URL+item.sCourseImg" fit="cover"  @mouseover="enter($event)" @mouseleave="leave($event)" ></el-image> -->
                        <!-- <img :src="Global.img_BASE_URL+item.sVideoImg" :class="productType=='3'? 'img-school':'img-default'" @mouseover="enter($event)" @mouseleave="leave($event)">      
                        <div class="video-num"> <i class="iconfont icon-bofang"></i>101.1万</div>  -->
                    </div>
                    <div class="video-bottom">
                        <div class="describe">  </div>
                        <div class="describe-data">
                            <div class="left" ><span >{{item.sProblemName}}</span></div>
                            <div class="right" style="float:right;"> <span >{{item.dCreatTime.split(' ')[0]}}</span></div>
                        </div>
                    </div>
                </li>
                <div class="no-data" v-if="dataList.length==0" style="width:400px;height:340px; position: absolute;transform: translate(-50%,-50%);top: 50%; left: 50%;">
                    <div style="position: absolute;width: 100%; bottom: 50px;left: 50%;transform: translateX(-50%);text-align: center;">
                        <p style="font-size: 14px;color: #999;">抱歉，没有找到你要的内容</p>
                        <p style="font-size: 14px;color: #999;margin-top:10px;">请换个方式查询</p>
                    </div>
                    <img src="@/assets/nodata.png" >
                </div>
            </ol> 
            
        </div>
    </div>   
</template>
<script>
export default {
    props:{

        productType:{
            type:String
        },
        currentStyle:{
            type:Object
        },
        title:{
            type: String
        },
        navList:{
            type: Array
        },
        dataList:{
            type: Array
        } 
    },
    components: {
    
    },
    data() {
        return {
            VideoID:'',
            //    dataList:[]
            videoElement: [] // 创建一个数组
        };
    },
    filters: {
        sellsFilter(value) {
            if(!value) {
                return '0';
            } else {
                return value
            }
        },
        schoolFilter(list){
            let arr=[]
            let str
            list.forEach(element => {
                if(element=='1') {
                    str= '高起专'
                }else if(element=='2'){
                    str="高起本"
                }else if(element=='3'){
                    str="专升本"
                }
                arr.push(str)
            });
            return arr.toString()
        }
    },
    beforeMount() {
        
    },
    mounted() {

        
       
        this.videoElement = document.querySelectorAll("#PersonalShowVideoList video") // 获取页面上所有的video对象

            
    },
  methods: {
    // handlePlay(index) {
    //     console.log(index)
    //     this.$nextTick(() => {
    //         const videoElement = this.videoElement
    //         if (videoElement && videoElement.length > 0) {
    //             for (let i = 0; i < videoElement.length; i++) {
    //                 if (i === index) {
    //                     this.videoElement[i].play()
    //                 } else {
    //                     this.videoElement[i].pause()
    //                 }
    //             }
    //         }
    //     })
    // },
   
    tabClick(id) {
        // this.VideoID.pause();
        
        // if (e.className == "video_btn") {
        //     console.log(e)
        //     VideoID = $(e).parent().find("video").attr("id")
        // }
        // var myVideo = document.getElementById(VideoID);
        // if (myVideo.paused) {
        //     $(e).fadeOut()
        //     myVideo.play();
        //     myVideo.controls = "controls"
        // } else {
        //     myVideo.pause();
        // }

        // playVideo(){

        // this.$nextTick(() => {
           
        //     this.VideoID=this.$refs[id][0];
        //     if (this.VideoID.paused) {
        //         this.VideoID.play();
        //     }

        // })
    },
    moreHandle() {
        // console.log(item);
        // 录播
        if(this.productType=='1'){
            this.$router.push({ path: `/productList`});
        }
        // 技能课
        if(this.productType=='2'){
            this.$router.push({ path: `/productList`});
        }
        //合作院校
        if(this.productType=='3'){
            this.$router.push({ path: `/EducationPromotion`});
        }
        if(this.productType=='4'){
            this.$router.push({ path: `/EducationPromotion`});
        }

    },

    videoEnter(id) {
        this.$refs[id][0].controls = "controls"
         // this.$refs[id][0].controls = "controls"
        // $event.currentTarget.classList.remove("imghoverout")
        // $event.currentTarget.classList.add("controls")
    },
    videoLeave(id) {
        this.$nextTick(() => {
            this.$refs[id][0].controls = false
        })
        
        // $event.currentTarget.classList.remove("controls")
        // $event.currentTarget.classList.add("imghoverout")
    },
    enter($event) {
        $event.currentTarget.classList.remove("imghoverout")
        $event.currentTarget.classList.add("imghover")
    },
    leave($event) {
        $event.currentTarget.classList.remove("imghover")
        $event.currentTarget.classList.add("imghoverout")
    }

  }
};
</script>
<style lang="less" scoped>
.router-link-active {
    text-decoration: none;
}
   /* 课程分类 */
.class-list{
    background:#fff;
    height:940px;
    max-width:1920px;
    color:#fff;
    font-size:14px;
    box-sizing: border-box;
    padding:85px 0;
}
.class-list .item{
    width: 1200px;
    min-height: 770px;
    color: #000;
    margin: 0 auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    background: #fff;
    padding:40px 15px;
    border-radius: 10px;
    border:1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    overflow: hidden;

}

.class-list .item .top {
    overflow: hidden;
}
.class-list .item .top .title{
    float:left;
    // width:200px;
}
.class-list .item ul{
    float:right;
    overflow: hidden;
    margin-top:15px;
    position: relative;
}
.class-list .item ul li{
    float:left;
    padding-left:38px;
    font-size: 18px;
}
.class-list .item ul li:hover{
   color: #22D3B6;
   cursor: pointer;
}
.class-list ol{
    list-style: none;
    overflow: hidden;
    margin-top: 50px;
}
.class-list ol::after{
    width: 40px;
    background: orangered;
    
}
.class-list ol li{
    font-size: 14px;
    width: 277px;
    border: 1px solid #f1f1f1;
    float: left;
    border-radius: 10px;
    overflow: hidden;
    margin-right: 20px;
    margin-bottom: 40px;
    box-sizing: border-box;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0,0,0,.05);
}
.class-list ol li img{
    cursor: pointer;
}
.img-default{
    width:275px;
    height:175px;
}
.img-school{
    width:150px;
    height:150px;
}
.class-list ol li .video-top{
    height:175px;
    background:#e6e6e6;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}
.class-list ol li .video-top .video-num {
    position: absolute;
    right: 8px;
    bottom: 8px;
    font-size: 16px;
    color:#fff;
}
.class-list ol li .video-top .iconfont {
    font-size: 18px !important;
    margin-right:8px;
}
.class-list ol li .video-bottom{
    padding:10px;
    overflow:hidden;
}
.class-list ol li .video-bottom .describe{
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #000000;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.class-list ol li .video-bottom .describe:hover{
   color:#22D3B5;
}
.class-list ol li .video-bottom .describe-data{
    margin-top:16px;overflow:hidden;  
}
.class-list ol li .video-bottom .describe-data .left{
    float:left;
    // color:#22D3B5;
}
// .class-list ol li .video-bottom .describe-data .right span:first-child{
//     color: #22D3B5;
//     font-size: 16px;
// }

.class-list ol li:nth-child(4n+4){
    font-size: 14px;
    width:277px;
    border:1px solid #f1f1f1;
    float:left;
    border-radius: 10px;
    overflow: hidden;
    margin-right:0;
    margin-bottom:40px;
}  


.class-list ol .no-data img{
    display: block;
    width: 100%;
    opacity: .8;
}

.video-top {
    .el-image{
        overflow: visible;
    }
}

video{
    outline:none;
    display: block;
}
</style>






