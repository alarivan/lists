import { generateUniqueIdArray } from "Helper/main";
import ItemModel from "Models/item";
import ListModel from "Models/list";

const ItemApi = {
  newItem(list, name, status = false) {
    return ItemModel({
      id: generateUniqueIdArray(list.items),
      parent: list.id,
      name: this.formatName(name),
      status
    });
  },

  newListItem(list, name, status = false, items = []) {
    return ListModel({
      id: generateUniqueIdArray(list.items),
      parent: list.id,
      name: this.formatName(name),
      status,
      items
    });
  },

  reorderItems(stateItems, listItems) {
    const items = Object.assign({}, stateItems);
    listItems.forEach((id, index) => {
      items[id].order = index + 1;
    });

    return items;
  },

  formatName(name) {
    return name.trim();
  }
};

export default ItemApi;
