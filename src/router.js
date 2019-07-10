import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

import store from "./store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "view-home",
      component: () => import(/* webpackChunkName: "home" */ "./views/Home.vue")
    },
    {
      path: "/list/:id",
      name: "view-list",
      component: () => import(/* webpackChunkName: "list" */ "./views/List.vue")
    }
  ]
});

export default router;
