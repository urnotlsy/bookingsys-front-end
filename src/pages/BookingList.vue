<template>
  <div id="bookinglist">
    <HeaderMenu/>
    <div class="main">
      <el-card class="card">
        <el-table
          :data="tableData"
          border
          height="100%"
          :row-class-name="tableRowClassName"
          style="width: 100%">
          
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="theme"
            label="主题">
          </el-table-column>
          <el-table-column
            prop="room"
            label="会议室">
          </el-table-column>
          <el-table-column
            prop="start"
            label="开始时间">
          </el-table-column>
          <el-table-column
            prop="end"
            label="结束时间">
          </el-table-column>
          <!-- <el-table-column
            prop="state"
            label="状态">
          </el-table-column> -->
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import HeaderMenu from '../components/HeaderMenu.vue'

export default {
  name: 'BookingList',
  components: {
    HeaderMenu
  },
  methods: {
    tableRowClassName({state}) {
      if (state === 2) {
        return 'warning-row';
      } else if (state === 3) {
        return 'success-row';
      }
      return '';
    }
  },
  data(){
    return{
      tableData: [{
            name: '王小虎',
            theme: '上海市普陀区金沙江路 1518 弄',
            room:403,
            start:'2022-05-15 19:00:00',
            end:'2022-05-15 21:00:00',
            state:1
          },{
            name: '王小虎',
            theme: '上海市普陀区金沙江路 1518 弄',
            room:403,
            start:'2022-05-15 19:00:00',
            end:'2022-05-15 21:00:00',
            state:2
          },{
            name: '王小虎',
            theme: '上海市普陀区金沙江路 1518 弄',
            room:403,
            start:'2022-05-15 19:00:00',
            end:'2022-05-15 21:00:00',
            state:1
          },{
            name: '王小虎',
            theme: '上海市普陀区金沙江路 1518 弄',
            room:403,
            start:'2022-05-15 19:00:00',
            end:'2022-05-15 21:00:00',
            state:3
          },{
            name: '王小虎',
            theme: '上海市普陀区金沙江路 1518 弄',
            room:403,
            start:'2022-05-15 19:00:00',
            end:'2022-05-15 21:00:00',
            state:1
          },{
            name: '王小虎',
            theme: '上海市普陀区金沙江路 1518 弄',
            room:403,
            start:'2022-05-15 19:00:00',
            end:'2022-05-15 21:00:00',
            state:1
          }]
    }
  }
}
</script>

<style scoped>
  #bookinglist{
    background-color: #E9EEF3;
    width: 100%;
    height: 100%;	
    overflow-y: scroll;
    margin: 0 auto;
    position: fixed;
  }
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  /* .main {
    display: flex;
  } */
</style>
