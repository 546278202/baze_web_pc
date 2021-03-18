<template>
  <div >
    <HeadNavigation ref="HeadNavigation"></HeadNavigation>
    <div style="width:1200px;margin:0 auto;padding-top:100px;padding-bottom:100px;">
      	<enterpriseDetaill></enterpriseDetaill>
    </div>
    <Footer></Footer>
    <RightMessageBar></RightMessageBar>
  </div>
</template>
<script>
  import HeadNavigation from "@/components/HeadNavigation";
  import Footer from "@/components/Footer";
  import RightMessageBar from "@/components/RightMessageBar";
  import enterpriseDetaill from "@/components/enterpriseDetaill";
  export default {
  components: {
    HeadNavigation,
    Footer,
    enterpriseDetaill,
    RightMessageBar
  },
  data() {
    return {
    };
  },

  beforeMount() {},
  mounted() {
  },
  
  methods: {
		
		
  },
  computed:{

  }
};
</script>
<style lang="less" scoped>

</style>





