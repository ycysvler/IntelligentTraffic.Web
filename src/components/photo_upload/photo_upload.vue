<template>
  <div class="photo_uploadWrapper">
    <div class="PhotoImg">
      <label class="upload_img" for="file1">
        <Icon class="upload_icon" type="ios-cloud-upload" size="52" style="color: #3399ff" v-show="up_icon"></Icon>
        <p style="font-size: 15px;padding: 10px" v-show="up_icon">请上传图片</p>
        <img class="up_img" :src="imgsrc" v-show="imgShow">
        <div @click.stop.prevent="closeIcon" class="close_icon" v-show="close_div">
          <Icon class="close" type="close"></Icon>
        </div>
      </label>
      <input id="file1" type="file" @change="showme" accept="image/png,image/gif,image/jpeg"/>
    </div>
    <div class="photoList" v-show="this.photoShow">
      <div class="photoList_title">请选择一个车型，如不选择，默认查询所有</div>
      <ul>
        <li class="photo" v-for="(items, $index) in this.dataALL">
          <img class="photoSRC groupback" :src="items"  @click = "searchPhoto($index)" :class="{'groupActive': gruopType === $index}"/>
        </li>
      </ul>
    </div>
    <div class="photo_Row">
      <Row >
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
    <Button class="carPhotoBtn" type="primary"  @click="getModelSearch">搜索</Button>
    <search_model :items = 'search.data' :total="search.total" :showModelSearch = 'showModelSearch'  @hideshow="change"></search_model>
  </div>
</template>

<script type="text/ecmascript-6">
  import search_model from '../search_model/search_model.vue'
  import moment from 'moment'
  export default {
    data() {
      return {
        imgsrc: '',           //需要上传的图片 img的src
        imgShow: false,      // 控制img标签的显示和隐藏
        up_icon: true,       // 控制上传Icon的显示和隐藏
        close_div: false,    // 控制close图标的显示与隐藏
        startDate:'',
        startTime:'',
        start:'',
        endDate:'',
        endTime:'',
        end:'',
        onetime:'',
        twotime:'',
        showModelSearch:'',
        getPhoto:[],
        photoDate:'',
        photoName:'',
        photoSrc:"",
        dataALL:[],
        vehiclezone:{},
        photoShow: false,
        cutData : [],
        gruopType:"0"
      }
    },
    //监听 回调 判断是否有值 如果有“加载中”隐藏
    watch:{
      "$store.getters.getPhoto":function (val, oldVal) {
        this.getPhoto = val;
       if(this.getPhoto){
         for(let i in this.getPhoto){
           let photoData = this.getPhoto[i];
           let date = moment(photoData.date).format("YYYYMMDD");
           this.photoName = photoData.name;
           this.photoDate = date;
           this.vehiclezone = this.getPhoto[i].vehiclezone
           this.photoSrc = "http://1596y81h66.iok.la/intelligent/api/images/crop/" + this.photoDate + "/" + this.photoName + "?width=" +this.vehiclezone.width + "&height=" + this.vehiclezone.height + "&x=" + this.vehiclezone.x + "&y=" + this.vehiclezone.y;
           this.dataALL.push(this.photoSrc)
         }
         //如果数据回来 加载完成
         this.$Spin.hide();
         this.photoShow = true
       }
       console.log(this.dataALL)
      },
      end:function(val, oldVal){
        this.twotime = val
      },
      start:function(val, oldVal){
        this.onetime = val
      },
    },
    computed:{
      search(){
        return this.$store.getters.getSearch
      },
    },
    methods: {
      searchPhoto($index){
        this.cutData = this.getPhoto[$index]
        this.gruopType = $index
      },
      getModelSearch(){
        if(this.onetime === '' && this.twotime === ''){
          this.$Message.error('请选择时间');
          this.showModelSearch = false;
        }
        if(this.twotime < this.onetime){
          this.$Message.error('选择时间有误，查询结果失败');
          this.showModelSearch = false;
        }
        if(this.start != '' && this.end !='' && this.dataALL != ''){
          this.showModelSearch = true;
        }
        this.$store.dispatch('getSearch',{
          plateNum:this.cutData.platenumber,    //车牌
          model: this.cutData.vehiclemodel,     //型号
          brand:this.cutData.vehiclebrand,      //品牌
          year:this.cutData.vehicleyear,        //年款
          begin:this.start,                     //起始时间
          end:this.end,                         //终止时间
          pagesize:8,                           //分页 -> 一页几条
          current:1});                          //分页 -> 当前页
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
      showme(e) {
        this.imgsrc= window.URL.createObjectURL(e.target.files[0]);
        if(this.imgsrc){
          this.imgShow = true;
          if(this.imgShow = true){
            this.up_icon = false;
            this.close_div = true;
          }
        }
        //上传图片时加载中
        this.$Spin.show({
          render: (h) => {
            return h('div', [
              h('Icon', {
                'class': 'demo-spin-icon-load',
                props: {
                  type: 'load-c',
                  size: 18
                }
              }),
              h('div', 'Loading')
            ])
          }
        });
        let file = e.target.files[0];
        let formdata = new FormData();
        formdata.append('file',file,file.name);
        formdata.append('chunk', '0');
        //从vux中获取数据
        this.$store.dispatch('getPhoto',formdata);
      },
      closeIcon(){
        this.imgsrc = '';
        this.dataALL = [];
        this.photoShow = false;
        this.imgShow = false;
        this.up_icon = true;
        this.close_div = false
      },
    },
    components:{
      search_model
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .photo_uploadWrapper
    .PhotoImg
      border-bottom:1px solid rgba(251,251,251,1);
      padding-bottom :10px
      padding-left 13px
      border-radius: 4px
      box-shadow: 0 0 7px 0 rgba(213,213,213,0.5)
    .photo_Row
      padding: 10px 0 10px 20px
      box-shadow: 0 0 7px 0 rgba(213,213,213,0.5)
      border-bottom: 1px solid rgba(213,213,213,0.5)
      .endTime
        padding-top :10px
    .photoList
      padding: 0 10px 10px 10px
      .photoList_title
        padding: 10px
        color: red
        font-weight 700
        width 100%
        text-align center
    .photoList ul
      width :100%
      height: auto
      display :flex
      flex-wrap: wrap
      justify-content flex-start
      padding: 10px
      .photo
        width :100px;
        height: 100px
        margin-top :10px
        margin-right:15px
        .photoSRC
          width 100%
          height:100%
          cursor: pointer
        .groupback
          &.groupActive
            width:120px
            height: 120px
            border:1px solid goldenrod
    #file1
      position: absolute
      left:-999px
    .upload_img
      position: relative
      border: 1px dashed rgb(213,213,213)
      width :365px
      height: 180px
      display:table-cell;
      vertical-align:middle;
      text-align: center;
      cursor: pointer
      .up_img
        width :100%
        height: 100%
        background-repeat :no-repeat
      .close_icon
        width :20px
        .close
          position: absolute
          top: 0
          right: 0
          cursor: pointer
          padding :10px
          color: red
          font-size: 15px
          z-index:10
    .photoTool
      padding: 10px 0 0 0
      box-shadow: 0 0 7px 0 rgba(213,213,213,0.5)
      border-bottom: 1px solid rgba(213,213,213,0.5)
    .carPhotoBtn
      width :50%
      height: 40px
      margin-left :24%
      margin-top : 50px
</style>
