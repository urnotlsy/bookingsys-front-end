<template>
  <div style="margin-right:10%">
    <el-button
      class="button"
      type="info"
      @click="logOut">
      退出登录
    </el-button>
    <el-button 
      icon="el-icon-user"
      class="button" 
      type="text" 
      @click="goToPersonal">
      个人中心
    </el-button>
    
  </div>
</template>

<script>

export default {
  name: 'PersonalButton',
  data(){
    return{
    }
  },
  methods:{
    //个人中心
    goToPersonal(){
      this.$router.push('/personal')
    },
    logOut(){
      //退出登录
    }
  }
  
}
</script>

<style scoped>
.button{
    margin:1% 1% 1% 1%;
    color:white;
    float: right;
  }
  
</style>
