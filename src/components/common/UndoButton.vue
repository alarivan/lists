<template>
  <button @click="click" class="undo-button button primary">
    UNDO
  </button>
</template>

<script>
export default {
  name: "component-undo-button",

  methods: {
    click() {
      this.$emit("click");
    }
  }
};
</script>

<style scoped lang="scss">
.undo-button {
  @apply fixed px-4 py-4 rounded-full;

  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  bottom: 1.5rem;
  width: 50%;
  max-width: 200px;
}
</style>
