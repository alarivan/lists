import ListApi from "../../src/api/list";
import ItemApi from "../../src/api/item";
import store from "../../src/store";

function addItemToList(list, itemName) {
  const item = ItemApi.newItem(itemName);
  store.dispatch("addListItem", { list_id: list.id, item });

  return item;
}

let list;
let itemName;
describe("items Store", () => {
  beforeEach(() => {
    store.state.lists.lists = {};
    list = ListApi.addList("list_1");
    itemName = "item_1";
  });

  it("adds item to list", () => {
    ListApi.addItemToList(list, itemName);
    expect(store.getters.lists[list.id].items[0].name).toEqual(itemName);
  });

  it("updates item status", () => {
    const item = addItemToList(list, itemName);
    expect(store.getters.lists[list.id].items[0].status).toEqual(false);

    ListApi.updateItem(list, item, true);
    expect(store.getters.lists[list.id].items[0].status).toEqual(true);
  });

  it("deletes item from list", () => {
    const item = addItemToList(list, itemName);

    ListApi.removeItemFromList(list, item);

    expect(store.getters.lists[list.id].items.length).toEqual(0);
  });
});
