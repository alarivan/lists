<template>
  <div class="list-panel mb-1">
    <div data-cy="list-panel-main" class="list-panel-main flex">
      <Stats :items="list.items" />

      <PanelButton
        data-cy="list-panel-more-options"
        v-if="menu"
        :title="moreTitle"
        @click.native="toggleMore"
      >
        <Icon :href="moreIcon" size="lg" />
      </PanelButton>
    </div>
    <div data-cy="list-panel-more" class="list-panel-more" v-if="more">
      <PanelButton
        data-cy="list-panel-sort-direction"
        title="Sort Direction"
        @click.native="toggleSortDirection"
      >
        <Icon :href="sortDirectionIcon" size="lg" />
      </PanelButton>

      <PanelButton
        data-cy="list-panel-sort-status"
        class="togglable"
        :class="{ active: sortStatus }"
        :title="sortStatusTitle"
        @click.native="toggleSortStatus"
      >
        <Icon href="#icon-tab" size="md" />
      </PanelButton>

      <PanelButton
        data-cy="list-panel-show-complete"
        class="togglable"
        :class="{ active: showComplete }"
        :title="showCompleteTitle"
        @click.native="toggleShowComplete"
      >
        <Icon href="#icon-checkmark1" size="md" />
      </PanelButton>
    </div>
  </div>
</template>

<script>
import ListApi from "Api/list";

import Stats from "Components/List/Panel/Stats.vue";
import PanelButton from "Components/List/Panel/Button.vue";
import Icon from "Components/common/Icon.vue";

export default {
  name: "component-list-panel",
  components: {
    Stats,
    PanelButton,
    Icon
  },

  data() {
    return {
      more: false
    };
  },

  props: {
    list: { type: Object, required: true },
    menu: { type: Boolean, default: true }
  },

  methods: {
    toggleSortDirection() {
      ListApi.updateListOption(this.list, "sortDirection", !this.sortDirection);
    },

    toggleSortStatus() {
      ListApi.updateListOption(this.list, "sortStatus", !this.sortStatus);
    },

    toggleShowComplete() {
      ListApi.updateListOption(this.list, "showComplete", !this.showComplete);
    },

    toggleMore() {
      this.more = !this.more;
    }
  },

  computed: {
    sortDirectionIcon() {
      return this.sortDirection ? "#icon-move-down" : "#icon-move-up";
    },

    sortStatusTitle() {
      return this.sortStatus ? "Disable Sorting" : "Enable Sorting";
    },

    showCompleteTitle() {
      return this.showComplete ? "Hide Completed" : "Show Completed";
    },

    moreIcon() {
      return this.more ? "#icon-menu-up" : "#icon-menu-down";
    },

    moreTitle() {
      return this.more ? "Hide Options" : "Show Options";
    },

    sortDirection() {
      return this.list.options.sortDirection;
    },

    sortStatus() {
      return this.list.options.sortStatus;
    },

    showComplete() {
      return this.list.options.showComplete;
    }
  }
};
</script>

<style lang="scss">
.list-panel {
  @apply bg-gray-300;
}

.list-panel-more {
  @apply flex justify-end border-t border-gray-100;
}
</style>
