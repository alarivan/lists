<template>
  <div>
    <button
      data-cy="list-head-button-delete"
      @click="openDeleteDialog"
      class="button delete h-full"
    >
      <Icon href="#icon-bin" />
    </button>

    <Dialog
      ref="deleteDialog"
      :name="deleteDialogName"
      :text="deleteDialogText"
      confirmText="delete"
      @confirm="deleteListAction"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";

import Dialog from "Components/common/Dialog.vue";
import Icon from "Components/common/Icon.vue";

export default {
  name: "component-list-head-delete",
  components: {
    Dialog,
    Icon
  },

  props: {
    list: { type: Object, required: true }
  },

  methods: {
    deleteListAction() {
      this.deleteList(this.list.id);

      this.$refs.deleteDialog.close();

      if (this.isListView) {
        this.$router.push("/");
      }
    },

    openDeleteDialog() {
      this.$refs.deleteDialog.open();
    },

    ...mapActions(["deleteList"])
  },

  computed: {
    isListView() {
      return this.$route.name === "view-list";
    },

    deleteDialogText() {
      return `Delete ${this.list.name}?`;
    },

    deleteDialogName() {
      return `delete-list-dialog-${this.list.id}`;
    }
  }
};
</script>

<style lang="scss"></style>
