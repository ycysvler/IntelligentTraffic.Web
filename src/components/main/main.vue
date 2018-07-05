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
              <router-link to="/main/car_model">
                <MenuItem name="1" style="width: 100px">
                  车型检索
                </MenuItem>
              </router-link>
              <router-link to="/main/car_type">
                <MenuItem name="2" style="width: 100px">
                  类别检索
                </MenuItem>
              </router-link>
              <router-link to="/main/car_licence">
              <MenuItem name="3" style="width: 100px">
                车牌检索
              </MenuItem>
              </router-link>
              <router-link to="/main/car_photo">
              <MenuItem name="4" style="width: 100px">
                照片检索
              </MenuItem>
              </router-link>
               <router-link to="/main/car_deck">
              <MenuItem name="5" style="width: 100px">
                套牌分析
              </MenuItem>
               </router-link>
                <router-link to="/main/car_trajectory">
                <MenuItem name="6" style="width: 100px">
                  轨迹分析
                </MenuItem>
               </router-link>
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
            width: 420px;
            margin-left :385px
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
