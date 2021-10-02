<template>
  <v-app class="pa-6">
    <Header v-if="!$auth.loading" />
    <Sidebar v-if="!$auth.loading" />
    <v-main class="content" v-if="!$auth.loading">
      <router-view /> <Footer
    /></v-main>
  </v-app>
</template>

<script>
import Header from "../Header/Header.vue";
import Footer from "../Footer/Footer.vue";
import Sidebar from "../Sidebar/Sidebar.vue";
export default {
  name: "Layout",
  components: { Header, Footer, Sidebar },
};
</script>

<style src="./Layout.scss" lang="scss"></style>
