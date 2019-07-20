<template>
  <button data-cy="button-add" @click="click" class="button primary w-full">
    <Icon href="#icon-plus" size="md" class="mx-auto" />
  </button>
</template>

<script>
import Icon from "Components/common/Icon.vue";

export default {
  name: "component-button-add",
  components: {
    Icon
  },

  methods: {
    click() {
      this.$emit("click");
    }
  }
};
</script>

<style scoped lang="scss"></style>
