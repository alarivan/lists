import ListApi from "../../src/api/list";
import store from "../../src/store";

describe("lists Store", () => {
  beforeEach(() => {
    store.state.lists.lists = [];
  });

  it("creates a list", () => {
    ListApi.addList("list name");
    expect(store.getters.lists.length).toEqual(1);
  });

  it("creates a list with correct name", () => {
    const list = ListApi.addList("list name");
    expect(list.name).toEqual("list name");
  });

  it("deletes a list", () => {
    const list = ListApi.newList("list name");
    store.dispatch("addList", list);

    store.dispatch("removeList", list.id);
    expect(store.getters.lists.length).toEqual(0);
  });
});
