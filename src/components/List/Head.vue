<template>
  <div data-cy="list-head" class="list-head mb-1">
    <div class="flex">
      <ListName :name="list.name" />

      <slide-x-right-transition :duration="200">
        <div v-if="showButtons" class="flex">
          <slot></slot>
          <HeadEdit :list="list" />
          <HeadDelete :list="list" />
        </div>
      </slide-x-right-transition>
      <slot name="after"></slot>
    </div>
  </div>
</template>

<script>
import HeadEdit from "Components/List/Head/Edit.vue";
import HeadDelete from "Components/List/Head/Delete.vue";
import ListName from "Components/List/ListName.vue";
import { SlideXRightTransition } from "vue2-transitions";

export default {
  name: "component-list-head",
  components: {
    HeadEdit,
    HeadDelete,
    ListName,
    SlideXRightTransition
  },

  props: {
    list: { type: Object, required: true },
    showButtons: { type: Boolean, default: true }
  }
};
</script>

<style lang="scss"></style>
