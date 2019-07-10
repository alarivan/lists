import ItemModel from "../models/item";
import store from "../store";

import { getFromArrayById } from "../helper/main";

const ItemApi = {
  getItems() {
    return store.getters.items;
  },

  getItemById(id) {
    return getFromArrayById(ItemApi.getItems(), id);
  },

  newItem(name, status) {
    return new ItemModel(name, status);
  },

  addItem(name, status) {
    const item = ItemApi.newItem(name, status);
    store.dispatch("addItem", item);

    return item;
  },

  updateItem(id, status) {
    store.dispatch("updateItem", { id, status });
  },

  deleteItem(item) {
    store.dispatch("removeItem", item.id);
  }
};

export default ItemApi;
