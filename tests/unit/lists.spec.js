import ListApi from "../../src/api/list";
import store from "../../src/store";

describe("lists Store", () => {
  beforeEach(() => {
    store.state.lists.lists = [];
  });

  it("creates a list", () => {
    const list = ListApi.addList("list name");
    expect(store.getters.lists[list.id]).toEqual(list);
    expect(store.getters.listsArray.length).toEqual(1);
  });

  it("creates a list with correct name", () => {
    const listName = "list name";
    const list = ListApi.addList(listName);
    expect(store.getters.lists[list.id].name).toEqual(listName);
  });

  it("deletes a list", () => {
    const list = ListApi.newList("list name");
    store.dispatch("addList", list);

    store.dispatch("removeList", list.id);
    expect(store.getters.listsArray.length).toEqual(0);
  });
});
