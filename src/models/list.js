import { generateUniqueId } from "../helper/main";

export const DEFAULT_OPTIONS = {
  sortStatus: true,
  sortDirection: false,
  showComplete: true
};

class ListModel {
  constructor(lists, name, items = []) {
    this.id = generateUniqueId(lists);
    this.name = name;
    this.items = items;

    this.options = DEFAULT_OPTIONS;
  }
}

export default ListModel;
