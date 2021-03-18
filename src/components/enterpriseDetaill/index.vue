<template>
    <div>
        <div style="text-align:center;font-weight: 400;font-size:30px;color: #333333;margin:50px 0;">{{dataBase.title}}</div>
        <div style="line-height:34px;text-indent:2em;font-size:18px;" v-html="dataBase.content">
            
        </div>
    </div>
</template>
<script>
const defaultListQuery = {
    pageNum: 1,
    pageSize: 10
};
export default {
  components: {

  },
  data() {
        return {
            dataBase:{}
        }
    },

    beforeMount() {

    },
    mounted() {
        this.dataBase=JSON.parse(decodeURIComponent(this.$route.query.params))
    },
    methods: {
        
    },
    filters: {
        
    },
};
</script>
<style lang="less" scoped>
    .introduction{
        height: 450px;
        // background: rgb(204, 204, 204);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-size:18px;
        color:#333
    }
    
</style>





