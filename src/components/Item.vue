<template>
  <div class="flex mb-1">
    <div @click="updateItem" class="list-item flex items-center">
      <div class="checkmark mr-2">
        <Icon :href="itemStatus" size="md" />
      </div>
      <div>{{item.name}}</div>
    </div>
    <button class="button delete" @click="deleteItem">
      <Icon href="#icon-bin" />
    </button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import ItemApi from "../api/item";
import ListApi from "../api/list";

import Icon from "Components/common/Icon.vue";

export default {
  name: "component-item",
  components: {
    Icon
  },

  props: {
    item: { type: Object, required: true },
    list: { type: Object, required: true }
  },

  methods: {
    updateItem() {
      ItemApi.updateItem(this.item.id, !this.item.status);
    },

    deleteItem() {
      ListApi.removeItemFromList(this.list, this.item);
    }
  },

  computed: {
    itemStatus() {
      return this.item.status ? "#icon-checkmark1" : "#icon-checkmark";
    }
  }
};
</script>

<style lang="scss">
.list-item {
  @apply w-full bg-orange-200 text-gray-900 cursor-pointer px-4 py-3;
}

.button-delete {
  @apply bg-red-800 text-white px-4;
}
</style>
