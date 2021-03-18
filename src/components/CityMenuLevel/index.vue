

<template>
    <div style="display:flex;margin-bottom:15px;">
        <el-select v-model="province" placeholder="选择省份" @change="selectChange($event,1)" ref="provce">
            <el-option
                v-for="item in provinceList"
                :key="item.iProID"
                :label="item.sProName"
                :value="item.iProID">
            </el-option>
        </el-select>
        <div style="margin:0 20px;">
            <el-select v-model="city" placeholder="选择城市" @change="selectChange($event,2)" ref="city">
                <el-option
                    v-for="item in cityList"
                    :key="item.iCityID"
                    :label="item.sCityName"
                    :value="item.iCityID">
                </el-option>
            </el-select>
        </div> 
        <el-select v-model="county" placeholder="选择区域" @change="selectChange($event,3)" ref="county">
        <el-option
                v-for="item in areaList"
                :key="item.iRegionID"
                :label="item.sRegionName"
                :value="item.iRegionID">
            </el-option>
        </el-select>
    </div>
</template>
<script>
export default {
    props:{
        item: {
            type: Object,
            
        },
    },
    components: {
   
    },
    data() {
       return{
            provinceList:[],
			cityList:[],
			areaList:[],

			provinceItem:{},
			cityItem:{},
            areaItem:{},   
             
            province:'',
            city:'',
            county:'',
            // str: '',

			
       }
    },

    beforeMount() {},
    mounted() {
        this.getProvinceList() 
    },
    watch: {
        item(newVal, oldVal) {
          // 在监听你使用update事件来更新word,而在父组件不需要调用该函数
            this.province=newVal.province
            this.city=newVal.city
            this.county=newVal.county
        },
    //     str(newVal, oldVal) {
    //       // 在监听你使用update事件来更新word,而在父组件不需要调用该函数
    //         console.log(newVal, oldVal)
    //          this.$emit('update:item', newVal);
    //     }
    },
    methods: {
        selectChange(val,type){
			if(type=="1"){
				this.getCityList(val)
				this.city=""
                this.county=""

                this.cityItem={}
				this.areaItem={}

				this.provinceList.forEach(element => {
					if(element.iProID==val){
						this.provinceItem=element
					}	
				});
			}
			if(type=="2"){
				this.getAreaList(val)
				this.county=""
                this.areaItem={}
				this.cityList.forEach(element => {
					if(element.iCityID==val){
						this.cityItem=element
					}	
				});
			}
			if(type=="3"){
				this.county=val
				this.areaList.forEach(element => {
					if(element.iRegionID==val){
						this.areaItem=element
					}	
				});
				this.$forceUpdate()
            }

            // this.str={province:this.provinceItem.sProName,city:this.cityItem.sCityName,county:this.areaItem.sRegionName}

            this.$emit("getLiveAddress",{province:this.provinceItem.sProName,city:this.cityItem.sCityName,county:this.areaItem.sRegionName})
            
            
		},
		getProvinceList(){
			this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/province`,{ params: {} }).then(response => {
				this.provinceList=response.data
			})
		},
		getCityList(iProID){
			let params={iProID:iProID}
			this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/city`,{ params: params}).then(response => {
				this.cityList=response.data
			})
		}, 
		getAreaList(iCityID){
			let params={iCityID:iCityID}
			this.axios.get(this.Global.BASE_URL + `/index.php?r=web/site/region`,{ params: params}).then(response => {
				this.areaList=response.data
			})
		}, 
    }
};
</script>
<style lang="less" scoped>
.bread-navigation{
    .el-breadcrumb{
        // height: 70px;
        // line-height: 70px;
        overflow: hidden
    }
 
    /deep/ .el-breadcrumb__item{
        .is-link{
            font-weight: normal;
        }
        /deep/ .el-breadcrumb__inner{
            color:#999999;
            font-size:18px;
        }
        color:#999999;
        font-size:18px;
        // margin-bottom:20px
    }
 
}

</style>






