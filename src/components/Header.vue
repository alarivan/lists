<template>
  <div class="component-header flex justify-between mb-4 px-1">
    <Logo />
    <Session />
  </div>
</template>

<script>
import Session from "Components/Header/Session.vue";
import Logo from "Components/Header/Logo.vue";

export default {
  name: "component-header",

  components: {
    Session,
    Logo
  }
};
</script>

<style lang="scss"></style>
