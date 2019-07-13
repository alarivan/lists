import ListModel from "../models/list";
import store from "../store";

import { getFromArrayById } from "../helper/main";

import ItemApi from "./item";

const ListApi = {
  getLists() {
    return store.getters.lists;
  },

  getListById(id) {
    let list = getFromArrayById(ListApi.getLists(), id);
    if (list !== null) {
      list = Object.assign({}, list);
      list.items = list.items
        .map(i => {
          return getFromArrayById(ItemApi.getItems(), i);
        })
        .filter(i => {
          return i !== null;
        });
    }

    return list;
  },

  newList(name, items) {
    return new ListModel(ListApi.getLists(), name, items);
  },

  addList(name, items) {
    const list = ListApi.newList(name, items);
    store.dispatch("addList", list);

    return list;
  },

  updateList(list, name) {
    store.dispatch("updateList", { id: list.id, name });
  },

  updateListOption(list, option, value) {
    store.dispatch("updateListOption", { id: list.id, option, value });
  },

  deleteList(list) {
    store.dispatch("removeList", list.id);

    list.items.forEach(i => ItemApi.deleteItem(i));
  },

  addItemToList(list, item) {
    store.dispatch("addListItem", { list_id: list.id, item_id: item.id });
  },

  removeItemFromList(list, item) {
    store.dispatch("removeListItem", {
      list_id: list.id,
      item_id: item.id
    });

    ItemApi.deleteItem(item);
  }
};

export default ListApi;
