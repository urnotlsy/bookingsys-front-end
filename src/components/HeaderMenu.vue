<template>
  <div id="headermenu">
    
    <el-row>
      <router-view></router-view>
      <div style="margin-left:5%">
        <h1 
          class="hd-content" 
          style="float:left">
          会议室预定系统
        </h1>
        <el-button 
          class="hd-content" 
          type="text" 
          style="float:left" 
          @click="backToHome">
          首页
        </el-button>
      </div>
      <LogInButton v-if="login==0"></LogInButton>
      <Personal-Button v-else-if="login==1" class="personal-button"></Personal-Button>
      <!-- <component :is="showWhat"></component> -->
      </el-row>
  </div>
</template>

<script>
import LogInButton from './LogInButton.vue'
import PersonalButton from './PersonalButton.vue'
export default {
  name: 'HeaderMenu',
  components:{
    LogInButton,
    PersonalButton
  },
  data(){
    return{
      //调试用，之后用全局变量
      role:'1',      //1用户，2物业，3管理员
      login:'1',

    }
  },
  methods:{
    //跳转回首页
    backToHome(){
      this.$router.push('/homepage')
      
    },
    //登录
    logIn(){
      this.$router.push('/login')
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
  /* .personal-button{
    width: 10%;
  } */
</style>
