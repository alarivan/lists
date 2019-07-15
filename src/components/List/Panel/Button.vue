<template>
  <button class="list-panel-button" :title="title">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "component-list-panel-button",

  props: {
    title: { type: String, required: true }
  }
};
</script>

<style scoped lang="scss">
.list-panel-button {
  @apply text-gray-900;

  &.togglable {
    @apply text-gray-500;

    &.active {
      @apply text-gray-900;
    }
  }
}
</style>
