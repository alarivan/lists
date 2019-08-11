const state = {
  loading: true,
  itemFormList: null,
  deleteItemDialogData: null
};

// getters
const getters = {
  loading: state => state.loading,

  itemFormList: state => state.itemFormList,

  deleteItemDialogData: state => state.deleteItemDialogData
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
  },

  openDeleteItemDialog({ commit }, data) {
    commit("SET_DELETE_DIALOG_DATA", data);
  },

  closeDeleteItemDialog({ commit }) {
    commit("SET_DELETE_DIALOG_DATA", null);
  }
};

// mutations
const mutations = {
  SET_LOADING(state, value) {
    state.loading = value;
  },

  SET_ITEM_FORM_LIST(state, list) {
    state.itemFormList = list;
  },

  SET_DELETE_DIALOG_DATA(state, data) {
    state.deleteItemDialogData = data;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
