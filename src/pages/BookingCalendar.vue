<template>
  <div class="bookingcalendar">
    <el-container>
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <h2 class="headline">会议室预定系统</h2>
        <el-menu-item index="1">
          预约会议室
        </el-menu-item>
        <el-menu-item index="2">
          我的订单
        </el-menu-item>
        <el-menu-item index="3">
          个人中心
        </el-menu-item>
        <el-menu-item index="4">
          使用指南
        </el-menu-item>
      </el-menu>
      
      <el-container>
        <el-header>
          <el-select v-model="value" placeholder="请选择会议室">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          
        </el-header>
        <el-main>
          <FullCalendar :options="calendarOptions" ref="FullCalendar"/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  name: 'BookingCalendar',
  components:{
    FullCalendar
  },
  data () {
    return {
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      calendarOptions: {
			// 加载的视图
        plugins: [dayGridPlugin,timeGridPlugin,interactionPlugin],
        // 视图类型 初始显示的视图 视图名称规则 比如dayGridPlugin去掉Plugin 加上Month或者Week或者Day
        initialView: 'timeGridWeek',
        // 语言选项  设置为中文后 部分文本会替换为中文 但是不全面
        locale:'zh-cn',
        // 配置日历头部
        // 按钮: prev为切换(上)下一月(/周/日)   next today 跳转到今天    
        // 文本: title 年月(YYYY-MM)
        // 按钮: dayGridMonth月 timeGridWeek周 timeGridDay日
        headerToolbar: {
          left: 'prev,next today',
          // center: 'tittle',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        },
        // 设置各种按钮的文字  默认是英文的
        buttonText:{
          today:'今天',
          month:'月',
          week:'周',
          day:'日',
          list:'表'
        },
        // 初始就存在的事件
        initialEvents: [
         {
          id: 1,
          title: `会议:xxxxxxxxx`,
          start: '2022-04-30' + 'T08:00:00',
          end: '2022-04-30' + 'T10:00:00',
        },
        {
          id: 2,
          title: `会议:xxxxxxxxx`,
          start: '2022-04-29' + 'T08:00:00',
          end: '2022-04-29' + 'T22:00:00',
        }],
        // 是否可拖拽
        editable: true,
        // 是否可选择添加
        selectable: true,
        // 选择时触发函数
        select: this.handleDateSelect,
        // 点击事项触发函数
        eventClick: this.handleEventClick,
        // 移动事项或者拓展事项时间触发函数
        eventsSet: this.handleEvents,
        // 全天行 的文本显示内容
        allDayText: '全天',
        // 最小时间
        slotMinTime:'07:00:00',
        // 最大时间
        slotMaxTime:'24:00:00',
      },
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .headline {
    color:white;
  }
  /* .el-aside {
    background-color: #E9EEF3;
    color: #333;
    line-height: 200px;
  } */
  
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  
</style>
