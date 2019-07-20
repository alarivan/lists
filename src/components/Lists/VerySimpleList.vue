<template>
  <div class="component-very-simple-list bg-green-200">
    <router-link
      data-cy="list-view-button"
      class="flex items-center"
      :to="{ name: 'view-list', params: { id: this.list.id } }"
    >
      <ListName :name="list.name" />
      <Stats :items="list.items" />
    </router-link>
  </div>
</template>

<script>
import Stats from "Components/List/Panel/Stats.vue";
import ListName from "Components/List/ListName.vue";

export default {
  name: "component-very-simple-list",
  components: {
    Stats,
    ListName
  },

  props: {
    list: { type: Object, required: true }
  }
};
</script>

<style lang="scss"></style>
