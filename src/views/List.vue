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

export default {
  name: "view-list",
  components: {
    ComponentList
  },

  computed: {
    list() {
      return this.$store.getters.listById(this.$route.params.id);
    }
  }
};
</script>

<style lang="scss"></style>
