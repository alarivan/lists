<template>
  <div class="component-list-items">
    <draggable v-model="sortedItems" :disabled="!list.options.sortByOrder">
      <slide-x-left-transition group :duration="200">
        <template v-for="item in sortedItems">
          <template v-if="item.items">
            <NestedList :key="item.id" :list="item" />
          </template>
          <template v-else>
            <Item :key="item.id" :item="item" :list="list" />
          </template>
        </template>
      </slide-x-left-transition>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { mapActions } from "vuex";

import Item from "Components/List/Item.vue";
import { SlideXLeftTransition } from "vue2-transitions";

export default {
  name: "component-list-items",
  components: {
    draggable,
    Item,
    NestedList: () => import("Components/List/NestedList.vue"),
    SlideXLeftTransition
  },

  data() {
    return {};
  },

  props: {
    list: { type: Object, required: true }
  },

  methods: {
    ...mapActions(["updateItemsOrder"])
  },

  computed: {
    sortedItems: {
      get() {
        let result = [...this.$store.getters.itemsArray(this.list.id)];

        if (this.list.options.sortStatus && !this.list.options.sortByOrder) {
          result = result.sort((a, b) => {
            if (a.status && !b.status) {
              return this.list.options.sortDirection ? -1 : 1;
            } else if (!a.status && b.status) {
              return this.list.options.sortDirection ? 1 : -1;
            } else {
              return 0;
            }
          });
        } else if (this.list.options.sortByOrder) {
          result = result.sort((a, b) => (a.order > b.order ? 1 : -1));
        }

        if (!this.list.options.showComplete) {
          result = result.filter(i => {
            return !i.status;
          });
        }

        return result;
      },

      set(items) {
        this.updateItemsOrder({ id: this.list.id, items });
      }
    }
  }
};
</script>

<style lang="scss"></style>
