import axios from 'axios'
import * as types from '../mutation_types'
axios.defaults.baseURL = 'http://1596y81h66.iok.la/intelligent';  //前缀接口

const state = {
  maps:[],
  SelectMaps:[]
};

const mutations = {
  [types.SET_MAP](state,items){
    state.maps = items
  },
  [types.SET_SELECTPOINTS](state,items){
    console.log('types.SET_SELECTPOINTS',items);
    state.SelectMaps = items
  }
};

const getters = {
  getMaps(state) {
    return state.maps
  },
  getSelectMaps(state) {
    return state.SelectMaps
  }
};

const actions = {
  getKakous(context){
    axios.get("/api/kakou").then(response => {
      context.commit(types.SET_MAP,response.data);
    })
  },

  setPoint(context,data){
   context.commit(types.SET_SELECTPOINTS,data);
  }
};

export default {
  state,
  mutations,
  getters,
  actions
}
