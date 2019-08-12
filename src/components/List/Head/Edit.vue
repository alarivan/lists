<template>
  <div>
    <button
      data-cy="list-head-button-edit"
      @click="openForm"
      class="button edit h-full"
    >
      <Icon href="#icon-pencil" />
    </button>

    <FixedForm
      :name="fixedFormName"
      @submit="updateListAction"
      ref="listForm"
      @opened="focusForm"
      @closed="closed"
    >
      <input
        data-cy="list-head-edit-name"
        class="block w-full"
        ref="listNameInput"
        v-model="listName"
        type="text"
        placeholder="List Name"
      />
    </FixedForm>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import Icon from "Components/common/Icon.vue";
import FixedForm from "Components/common/FixedForm.vue";

export default {
  name: "component-list-head-edit",
  components: {
    Icon,
    FixedForm
  },

  data() {
    return {
      listName: ""
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
      this.$refs.listForm.open();
    },

    focusForm() {
      this.$refs.listNameInput.focus();
    },

    closed() {
      this.listName = this.list.name;
    },

    updateListAction() {
      this.updateList({ id: this.list.id, values: { name: this.listName } });

      this.$refs.listForm.close();
    },

    ...mapActions(["updateList"])
  },

  computed: {
    fixedFormName() {
      return `list-edit-form-${this.list.id}`;
    }
  }
};
</script>

<style lang="scss"></style>
