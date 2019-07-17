import { getIndexFromArrayById } from "Helper/main";

const state = {
  items: []
};

// getters
const getters = {
  items: state => {
    return state.items;
  }
};

// actions
const actions = {
  setItems({ commit }, items) {
    commit("SET_ITEMS", items);
  },

  addItem({ commit }, item) {
    commit("ADD_ITEM", item);
  },

  removeItem({ commit, state }, id) {
    const index = getIndexFromArrayById(state.items, id);
    if (index !== null) {
      commit("REMOVE_ITEM", index);
    }
  },

  updateItem({ commit, state }, { id, status }) {
    const index = getIndexFromArrayById(state.items, id);
    if (index !== null) {
      commit("UPDATE_ITEM", { index, status });
    }
  }
};

// mutations
const mutations = {
  SET_ITEMS(state, items) {
    state.items = items;
  },

  ADD_ITEM(state, item) {
    state.items.push(item);
  },

  REMOVE_ITEM(state, index) {
    state.items.splice(index, 1);
  },

  UPDATE_ITEM(state, { index, status }) {
    state.items[index].status = status;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
