const state = {
  loading: true,
  itemFormList: null,
  undoItem: null
};

// getters
const getters = {
  loading: (state) => state.loading,

  itemFormList: (state) => state.itemFormList,

  undoItem: (state) => state.undoItem
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

  setUndoItem({ commit }, item) {
    commit("SET_UNDO_ITEM", item);

    setTimeout(() => {
      commit("SET_UNDO_ITEM", null);
    }, 3000);
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

  SET_UNDO_ITEM(state, item) {
    state.undoItem = item;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
