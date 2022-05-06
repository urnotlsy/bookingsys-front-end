<template>
  <div id="login">
    <HeaderMenu/>
      <el-card class="card">
        <span class="tittle">
          请登录
        </span>
        <el-form 
          ref="form" 
          :model="form" 
          label-width="80px"
          class="form">
          <el-form-item label="账号">
            <el-input v-model="form.id"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="form.pass"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">登录</el-button>
            <el-button @click="backToHome">取消</el-button>
          </el-form-item>
        </el-form>
      </el-card>
  </div>
</template>

<script>
import HeaderMenu from '../components/HeaderMenu.vue'

export default {
  name: 'LogIn',
  components: {
    HeaderMenu
  },
  data(){
    return{
      form:{
        id:'',
        pass:'',
      }
    }
  },
  methods:{
    //跳转回首页
    backToHome(){
      this.$router.push('/homepage')
    },
    //提交账密
    onSubmit(){

    }
  }
}
</script>

<style scoped>
  #login{
    background-color: #E9EEF3;
    width: 100%;
    height: 100%;	
    margin: 0 auto;
    position: fixed;
  }
  .card{
    width: 50%;
    margin: 0 auto; 
    margin-top: 5%;
    text-align: center;
    padding: 3% 3% 0 0;
  }
  .tittle{
    font-size: 20px;
    font-weight: bold;
  }
  .form{
    margin-top: 20px;
  }
</style>
