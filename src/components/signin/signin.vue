<template>
  <div class="signinWrapper">
    <img class="signin_img" src="./130277340373158826.jpg" />
    <div class="signin_list">
      <span class="signin_title">智能交通系统</span>
      <div class="signin">
        <div>
          <span>账号：</span>
          <Input v-model="admin" placeholder="请输入账号" clearable style="width: 250px;" />
        </div>
        <div class="password">
          <span>密码：</span>
          <Input v-model="password" placeholder="请输入密码" clearable style="width:250px;" type="password" />
        </div>
        <Button class="signin_bottom" type="primary" @click = "signin">搜索</Button>
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
      }
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
      height: 300px
      background white
      z-index 111
      text-align center
      border-radius :5px
    .signin_title
      font-size: 30px
      font-weight 700
      display: inline-block
      margin-top 20px
    .signin
      margin-top 50px
      .password
        margin-top 20px
      .signin_bottom
        margin-top 50px
        width 63%

</style>
