import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../components/layouts/Layout.vue";

import Dashboard from "../views/Dashboard/Dashboard.vue";
import Error from "../views/Error/Error.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Layout",
    component: Layout,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      // {
      //   path: "dashboard",
      //   name: "Dashboard",
      //   component: Dashboard,
      // },
      // {
      //   path: "dashboard",
      //   name: "Dashboard",
      //   component: Dashboard,
      // },
      // {
      //   path: "dashboard",
      //   name: "Dashboard",
      //   component: Dashboard,
      // },
      // {
      //   path: "dashboard",
      //   name: "Dashboard",
      //   component: Dashboard,
      // },
    ],
  },
  {
    path: "*",
    name: "Error",
    component: Error,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
