<template>
  <div class="component-list w-full border-l-4 border-t-4 border-gray-300">
    <ListHead :list="list" :showButtons="showHeadButtons">
      <HeadAddItem v-if="showHeadButtons" :list="list" />
      <template v-slot:after>
        <HeadToggle :list="list" @click.native="toggleButtons" />
      </template>
    </ListHead>
    <slide-y-up-transition :duration="200">
      <ListPanel v-if="showHeadButtons" :list="list" />
    </slide-y-up-transition>

    <ListItems :list="list" />
  </div>
</template>

<script>
import { mapActions } from "vuex";

import ListHead from "Components/List/Head.vue";
import ListPanel from "Components/List/Panel.vue";
import ListItems from "Components/List/Items.vue";
import HeadAddItem from "Components/List/Head/AddItem.vue";
import HeadToggle from "Components/List/Head/Toggle.vue";
import { SlideYUpTransition } from "vue2-transitions";

export default {
  name: "component-nested-list",
  components: {
    ListHead,
    ListPanel,
    ListItems,
    HeadAddItem,
    HeadToggle,
    SlideYUpTransition
  },

  props: {
    list: { type: Object, required: true }
  },

  data() {
    return {
      showHeadButtons: false
    };
  },

  methods: {
    toggleButtons() {
      this.showHeadButtons = !this.showHeadButtons;
    },

    ...mapActions(["openItemForm"])
  }
};
</script>
