<template>
  <div class="flex-auto">
    <div v-if="items.length" class="font-bold italic list-panel-item flex px-3 py-2">
      <StatsItem :total="stats.complete" icon="#icon-checkmark1" />

      <div v-if="stats.complete && stats.incomplete" class="mx-1">/</div>

      <StatsItem :total="stats.incomplete" icon="#icon-checkmark" />
    </div>
  </div>
</template>

<script>
import StatsItem from "Components/List/Panel/Stats/Item.vue";

export default {
  name: "component-list-panel-stats",
  components: {
    StatsItem
  },

  props: {
    items: { type: Array, required: true }
  },

  computed: {
    stats() {
      return this.items.reduce(
        (acc, item) => {
          item.status ? (acc.complete += 1) : (acc.incomplete += 1);

          return acc;
        },
        { complete: 0, incomplete: 0 }
      );
    }
  }
};
</script>