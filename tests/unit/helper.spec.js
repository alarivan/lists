import { getFromArrayById, getIndexFromArrayById } from "../../src/helper/main";

function randomString(next) {
  return next ? "uniq" : "notuniq";
}

function generateUniqueId(arr, next = false) {
  const id = randomString(next);

  if (getFromArrayById(arr, id)) {
    return generateUniqueId(arr, true);
  }

  return id;
}

const testArray = [
  {
    id: "notuniq",
    name: "name"
  },
  {
    id: "two",
    name: "name2"
  }
];

describe("helper/main", () => {
  it("regenerates unique id if generated id already exists", () => {
    const id = generateUniqueId(testArray);
    expect(id).toEqual("uniq");
  });

  it("finds index in array", () => {
    const index = getIndexFromArrayById(testArray, "two");
    expect(index).toEqual(1);
  });

  it("returns false if index not found", () => {
    const index = getIndexFromArrayById(testArray, "notfound");
    expect(index).toEqual(null);
  });

  it("finds item in array", () => {
    const item = getFromArrayById(testArray, "two");
    expect(item.name).toEqual("name2");
  });

  it("returns false if item not found", () => {
    const item = getFromArrayById(testArray, "notfound");
    expect(item).toEqual(null);
  });
});
