<template>
    <div class="content">
        <ul v-if="dataList.cert">
            <li>
                <h3>我的证书</h3>
                <div class="item">
                    <div style="width:485px;margin-right: 30px;"><img :src="Global.img_BASE_URL+dataList.cert.sCertificateImg" /></div>
                    <div style="flex:1;">
                        <h4 style="margin-bottom:30px;">{{dataList.cert.sName}}</h4>
                        <div>{{dataList.cert.sContent}}</div>
                    </div>
                </div>
            </li>
            <li>
                <h3>学员之声</h3>
                <div class="item">
                    <div style="width:485px;margin-right: 30px;"><img :src="Global.img_BASE_URL+dataList.studentprofile.studentopus[0].sOpusvideoImg" /></div>
                    <div style="flex:1;">
                        <h4 style="margin-bottom:30px;"></h4>
                        <div></div>
                    </div>
                </div>
            </li>
            <li>
                <h3>培训视频</h3>
                <div class="item">
                    <!-- <div style="width:485px;margin-right: 30px;">{{dataList.studentprofile.studentopus[0].sOpusvideoImg}}</div> -->
                    <div >
                        <!-- <h4 style="margin-bottom:30px;"></h4> -->
                        <div>1,{{dataList.studentprofile.trainingvideo[0].sChapterName}}</div>
                    </div>
                </div>
            </li>
            <li>
                <h3>实操视频</h3>
                <div class="item">
                    <!-- <div style="width:485px;margin-right: 30px;"><img :src="Global.img_BASE_URL+dataList.studentprofile.studentopus[0].sOpusvideoImg" /></div> -->
                    <div >
                        <!-- <h4 style="margin-bottom:30px;"></h4> -->
                        <div>1,{{dataList.studentprofile.practicevideo[0].sProblemName}}</div>
                    </div>
                </div>
            </li>
            <li>
                <h3>视频答辩</h3>
                <div class="item">
                    <!-- <div style="width:485px;margin-right: 30px;"><img :src="Global.img_BASE_URL+dataList.studentprofile.studentopus[0].sOpusvideoImg" /></div> -->
                    <div >
                        <!-- <h4 style="margin-bottom:30px;"></h4> -->
                        <div style="margin-bottom:20px;">1,{{dataList.studentprofile.defensevideo[0].sProblemName}}</div>
                        <div>2,{{dataList.studentprofile.defensevideo[1].sProblemName}}</div>
                    </div>
                </div>
            </li>
            <li>
                <h3>辅导员背书</h3>
                <div class="item">
                    <div style="width:485px;margin-right: 30px;"><img :src="Global.img_BASE_URL+dataList.studentprofile.sInstructorEndorsementImg" /></div>
                    <div >
                        <!-- <h4 style="margin-bottom:30px;"></h4> -->
                        <!-- <div>1,{{dataList.studentprofile.defensevideo[0].sInstructorEndorsementImg}}</div>
                        <div>2,{{dataList.studentprofile.defensevideo[1].sProblemName}}</div> -->
                    </div>
                </div>
            </li>
            <li>
                <h3>同学背书</h3>
                <div class="item">
                    <div style="width:485px;margin-right: 30px;"><img :src="Global.img_BASE_URL+dataList.studentprofile.sStudentEndorsementImg" /></div>
                    <div >
                        <!-- <h4 style="margin-bottom:30px;"></h4> -->
                        <!-- <div>1,{{dataList.studentprofile.defensevideo[0].sInstructorEndorsementImg}}</div>
                        <div>2,{{dataList.studentprofile.defensevideo[1].sProblemName}}</div> -->
                    </div>
                </div>
            </li>
            <li>
                <h3>课堂笔记</h3>
                <div class="item">
                    <div style="width:485px;margin-right: 30px;"><img :src="Global.img_BASE_URL+dataList.studentprofile.sClassNotesImg" /></div>
                    <div >
                        <!-- <h4 style="margin-bottom:30px;"></h4> -->
                        <!-- <div>1,{{dataList.studentprofile.defensevideo[0].sInstructorEndorsementImg}}</div>
                        <div>2,{{dataList.studentprofile.defensevideo[1].sProblemName}}</div> -->
                    </div>
                </div>
            </li>
            
        </ul>
        <ol v-if="dataList.cert">
            <li>
                <h3>就业推荐</h3>
                <div class="item">
                    <div class="title">视频剪辑师</div>
                    <div class="data-info"><span>工作经验：3-5年</span><span>学历要求：大专</span><span>月薪：6-10K</span></div>
                </div>
                <div class="item">
                    <div class="title">教务</div>
                    <div class="data-info"><span>工作经验：3-5年</span><span>学历要求：本科</span><span>月薪：6-10K</span></div>
                </div>
                <div class="item">
                    <div class="title">MBA课程顾问</div>
                    <div class="data-info"><span>工作经验：3-5年</span><span>学历要求：大专</span><span>月薪：6-10K</span></div>
                </div>
                <div class="item">
                    <div class="title">售后客服</div>
                    <div class="data-info"><span>工作经验：3-5年</span><span>学历要求：大专</span><span>月薪：6-10K</span></div>
                </div>
                <div class="item">
                    <div class="title">学历提升顾问</div>
                    <div class="data-info"><span>工作经验：3-5年</span><span>学历要求：大专</span><span>月薪：6-10K</span></div>
                </div>
            </li>
        </ol>
        <NoData v-if="Object.keys(dataList).length==0"></NoData>
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
            dataList:{}
        };
    },

    beforeMount() {},
    mounted() {
        if(this.$route.query.params){
            this.dataList=JSON.parse(decodeURIComponent(this.$route.query.params))
        }else{
            this.getDataList()
        }
    },
    methods: {
        handleClick(tab, event) {
        },
        getDataList() {
            this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/mycertificate`).then(response => {
                if(response.code=='0'){
                    this.dataList=response.data
                }
                
            })
        }
    }
};
</script>
<style lang="less" scoped>
.content{
    // min-height: 600px;
    // max-width:1200px;
    // margin:0 auto;
    // margin-top: 70px;
    font-size: 16px;
    // padding-top: 30px;
}
img{
    width:100%;
    height:100%;
}

ul li h3{
    margin-bottom: 20px;
    height: 45px;
    border-bottom: 1px solid rgb(231, 237, 241);
}
ul li {
    margin-bottom: 50px;
    font-size:14px;
}
ul li .item{
    display: flex;
   
}


ol li h3{
    margin-bottom: 20px;
    height: 45px;
    border-bottom: 1px solid rgb(231, 237, 241);
}
ol li {
    margin-bottom: 50px;
    font-size:14px;
}
ol li .item{
    color:rgba(150,145,139,1);
    margin-bottom: 20px;
    border-bottom: 1px solid #e7edf1;
   
}
ol li .item span{
    margin-right:30px;
   
}
ol li .item .title{
   color:#666;
   font-size:16px;
   margin-bottom:10px;
}
ol li .item .data-info{
   margin-bottom:15px;
}

</style>






