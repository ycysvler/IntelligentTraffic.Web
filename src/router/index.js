import Vue from 'vue'
import Router from 'vue-router'
import sigin from '../components/signin/signin.vue'
import main from '../components/main/main.vue'
import car_model from '../components/car_model/car_model.vue'
import car_type from  '../components/car_type/car_type.vue'
import car_licence from '../components/car_licence/car_licence.vue'
import car_photo from '../components/car_photo/car_photo.vue'
import car_deck from '../components/car_deck/car_deck.vue'
import car_trajectory from '../components/car_trajectory/car_trajectory.vue'
import car_features from '../components/car_features/car_features.vue'
import car_firstCity from '../components/car_firstCity/car_firstCity.vue'
import car_foothold from '../components/car_foothold/car_foothold.vue'
import car_concealment from '../components/car_concealment/car_concealment.vue'
import car_similar from '../components/car_similar/car_similar.vue'
import car_multicard from '../components/car_multicard/car_multicard.vue'
import car_frequenttraffic from '../components/car_frequenttraffic/car_frequenttraffic.vue'
import car_occlusion from '../components/car_occlusion/car_occlusion.vue'
import car_vehicle from '../components/car_vehicle/car_vehicle.vue'
import control_stability from '../components/control_stability/control_stability.vue'
import control_plate from '../components/control_plate/control_plate.vue'
import control_vague from '../components/control_vague/control_vague.vue'
import control_model from '../components/control_model/control_model.vue'
import control_type from '../components/control_type/control_type.vue'
import control_approval from '../components/control_approval/control_approval.vue'
import control_me from  '../components/control_me/control_me.vue'
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
        },
        {
          path: '/main/car_deck',
          name: 'car_deck',
          component: car_deck
        },
        {
          path: '/main/car_trajectory',
          name: 'car_trajectory',
          component: car_trajectory
        },
        {
          path: '/main/car_features',
          name: 'car_features',
          component: car_features
        },
        {
          path: '/main/car_firstCity',
          name: 'car_firstCity',
          component: car_firstCity
        },
        {
          path: '/main/car_foothold',
          name: 'car_foothold',
          component: car_foothold
        },
        {
          path: '/main/car_concealment',
          name: 'car_concealment',
          component: car_concealment
        },
        {
          path: '/main/car_similar',
          name: 'car_similar',
          component: car_similar
        },
        {
          path: '/main/car_multicard',
          name: 'car_multicard',
          component: car_multicard
        },
        {
          path: '/main/car_frequenttraffic',
          name: 'car_frequenttraffic',
          component: car_frequenttraffic
        },
        {
          path: '/main/car_occlusion',
          name: 'car_occlusion',
          component: car_occlusion
        },
        {
          path: '/main/car_vehicle',
          name: 'car_vehicle',
          component: car_vehicle
        },
        {
          path: '/main/control_stability',
          name: 'control_stability',
          component: control_stability
        },
        {
          path: '/main/control_plate',
          name: 'control_plate',
          component: control_plate
        },
        {
          path: '/main/control_vague',
          name: 'control_vague',
          component: control_vague
        },
        {
          path: '/main/control_model',
          name: 'control_model',
          component: control_model
        },
        {
          path: '/main/control_type',
          name: 'control_type',
          component: control_type
        },
        {
          path: '/main/control_approval',
          name: 'control_approval',
          component: control_approval
        },
        {
          path: '/main/control_me',
          name: 'control_me',
          component: control_me
        },
      ]
    }
  ]
})
