<template>
    <div class="bg-video-play">
        <div class="video-play">
            <div class="left-box" id="left-box" :key="menuKey">
                <video :src='Global.img_BASE_URL+"/common/video/20210317/2021031757540724de94cc8b90721aed.mp4"' v-if="isShoeVideo"  controlsList="nodownload" autoplay="autoplay" loop="loop" muted="muted" controls="controls">
                    您的浏览器不支持 video 标签。
                </video>
                <div v-else id="playbackPlayer"></div>
               
                <div class="background-data" ref="backgroundData" v-if="!isShoeVideo" >
                    <div class="detail-btn" @click="detailHandleClick(item)">进入课堂</div>
                </div> 

                
            </div>

            <div class="right-box">
                <div  class="date-title"><span style="margin-right:20px;">{{yyyyMMdd()}}</span></div>
                <ul>
                    <li v-for="(item,index) in list" :key="index" @click="videoDetailClick(item,index)"  :class="index==tabIndex? 'item-active':''" >
                    <!-- <li v-for="(item,index) in list" :key="index" @click="videoDetailClick(item,index)"  :class="index==tabIndex? 'item-active':''"  :style="item.recordid=='1' ? 'cursor:not-allowed;pointer-events:none;color:#666;' : 'not specified' "> -->
                        <div v-if="index==tabIndex" style="margin-right:20px;"><img  src="@/assets/Living.gif" style="width:16px;height:16px;" /></div>
                        <i v-else class="iconfont icon-zhengzaibofang"></i>
                        <span>{{item.name}}</span>
                        <span v-if="item.liveStatus=='1'" style="color:#22D3B5;">直播中</span>
                        <span v-else> {{item.liveStartTime.split(" ")[1]}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
};
import {yyyyMMdd} from "@/utils/date";
export default {
    props:{
        list:Array
    },  
    components: {
    
    },
    data() {
    return {
        menuKey:1,
        item:{},
        webUrl:null,
        tabIndex:null,
        isShoeVideo:true,
        yyyyMMdd:yyyyMMdd
    };
    },

    beforeMount() {},
    mounted() {
    },
    methods: {
        detailHandleClick(item) {
            this.menuKey++
            this.isShoeVideo=true
            this.tabIndex=null
            //直播
            if(item.liveStatus=="1"){
                this.$nextTick(() => {
                    let webUrl=`https://wap.bazeskill.com/live/live.html#index?roomid=${this.item.id}`  
                    window.open(webUrl);   
                })
            }
            // 回放
            if(item.liveStatus=="0"){
                this.$nextTick(() => {
                    let webUrl= `https://wap.bazeskill.com/live/playback.html#index?roomid=${this.item.id}=${this.item.recordid}`  
                    window.open(webUrl);   
                })
            }   
          
        },
       
        videoDetailClick(item,index){
            // if(item.recordid=='1'){
            //     return false
            // }
            this.tabIndex=index
            this.isShoeVideo=false
            this.item=item
            // 开始直播
            if(item.liveStatus=="1"){
                this.$nextTick(() => {
                    let ccMobplaybackUrl= `https://wap.bazeskill.com/live/video.html#roomid=${item.id}`
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
                            document.getElementById("left-box").removeChild(document.getElementById("iframe"))
                        }
                        document.getElementById("left-box").appendChild(iframe);
                });
            }
            // 回放
            if(item.liveStatus=="0"){
                this.$nextTick(() => {
                  
                     $.DW.config({
                        userId: '943DACA690744F67',
                        roomId: item.id,
                        recordId: item.recordid,
                        groupId : "groupId",    
                        viewername: 'name',
                        viewertoken: 'password',
                        isH5play:true,
                        fastMode:true
                    });
                });
            }
        }
    }
};
</script>
<style lang="less" scoped>

.bg-video-play{
    background-image: url('../../assets/live_banner.jpg');
    background-size:100%;
    margin-top: 70px;
    padding: 70px 0;
}
.video-play{
    width:1200px;
    height:482px;
    color:#fff;
    margin:0 auto;
}

.left-box{
    float: left;
    height:100%;
    overflow:hidden;
    box-sizing: border-box;
    position: relative;
    text-align: center;
    width:850px;
    background: rgba(0, 0, 0, 0.8); 

    video{
        outline:none;
        display: block;
        width:100%;
        height:482px;
    }
    #playbackPlayer{
        width:100%;
        height:482px;
    }
    .background-data{
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 111;
    }
    .video-title{
        font-weight: bold;
        font-size: 30px;
    }
    .detail-btn{
        background: rgba(0, 0, 0, 0.2); 
        color:#f4f4f4;
        width: 140px;
        height: 38px;
        font-size: 18px;
        text-align: center;
        line-height: 38px;
        border-radius: 19px;
        cursor: pointer;
    }
}

.right-box{
    width:350px;
    height:100%;
    background: #333333;
    float:right;
    .item-active{
        color:#22D3B5 !important;
    } 
    .date-title{
        height:64px;
        line-height: 64px;
        text-align: center;
        border-bottom: 1px solid #ccc;
    }
    ul li{
        height:50px;
        line-height: 50px;
        font-size: 18px;
        color:#999999;
        box-sizing: border-box;
        padding:0 10px;
        display: flex;

    }
    ul li:hover{
        height:50px;line-height: 50px;
        font-size: 18px;
        color:#999999;
        box-sizing: border-box;
        cursor: pointer;
    }
    ul li span:nth-child(2){
        display: inline-block;
        overflow: hidden;
        float:left;
        width: 228px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        box-sizing: border-box;
    }
    ul li .iconfont{
        margin-right:20px;
        display: inline-block;
        overflow: hidden;
        float: left
    }
}

</style>






