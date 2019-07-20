<template>
  <h1 data-cy="list-name" class="font-bold flex-auto p-2">{{ name }}</h1>
</template>

<script>
export default {
  name: "component-list-name",

  props: {
    name: { type: String, required: true }
  }
};
</script>

<style lang="scss"></style>
