<template>
  <div id="app">
    <login-box v-if="showLoginBox"></login-box>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>
<script>
import LoginBox from "@/components/LoginBox";
export default {
  name: 'App',
  components: {
    LoginBox
  },
  data() {
    return {
      name: ""
    };
  },
  created(){
    //在页面加载时读取localStorage里的状态信息
    if (localStorage.getItem("store") ) {
      this.$store.replaceState(Object.assign({},this.$store.state,JSON.parse(localStorage.getItem("store"))))     
    } 
    //在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener("beforeunload",()=>{
      localStorage.setItem("store",JSON.stringify(this.$store.state))
    })
  },
  
  computed:{
    showLoginBox(){
      return this.$store.state.showLoginBox
	}
	
	
  },
  mounted(){
	
  }
}
</script>
<style lang="less" scoped>
  
</style>


