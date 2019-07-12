<template>
  <div>
    <div v-if="list">
      <ComponentList :list="list" />
    </div>
    <div v-else>List not found</div>
  </div>
</template>

<script>
import ComponentList from "Components/List.vue";

import ListApi from "Api/list";

export default {
  name: "view-list",
  components: {
    ComponentList
  },

  computed: {
    list() {
      return ListApi.getListById(this.$route.params.id);
    }
  }
};
</script>

<style lang="scss"></style>
