import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pageData : null
  },
  mutations: {
    setPageData(state, payload) {    
      state.pageData = payload;
    }
  },
  actions: {
    loadPageData ({ commit }) {
    return new Promise((resolve, reject) => {
      window.axios
      .get('https://pixabay.com/api/?key=22801950-85af6513922e735d372177a34&q=cats&image_type=all&per_page=100')
          .then((response) => {
            const data = response?.data?.hits;
            console.log(data);
            commit('setPageData', data);
            resolve(data);
          }).catch((response) => {
          const {error} = response;
          reject(error);
      })
  });
  }
},
  modules: {},
});
