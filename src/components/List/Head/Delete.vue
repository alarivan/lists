<template>
  <div>
    <button
      data-cy="list-head-button-delete"
      @click="handleDeleteClick"
      class="button delete h-full"
    >
      <Icon href="#icon-bin" />
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import Dialog from "Components/common/Dialog.vue";
import Icon from "Components/common/Icon.vue";

export default {
  name: "component-list-head-delete",
  components: {
    Icon
  },

  props: {
    list: { type: Object, required: true }
  },

  methods: {
    deleteListAction() {
      this.deleteList(this.list.id);

      if (!this.list.parent) {
        this.$router.push("/");
      }
    },

    handleDeleteClick() {
      this.$modal.show(
        Dialog,
        {
          confirmCallback: () => {
            this.deleteListAction();
          },
          text: `Delete ${this.list.name}`,
          confirmText: "delete"
        },
        { width: "100%", height: "auto", pivotY: 0.7 }
      );
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
