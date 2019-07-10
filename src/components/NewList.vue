<template>
  <modal name="new-list-modal" width="80%" height="auto" @opened="focus">
    <SimpleForm class="p-2" @submit="newList" @cancel="cancel">
      <input
        ref="listNameInput"
        class="p-2 block w-full"
        v-model="listName"
        type="text"
        placeholder="List Name"
      />
    </SimpleForm>
  </modal>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import ListApi from "../api/list";

import SimpleForm from "Components/SimpleForm.vue";

export default {
  name: "component-new-list",
  components: {
    SimpleForm
  },

  data() {
    return {
      listName: ""
    };
  },

  methods: {
    newList() {
      const list = ListApi.addList(this.listName);
      this.viewList(list);
    },

    viewList(list) {
      this.$router.push({ name: "view-list", params: { id: list.id } });
    },

    cancel() {
      this.$modal.hide("new-list-modal");
    },

    focus() {
      this.$refs.listNameInput.focus();
    }
  }
};
</script>

<style lang="scss">
.v--modal {
  border-radius: 0;
}
</style>
