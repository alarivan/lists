import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "view-home",
      component: () => import(/* webpackChunkName: "home" */ "Views/Home.vue")
    },
    {
      path: "/list/:id",
      name: "view-list",
      component: () => import(/* webpackChunkName: "list" */ "Views/List.vue")
    }
  ]
});

export default router;
