<template>
  <div data-cy="list-head" class="list-head mb-1">
    <div class="flex">
      <ListName :name="list.name" />

      <HeadEdit :list="list" />
      <HeadDelete :list="list" />
    </div>
  </div>
</template>

<script>
import HeadEdit from "Components/List/Head/Edit.vue";
import HeadDelete from "Components/List/Head/Delete.vue";
import ListName from "Components/List/ListName.vue";

export default {
  name: "component-list-head",
  components: {
    HeadEdit,
    HeadDelete,
    ListName
  },

  props: {
    list: { type: Object, required: true }
  }
};
</script>

<style lang="scss"></style>
