<template>
  <div class="productList" style="min-height:800px;background:#F4F4F4;">
    <HeadNavigation></HeadNavigation>
    <div class="main" >
        
        <BreadNavigation></BreadNavigation>

        <div v-if="dataBase" v-html="dataBase.sGeneral" style="background:#fff;">
            
        </div>
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
            dataBase:{}
        };
    },

    beforeMount() {},
    mounted() {
        this.getDataList()

    },
    methods: { 
        getDataList(){
            let params={sid:this.$route.query.id}
            this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/general`,{ params: params }).then(response => {
                console.log(response)
                this.dataBase=response.data
            })
        }
    },
    filters: {
        sellsFilter(value) {
            if(!value) {
                return '0';
            } else {
                return value
            }
        },
        sFeaturesFilter(element){
            let str
            if(element=='1') {
                str= '双一流'
            }else if(element=='2'){
                str="985工程"
            }else if(element=='3'){
                str="211工程"
            }else if(element=='4'){
                str="教育部直属"
            }else if(element=='5'){
                str="省部委共建"
            }else if(element=='6'){
                str="省属重点"
            }else if(element=='7'){
                str="省部共建"
            }else if(element=='8'){
                str="省教育厅直属"
            }else{
                str= 'N/A'
            }
            return str
        },
        sLabelFilter(element){
            let str
            if(element=='1') {
                str= '录取快'
            }else if(element=='2'){
                str="院校推荐"
            }else if(element=='3'){
                str="特殊专业"
            }
            return str
        },
        
        sArrangementFilter(element){
            let str
            if(element=='1') {
                str= '高起专'
            }else if(element=='2'){
                str="高起本"
            }else if(element=='3'){
                str="专升本"
            }    
         return str
        }
    },
};
</script>
<style lang="less" scoped>
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





