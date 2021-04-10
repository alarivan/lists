const state = {
  loading: true,
  itemFormList: null,
  undoItem: null,
  undoTimeout: null
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

  setUndoItem({ commit, state }, item) {
    if (state.undoTimeout) clearTimeout(state.undoTimeout);
    if (item) {
      const timeout = setTimeout(() => {
        commit("SET_UNDO_ITEM", { item: null, timeout: null });
      }, 3000);

      commit("SET_UNDO_ITEM", { item, timeout });
    } else {
      commit("SET_UNDO_ITEM", { item, timeout: null });
    }
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

  SET_UNDO_ITEM(state, { item, timeout }) {
    state.undoTimeout = timeout;
    state.undoItem = item;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
