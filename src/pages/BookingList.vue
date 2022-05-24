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
        class="admin-card">
        <el-table
          ref="filterTable"
          :data="tableData"
          border
          height="650"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="联系方式">
          </el-table-column>
          <el-table-column
            prop="theme"
            label="主题">
          </el-table-column>
          <el-table-column
            prop="flag"
            label="涉及意识形态">
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
            label="备注">
          </el-table-column>
          <el-table-column
            prop="room"
            label="会议室">
          </el-table-column>
          <el-table-column
            prop="order_date"
            label="日期"
            sortable>
          </el-table-column>
          <el-table-column
            prop="start_time"
            label="开始时间"
            sortable>
          </el-table-column>
          <el-table-column
            prop="end_time"
            label="结束时间">
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
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
            label="操作">
            <template slot-scope="scope">
              <el-button 
                v-if="role==1||role==2"
                @click="handleClick(scope.row)" 
                type="primary" 
                plain 
                size="small">
                取消预约
              </el-button>
              <el-button 
                v-if="role==3"
                @click="deleteOrder(scope.row.order_id)" 
                type="danger" 
                plain 
                size="small">
                删除记录
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="审批"
            width="150"
            v-if="role==3">
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
import axios from 'axios'

export default {
  name: 'BookingList',
  components: {
    HeaderMenu
  },
  //创建页面时调用的函数
  created(){
    this.getOrder();
  },
  methods: {
    getOrder(){
      axios.get("http://localhost:9090/order")
      .then((res)=>{
        this.tableData=res.data
      }).catch(function (error){
        console.log(error)
      })
    },
    deleteOrder(order_id){
      axios.delete("http://localhost:9090/order/"+order_id)
      .then(()=>{
        location. reload()     //刷新页面
      }).catch(function (error){
          console.log(error)
      })
    },
    //取消订单
    handleClick(row) {
      let now = new Date();
      let start_time = new Date(row.order_date+' '+row.start_time);
      if(now-start_time>=0){
        this.$message({
          type: 'info',
          message: '不可以取消过去的预约'
        });
      }else{
        this.deleteOrder(row.order_id)
      }
    },
      filterTag(value, row) {
        return row.state === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      passClick(row){
        //state=2为通过
        axios({url:'http://localhost:9090/order/check',
          method:'post',
          params:{
            order_id:row.order_id, 
            state:2
          }
        }).then(()=>{
          this.$message({
            type: 'info',
            message: '已成功设置'
          });
        }).catch(function (error){
            console.log(error)
        })
      },
      refuseClick(row){
        //state=3为拒绝
        axios({url:'http://localhost:9090/order/check',
          method:'post',
          params:{
            order_id:row.order_id, 
            state:3
          }
        }).then(()=>{
          this.$message({
            type: 'info',
            message: '已成功设置'
          });
        }).catch(function (error){
            console.log(error)
        })
      }
  },
  data(){
    return{
      //调试用，之后用全局变量
      role:'3',      //1用户，2物业，3管理员

      tableData: []
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
