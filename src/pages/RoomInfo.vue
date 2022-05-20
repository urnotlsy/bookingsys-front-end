<template>
  <div id="roominfo">
    <HeaderMenu/>
    <div class="main">
      <div class="room-add" v-if="role==3">
        <el-button 
          type="primary" 
          @click="dialogVisible = true"
          class="add-button">
          新建会议室
        </el-button>
        <el-dialog
          title="新建会议室"
          :visible.sync="dialogVisible"
          width="70%"
          :before-close="handleClose"
          append-to-body>
          <el-form
            :model="newRoom"
            label-width="10%"
            :rules="rules"
            ref="newRoom">
            <el-form-item 
              label="会议室" 
              prop="room_number">
              <el-input 
                v-model="newRoom.room_number"
                placeholder="请输入会议室编号">
              </el-input>
            </el-form-item>
            <el-form-item 
              label="容量" 
              prop="capacity">
              <el-input 
                v-model="newRoom.capacity"
                placeholder="请输入会议室可容纳人数"
                type="number">
              </el-input>
            </el-form-item>
            <el-form-item 
              label="多媒体设备" 
              prop="media">
              <el-switch 
                v-model="newRoom.media"
                active-text="有"
                inactive-text="无"></el-switch>
            </el-form-item>
            <el-form-item 
              label="简介" 
              prop="intro">
              <el-input 
                v-model="newRoom.intro"
                placeholder="请用200个以内的字符简单介绍一下这间会议室"
                type="textarea">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="resetForm('newRoom')">重 置</el-button>
              <el-button type="primary" @click="submitNewRoom('newRoom')">确 定</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
      <el-card class="card">
        <el-table
          ref="filterTable"
          :data="rooms"
          border
          height="650"
          style="width: 100%">
          <el-table-column
            prop="room_number"
            label="会议室"
            width="100">
          </el-table-column>
          <el-table-column
            prop="capacity"
            label="容量"
            width="100">
          </el-table-column>
          <el-table-column
            prop="media"
            label="多媒体设备"
            width="120"
            :filters="[{text:'有',value:true},{text:'无',value:false}]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.media==true? 'success':'danger'"
                disable-transitions>
                {{scope.row.media == true ? '有':'无'}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="intro"
            label="介绍">
          </el-table-column>
          <el-table-column
            label="查看预定情况"
            width="160">
            <template slot-scope="scope">
              <el-button 
                @click="clickToCalendar(scope.row.room_id)" 
                type="info" 
                plain 
                size="small">
                查看预定情况
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="150">
            <template slot-scope="scope">
              <el-button 
                @click="clickToOrder(scope.row.room_id)" 
                type="primary" 
                plain 
                size="small"
                v-if="role==1||role==2">
                预约会议室
              </el-button>
              <el-button 
                @click="deleteRoom(scope.row.room_id)" 
                type="danger" 
                plain 
                size="small"
                v-if="role==3">
                删除会议室
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
  name: 'RoomInfo',
  components: {
    HeaderMenu
  },
  data(){
    return{
      //调试用，之后用全局变量
      role:'3',      //1用户，2物业，3管理员

      rooms:[],
      dialogVisible: false,
      newRoom:{
        room_number:'',
        capacity:'',
        media:true,
        intro:''
      },
      rules:{
        number:[{required: true, message: '请输入会议室编号', trigger: 'blur'}],
        capacity:[{required: true, message: '请输入会议室容量', trigger: 'blur'}],
        intro:[{max: 200, message:'字符控制在200个以内',trigger: 'blur'}]
      }
    }
  },
  //创建页面时调用的函数
  created(){
    this.getRoom();
  },
  methods:{
    //查询会议室信息，会议室不多所以不分页
    getRoom(){
      axios.get("http://localhost:9090/room",{
      }).then((res)=>{
          this.rooms=res.data
      }).catch(function (error){
          console.log(error)
      })
    },
    //表格筛选功能
    filterTag(value, row) {
      return row.media === value;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    clickToCalendar(id) {
      // console.log(id);
      this.$router.push({name:'calendar',params: {id:id}}) // 只能用 name
    },
    clickToOrder(number){
      this.$router.push({name:'order',params: {number:number}})
    },
    //删除会议室
    deleteRoom(room_id){
      this.$confirm('此操作将删除该会议室, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axios.delete("http://localhost:9090/room/"+room_id)
        .catch(function (error){
          console.log(error)
        })
        location. reload()     //删除以后刷新页面
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      });
    },
    //添加会议室
    addRoom(){
      this.dialogVisible = false;
      console.log('新建会议室');
    },
    handleClose() {
        this.dialogVisible = false;
    },
    submitNewRoom(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios({url:'http://localhost:9090/room/insert',
            method:'post',
            data:{
              room_number: this.newRoom.room_number,
              capacity: this.newRoom.capacity,
              media: this.newRoom.media,
              intro: this.newRoom.intro
            }
          }).then(()=>{
              this.$message({
                  type: 'info',
                  message: '已成功添加'
              });
              location. reload()     //新建以后刷新页面
          }).catch(function (error){
              console.log(error)
          })
        } else {
          alert('error submit!!');
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
  #roominfo{
    background-color: #E9EEF3;
    width: 100%;
    height: 100%;	
    margin: 0 auto;
    position: fixed;
  }
  .room-add{
    padding-top: 0.5%;
    padding-bottom: 0.5%;
    text-align: right;
  }
  .add-button{
    margin-right: 3%;
  }
  
</style>
