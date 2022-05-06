<template>
  <div id="bookingcalendar">
    <HeaderMenu/>
    <div class="main">
      <div class="choice">
        <span>选择会议室：</span>
        <el-select 
          v-model="roomValue" 
          placeholder="请选择会议室" 
          @change="changeRoom(roomValue)">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.label">
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
          {{this.roomValue}}
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
      </el-descriptions>
      <RecordForm v-if="role==2||role==3"></RecordForm>
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

import RecordForm from '../components/RecordForm.vue'

export default {
  name: 'BookingCalendar',
  components:{
    FullCalendar,
    HeaderMenu,
    RecordForm
  },
  data () {
    return {
      //调试用，之后用全局变量
      role:'3',      //1用户，2物业，3管理员

      //顶部选择器
      roomValue:'',
      options: [{
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
        // 初始就存在的事件
        events: [
         {
          id: 196,
          title: `会议:1xxxxxxxx可能有一个很长很长很长很长很长的主题`,
          start: '2022-04-30' + 'T08:00:00',
          end: '2022-04-30' + 'T10:15:00',
          extendedProps: {
            name:'用户1',
            number: '12345677654'
          }
        },
        {
          id: 222,
          title: `会议:2xxxxxxxx`,
          start: '2022-05-04' + 'T08:15:00',
          end: '2022-05-04' + 'T22:00:00',
          // backgroundColor:'red',
          extendedProps: {
            name:'fkjfb',
            number: '12388886666'
          },
        }],
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
        start:'',
        end:'',
        room:'',
        name:'',
        number:'',
        theme:'',
      }
    }
  },
  //创建页面
  created(){
    this.getRoomID();
  },
  methods:{
    getRoomID(){
      let tmp=this.$route.params.id;
      for(let i=0;i<this.options.length;i++){
        this.roomValue=this.options[i].label;
        if(this.options[i].value==tmp)
          break;
      }
    },
    //点击日历上的事件
    handleEventClick(e){
      this.eventInfo.start=e.event.start;
      this.eventInfo.end=e.event.end;
      this.eventInfo.name=e.event.extendedProps.name;
      this.eventInfo.number=e.event.extendedProps.number;
      this.eventInfo.theme=e.event.title;
      //!!!!!!!!!!!!************处理room的逻辑************!!!!!!!!!!!!————待解决
      this.drawer=true;
    },
    changeRoom(value){
      console.log(value)
    },
    clickToOrder(){
      this.$router.push({name:'order',params: {number:this.roomValue}})
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
</style>
