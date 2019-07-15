<template>
  <div class="flex items-center" v-if="total > 0">
    <Icon :href="icon" />
    <div class="ml-1">{{ total }}</div>
  </div>
</template>

<script>
import Icon from "Components/common/Icon.vue";

export default {
  name: "component-list-panel-stats-item",
  components: {
    Icon
  },

  props: {
    total: { type: Number, required: true },
    icon: { type: String, required: true }
  }
};
</script>
