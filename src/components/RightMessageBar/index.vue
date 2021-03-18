<template>
   <!-- 右侧消息栏 -->
    <div class="message-bar">
        <ul >
            <li @mouseenter="mouseenter(1)" @mouseleave="mouseleave(1)">
                <div ><i class="iconfont icon-20xiaoshifuwurexian"></i></div>
                <div>报名热线</div>
                <div class="show-box" v-show="isHotPhoneBox">
                    <div class="show-box-item animated slideInRight"> 18210712532</div>
                </div>
            </li>
            <li @mouseenter="mouseenter(2)" @mouseleave="mouseleave(2)" >
                <div ><i class="iconfont icon-shouhou"></i></div>
                <div>售后咨询</div>
                <div class="show-box" v-if="isSaleBox">
                     <div class="show-box-item animated slideInRight">  18210712532</div>
                </div>
            </li>
            <li @mouseenter="mouseenter(3)" @mouseleave="mouseleave(3)">
                <div ><i class="iconfont icon-weixin4"></i></div>
                <div>服务微信</div>
                <div  v-if="isWeiXinBox" style=" position: absolute;left: -116px;bottom: 0; color:#fff; width: 112px; overflow: hidden;">
                    <div class="show-box-item animated slideInRight" style="width:112px;height:114px;background:#ccc;">
                        <img style="width:100%;height:100%;" src="@/assets/weiixn.jpg" />
                    </div>
                </div>
            </li>
            <li data-top="data-top" class="animated fadeInDownBig" @click="backtop()" v-if="scrollTop>500">
                <div><i class="iconfont icon-xiangshang"></i></div>
                <div>返回顶部</div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    components: {
    
    },
    data() {
        return {
            message: 'second',
            isHotPhoneBox: false,
            isSaleBox: false,
            isWeiXinBox: false,
            scrollTop:null
        };
    },
    mounted() {
        window.addEventListener("scroll",this.showbtn,true)
    },
    methods: {
        mouseenter(event){
            if(event=='1'){
                this.isHotPhoneBox=true
            }
            if(event=='2'){
                this.isSaleBox=true
            }
            if(event=='3'){
                this.isWeiXinBox=true
            }
        },
        mouseleave(event){
            if(event=='1'){
                this.isHotPhoneBox=false
            }
            if(event=='2'){
                this.isSaleBox=false
            }
            if(event=='3'){
                this.isWeiXinBox=false
            }
        },
        // 显示回到顶部按钮
        showbtn(){
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            this.scrollTop = scrollTop
        },
        /**
            * 回到顶部功能实现过程：
            * 1. 获取页面当前距离顶部的滚动距离（虽然IE不常用了，但还是需要考虑一下兼容性的）
            * 2. 计算出每次向上移动的距离，用负的滚动距离除以5，因为滚动的距离是一个正数，想向上移动就是做一个减法
            * 3. 用当前距离加上计算出的距离，然后赋值给当前距离，就可以达到向上移动的效果
            * 4. 最后记得在移动到顶部时，清除定时器
        */
        backtop(){
            var timer = setInterval(function(){
                let osTop = document.documentElement.scrollTop || document.body.scrollTop;
                let ispeed = Math.floor(-osTop / 5); 
                document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
                this.isTop = true;
                if(osTop === 0){
                clearInterval(timer);
                }
            },30)
        }
    }
};
</script>
<style lang="less" scoped>
   /* 信息栏 */
.message-bar{
    position: fixed;
    right: 15px;
    top: 40%;
    width:54px;
    font-size: 12px;
    color:#000;
    text-align: center;
    z-index: 2000;
    box-shadow: 0 3px 6px rgba(93,105,96,.08);

}

.message-bar ul li{
    width: 54px;
    height: 54px;
    border-radius: 2px;
    margin-bottom:5px;
    cursor: pointer;
    box-sizing: border-box;
    position: relative;
    background: #fff;
    padding-top:5px

}
.message-bar ul li .show-box{
    position: absolute;
    left: -124px;
    top: 0;
    color:#fff;
    width: 124px;
    overflow: hidden;

}
.message-bar ul li .show-box .show-box-item{
    background: #23D3B5;
    border-radius: 2px;
    width: 120px;
    height: 54px;
    line-height: 54px;
    margin-right:4px;
    box-sizing: border-box;
    font-size:14px;
}

.message-bar ul li:last-child{
    margin-bottom:0px;
}
.message-bar ul li:hover {
    background: #23D3B5;
    border-radius: 2px;
    cursor: pointer;
    color:#fff;
}

.message-bar .iconfont{
    font-size: 26px !important;
    // color:#23D3B5
}
</style>






