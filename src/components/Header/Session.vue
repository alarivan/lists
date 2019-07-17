<template>
  <div class="component-header-session">
    <Logout v-if="loggedIn" />
    <Login v-else />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import { Person } from "blockstack";
import { userSession, getFile } from "Helper/userSession";

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
