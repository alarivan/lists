import ItemModel from "Models/item";

export const DEFAULT_OPTIONS = {
  sortStatus: true,
  sortDirection: false,
  showComplete: true,
  sortByOrder: false
};

const ListModel = function(values) {
  const list = {
    items: [],
    options: { ...DEFAULT_OPTIONS }
  };

  Object.assign(list, ItemModel(values));

  return list;
};

export default ListModel;
