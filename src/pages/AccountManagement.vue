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
                        prop="id"
                        required>
                        <el-input 
                            v-model="newAccount.id"
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
                        prop="number">
                        <el-input 
                            v-model="newAccount.number"
                            placeholder="请输入联系方式">
                        </el-input>
                    </el-form-item>
                    <el-form-item 
                        label="初始密码" 
                        prop="pass"
                        required>
                        <el-input 
                            v-model="newAccount.pass"
                            placeholder="请输入初始密码"
                            show-password>
                        </el-input>
                    </el-form-item>
                    <el-form-item
                        label="角色权限" 
                        prop="character"
                        required>
                        <template>
                            <el-radio v-model="newAccount.character" label="1">用户</el-radio>
                            <el-radio v-model="newAccount.character" label="2">物业</el-radio>
                            <el-radio v-model="newAccount.character" label="3">管理员</el-radio>
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
                :data="accountData"
                border
                height="650"
                style="width: 100%">
                <el-table-column
                    prop="id"
                    label="学号/工号"
                    sortable>
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    prop="number"
                    label="联系方式">
                </el-table-column>
                <el-table-column
                    prop="character"
                    label="角色"
                    :filters="[{ text: '用户', value: 1 }, { text: '物业', value: 2 }, { text: '管理员', value: 3 }]"
                    :filter-method="filterChar"
                    filter-placement="bottom-end">
                    <template slot-scope="scope">
                    <el-tag
                        :type="scope.row.character == 1 ? 'primary' : scope.row.character == 2 ? 'success' : 'warning'"
                        disable-transitions>
                        {{scope.row.character == 1 ? '用户' : scope.row.character == 2 ? '物业' : '管理员'}}
                    </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button 
                            @click="deleteAccount(scope.row)" 
                            type="danger" 
                            size="small">
                            注销账号
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
  </div>
</template>

<script>
import HeaderMenu from '../components/HeaderMenu.vue'

export default {
  name: 'AccountManagement',
  components: {
    HeaderMenu
  },
  data(){
    return{
        dialogVisible:false,
        newAccount:{
            id:'',
            name:'',
            number:'',
            pass:'',
            character:''
        },
        accountData:[{
                id:'1653998',
                name:'小王',
                number:'13566778877',
                character:1,
            },{
                id:'1753886',
                name:'刘一一',
                number:'17688997777',
                character:1,
            },{
                id:'1553998',
                name:'王田',
                number:'15366778877',
                character:2,
            },{
                id:'1253886',
                name:'李一',
                number:'17688997777',
                character:3,
            },{
                id:'1853886',
                name:'张亮',
                number:'17655897777',
                character:1,
            }
        ]
    }
  },
  methods:{
        filterChar(value, row) {
            return row.character === value;
        },
        filterBlacklist(value, row) {
            return row.blacklist === value;
        },
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] === value;
        },
        deleteAccount(row){
            this.$confirm('此操作将永久注销该账号, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log('注销'+row.id);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        handleClose() {
            this.dialogVisible = false;
        },
        submitNewAccount(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(this.newAccount);
                    alert('submit!');
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
