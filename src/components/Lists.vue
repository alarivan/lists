<template>
  <div class="px-1">
    <div class="lists flex flex-wrap -mx-1">
      <div class="w-full sm:w-1/2 px-1 mb-2" v-for="(list, index) in listsWithItems" :key="index">
        <component-list :list="list" :showFormTrigger="true" />
      </div>
    </div>

    <FixedButton @click="openNewListModal" />

    <ComponentNewList />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import ListApi from "../api/list";

import ComponentList from "./List.vue";
import ComponentNewList from "./NewList.vue";
import FixedButton from "Components/FixedButton.vue";

export default {
  name: "componenet-lists",
  components: {
    ComponentList,
    ComponentNewList,
    FixedButton
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

<style lang="scss">
</style>
