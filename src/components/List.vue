<template>
  <div class="component-list">
    <ListHead :list="list" />
    <ListPanel :list="list" />

    <ItemForm class="mb-1" ref="itemForm" :list="list" />

    <div class="list-items">
      <Item v-for="item in sortedItems" :key="item.id" :item="item" :list="list" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Item from "./Item.vue";
import ListHead from "./List/Head.vue";
import ListPanel from "./List/Panel.vue";
import ItemForm from "./List/ItemForm.vue";

export default {
  name: "component-list",
  components: {
    Item,
    ListHead,
    ListPanel,
    ItemForm
  },

  data() {
    return {};
  },

  props: {
    list: { type: Object, required: true }
  },

  computed: {
    sortedItems() {
      let result = [...this.list.items];

      if (this.sortStatus) {
        result = result.sort((a, b) => {
          if (a.status && !b.status) {
            return this.sortDirection ? -1 : 1;
          } else if (!a.status && b.status) {
            return this.sortDirection ? 1 : -1;
          } else {
            return 0;
          }
        });
      }

      if (!this.showComplete) {
        result = result.filter(i => {
          return !i.status;
        });
      }

      return result;
    },

    ...mapGetters(["sortStatus", "sortDirection", "showComplete"])
  }
};
</script>

<style lang="scss"></style>