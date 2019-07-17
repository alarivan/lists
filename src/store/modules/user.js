const state = {
  user: null
};

// getters
const getters = {
  user: state => {
    return state.user;
  },

  loggedIn: state => {
    return !!state.user;
  }
};

// actions
const actions = {
  addUser({ commit }, user) {
    commit("SET_USER", user);
  },

  removeUser({ commit }) {
    commit("SET_USER", null);
  }
};

// mutations
const mutations = {
  SET_USER(state, user) {
    state.user = user;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
