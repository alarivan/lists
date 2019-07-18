<template>
  <div class="px-1">
    <div class="lists flex flex-wrap -mx-1" v-if="listsWithItems.length">
      <div
        data-cy="lists-list"
        class="w-full sm:w-1/2 px-1 mb-8"
        v-for="(list, index) in listsWithItems"
        :key="index"
      >
        <ComponentSimpleList :list="list" />
      </div>
    </div>
    <EmptyBlock v-else />

    <NewButton />

    <NewListForm />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import ComponentSimpleList from "Components/Lists/SimpleList.vue";
import EmptyBlock from "Components/Lists/Empty.vue";
import NewButton from "Components/Lists/NewButton.vue";
import NewListForm from "Components/Lists/NewForm.vue";

export default {
  name: "component-lists",
  components: {
    ComponentSimpleList,
    EmptyBlock,
    NewButton,
    NewListForm
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
