<template>
  <div id="account-management">
    <HeaderMenu/>
    <div class="main">
        <div class="add-account">
            <el-button 
                type="primary" 
                class="add-button"
                @click="dialogVisible=true">
                添加账号
            </el-button>
            <el-dialog
                title="添加账号"
                :visible.sync="dialogVisible"
                width="70%"
                :before-close="handleClose"
                append-to-body>
                <el-form
                    :model="newAccount"
                    label-width="10%"
                    ref="newAccount">
                    <el-form-item 
                        label="学号/工号" 
                        prop="user_id"
                        required>
                        <el-input 
                            v-model="newAccount.user_id"
                            placeholder="请输入学号或工号"
                            type="number">
                        </el-input>
                    </el-form-item>
                    <el-form-item 
                        label="姓名" 
                        prop="name"
                        reuqired>
                        <el-input 
                            v-model="newAccount.name"
                            placeholder="请输入姓名">
                        </el-input>
                    </el-form-item>
                    <el-form-item 
                        label="联系方式" 
                        prop="phone">
                        <el-input 
                            v-model="newAccount.phone"
                            placeholder="请输入联系方式">
                        </el-input>
                    </el-form-item>
                    <el-form-item
                        label="角色权限" 
                        prop="role"
                        required>
                        <template>
                            <el-radio v-model="newAccount.role" label="user">用户</el-radio>
                            <el-radio v-model="newAccount.role" label="guard">物业</el-radio>
                            <el-radio v-model="newAccount.role" label="admin">管理员</el-radio>
                        </template>                                                         
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="resetForm('newAccount')">重 置</el-button>
                        <el-button type="primary" @click="submitNewAccount('newAccount')">确 定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
        <el-card class="card">
            <el-table
                ref="filterTable"
                :data="accountData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                border
                height="550"
                style="width: 100%">
                <el-table-column
                    prop="user_id"
                    label="学号/工号"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    prop="phone"
                    label="联系方式">
                </el-table-column>
                <el-table-column
                    prop="role"
                    label="角色"
                    :filters="[{ text: '用户', value: 'user' }, { text: '物业', value: 'guard' }, { text: '管理员', value: 'admin' }]"
                    :filter-method="filterChar"
                    filter-placement="bottom-end">
                    <template slot-scope="scope">
                    <el-tag
                        :type="scope.row.role == 'user' ? 'primary' : scope.row.role == 'guard' ? 'success' : 'warning'"
                        disable-transitions>
                        {{scope.row.role == 'user' ? '用户' : scope.row.role == 'guard' ? '物业' : '管理员'}}
                    </el-tag>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template slot="header" slot-scope="scope">
                        <el-input
                        v-model="search"
                        placeholder="输入姓名搜索"/>
                    </template>
                    <template slot-scope="scope">
                        <el-button 
                            @click="resetPass(scope.row)" 
                            type="primary" 
                            size="small">
                            重置密码
                        </el-button>
                        <el-button 
                            @click="deleteAccount(scope.row)" 
                            type="danger" 
                            size="small">
                            注销账号
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-card>
    </div>
  </div>
</template>

<script>
import HeaderMenu from '../components/HeaderMenu.vue'
import axios from 'axios'

export default {
  name: 'AccountManagement',
  components: {
    HeaderMenu
  },
  data(){
    return{
        dialogVisible:false,
        newAccount:{
            user_id:'',
            name:'',
            phone:'',
            role:''
        },
        accountData:[],
        search: '',
        currentPage: 1,
        pageSize: 10,
        total:0,
    }
  },
  //创建页面时调用的函数
  created(){
      this.getAcoount();
  },
  methods:{
        //查询账号数据
        getAcoount(){
            axios.get("http://localhost:9090/user/page",{
                params:{
                    pageNum: this.currentPage,
                    pageSize: this.pageSize
                }
            }).then((res)=>{
                this.accountData=res.data.data
                this.total=res.data.total
            }).catch(function (error){
                console.log(error)
            })
        },
        //分页
        handleSizeChange(val) {
            this.pageSize=val;
            this.getAcoount();
        },
        handleCurrentChange(val) {
            this.currentPage=val;
            this.getAcoount();
        },
        //表格筛选
        filterChar(value, row) {
            return row.role === value;
        },
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        },
        //重置密码
        resetPass(row){
            axios.get("http://localhost:9090/user/reset",{
                params:{
                    user_id:row.user_id
                }
            }).then(()=>{
                this.$message({
                    type: 'info',
                    message: '已重置密码'
                });
            }).catch(function (error){
                console.log(error)
            })
        },
        //注销账号
        deleteAccount(row){
            this.$confirm('此操作将永久注销该账号, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios
                .delete("http://localhost:9090/user/"+row.user_id)
                .catch(function (error){
                    console.log(error)
                })
                location. reload()     //删除账号以后刷新页面
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });          
            });
        },
        handleClose() {
            this.dialogVisible = false;
        },
        //添加新帐号
        submitNewAccount(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios({url:'http://localhost:9090/user/insert',
                        method:'post',
                        data:{
                            user_id: this.newAccount.user_id,
                            name: this.newAccount.name,
                            phone: this.newAccount.phone,
                            role: this.newAccount.role
                        }
                    }).then(()=>{
                        this.$message({
                            type: 'info',
                            message: '已成功添加'
                        });
                        location. reload()     //新建账号以后刷新页面
                    }).catch(function (error){
                        console.log(error)
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
  }
}
</script>

<style scoped>
  #account-management{
    background-color: #E9EEF3;
    width: 100%;
    height: 100%;	
    margin: 0 auto;
    position: fixed;
  }
  .add-account{
    padding-top: 0.5%;
    padding-bottom: 0.5%;
    text-align: right;
  }
  .add-button{
    margin-right: 3%;
  }
</style>
