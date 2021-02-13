<template>
  <div class="component-list">
    <ListHead :list="list" />
    <ListPanel :list="list" />

    <ButtonAdd
      class="hidden sm:block mb-2"
      data-cy="item-new-button-inline"
      @click="openItemForm(list)"
    />
    <div v-if="undoItem">
      <UndoButton data-cy="undo-item-button" @click="undo">
        UNDO
      </UndoButton>
    </div>

    <ListItems :list="list" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import ListHead from "Components/List/Head.vue";
import ListPanel from "Components/List/Panel.vue";
import ListItems from "Components/List/Items.vue";
import ButtonAdd from "Components/common/ButtonAdd.vue";
import UndoButton from "Components/common/UndoButton.vue";

export default {
  name: "component-list",
  components: {
    ListHead,
    ListPanel,
    ListItems,
    ButtonAdd,
    UndoButton
  },

  props: {
    list: { type: Object, required: true }
  },

  methods: {
    undo() {
      if (this.undoItem) {
        const { status } = this.undoItem;
        this.updateListItem({
          list_id: this.undoItem.parent,
          item_id: this.undoItem.id,
          values: { status }
        });
        this.setUndoItem(null);
      }
    },

    ...mapActions(["openItemForm", "updateListItem", "setUndoItem"])
  },

  computed: {
    ...mapGetters(["undoItem"])
  }
};
</script>
