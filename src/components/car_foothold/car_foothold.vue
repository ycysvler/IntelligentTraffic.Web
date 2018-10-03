<template>
  <div class="car_modelWrapper">
    <div class="car_model">
      <h2 class="model_title">落脚点分析</h2>
      <div class="feature_carType">
        <div class="feature_list">
          <span class="feature_title">品牌：</span>
          <AutoComplete
            v-model="brandValue"
            :data="brands"
            :filter-method="filterType"
            @on-search="getcarBrand()"
            placeholder="请输入品牌"
            style="width:300px;">
          </AutoComplete>
        </div>
        <div class="feature_list">
          <span class="feature_title">型号：</span>
          <AutoComplete
            v-model="modelValue"
            :data="models"
            :filter-method="filterModel"
            @on-search="getcarModel()"
            placeholder="请输入型号"
            style="width:300px">
          </AutoComplete>
        </div>
        <div class="feature_list">
          <span class="feature_title">年款：</span>
          <AutoComplete
            v-model="yearValue"
            :data="years"
            :filter-method="filterAnnual"
            placeholder="请输入年款"
            style="width:300px">
          </AutoComplete>
        </div>
      </div>
      <div class="carPlate">
        <RadioGroup class="carPlate_radio" v-model="plateType">
          <div class="showCar" @click="hideClick">
            <Radio label="车牌">
            </Radio>
          </div>
          <Input class="carPlate_inp" :disabled="disabledInput" v-model="chepai" placeholder="请输入车牌"/>
          <div class="carPlateNot" @click="plateClick">
            <Radio class="notPlate" label="无车牌" ></Radio>
          </div>
        </RadioGroup>
        <Row>
          <div class="startTime">
            <Col span="12" />
            <span>起始时间</span>
            <DatePicker class="start" type="date" placeholder="日期" style="width: 200px"   v-model="startDate" @on-change="startALL"></DatePicker>
            <TimePicker confirm placeholder="时,分,秒" style="width: 88px" v-model="startTime"  ></TimePicker>
          </div>
          <div class="endTime">
            <Col span="12" />
            <span>终止时间</span>
            <DatePicker class="end" type="date" placeholder="日期" style="width: 200px" v-model="endDate" @on-change="endALL"></DatePicker>
            <TimePicker confirm placeholder="时,分,秒" style="width: 88px" v-model="endTime"></TimePicker>
          </div>
        </Row>
        <Row>
          <div class="startTime">
            <Col span="12" />
            <span style="margin-right: 10px">界定出行时间</span>
            <TimePicker confirm placeholder="时,分,秒" style="width: 45%" v-model="definitionStartTime"  ></TimePicker>
          </div>
          <div class="endTime">
            <Col span="12" />
            <span style="margin-right: 10px">界定返回时间</span>
            <TimePicker confirm placeholder="时,分,秒" style="width: 45%" v-model="definitionEndTime"></TimePicker>
          </div>
        </Row>
        <div style="display: flex">
          <span style="line-height: 32px;margin-right: 10px">落脚点时长超过</span>
          <Input style="width: 45%" v-model="footholdHour" placeholder="请输入落脚点时长"/>
          <span style="line-height: 32px;margin-left: 5px">小时</span>
        </div>
      </div>
      <Button class="featureBtn" type="primary"  @click="getModelSearch" style="margin-bottom: 20px">搜索</Button>
    </div>
    <search_model :items = 'search.data' :total="search.total"  :showModelSearch = 'showModelSearch'  @hideshow="change"></search_model>
  </div>
</template>

<script type="text/ecmascript-6">

  import search_model from '../search_model/search_model.vue'
  import moment from 'moment'
  export default {
    data(){
      return{
        type: '全部',
        plateType: '车牌',
        disabledInput: false,
        chepai:'',
        startDate:'',
        startTime:'00:00:00',
        start:'',
        endDate:'',
        endTime:'00:00:00',
        end:'',
        onetime:'',
        twotime:'',
        brandValue: '',
        modelValue:'',
        yearValue:'',
        showModelSearch:false,
        selectKakouID:[],
        footholdHour:'',
        definitionStartTime:"",
        definitionEndTime:''
      }
    },
    //从vuex中action里拿到数据
    computed:{
      brands(){
        return this.$store.getters.getBrands
      },
      models(){
        return this.$store.getters.getModels
      },
      years(){
        return this.$store.getters.getYears
      },
      search(){
        return this.$store.getters.getSearch
      },
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
    //页面开始从vuex里action中的axios获取数据
    created(){
      this.$store.dispatch('getBrands');
    },
    methods:{
      startALL(){
        let date = moment(this.startDate).format("YYYY-MM-DD");
        this.start = date +' '+ this.startTime;
        console.log(this.startTime)
      },
      endALL(){
        let date = moment(this.endDate).format("YYYY-MM-DD");
        this.end = date +' '+ this.endTime;
      },
      change(){
        this.showModelSearch = false
      },
      getcarBrand(){
        this.$store.dispatch('getModels',this.brandValue);
      },
      getcarModel(){
        this.$store.dispatch('getYears',this.modelValue);
      },

      getModelSearch(){
        if(this.onetime === '' && this.twotime === ''){
          this.$Message.error('请选择时间');
          this.showModelSearch = false;

        }
        if(this.twotime < this.onetime){
          this.$Message.error('选择时间有误,查询结果失败');
          this.showModelSearch = false;
        }
        if(this.start != '' && this.end !=''){
          this.showModelSearch = true;
        }
        this.$store.dispatch('getSearch',{
          kakouid:this.selectKakouID,//选中的卡口ID
          plateNum:this.chepai,   //车牌
          brand:this.brandValue,  //品牌
          model:this.modelValue,  //型号
          year:this.yearValue,    //年款
          begin:this.start,       //起始时间
          end:this.end,           //终止时间
          pagesize:10,             //分页 -> 一页几条
          current:1});            //分页 -> 当前页
      },
      //控制input，disabled
      plateClick(){
        this.disabledInput = true;
      },
      hideClick(){
        this.disabledInput = false;
      },
      //自动完成品牌
      filterType (Typevalue, option) {
        return option.toUpperCase().indexOf(Typevalue.toUpperCase()) !== -1;
      },
      //自动完成型号
      filterModel(Modelvalue, option) {
        return option.toUpperCase().indexOf(Modelvalue.toUpperCase()) !== -1;
      },
      //自动完成年款
      filterAnnual(Annualvalue, option) {
        return option.toUpperCase().indexOf(Annualvalue.toUpperCase()) !== -1;
      },

    },
    components:{

      search_model
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .car_modelWrapper
    .car_model
      position:absolute
      top: 25px
      left: 25px
      width :388px
      height: 737px
      background:rgba(251,251,251,1);
      border-radius: 4px
      box-shadow: 0 0 7px 0 rgba(213,213,213,0.5)
      border-bottom: 1px solid rgba(213,213,213,0.5)
      .model_title
        text-align: center
        padding :10px
      .img_feature
        display: flex
        align-items: center
        padding: 10px 0 10px 20px
        .feature_text
          font-size: 14px
          font-weight :700
        .feature_type
          margin-left :20px
          .feature_car
            font-size: 18px
      .feature_carType
        padding: 10px 0 10px 10px
        box-shadow: 0 0 7px 0 rgba(213,213,213,0.5)
        border-bottom: 1px solid rgba(213,213,213,0.5)
        .feature_list
          display :flex
          padding :10px 0 10px 0
          .ivu-auto-complete.ivu-select-dropdown
            max-height:200px;
          .feature_title
            line-height: 15px
            padding :10px
          .model_car_type
            width: 80%
      .carPlate
        padding: 10px 0 10px 20px
        box-shadow: 0 0 7px 0 rgba(213,213,213,0.5)
        border-bottom: 1px solid rgba(213,213,213,0.5)
        .carPlate_radio
          display : flex
          padding :10px 0 10px 0
          .showCar
            line-height :28px
          .carPlateNot
            line-height :28px
          .notPlate
            margin-left :10px
          .carPlate_inp
            width : 55%
        .startTime
          .start
            margin-left :3px
        .endTime
          padding :10px 0 10px 0
          .end
            margin-left :3px
      .modelTool
        padding: 10px 0 0 0
        box-shadow: 0 0 7px 0 rgba(213,213,213,0.5)
        border-bottom: 1px solid rgba(213,213,213,0.5)
      .featureBtn
        width :50%
        height: 40px
        margin-left :24%
        margin-top : 20px
</style>
