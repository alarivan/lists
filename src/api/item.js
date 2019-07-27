import ItemModel from "Models/item";

const ItemApi = {
  newItem(list, name, status) {
    return new ItemModel(ItemApi.formatName(name), {
      status,
      order: list.items.length + 1
    });
  },

  formatName(name) {
    return name.trim();
  }
};

export default ItemApi;
