<template>
  <div class="list-panel mb-1">
    <div class="list-panel-main flex">
      <Stats :items="list.items" />

      <PanelButton :title="moreTitle" @click.native="toggleMore">
        <Icon :href="moreIcon" size="lg" />
      </PanelButton>
    </div>
    <div class="list-panel-more" v-if="more">
      <PanelButton title="Sort Direction" @click.native="toggleSortDirection">
        <Icon :href="sortDirectionIcon" size="lg" />
      </PanelButton>

      <PanelButton
        class="togglable"
        :class="{active: sortStatus}"
        :title="sortStatusTitle"
        @click.native="toggleSortStatus"
      >
        <Icon href="#icon-tab" size="md" />
      </PanelButton>

      <PanelButton
        class="togglable"
        :class="{active: showComplete}"
        :title="showCompleteTitle"
        @click.native="toggleShowComplete"
      >
        <Icon href="#icon-checkmark1" size="md" />
      </PanelButton>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

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
    list: { type: Object, required: true }
  },

  methods: {
    toggleSortDirection() {
      this.setSortDirection(!this.sortDirection);
    },

    toggleSortStatus() {
      this.setSortStatus(!this.sortStatus);
    },

    toggleShowComplete() {
      this.setShowComplete(!this.showComplete);
    },

    toggleMore() {
      this.more = !this.more;
    },

    ...mapActions(["setSortStatus", "setSortDirection", "setShowComplete"])
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
      return this.more ? "Show Options" : "Hide Options";
    },

    ...mapGetters(["sortStatus", "sortDirection", "showComplete"])
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