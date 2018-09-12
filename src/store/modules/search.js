import axios from 'axios'
import moment from 'moment'
import * as types from '../mutation_types'
axios.defaults.baseURL = 'http://192.168.1.104:7100';  //前缀接口

const state = {
  param: {},
  searchs: [],
};

const mutations = {
  [types.SET_SEARCH](state, items) {
    state.searchs = items
  },
  ["param"](state, param) {
    state.param = param;
  },
};

const getters = {
  getSearch(state) {
    return state.searchs
  },
  getParam(state) {
    return state.param
  },
};

const actions = {

  getSearch({commit}, search) {
    let param = {
      "kakouid": search.kakouid,
      "platenumber": search.plateNum,
      "vehiclebrand":search.brand,
      "vehiclemodel":search.model,
      "platetype":search.type,
      "vehicleyear":search.year,
      "begin": search.begin,
      "end": search.end,
      "pagesize": search.pagesize,
      "current": search.current
    };
    commit("param", param);

    axios.post("/api/analysis/search/1", param).then(response => {
      if (response.data) {
        for (let i in response.data.data) {
          let item = response.data.data[i];
          let date = moment(item.date).format("YYYYMMDD");
          item.url = "http://192.168.31.34:7100/api/analysis/image" + "/" + date + "/" + item._id;
          item.date = moment(item.date).format("YYYY-MM-DD hh:mm:ss");
        }
      }
      commit(types.SET_SEARCH, response.data)
    })
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}
