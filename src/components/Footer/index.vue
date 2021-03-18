<template>
    <div>
    <div class="Footer">
        <ul>
            <li>
                <div>
                    <p>联系我们</p>
                    <div class="title-line"></div>
                </div>
                <div>工作时间：周一至周六 09:00-18:30</div>
                <div>客服热线：400-156-7867</div>
                <div>公司地址：北京市海淀区 体院西路甲2号14号楼 1层西124室</div>
                <!-- <div>公司电话：13683558901</div> -->
            </li>
            <li style="margin-right:150px;">
                <div> <p>关于我们</p><div class="title-line"></div></div>
                <div> 
                    <router-link  :to="{path:'/AboutUs' , query:{}}"> 公司介绍 </router-link>
                </div>
                 <div> 
                    <router-link  :to="{path:'/AboutUs' , query:{}}"> 合作加盟 </router-link>
                </div>
                 <div> 
                    <router-link  :to="{path:'/userAgreement' , query:{}}"> 服务协议 </router-link>
                </div>
                <div> 
                    <router-link  :to="{path:'/userPrivacy' , query:{}}"> 隐私条款</router-link>
                </div>
              
            </li>
            <li >
                <div><p>售后服务</p> <div class="title-line"></div></div>
                <div> 
                    <router-link  :to="{path:'/userServe' , query:{}}"> 售后服务 </router-link>
                </div>
                   
            </li>
            <li class="online-message">
                <div><p>在线留言</p> <div class="title-line"></div></div>
                <div><span>姓名：</span><input v-model="form.name" style="width:178px;box-sizing: border-box;" placeholder="请输入您的姓名"></div>
                <div><span>电话：</span><input  v-model="form.phone" style="width:178px;box-sizing: border-box;" placeholder="请输入您的电话"></div>
                <div><span>内容：</span><textarea  v-model="form.info" placeholder="请输入您的需求" style="width:178px;height:60px;resize: none;box-sizing: border-box;"> </textarea></div>
                <div><span></span><button class="online-message-btn" @click="open">提交</button></div>
            </li>
        </ul>
    </div>
    <div class="copy-right">
        <div class="copy-item">
            <!-- <span style="margin-bottom:10px;">北京指尖动力教育科技有限公司 Copyright ©2003-2035 www.kuaixueli.com ALL rights reserved</span>
            <span>备案号：京ICP备16060310号-4</span> -->
            <div style="margin-bottom:10px;">北京即牛时代教育科技有限公司 Copyright ©2003-2035 www.jiniuedu.com ALL rights reserved</div>
            
        </div>
         <div class="copy-item">
            
            <a href="http://beian.miit.gov.cn/" target="_blank">备案号：京ICP备20028411号-2</a>
            <!-- <em > | </em> -->
            <!-- <em style="color: #dadada;padding: 0 12px;">|</em> -->
            <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802032655" target="_blank">
                <img src="http://www.hqwx.com/images/beian_icon.png" style=" width: 17px; height: 17px; margin-right: 3px; "> 
                京公网安备 11010802032655号
            </a>
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
       message: 'second',
       form:{
           
       }
    };
  },

  beforeMount() {},
  mounted() {},
  methods: {
    handleClick(tab, event) {
        console.log(tab, event);
    },
    open() {
        if(this.form.name && this.form.phone && this.form.info){
            let params={
                CompName:this.form.name,
                comPhone:this.form.phone,
                info:this.form.info
            }
            this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/complaint`,{params: params}).then(response => {
                if(response.code=='0'){
                    this.$message({ message: '提交成功', type: 'success'});
                }else{
                    this.$message({ message: response.msg, type: 'warning'});
                }
            })
        }
    }
  }
};
</script>
<style lang="less" scoped>
    /* footer */
.Footer{
    background: #EEEEEE;max-width:1920px;color:#333;font-size:14px;
}
.Footer ul{
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    width:1200px;
    margin: 0 auto;
    padding-top: 30px;
}
.Footer ul li{
    float:left;
    cursor: pointer;
    box-sizing: border-box;
    margin-right:100px
}


.Footer ul li a{
    color:#000000
}
.Footer ul li a:hover{
    color:#000000;
    color:#23D3B5;
}
.Footer ul li div{
    margin-bottom:15px;
    font-size: 14px;
  
}
.Footer ul li{
    .title-line{
        width: 4px;
        height: 18px;
        background: #23D3B5;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(0, -50%);
    }

}
.Footer ul li div:first-child{
    font-size:20px; 
    margin-bottom:30px;
    font-weight: 400;
    color: #000000;
    position: relative;
    padding-left:10px;
}


.Footer .online-message{
    margin-right:0;
    float:right
}
.Footer .online-message div{
    // margin-bottom:20px;
}
.Footer .online-message input{
   height:30px;
}
.Footer .online-message div span{
    display: inline-block;
    width:50px;
}
.Footer .online-message-btn{
    width: 60px;
    height: 25px;    
    border: 1px solid #000000;
    cursor: pointer;
}

.copy-right{
    background: #EEEEEE;
    max-width:1920px;
    color:#9598a2;
    font-size:16px;
    padding:20px 0;
    // font-family: Source Han Sans CN;
}
.copy-right .copy-item{
    width:1200px;
    overflow: hidden;
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    // flex-direction: column;
    justify-content: center;
    align-items: center;
    a{
        color:#9598a2;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right:20px;
    }
    a:hover{
        color:#23D3B5;
    }
}
</style>






