import { generateUniqueId } from "../helper/main";

class ListModel {
  constructor(lists, name, items = []) {
    this.id = generateUniqueId(lists);
    this.name = name;
    this.items = items;
  }
}

export default ListModel;
