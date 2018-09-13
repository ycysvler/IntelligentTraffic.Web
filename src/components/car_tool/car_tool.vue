<template>
  <div class="carTool">
    <span class="carTooltext">选择拍摄位置（默认为全部区域）</span>
    <div class="carToolList">
      <div class="toolColor" :class="{'active': textType === '1'}" @click="Hand"><Icon class="caricon" type="android-hand"></Icon></div>
      <div class="toolColor" :class="{'active': textType === '2'}" @click="CIRCLE"><Icon class="caricon" type="android-radio-button-off" ></Icon></div>
      <div class="toolColor" :class="{'active': textType === '3'}"  @click="RECTANGLE"><Icon class="caricon" type="android-checkbox-outline-blank"></Icon></div>
      <div class="toolColor" :class="{'active': textType === '4'}"  @click="SELECTION"><Icon class="caricon" type="ios-list"></Icon></div>
      <div class="toolColor" :class="{'active': textType === '5'}"  @click="CLEAR"><Icon class="caricon" type="trash-a"></Icon></div>
    </div>
    <Modal
      v-model="modal"
      title="地图多选框"
      @on-ok="asyncOK">
      <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px; display: flex;justify-content: space-between">
        <Checkbox
          :indeterminate="indeterminate"
          :value="checkAll"
          @click.prevent.native="handleCheckAll">全选</Checkbox>
        <div>
          <Input style="width: 200px;" placeholder="请输入位置" />
          <Button slot="append" icon="ios-search"></Button>
        </div>
      </div>
      <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
        <Checkbox v-for='item in kakous' :key="item.kakouid"  :label='item.kakouid'>{{item.name}}</Checkbox>
      </CheckboxGroup>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapState} from 'vuex'
  export default {
    data(){
      return{
        textType : '1',
        modal:false,
        indeterminate: false,
        checkAll: false,
        checkAllGroup: [],
        kakou: [],
        mapLng:[]
      }
    },
    created(){
    },
    watch:{
      "$store.getters.getSelectMaps":function (val, oldVal) {
        this.checkAllGroup = val;
      }
    },
    computed:{
      kakous(){
        this.kakou = this.$store.getters.getMaps
        return this.$store.getters.getMaps
      },
      kakouids(){
        let ids = [];
        this.$store.getters.getMaps.forEach((item)=>{
          ids.push(item.kakouid);
          console.log(aaaaaaaaaa,'ids')
        });
        return ids;
      }
    },
    methods:{
      Hand(){
        this.textType = '1';
        window.drawingManager.close();
      },
      CIRCLE(){
        this.textType = '2';
        window.drawingManager.open();
        window.drawingManager.setDrawingMode(BMAP_DRAWING_CIRCLE);
        clearAll();
        this.checkAllGroup = [];
      },
      RECTANGLE(){
        this.textType = '3';
        window.drawingManager.open();
        window.drawingManager.setDrawingMode(BMAP_DRAWING_RECTANGLE);
        clearAll();
        this.checkAllGroup = [];
      },
      SELECTION(){
        this.textType = '4';
        this.modal = true;
        window.drawingManager.close();
      },
      CLEAR(){
        this.textType = '5';
        clearAll();
        this.checkAllGroup = [];
      },
      asyncOK(){

        /*for (let i = 0; i < this.mapLng.length; i++) {
          let mapLng = this.mapLng[i];
          if(mapLng){
            let myIcon = new BMap.Icon("../../../static/images/timg.jpg", new BMap.Size(400, 400)); //换图标
            let marker2 = new BMap.Marker(new BMap.Point(mapLng.lng,mapLng.lat), {icon: myIcon}); // 创建标注
            window.bdmap.addOverlay(marker2);   // 将标注添加到地图中
          }else{
              for(let j = 0;j<this.kakou.length;j++){
                let kakous = this.kakou[i];
                let marker = new BMap.Marker(new BMap.Point(kakous.lng,kakous.lat));
                window.bdmap.addOverlay(marker);   // 将标注添加到地图中
              }
          }

        }*/


        console.log(this.mapLng)
      },
      handleCheckAll () {
        console.log('handleCheckAll');
        if (this.indeterminate) {
          this.checkAll = false;
        } else {
          this.checkAll = !this.checkAll;
        }
        this.indeterminate = false;

        console.log('this.checkAll', this.checkAll);
        if (this.checkAll) {
          this.checkAllGroup = this.kakouids;
          console.log('this.checkAllGroup', this.kakouids);
        } else {
          this.checkAllGroup = [];
        }
      },
      checkAllGroupChange (data) {
        //拿到选中的坐标
        for(let i = 0; i<data.length; i++){
          for(let j = 0; j<this.kakou.length; j++){
            let dateAll = this.kakou[j];
            if(data[i] === dateAll.kakouid){
              var zuobiao = {}
              zuobiao.lng = dateAll.lng
              zuobiao.lat = dateAll.lat
            }
          }
        }
        //push到数组中
        this.mapLng.push(zuobiao);
        if (data.length === 3) {
          this.indeterminate = false;
          this.checkAll = true;
        } else if (data.length > 0) {
          this.indeterminate = true;
          this.checkAll = false;
        } else {
          this.indeterminate = false;
          this.checkAll = false;
        }
      },
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .carTool
    display: flex
    justify-content center
    align-items center
    flex-direction: column
    .carToolList
      display :flex
      font-size: 14px
      .toolColor
        color:black
        &.active
          color:#2d8cf0
    .caricon
      font-size:25px
      padding :15px 20px
      cursor :pointer
</style>
