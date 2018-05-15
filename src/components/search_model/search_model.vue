<template>
  <transition name = 'fade'>
    <div class="searchmodel_details"  v-show="showModelSearch">
      <div class="searchmodel_title">
        <span class="searchmodel_over">检索结果</span>
        <span class="searchmodel_text">共找到<a class="searchmodel_num">{{total}}</a>条结果</span>
        <div @click="hideModeSearch"><Icon class="searchmodel_icon" type="close"></Icon></div>
      </div>
      <div class="searchmodel_type">
        <span v-if="getParam.vehiclebrand">品牌：{{getParam.vehiclebrand}}</span>
        <span v-else>品牌：全部</span>
        <span v-if="getParam.platetype">类别：{{getParam.platetype}}</span>
        <span v-else>类别：全部</span>
        <span v-if="getParam.vehiclemodel">型号：{{getParam.vehiclemodel}}</span>
        <span v-else>型号：全部</span>
        <span v-if="getParam.vehicleyear">年款：{{getParam.vehicleyear}}</span>
        <span v-else>年款：全部</span>
        <span v-if="getParam.platenumber">车牌：{{getParam.platenumber}}</span>
        <span v-else>车牌：全部</span>
        <span>查询时段：{{getParam.begin}} 至 {{getParam.end}}</span>
      </div>
      <div class="searchmodel_grouping">
        <span class="grouping_title">分组：</span>
        <div class="grouping_list">
          <div @click="grouping_default" class="grouping_default groupback" :class="{'groupActive': gruopType === '1'}">默认</div>
          <div @click="grouping_model" class="grouping_model groupback" :class="{'groupActive': gruopType === '2'}">按车型分组</div>
          <div @click="grouping_licence" class="grouping_licence groupback" :class="{'groupActive': gruopType === '3'}">按车牌分组</div>
          <div @click="grouping_bayonet" class="grouping_bayonet groupback" :class="{'groupActive': gruopType === '4'}">按卡口分组</div>
        </div>
        <Page class="page" :total=total size="small" @on-change="pageSearch" show-elevator></Page>
      </div>
      <div class="modelWrapper">
        <ul class="modelWrap_list" >
          <li class="model_list" v-for="item in items">
            <img class="model_img" :src='item.url'/>
            <div class="model_data">
              <div class="model_position">位置：<span>{{item.address}}</span></div>
              <div class="model_time">拍摄时间：{{item.date}}</div>
              <div class="model_licence">车牌号：<span>{{item.platenumber}}</span></div>
              <div class="model_car">识别车型：<span>{{item.vehiclebrand}}{{item.vehicleyear}}</span></div>
              <div class="model_menu">
                <div class="model_information">查看关联信息</div>
                <div class="model_control">布控</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">

  export default {
    props: {
      items: {
        type: Array
      },
      total:{
        type: Number
      },
      showModelSearch:''
    },
    data(){
      return{
        gruopType:'1',
      }
    },
    computed:{
      getParam(){
        return this.$store.getters.getParam;
      }
    },
    methods:{
      pageSearch(current){

        let para1 = {
          type:this.getParam.platetype,
          plateNum:this.getParam.platenumber,   //车牌
          brand:this.getParam.vehiclebrand,     //品牌
          model:this.getParam.vehiclemodel,     //型号
          year:this.getParam.vehicleyear,       //年款
          begin:this.getParam.begin,            //起始时间
          end:this.getParam.end,                //终止时间
          pagesize:8,                            //分页 -> 一页几条
          current:current};                      //分页 -> 当前页
        this.$store.dispatch('getSearch',para1);
      },
      hideModeSearch(){
        this.$emit('hideshow','false')
      },
      grouping_default(){
        this.gruopType ='1';
      },
      grouping_model(){
        this.gruopType ='2';
      },
      grouping_licence(){
        this.gruopType ='3';
      },
      grouping_bayonet(){
        this.gruopType ='4';
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .searchmodel_details
    position:absolute
    top: 25px
    left: 445px
    width :1020px
    height: 737px
    background: white
    color: rgb(7,17,27)
    font-size: 14px
    box-shadow: 0 0 7px 0 rgba(213,213,213,0.5)
    border: 1px solid rgba(213,213,213,0.5)
    border-radius: 4px
    &.fade-enter-active, &.fade-leave-active
      transition: opacity .5s
    &.fade-enter, &.fade-leave-to
      opacity :0
    .searchmodel_title
      display: flex
      height: 40px
      line-height: 40px
      background: rgba(213,213,213,0.4)
      position: relative
      box-shadow: 0 0 7px 0 rgba(213,213,213,0.5)
      border-bottom: 1px solid rgba(213,213,213,0.5)
      .searchmodel_over
        padding 0 20px
      .searchmodel_text
        a
          color:red
      .searchmodel_icon
        position: absolute
        right: 0
        padding: 15px 20px
        cursor: pointer
    .searchmodel_type
      display: flex
      flex-wrap: wrap
      height: auto
      line-height: 30px
      background: white
      box-shadow: 0 0 7px 0 rgba(213,213,213,0.5)
      border-bottom: 1px solid rgba(213,213,213,0.5)
      span
        padding 0 20px
    .searchmodel_grouping
      display: flex
      background: rgba(213,213,213,0.4)
      height: 50px
      align-items: center
      position: relative
      box-shadow: 0 0 7px 0 rgba(213,213,213,0.5)
      border-bottom: 1px solid rgba(213,213,213,0.5)
      .grouping_title
        padding: 0 0 0 20px
      .grouping_list
        display: flex
        .groupback
          &.groupActive
            background: #2d8cf0
            color:white
        .grouping_default
          width: 45px
          text-align: center
          height: 30px
          line-height: 30px
          background: white
          margin: 0 5px
          cursor: pointer
        .grouping_model
          width: 90px
          text-align: center
          height: 30px
          line-height: 30px
          background: white
          margin: 0 5px
          cursor: pointer
        .grouping_licence
          width: 90px
          text-align: center
          height: 30px
          line-height: 30px
          background: white
          margin: 0 5px
          cursor: pointer
        .grouping_bayonet
          width: 90px
          text-align: center
          height: 30px
          line-height: 30px
          background: white
          margin: 0 5px
          cursor: pointer
      .page
        position: absolute
        right:20px
    .modelWrapper
      background: rgba(213,213,213,0.3)
      width 100%
      height: 615px
      .modelWrap_list
        width: 100%
        height: 100%
        display: flex
        flex-wrap :wrap
        .model_list
          margin: 10px 10px
          background: white
          width :234px
          height: 280px
          .model_img
            width :234px
            height:170px
          .model_data
            padding-left: 10px
            div
              padding: 4px 0
              span
                color: #2d8cf0
          .model_position
            width 100%
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          .model_car
            width 100%
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
          .model_menu
            display: flex
            .model_control
              padding-left :30px
            div
              cursor: pointer
              color: #2d8cf0

</style>
