import ItemModel from "Models/item";
import store from "Store";
import { putFile } from "Helper/userSession";

import { getFromArrayById } from "Helper/main";

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
    store.dispatch("updateItem", { id, status }).then(() => {
      putFile();
    });
  },

  deleteItem(item) {
    store.dispatch("removeItem", item.id);
  }
};

export default ItemApi;
