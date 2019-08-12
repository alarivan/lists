<template>
  <div>
    <button
      data-cy="list-head-button-add-item"
      @click="openItemForm(list)"
      class="button primary h-full"
    >
      <Icon href="#icon-plus" />
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import Icon from "Components/common/Icon.vue";

export default {
  name: "component-list-head-add-item",
  components: {
    Icon
  },

  props: {
    list: { type: Object, required: true }
  },

  methods: {
    ...mapActions(["openItemForm"])
  }
};
</script>

<style lang="scss"></style>
