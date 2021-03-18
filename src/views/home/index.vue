<template>
  <div >
    <HeadNavigation ref="HeadNavigation"></HeadNavigation>
    <VideoPlay v-if="dataBase.cclive" :list="dataBase.cclive"></VideoPlay>
    <Loop  :list="dataBase.banner" :isMenuNavigation="true"></Loop>
    <ClassList v-if="dataBase.cata2" :productType="'1'" :navList="dataBase.cata2.slice(0,4)" :title="'录播课程'" :dataList.sync="dataBase.course" ></ClassList>
    <ClassList v-if="dataBase.cata2" :productType="'2'" :currentStyle="{background:'#fff'}" :navList="dataBase.cata2.slice(0,4)" :title="'专业技能'" :dataList.sync="dataBase.mendcourse"></ClassList>
    <ClassList v-if="dataBase.cata2" :productType="'3'" :currentStyle="{background:'#f4f4f4;'}" :navList="dataBase.features.slice(0,4)" :title="'合作院校'" :dataList.sync="dataBase.schoo"></ClassList>
    <HotTeacher v-if="dataBase.cata" :list="dataBase.cata"></HotTeacher>


	
	<HotNews></HotNews>
    <PersonalShow v-if="dataBase.video" :productType="'3'" :currentStyle="{background:'#fff;'}"  :title="'学员风采'" :dataList.sync="dataBase.video"></PersonalShow>

    <Footer></Footer>
    <RightMessageBar></RightMessageBar>
  </div>
</template>
<script>
	import HeadNavigation from "@/components/HeadNavigation";

	import Loop from "@/components/Loop";
	import VideoPlay from "@/components/VideoPlay";
	import HotTeacher from "@/components/HotTeacher";

	import ClassList from "@/components/ClassList";
	import PersonalShow from "@/components/home/PersonalShow";


	
	import HotNews from "@/components/home/HotNews";

	import Footer from "@/components/Footer";
	import RightMessageBar from "@/components/RightMessageBar";

	export default {
	components: {
		HeadNavigation,
		Loop,
		VideoPlay,
		HotTeacher,
		HotNews,
		PersonalShow,
		ClassList,
		Footer,
		RightMessageBar
	},
	data() {
		return {
		dataBase: []
		};
	},

	beforeMount() {},
	mounted() {
		this.getList()
	},
	
	methods: {
		getList() {
			this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/index`).then(response => {
				this.dataBase=response.data
			})
		}
		
	},
	computed:{

	}
};
</script>
<style lang="less" scoped>

</style>





