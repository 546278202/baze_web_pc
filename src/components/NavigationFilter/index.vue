

<template>
    <div class="classified-selection">
        <div style="margin-bottom:50px;  font-size: 18px; font-family: Source Han Sans CN; font-weight: 400;color: #999999;">
            <BreadNavigation :BreadList="['选择院校']"></BreadNavigation>
        </div>
        <ul>
            <li>城市 </li><li @click="handleResetSearch(1)" :class="IndexMenuCity==null ? 'menu-click-active':''"  >全部</li><li v-for="(item,index) in menuDataList.city" :key="item.id" @click="tabMenuClick(item,index,1)" :class="IndexMenuCity==index ? 'menu-click-active':''">{{item.sCityName}}</li>
        </ul>
        <ul>
            <li>大类 </li><li @click="handleResetSearch(2)" :class="IndexMenuBig==null ? 'menu-click-active':''"  >全部</li><li v-for="(el,index) in menuDataList.sFeatures" :key="el.id" @click="tabMenuClick(el,index,2)" :class="IndexMenuBig==index ? 'menu-click-active':''">{{el.features}}</li>
        </ul>
        <ul>
            <li>小类 </li><li @click="handleResetSearch(3)" :class="IndexMenuSmall==null ? 'menu-click-active':''"  >全部</li><li v-for="(i,index) in menuDataList.type" :key="i.id" @click="tabMenuClick(i,index,3)" :class="IndexMenuSmall==index ? 'menu-click-active':''">{{i.name}}</li>
        </ul>
    </div>
</template>
<script>
import BreadNavigation from "@/components/BreadNavigation";

export default {
  components: {
   BreadNavigation
  },
  data() {
    return {
        menuDataList:[],
        IndexMenuCity:null,
        IndexMenuBig:null,
        IndexMenuSmall:null,
        cid:null,
        fid:null,
        typeid:null
    };
  },

  beforeMount() {},
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
        this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/schoocate`).then(response => {
            console.log(response)
            this.menuDataList=response.data
        })
    },
    tabMenuClick(item,index,type){
        console.log(item,index,type)
        if(type=='1'){
            this.IndexMenuCity=index
            this.cid=item.cid
           
        }
        if(type=='2'){
            this.IndexMenuBig=index
             this.fid=item.fid
            
        }
        if(type=='3'){
            this.IndexMenuSmall=index
             this.typeid=item.typeid
        }
        setTimeout(() => {
           this.$emit('fatherMethod',{cid:this.cid, fid:this.fid,typeid:this.typeid});
        },100)
        
    },
    handleResetSearch(val){
        if(val=='1'){
            this.IndexMenuCity=null
            this.cid=null
        }
        if(val=='2'){
            this.IndexMenuBig=null
            this.fid=null
        }
        if(val=='3'){
            this.IndexMenuSmall=null
            this.typeid=null
        }
        setTimeout(() => {
            this.$emit('fatherMethod',{cid:this.cid, fid:this.fid,typeid:this.typeid});

        },100)
    }
  }
};
</script>
<style lang="less" scoped>
.classified-selection{
        width:1200px;
        background: #fff;
        border-radius: 10px;
        margin:0 auto;
        padding:30px 40px;
        box-shadow: 0 4px 10px rgba(0,0,0,.05);
        z-index: 111;
        position: absolute;
        top: -164px;
        left: 50%;
        transform: translate(-50%);
        -webkit-transform: translate(-50%)
  }
  .classified-selection ul{
      overflow: hidden;
      margin-bottom:30px;
      font-size: 20px;
      font-family: Source Han Sans CN;
      font-weight: 300;
      color: #000000;
      padding-left: 40px;
  }
  .classified-selection ul li{
      float:left;
      margin-right:30px;
      cursor: pointer;
  }
  .classified-selection ul li:first-child{
      font-size: 24px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #000000;
  }
    .menu-click-active{
      color: #23D3B5 !important;
  }
</style>






