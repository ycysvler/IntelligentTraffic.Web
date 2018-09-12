import axios from 'axios'
import * as types from '../mutation_types'
axios.defaults.baseURL = 'http://192.168.1.104:7100';  //前缀接口

const state = {
  photos:[],
};

const mutations = {
  [types.SET_PHOTO](state,items){
    state.photos = items;
  },

};
const getters = {
  getPhoto(state){
    return state.photos;
  },

};
const actions = {
  getPhoto({commit},formdata){
    axios.post("/api/analysis/search/images", formdata).then(response => {
      if(response.data){
      }
      commit(types.SET_PHOTO, response.data)
    })
  },

};

export default {
  state,
  mutations,
  actions,
  getters
}
