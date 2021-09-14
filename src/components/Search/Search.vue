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
export default {
  name: "Search",
  data() {
    return {
      colorConfig,
      state: "close",
    };
  },
};
</script>

<style src="./Search.scss" lang="scss"></style>
