<template>
  <SimpleForm @submit="newItem" @cancel="cancel">
    <vue-simple-suggest
      v-model="itemName"
      :list="uniqItems"
      display-attribute="name"
      :filter-by-query="true"
      ref="newItemSuggest"
    >
      <input type="text" placeholder="Item Name" ref="newItemInput" />
    </vue-simple-suggest>
  </SimpleForm>
</template>

<script>
import { mapGetters } from "vuex";

import ItemApi from "../../api/item";
import ListApi from "../../api/list";

import VueSimpleSuggest from "vue-simple-suggest";

import SimpleForm from "Components/SimpleForm.vue";

export default {
  name: "component-list-item-from",
  components: {
    VueSimpleSuggest,
    SimpleForm
  },

  data() {
    return {
      itemName: ""
    };
  },

  props: {
    list: { type: Object, required: true }
  },

  methods: {
    cancel() {
      this.$emit("cancel");
    },

    focus() {
      this.$refs.newItemInput.focus();
    },

    newItem() {
      const item = ItemApi.addItem(this.itemName);
      ListApi.addItemToList(this.list, item);

      this.$refs.newItemSuggest.setText("");
      this.$refs.newItemInput.focus();

      this.$emit("saved");
    }
  },

  computed: {
    uniqItems() {
      const items = [...this.items];
      return items.filter(
        (v, i, a) => a.findIndex(x => x.name === v.name) === i
      );
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
    @apply bg-blue-500;
  }

  &.selected {
    @apply bg-indigo-500;
  }
}
</style>