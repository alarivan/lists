<template>
  <FixedForm
    ref="newItemForm"
    :name="fixedFormName"
    @submit="newItem"
    @opened="focus"
    @closed="closed"
  >
    <Suggest :list="list" :name="itemName" @item-click="updateItem" />
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
      <div class="w-1 border border-gray-200"></div>
      <button
        data-cy="item-new-list-toggle"
        @click="toggleList"
        type="button"
        class="item-form-list-toggle"
        :class="{ enabled: isList }"
      >
        <Icon href="#icon-list" size="md" />
      </button>
    </div>
  </FixedForm>
</template>

<script>
import { mapActions } from "vuex";

import ItemApi from "Api/item";

import Icon from "Components/common/Icon.vue";
import FixedForm from "Components/common/FixedForm.vue";
import InputText from "Components/common/InputText.vue";
import Suggest from "Components/List/ItemForm/Suggest.vue";

export default {
  name: "component-list-item-from",
  components: {
    Icon,
    FixedForm,
    InputText,
    Suggest
  },

  data() {
    return {
      itemName: "",
      multiple: false,
      isList: false
    };
  },

  props: {
    list: { type: Object, required: true }
  },

  mounted() {
    this.open();
  },

  methods: {
    open() {
      this.$refs.newItemForm.open();
    },

    focus() {
      this.$refs.newItemInput.focus();
    },

    closed() {
      this.multiple = false;
      this.itemName = "";
      this.closeItemForm();
    },

    newItem() {
      if (this.isList) {
        this.addListItem({
          list_id: this.list.id,
          item: ItemApi.newListItem(this.list, this.itemName)
        });
      } else {
        this.addListItem({
          list_id: this.list.id,
          item: ItemApi.newItem(this.list, this.itemName)
        });
      }

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
    },

    toggleList() {
      this.isList = !this.isList;

      this.$refs.newItemInput.focus();
    },

    updateItem(item) {
      this.$refs.newItemInput.focus();

      this.updateListItem({
        list_id: this.list.id,
        item_id: item.id,
        values: { status: false }
      });
    },

    ...mapActions(["addListItem", "updateListItem", "closeItemForm"])
  },

  computed: {
    fixedFormName() {
      return `item-new-from-${this.list.id}`;
    }
  }
};
</script>

<style lang="scss">
.item-form-multiple-toggle,
.item-form-list-toggle {
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
