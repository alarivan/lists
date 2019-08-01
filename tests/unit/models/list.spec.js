import ListModel from "Models/list";

describe("List", () => {
  it("creates a list", () => {
    const list = ListModel({ name: "test list" });

    expect(list.name).toEqual("test list");
  });
});
