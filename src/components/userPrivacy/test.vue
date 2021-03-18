<template>
  <div id="test">
    <div class="abc">
      <a href="javascript:void(0);" :class="active == '#home' ? 'active' : ''" @click="toTarget('#home')">首页</a>
      <a href="javascript:void(0);" :class="active == '#team' ? 'active' : ''"  @click="toTarget('#team')">团队</a>
      <a href="javascript:void(0);" :class="active == '#contact' ? 'active' : ''"  @click="toTarget('#contact')">联系</a>
      <a href="javascript:void(0);" :class="active == '#join' ? 'active' : ''"  @click="toTarget('#join')">加入我们</a>
    </div>
	
    <div id="home">
      首页
    </div>
    <div id="team">
      团队
    </div>
    <div id="contact">
      联系
    </div>
    <div id="join">
      加入我们
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        active: '#home',
        scrollIntoViewOptions: {
          block: 'start',
          behavior: 'smooth'
        }
      }
    },
    mounted() {
      // 一次性计算赋值，减少滚动计算节点位置次数
      this.distance_team = document.querySelector('#team').offsetTop - 100
      this.distance_contact = document.querySelector('#contact').offsetTop - 100
      this.distance_join = document.querySelector('#join').offsetTop - 100
      this.$nextTick(function() {
        document.querySelector('#test').addEventListener('scroll', this.onScroll)
      })
      window.addEventListener('scroll', this.onScroll, true)
    },
    methods: {
      toTarget(target) {
        console.log(target)
        this.active = target
        const toElement = document.querySelector(target)
        toElement.scrollIntoView(this.scrollIntoViewOptions)
      },
      onScroll() {
        const scrolled = document.querySelector('.test-main').scrollTop
        if (scrolled < this.distance_team) {
          this.active = '#home'
        } else if (scrolled >= this.distance_team && scrolled < this.distance_contact) {
          this.active = '#team'
        } else if (scrolled >= this.distance_contact && scrolled < this.distance_join) {
          this.active = '#contact'
        } else {
          this.active = '#join'
        }
      }
    },
    destroyed() {
      window.removeEventListener('scroll', this.onScroll, true)
    }
  }
</script>

<style lang="less" scoped>
  *{
    margin: 0;
    padding: 0;
  }
  #test {  //关键代码，需要给容器添加高度
    position: relative;
    width: 100%;
    height: 100vh;
  }
  .abc{
    width: 100%;
    height: 60px;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 1;
    background: #fff;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    a{
      width: 200px;
      height: 60px;
      display: block;
      text-align: center;
      line-height: 60px;
      color: #333333;
      text-decoration: none;
      &:hover,&.active{
        color: dodgerblue;
      }
    }
  }
  #home,#team,#contact,#join{
//     width: 100%;
    height: 500px;
    color: #FFFF;
    font-size: 30px;
	text-align: center;
	padding-top:100px;
    // line-height: 500px;
  }
  #home{
    background: tomato;
  }
  #team{
    background: deepskyblue;
  }
  #contact{
    background: orange;
  }
  #join {
    height: 1000px;
    background: lightgreen;
  }
</style>