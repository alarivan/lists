<template>
  <modal
    :name="name"
    width="100%"
    height="auto"
    :pivotY="pivotY"
    @opened="$emit('opened')"
    @closed="$emit('closed')"
  >
    <SimpleForm class="p-2" @submit="submit" @cancel="cancel">
      <slot></slot>
    </SimpleForm>
  </modal>
</template>

<script>
import SimpleForm from "Components/SimpleForm.vue";

export default {
  name: "component-fixed-form",
  components: {
    SimpleForm
  },

  data() {
    return {};
  },

  props: {
    name: { type: String, required: true }
  },

  methods: {
    submit() {
      this.$emit("submit");
    },

    cancel() {
      this.close();

      this.$emit("cancel");
    },

    open() {
      this.$modal.show(this.name);
    },

    close() {
      this.$modal.hide(this.name);
    }
  },

  computed: {
    pivotY() {
      return this.$mq == "sm" ? 1 : 0.5;
    }
  }
};
</script>

<style lang="scss">
.v--modal {
  border-radius: 0;
}
</style>
