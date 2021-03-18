<template>
  <div>
    <HeadNavigation></HeadNavigation>
	<div style="margin-top:70px;position: relative;max-width: 1920px;height:650px;overflow:hidden;">
		<menuPromotion ref="menuPromotion"></menuPromotion>
    	<Loop v-if="dataBase.banner" :list="dataBase.banner"></Loop>
	</div>
	<div class="tabs">
		<router-link  class="left-mode" :to="{path:'/collegesList' , query:{tabCode:'2'}}">
			<i class="iconfont icon-tubiaozhizuomoban-37"></i>
			<div class="shu-xian"></div>
			<div class="text">
				<div style="font-size:36px;font-weight: bold;color: #ECEEE9;">选院校</div>
				<div style="font-size: 24px;font-family: Source Han Sans CN;font-weight: bold;color: #ECEEE9;margin-top:20px;">科学合理地选择了学校</div>
			</div>
		</router-link>
		
		<router-link  class="left-mode" :to="{path:'/majorList' , query:{tabCode:'2'}}" 	style="background: #FF9830;">
			<i class="iconfont icon-tubiaozhizuomoban-37"></i>
			<div class="shu-xian"></div>
			<div class="text">
				<div style="font-size:36px;font-weight: bold;color: #ECEEE9;">选专业</div>
				<div style="font-size: 24px;font-family: Source Han Sans CN;font-weight: bold;color: #ECEEE9;margin-top:20px;">科学合理地选择了学校</div>
			</div>
		</router-link>
	</div>
    <ClassList v-if="schooindexList.sRecommend" :productType="'1'"  :title="'推荐院校'" :dataList.sync="schooindexList.sRecommend" ></ClassList>
    <ClassList v-if="schooindexList.normal" :productType="'1'" :currentStyle="{background:'#fff'}"  :title="'热门院校'" :dataList.sync="schooindexList.normal" ></ClassList>
    <MajorList v-if="majorList.sRecommend" :productType="'1'"  :title="'推荐专业'" :dataList.sync="majorList.sRecommend" ></MajorList>
	<MajorList v-if="majorList.natural" :productType="'1'"  :title="'热门专业'" :dataList.sync="majorList.natural" ></MajorList>
	<MajorList v-if="majorList.normal" :productType="'1'"  :title="'主流专业'" :dataList.sync="majorList.normal" ></MajorList>
    <Footer></Footer>
    <RightMessageBar></RightMessageBar>
  </div>
</template>
<script>
  	import HeadNavigation from "@/components/HeadNavigation";
	import menuPromotion from "@/views/EducationPromotion/menuPromotion";
  	import Loop from "@/components/Loop";
	import ClassList from "@/views/EducationPromotion/ClassList";
	import MajorList from "@/views/EducationPromotion/MajorList";	  
  	import Footer from "@/components/Footer";
 	import RightMessageBar from "@/components/RightMessageBar";
  export default {
  components: {
    menuPromotion,
    HeadNavigation,
    Loop,
	MajorList,
    ClassList,
    Footer,
    RightMessageBar
  },
  data() {
    return {
	  dataBase: [],
	  schooindexList:[],
	  majorList:[]
    };
  },

  beforeMount() {},
  mounted() {
	this.getList()
	this.schooindexGetList()
	this.getMajorList()
  },
  methods: {
	getList() {
		this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/index`).then(response => {
			this.dataBase=response.data
		})
	},
	
	schooindexGetList() {
		this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/schooindex`).then(response => {
			console.log(response)
			this.schooindexList=response.data
		})
	}, 
	getMajorList() {
		this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/specialityindex`).then(response => {
			console.log(response)
			this.majorList=response.data
		})
	}, 
  },
  computed:{
    // showLoginBox(){
    //   return this.$store.state.showLoginBox
    // }
  }
};
</script>

<style lang="less" scoped>
 	.tabs{
		width: 1200px;
		height: 278px;
		background: #FFFFFF;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.left-mode{
			background: rgb(253, 103, 102);
			border-radius: 10px;
			width: 550px;
			height: 188px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.left-mode .iconfont{
			color:#fff;
			font-size:86px;
			margin-right:40px;
		}
		.left-mode .shu-xian{
			width:3px;
			height:100px;
			background: #fff;
			margin-right:40px;
		}
		.left-mode .text{

		}
	}

    
</style>





