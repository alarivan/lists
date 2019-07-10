<template>
  <div>
    <component-list v-if="list" :list="list" />
    <div v-else>List not found</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import ListApi from "../api/list";

import ComponentList from "../components/List.vue";

export default {
  name: "view-list",
  components: {
    ComponentList
  },

  data() {
    return {};
  },

  computed: {
    list() {
      return ListApi.getListById(this.$route.params.id);
    }
  }
};
</script>

<style lang="scss">
</style>
