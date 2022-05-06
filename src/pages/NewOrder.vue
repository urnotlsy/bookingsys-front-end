<template>
  <div id="neworder">
    <HeaderMenu/>
      <el-form 
        :model="ruleForm" 
        :rules="rules" 
        ref="ruleForm" 
        label-width="10%" 
        class="ruleForm">
        <el-form-item 
            label="会议室" 
            prop="room">
            <el-select 
                v-model="ruleForm.room" 
                placeholder="请选择您要预约的会议室"
                style="width:100%">
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
            prop="name">
            <el-input 
              v-model="ruleForm.name"
              placeholder="请输入姓名">
            </el-input>
        </el-form-item>
        <el-form-item 
            label="联系方式" 
            prop="number">
            <el-input 
              v-model="ruleForm.number"
              placeholder="请输入手机号码">
              </el-input>
        </el-form-item>
        <span class="notes">
          注意：只能预约30天内的会议室，可预约时间为8：00-22：00，原则上单次会议不超过三小时。
        </span>
        <el-form-item label="会议时间" required>
            <el-col :span="11">
                <el-form-item prop="date">
                    <el-date-picker 
                        type="date" 
                        placeholder="选择日期" 
                        v-model="ruleForm.date" 
                        style="width: 100%;">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col 
              :span="2" 
              style="text-align:center">
              -
            </el-col>
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
        <el-form-item 
          label="主题" 
          prop="theme" 
          required>
            <el-input 
              v-model="ruleForm.theme" 
              placeholder="不超过50字的会议主题">
            </el-input>
        </el-form-item>
        <el-form-item label="涉及意识形态">
          <el-switch 
            v-model="ruleForm.flag"
            active-text="有"
            inactive-text="无">
          </el-switch>
          <span style="color: grey">
            【注意】：如果会议内容涉及意识形态领域，务请在会前经学院党委审核。
          </span>
        </el-form-item>
        <el-form-item 
          label="备注" 
          prop="note" >
            <el-input 
              v-model="ruleForm.note" 
              type="textarea"
              placeholder="若有任何问题，请在此处留言">
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button 
              type="primary" 
              @click="submitForm('ruleForm')">
              立即预约
            </el-button>
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
  created(){
    this.ruleForm.room=this.$route.params.number;
  },
  data(){
    var checkDate = (rule,value,callback) => {
      if(!value){
        return callback(new Error('日期不能为空！'));
      }
      let today = new Date();
      let gapDays=(value-today)/(24 * 3600 * 1000);               //date以毫秒为单位
      if(gapDays<-1){                                             //当日的gapDays为0
        callback(new Error('不能预约过去的时间'));
      }else if(gapDays>30){
        callback(new Error('只能预约30天内的时间'))
      }
    };
    var checkTime = (rule,value,callback) => {
      let startHour=value[0].getHours();
      let endHour=value[1].getHours();
      let endMinute=value[1].getMinutes();
      let endSecond=value[1].getSeconds();
      if(startHour<8||endHour>22||(endHour==22&&(endMinute>0||endSecond>0))){
        callback(new Error('可预约时间为8:00-22:00'));
      }
      if(this.ruleForm.date==''){
        callback(new Error('请选择日期'));
      }else{
        let now = new Date();
        let gapDays=(this.ruleForm.date-now)/(24 * 3600 * 1000);
        if(gapDays<0&&value[0]<=now){                               //预约日期在今天
          callback(new Error('不能预约过去的时间'));
        }
      }
    };
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
        room:[{required: true, message: '请选择会议室', trigger: 'change'}],
        name:[{required: true, message: '请输入姓名', trigger: 'blur'}],
        number:[{required: true, message: '请输入手机号码', trigger: 'blur'}],
        date:[{type: 'date', required: true, message: '请选择日期', trigger: 'change'},
              {validator: checkDate, trigger: 'change'}],
        time:[{type: 'array', required: true, message: '请选择时间', trigger: 'change' },
              {validator: checkTime, trigger: 'change'}],
        theme:[{max: 50, message: '长度不超过50个字符', trigger: 'blur'},
                {required: true, message: '请输入主题', trigger: 'blur'}]
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
        }
      ]
    }
  },
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
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
  #neworder{
    background-color: #E9EEF3;
    width: 100%;
    height: 100%;	
    margin: 0 auto;
    position: fixed;
  }
  .ruleForm{
    margin: 1% 3% 1% 3%;
    text-align: left;
  }
  .notes{
    margin-left: 10%;
    font-size: 14px;
    color: grey;
  }
</style>
