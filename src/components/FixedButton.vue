<template>
  <button @click="click" class="new-fixed button primary">
    <svg class="icon">
      <use xlink:href="#icon-plus" />
    </svg>
  </button>
</template>

<script>
export default {
  name: "componenet-fixed-button",
  methods: {
    click() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="scss">
.new-fixed {
  @apply fixed font-bold px-4 py-4 bg-blue-500 rounded-full text-white;

  bottom: 1rem;
  right: 1rem;
}
</style>
