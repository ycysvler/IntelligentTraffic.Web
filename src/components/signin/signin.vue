<template>
  <div class="signinWrapper">
    <img class="signin_img" src="./130277340373158826.jpg" />
    <div class="signin_list">
      <span class="signin_title">智能交通系统</span>
      <div class="signin">
        <div>
          <span>账号：</span>
          <Input  v-model="admin" placeholder="请输入账号" clearable style="width: 250px;" />
        </div>
        <div class="password">
          <span>密码：</span>
          <Input v-model="password" placeholder="请输入密码" clearable style="width:250px;" type="password" />
        </div>
        <Button class="signin_bottom" type="primary" @click = "signin">搜索</Button>
        <div class="mima">忘记密码</div>
        <div class="tishi" style="font-weight: 700;font-size: 14px;">温馨提示：<div style="margin-top: 8px;">登录账号由系统管理员统一分配，申请账号请联系系统管理员。</div></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return{
        admin:'',
        password:''
      }
    },
    methods:{
      signin(){
        if(this.admin === 'admin' && this.password === "admin"){
          this.$router.push({path:'/main'});
        }
      },
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .signinWrapper
    width 100%
    height: 100%
    display: flex
    align-items center
    justify-content center
    flex-direction column
    padding 200px
    .signin_img
      position: absolute
      left: 0
      right: 0
      top: 0
      bottom: 0
      width :100%
    .signin_list
      width 450px
      height: 380px
      background: rgba(255,255,255,0.5)
      z-index 111
      text-align center
      border-radius :5px
    .signin_title
      font-size: 25px
      font-weight 700
      display: inline-block
      margin-top 30px
    .signin
      margin-top 40px
      .password
        margin-top 20px
      .mima
        width: 80%
        text-align: end
        color: #2d8cf0
        margin-top: 20px
        cursor: pointer
      .signin_bottom
        margin-top 20px
        width 63%
      .tishi
        text-align start
        margin-top 15px
        padding 15px 0
        border-top: 1px solid rgba(213,213,213,0.5)
        width 60%
        margin-left 20%
</style>
