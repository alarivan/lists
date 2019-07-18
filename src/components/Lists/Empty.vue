<template>
  <EmptyBlock title="create your first list" @click="open" />
</template>

<script>
import EmptyBlock from "Components/common/EmptyBlock.vue";

export default {
  name: "component-lists-empty",
  components: {
    EmptyBlock
  },

  methods: {
    open() {
      this.$modal.show("list-new-form");
    }
  }
};
</script>

<style lang="scss"></style>
