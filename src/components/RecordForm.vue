<template>
    <div id="record-form">
        <span class="head-line">使用记录</span>
        <el-form 
            :model="recordForm" 
            label-width="18%" 
            class="demo-ruleForm">
            <el-form-item 
                label="是否有违规行为" 
                prop="illegal">
                <el-switch v-model="recordForm.illegal"></el-switch>
            </el-form-item>
            <el-form-item 
                label="记录" 
                prop="record">
                <el-input 
                    type="textarea" 
                    v-model="recordForm.record">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button 
                    type="primary" 
                    @click="submitForm">
                    提交
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

export default{
    name:'RecordForm',
    data(){
        return{
            recordForm:{
                illegal:false,
                record:''
            }
        }
    },
    methods:{
        submitForm() {
            console.log('submit!');
        }
    }
}
</script>

<style scoped>
#record-form{
    margin: 3% 3% 1% 3%;
}
.head-line{
    font-weight: bold;
    font-size: 15px;
}
</style>