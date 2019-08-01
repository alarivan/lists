<template>
  <div class="component-list">
    <ListHead :list="list" />
    <ListPanel :list="list" />

    <ItemForm class="mb-1" ref="itemForm" :list="list" />

    <NewButton :listId="list.id" />

    <draggable v-model="sortedItems" :disabled="!list.options.sortByOrder">
      <transition-group
        tag="div"
        name="list"
        data-cy="list-items"
        class="list-items"
      >
        <Item
          v-for="item in sortedItems"
          :key="item.id"
          :item="item"
          :list="list"
        />
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { mapActions } from "vuex";

import Item from "Components/List/Item.vue";
import ListHead from "Components/List/Head.vue";
import ListPanel from "Components/List/Panel.vue";
import ItemForm from "Components/List/ItemForm.vue";
import NewButton from "Components/List/ItemForm/NewButton.vue";

export default {
  name: "component-list",
  components: {
    draggable,
    Item,
    ListHead,
    ListPanel,
    ItemForm,
    NewButton
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
        let result = [...this.list.items];

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
