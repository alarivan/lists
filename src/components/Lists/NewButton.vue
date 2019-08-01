<template>
  <div>
    <ButtonAdd
      class="hidden sm:block mb-2"
      data-cy="list-new-button-inline"
      @click="open"
    />
    <FixedButton data-cy="list-new-button-fixed" @click="open" />
  </div>
</template>

<script>
import FixedButton from "Components/common/FixedButton.vue";
import ButtonAdd from "Components/common/ButtonAdd.vue";

export default {
  name: "component-lists-new-button",
  components: {
    FixedButton,
    ButtonAdd
  },

  methods: {
    open() {
      this.$modal.show("list-new-form");
    }
  }
};
</script>

<style lang="scss"></style>
