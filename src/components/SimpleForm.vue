<template>
  <div class="simple-form">
    <form @submit.prevent="submit" class="block mb-1">
      <slot></slot>
    </form>
    <div class="simple-form-actions">
      <button class="simple-form-actions-button button save" @click="submit">Save</button>
      <button class="simple-form-actions-button button secondary" @click="cancel">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "component-simple-from",

  data() {
    return {};
  },

  methods: {
    cancel() {
      this.$emit("cancel");
    },

    submit() {
      this.$emit("submit");
    }
  }
};
</script>

<style lang="scss">
.simple-form-actions {
  @apply flex w-full;
}

.simple-form-actions-button {
  @apply flex-auto font-bold;
}
</style>