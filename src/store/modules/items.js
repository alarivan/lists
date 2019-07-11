import { getIndexFromArrayById } from "../../helper/main";

const state = {
  items: [],
  sortDirection: false,
  sortStatus: true,
  showComplete: true
};

// getters
const getters = {
  items: state => {
    return state.items;
  },

  sortStatus: state => {
    return state.sortStatus;
  },

  sortDirection: state => {
    return state.sortDirection;
  },

  showComplete: state => {
    return state.showComplete;
  }
};

// actions
const actions = {
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
  },

  setSortStatus({ commit }, value) {
    commit("SET_SORT_STATUS", value);
  },

  setSortDirection({ commit }, value) {
    commit("SET_SORT_DIRECTION", value);
  },

  setShowComplete({ commit }, value) {
    commit("SET_SHOW_COMPLETE", value);
  }
};

// mutations
const mutations = {
  ADD_ITEM(state, item) {
    state.items.push(item);
  },

  REMOVE_ITEM(state, index) {
    state.items.splice(index, 1);
  },

  UPDATE_ITEM(state, { index, status }) {
    state.items[index].status = status;
  },

  SET_SORT_STATUS(state, value) {
    state.sortStatus = value;
  },

  SET_SORT_DIRECTION(state, value) {
    state.sortDirection = value;
  },

  SET_SHOW_COMPLETE(state, value) {
    state.showComplete = value;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
