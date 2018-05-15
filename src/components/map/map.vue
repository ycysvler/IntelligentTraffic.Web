<template>
  <div class="map-wrapper">
    <div id="allmap" style="overflow:hidden;zoom:1;position:relative;" ></div>

  </div>
</template>

<script type="text/ecmascript-6">
  import BMap from 'BMap'

  export default {
    // 这是声明v-model
    data(){
      return{}
    },
    // 已实例化本组件（dom未创建完成）
    created(){

    },
    // 已经创建出dom元素
    mounted () {
      this.ready()
    },
    // 计算属性
    computed:{

    },
    // 监听某个属性的变化
    watch:{
      "$store.getters.getMaps":function (val, oldVal) {
        this.drawMarker(val);
        return val
      }
    },


    methods: {



      drawMarker(kakous){
        window.marks = [];
        for (var i = 0; i < kakous.length; i++) {
          var kakou = kakous[i];
          var myIcon = new BMap.Icon("http://lbsyun.baidu.com/jsdemo/img/fox.gif", new BMap.Size(300, 157)); //换图标
          var marker = new BMap.Marker(new BMap.Point(kakou.lng,kakou.lat));
          /*var marker2 = new BMap.Marker(new BMap.Point(data_info[i][0],data_info[i][1]), {icon: myIcon}); */// 创建标注
          marker.kakouid = kakou.kakouid;
          window.marks.push(marker);
          window.bdmap.addOverlay(marker);   // 将标注添加到地图中
        }
      },
      ready () {
        var _this = this;
        var map = new BMap.Map('allmap');
        var ALLmapPiont = [];
        var mapPiont = [];

        window.bdmap = map;
        map.centerAndZoom(new BMap.Point(116.417854, 39.921988), 13);
        map.setCurrentCity("北京");
        map.enableScrollWheelZoom(true);


        var overlays = [];
        var overlaycomplete = function (e) {

          overlays.push(e.overlay);
          //画矩形的时候
          if(e.drawingMode === BMAP_DRAWING_RECTANGLE){
            let olRectPoint = e.overlay.Ou;
            let leftTopLng = olRectPoint.Nl.lng;                        //左上经度
            let leftTopLat = olRectPoint.Nl.lat;                        //左上纬度
            let rightBottomLng = olRectPoint.wl.lng;                    //右上经度
            let rightBottomLat = olRectPoint.wl.lat;                    //右上纬度
            let pStart = new BMap.Point(leftTopLng,leftTopLat);
            let pEnd = new BMap.Point(rightBottomLng,rightBottomLat);
            let bs = new BMap.Bounds(pStart,pEnd);                      //边框范围
            for(let i= 0;i< window.marks.length;i++){
              let mark =  window.marks[i];
              console.log(mark);
              let result = BMapLib.GeoUtils.isPointInRect(mark.point,bs);
              if(result === true){
                ALLmapPiont.push(mark.kakouid);
                mapPiont = [...new Set(ALLmapPiont)]; //去重之后的数组
                _this.$store.dispatch('setPoint',mapPiont);   //  把框选之后的数组放到store里
              }
            }
          }
          //画圆形的时候
          if (e.drawingMode === BMAP_DRAWING_CIRCLE) {
            let yuanbanjin = e.overlay.getRadius(); //圆的半径
            let circle = new BMap.Circle(new BMap.Point(e.overlay.getCenter().lng,e.overlay.getCenter().lat), yuanbanjin);
            for(let i= 0;i< window.marks.length;i++){
              let mark =  window.marks[i];
              console.log(mark);
              let result = BMapLib.GeoUtils.isPointInCircle(mark.point,circle);
              console.log("circle",circle);
              if(result === true){
                ALLmapPiont.push(mark.kakouid);
                mapPiont = [...new Set(ALLmapPiont)]; //去重之后的数组
                _this.$store.dispatch('setPoint',mapPiont);   //  把圈选之后的数组放到store里
              }
            }
          }
        };
        var styleOptions = {
          strokeColor:"red",     //边线颜色。
          fillColor:"red",       //填充颜色。当参数为空时，圆形将没有填充效果。
          strokeWeight: 3,       //边线的宽度，以像素为单位。
          strokeOpacity: 0.8,	   //边线透明度，取值范围0 - 1。
          fillOpacity: 0.6,      //填充的透明度，取值范围0 - 1。
          strokeStyle: 'solid'   //边线的样式，solid或dashed。
        };
        //实例化鼠标绘制工具
        var drawingManager = new BMapLib.DrawingManager(map, {
          isOpen: false,            //是否开启绘制模式
          enableDrawingTool: false, //是否显示工具栏
          drawingToolOptions: {
            anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
            offset: new BMap.Size(5, 5),  //偏离值
          },
          circleOptions: styleOptions,    //圆的样式
          polylineOptions: styleOptions,  //线的样式
          polygonOptions: styleOptions,   //多边形的样式
          rectangleOptions: styleOptions  //矩形的样式
        });
        //添加鼠标绘制工具监听事件，用于获取绘制结果
        drawingManager.addEventListener('overlaycomplete', overlaycomplete);
        window.drawingManager = drawingManager;

        window.clearAll = function () {
          for(let i = 0; i < overlays.length; i++){
            map.removeOverlay(overlays[i]);
          }
          overlays.length = 0
        };

        // 请求卡口数据
        this.$store.dispatch('getKakous');
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .map-wrapper
    height: 100%
    width : 100%
    #allmap
      width: 100%
      height: 100%
    #result
      width :100%
      font-size: 12px
  .anchorBL{
    display:none;
  }

</style>
