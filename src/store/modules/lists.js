import { getIndexFromArrayById } from "Helper/main";
import ListApi from "Api/list";

const state = {
  lists: []
};

// getters
const getters = {
  lists: state => {
    return state.lists;
  },

  listsWithItems: state => {
    return state.lists.map(l => {
      return ListApi.getListById(l.id);
    });
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
    const index = getIndexFromArrayById(state.lists, id);
    if (index !== null) {
      let list = state.lists[index];
      list.name = name;
      commit("UPDATE_LIST", { index, list });
    }
  },

  updateListOption({ commit, state }, { id, option, value }) {
    const index = getIndexFromArrayById(state.lists, id);
    if (index !== null) {
      commit("UPDATE_LIST_OPTION", { index, option, value });
    }
  },

  removeList({ commit, state }, id) {
    const index = getIndexFromArrayById(state.lists, id);
    if (index !== null) {
      commit("REMOVE_LIST", index);
    }
  },

  addListItem({ commit, state }, { list_id, item_id }) {
    const index = getIndexFromArrayById(state.lists, list_id);
    if (index !== null) {
      commit("ADD_LIST_ITEM", { index, item_id });
    }
  },

  removeListItem({ commit, state }, { list_id, item_id }) {
    const list_index = getIndexFromArrayById(state.lists, list_id);
    if (list_index !== null) {
      const item_index = state.lists[list_index].items.findIndex(
        i => i === item_id
      );
      if (item_index !== null) {
        commit("REMOVE_LIST_ITEM", { list_index, item_index });
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
    state.lists.push(list);
  },

  UPDATE_LIST(state, { index, list }) {
    state.lists[index] = list;
  },

  REMOVE_LIST(state, index) {
    state.lists.splice(index, 1);
  },

  ADD_LIST_ITEM(state, { index, item_id }) {
    state.lists[index].items.unshift(item_id);
  },

  REMOVE_LIST_ITEM(state, { list_index, item_index }) {
    state.lists[list_index].items.splice(item_index, 1);
  },

  UPDATE_LIST_OPTION(state, { index, option, value }) {
    let list = state.lists[index];
    list.options[option] = value;
    state.lists[index] = list;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
