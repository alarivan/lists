<template>
  <div class="list-head mb-1">
    <SimpleForm v-if="showForm" @submit="updateList" @cancel="hideForm">
      <input
        class="block w-full"
        ref="listNameInput"
        v-model="listName"
        type="text"
        placeholder="List Name"
      />
    </SimpleForm>

    <div v-else class="flex">
      <h1 class="font-bold flex-auto p-2">{{list.name}}</h1>
      <button @click="openForm" class="button primary">
        <Icon href="#icon-pencil" />
      </button>
      <button @click="openDeleteDialog" class="button delete">
        <Icon href="#icon-bin" />
      </button>
    </div>
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
import { mapActions, mapGetters } from "vuex";

import ListApi from "../../api/list";

import SimpleForm from "Components/SimpleForm.vue";
import Dialog from "Components/Dialog.vue";
import Icon from "Components/common/Icon.vue";

export default {
  name: "component-list-head",
  components: {
    SimpleForm,
    Dialog,
    Icon
  },

  data() {
    return {
      listName: "",
      showForm: false,
      deleteDialogName: "delete-list-dialog"
    };
  },

  props: {
    list: { type: Object, required: true }
  },

  mounted() {
    this.listName = this.list.name;
  },

  methods: {
    openForm() {
      this.showForm = true;
      this.$nextTick(() => {
        if (this.showForm) {
          this.$refs.listNameInput.focus();
        }
      });
    },

    hideForm() {
      this.showForm = false;
    },

    updateList() {
      ListApi.updateList(this.list, this.listName);
      this.hideForm();
    },

    deleteList() {
      ListApi.deleteList(this.list);

      this.$refs.deleteDialog.close();

      if (this.$route.name === "view-list") {
        this.$router.push("/");
      }
    },

    openDeleteDialog() {
      this.$refs.deleteDialog.open();
    },

    viewList() {
      this.$router.push({ name: "view-list", params: { id: this.list.id } });
    },

    ...mapActions([])
  },

  computed: {
    isListView() {
      return this.$route.name === "view-list";
    },

    deleteDialogText() {
      return `Delete ${this.list.name}?`;
    },

    ...mapGetters([])
  }
};
</script>

<style lang="scss">
</style>
