<template>
  <div class="w-full flex mb-1">
    <ItemBody
      :list="list"
      :item="item"
      v-touch:swipe.left="deleteItem"
      @click.native="updateItem"
    />
    <button
      data-cy="item-delete-button"
      class="button delete"
      @click="handleDeleteClick()"
    >
      <Icon href="#icon-bin" />
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import Icon from "Components/common/Icon.vue";
import ItemBody from "Components/List/Item/Body.vue";
import Dialog from "Components/common/Dialog.vue";

export default {
  name: "component-item",
  components: {
    Icon,
    ItemBody
  },

  props: {
    item: { type: Object, required: true },
    list: { type: Object, required: true }
  },

  methods: {
    updateItem() {
      this.updateListItem({
        list_id: this.list.id,
        item_id: this.item.id,
        values: { status: !this.item.status }
      });
      this.setUndoItem(this.item);
    },

    deleteItem() {
      this.deleteListItem({ list_id: this.list.id, item_id: this.item.id });
    },

    handleDeleteClick() {
      this.$modal.show(
        Dialog,
        {
          confirmCallback: () => {
            this.deleteItem();
          },
          text: `Delete "${this.item.name}"?`,
          confirmText: "delete"
        },
        { width: "100%", height: "auto", pivotY: 0.7 }
      );
    },

    ...mapActions(["updateListItem", "deleteListItem", "setUndoItem"])
  },

  computed: {
    itemStatus() {
      return this.item.status ? "#icon-checkmark1" : "#icon-checkmark";
    },

    showOrder() {
      return this.list.options.sortByOrder;
    }
  }
};
</script>

<style lang="scss">
.button-delete {
  @apply bg-red-800 text-white px-4;
}
</style>
