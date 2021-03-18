<template>
    <div>
        <HeadNavigation></HeadNavigation>
        <div class="main">
            <Certificates></Certificates>
        </div>
        <Footer></Footer> 
        <RightMessageBar></RightMessageBar> 
    </div>
</template>
<script>
import HeadNavigation from "@/components/HeadNavigation";
import Footer from "@/components/Footer";
import RightMessageBar from "@/components/RightMessageBar";
import Certificates from "@/components/Certificates";
export default {
  components: {
    HeadNavigation,
    Footer,
    RightMessageBar,
    Certificates
  },
  data() {
        return {
            // dataList:Object,
        };
    },

    beforeMount() {},
    mounted() {
    
        
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
    }
};
</script>
<style lang="less" scoped>
.main{
    min-height: 600px;
    width:1200px;
    margin:0 auto;
    margin-top: 70px;
    font-size: 16px;
    padding-top: 30px;
}

</style>






