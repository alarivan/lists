<template>
  <SessionButton @click.native="signIn" title="Sign In with Blockstack">
    <Icon href="#icon-enter" class="mr-1" size="md" />
  </SessionButton>
</template>

<script>
import { userSession } from "Helper/userSession";

import SessionButton from "Components/Header/Session/Button.vue";
import Icon from "Components/common/Icon.vue";

export default {
  name: "component-session-login",

  components: {
    SessionButton,
    Icon
  },

  methods: {
    signIn() {
      userSession.redirectToSignIn();
    }
  }
};
</script>

<style scoped lang="scss">
.session-button {
  @apply bg-indigo-800;

  &:hover {
    @apply bg-indigo-900;
  }
}
</style>
