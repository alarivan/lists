<template>
  <div class="flex mb-1">
    <ItemBody
      :list="list"
      :item="item"
      v-touch:swipe.left="emitDeleteSwipe"
      @click.native="updateItem"
    />
    <button data-cy="item-delete-button" class="button delete" @click="emitDeleteClick">
      <Icon href="#icon-bin" />
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import Icon from "Components/common/Icon.vue";
import ItemBody from "Components/List/Item/Body.vue";

export default {
  name: "component-item",
  components: {
    Icon,
    ItemBody
  },

  props: {
    item: { type: Object, required: true },
    list: { type: Object, required: true }
  },

  methods: {
    updateItem() {
      this.updateListItem({
        list_id: this.list.id,
        item_id: this.item.id,
        values: { status: !this.item.status }
      });
    },

    emitDeleteClick() {
      this.$emit("on-delete-click", this.item);
    },

    emitDeleteSwipe() {
      this.$emit("on-delete-swipe", this.item);
    },

    ...mapActions(["updateListItem"])
  },

  computed: {
    itemStatus() {
      return this.item.status ? "#icon-checkmark1" : "#icon-checkmark";
    },

    showOrder() {
      return this.list.options.sortByOrder;
    }
  }
};
</script>

<style lang="scss">
.button-delete {
  @apply bg-red-800 text-white px-4;
}
</style>
