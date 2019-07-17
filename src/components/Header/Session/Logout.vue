<template>
  <SessionButton @click.native="signOut" title="Sign Out">
    <Icon href="#icon-exit" class="ml-1" size="md" />
  </SessionButton>
</template>

<script>
import { mapActions } from "vuex";

import { userSession } from "Helper/userSession";

import SessionButton from "Components/Header/Session/Button.vue";
import Icon from "Components/common/Icon.vue";

export default {
  name: "component-session-logout",
  components: {
    SessionButton,
    Icon
  },

  methods: {
    signOut() {
      userSession.signUserOut();
      this.removeUser();
    },

    ...mapActions(["removeUser"])
  }
};
</script>

<style scoped lang="scss">
.session-button {
  @apply bg-blue-800;

  &:hover {
    @apply bg-blue-900;
  }
}
</style>
