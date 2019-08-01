import ItemModel, { NAME_ERROR_MESSAGE } from "Models/item";

describe("Item", () => {
  it("creates an item", () => {
    const item = ItemModel({ name: "test" });

    expect(item.name).toEqual("test");
    expect(item.status).toEqual(false);
  });

  it("throws an error when name is empty", () => {
    expect(() => ItemModel({})).toThrowError(NAME_ERROR_MESSAGE);
  });
});
