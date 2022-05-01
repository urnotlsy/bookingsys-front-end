<template>
  <div id="headermenu">
    
    <el-row>
      <router-view></router-view>
      <div style="margin-left:5%">
        <h1 class="hd-content" style="float:left">会议室预定系统</h1>
        <el-button class="hd-content" type="text" style="float:left" @click="backToHome">首页</el-button>
      </div>
      <div style="margin-right:10%">  
        <el-button class="hd-content" type="text" style="float:right" @click="logIn">登录</el-button>
        <!-- <el-button class="hd-content" type="text" style="float:right">注册</el-button> -->
      </div>
      </el-row>
  </div>
</template>

<script>

export default {
  name: 'HeaderMenu',
  data(){
    return{}
  },
  methods:{
    //跳转回首页
    backToHome(){
      this.$router.push('/homepage')
      
    },
    //登录
    logIn(){
      this.$router.push('/login')
      this.$destroy()
    }
  }
  
}
</script>

<style scoped>
  .el-row {
    height: 10%;
    background: #99a9bf;
  }
  .hd-content{
    margin:1% 1% 1% 1%;
    color:white;
  }
  
</style>
