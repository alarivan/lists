<template>
  <div class="flex mb-1">
    <div
      data-cy="list-item"
      v-touch:swipe.left="deleteItem"
      @click="updateItem"
      class="list-item flex items-center"
    >
      <div class="checkmark mr-2">
        <Icon data-cy="item-status" :href="itemStatus" size="md" />
      </div>
      <div>{{item.name}}</div>
    </div>
    <button data-cy="item-delete-button" class="button delete" @click="openDeleteDialog">
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
import ItemApi from "Api/item";
import ListApi from "Api/list";

import Icon from "Components/common/Icon.vue";
import Dialog from "Components/common/Dialog.vue";

export default {
  name: "component-item",
  components: {
    Icon,
    Dialog
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
      ItemApi.updateItem(this.item.id, !this.item.status);
    },

    deleteItem() {
      ListApi.removeItemFromList(this.list, this.item);

      this.$refs.deleteDialog.close();
    },

    openDeleteDialog() {
      this.$refs.deleteDialog.open();
    }
  },

  computed: {
    itemStatus() {
      return this.item.status ? "#icon-checkmark1" : "#icon-checkmark";
    },

    deleteDialogName() {
      return `delete-item-dialog-${this.item.id}`;
    }
  }
};
</script>

<style lang="scss">
.list-item {
  @apply w-full bg-orange-200 text-gray-900 cursor-pointer px-4 py-3;
}

.button-delete {
  @apply bg-red-800 text-white px-4;
}
</style>
