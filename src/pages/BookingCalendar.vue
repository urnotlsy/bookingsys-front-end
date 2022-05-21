<template>
  <div id="bookingcalendar">
    <HeaderMenu/>
    <div class="main">
      <div class="choice">
        <span>选择会议室：</span>
        <el-select 
          v-model="roomValue" 
          placeholder="请选择会议室" 
          @change="changeRoom">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button 
          @click="clickToOrder" 
          type="primary" 
          style="margin-left:10px">
          预约会议室
        </el-button>
      </div>
      <div class="calendar">
        <FullCalendar 
          :options="calendarOptions" 
          ref="FullCalendar"/>
      </div>
    </div>
    <el-drawer
      title="详细信息"
      :with-header="false"
      :visible.sync="drawer"
      direction="ltr"
      append-to-body
      size="50%">
      <el-descriptions 
        class="descriptions" 
        title="详细信息" 
        :column="1"  
        border>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-date"></i>
            开始时间
          </template>
          {{eventInfo.start}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-date"></i>
            结束时间
          </template>
          {{eventInfo.end}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            会议室
          </template>
          {{eventInfo.room}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            预约人
          </template>
          {{eventInfo.name}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            联系方式
          </template>
          {{eventInfo.number}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-star-off"></i>
            主题
          </template>
          {{eventInfo.theme}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-magic-stick"></i>
            状态
          </template>
          <el-tag
            :type="eventInfo.state == 1 ? 'info' : eventInfo.state == 2 ? 'success' : 'danger'"
            disable-transitions>
            {{eventInfo.state == 1 ? '未审核' : eventInfo.state == 2 ? '已通过' : '已失败'}}
          </el-tag>
        </el-descriptions-item>
      </el-descriptions>
      <template v-if="role==2||role==3">
        <div id="record-form">
          <span class="head-line">使用记录</span>
          <el-form 
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
    </el-drawer>
  </div>
</template>

<script>
import HeaderMenu from '../components/HeaderMenu.vue'
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import axios from 'axios'

export default {
  name: 'BookingCalendar',
  components:{
    FullCalendar,
    HeaderMenu
  },
  data () {
    return {
      //调试用，之后用全局变量
      role:'3',      //1用户，2物业，3管理员

      //顶部选择器
      roomValue:'',
      options: [],

      //calendar加载的视图
      calendarOptions: {
        // 视图类型 初始显示的视图 视图名称规则 比如dayGridPlugin去掉Plugin 加上Month或者Week或者Day
        plugins: [dayGridPlugin,timeGridPlugin,interactionPlugin],
        initialView: 'timeGridWeek',
        //一周的第一天为周一
        firstDay:1,
        fixedWeekCount:false,
        // 语言选项  设置为中文后 部分文本会替换为中文 但是不全面
        locale:'zh-cn',
        //日历标题固定
        stickyHeaderDates:true,
        //月视图下日历格子宽度和高度的比例
        aspectRatio: 1.5,
        //agenda视图下是否显示all-day
        allDaySlot: false,
        // 配置日历头部
        headerToolbar: {
          left: 'prev,next today',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        },
        // 设置各种按钮的中文
        buttonText:{
          today:'今天',
          month:'月',
          week:'周',
          day:'日'
        },
        // 会议事件
        events: [],
        // 是否可拖拽
        editable: false,
        // 点击事项触发函数
        eventClick: this.handleEventClick,
        // 最小时间
        slotMinTime:'08:00:00',
        // 最大时间
        slotMaxTime:'22:00:00',
      },

      //drawer
      drawer:false,
      eventInfo:{
        id:'',
        start:'',
        end:'',
        room:'',
        name:'',
        number:'',
        theme:'',
        state:''
      },
      record:''
    }
  },
  //创建页面
  created(){
    this.getRoomNumber();
    this.getRoomID();
  },
  methods:{
    getRoomNumber(){
      axios.get("http://localhost:9090/room/getNumber")
      .then((res)=>{
          this.options=res.data
      }).catch(function (error){
          console.log(error)
      })
    },
    //从会议室列表跳转过来
    getRoomID(){
      let tmp=this.$route.params.id;
      this.roomValue=tmp;
      if(this.roomValue!=undefined)
        this.getMeeting();
      
    },
    //获取日历上的会议事件
    getMeeting(){
      axios.get("http://localhost:9090/order/getByRoom",{
        params:{
          room_id:this.roomValue
        }
      }).then((res)=>{
          this.calendarOptions.events=res.data;
          for(let i=0;i<res.data.length;i++){
            if(res.data[i].extendedProps.state==1)
              this.$set(this.calendarOptions.events[i], 'backgroundColor', 'grey')
          }
          console.log(res)
      }).catch(function (error){
          console.log(error)
      })
    },
    //点击日历上的事件
    handleEventClick(e){
      this.eventInfo.id=e.event.id;
      this.eventInfo.start=e.event.start;
      this.eventInfo.end=e.event.end;
      this.eventInfo.name=e.event.extendedProps.name;
      this.eventInfo.number=e.event.extendedProps.phone;
      this.eventInfo.theme=e.event.title;
      this.eventInfo.room=e.event.extendedProps.room_number;
      this.eventInfo.state=e.event.extendedProps.state;
      this.drawer=true;
    },
    changeRoom(){
      this.getMeeting();
    },
    clickToOrder(){
      this.$router.push({name:'order',params: {number:this.roomValue}})
    },
    submitForm(){
      console.log('submit!'+this.eventInfo.id);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #bookingcalendar{
    background-color: #E9EEF3;
    width: 100%;
    height: 100%;	
    overflow-y: scroll;
    margin: 0 auto;
    position: fixed;
  }
  .choice, .descriptions{
    margin: 1% 3% 1% 3%;
  }
  #record-form{
    margin: 3% 3% 1% 3%;
}
.head-line{
    font-weight: bold;
    font-size: 15px;
}
</style>
