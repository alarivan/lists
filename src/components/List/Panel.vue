<template>
  <div class="list-panel flex mb-1">
    <div class="font-bold italic list-panel-item flex flex-auto px-3 py-2">
      <div class="flex items-center">
        <svg class="icon">
          <use xlink:href="#icon-checkmark1" />
        </svg>
        <div class="ml-1">{{stats[0]}}</div>
      </div>
      <div class="mx-1 py-1">/</div>
      <div class="flex items-center">
        <svg class="icon">
          <use xlink:href="#icon-checkmark" />
        </svg>
        <div class="ml-1">{{stats[1]}}</div>
      </div>
    </div>
    <button class="list-panel-item" @click="toggleSortDirection">
      <svg class="icon icon-md">
        <use :xlink:href="sortDirectionLabel" />
      </svg>
    </button>
    <button
      :title="sortStatusLabel"
      class="list-panel-item sort-status"
      :class="{active: sortStatus}"
      @click="toggleSortStatus"
    >
      <svg class="icon">
        <use xlink:href="#icon-tab" />
      </svg>
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "component-list-panel",

  data() {
    return {};
  },

  props: {
    list: { type: Object, required: true }
  },

  methods: {
    toggleSortDirection() {
      this.setSortDirection(!this.sortDirection);
    },

    toggleSortStatus() {
      this.setSortStatus(!this.sortStatus);
    },

    ...mapActions(["setSortStatus", "setSortDirection"])
  },

  computed: {
    stats() {
      return this.list.items.reduce(
        (acc, item) => {
          item.status ? (acc[0] += 1) : (acc[1] += 1);

          return acc;
        },
        [0, 0]
      );
    },

    sortDirectionLabel() {
      return this.sortDirection ? "#icon-move-down" : "#icon-move-up";
    },

    sortStatusLabel() {
      return this.sortStatus ? "Disable Sorting" : "Enable Sorting";
    },

    ...mapGetters(["sortStatus", "sortDirection"])
  }
};
</script>

<style lang="scss">
.list-panel {
  @apply bg-gray-300;
}

.list-panel-item {
  @apply text-gray-900;

  &.sort-status {
    @apply text-gray-500;

    &.active {
      @apply text-gray-900;
    }
  }
}
</style>