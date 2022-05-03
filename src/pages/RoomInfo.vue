<template>
  <div id="roominfo">
    <HeaderMenu/>
    <div class="main">
      <el-card class="card">
        <el-table
          ref="filterTable"
          :data="rooms"
          border
          height="650"
          style="width: 100%">
          <el-table-column
            prop="number"
            label="名称"
            width="100">
          </el-table-column>
          <el-table-column
            prop="capacity"
            label="容量"
            width="100">
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
                @click="clickToCalendar(scope.row.id)" 
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
                @click="clickToOrder(scope.row.number)" 
                type="primary" 
                plain 
                size="small">
                预约会议室
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
  name: 'RoomInfo',
  components: {
    HeaderMenu
  },
  data(){
    return{
      rooms:[
        {
          id:1,
          number:441,
          capacity:20,
          intro:'hhhhh'
        },
        {
          id:2,
          number:441,
          capacity:20,
          intro:'hhhhh'
        },
        {
          id:3,
          number:403,
          capacity:20,
          intro:'hhhhh'
        },
        {
          id:4,
          number:403,
          capacity:20,
          intro:'hhhhh'
        },
        {
          id:5,
          number:403,
          capacity:20,
          intro:'hhhhh'
        },
        {
          id:6,
          number:403,
          capacity:20,
          intro:'hhhhh'
        },
        {
          id:7,
          number:403,
          capacity:20,
          intro:'hhhhh'
        },
        {
          id:8,
          number:403,
          capacity:20,
          intro:'hhhhh'
        },
        {
          id:9,
          number:403,
          capacity:20,
          intro:'hhhhh'
        },
        {
          id:10,
          number:403,
          capacity:20,
          intro:'hhhhh'
        },
        {
          id:11,
          number:403,
          capacity:20,
          intro:'hhhhh'
        },
        {
          id:12,
          number:403,
          capacity:20,
          intro:'hhhhh'
        }
      ]
    }
  },
  methods:{
    clickToCalendar(id) {
      // console.log(id);
      this.$router.push({name:'calendar',params: {id:id}}) // 只能用 name
    },
    clickToOrder(number){
      this.$router.push({name:'order',params: {number:number}})
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
  
</style>
