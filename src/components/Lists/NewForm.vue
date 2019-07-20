<template>
  <FixedForm
    data-cy="list-new-form"
    name="list-new-form"
    @submit="newList"
    ref="listForm"
    @opened="opened"
    @closed="closed"
  >
    <InputText
      data-cy="list-new-name"
      ref="listNameInput"
      :model.sync="listName"
      placeholder="List Name"
    />
  </FixedForm>
</template>

<script>
import ListApi from "Api/list";

import FixedForm from "Components/common/FixedForm.vue";
import InputText from "Components/common/InputText.vue";

export default {
  name: "component-lists-new-form",
  components: {
    FixedForm,
    InputText
  },

  data() {
    return {
      listName: ""
    };
  },

  methods: {
    newList() {
      if (this.$refs.listNameInput.validate()) {
        const list = ListApi.addList(this.listName);
        this.viewList(list);
      }
    },

    viewList(list) {
      this.$router.push({ name: "view-list", params: { id: list.id } });
    },

    closed() {
      this.listName = "";
    },

    opened() {
      this.$refs.listNameInput.focus();
    }
  }
};
</script>

<style lang="scss"></style>
