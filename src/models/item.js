import { randomString } from "../helper/main";

class ItemModel {
  constructor(name, status = false) {
    this.id = randomString();
    this.name = name;
    this.status = status;
  }
}

export default ItemModel;
