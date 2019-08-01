import ListModel from "Models/list";
import { getIndexFromArrayById } from "Helper/main";

const ListApi = {
  newList(name, items = []) {
    return ListModel({
      name: this.formatName(name),
      items
    });
  },

  updateList(list, values) {
    return Object.assign(list, values);
  },

  addItem(list, item) {
    if (list.options.sortByOrder) {
      list.items.push(item);
    } else {
      list.items.unshift(item);
    }

    list.items = this.reorderItems(list.items);

    return list;
  },

  updateItem(list, item_id, values) {
    const { found, index } = getIndexFromArrayById(list.items, item_id);

    if (found) {
      Object.assign(list.items[index], values);
    }

    return list;
  },

  deleteItem(list, id) {
    const { found, index } = getIndexFromArrayById(list.items, id);

    if (found) {
      list.items.splice(index, 1);
      list.items = this.reorderItems(list.items);
    }

    return list;
  },

  formatName(name) {
    return name.trim();
  },

  reorderItems(items) {
    return items.map((item, index) => (item.order = index + 1) && item);
  }
};

export default ListApi;
