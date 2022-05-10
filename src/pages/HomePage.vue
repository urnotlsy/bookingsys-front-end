<template>
  <div id="homepage">
    <HeaderMenu/>
    <div class="main">
      
      <div class="admin-options">
        <el-button 
          class="option-button cal-button" 
          @click="checkCalendar">
          <h1 class="card-content">
            预约日历
          </h1>
        </el-button>
        <el-button 
          class="option-button list-button" 
          @click="checkList">
          <h1 class="card-content">
            预约列表
          </h1>
        </el-button>
        <el-button 
          class="option-button info-button" 
          @click="checkRoom">
          <h1 class="card-content">
            会议室详细信息
          </h1>
        </el-button>
        <el-button 
          class="option-button order-button" 
          @click="addOrder">
          <h1 class="card-content">
            会议室预定
          </h1>
        </el-button>
        <el-button 
          class="option-button account-button" 
          v-if="role==3"
          @click="manageAccount">
          <h1 class="card-content">
            账号管理
          </h1>
        </el-button>
      </div>
      <el-card class="box-card">
        <div 
          slot="header" 
          class="clearfix">
          <span style="font-weight:bold; font-size: 20px">会议室使用管理办法</span>
        </div>
        <el-button type="info" class="download-button">下载文件</el-button>
        <el-upload
          v-if="role==3"
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <el-button type="primary" style="margin-top:10px">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-card>
    </div>  
  </div>
</template>

<script>
import HeaderMenu from '../components/HeaderMenu.vue'
export default {
  name: 'HomePage',
  components: {
    HeaderMenu
  },
  data () {
    return {
      //调试用，之后用全局变量
      role:'3',      //1用户，2物业，3管理员
      login:'0',
      fileList:''
      
    }
  },
  methods:{
    checkCalendar(){
      this.$router.replace({name:'calendar'})
    },
    checkList(){
      this.$router.replace({name:'list'})
    },
    checkRoom(){
      this.$router.replace({name:'roominfo'})
    },
    addOrder(){
      this.$router.replace({name:'order'})
    },
    manageAccount() {
      this.$router.replace({name:'account'})
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #homepage{
    background-color: #E9EEF3;
    width: 100%;
    height: 100%;
    position: fixed;
  }
  .main {
    display: flex;
  }
  .admin-options{
    margin: 3% 5% 3% 15%;
    float: left;
    width:40%;
  }
  .option-button{
    width: 300px;
    color: white;
    margin: 3% 0 3% 0;
    float: right;
  }
  .cal-button{
    background: #326199;
  }
  .list-button{
    background: #4FB1A1;
  }
  .info-button{
    background:#FCC055;
  }
  .order-button{
    background:#EB8D50;
  }
  .account-button{
    background:#DF6E5B;
  }
  .box-card {
    width: 100%;
    margin: 8% 15% 5% 10%;
    float: left;
    height: 100%;
  }
  /* .download-button{
    width: 300px;
    color: white;
    height: 60px;
  } */
</style>
