<template>
  <div class="component-list">
    <ListHead :list="list" />
    <ListPanel :list="list" />

    <ItemForm class="mb-1" ref="itemForm" :list="list" />

    <div class="list-items">
      <Item v-for="item in sortedItems" :key="item.id" :item="item" :list="list" />
    </div>

    <div class="list-actions flex">
      <button class="button secondary" v-if="!isListView" @click="viewList">view</button>
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

  methods: {
    viewList() {
      this.$router.push({ name: "view-list", params: { id: this.list.id } });
    }
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

    isListView() {
      return this.$route.name === "view-list";
    },

    ...mapGetters(["sortStatus", "sortDirection", "showComplete"])
  }
};
</script>

<style lang="scss">
.item-form-trigger {
  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }
}

.list-actions {
  button {
    @apply px-3 py-2 flex-auto uppercase font-bold;
  }
}
</style>