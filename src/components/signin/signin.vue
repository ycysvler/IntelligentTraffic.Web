<template>
  <div class="signinWrapper">
    <span class="signin_title">智能交通系统</span>
  <!--  <router-link to="/main">
    </router-link>-->
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
    .signin_title
      font-size: 30px
      font-weight 700
    .signin
      margin-top 50px
      .password
        margin-top 20px
      .signin_bottom
        margin-top 20px
        width 100%
</style>
