<template>
  <div class="car_licenceWrapper">
    <div class="car_licence">
      <h2 class="licence_title">车牌检索</h2>
      <div class="img_licence">
        <div class="licence_text">图像特征</div>
        <div class="licence_type">
          <RadioGroup class="licence_car" v-model="licence">
            <Radio label="全部"></Radio>
            <Radio label="车头"></Radio>
            <Radio label="车尾"></Radio>
          </RadioGroup>
        </div>
      </div>
      <div class="licence_carType">
        <div class="licence_list">
          <span class="licence_title">车牌：</span>
          <Input class="licence_car_type"  v-model="chepai" placeholder="请输入车牌" />
        </div>
      </div>
      <div class="carlicence">
        <Row>
          <div class="startTime">
            <Col span="12" />
            <span>起始时间</span>
            <DatePicker class="start" type="date" placeholder="日期" style="width: 200px" v-model="startDate"></DatePicker>
            <TimePicker confirm placeholder="时,分,秒" style="width: 88px" v-model="startTime"  @on-change="startALL"></TimePicker>
          </div>
          <div class="endTime">
            <Col span="12" />
            <span>终止时间</span>
            <DatePicker class="end" type="date" placeholder="日期" style="width: 200px" v-model="endDate"></DatePicker>
            <TimePicker confirm placeholder="时,分,秒" style="width: 88px" v-model="endTime" @on-change="endALL"></TimePicker>
          </div>
        </Row>
      </div>
      <div class="licenceTool">
        <car_tool></car_tool>
      </div>
      <Button class="carlicenceBtn" type="primary"  @click="getModelSearch" >搜索</Button>
    </div>
    <search_model :items = 'search.data' :total="search.total"  @hideshow="change" :showLicenceSearch = 'showLicenceSearch'></search_model>
  </div>
</template>

<script type="text/ecmascript-6">
  import car_tool from '../car_tool/car_tool.vue'
  import search_model from '../search_model/search_model.vue'
  import moment from 'moment'
  export default {
    data(){
      return{
        licence: '全部',
        chepai:'',
        startDate:'',
        startTime:'',
        start:'',
        endDate:'',
        endTime:'',
        end:'',
        onetime:'',
        twotime:'',
        showLicenceSearch:false,
        selectKakouID:[]
      }
    },
    computed:{
      search(){

        return this.$store.getters.getSearch
      }
    },
    watch:{
      "$store.getters.getSelectMaps":function (val, oldVal) {
        this.selectKakouID = val;
        console.log("selectKakouID",this.selectKakouID)
      },
      end:function(val, oldVal){
        this.twotime = val
      },
      start:function(val, oldVal){
        this.onetime = val
      },
    },
    methods:{
      change(){
        this.showLicenceSearch = false;
      },
      getModelSearch(){
        if(this.onetime === '' && this.twotime === ''){
          this.$Message.error('请选择时间');
          this.showLicenceSearch = false;
        }
        if(this.twotime < this.onetime){
          this.$Message.error('选择时间有误，查询结果失败');
          this.showLicenceSearch = false;
        }
        if(this.start != '' && this.end !=''){
          this.showModelSearch = true;
        }
        this.$store.dispatch('getSearch',{
          kakouid:this.selectKakouID,//选中的卡口ID
          plateNum:this.chepai,   //车牌
          begin:this.start,       //起始时间
          end:this.end,           //终止时间
          pagesize:8,             //分页 -> 一页几条
          current:1});            //分页 -> 当前页
      },
      startALL(){
        let date = moment(this.startDate).format("YYYY-MM-DD");
        this.start = date +' '+ this.startTime;
      },
      endALL(){
        let date = moment(this.endDate).format("YYYY-MM-DD");
        this.end = date +' '+ this.endTime;
      },
    },
    components:{
      car_tool,
      search_model
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .car_licenceWrapper
    .car_licence
      position:absolute
      top: 25px
      left: 25px
      width :388px
      height: 737px
      background:rgba(251,251,251,1);
      border-radius: 4px
      box-shadow: 0 0 7px 0 rgba(213,213,213,0.5)
      .licence_title
        text-align: center
        padding :10px
      .img_licence
        display: flex
        align-items: center
        padding: 10px 0 10px 20px
        .licence_text
          font-size: 14px
          font-weight :700
        .licence_type
          margin-left :20px
          .licence_car
            font-size: 18px
      .licence_carType
        padding: 10px 0 10px 10px
        box-shadow: 0 0 7px 0 rgba(213,213,213,0.5)
        border-bottom: 1px solid rgba(213,213,213,0.5)
        .licence_list
          display :flex
          padding :10px 0 10px 0
          .licence_title
            line-height: 15px
          .licence_car_type
            width: 80%
      .carlicence
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
      .licenceTool
        padding: 10px 0 0 0
        box-shadow: 0 0 7px 0 rgba(213,213,213,0.5)
        border-bottom: 1px solid rgba(213,213,213,0.5)
      .carlicenceBtn
        width :50%
        height: 40px
        margin-left :24%
        margin-top : 50px
</style>
