<template>
  <div class="px-1">
    <div class="lists flex flex-wrap -mx-1">
      <div class="w-full sm:w-1/2 px-1 mb-2" v-for="(list, index) in listsWithItems" :key="index">
        <component-list :list="list" />
      </div>
    </div>
    <button @click="openNewListModal" class="new-list-fixed button primary">
      <svg class="icon">
        <use xlink:href="#icon-plus" />
      </svg>
    </button>
    <ComponentNewList />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import ListApi from "../api/list";

import ComponentList from "./List.vue";
import ComponentNewList from "./NewList.vue";

export default {
  name: "componenet-lists",
  components: {
    ComponentList,
    ComponentNewList
  },

  data() {
    return {};
  },

  methods: {
    openNewListModal() {
      this.$modal.show("new-list-modal");
    },

    deleteList(list) {
      ListApi.deleteList(list);
    },

    viewList(list) {
      this.$router.push({ name: "view-list", params: { id: list.id } });
    }
  },

  computed: {
    ...mapGetters(["lists", "listsWithItems"])
  }
};
</script>

<style scoped lang="scss">
.new-list-fixed {
  @apply fixed font-bold px-4 py-4 bg-blue-500 rounded-full text-white;

  bottom: 1rem;
  right: 1rem;
}
</style>
