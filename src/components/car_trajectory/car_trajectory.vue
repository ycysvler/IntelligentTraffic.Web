<template>
  <div class="car_trajectoryWrapper">
    <div class="car_trajectory">
      <h2 class="trajectory_title">轨迹分析</h2>
      <div class="img_trajectory">
        <div class="trajectory_text">图像特征</div>
        <div class="trajectory_type">
          <RadioGroup class="trajectory_car" v-model="type">
            <Radio label="全部"></Radio>
            <Radio label="车头"></Radio>
            <Radio label="车尾"></Radio>
          </RadioGroup>
        </div>
      </div>
      <div class="trajectory_carType">
        <div class="trajectory_list">
          <span class="trajectory_title">车牌：</span>
          <Input class="trajectory_car_type"  v-model="chepai" placeholder="请输入车牌" />
        </div>
      </div>
      <div class="cartrajectory">
        <Row>
          <div class="startTime">
            <Col span="12" />
            <span>起始时间</span>
            <DatePicker class="start" type="date" placeholder="日期" style="width: 200px" v-model="startDate" @on-change="startALL"></DatePicker>
            <TimePicker confirm placeholder="时,分,秒" style="width: 88px" v-model="startTime"  ></TimePicker>
          </div>
          <div class="endTime">
            <Col span="12" />
            <span>终止时间</span>
            <DatePicker class="end" type="date" placeholder="日期" style="width: 200px" v-model="endDate"  @on-change="endALL"></DatePicker>
            <TimePicker confirm placeholder="时,分,秒" style="width: 88px" v-model="endTime"></TimePicker>
          </div>
        </Row>
      </div>
      <Button class="cartrajectoryBtn" type="primary"  @click="getTrajectorySearch" >搜索</Button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import moment from 'moment'
  export default {
    data(){
      return{
        type: '全部',
        chepai:'京B50293',
        startDate:'',
        startTime:'00:00:00',
        start:'',
        endDate:'',
        endTime:'00:00:00',
        end:'',
        trajectory_data:[]
      }
    },
    watch:{
      //轨迹搜索的值传给trajectory方法
      "$store.getters.getSearch":function (val, oldVal) {
        this.trajectory_data = val.data;
        window.trajectory(this.trajectory_data);
        return val
      },
    },
    methods:{

      getTrajectorySearch(){
        this.$Message.error('内网版本，暂不支持');
       /* if(!this.chepai){
          this.$Message.error('请输入车牌号');
        }
        if(this.start === '' && this.end === ''){
          this.$Message.error('请选择时间');
        }
        if(this.end < this.start){
          this.$Message.error('选择时间有误，查询结果失败');
        }
        if(this.chepai){
          this.$store.dispatch('getSearch',{
            plateNum:this.chepai,   //车牌
            begin:this.start,       //起始时间
            end:this.end,           //终止时间
          });
        }
        window.trajectory(this.trajectory_data)*/
      },
      startALL(){
        let date = moment(this.startDate).format("YYYY-MM-DD");
        this.start = date +' '+ this.startTime;
      },
      endALL(){
        let date = moment(this.endDate).format("YYYY-MM-DD");
        this.end = date +' '+ this.endTime;
      },
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .car_trajectoryWrapper
    .car_trajectory
      position:absolute
      top: 25px
      left: 25px
      width :388px
      height: 737px
      background:rgba(251,251,251,1);
      border-radius: 4px
      box-shadow: 0 0 7px 0 rgba(213,213,213,0.5)
      border-bottom: 1px solid rgba(213,213,213,0.5)
      .trajectory_title
        text-align: center
        padding :10px
      .img_trajectory
        display: flex
        align-items: center
        padding: 10px 0 10px 20px
        .trajectory_text
          font-size: 14px
          font-weight :700
        .trajectory_type
          margin-left :20px
          .trajectory_car
            font-size: 18px
      .trajectory_carType
        padding: 10px 0 10px 10px
        box-shadow: 0 0 7px 0 rgba(213,213,213,0.5)
        border-bottom: 1px solid rgba(213,213,213,0.5)
        .trajectory_list
          display :flex
          padding :10px 0 10px 0
          .trajectory_title
            line-height: 15px
          .trajectory_car_type
            width: 80%
      .cartrajectory
        padding: 10px 0 10px 20px
        box-shadow: 0 0 7px 0 rgba(213,213,213,0.5)
        border-bottom: 1px solid rgba(213,213,213,0.5)
        .startTime
          .start
            margin-left :3px
        .endTime
          padding :10px 0 10px 0
          .end
            margin-left :3px
      .cartrajectoryBtn
        width :50%
        height: 40px
        margin-left :24%
        margin-top : 50px
</style>
