import ListModel from "Models/list";
import store from "Store";
import { putFile } from "Helper/userSession";

import ItemApi from "Api/item";

const ListApi = {
  getLists() {
    return store.getters.lists;
  },

  getListById(id) {
    return this.getLists()[id];
  },

  newList(name, items) {
    return new ListModel(ListApi.getLists(), ListApi.formatName(name), items);
  },

  addList(name, items) {
    const list = ListApi.newList(name, items);
    store.dispatch("addList", list).then(() => {
      putFile();
    });

    return list;
  },

  updateList(list, name) {
    return store.dispatch("updateList", { id: list.id, name }).then(() => {
      putFile();
    });
  },

  updateListOption(list, option, value) {
    return store
      .dispatch("updateListOption", { id: list.id, option, value })
      .then(() => {
        putFile();
      });
  },

  deleteList(list) {
    return store.dispatch("removeList", list.id);
  },

  addItemToList(list, item_name) {
    const item = ItemApi.newItem(item_name);
    return store
      .dispatch("addListItem", { list_id: list.id, item })
      .then(() => {
        putFile();
      });
  },

  updateItem(list, item, status) {
    return store
      .dispatch("updateListItem", {
        list_id: list.id,
        item_id: item.id,
        status
      })
      .then(() => {
        putFile();
      });
  },

  removeItemFromList(list, item) {
    return store
      .dispatch("removeListItem", {
        list_id: list.id,
        item_id: item.id
      })
      .then(() => {
        putFile();
      });
  },

  formatName(name) {
    return name.trim();
  }
};

export default ListApi;
