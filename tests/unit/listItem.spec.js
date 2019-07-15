import ListApi from "../../src/api/list";
import ItemApi from "../../src/api/item";
import store from "../../src/store";

let list;
let item;
describe("items Store", () => {
  beforeEach(() => {
    store.state.items.items = [];
    store.state.lists.lists = [];
    list = ListApi.addList("list_1");
    item = ItemApi.addItem("item_1");
  });

  it("adds item to list", () => {
    ListApi.addItemToList(list, item);
    expect(store.state.lists.lists[0].items[0]).toEqual(item.id);
  });
});
