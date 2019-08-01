<template>
  <div
    class="component-input-text"
    :class="{ 'component-input-text-error-active': error }"
  >
    <input
      data-cy="input-text"
      class="input-text block w-full"
      ref="inputText"
      type="text"
      :placeholder="placeholder"
      :value="model"
      @input="input"
    />
    <div v-if="error" class="input-text-error text-red-700">
      {{ this.error }}
    </div>
  </div>
</template>

<script>
export default {
  name: "component-input-text",

  data() {
    return {
      error: false
    };
  },

  props: {
    model: { type: String, required: true },
    placeholder: { type: String }
  },

  methods: {
    input(event) {
      this.$emit("update:model", event.target.value);
    },

    validate() {
      this.error = false;

      if (this.model.trim()) {
        return true;
      } else {
        this.error = "Name can't be empty";
        return false;
      }
    },

    focus() {
      this.$refs.inputText.focus();
    }
  }
};
</script>

<style scoped lang="scss">
.component-input-text-error-active {
  .input-text {
    @apply border-red-700;
  }
}
</style>
