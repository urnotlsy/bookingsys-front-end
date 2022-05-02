<template>
  <div id="homepage">
    <HeaderMenu/>
    <div class="main">
      <el-card class="box-card">
        <div 
          slot="header" 
          class="clearfix">
          <span style="font-weight:bold">会议室预约、使用规定</span>
        </div>
        <div 
          v-for="item in rules" 
          v-bind:key="item.key" 
          class="text item">
          {{item.key+'. '+item.rule}}
        </div>
      </el-card>
      <div class="main-options">
        <el-card 
          class="options-card" 
          shadow="hover" 
          style="background:#409EFF">
          <el-button 
            class="card-button" 
            type="text" 
            @click="checkCalendar">
            查看
          </el-button>
          <h1 class="card-content">预约日历</h1>
        </el-card>
        <el-card 
          class="options-card" 
          shadow="hover" 
          style="background:#67C23A">
          <el-button 
            class="card-button" 
            type="text" 
            @click="checkList">
            查看
          </el-button>
          <h1 class="card-content">预约列表</h1>
        </el-card>
        <el-card 
          class="options-card" 
          shadow="hover" 
          style="background:#E6A23C">
          <el-button 
            class="card-button" 
            type="text" 
            @click="checkRoom">
            查看
          </el-button>
          <h1 class="card-content">会议室详细信息</h1>
        </el-card>
        <el-card 
          class="options-card" 
          shadow="hover" 
          style="background:#F56C6C">
          <el-button 
            class="card-button" 
            type="text"
            @click="addOrder">
            查看
          </el-button>
          <h1 class="card-content">会议室预定</h1>
        </el-card>
      </div>
    </div>  
  </div>
</template>

<script>
import HeaderMenu from '../components/HeaderMenu.vue'
export default {
  name: 'HomePage',
  components: {
    HeaderMenu
  },
  data () {
    return {
      rules:[{
        rule:'会议室实行网上预约使用与管理。',
        key:1
      },{
        rule:'会议室预约时段为：8:00-22:00，原则上单次使用不超过3小时，超时段使用应在预约登记时做好备注说明。',
        key:2
      },{
        rule:'预约者应按预约时间使用会议室，未按时到达或超时影响他人使用会议室的，记违规一次。',
        key:3
      },{
        rule:'使用人应爱护公物、节约资源，在使用完毕后关闭会议室内的灯和多媒体设备等，未按规定使用会议室的，记违规一次。',
        key:4
      },{
        rule:'如会议室设备使用前发生故障、损坏或配件丢失，需及时告知物业或管理员，未及时上报的，发现后责任一律由最后使用人承担。',
        key:5
      },{
        rule:'违规次数达到上限后，账号一个月内将无法使用预约功能。',
        key:6
      },{
        rule:'其他特殊情况或特殊需要用户可联系管理员张晶老师。',
        key:7
      }]
    }
  },
  methods:{
    checkCalendar(){
      this.$router.replace({name:'calendar'})
    },
    checkList(){
      this.$router.replace({name:'list'})
    },
    checkRoom(){
      this.$router.replace({name:'roominfo'})
    },
    addOrder(){
      this.$router.replace({name:'order'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #homepage{
    background-color: #E9EEF3;
    width: 100%;
    height: 100%;
    position: fixed;
  }
  .main {
    display: flex;
  }
  .text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
    text-align: left;
  }
  .box-card {
    width: 40%;
    margin: 5% 15% 5% 15%;
    float: left;
  }
  .main-options {
    margin: 3% 10% 3% 0%;
    float: right;
  }
  .options-card{
    width: 100%;
    color: white;
    margin: 5% 0 5% 0;
  }
  .card-button{
    float: right;
    padding: 3px 0;
    color: white;
  }
  .card-content{
    float:left;
  }
</style>
