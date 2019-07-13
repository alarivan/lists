<template>
  <div>
    <FixedForm ref="newItemForm" :name="fixedFormName" @submit="newItem" @opened="focus">
      <div class="flex w-full">
        <vue-simple-suggest
          class="flex-auto mr-1"
          v-model="itemName"
          :list="uniqItems"
          display-attribute="name"
          :filter-by-query="true"
          ref="newItemSuggest"
        >
          <input type="text" placeholder="Item Name" ref="newItemInput" />
        </vue-simple-suggest>
        <button
          @click="toggleMultiple"
          type="button"
          class="item-form-multiple-toggle"
          :class="{enabled: multiple}"
        >
          <Icon href="#icon-infinite" size="md" />
        </button>
      </div>
    </FixedForm>

    <button @click="open" class="hidden sm:block button primary w-full item-form-trigger">
      <Icon href="#icon-plus" size="md" class="mx-auto" />
    </button>
    <FixedButton v-if="isListView" @click="open" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import ItemApi from "../../api/item";
import ListApi from "../../api/list";

import VueSimpleSuggest from "vue-simple-suggest";

import Icon from "Components/common/Icon.vue";
import FixedForm from "Components/common/FixedForm.vue";
import FixedButton from "Components/common/FixedButton.vue";

export default {
  name: "component-list-item-from",
  components: {
    VueSimpleSuggest,
    Icon,
    FixedForm,
    FixedButton
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

      if (this.multiple) {
        this.$refs.newItemSuggest.setText("");
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
    uniqItems() {
      const items = [...this.items];
      return items.filter(
        (v, i, a) => a.findIndex(x => x.name === v.name) === i
      );
    },

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
.vue-simple-suggest.designed {
  position: relative;
}

.vue-simple-suggest.designed input {
  @apply block w-full;
  transition: all 0.1s;
  transition-delay: 0.05s;
}

.vue-simple-suggest.designed.focus input {
  @apply border border-gray-500;
}

.vue-simple-suggest.designed .suggestions {
  @apply absolute bg-white border border-gray-500;
  left: 0;
  right: 0;
  top: 100%;
  top: calc(100% - 1px);
  opacity: 1;
  z-index: 1000;
}

.vue-simple-suggest.designed .suggest-item {
  cursor: pointer;
  user-select: none;
}

.vue-simple-suggest.designed .suggest-item,
.vue-simple-suggest.designed .misc-item {
  @apply px-4 py-2;
}

.vue-simple-suggest.designed .suggest-item {
  &.hover,
  &.selected {
    @apply text-gray-100;
  }

  &.hover {
    @apply bg-blue-300;
  }

  &.selected {
    @apply bg-indigo-300;
  }
}

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