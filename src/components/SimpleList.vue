<template>
  <div class="component-list">
    <ListHead :list="list" />
    <ListPanel :list="list" :menu="false" />

    <button class="button primary w-full uppercase font-bold" @click="viewList">view</button>
  </div>
</template>

<script>
import ListHead from "./List/Head.vue";
import ListPanel from "./List/Panel.vue";

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
      this.$router.push({ name: "view-list", params: { id: this.list.id } });
    }
  }
};
</script>

<style lang="scss"></style>