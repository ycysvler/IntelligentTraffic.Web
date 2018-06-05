<template>
  <div class="car_deckWrapper">
     <div class="car_deck" >
       <div class="deck_title">套牌分析</div>
        <ul>
           <li v-for="item in decks">
              <div class="deck_vehicle">
                <div>时间：<span class="vehicle_date">{{vehicleData}}</span></div>
                <div>车牌号：<span class="vehicle_date">{{item.vehicle.platenumber}}</span></div>
                <div>品牌：<span class="vehicle_date">{{item.vehicle.vehiclebrand}}</span></div>
                <div>颜色：<span class="vehicle_date">{{item.vehicle.vehiclecolor}}</span></div>
                <div>车型：<span class="vehicle_date">{{item.vehicle.vehiclemodel}}</span></div>
                <div>类别：<span class="vehicle_date">{{item.vehicle.vehicletype}}</span></div>
                <div>年款：<span class="vehicle_date">{{item.vehicle.vehicleyear}}</span></div>
              </div>
              <div class="deck_list">
                <div class="deck_items" v-for="item in item.items">
                  <Tooltip placement="left-end">
                    <img class="deck_img" :src='item.url' />
                    <div slot="content" class="deck_titlecontent">
                      <img class="deck_imgtwo" :src='item.url' />
                    </div>
                  </Tooltip>
                  <div class="items_content">
                    <div class="items_list">时间：{{itemsData}}</div>
                    <div class="items_list">品牌：<div class="item_data">{{item.vehiclebrand}}</div></div>
                    <div class="items_list">车牌号：<div class="item_data">{{item.platenumber}}</div></div>
                    <div class="items_list">颜色：<div class="item_data">{{item.vehiclecolor}}</div></div>
                    <div class="items_list">车型：<div class="item_data">{{item.vehiclemodel}}</div></div>
                    <div class="items_list">类别：<div class="item_data">{{item.vehicletype}}</div></div>
                    <div class="items_list">年款：<div class="item_data" :title="item.vehicleyear">{{item.vehicleyear}}</div></div>
                  </div>
                </div>
              </div>
           </li>
        </ul>
     </div>
  </div>
</template>


<script type="text/ecmascript-6">
  import moment from 'moment'
  export default {
    data(){
      return{
        itemsData:'',
        vehicleData:'',
      }
    },
    computed:{
      decks(){
        for(let i in this.$store.getters.getDecks) {
          let data = this.$store.getters.getDecks[i];
          for(let i in data.items){
            let item = data.items[i];
            this.itemsData = moment(item.date).format("YYYY-MM-DD hh:mm:ss");
          }
          for(let i in data.vehicle){
            let item = data.vehicle[i];
            this.vehicleData = moment(item.createtime).format("YYYY-MM-DD hh:mm:ss");
          }
        }
        console.log(this.$store.getters.getDecks)
        return this.$store.getters.getDecks
      }
    },
    created(){
      this.$store.dispatch('getDecks');
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .car_deckWrapper
    position:absolute
    top: 5%
    left: 10%
    width :80%
    height: 90%
    background: white
    color: rgb(7,17,27)
    font-size: 14px
    box-shadow: 0 0 7px 0 rgba(213,213,213,0.5)
    border: 1px solid rgba(213,213,213,0.5)
    border-radius: 4px
    overflow:auto
    .deck_title
      font-weight 700
      padding 20px
      font-size: 15px
      background rgba(213,213,213,0.4)
      box-shadow: 0 0 7px 0 rgba(213,213,213,0.5);
      border-bottom: 1px solid rgba(213,213,213,0.5);
    .deck_vehicle
      display: flex
      height: 25px
      background: white
      padding: 0 20px
      align-items center
      box-shadow: 0 0 7px 0 rgba(213,213,213,0.5);
      border-bottom: 1px solid rgba(213,213,213,0.5);
      .vehicle_date
        margin-right 40px
    .deck_list
      display: flex
      flex-wrap: wrap
      background rgba(213,213,213,0.4)
      box-shadow: 0 0 7px 0 rgba(213,213,213,0.5);
      border-bottom: 1px solid rgba(213,213,213,0.5);
      .deck_items
        padding: 20px
        display: flex
        .deck_img
          width: 234px;
          height: 170px
        .deck_titlecontent
          width 900px
          height:650px
          .deck_imgtwo
            width 900px
            height:650px
        .items_content
          display: flex
          flex-direction column
          margin-left 20px
          justify-content center
          .items_list
            margin-bottom 10px
            display :flex
          .item_data
            color: #2d8cf0
            max-width :112px
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            cursor :pointer
</style>
