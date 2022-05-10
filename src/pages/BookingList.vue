<template>
  <div id="bookinglist">
    <HeaderMenu/>
    <div class="main">
      <div 
        class="export-records"
        v-if="role==3">
        <el-button 
          type="primary" 
          class="export-button">
          导出会议记录
        </el-button>
      </div>
      <el-card 
        class="card"
        v-if="role==1||role==2">
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
      
      <el-card 
        class="admin-card"
        v-else-if="role==3">
        <el-table
          ref="filterTable"
          :data="adminTableData"
          border
          height="650"
          style="width: 100%">
          
          <el-table-column
            prop="name"
            label="姓名"
            width="80">
          </el-table-column>
          <el-table-column
            prop="number"
            label="联系方式"
            width="120">
          </el-table-column>
          <el-table-column
            prop="theme"
            label="主题">
          </el-table-column>
          <el-table-column
            prop="flag"
            label="涉及意识形态"
            width="120">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.flag == true ?  'danger' : 'info'"
                disable-transitions>
                {{scope.row.flag == true ? '是' : '否'}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="note"
            label="备注"
            width="150">
          </el-table-column>
          <el-table-column
            prop="room"
            label="会议室"
            width="80">
          </el-table-column>
          <el-table-column
            prop="start"
            label="开始时间"
            sortable
            width="170">
          </el-table-column>
          <el-table-column
            prop="end"
            label="结束时间"
            width="170">
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            width="90"
            :filters="[{ text: '未审核', value: 1 }, { text: '已通过', value: 2 }, { text: '已失败', value: 3 }]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.state == 1 ? 'info' : scope.row.state == 2 ? 'success' : 'danger'"
                disable-transitions>
                {{scope.row.state == 1 ? '未审核' : scope.row.state == 2 ? '已通过' : '已失败'}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="110">
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
          <el-table-column
            label="审批"
            width="150">
            <template slot-scope="scope">
              <el-button 
                @click="passClick(scope.row)" 
                type="success" 
                size="small"
                :disabled="scope.row.state == 1 ? false : true">
                通过
              </el-button>
              <el-button 
                @click="refuseClick(scope.row)" 
                type="danger" 
                size="small"
                :disabled="scope.row.state == 1 ? false : true">
                拒绝
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
        console.log('取消'+row.id);
      },
      filterTag(value, row) {
        return row.state === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      passClick(row){
        console.log('通过'+row.id);
        //post后端，提示成功or错误信息，刷新页面
      },
      refuseClick(row){
        console.log('拒绝'+row.id);
        //post后端，提示成功or错误信息，刷新页面
      }
  },
  data(){
    return{
      //调试用，之后用全局变量
      role:'3',      //1用户，2物业，3管理员

      tableData: [{
          id:1234,
          name: '王小虎',
          number:'17625342266',
          theme: '上海市普陀区金沙江路 1518 弄',
          room:403,
          start:'2022-05-15 17:00:00',
          end:'2022-05-15 21:00:00',
          state:1
        },{
          id:1234,
          name: '王小虎',
          number:'17625342266',
          theme: '上海市普陀区金沙江路 1518 弄',
          room:403,
          start:'2022-05-15 18:00:00',
          end:'2022-05-15 21:00:00',
          state:2
        },{
          id:1234,
          name: '王小虎',
          number:'17625342266',
          theme: '上海市普陀区金沙江路 1518 弄',
          room:403,
          start:'2022-05-05 19:00:00',
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
        }],
      adminTableData:[{
          id:1234,
          name: '王小虎',
          number:'17625342266',
          theme: '开会',
          note:'时长超过三小时',
          flag:true,
          room:403,
          start:'2022-05-15 17:00:00',
          end:'2022-05-15 21:00:00',
          state:1
        },{
          id:1234,
          name: '王小虎',
          number:'17625342266',
          theme: '上海市普陀区金沙江路 1518 弄',
          note:'',
          flag:false,
          room:403,
          start:'2022-05-15 18:00:00',
          end:'2022-05-15 21:00:00',
          state:2
        },{
          id:1234,
          name: '王小虎',
          number:'17625342266',
          theme: '上海市普陀区金沙江路 1518 弄如果有一个很长很长很长很长的主题',
          note:'',
          flag:false,
          room:403,
          start:'2022-05-05 19:00:00',
          end:'2022-05-15 21:00:00',
          state:3
        },{
          id:1234,
          name: '王小虎',
          number:'17625342266',
          theme: '上海市普陀区金沙江路 1518 弄',
          note:'',
          flag:false,
          room:403,
          start:'2022-05-15 19:00:00',
          end:'2022-05-15 21:00:00',
          state:1
        },{
          id:1234,
          name: '王小虎',
          number:'17625342266',
          theme: '上海市普陀区金沙江路 1518 弄',
          note:'',
          flag:true,
          room:403,
          start:'2022-05-13 19:00:00',
          end:'2022-05-13 21:00:00',
          state:2
        },{
          id:1234,
          name: '王小虎',
          number:'17625342266',
          theme: '上海市普陀区金沙江路 1518 弄',
          note:'',
          flag:false,
          room:403,
          start:'2022-05-15 9:00:00',
          end:'2022-05-15 11:00:00',
          state:3
        }
      ]
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
  .export-records{
    padding-top: 0.5%;
    padding-bottom: 0.5%;
    text-align: right;
  }
  .export-button{
    margin-right: 3%;
  }
  
</style>
