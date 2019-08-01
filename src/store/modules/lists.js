import Vue from "vue";
import ListApi from "Api/list";
import { generateUniqueIdObject } from "Helper/main";

const state = {
  lists: {}
};

// getters
const getters = {
  lists: state => state.lists,

  listsArray: state => Object.values(state.lists),

  listById: state => id => state.lists[id]
};

// actions
const actions = {
  setLists({ commit }, lists) {
    commit("SET_LISTS", lists);
  },

  addList({ commit }, list) {
    list.id = generateUniqueIdObject(state.lists);

    commit("ADD_LIST", list);
  },

  updateList({ commit, state }, { id, values }) {
    if (state.lists.hasOwnProperty(id)) {
      commit("UPDATE_LIST", { id, values });
    }
  },

  deleteList({ commit }, id) {
    commit("DELETE_LIST", id);
  },

  updateListOption({ commit, state }, { id, option, value }) {
    if (state.lists.hasOwnProperty(id)) {
      commit("UPDATE_LIST_OPTION", { id, option, value });
    }
  },

  addListItem({ commit, state }, { list_id, item }) {
    if (state.lists.hasOwnProperty(list_id)) {
      commit("ADD_LIST_ITEM", { list_id, item });
    }
  },

  updateListItem({ commit, state }, { list_id, item_id, values }) {
    if (state.lists.hasOwnProperty(list_id)) {
      commit("UPDATE_LIST_ITEM", { list_id, item_id, values });
    }
  },

  deleteListItem({ commit, state }, { list_id, item_id }) {
    if (state.lists.hasOwnProperty(list_id)) {
      commit("DELETE_LIST_ITEM", { list_id, item_id });
    }
  },

  updateItemsOrder({ commit, state }, { id, items }) {
    if (state.lists.hasOwnProperty(id)) {
      commit("UPDATE_ITEMS_ORDER", { id, items });
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

  UPDATE_LIST(state, { id, values }) {
    Vue.set(state.lists, id, ListApi.updateList(state.lists[id], values));
  },

  DELETE_LIST(state, id) {
    Vue.delete(state.lists, id);
  },

  UPDATE_LIST_OPTION(state, { id, option, value }) {
    const list = state.lists[id];
    list.options[option] = value;

    Vue.set(state.lists, list.id, list);
  },

  ADD_LIST_ITEM(state, { list_id, item }) {
    Vue.set(state.lists, list_id, ListApi.addItem(state.lists[list_id], item));
  },

  UPDATE_LIST_ITEM(state, { list_id, item_id, values }) {
    Vue.set(
      state.lists,
      list_id,
      ListApi.updateItem(state.lists[list_id], item_id, values)
    );
  },

  DELETE_LIST_ITEM(state, { list_id, item_id }) {
    Vue.set(
      state.lists,
      list_id,
      ListApi.deleteItem(state.lists[list_id], item_id)
    );
  },

  UPDATE_ITEMS_ORDER(state, { id, items }) {
    const list = state.lists[id];
    list.items = ListApi.reorderItems(items);

    Vue.set(state.lists, list.id, list);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
