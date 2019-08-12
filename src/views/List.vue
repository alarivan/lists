<template>
  <div>
    <div v-if="list">
      <ContainerList :list="list" />
    </div>
    <div v-else>List not found</div>
  </div>
</template>

<script>
import ContainerList from "Components/List/Container.vue";

export default {
  name: "view-list",
  components: {
    ContainerList
  },

  computed: {
    list() {
      return this.$store.getters.listById(this.$route.params.id);
    }
  }
};
</script>

<style lang="scss"></style>
