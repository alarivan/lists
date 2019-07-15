<template>
  <div class="px-1">
    <div class="lists flex flex-wrap -mx-1">
      <div
        data-cy="lists-list"
        class="w-full sm:w-1/2 px-1 mb-8"
        v-for="(list, index) in listsWithItems"
        :key="index"
      >
        <ComponentSimpleList :list="list" />
      </div>
    </div>

    <ComponentNewList />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import ComponentSimpleList from "Components/SimpleList.vue";
import ComponentNewList from "Components/List/NewList.vue";

export default {
  name: "componenet-lists",
  components: {
    ComponentSimpleList,
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
