<template>
     <!-- 热门课程 -->
    <div class="hot-courses" style="padding-top: 50px;">
        <div style="font-size:26px;border-bottom:1px solid #E4E4E4;height:80px;line-height:80px;margin-bottom:30px;">校企共建</div>
        <!-- <div style="text-align:center;font-weight: 400;font-size:30px;color: #333333;margin:50px 0;">河北师范大学</div> -->
        <ul style="width:1200px;height:1300px;margin:0 auto;">
            <iframe  id='iframe' ref="iframe" v-bind:src="webUrl" width="100%" height="100%" scrolling="no" frameborder="0"></iframe>
            
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
        webUrl:'https://www.baidu.com'
    };
  },

  beforeMount() {
      
  },
  mounted() {
        this.getList()
        let fileUrl='http://image.kuaixueli.com/common/head/20201210/xiaoyuangongjian.docx'
        this.webUrl='https://view.officeapps.live.com/op/view.aspx?src=' + fileUrl
        //window.open('https://view.officeapps.live.com/op/view.aspx?src=' + 文件地址)
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






