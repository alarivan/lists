<template>
  <div class="component-header-session">
    <Logout v-if="loggedIn" />
    <Login v-else />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Login from "Components/Header/Session/Login.vue";
import Logout from "Components/Header/Session/Logout.vue";

export default {
  name: "component-header-session",

  components: {
    Login,
    Logout
  },

  computed: {
    ...mapGetters(["loggedIn"])
  }
};
</script>

<style lang="scss"></style>
