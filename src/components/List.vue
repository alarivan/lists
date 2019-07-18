<template>
  <div class="component-list">
    <ListHead :list="list" />
    <ListPanel :list="list" />

    <ItemForm class="mb-1" ref="itemForm" :list="list" />

    <div data-cy="list-items" class="list-items">
      <Item v-for="item in sortedItems" :key="item.id" :item="item" :list="list" />
    </div>
  </div>
</template>

<script>
import Item from "Components/List/Item.vue";
import ListHead from "Components/List/Head.vue";
import ListPanel from "Components/List/Panel.vue";
import ItemForm from "Components/List/ItemForm.vue";

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

      if (this.list.options.sortStatus) {
        result = result.sort((a, b) => {
          if (a.status && !b.status) {
            return this.list.options.sortDirection ? -1 : 1;
          } else if (!a.status && b.status) {
            return this.list.options.sortDirection ? 1 : -1;
          } else {
            return 0;
          }
        });
      }

      if (!this.list.options.showComplete) {
        result = result.filter(i => {
          return !i.status;
        });
      }

      return result;
    }
  }
};
</script>

<style lang="scss"></style>
