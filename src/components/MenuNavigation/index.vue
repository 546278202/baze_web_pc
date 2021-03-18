    <template>
        <div style=" position: absolute;
            left:50%;
            top:50%;
            width:1200px;
            height:650px;
            box-sizing: border-box;
            display: block;
            z-index: 11;
            transform:translate(-50%,-50%);">
            <div class="course-menu" ref="courseMenu" >
                <ol v-if="menuDataList.length>0" @mouseleave="menuMouseLeave()">
                    <li v-for="(item,index) in menuDataList" :key="index" @mouseenter="menuMouseenter(index,item)" > 
                        {{item.sIndustryName}}
                        <div :class="menuDataIndex ==index? 'item-active-border':'item-default-border'"></div>
                    </li>

                    <div class="course-menu-right" v-show="isCourseMenuRight" >
                        <div class="course-menu-right-title">{{menuItemChildList.sIndustryName}}</div>
                        <div class="course-menu-right-item">
                            <span  v-for="(item, index) in menuItemChildList.child" :key="index" @click="tabClickItem(item)">{{item.sIndustryName}}</span>
                        </div>
                    </div>
                </ol>
                
                
            </div>
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
            menuDataList:[],
            menuItemChildList:[],
            menuDataIndex:0,
            isCourseMenuRight:false

        };
    },

    beforeMount() {

    },
    mounted() {
        this.getList()
    
    },
    methods: {
        getList() {
            this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/lemu`).then(response => {
                this.menuDataList=response.data.lemu
            })
        },
        menuMouseenter(index,item){
            this.$nextTick(() => {
                this.menuItemChildList=item
                this.menuDataIndex=index
                this.isCourseMenuRight=true
            })
        },
        menuMouseLeave(index,item){
            this.$nextTick(() => {
                // this.menuItemChildList=item
                // this.menuDataIndex=index
                this.isCourseMenuRight=false
            })
        },
        tabClickItem(item){
            this.$router.push({ path: '/productList' });
        },
    }
};

</script>
<style lang="less" scoped> 
 .course-menu{
    height:100%;
    box-sizing: border-box;
    display: block;
}
 .course-menu ol{
    height:100%;
    width:280px;
    // background: #F4F4F4;
    text-align: center;
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 300;
    color: #000000;
    float: left;
    background: rgba(255,255,255,.96);
}
 .course-menu ol li{
    height:45px;
    line-height: 45px;;
    width: 100%;
    margin-right: 0;
    position: relative;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding:0 5px;
    box-sizing: border-box;
}
 .course-menu ol li:hover{
    cursor: pointer;
    background: #fff;
    
}
 .course-menu .course-menu-right{
    position: absolute;
    left:280px;
    top:0;
    // font-size: 14px;
    float:left;
    width:920px;
    height:100%;
    box-sizing: border-box;
    padding: 0 20px 20px 20px;
    // color: #999999;
    background: #fff;

}
 .course-menu .course-menu-right .course-menu-right-title{
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    width:100%;
    height: 45px;
    line-height: 45px;
    // color: #999999;


}
 .course-menu .course-menu-right .course-menu-right-item{
    // color: #999999;
    overflow: hidden;
    margin-top: 20px;
}
 .course-menu .course-menu-right .course-menu-right-item span{
    // color: #999999;
    float:left;
    margin-right:30px;
    cursor: pointer;
}

.item-active-border{
    width: 3px;
    height:45px;background: rgb(34, 211, 181);
    position: absolute; 
    left: 0;
    top: 0;
    display:block;
}
.item-default-border{
    width: 3px;
    height:45px;background: rgb(34, 211, 181);
    position: absolute; 
    left: 0;
    top: 0;
    display:none;
}
</style>






