export default drawerModule = {
  state: {
    drawer: true,
  },
  getters: {
    DRAWER_STATE(state) {
      return state.drawer;
    },
  },
  mutations: {
    toggleDrawer(state) {
      state.drawer = !state.drawer;
    },
  },

  actions: {
    TOGGLE_DRAWER({ commit }) {
      commit("toggleDrawer");
    },
  },
};
