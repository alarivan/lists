<template>
  <div class="component-list">
    <ListHead :list="list" />
    <ListPanel :list="list" />

    <ItemForm
      class="mb-1"
      ref="itemForm"
      :list="list"
      :showFormTrigger="showFormTrigger"
      @hide="closeForm"
    />

    <div class="list-items">
      <Item v-for="item in sortedItems" :key="item.id" :item="item" :list="list" />
    </div>

    <div class="list-actions flex">
      <button class="button secondary" v-if="!isListView" @click="viewList">view</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import ItemApi from "../api/item";
import ListApi from "../api/list";

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
    list: { type: Object, required: true },
    showForm: { type: Boolean, defaul: false },
    showFormTrigger: { type: Boolean, default: false }
  },

  methods: {
    openForm() {
      this.$refs.itemForm.show();
    },

    closeForm() {
      this.$emit("item-cancel");
    },

    updateItem(item) {
      ItemApi.updateItem(item.id, !item.status);
    },

    deleteList() {
      ListApi.deleteList(this.list);

      if (this.$route.name === "view-list") {
        this.$router.push("/");
      }
    },

    viewList() {
      this.$router.push({ name: "view-list", params: { id: this.list.id } });
    },

    ...mapActions([])
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
  },

  watch: {
    showForm(n) {
      if (n) this.openForm();
    }
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