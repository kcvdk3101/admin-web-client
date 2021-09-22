<template>
  <v-footer class="px-0 mt-10" color="transparent">
    <v-row no-gutters>
      <div>
        <v-btn
          v-for="link in links"
          :key="link.link"
          color="primary"
          text
          :href="link.link"
          class="text-capitalize ml-1 font-weight-regular"
        >
          {{ link.text }}
        </v-btn>
      </div>
      <div>
        <v-btn
          v-for="icon in icons"
          :key="icon.icon"
          :href="icon.link"
          class="mr-1"
          :color="colorConfig.light.textColor"
          icon
        >
          <v-icon size="24px">{{ icon.icon }}</v-icon>
        </v-btn>
      </div>
    </v-row>
  </v-footer>
</template>

<script>
import colorConfig from "../../colorConfig";
import AuthService from "../../service/AuthService";

export default {
  name: "Footer",
  data: () => ({
    authService: {},
    userInfo: "",
    accessTokenExpired: false,
    isLoggedIn: false,
    colorConfig,
    icons: [
      { icon: "mdi-facebook", link: "https://twitter.com/flatlogic/" },
      { icon: "mdi-twitter", link: "https://www.facebook.com/flatlogic" },
      { icon: "mdi-github", link: "https://github.com/flatlogic/" },
    ],
    links: [
      { text: "Flatlogic", link: "https://flatlogic.com/" },
      { text: "About Us", link: "https://flatlogic.com/about" },
      { text: "Blog", link: "https://flatlogic.com/blog" },
    ],
  }),
  mounted() {
    this.authService.resource.user().then((user) => {
      if (user) {
        this.userInfo = user;
        this.accessTokenExpired = user.expired;
        this.isLoggedIn = user !== null && !user.expired;
      }
    });
  },
  created() {
    this.authService = new AuthService();
  },
};
</script>

<style src="./Footer.scss" lang="scss"></style>
