<template>
    <div id="personal-center">
        <HeaderMenu/>
        <div class="main">
            <el-form
                :model="userInfo"
                :rules="rules"
                ref="userInfo" 
                label-width="10%" 
                class="userInfo">
                <el-form-item
                    label="姓名"
                    prop="name">
                    <el-input 
                        v-model="userInfo.name"
                        placeholder="请输入姓名">
                    </el-input>
                </el-form-item>
                <el-form-item 
                    label="联系方式" 
                    prop="phone">
                    <el-input 
                        v-model="userInfo.phone"
                        placeholder="请输入手机号码">
                    </el-input>
                </el-form-item>
                <el-form-item 
                    label="密码" 
                    prop="pass">
                    <el-input 
                        type="password" 
                        v-model="userInfo.pass" 
                        autocomplete="off">
                    </el-input>
                </el-form-item>
                <el-form-item 
                    label="确认密码" 
                    prop="checkPass">
                    <el-input 
                        type="password" 
                        v-model="userInfo.checkPass" 
                        autocomplete="off">
                    </el-input>
                </el-form-item>
                <el-form-item>
            <el-button 
                type="primary" 
                @click="submitForm('userInfo')">
                修改
            </el-button>
            <el-button @click="backToHome">取消</el-button>
        </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import HeaderMenu from '../components/HeaderMenu.vue'
import axios from 'axios'

export default{
    name:'PersonalCenter',
    components:{
        HeaderMenu
    },
    data(){
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.userInfo.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return{
            userInfo:{
                user_id: 11,
                name:'',
                phone:'',
                pass:'',
                checkPass:''
            },
            rules:{
                name:[{required: true, message: '请输入姓名', trigger: 'blur'}],
                phone:[{required: true, message: '请输入手机号码', trigger: 'blur'}],
                pass: [{ validator: validatePass, trigger: 'blur' }],
                checkPass: [{ validator: validatePass2, trigger: 'blur' }],
            }
        }
        
    },
    methods:{
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios({url:'http://localhost:9090/user/update',
                        method:'post',
                        data:{
                            user_id: this.userInfo.user_id,
                            name: this.userInfo.name,
                            phone: this.userInfo.phone,
                            password: this.userInfo.pass
                        }
                    }).then(()=>{
                        this.$message({
                            type: 'info',
                            message: '已成功修改'
                        });
                    }).catch(function (error){
                        console.log(error)
                    })
                } else {
                    alert('error submit!!');
                    return false;
                }
            });
        },
        backToHome(){
            this.$router.push('/homepage')
        }
    }
}
</script>

<style scoped>
#personal-center{
    background-color: #E9EEF3;
    width: 100%;
    height: 100%;
    position: fixed;
}
.main{
    height: 100%;
}
.userInfo{
    width: 80%;
    padding-top: 3%;
    margin: 0 auto;
}
</style>
