const state = {
  loading: true,
  itemFormList: null
};

// getters
const getters = {
  loading: state => state.loading,

  itemFormList: state => state.itemFormList
};

// actions
const actions = {
  setLoading({ commit }, value) {
    commit("SET_LOADING", value);
  },

  openItemForm({ commit }, list) {
    commit("SET_ITEM_FORM_LIST", list);
  },

  closeItemForm({ commit }) {
    commit("SET_ITEM_FORM_LIST", null);
  }
};

// mutations
const mutations = {
  SET_LOADING(state, value) {
    state.loading = value;
  },

  SET_ITEM_FORM_LIST(state, list) {
    state.itemFormList = list;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
