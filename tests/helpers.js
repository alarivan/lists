import ListApi from "Api/list";
import ItemApi from "Api/item";

global.addMultpleItems = (list, names) => {
  const items = names.map(name => {
    const item = ItemApi.newItem(list, name);
    ListApi.addItem(list, item);

    return item;
  });

  return items;
};
