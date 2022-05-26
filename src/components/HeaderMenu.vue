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
      <PersonalButton v-else-if="login==1"></PersonalButton>
      <!-- <component :is="showWhat"></component> -->
      </el-row>
  </div>
</template>

<script>
import LogInButton from './LogInButton.vue'
import PersonalButton from './PersonalButton.vue'
import axios from 'axios'

export default {
  name: 'HeaderMenu',
  components:{
    LogInButton,
    PersonalButton
  },
  data(){
    return{
      login:'0',
    }
  },
  created(){
    this.checkToken();
  },
  methods:{
    //跳转回首页
    backToHome(){
      this.$router.replace({name:'homepage'})
    },
    //登录
    logIn(){
      this.$router.replace({name:'login'})
    },
    checkToken(){
      let acc = JSON.parse(window.localStorage.getItem('access'))
      if(!acc){
        this.login=0;
      }else{
        this.login=1;
          //检验token合法性
        axios({
          url:'http://localhost:9090/checkToken',
          method:'get',
          headers:{
              token:acc.token
          }
        }).then((res)=>{
          if(!res.data){
              alert('验证过期，请重新登录！')
              this.login=0;
          }else{
            this.login=1;
          }
        })
      }
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
