<template>
     <!-- 热门课程 -->
    <div class="hot-courses" style="min-height:500px;padding-top: 50px;">
        <div style="font-size:26px;border-bottom:1px solid #E4E4E4;height:80px;line-height:80px;margin-bottom:30px;">校企合作</div>
        <!-- <div style="text-align:center;font-weight: 400;font-size:30px;color: #333333;margin:50px 0;">河北师范大学</div> -->
        <ul style="width:1200px;min-height:378px;margin:0 auto;">
            <li class="swiper-slide" v-for="(item,index) in list.slice(0,8)" :key="index" @mouseover="enter($event,index)" @mouseleave="leave($event)" @click="clickHandel(item)">
                <!-- <img :src="Global.img_BASE_URL+item.img" style="width:100%;"> -->
                <el-image style="width:277px; height: 378px;overflow:hidden;" :src="Global.img_BASE_URL+item.img" fit="cover"></el-image>
                <div class="bg-div animated fadeIn" v-show="currentIndex==index? true:false" >
                    <div style="font-size:30px;text-align:center;margin-top:36px;"> {{item.title}}</div>
                    <div style="word-break: break-all;text-overflow: ellipsis;overflow: hidden;display: -webkit-box;-webkit-line-clamp: 7;-webkit-box-orient: vertical;font-size:16px;text-align:center;margin-top:50px;padding:0 50px;line-height:28px;" v-html="item.content"> </div>
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
    clickHandel(item){
        let params=JSON.stringify(item).replace(/%/g, '%25');
        let webUrl=this.$router.resolve({ path: '/enterpriseDetaill', query: { params: params}})
        window.open(webUrl.href,'_blank');    
    },
    getList(){
        this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/college`).then(response => {
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
        margin-bottom:20px;
    }
    ul li img{
        display: block;
    }
    ul li:nth-child(4n+4){
// .class-list ol li:nth-child(4n+4){

        margin-right:0px;
        height: 100%;
    }
    ul li .bg-div{
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.6);
        top: 0;
        left: 0;
        color:#fff; 
    }
</style>






