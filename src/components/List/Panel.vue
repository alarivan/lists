<template>
  <div class="list-panel mb-1">
    <div data-cy="list-panel-main" class="list-panel-main flex">
      <Stats class="flex-auto" :items="list.items" />

      <PanelButton
        data-cy="list-panel-more-options"
        v-if="menu"
        :title="moreTitle"
        @click.native="toggleMore"
      >
        <Icon :href="moreIcon" size="lg" />
      </PanelButton>
    </div>
    <collapse-transition :duration="150">
      <div data-cy="list-panel-more" class="list-panel-more" v-show="more">
        <PanelButton
          data-cy="list-panel-sort-by-order"
          class="togglable"
          :class="{ active: sortByOrder }"
          :title="sortByOrderTitle"
          @click.native="togglesortByOrder"
        >
          <Icon href="#icon-list-numbered" size="md" />
        </PanelButton>

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
    </collapse-transition>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import Stats from "Components/List/Panel/Stats.vue";
import PanelButton from "Components/List/Panel/Button.vue";
import Icon from "Components/common/Icon.vue";
import { CollapseTransition } from "vue2-transitions";

export default {
  name: "component-list-panel",
  components: {
    Stats,
    PanelButton,
    Icon,
    CollapseTransition
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
      this.updateListOption({
        id: this.list.id,
        option: "sortDirection",
        value: !this.sortDirection
      });
    },

    toggleSortStatus() {
      this.updateListOption({
        id: this.list.id,
        option: "sortStatus",
        value: !this.sortStatus
      });
    },

    toggleShowComplete() {
      this.updateListOption({
        id: this.list.id,
        option: "showComplete",
        value: !this.showComplete
      });
    },

    togglesortByOrder() {
      this.updateListOption({
        id: this.list.id,
        option: "sortByOrder",
        value: !this.sortByOrder
      });
    },

    toggleMore() {
      this.more = !this.more;
    },

    ...mapActions(["updateListOption"])
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

    sortByOrderTitle() {
      return this.sortByOrder ? "Ordered List" : "Unordered List";
    },

    sortDirection() {
      return this.list.options.sortDirection;
    },

    sortStatus() {
      return this.list.options.sortStatus;
    },

    showComplete() {
      return this.list.options.showComplete;
    },

    sortByOrder() {
      return this.list.options.sortByOrder;
    }
  }
};
</script>

<style lang="scss">
.list-panel-main,
.list-panel-more {
  @apply bg-gray-300;
}

.list-panel-more {
  @apply flex justify-end border-t border-gray-100;
}
</style>
