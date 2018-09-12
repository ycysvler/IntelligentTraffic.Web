import axios from 'axios'
import * as types from '../mutation_types'
import moment from 'moment'
/*axios.defaults.baseURL = 'http://1596y81h66.iok.la/intelligent';  //前缀接口*/

axios.defaults.baseURL = 'http://192.168.1.104:7100';  //前缀接口


const state = {
  decks:[],
};


const mutations = {
  [types.SET_DECK](state,items){
    state.decks = items;
  },
};
const getters = {
  getDecks(state){
    return state.decks;
  },
};
const actions = {
  getDecks({commit}){
    axios.get("/api/illegally").then(response => {
      if(response.data){
        for(let i in response.data) {
          let data = response.data[i];
          for(let i in data.items){
            let item = data.items[i];
            let date = moment(item.date).format("YYYYMMDD");
            item.url = "http://192.168.31.34:7100/api/analysis/image" + "/" + date + "/" + item._id;
          }
        }
      }
      commit(types.SET_DECK,response.data);
    })
  },
};

export default {
  state,
  mutations,
  actions,
  getters
}
