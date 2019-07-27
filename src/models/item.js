import { randomString } from "Helper/main";

const DEFAULT_VALUES = {
  status: false,
  order: 1
};

class ItemModel {
  constructor(name, values) {
    this.id = randomString();
    this.name = name;
    Object.assign(this, DEFAULT_VALUES, values);
  }
}

export default ItemModel;
