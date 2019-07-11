<template>
  <svg class="icon" :class="sizeClass">
    <use :xlink:href="href" />
  </svg>
</template>

<script>
export default {
  name: "component-icon",

  props: {
    href: { type: String, required: true },
    size: { type: String }
  },

  computed: {
    sizeClass() {
      let result = "";
      switch (this.size) {
        case "md":
          result = "icon-md";
          break;
        case "lg":
          result = "icon-lg";
          break;

        default:
          break;
      }

      return result;
    }
  }
};
</script>

<style scoped lang="scss">
.icon {
  width: 1rem;
  height: 1rem;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;

  &.icon-md {
    width: 1.25rem;
    height: 1.25rem;
  }

  &.icon-lg {
    width: 1.5rem;
    height: 1.5rem;
  }
}
</style>