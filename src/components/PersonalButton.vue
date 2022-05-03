<template>
    <div id="PersonalButton">
        <el-dropdown>
            <el-button 
                type="info" 
                class="button" 
                icon="el-icon-user"
                circle>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>修改信息</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
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
    //登录
    logIn(){
      this.$router.push('/login')
    }
  }
  
}
</script>

<style scoped>
#PersonalButton{
    /* width: 10%;
    background: black; */
}
.button{
    float: right;
    margin-right: 10px;
}
  
</style>
