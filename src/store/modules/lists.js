import Vue from "vue";
import { getIndexFromArrayById } from "Helper/main";

const state = {
  lists: {}
};

// getters
const getters = {
  lists: state => {
    return state.lists;
  },

  listsArray: state => {
    return Object.values(state.lists);
  }
};

// actions
const actions = {
  setLists({ commit }, lists) {
    commit("SET_LISTS", lists);
  },

  addList({ commit }, list) {
    commit("ADD_LIST", list);
  },

  updateList({ commit, state }, { id, name }) {
    if (state.lists.hasOwnProperty(id)) {
      const list = state.lists[id];
      list.name = name;
      commit("UPDATE_LIST", list);
    }
  },

  updateListOption({ commit, state }, { id, option, value }) {
    if (state.lists.hasOwnProperty(id)) {
      commit("UPDATE_LIST_OPTION", { id, option, value });
    }
  },

  removeList({ commit }, id) {
    commit("REMOVE_LIST", id);
  },

  addListItem({ commit, state }, { list_id, item }) {
    if (state.lists.hasOwnProperty(list_id)) {
      commit("ADD_LIST_ITEM", { list_id, item });
    }
  },

  updateListItem({ commit, state }, { list_id, item_id, status }) {
    if (state.lists.hasOwnProperty(list_id)) {
      const item_index = getIndexFromArrayById(
        state.lists[list_id].items,
        item_id
      );

      if (item_index !== null) {
        commit("UPDATE_LIST_ITEM", { list_id, item_index, status });
      }
    }
  },

  removeListItem({ commit, state }, { list_id, item_id }) {
    if (state.lists.hasOwnProperty(list_id)) {
      const item_index = getIndexFromArrayById(
        state.lists[list_id].items,
        item_id
      );

      if (item_index !== null) {
        commit("REMOVE_LIST_ITEM", { list_id, item_index });
      }
    }
  }
};

// mutations
const mutations = {
  SET_LISTS(state, lists) {
    state.lists = lists;
  },

  ADD_LIST(state, list) {
    Vue.set(state.lists, list.id, list);
  },

  UPDATE_LIST(state, list) {
    Vue.set(state.lists, list.id, list);
  },

  REMOVE_LIST(state, id) {
    Vue.delete(state.lists, id);
  },

  ADD_LIST_ITEM(state, { list_id, item }) {
    const list = state.lists[list_id];
    list.items.unshift(item);

    Vue.set(state.lists, list.id, list);
  },

  UPDATE_LIST_ITEM(state, { list_id, item_index, status }) {
    const list = state.lists[list_id];
    list.items[item_index].status = status;

    Vue.set(state.lists, list.id, list);
  },

  REMOVE_LIST_ITEM(state, { list_id, item_index }) {
    const list = state.lists[list_id];
    list.items.splice(item_index, 1);

    Vue.set(state.lists, list.id, list);
  },

  UPDATE_LIST_OPTION(state, { id, option, value }) {
    const list = state.lists[id];
    list.options[option] = value;

    Vue.set(state.lists, list.id, list);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
