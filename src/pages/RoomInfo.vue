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
            prop="building"
            label="楼"
            width="120">
          </el-table-column>
          <el-table-column
            prop="number"
            label="房间号"
            width="100">
          </el-table-column>
          <el-table-column
            label="查看预定情况"
            width="160">
            <template slot-scope="scope">
              <el-button 
                @click="handleClick(scope.row.id)" 
                type="primary" 
                plain 
                size="small">
                查看预定情况
              </el-button>
            </template>
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
          building:'济事楼',
          number:441,
          capacity:20,
          intro:'hhhhh'
        },
        {
          id:2,
          building:'济事楼',
          number:441,
          capacity:20,
          intro:'hhhhh'
        },
        {
          id:3,
          building:'济事楼',
          number:403,
          capacity:20,
          intro:'hhhhh'
        },
        {
          id:4,
          building:'济事楼',
          number:403,
          capacity:20,
          intro:'hhhhh'
        },
        {
          id:5,
          building:'济事楼',
          number:403,
          capacity:20,
          intro:'hhhhh'
        },
        {
          id:6,
          building:'济事楼',
          number:403,
          capacity:20,
          intro:'hhhhh'
        },
        {
          id:7,
          building:'济事楼',
          number:403,
          capacity:20,
          intro:'hhhhh'
        },
        {
          id:8,
          building:'济事楼',
          number:403,
          capacity:20,
          intro:'hhhhh'
        },
        {
          id:9,
          building:'济事楼',
          number:403,
          capacity:20,
          intro:'hhhhh'
        },
        {
          id:10,
          building:'济事楼',
          number:403,
          capacity:20,
          intro:'hhhhh'
        },
        {
          id:11,
          building:'济事楼',
          number:403,
          capacity:20,
          intro:'hhhhh'
        },
        {
          id:12,
          building:'济事楼',
          number:403,
          capacity:20,
          intro:'hhhhh'
        }
      ]
    }
  },
  methods:{
    handleClick(id) {
        // console.log(id);
        this.$router.push({name:'calendar',params: {id:id}}) // 只能用 name
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
