<template>
  <div class="component-list-items">
    <draggable v-model="sortedItems" :disabled="!list.options.sortByOrder">
      <transition-group tag="div" name="slide" data-cy="list-items" class="list-items">
        <ItemContainer v-for="item in sortedItems" :key="item.id" :item="item" :list="list" />
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { mapActions } from "vuex";

import ItemContainer from "Components/List/ItemContainer.vue";

export default {
  name: "component-list-items",
  components: {
    draggable,
    ItemContainer
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

<style lang="scss">
.slide-leave-active,
.slide-enter-active {
  transition: 150ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: transform;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}
</style>
