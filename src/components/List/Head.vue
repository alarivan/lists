<template>
  <div class="list-head mb-1">
    <div class="flex">
      <h1 class="font-bold flex-auto p-2">{{list.name}}</h1>

      <HeadEdit :list="list" />
      <HeadDelete :list="list" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import ListApi from "../../api/list";

import HeadEdit from "Components/List/Head/Edit.vue";
import HeadDelete from "Components/List/Head/Delete.vue";

export default {
  name: "component-list-head",
  components: {
    HeadEdit,
    HeadDelete
  },

  props: {
    list: { type: Object, required: true }
  }
};
</script>

<style lang="scss">
</style>
