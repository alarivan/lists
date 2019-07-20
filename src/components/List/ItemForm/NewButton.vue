<template>
  <div>
    <ButtonAdd class="hidden sm:block mb-2" data-cy="item-new-button-inline" @click="open" />
    <FixedButton data-cy="item-new-button-fixed" @click="open" />
  </div>
</template>

<script>
import FixedButton from "Components/common/FixedButton.vue";
import ButtonAdd from "Components/common/ButtonAdd.vue";

export default {
  name: "component-item-new-button",
  components: {
    FixedButton,
    ButtonAdd
  },

  props: {
    listId: { type: String, required: true }
  },

  methods: {
    open() {
      this.$modal.show(this.modalName);
    }
  },

  computed: {
    modalName() {
      return `item-new-from-${this.listId}`;
    }
  }
};
</script>

<style lang="scss"></style>
