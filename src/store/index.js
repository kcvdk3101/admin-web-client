import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  namespace: true,
  strict: true,

  state: { drawer: true, products: [] },
  getters: {
    DRAWER_STATE(state) {
      return state.drawer;
    },
    products: (state) => state.products,
  },
  mutations: {
    toggleDrawer(state) {
      state.drawer = !state.drawer;
    },
    GET_PRODUCTS(state, products) {
      state.products = products;
    },
  },
  actions: {
    TOGGLE_DRAWER({ commit }) {
      commit("toggleDrawer");
    },
    async getProducts({ commit }) {
      try {
        const response = await axios.get(
          "http://localhost:3002/baskets?userId=a1"
        );
        commit("GET_PRODUCTS", response.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {},
});
