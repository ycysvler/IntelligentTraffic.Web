import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import vehicle from './modules/vehicle'
import search from './modules/search'
import map from  './modules/map'
import photo from  './modules/photo'
import deck from './modules/deck'
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';


export default new Vuex.Store({
  modules:{
    vehicle,
    search,
    map,
    photo,
    deck
  },
  strict: debug,
  plugins: debug? [createLogger()] : []
})
