<template>
  <div class="car_photoWrapper">
    <div class="car_photo">
      <h2 class="photo_title">照片检索</h2>
      <photo_upload></photo_upload>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import photo_upload from '../photo_upload/photo_upload.vue'
  export default {
    components:{
      photo_upload
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .car_photoWrapper
    .car_photo
      position:absolute
      top: 25px
      left: 25px
      width :388px
      height: 737px
      background:rgba(251,251,251,1);
      border-radius: 4px
      box-shadow: 0 0 7px 0 rgba(213,213,213,0.5)
      border-bottom: 1px solid rgba(213,213,213,0.5)
      .photo_title
        text-align: center
        padding :10px
</style>
