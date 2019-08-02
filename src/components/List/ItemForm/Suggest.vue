<template>
  <div data-cy="item-form-suggest" class="item-form-suggest">
    <collapse-transition :group="true" :duration="100">
      <ItemBody
        class="mb-1"
        @click.native="$emit('item-click', item)"
        v-for="item in items"
        :key="item.id"
        :item="item"
        :list="list"
      />
    </collapse-transition>
  </div>
</template>

<script>
import ItemBody from "Components/List/Item/Body.vue";
import { CollapseTransition } from "vue2-transitions";

export default {
  name: "component-item-form-suggest",
  components: {
    ItemBody,
    CollapseTransition
  },

  props: {
    list: { type: Object, required: true },
    name: { type: String, required: true }
  },

  computed: {
    items() {
      const name = this.name.toLowerCase();
      return this.name
        ? this.list.items.filter(
            i => i.name.toLowerCase().includes(name) && i.status
          )
        : [];
    }
  }
};
</script>

<style lang="scss">
.item-form-suggest {
  @apply relative overflow-y-scroll mb-1;
  max-height: 140px;
}
</style>
