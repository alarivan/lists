<template>
  <div class="component-loading">
    <div class="lds-hourglass" title="Loading"></div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

import { Person } from "blockstack";
import { userSession, getFile } from "Helper/userSession";

export default {
  name: "component-loading",

  data() {
    return {};
  },

  created() {
    if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData();
      let user = new Person(userData.profile);
      user.username = userData.username;

      this.addUser(user);

      getFile().then(data => {
        if (data) {
          this.setLists(data.lists);
        }

        this.setLoading(false);
      });
    } else if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(() => {
        window.location = window.location.origin;
      });
    } else {
      this.setLoading(false);
    }
  },

  methods: {
    ...mapActions(["addUser", "setItems", "setLists", "setLoading"])
  }
};
</script>

<style scoped lang="scss">
.component-loading {
  @apply fixed flex items-center justify-center w-full h-screen top-0 left-0;
}

.lds-hourglass {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;

  &:after {
    content: " ";
    display: block;
    border-radius: 50%;
    width: 0;
    height: 0;
    margin: 6px;
    box-sizing: border-box;
    border: 26px solid theme("colors.indigo.500");
    border-color: theme("colors.indigo.500") transparent
      theme("colors.indigo.500") transparent;
    animation: lds-hourglass 1.2s infinite;
  }
}

@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }
  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  100% {
    transform: rotate(1800deg);
  }
}
</style>
