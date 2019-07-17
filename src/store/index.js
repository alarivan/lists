import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import lists from "Store/modules/lists";
import items from "Store/modules/items";
import user from "Store/modules/user";
import local from "Store/modules/local";

Vue.use(Vuex);

const vuexStorage = new VuexPersistence({
  key: "lists:vuex",
  storage: window.localStorage,
  reducer: state => ({
    lists: state.lists,
    items: state.items,
    user: state.user
  })
});

export default new Vuex.Store({
  modules: {
    lists,
    items,
    user,
    local
  },

  plugins: [vuexStorage.plugin]
});
