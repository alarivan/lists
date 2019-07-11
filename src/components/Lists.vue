<template>
  <div class="px-1">
    <div class="lists flex flex-wrap -mx-1">
      <div class="w-full sm:w-1/2 px-1 mb-2" v-for="(list, index) in listsWithItems" :key="index">
        <component-list :list="list" :showFormTrigger="true" />
      </div>
    </div>

    <ComponentNewList />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import ComponentList from "./List.vue";
import ComponentNewList from "./NewList.vue";

export default {
  name: "componenet-lists",
  components: {
    ComponentList,
    ComponentNewList
  },

  methods: {
    viewList(list) {
      this.$router.push({ name: "view-list", params: { id: list.id } });
    }
  },

  computed: {
    ...mapGetters(["listsWithItems"])
  }
};
</script>

<style lang="scss"></style>
