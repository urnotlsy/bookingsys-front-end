<template>
  <div id="login">
    <HeaderMenu/>
      <el-card class="card">
        <span class="tittle">
          请登录
        </span>
        <el-form 
          :model="ruleForm" 
          :rules="rules" 
          ref="ruleForm" 
          label-width="80px"
          class="form">
          <el-form-item label="账号" prop="user_id">
            <el-input 
            prefix-icon="el-icon-user"
            v-model="ruleForm.user_id">
            </el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input 
            type="password" 
            prefix-icon="el-icon-lock"
            show-password
            v-model="ruleForm.password">
            </el-input>
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
import axios from 'axios'

export default {
  name: 'LogIn',
  components: {
    HeaderMenu
  },
  data(){
    return{
      ruleForm:{
        user_id:'',
        password:'',
      },
      rules:{
        user_id:[{required: true, message: '请输入账号', trigger: 'blur'}],
        password:[{required: true, message: '请输入密码', trigger: 'blur'}]
      }
    }
  },
  methods:{
    //跳转回首页
    backToHome(){
      this.$router.replace({name:'homepage'})
    },
    //提交账密
    onSubmit(){
      this.$refs.ruleForm.validate((valid) => {
        if(valid){
          axios.get('http://localhost:9090/login',{
            params:this.ruleForm
          }).then((res)=>{
            if(res.data==false){
              this.$message({
                  type: 'warning',
                  message: '用户名或密码错误'
              });
            }else{
              localStorage.setItem('access',JSON.stringify(res.data))
              this.$router.replace({name:'homepage'})
              console.log('1')
            }
          }).catch(function (error){
            console.log(error)
          })
        }else{
          console.log('error submit!!');
          return false;
        }
      })
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
