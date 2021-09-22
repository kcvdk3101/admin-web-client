import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueRouter from "vue-router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Toast from "vue-toastification/dist/index.css";
import DatetimePicker from "@goldenm/vuetify-datetime-picker";

// import * as VueGoogleMaps from "vue2-google-maps";
// Vue.use(VueGoogleMaps, {
//   load: {
//     key: "AIzaSyB7OXmzfQYua_1LEhRdqsoYzyJOPh9hGLg",
//   },
// });
Vue.use(VueRouter);

Vue.config.productionTip = false;
Vue.use(Toast);
Vue.use(DatetimePicker);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

Vue.config.errorHandler = (error, vm, info) => {
  // eslint-disable-next-line no-console
  console.error(error, vm, info);
};
