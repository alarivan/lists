<template>
  <button @click="click" class="new-fixed button primary">
    <Icon href="#icon-plus" size="lg" />
  </button>
</template>

<script>
import Icon from "Components/common/Icon.vue";

export default {
  name: "componenet-fixed-button",
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

<style lang="scss">
.new-fixed {
  @apply fixed font-bold px-4 py-4 bg-blue-500 rounded-full text-white shadow-2xl;

  bottom: 1.5rem;
  right: 1.5rem;
}
</style>
