<template>
  <div class="component-list">
    <ListHead :list="list" />
    <ListPanel :list="list" :menu="false" />

    <router-link
      data-cy="list-view-button"
      class="block text-center button primary w-full uppercase font-bold"
      :to="{ name: 'view-list', params: { id: this.list.id } }"
    >view</router-link>
  </div>
</template>

<script>
import ListHead from "Components/List/Head.vue";
import ListPanel from "Components/List/Panel.vue";

export default {
  name: "component-simple-list",
  components: {
    ListHead,
    ListPanel
  },

  data() {
    return {};
  },

  props: {
    list: { type: Object, required: true }
  },

  methods: {
    viewList() {
      this.$router.push();
    }
  }
};
</script>

<style lang="scss"></style>