<template>
  <div>
    <FixedForm ref="newItemForm" :name="fixedFormName" @submit="newItem" @opened="focus">
      <div class="flex w-full">
        <InputText
          data-cy="item-new-name"
          class="flex-auto"
          ref="newItemInput"
          :model.sync="itemName"
          placeholder="Item Name"
        />
        <button
          data-cy="item-new-multiple-toggle"
          @click="toggleMultiple"
          type="button"
          class="item-form-multiple-toggle"
          :class="{ enabled: multiple }"
        >
          <Icon href="#icon-infinite" size="md" />
        </button>
      </div>
    </FixedForm>

    <button
      data-cy="item-new-button-inline"
      @click="open"
      class="hidden sm:block button primary w-full item-form-trigger"
    >
      <Icon href="#icon-plus" size="md" class="mx-auto" />
    </button>
    <FixedButton data-cy="item-new-button-fixed" v-if="isListView" @click="open" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import ItemApi from "Api/item";
import ListApi from "Api/list";

import Icon from "Components/common/Icon.vue";
import FixedForm from "Components/common/FixedForm.vue";
import FixedButton from "Components/common/FixedButton.vue";
import InputText from "Components/common/InputText.vue";

export default {
  name: "component-list-item-from",
  components: {
    Icon,
    FixedForm,
    FixedButton,
    InputText
  },

  data() {
    return {
      itemName: "",
      multiple: false
    };
  },

  props: {
    list: { type: Object, required: true }
  },

  methods: {
    open() {
      this.$refs.newItemForm.open();
    },

    focus() {
      this.$refs.newItemInput.focus();
    },

    newItem() {
      const item = ItemApi.addItem(this.itemName);
      ListApi.addItemToList(this.list, item);

      this.itemName = "";
      if (this.multiple) {
        this.$refs.newItemInput.focus();
      } else {
        this.$refs.newItemForm.close();
      }
    },

    toggleMultiple() {
      this.multiple = !this.multiple;

      this.$refs.newItemInput.focus();
    }
  },

  computed: {
    isListView() {
      return this.$route.name === "view-list";
    },

    fixedFormName() {
      return `item-new-from-${this.list.id}`;
    },

    ...mapGetters(["items"])
  }
};
</script>

<style lang="scss">
.item-form-multiple-toggle {
  @apply bg-gray-200 px-3 text-gray-500;

  &.enabled {
    @apply bg-teal-400 text-gray-100;

    &:hover,
    &:focus,
    &:active {
      @apply bg-teal-500;
    }
  }
}
</style>
