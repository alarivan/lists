const state = {
  loading: true
};

// getters
const getters = {
  loading: state => {
    return state.loading;
  }
};

// actions
const actions = {
  setLoading({ commit }, value) {
    commit("SET_LOADING", value);
  }
};

// mutations
const mutations = {
  SET_LOADING(state, value) {
    state.loading = value;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
