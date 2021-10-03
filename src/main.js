import DatetimePicker from '@goldenm/vuetify-datetime-picker';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Toast from 'vue-toastification/dist/index.css';

import { clientId, domain } from '../auth_config.json';
import App from './App.vue';
import { Auth0Plugin } from './auth';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';

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

Vue.use(Auth0Plugin, {
    domain,
    clientId,
    onRedirectCallback: (appState) => {
        router.push(
            appState && appState.targetUrl ?
            appState.targetUrl :
            window.location.pathname
        );
    },
});

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