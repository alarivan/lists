<template>
  <div>
    <template v-if="item.items">
      <NestedList :list="item" />
    </template>
    <template v-else>
      <Item :item="item" :list="list" />
    </template>
  </div>
</template>

<script>
import Item from "Components/List/Item.vue";
import { SlideXLeftTransition } from "vue2-transitions";

export default {
  name: "component-list-item-container",
  components: {
    Item,
    NestedList: () => import("Components/List/NestedList.vue")
  },

  data() {
    return {};
  },

  props: {
    item: { type: Object, required: true },
    list: { type: Object, required: true }
  }
};
</script>

<style lang="scss"></style>
