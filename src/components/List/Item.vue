<template>
  <div class="flex mb-1">
    <ItemBody
      :list="list"
      :item="item"
      v-touch:swipe.left="deleteItem"
      @click.native="updateItem"
    />
    <button
      data-cy="item-delete-button"
      class="button delete"
      @click="openDeleteDialog"
    >
      <Icon href="#icon-bin" />
    </button>

    <Dialog
      ref="deleteDialog"
      :name="deleteDialogName"
      :text="deleteDialogText"
      confirmText="delete"
      @confirm="deleteItem"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";

import Icon from "Components/common/Icon.vue";
import Dialog from "Components/common/Dialog.vue";
import ItemBody from "Components/List/Item/Body.vue";

export default {
  name: "component-item",
  components: {
    Icon,
    Dialog,
    ItemBody
  },

  data() {
    return {
      deleteDialogText: "Delete Item?"
    };
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
    },

    deleteItem() {
      this.deleteListItem({ list_id: this.list.id, item_id: this.item.id });

      this.$refs.deleteDialog.close();
    },

    openDeleteDialog() {
      this.$refs.deleteDialog.open();
    },

    ...mapActions(["updateListItem", "deleteListItem"])
  },

  computed: {
    itemStatus() {
      return this.item.status ? "#icon-checkmark1" : "#icon-checkmark";
    },

    showOrder() {
      return this.list.options.sortByOrder;
    },

    deleteDialogName() {
      return `delete-item-dialog-${this.item.id}`;
    }
  }
};
</script>

<style lang="scss">
.button-delete {
  @apply bg-red-800 text-white px-4;
}
</style>
