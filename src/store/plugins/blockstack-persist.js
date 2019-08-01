import { putFile } from "Helper/userSession";

const MUTATIONS = [
  "ADD_LIST",
  "UPDATE_LIST",
  "REMOVE_LIST",
  "ADD_LIST_ITEM",
  "UPDATE_LIST_ITEM",
  "REMOVE_LIST_ITEM",
  "UPDATE_LIST_OPTION",
  "UPDATE_ITEMS_ORDER"
];

export default store => {
  store.subscribe(mutation => {
    if (MUTATIONS.includes(mutation.type)) {
      // @todo Add debounce to putFile()
      putFile();
    }
  });
};
