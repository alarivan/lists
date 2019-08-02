<template>
  <div data-cy="list-item" class="list-item flex items-center">
    <div v-if="showOrder" data-cy="item-order" class="mr-2 font-bold">
      {{ item.order }}
    </div>
    <div class="checkmark mr-2">
      <Icon data-cy="item-status" :href="itemStatus" size="md" />
    </div>
    <div>{{ item.name }}</div>
  </div>
</template>

<script>
import Icon from "Components/common/Icon.vue";

export default {
  name: "component-item-body",
  components: {
    Icon
  },

  props: {
    item: { type: Object, required: true },
    list: { type: Object, required: true }
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
.list-item {
  @apply w-full bg-orange-200 text-gray-900 cursor-pointer px-4 py-3;
}
</style>
