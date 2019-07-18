<template>
  <button class="button session-button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "component-session-button"
};
</script>

<style scoped lang="scss">
.session-button {
  @apply text-gray-100 uppercase font-bold h-full px-3;
}
</style>
