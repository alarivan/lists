import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import lists from "Store/modules/lists";
import items from "Store/modules/items";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    lists,
    items
  },

  plugins: [new VuexPersistence({ key: "lists:vuex" }).plugin]
});
