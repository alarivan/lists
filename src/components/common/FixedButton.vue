<template>
  <button @click="click" class="new-fixed button primary">
    <Icon href="#icon-plus" size="lg" />
  </button>
</template>

<script>
import Icon from "Components/common/Icon.vue";

export default {
  name: "component-fixed-button",
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

<style scoped lang="scss">
.new-fixed {
  @apply fixed px-4 py-4 rounded-full;

  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  bottom: 1.5rem;
  right: 1.5rem;
}
</style>
