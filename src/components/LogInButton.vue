<template>
    <div style="margin-right:10%">
        <el-button 
            class="hd-content" 
            type="text" 
            style="float:right" 
            @click="logIn">
            登录
        </el-button>
    </div>
</template>

<script>

export default {
  name: 'LogInButton',
  data(){
    return{
    }
  },
  methods:{
    //登录
    logIn(){
      this.$router.push('/login')
    }
  }
  
}
</script>

<style scoped>
  .hd-content{
    margin:1% 1% 1% 1%;
    color:white;
  }
  
</style>
