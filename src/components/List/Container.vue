<template>
  <div class="container-list">
    <ItemForm v-if="itemFormList" class="mb-1" ref="itemForm" :list="itemFormList" />

    <FixedButton data-cy="item-new-button-fixed" @click="openNewItemForm" />

    <List :list="list" />

    <Dialog
      ref="deleteDialog"
      name="delete-item-dialog"
      :text="deleteItemDialogText"
      confirmText="delete"
      @confirm="confirmDeleteItem"
      @cancel="cancelDeleteItem"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import List from "Components/List/List.vue";
import ItemForm from "Components/List/ItemForm.vue";
import Dialog from "Components/common/Dialog.vue";
import FixedButton from "Components/common/FixedButton.vue";

export default {
  name: "component-container-list",
  components: {
    List,
    ItemForm,
    FixedButton,
    Dialog
  },

  data() {
    return {
      deleteItemDialogText: "Delete Item?"
    };
  },

  props: {
    list: { type: Object, required: true }
  },

  methods: {
    confirmDeleteItem() {
      if (this.deleteItemDialogData) {
        this.deleteListItem(this.deleteItemDialogData);
      }

      this.closeDeleteItemDialog();
    },

    openDeleteDialog() {
      this.$refs.deleteDialog.open();
    },

    closeDeleteDialog() {
      this.$refs.deleteDialog.close();
    },

    cancelDeleteItem() {
      this.closeDeleteItemDialog();
    },

    openNewItemForm() {
      this.openItemForm(this.list);
    },

    ...mapActions([
      "updateListItem",
      "deleteListItem",
      "updateItemsOrder",
      "openItemForm",
      "openDeleteItemDialog",
      "closeDeleteItemDialog"
    ])
  },

  computed: {
    ...mapGetters(["itemFormList", "deleteItemDialogData"])
  },

  watch: {
    deleteItemDialogData(n) {
      if (n) this.openDeleteDialog();
      else this.closeDeleteDialog();
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
