// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import  Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from 'axios'
import store from './store'

Vue.prototype.$axios = axios;

Vue.use(iView);
Vue.config.productionTip = false;
axios.defaults.baseURL = 'http://192.168.1.104:7100';  //前缀接口
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
