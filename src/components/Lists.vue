<template>
  <div class="px-1">
    <div class="lists flex flex-wrap -mx-1" v-if="listsWithItems.length">
      <div
        data-cy="lists-list"
        class="w-full px-1 mb-2"
        v-for="(list, index) in listsWithItems"
        :key="index"
      >
        <ComponentVerySimpleList :list="list" />
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
import ComponentVerySimpleList from "Components/Lists/VerySimpleList.vue";
import EmptyBlock from "Components/Lists/Empty.vue";
import NewButton from "Components/Lists/NewButton.vue";
import NewListForm from "Components/Lists/NewForm.vue";

export default {
  name: "component-lists",
  components: {
    ComponentSimpleList,
    ComponentVerySimpleList,
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
