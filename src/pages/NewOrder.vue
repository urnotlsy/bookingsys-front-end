<template>
  <div id="neworder">
    <HeaderMenu/>
      <el-form 
        :model="ruleForm" 
        :rules="rules" 
        ref="ruleForm" 
        label-width="100px" 
        class="ruleForm">
        <el-form-item 
            label="会议室" 
            prop="room">
            <el-select 
                v-model="ruleForm.room" 
                placeholder="请选择您要预约的会议室">
                <el-option 
                    v-for="item in rooms"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item 
            label="姓名" 
            prop="name"
            required>
            <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item 
            label="联系方式" 
            prop="number" 
            required>
            <el-input v-model="ruleForm.number"></el-input>
        </el-form-item>
        <el-form-item label="会议时间" required>
            <el-col :span="11">
                <el-form-item prop="date">
                    <el-date-picker 
                        type="date" 
                        placeholder="选择日期" 
                        v-model="ruleForm.date1" 
                        style="width: 100%;">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="2">-</el-col>
            <el-col :span="11">
                <el-form-item prop="time">
                    <el-time-picker
                        is-range
                        v-model="ruleForm.time"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        placeholder="选择时间范围">
                    </el-time-picker>
                </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item label="主题" prop="theme">
            <el-input v-model="ruleForm.theme"></el-input>
        </el-form-item>
        <el-form-item label="是否涉及意识形态">
            <el-switch v-model="ruleForm.flag"></el-switch>
        </el-form-item>
        <el-form-item label="备注" prop="note">
            <el-input v-model="ruleForm.note"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        </el-form>

  </div>
</template>

<script>
import HeaderMenu from '../components/HeaderMenu.vue'

export default {
  name: 'NewOrder',
  components: {
    HeaderMenu
  },
  data(){
    return{
        ruleForm:{
            room:'',
            name:'',
            number:'',
            date:'',
            time:'',
            theme:'',
            flag:'',
            note:''
        },
        rules:{

        },
        rooms: [{
            value: 1,
            label: '黄金糕'
            }, {
            value: 2,
            label: '双皮奶'
            }, {
            value: 3,
            label: '蚵仔煎'
            }, {
            value: 4,
            label: '龙须面'
            }, {
            value: 5,
            label: '北京烤鸭'
            }],
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
  #neworder{
    background-color: #E9EEF3;
    width: 100%;
    height: 100%;	
    margin: 0 auto;
    position: fixed;
  }
</style>
