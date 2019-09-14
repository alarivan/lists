<template>
  <button
    data-cy="header-update-button"
    class="success"
    v-if="updateExists"
    @click="refreshApp"
  >
    <Icon href="#icon-loop" size="md" class="mx-auto" />
  </button>
</template>

<script>
import { messageSW } from "workbox-window";
import Icon from "Components/common/Icon.vue";
import Dialog from "Components/common/Dialog.vue";

export default {
  name: "header-update",

  components: {
    Icon
  },

  data() {
    return {
      refreshing: false,
      registration: null,
      updateExists: false
    };
  },

  created() {
    document.addEventListener("swUpdated", this.showRefreshUI, { once: true });

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (this.refreshing) return;
      this.refreshing = true;
      window.location.reload();
    });
  },

  methods: {
    showRefreshUI(e) {
      this.registration = e.detail;
      this.openUpdateModal();
    },

    refreshApp() {
      this.updateExists = false;

      if (!this.registration || !this.registration.waiting) {
        return;
      }

      messageSW(this.registration.waiting, { type: "SKIP_WAITING" });
    },

    openUpdateModal() {
      this.$modal.show(
        Dialog,
        {
          confirmCallback: () => {
            this.refreshApp();
          },
          cancelCallback: () => {
            this.updateExists = true;
          },
          text: `Update Available`,
          confirmText: "update",
          cancelText: "later",
          confirmButtonClass: "success"
        },
        { width: "100%", height: "auto", pivotY: 0.7 }
      );
    }
  }
};
</script>
