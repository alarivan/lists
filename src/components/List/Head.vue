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
          <v-dialog />
          <use xlink:href="#icon-bin" />
        </svg>
      </button>
    </div>
    <v-dialog />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import ListApi from "../../api/list";

import SimpleForm from "Components/SimpleForm.vue";

export default {
  name: "component-list-head",
  components: {
    SimpleForm
  },

  data() {
    return {
      listName: "",
      showForm: false
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

      if (this.$route.name === "view-list") {
        this.$router.push("/");
      }
    },

    openDeleteDialog() {
      this.$modal.show("dialog", {
        text: `Delete ${this.list.name}`,
        buttons: [
          {
            title: "Delete",
            handler: () => {
              this.deleteList();
            }
          },
          {
            title: "Cancel"
          }
        ]
      });
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

    ...mapGetters([])
  }
};
</script>

<style lang="scss">
</style>
