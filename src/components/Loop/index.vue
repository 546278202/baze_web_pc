<template>
  	<div style="max-width:1920px;position: relative;margin:0 auto;">
		<MenuNavigation v-if="isMenuNavigation"></MenuNavigation>
		<el-carousel :interval="5000" arrow="always" height="650px" >
			<el-carousel-item v-for="item in list" :key="item.id">
				<el-image :src="Global.img_BASE_URL+item.PCBanner" style="height:100%;"></el-image>
			</el-carousel-item>
		</el-carousel>
	</div>
</template>
<script>
import MenuNavigation from "@/components/MenuNavigation";
export default {
  components: {
   	MenuNavigation
  },
  props:{
	  	isMenuNavigation:false,
    	list:[1,2] | Array
  },
  data() {
    return {

    };
  },

  beforeMount() {},
  mounted() {},
  methods: {
    handleClick(tab, event) {
        console.log(tab, event);
    }
  }
};
</script>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>






