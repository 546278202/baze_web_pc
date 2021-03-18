<template>
  <div>
    <HeadNavigation></HeadNavigation>
    <div class="main" >
        <div style="padding:15px 0px;  font-size: 18px; font-family: Source Han Sans CN; font-weight: 400;color: #999999;">
            <BreadNavigation :BreadList="['文章详情']"></BreadNavigation>
        </div>
        <!-- <h2 style="text-align:center;margin-top:50px;">{{dataBase.title}}</h2> -->
        <div class="html-introduce" v-if="data" v-html="data.content" style="background:#fff;"></div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
const defaultListQuery = {
    pageNum: 1,
    pageSize: 20
};
import HeadNavigation from "@/components/HeadNavigation";
import BreadNavigation from "@/components/BreadNavigation";
import Footer from "@/components/Footer";
export default {
  components: {
    HeadNavigation,
    Footer,
    BreadNavigation
  },
  data() {
    return {
            data:{}
        };
    },
    mounted() {
        this.getArticleDetail()
    },
    methods: { 
        getArticleDetail() {
            let params={id:this.$route.query.id}
            this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/articleinfo`,{params:params}).then(response => {
                if(response.code=='0'){
                    this.data=response.data
                }
            })
        },
    },
    filters: {
      
    },
};
</script>
<style lang="less" scoped>
    .bread-navigation{
        line-height:45px;
    }
    .main{
        position: relative;
        width: 1200px;
        margin: 0 auto;
        padding-bottom: 50px;
        background: #fff;
        padding: 0 50px;
        margin-top: 70px;
        padding-bottom: 100px;
    }
</style>





