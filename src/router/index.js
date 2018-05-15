import Vue from 'vue'
import Router from 'vue-router'
import sigin from '../components/signin/signin.vue'
import main from '../components/main/main.vue'
import car_model from '../components/car_model/car_model.vue'
import car_type from  '../components/car_type/car_type.vue'
import car_licence from '../components/car_licence/car_licence.vue'
import car_photo from '../components/car_photo/car_photo.vue'
Vue.use(Router);

export default new Router({
  routes: [
    {
      //登录
      path: '/',
      name: 'sigin',
      component: sigin
    },
    {
      //主页
      path: '/main',
      name: 'main',
      component: main ,
      redirect: '/main/car_model',
      children:[
        {
          path: '/main/car_model',
          name: 'car_model',
          component: car_model
        },
        {
          path: '/main/car_type',
          name: 'car_type',
          component: car_type
        },
        {
          path: '/main/car_licence',
          name: 'car_licence',
          component: car_licence
        },
        {
          path: '/main/car_photo',
          name: 'car_photo',
          component: car_photo
        }
      ]
    }
  ]
})
