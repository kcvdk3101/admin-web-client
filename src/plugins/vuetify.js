import Vue from "vue";
import "font-awesome/css/font-awesome.css";
import colorConfig from "../colorConfig";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: colorConfig.light,
    },
  },
});
