import ItemModel from "Models/item";

const ItemApi = {
  newItem(name, status) {
    return new ItemModel(ItemApi.formatName(name), status);
  },

  formatName(name) {
    return name.trim();
  }
};

export default ItemApi;
