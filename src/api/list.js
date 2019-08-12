import ListModel from "Models/list";
import { getIndexFromArray } from "Helper/main";

const ListApi = {
  newList(name, items = []) {
    return ListModel({
      name: this.formatName(name),
      items
    });
  },

  addItem(list, item_id) {
    if (list.options.sortByOrder) {
      list.items.push(item_id);
    } else {
      list.items.unshift(item_id);
    }

    return list;
  },

  deleteItem(list, id) {
    const { found, index } = getIndexFromArray(list.items, id);

    if (found) {
      list.items.splice(index, 1);
    }

    return list;
  },

  formatName(name) {
    return name.trim();
  }
};

export default ListApi;
