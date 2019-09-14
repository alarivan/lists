<template>
  <div class="component-header flex justify-between mb-4 px-1">
    <Logo />
    <Update />
    <Session />
  </div>
</template>

<script>
import Session from "Components/Header/Session.vue";
import Logo from "Components/Header/Logo.vue";
import Update from "Components/Header/Update.vue";

export default {
  name: "component-header",

  components: {
    Session,
    Logo,
    Update
  }
};
</script>

<style lang="scss"></style>
