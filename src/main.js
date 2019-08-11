import Vue from "vue";
import VModal from "vue-js-modal";
import VueMq from "vue-mq";
import Vue2TouchEvents from "vue2-touch-events";
import App from "./App.vue";
import store from "Store";
import router from "Router";
import "./registerServiceWorker";
import "Styles/main.scss";

Vue.config.productionTip = false;

Vue.use(VModal, { dynamic: true, injectModalsContainer: true });

Vue.use(VueMq, {
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: Infinity
  },
  defaultBreakpoint: "sm"
});

Vue.use(Vue2TouchEvents, {
  swipeTolerance: 100
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
