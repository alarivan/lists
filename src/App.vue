<template>
  <div id="app" class="container mx-auto p-2">
    <Loading v-if="loading" />

    <div v-else>
      <Header />
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Loading from "Components/Loading.vue";
import Header from "Components/Header.vue";

export default {
  name: "app",
  components: {
    Loading,
    Header
  },

  computed: {
    ...mapGetters(["loading"])
  }
};
</script>

<style lang="scss">
#app {
  max-width: 800px;
  @apply mx-auto;
}
</style>
