import { generateUniqueIdArray } from "Helper/main";
import ItemModel from "Models/item";

const ItemApi = {
  newItem(list, name, status = false) {
    return ItemModel({
      id: generateUniqueIdArray(list.items),
      name: ItemApi.formatName(name),
      status
    });
  },

  formatName(name) {
    return name.trim();
  }
};

export default ItemApi;
