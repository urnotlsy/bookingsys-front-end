<template>
  <div id="bookinglist">
    <HeaderMenu/>
    <div class="main">
      <el-card class="card">
        <el-table
          ref="filterTable"
          :data="tableData"
          border
          height="650"
          style="width: 100%">
          <el-table-column
            prop="id"
            label="订单号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="100">
          </el-table-column>
          <el-table-column
            prop="number"
            label="联系方式"
            width="160">
          </el-table-column>
          <el-table-column
            prop="theme"
            label="主题">
          </el-table-column>
          <el-table-column
            prop="room"
            label="会议室"
            width="100">
          </el-table-column>
          <el-table-column
            prop="start"
            label="开始时间"
            width="200">
          </el-table-column>
          <el-table-column
            prop="end"
            label="结束时间"
            width="200">
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            width="110"
            :filters="[{ text: '未审核', value: 1 }, { text: '已通过', value: 2 }, { text: '已失败', value: 3 }]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.state == 1 ? 'info' : scope.row.state == 2 ? 'success' : 'danger'"
                disable-transitions>{{scope.row.state == 1 ? '未审核' : scope.row.state == 2 ? '已通过' : '已失败'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button 
                @click="handleClick(scope.row)" 
                type="primary" 
                plain 
                size="small">
                取消预约
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
  name: 'BookingList',
  components: {
    HeaderMenu
  },
  methods: {
    //取消订单
      handleClick(row) {
        console.log(row);
      },
      filterTag(value, row) {
        return row.state === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      }
  },
  data(){
    return{
      tableData: [{
          id:1234,
          name: '王小虎',
          number:'17625342266',
          theme: '上海市普陀区金沙江路 1518 弄',
          room:403,
          start:'2022-05-15 19:00:00',
          end:'2022-05-15 21:00:00',
          state:1
        },{
          id:1234,
          name: '王小虎',
          number:'17625342266',
          theme: '上海市普陀区金沙江路 1518 弄',
          room:403,
          start:'2022-05-15 19:00:00',
          end:'2022-05-15 21:00:00',
          state:2
        },{
          id:1234,
          name: '王小虎',
          number:'17625342266',
          theme: '上海市普陀区金沙江路 1518 弄',
          room:403,
          start:'2022-05-15 19:00:00',
          end:'2022-05-15 21:00:00',
          state:3
        },{
          id:1234,
          name: '王小虎',
          number:'17625342266',
          theme: '上海市普陀区金沙江路 1518 弄',
          room:403,
          start:'2022-05-15 19:00:00',
          end:'2022-05-15 21:00:00',
          state:1
        },{
          id:1234,
          name: '王小虎',
          number:'17625342266',
          theme: '上海市普陀区金沙江路 1518 弄',
          room:403,
          start:'2022-05-15 19:00:00',
          end:'2022-05-15 21:00:00',
          state:2
        },{
          id:1234,
          name: '王小虎',
          number:'17625342266',
          theme: '上海市普陀区金沙江路 1518 弄',
          room:403,
          start:'2022-05-15 19:00:00',
          end:'2022-05-15 21:00:00',
          state:3
        },{
          id:1234,
          name: '王小虎',
          number:'17625342266',
          theme: '上海市普陀区金沙江路 1518 弄',
          room:403,
          start:'2022-05-15 19:00:00',
          end:'2022-05-15 21:00:00',
          state:1
        },{
          id:1234,
          name: '王小虎',
          number:'17625342266',
          theme: '上海市普陀区金沙江路 1518 弄',
          room:403,
          start:'2022-05-15 19:00:00',
          end:'2022-05-15 21:00:00',
          state:2
        },{
          id:1234,
          name: '王小虎',
          number:'17625342266',
          theme: '上海市普陀区金沙江路 1518 弄',
          room:403,
          start:'2022-05-15 19:00:00',
          end:'2022-05-15 21:00:00',
          state:3
        },{
          id:1234,
          name: '王小虎',
          number:'17625342266',
          theme: '上海市普陀区金沙江路 1518 弄',
          room:403,
          start:'2022-05-15 19:00:00',
          end:'2022-05-15 21:00:00',
          state:1
        },{
          id:1234,
          name: '王小虎',
          number:'17625342266',
          theme: '上海市普陀区金沙江路 1518 弄',
          room:403,
          start:'2022-05-15 19:00:00',
          end:'2022-05-15 21:00:00',
          state:2
        },{
          id:1234,
          name: '王小虎',
          number:'17625342266',
          theme: '上海市普陀区金沙江路 1518 弄',
          room:403,
          start:'2022-05-15 19:00:00',
          end:'2022-05-15 21:00:00',
          state:3
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
    /* overflow-y: scroll; */
    margin: 0 auto;
    position: fixed;
  }
  
</style>
