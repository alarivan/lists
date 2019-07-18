<template>
  <FixedButton data-cy="list-new-button" @click="open" />
</template>

<script>
import FixedButton from "Components/common/FixedButton.vue";

export default {
  name: "component-lists-new-button",
  components: {
    FixedButton
  },

  methods: {
    open() {
      this.$modal.show("list-new-form");
    }
  }
};
</script>

<style lang="scss"></style>
