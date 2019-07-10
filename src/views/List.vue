<template>
  <div>
    <div v-if="list">
      <ComponentList :showForm="newItemForm" @item-cancel="onNewItemCancel" :list="list" />
      <FixedButton @click="showNewItemForm" v-if="!newItemForm" />
    </div>
    <div v-else>List not found</div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import ListApi from "../api/list";

import ComponentList from "Components/List.vue";
import FixedButton from "Components/FixedButton.vue";

export default {
  name: "view-list",
  components: {
    ComponentList,
    FixedButton
  },

  data() {
    return {
      newItemForm: false
    };
  },

  methods: {
    showNewItemForm() {
      this.newItemForm = true;
    },

    onNewItemCancel() {
      this.newItemForm = false;
    }
  },

  computed: {
    list() {
      return ListApi.getListById(this.$route.params.id);
    }
  }
};
</script>

<style lang="scss">
</style>
