<template>
    <div id="record-form">
        <span class="head-line">使用记录</span>
        <el-form 
            :model="recordForm" 
            label-width="12%" 
            class="demo-ruleForm">
            <el-form-item 
                label="记录" 
                prop="record">
                <el-input 
                    type="textarea"
                    placeholder="对会议室使用情况做简单记录" 
                    v-model="record"
                    maxlength="200">
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
            record:''
            
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