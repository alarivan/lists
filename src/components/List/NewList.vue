<template>
  <div>
    <FixedButton data-cy="list-new-button" @click="open" />

    <FixedForm
      data-cy="list-new-form"
      name="list-new-form"
      @submit="newList"
      ref="listForm"
      @opened="focus"
      @closed="closed"
    >
      <input
        data-cy="list-new-name"
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
import ListApi from "Api/list";

import FixedForm from "Components/common/FixedForm.vue";
import FixedButton from "Components/common/FixedButton.vue";

export default {
  name: "component-new-list",
  components: {
    FixedForm,
    FixedButton
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

    closed() {
      this.listName = "";
    },

    focus() {
      this.$refs.listNameInput.focus();
    },

    open() {
      this.$refs.listForm.open();
    }
  }
};
</script>

<style lang="scss"></style>
