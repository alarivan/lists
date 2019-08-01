import { getFromArrayById, getIndexFromArrayById } from "Helper/main";

function* randomStringGenerator() {
  yield "notuniq";
  yield "uniq";
}

function generateUniqueIdWrapper(collection, checker) {
  const randomStringGeneratorObject = randomStringGenerator();

  return (function generateUniqueId(collection, checker) {
    // const id = randomString();
    const id = randomStringGeneratorObject.next().value;

    if (checker(collection, id)) return generateUniqueId(collection, checker);

    return id;
  })(collection, checker);
}

const generateUniqueIdArray = arr =>
  generateUniqueIdWrapper(arr, (col, id) => getFromArrayById(col, id).found);

const generateUniqueIdObject = obj =>
  generateUniqueIdWrapper(obj, (col, id) => col.hasOwnProperty(id));

const testObject = {
  notuniq: {
    id: "notuniq",
    name: "name"
  },
  two: {
    id: "two",
    name: "name2"
  }
};
const testArray = Object.values(testObject);

describe("helper/main", () => {
  it("regenerates unique id if generated id already exists for array", () => {
    const id = generateUniqueIdArray(testArray);

    expect(id).toEqual("uniq");
  });

  it("regenerates unique id if generated id already exists for object", () => {
    const id = generateUniqueIdObject(testObject);

    expect(id).toEqual("uniq");
  });

  it("finds index in array and returns correct data", () => {
    const { found, index } = getIndexFromArrayById(testArray, "two");

    expect(found).toEqual(true);
    expect(index).toEqual(1);
  });

  it("returns correct data when index not found", () => {
    const { found, index } = getIndexFromArrayById(testArray, "notfound");

    expect(found).toEqual(false);
    expect(index).toEqual(-1);
  });

  it("finds item in array and returns correct data", () => {
    const { found, item } = getFromArrayById(testArray, "two");

    expect(found).toEqual(true);
    expect(item.name).toEqual("name2");
  });

  it("returns correct data when item not found", () => {
    const { found, item } = getFromArrayById(testArray, "notfound");

    expect(found).toEqual(false);
    expect(item).toEqual(undefined);
  });
});
