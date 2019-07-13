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
.simple-form {
  @apply bg-white;

  @screen sm {
    @apply mx-auto my-2;
    max-width: 480px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
}

.simple-form-actions {
  @apply flex w-full;
}

.simple-form-actions-button {
  @apply flex-auto font-bold;
}
</style>