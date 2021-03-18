<template>
  <div>
    <HeadNavigation ref="HeadNavigation"></HeadNavigation>
    <div style="margin-top:150px;">
    	<userPrivacy></userPrivacy>
	</div>

    <Footer></Footer>
    <RightMessageBar></RightMessageBar>
  </div>
</template>
<script>
  import HeadNavigation from "@/components/HeadNavigation";
  import Footer from "@/components/Footer";
  import RightMessageBar from "@/components/RightMessageBar";
  import userPrivacy from "@/components/userPrivacy";
  export default {
  components: {
    HeadNavigation,
    Footer,
    userPrivacy,
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





