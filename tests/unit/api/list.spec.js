import ItemModel from "Models/item";
import ListModel from "Models/list";
import ListApi from "Api/list";
import ItemApi from "Api/item";

const createItem = name => {
  return ItemModel({ name });
};

const addMultpleItems = (list, names) => {
  const items = names.map(name => {
    const item = ItemApi.newItem(list, name);
    ListApi.addItem(list, item);

    return item;
  });

  return items;
};

const reverseIndexValue = (arr, index) => arr[arr.length - (index + 1)];

const assertNameAndOrder = (list, name, index) => {
  expect(list.items[index].order).toEqual(index + 1);
  expect(list.items[index].name).toEqual(name);
};

let item;
let list;

const ADD_NAMES = ["Item 1", "Item 2"];
describe("List items add", () => {
  beforeEach(() => {
    list = ListModel({ name: "test list" });
    item = ItemModel({ name: "test" });
  });

  it("adds item to list", () => {
    ListApi.addItem(list, item);

    expect(list.items[0].id).toEqual(item.id);
  });

  it("adds items with correct order when 'sortByOrder' is false", () => {
    ListApi.addItem(list, createItem(ADD_NAMES[0]));

    assertNameAndOrder(list, ADD_NAMES[0], 0);

    ListApi.addItem(list, createItem(ADD_NAMES[1]));

    [...Array(ADD_NAMES.length).keys()].forEach(i => {
      assertNameAndOrder(list, reverseIndexValue(ADD_NAMES, i), i);
    });
  });

  it("adds items with correct order when 'sortByOrder' is true", () => {
    list.options.sortByOrder = true;

    ListApi.addItem(list, createItem(ADD_NAMES[0]));

    assertNameAndOrder(list, ADD_NAMES[0], 0);

    ListApi.addItem(list, createItem(ADD_NAMES[1]));

    [...Array(ADD_NAMES.length).keys()].forEach(i => {
      assertNameAndOrder(list, ADD_NAMES[i], i);
    });
  });
});

describe("List items update", () => {
  beforeEach(() => {
    list = ListModel({ name: "test list" });
    item = ItemModel({ name: "test" });
  });

  it("updates item in a list", () => {
    ListApi.addItem(list, item);
    ListApi.updateItem(list, item.id, { name: "new name", status: true });

    expect(list.items[0].name).toEqual("new name");
    expect(list.items[0].status).toEqual(true);
  });
});

const names = ["Item 1", "Item 2", "Item 3"];
const namesAfterDelete = names.filter((v, i) => i !== 1);
describe("List items delete", () => {
  beforeEach(() => {
    list = ListModel({ name: "test list" });
  });

  it("deletes item from list", () => {
    item = ItemModel({ name: "test" });

    ListApi.addItem(list, item);
    ListApi.deleteItem(list, item.id);

    expect(list.items.length).toEqual(0);
  });

  it("deletes item from list and reorders when 'sortByOrder' is false", () => {
    const items = addMultpleItems(list, names);

    [...Array(names.length).keys()].forEach(i => {
      assertNameAndOrder(list, reverseIndexValue(names, i), i);
    });

    ListApi.deleteItem(list, items[1].id);

    [...Array(namesAfterDelete.length).keys()].forEach(i => {
      assertNameAndOrder(list, reverseIndexValue(namesAfterDelete, i), i);
    });
  });

  it("deletes item from list and reorders when 'sortByOrder' is true", () => {
    list.options.sortByOrder = true;
    const items = addMultpleItems(list, names);

    [...Array(items.length).keys()].forEach(i => {
      assertNameAndOrder(list, names[i], i);
    });

    ListApi.deleteItem(list, items[1].id);

    [...Array(namesAfterDelete.length).keys()].forEach(i => {
      assertNameAndOrder(list, namesAfterDelete[i], i);
    });
  });
});
