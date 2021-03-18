<template>
    <div class="class-list" >
        <div class="item">
            <div class="top">
                <div style="font-size:30px; color:#000;margin-bottom:50px;">新闻资讯</div>
            </div>

            <div class="aa">
                <div class="bb" v-if="data.article">
                    <div class="top-box">
                        <div class="title" style="margin-bottom:15px;">院校新闻</div>
                        <div class="box-bottom">
                            <img :src="Global.img_BASE_URL+data.article[0].picture"  >  
                            <div class="default-title" >{{data.article[0].title}}</div>         
                        </div> 
                    </div>

                    <ol >
                        <li v-for="(item,index) in data.article" :key="index" @click="tabClick(item)">
                            <span class="left-name">{{item.title}}</span> <span class="time">{{item.dCreatTime.split(" ")[0]}}</span>
                        </li>
                    </ol> 
                </div>
                 <div class="bb" v-if="data.article">
                    <div class="top-box">
                        <div class="title" style="margin-bottom:15px;">常见问题</div>
                        <div class="box-bottom">
                            <img :src="Global.img_BASE_URL+data.article2[0].picture"  >  
                            <div class="default-title" >{{data.article2[0].title}}</div>         
                        </div> 
                    </div>

                    <ol >
                        <li v-for="(item,index) in data.article2" :key="index" @click="tabClick(item)">
                            <span class="left-name">{{item.title}}</span> <span class="time">{{item.dCreatTime.split(" ")[0]}}</span>
                        </li>
                    </ol> 
                </div>
                <div class="bb" v-if="data.article">
                    <div class="top-box">
                        <div class="title" style="margin-bottom:15px;">通知公告</div>
                        <div class="box-bottom">
                            <img :src="Global.img_BASE_URL+data.article3[0].picture"  >  
                            <div class="default-title" >{{data.article3[0].title}}</div>         
                        </div> 
                    </div>

                    <ol>
                        <li v-for="(item,index) in data.article3" :key="index" @click="tabClick(item)">
                            <span class="left-name">{{item.title}}</span> <span class="time">{{item.dCreatTime.split(" ")[0]}}</span>
                        </li>
                    </ol> 
                </div>
            </div>
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
           data:{}
        };
    },
    filters: {
       
    },
    mounted() {
        this.getArticle()
            
    },
    methods: {
        getArticle() {
            this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/getarticle`).then(response => {
                if(response.code=='0'){
                    this.data=response.data
                }
            })
        },
        tabClick(item) {
            // let params=JSON.stringify(item)
            this.$router.push({ path: `/newsDetail`,query: { id: item.id }});
        },
       
        enter($event) {
            console.log($event)
            $event.currentTarget.classList.remove("imghoverout")
            $event.currentTarget.classList.add("imghover")
        },
        leave($event) {
            $event.currentTarget.classList.remove("imghover")
            $event.currentTarget.classList.add("imghoverout")
        }

    }
};
</script>
<style lang="less" scoped>
.class-list{
    background:#F4F4F4;
    max-width:1920px;
    color:#fff;
    font-size:14px;
    box-sizing: border-box;
    padding:85px 0;
    .item{
        width: 1200px;
        min-height: 770px;
        color: #000;
        margin: 0 auto;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
        background: #fff;
        padding:40px 15px;
        border-radius: 10px;
        border:1px solid #ebeef5;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        overflow: hidden;

    }
}


.bb{
    float:left;
    overflow: hidden;
    border: 1px solid #f1f1f1;
    padding:15px;
    cursor: pointer;
    margin-right:15px;
    border-radius: 6px;
    box-shadow: 0 4px 10px rgba(0,0,0,.05);
    box-sizing: border-box;
    font-size:14px;
    margin-bottom:20px;
        .top-box{
            margin-bottom:20px;
        }
        .box-bottom{
            position: relative;
            border-radius: 4px;
            overflow:hidden;
            img{
                width: 346px;height: 170px;
                border-radius: 4px;
            }
        }
      
        .default-title{
            background: rgb(0, 0, 0);
            color: rgb(255, 255, 255);
            font-size: 16px;
            height: 32px;
            line-height: 32px;
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            box-sizing: border-box;
            padding: 0 15px;
        }
        .title{
            font-size:20px;font-weight: 400;
        }
       
        .left-name{
            display:inline-block;
            width: 240px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
        .time{
            font-size:12px;
            float:right;
            color: #999999; 
        }
    
}

.aa .bb ol li{margin-bottom:20px;}
.aa .bb ol li:hover{color:#22D3B5 !important ;}
.aa .bb:nth-child(3n+3){
    border: 1px solid #f1f1f1;
    padding:15px;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0,0,0,.05);
    overflow: hidden;
    margin-right:0;
    margin-bottom:40px;
    border-radius: 6px;
}


</style>






