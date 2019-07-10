import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import lists from "./modules/lists";
import items from "./modules/items";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    lists,
    items
  },

  plugins: [new VuexPersistence({ key: "lists:vuex" }).plugin]
});
