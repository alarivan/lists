<template>
  <div class="px-1">
    <NewButton />

    <div class="lists flex flex-wrap -mx-1" v-if="listsArray.length">
      <div
        data-cy="lists-list"
        class="w-full px-1 mb-2"
        v-for="(list, index) in listsArray"
        :key="index"
      >
        <ComponentVerySimpleList :list="list" />
      </div>
    </div>
    <EmptyBlock v-else />

    <NewListForm />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import ComponentVerySimpleList from "Components/Lists/VerySimpleList.vue";
import EmptyBlock from "Components/Lists/Empty.vue";
import NewButton from "Components/Lists/NewButton.vue";
import NewListForm from "Components/Lists/NewForm.vue";

export default {
  name: "component-lists",
  components: {
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
    ...mapGetters(["listsArray"])
  }
};
</script>

<style lang="scss"></style>
