<template>
  <form action="#">
    <label :data-state="state">
      <input
        type="text"
        placeholder="Searching...."
        @click="state = 'open'"
        @blur="state = 'close'"
      />
      <v-icon :color="colorConfig.light.iconColor" size="28"
        >mdi-magnify</v-icon
      >
    </label>
  </form>
</template>

<script>
import colorConfig from "../../colorConfig";
import AuthService from "../../service/AuthService";

export default {
  name: "Search",
  data() {
    return {
      colorConfig,
      state: "close",
      userInfo: "",
      accessTokenExpired: false,
      isLoggedIn: false,
      authService: {},
    };
  },
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

<style src="./Search.scss" lang="scss"></style>
