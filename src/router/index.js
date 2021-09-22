import Vue from "vue";
import VueRouter from "vue-router";

import Layout from "../components/layouts/Layout.vue";

import Dashboard from "../views/Dashboard/Dashboard.vue";
import Login from "../views/Login/Login.vue";
import Error from "../views/Error/Error.vue";
import User from "../views/User/User.vue";
import Product from "../views/Product/Product.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "Layout",
    component: Layout,
    meta: {
      isPublic: true,
    },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "user",
        name: "User",
        component: User,
      },
      {
        path: "product",
        name: "Product",
        component: Product,
      },
      {
        path: "order",
        name: "Order",
        component: Dashboard,
      },
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
