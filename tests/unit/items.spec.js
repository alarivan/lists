import ItemApi from "../../src/api/item";
import store from "../../src/store";

describe("items Store", () => {
  beforeEach(() => {
    store.state.items.items = [];
  });

  it("creates an item", () => {
    ItemApi.addItem("item name");
    expect(store.getters.items.length).toEqual(1);
  });

  it("creates an item with correct name", () => {
    const item = ItemApi.addItem("item name");
    expect(item.name).toEqual("item name");
  });

  it("deletes an item", () => {
    const item = ItemApi.newItem("item name");
    store.dispatch("addItem", item);

    store.dispatch("removeItem", item.id);
    expect(store.getters.items.length).toEqual(0);
  });
});
