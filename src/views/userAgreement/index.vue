<template>
  <div >
    <HeadNavigation ref="HeadNavigation"></HeadNavigation>
    <div style="margin-top:150px;">
        <userAgreement></userAgreement>
    </div>
    <Footer></Footer>
    <RightMessageBar></RightMessageBar>
  </div>
</template>
<script>
  import HeadNavigation from "@/components/HeadNavigation";
  import Footer from "@/components/Footer";
  import RightMessageBar from "@/components/RightMessageBar";
  import userAgreement from "@/components/userAgreement";
  export default {
  components: {
    HeadNavigation,
    Footer,
    userAgreement,
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





