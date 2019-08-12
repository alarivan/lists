import Vue from "vue";
import ListApi from "Api/list";
import { generateUniqueIdObject } from "Helper/main";

const reorderItems = (state, items) => {
  items.forEach((id, index) => {
    Vue.set(state.items[id], "order", index + 1);
  });
};

const state = {
  items: {}
};

// getters
const getters = {
  items: state => state.items,

  listsArray: state => Object.values(state.items).filter(i => !i.parent),
  itemsArray: state => listId =>
    state.items[listId].items.map(i => state.items[i]),

  listById: state => id => state.items[id],
  itemById: state => id => state.item[id]
};

// actions
const actions = {
  setLists({ commit }, lists) {
    commit("SET_LISTS", lists);
  },

  addList({ commit }, list) {
    list.id = generateUniqueIdObject(state.items);

    commit("ADD_LIST", list);
  },

  updateList({ commit, state }, { id, values }) {
    if (state.items.hasOwnProperty(id)) {
      commit("UPDATE_LIST", { id, values });
    }
  },

  deleteList({ commit }, id) {
    commit("DELETE_LIST", id);
  },

  updateListOption({ commit, state }, { id, option, value }) {
    if (state.items.hasOwnProperty(id)) {
      commit("UPDATE_LIST_OPTION", { id, option, value });
    }
  },

  addListItem({ commit, state }, { list_id, item }) {
    if (state.items.hasOwnProperty(list_id)) {
      commit("ADD_LIST_ITEM", { list_id, item });
    }
  },

  updateListItem({ commit, state }, { list_id, item_id, values }) {
    if (state.items.hasOwnProperty(list_id)) {
      commit("UPDATE_LIST_ITEM", { item_id, values });
    }
  },

  deleteListItem({ commit, state }, { list_id, item_id }) {
    if (state.items.hasOwnProperty(list_id)) {
      commit("DELETE_LIST_ITEM", { list_id, item_id });
    }
  },

  updateItemsOrder({ commit, state }, { id, items }) {
    if (state.items.hasOwnProperty(id)) {
      commit("UPDATE_ITEMS_ORDER", { id, items });
    }
  }
};

// mutations
const mutations = {
  SET_LISTS(state, items) {
    state.items = items;
  },

  ADD_LIST(state, list) {
    Vue.set(state.items, list.id, list);
  },

  UPDATE_LIST(state, { id, values }) {
    Vue.set(state.items, id, Object.assign(state.items[id], values));
  },

  DELETE_LIST(state, id) {
    const parentId = state.items[id].parent;

    state.items[id].items.forEach(i => {
      Vue.delete(state.items, i);
    });

    Vue.delete(state.items, id);

    if (parentId) {
      Vue.set(
        state.items,
        parentId,
        ListApi.deleteItem(state.items[parentId], id)
      );

      reorderItems(state, state.items[parentId].items);
    }
  },

  UPDATE_LIST_OPTION(state, { id, option, value }) {
    const list = state.items[id];
    list.options[option] = value;

    Vue.set(state.items, list.id, list);
  },

  ADD_LIST_ITEM(state, { list_id, item }) {
    Vue.set(state.items, item.id, item);
    Vue.set(
      state.items,
      list_id,
      ListApi.addItem(state.items[list_id], item.id)
    );

    reorderItems(state, state.items[list_id].items);
  },

  UPDATE_LIST_ITEM(state, { item_id, values }) {
    Vue.set(
      state.items,
      item_id,
      Object.assign({}, state.items[item_id], values)
    );
  },

  DELETE_LIST_ITEM(state, { list_id, item_id }) {
    Vue.set(
      state.items,
      list_id,
      ListApi.deleteItem(state.items[list_id], item_id)
    );

    Vue.delete(state.items, item_id);

    reorderItems(state, state.items[list_id].items);
  },

  UPDATE_ITEMS_ORDER(state, { id, items }) {
    const list = state.items[id];
    list.items = items.map(i => i.id);
    Vue.set(state.items, list.id, list);

    reorderItems(state, list.items);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
