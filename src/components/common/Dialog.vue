<template>
  <div class="dialog-container">
    <h1 data-cy="dialog-text" class="dialog-text">{{ text }}</h1>
    <div class="dialog-actions">
      <button
        data-cy="dialog-confirm"
        class="dialog-action-button button"
        :class="confirmButtonClass"
        @click="confirm"
      >
        {{ confirmText }}
      </button>
      <button
        data-cy="dialog-cancel"
        class="dialog-action-button button secondary"
        @click="cancel"
      >
        {{ cancelText }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: { type: String, required: true },
    confirmCallback: { type: Function, required: true },
    cancelCallback: { type: Function },
    confirmText: { type: String, default: "confirm" },
    cancelText: { type: String, default: "cancel" },
    confirmButtonClass: { type: String, default: "delete" }
  },

  methods: {
    confirm() {
      this.confirmCallback();
      this.$emit("close");
    },

    cancel() {
      if (this.cancelCallback) this.cancelCallback();

      this.$emit("close");
    }
  }
};
</script>

<style lang="scss">
.dialog-modal {
  .v--modal {
    background: transparent;
    box-shadow: none;
  }
}

.dialog-container {
  width: 80%;
  @apply p-4 bg-gray-100 mx-auto;
  box-shadow: 0 20px 10px -2px rgba(27, 33, 58, 0.4);
}

.dialog-text {
  @apply p-2 mb-2 text-2xl text-center;
}

.dialog-actions {
  @apply flex w-full;
}

.dialog-action-button {
  @apply flex-auto font-bold uppercase;
}
</style>
