<template>
  <div >
    <HeadNavigation ref="HeadNavigation"></HeadNavigation>
    <div style="margin-top:150px;min-height:600px;">
        <passwordForget></passwordForget>
    </div>
    <Footer></Footer>
    <RightMessageBar></RightMessageBar>
  </div>
</template>
<script>
  import HeadNavigation from "@/components/HeadNavigation";
  import Footer from "@/components/Footer";
  import RightMessageBar from "@/components/RightMessageBar";
  import passwordForget from "@/components/LoginBox/passwordForget";
  export default {
  components: {
    HeadNavigation,
    Footer,
    RightMessageBar,
    passwordForget
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





