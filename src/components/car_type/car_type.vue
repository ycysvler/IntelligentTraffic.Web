<template>
  <div class="car_typeWrapper">
    <div class="car_type">
      <h2 class="type_title">类别检索</h2>
      <div class="img_type">
        <div class="type_text">图像特征</div>
        <div class="type_type">
          <RadioGroup class="type_car" v-model="car_type">
            <Radio label="全部"></Radio>
            <Radio label="车头"></Radio>
            <Radio label="车尾"></Radio>
          </RadioGroup>
        </div>
      </div>
      <div class="type_carType">
        <div class="type_list">
          <span class="type_title">类别：</span>
          <AutoComplete
            v-model="Typevalue"
            :data="types"
            :filter-method="filterType"
            placeholder="请输入类别"
            style="width:300px;">
          </AutoComplete>
        </div>
        <div class="type_list">
          <span class="type_title">品牌：</span>
          <AutoComplete
            v-model="brandValue"
            :data="brands"
            :filter-method="filterBrand"
            placeholder="请输入品牌"
            style="width:300px;">
          </AutoComplete>
        </div>
      </div>
      <div class="carType">
        <RadioGroup class="carType_radio" v-model="carType">
          <div class="showtype" @click="hideClick">
            <Radio label="车牌">
            </Radio>
          </div>
          <Input class="carType_inp" :disabled="disabledInput" v-model="chepai"  placeholder="请输入车牌"/>
          <div class="carTypeNot" @click="carClick">
            <Radio class="notcarType" label="无车牌" ></Radio>
          </div>
        </RadioGroup>
        <Row>
          <div class="startTime">
            <Col span="12" />
            <span>起始时间</span>
            <DatePicker class="start" type="date" placeholder="日期" style="width: 200px"  v-model="startDate"></DatePicker>
            <TimePicker confirm placeholder="时,分,秒" style="width: 88px" v-model="startTime"  @on-change="startALL"></TimePicker>
          </div>
          <div class="endTime">
            <Col span="12" />
            <span>终止时间</span>
            <DatePicker class="end" type="date" placeholder="日期" style="width: 200px" v-model="endDate"></DatePicker>
            <TimePicker confirm placeholder="时,分,秒" style="width: 88px"  v-model="endTime" @on-change="endALL"></TimePicker>
          </div>
        </Row>
      </div>
      <div class="typeTool">
        <car_tool></car_tool>
      </div>
      <Button class="carTypeBtn" type="primary"  @click="getModelSearch">搜索</Button>
    </div>
    <search_model :items = 'search.data' :total="search.total" :showModelSearch = 'showModelSearch'  @hideshow="change"></search_model>
  </div>
</template>

<script type="text/ecmascript-6">
  import car_tool from '../car_tool/car_tool.vue'
  import search_model from '../search_model/search_model.vue'
  import moment from 'moment'
  export default {
    data(){
      return{
        car_type: '全部',
        carType: '车牌',
        disabledInput: false,
        chepai:'',
        startDate:'',
        startTime:'',
        start:'',
        endDate:'',
        endTime:'',
        end:'',
        Typevalue: '',
        brandValue:'',
        showModelSearch:false,
        selectKakouID:[]
      }
    },
    computed:{
      brands(){
        console.log('store', this.$store);
        return this.$store.getters.getBrands
      },
      types(){
        console.log('store', this.$store);
        return this.$store.getters.getTypes
      },
      search(){
        return this.$store.getters.getSearch
      },
    },
    watch:{
      "$store.getters.getSelectMaps":function (val, oldVal) {
        this.selectKakouID = val;
        console.log("selectKakouID",this.selectKakouID)
      }
    },
    //页面开始从store获取品牌与类别
    created(){
      this.$store.dispatch('getBrands');
      this.$store.dispatch('getTypes');
    },
    methods:{
      getModelSearch(){
        this.$store.dispatch('getSearch',{
          kakouid:this.selectKakouID,//选中的卡口ID
          plateNum:this.chepai,   //车牌
          brand:this.brandValue,  //品牌
          type:this.Typevalue,    //类别
          begin:this.start,       //起始时间
          end:this.end,           //终止时间
          pagesize:8,             //分页 -> 一页几条
          current:1});            //分页 -> 当前页
        if(this.start && this.end){
          this.showModelSearch = true;
        }
      },
      startALL(){
        let date = moment(this.startDate).format("YYYY-MM-DD");
        this.start = date +' '+ this.startTime;
      },
      endALL(){
        let date = moment(this.endDate).format("YYYY-MM-DD");
        this.end = date +' '+ this.endTime;
      },
      //serch_model显示隐藏
      change(){
        this.showModelSearch = false
      },
      //控制input，disabled
      carClick(){
        this.disabledInput = true;
      },
      hideClick(){
        this.disabledInput = false;
      },

      //自动完成类别
      filterType (Typevalue, option) {
        return option.toUpperCase().indexOf(Typevalue.toUpperCase()) !== -1;
      },
      //自动完成品牌
      filterBrand (Brandvalue, option) {
        return option.toUpperCase().indexOf(Brandvalue.toUpperCase()) !== -1;
      },
    },
    components:{
      car_tool,
      search_model
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .car_typeWrapper
    .car_type
      position:absolute
      top: 25px
      left: 25px
      width :388px
      height: 737px
      background:rgba(251,251,251,1);
      border-radius: 4px
      box-shadow: 0 0 7px 0 rgba(213,213,213,0.5)
      .type_title
        text-align: center
        padding :10px
      .img_type
        display: flex
        align-items: center
        padding: 10px 0 10px 20px
        .type_text
          font-size: 14px
          font-weight :700
        .type_type
          margin-left :20px
          .type_car
            font-size: 18px
      .type_carType
        padding: 10px 0 10px 10px
        box-shadow: 0 0 7px 0 rgba(213,213,213,0.5)
        border-bottom: 1px solid rgba(213,213,213,0.5)
        .type_list
          display :flex
          padding :10px 0 10px 0
          .type_title
            line-height: 15px
          .type_car_type
            width: 80%
      .carType
        padding: 10px 0 10px 20px
        box-shadow: 0 0 7px 0 rgba(213,213,213,0.5)
        border-bottom: 1px solid rgba(213,213,213,0.5)
        .carType_radio
          display : flex
          padding :10px 0 10px 0
          .showtype
            line-height :28px
          .carTypeNot
            line-height :28px
          .notcarType
            margin-left :10px
          .carType_inp
            width : 55%
        .startTime
          .start
            margin-left :3px
        .endTime
          padding :10px 0 10px 0
          .end
            margin-left :3px
      .typeTool
        padding: 10px 0 0 0
        box-shadow: 0 0 7px 0 rgba(213,213,213,0.5)
        border-bottom: 1px solid rgba(213,213,213,0.5)
      .carTypeBtn
        width :50%
        height: 40px
        margin-left :24%
        margin-top : 50px
</style>
