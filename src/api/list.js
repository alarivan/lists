import ListModel from "Models/list";
import store from "Store";
import { putFile } from "Helper/userSession";

import { getFromArrayById } from "Helper/main";

import ItemApi from "Api/item";

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
    store.dispatch("removeList", list.id);

    return ItemApi.deleteItems(list.items).then(() => {
      putFile();
    });
  },

  addItemToList(list, item) {
    return store
      .dispatch("addListItem", { list_id: list.id, item_id: item.id })
      .then(() => {
        putFile();
      });
  },

  removeItemFromList(list, item) {
    store.dispatch("removeListItem", {
      list_id: list.id,
      item_id: item.id
    });

    return ItemApi.deleteItem(item).then(() => {
      putFile();
    });
  }
};

export default ListApi;
