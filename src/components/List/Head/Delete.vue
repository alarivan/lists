<template>
  <div>
    <button @click="openDeleteDialog" class="button delete h-full">
      <Icon href="#icon-bin" />
    </button>

    <Dialog
      ref="deleteDialog"
      :name="deleteDialogName"
      :text="deleteDialogText"
      confirmText="delete"
      @confirm="deleteList"
    />
  </div>
</template>

<script>
import ListApi from "Api/list";

import Dialog from "Components/Dialog.vue";
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
    deleteList() {
      ListApi.deleteList(this.list);

      this.$refs.deleteDialog.close();

      if (this.isListView) {
        this.$router.push("/");
      }
    },

    openDeleteDialog() {
      this.$refs.deleteDialog.open();
    }
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

<style lang="scss">
</style>
