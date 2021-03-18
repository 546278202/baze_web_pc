<template>
  <div >
    <HeadNavigation ref="HeadNavigation"></HeadNavigation>
    <div style="margin-top:150px;">
        <userServe></userServe>
    </div>
    <Footer></Footer>
    <RightMessageBar></RightMessageBar>
  </div>
</template>
<script>
  import HeadNavigation from "@/components/HeadNavigation";
  import Footer from "@/components/Footer";
  import RightMessageBar from "@/components/RightMessageBar";
  import userServe from "@/components/userServe";
  export default {
  components: {
    HeadNavigation,
    Footer,
    userServe,
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





