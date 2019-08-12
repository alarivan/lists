<template>
  <div>
    <button data-cy="list-head-button-toggle" class="button secondary h-full">
      <Icon href="#icon-equalizer" />
    </button>
  </div>
</template>

<script>
import Icon from "Components/common/Icon.vue";

export default {
  name: "component-list-head-toggle",
  components: {
    Icon
  },

  props: {
    list: { type: Object, required: true }
  }
};
</script>

<style lang="scss"></style>
