import Vue from "vue";
import VModal from "vue-js-modal";
import App from "./App.vue";
import store from "Store";
import router from "Router";
import "./registerServiceWorker";
import "Styles/main.scss";

Vue.config.productionTip = false;

Vue.use(VModal, { dialog: true });

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
