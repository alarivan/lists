<template>
  <div class="component-list">
    <ListHead :list="list" />
    <ListPanel :list="list" />

    <ButtonAdd
      class="hidden sm:block mb-2"
      data-cy="item-new-button-inline"
      @click="openItemForm(list)"
    />

    <ListItems :list="list" />
  </div>
</template>

<script>
import { mapActions } from "vuex";

import ListHead from "Components/List/Head.vue";
import ListPanel from "Components/List/Panel.vue";
import ListItems from "Components/List/Items.vue";
import ButtonAdd from "Components/common/ButtonAdd.vue";

export default {
  name: "component-list",
  components: {
    ListHead,
    ListPanel,
    ListItems,
    ButtonAdd
  },

  props: {
    list: { type: Object, required: true }
  },

  methods: {
    ...mapActions(["openItemForm"])
  }
};
</script>