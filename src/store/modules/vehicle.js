import  axios from 'axios'
import * as types from '../mutation_types'

const state = {
  brands:[],
  models:[],
  years:[],
  types:[]
};

const mutations = {
  [types.SET_BRAND](state,items){
    state.brands = items;
  },
  [types.SET_MODEL](state,items){
    state.models = items;
  },
  [types.SET_YEAR](state,items){
    state.years = items;
  },
  [types.SET_TYPE](state,items){
    state.types = items;
  },
};

const getters = {
  getBrands(state){
    return state.brands;
  },
  getModels(state){
    return state.models;
  },
  getYears(state){
    return state.years;
  },
  getTypes(state){
    return state.types;
  }
};

const actions = {
  getBrands({commit}){
    axios.get("/api/vehicletype/vehiclebrand").then(response => {
      commit(types.SET_BRAND,response.data);
    })
  },
  getModels({commit},brandValue){
    axios.get("/api/vehicletype/vehiclemodel/" + brandValue).then(response => {
      commit(types.SET_MODEL, response.data)
    })
  },
  getYears({commit},modelValue){
    axios.get("/api/vehicletype/vehicleyear/" + modelValue).then(response => {
      commit(types.SET_YEAR, response.data)
    })
  },
  getTypes({commit}){
    axios.get("/api/vehicletype/vehicletype/").then(response => {
      commit(types.SET_TYPE, response.data)
    })
  },
};

export default {
  state,
  mutations,
  actions,
  getters
}
