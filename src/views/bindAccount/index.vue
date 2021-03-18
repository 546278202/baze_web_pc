<template>
  <div >
    <HeadNavigation ref="HeadNavigation"></HeadNavigation>
    <div style="margin-top:150px;min-height:600px;">
        <bindAccount></bindAccount>
    </div>
    <Footer></Footer>
    <RightMessageBar></RightMessageBar>
  </div>
</template>
<script>
  import HeadNavigation from "@/components/HeadNavigation";
  import Footer from "@/components/Footer";
  import RightMessageBar from "@/components/RightMessageBar";
  import bindAccount from "@/components/LoginBox/bindAccount";
  export default {
  components: {
    HeadNavigation,
    Footer,
    RightMessageBar,
    bindAccount
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





