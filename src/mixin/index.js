let MIXIN = {
    data() {
        return {
            name: 'mixin',
            defalutLogoUrl: 'this.src="' + require("@/assets/nodata.png") + '"', 
        }
    },
    created() {
        
    },
    mounted() {
    },
    methods: {
        // 退出登录
        handleSignOut(){
            this.$confirm('确定退出登录?', '提示', {
                lockScroll:false,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {   
                let params = {};
                this.axios .get(this.Global.BASE_URL + "/index.php?r=web/site/logout", { params: params}).then(response => {
                    if (response.code == "0") {
                        this.$store.commit('changeLogin', null);
                        localStorage.removeItem("store")
                        window.location.reload()
                        this.$message({ message: "安全退出", type: "success",duration: 1000 });
                    }
                }).catch(response => {
                    this.$store.commit('changeLogin', null);
                    localStorage.removeItem("store")
                    window.location.reload()
                    this.$message({ message: "安全退出", type: "success",duration: 1000 });
                });
          })
        }
    }
};
export default MIXIN