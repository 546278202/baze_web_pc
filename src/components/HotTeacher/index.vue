<template>
     <!-- 热门课程 -->
    <div class="hot-courses" style="max-width: 1920px;background:#fff;box-sizing;padding:80px 0;">
        <div style="width:1200px;margin:0 auto;font-size:30px;color:#000;margin:0 auto;margin-bottom: 50px;">师资力量</div>
        <ul style="width:1200px;min-height:378px;margin:0 auto;">
            <li class="swiper-slide" v-for="(item,index) in list.slice(0,4)" :key="index" @mouseover="enter($event,index)" @mouseleave="leave($event)">
                <!-- <img :src="Global.img_BASE_URL+item.bigheadportrait" style="width:100%;"> -->
                <el-image style="width:277px; height: 378px;overflow:hidden;" :src="Global.img_BASE_URL+item.bigheadportrait" fit="cover"></el-image>
                <div class="bg-div animated fadeIn" v-show="currentIndex==index? true:false" >
                    <div style="font-size:30px;text-align:center;margin-top:36px;"> {{item.sName}}</div>
                    <div style="word-break: break-all;text-overflow: ellipsis;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 7;-webkit-box-orient: vertical;font-size:16px;text-align:center;margin-top:50px;padding:0 50px;line-height:28px;"> {{item.info}}</div>
                </div>
            </li>  
        </ul>
    </div>
</template>
<script>
export default {
  props:{

  },
  components: {
   
  },
  data() {
    return {
        list:[],
        currentIndex:null
    };
  },

  beforeMount() {
      
  },
  mounted() {
      this.getList()
  },
  methods: {
    getList(){
        this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/instructor`).then(response => {
            this.list=response.data
        })
    },  
    enter($event,index) {
        console.log($event)
        // $event.currentTarget.className = 'imghover';
        this.currentIndex=index
    },
    leave($event,index) {
        // $event.currentTarget.className = 'imghoverout';
        this.currentIndex=index
    }
  }
};
</script>
<style lang="less" scoped>
    ul li {
        float:left;
        width:277px;
        margin-right:30px;
        height: 378px;
        position:relative;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        cursor: pointer;
    }
    ul li img{
        display: block;
    }
    ul li:last-child{
        float:left;
        width:277px;
        margin-right:30px;
        height: 378px;
        position:relative;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        cursor: pointer;
        margin-right:0px;
       
    }
    ul li .bg-div{
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.6);
        top: 0;
        left: 0;
        color:#fff; 
        overflow: hidden;
    }
</style>






