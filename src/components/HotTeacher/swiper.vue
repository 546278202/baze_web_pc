<template>
  	<div style="width:1200px;position: relative;margin:0 auto;">
		
		<el-carousel :interval="5000" arrow="always">
			<el-carousel-item v-for="item in list" :key="item.id">
				<el-image :src="Global.img_BASE_URL+item.bigheadportrait" style="height:100%;"></el-image>
			</el-carousel-item>
		</el-carousel>
	</div>
</template>
<script>
export default {
  components: {
  },
  props:{
	  
    	// list:[1,2]
  },
  data() {
    return {
		list:[1,2]
    };
  },

  beforeMount() {},
  mounted() {
	  this.getList()
  },
  methods: {
    handleClick(tab, event) {
        console.log(tab, event);
	},
	getList(){
        // this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/instructor`).then(response => {
		// 	let data=response.data
		// 	let result = [];
		// 	for(var i=0;i<data.length;i=3){
		// 		result.push(data.slice(i,i+3));
		// 	}
		// 	this.list=result
		// 	console.log(this.result)
        // })
    },  
   
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






