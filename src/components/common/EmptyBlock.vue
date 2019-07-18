<template>
  <div data-cy="empty-block" class="empty-block">
    <div>
      <h1 v-if="title" data-cy="empty-block-title" class="empty-block-title">{{title}}</h1>

      <button data-cy="empty-block-button" @click="open" class="empty-block-button button primary">
        <Icon href="#icon-plus" class="empty-block-button-icon" />
      </button>
    </div>
  </div>
</template>

<script>
import Icon from "Components/common/Icon.vue";

export default {
  name: "component-empty-block",
  components: {
    Icon
  },

  props: {
    title: { type: String }
  },

  methods: {
    open() {
      this.$emit("click");
    }
  }
};
</script>

<style scoped lang="scss">
.empty-block {
  @apply w-full flex flex-wrap justify-center items-center;
  height: 50vh;
}

.empty-block-title {
  @apply text-center uppercase font-bold mb-2 text-gray-700;
}

.empty-block-button {
  @apply block mx-auto px-8 py-8 rounded-full;
}

.empty-block-button-icon {
  width: 5rem;
  height: 5rem;
}
</style>
