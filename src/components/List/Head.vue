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
        <svg class="icon">
          <use xlink:href="#icon-pencil" />
        </svg>
      </button>
      <button @click="openDeleteDialog" class="button delete">
        <svg class="icon">
          <use xlink:href="#icon-bin" />
        </svg>
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

export default {
  name: "component-list-head",
  components: {
    SimpleForm,
    Dialog
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
