<template>
  <div class="component-list-items">
    <draggable v-model="sortedItems" :disabled="!list.options.sortByOrder">
      <transition-group
        tag="div"
        name="list"
        data-cy="list-items"
        class="list-items"
      >
        <template v-for="item in sortedItems">
          <template v-if="item.items">
            <NestedList :key="item.id" :list="item" />
          </template>
          <template v-else>
            <Item :key="item.id" :item="item" :list="list" />
          </template>
        </template>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { mapActions } from "vuex";

import Item from "Components/List/Item.vue";

export default {
  name: "component-list-items",
  components: {
    draggable,
    Item,
    NestedList: () => import("Components/List/NestedList.vue")
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
.list-enter-active,
.list-leave-active,
.list-move {
  transition: 300ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

.list-enter {
  opacity: 0;
  transform: translateX(50px) scaleY(0.5);
}

.list-enter-to {
  opacity: 1;
  transform: translateX(0) scaleY(1);
}

.list-leave-active {
  position: absolute;
  width: 100%;
}

.list-leave-to {
  opacity: 0;
  transform: scaleY(0);
  transform-origin: center top;
}
</style>
