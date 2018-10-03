<template>
  <div id="main">
    <div class="layout">
      <Layout>
        <Header class="mainheader" :style="{position: 'fixed', top: '0' , width: '100%'}">
          <Menu mode="horizontal" theme="dark" active-name="1" class="menu">
            <div class="title">
              高速公路交通信用大数据平台
            </div>
            <div class="layout-nav">
              <Submenu name="1">
                <template slot="title">
                  数据检索
                </template>
                <router-link to="/main/car_model">
                  <MenuItem name="1-1" >
                    车型检索
                  </MenuItem>
                </router-link>
                <router-link to="/main/car_type">
                  <MenuItem name="1-2" >
                    类别检索
                  </MenuItem>
                </router-link>
                <router-link to="/main/car_licence">
                  <MenuItem name="1-3" >
                    车牌检索
                  </MenuItem>
                </router-link>
                <router-link to="/main/car_photo">
                  <MenuItem name="1-4" >
                    照片检索
                  </MenuItem>
                </router-link>
                <router-link :to="{path:'/main/car_features',query: {type: 'car_features'}}">
                  <MenuItem name="1-5" >
                    特征检索
                  </MenuItem>
                </router-link>
              </Submenu>
              <Submenu name="2">
                <template slot="title">
                  大数据分析
                </template>
                <router-link to="/main/car_deck">
                  <MenuItem name="2-1">
                    套牌分析
                  </MenuItem>
                </router-link>
                <router-link to="/main/car_trajectory">
                  <MenuItem name="2-2">
                    轨迹分析
                  </MenuItem>
                </router-link>
                <router-link to="/main/car_firstCity">
                  <MenuItem name="2-3">
                    初次入城
                  </MenuItem>
                </router-link>
                <router-link to="/main/car_foothold">
                  <MenuItem name="2-4">
                    落脚点分析
                  </MenuItem>
                </router-link>
                <router-link to="/main/car_concealment">
                  <MenuItem name="2-5">
                    隐匿车辆挖掘
                  </MenuItem>
                </router-link>
                <router-link to="/main/car_similar">
                  <MenuItem name="2-6">
                    相似车牌串并
                  </MenuItem>
                </router-link>
                <router-link to="/main/car_multicard">
                  <MenuItem name="2-7">
                    一车多牌
                  </MenuItem>
                </router-link>
                <router-link to="/main/car_frequenttraffic">
                  <MenuItem name="2-8">
                    频繁过车
                  </MenuItem>
                </router-link>
                <router-link to="/main/car_occlusion">
                  <MenuItem name="2-9">
                    遮挡面部识别
                  </MenuItem>
                </router-link>
                <router-link to="/main/car_vehicle">
                  <MenuItem name="2-10">
                    同行车辆
                  </MenuItem>
                </router-link>
              </Submenu>
              <Submenu name="3">
                <template slot="title">
                  布控统计
                </template>
                <router-link to="/main/control_stability">
                  <MenuItem name="3-1">
                    维稳布控
                  </MenuItem>
                </router-link>
                <router-link to="/main/control_plate">
                  <MenuItem name="3-2">
                    车牌精准布控
                  </MenuItem>
                </router-link>
                <router-link to="/main/control_vague">
                  <MenuItem name="3-3">
                    车牌模糊布控
                  </MenuItem>
                </router-link>
                <router-link to="/main/control_model">
                  <MenuItem name="3-4">
                    车型布控
                  </MenuItem>
                </router-link>
                <router-link to="/main/control_type">
                  <MenuItem name="3-5">
                    类别布控
                  </MenuItem>
                </router-link>
                <router-link to="/main/control_approval">
                  <MenuItem name="3-6">
                    布控审批
                  </MenuItem>
                </router-link>
                <router-link to="/main/control_me">
                  <MenuItem name="3-7">
                    我的布控
                  </MenuItem>
                </router-link>

              </Submenu>
            </div>
            <div class="user">
              <div class="demo-avatar">
                <Avatar icon="person" />
              </div>
              <span class="username">ZZY</span>
              <span class="clearUser">退出</span>
            </div>
          </Menu>
        </Header>
        <Content :style="{position:'fixed', top: '64px' , left: '0' , right: '0' , bottom: '0'  , background: '#fff'}">
          <v-map></v-map>
          <router-view/>
        </Content>
      </Layout>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import map from '../../components/map/map.vue'
  export default {
    components:{
      "v-map":map
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  #main
    .ivu-menu-light
      background none
    .ivu-layout-content
      z-index -1
    .layout
      border: 1px solid #d7dde4;
      background: #f5f7f9;
      position: relative;
      border-radius: 4px;
      overflow: hidden;
      .mainheader
        background-image url("./591196654401873902.jpg")
        background-size cover
        .menu
          display: flex
          background: rgba(96,96,96,0.5)
          width 100%
          height:64px
          .title
            color: #ffffff
            width: 15%;
            position: absolute;
            font-size: 16px;
            padding 0 0 0 100px
          .layout-nav
            display :flex
            margin-left :385px
            .ivu-menu-item
              text-align center
          .user
            display :flex
            line-height: 60px
            position: absolute
            right: 100px
            .username
              color:rgba(255,255,255,0.7)
              font-size: 14px
              margin-left :10px
            .clearUser
              color:rgba(255,255,255,0.7)
              font-size: 14px
              cursor :pointer
              margin-left: 20px
</style>
