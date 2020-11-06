<template>
  <div id="app">
    <router-view />
    <v-alert
      :message="message"
      :top="alertTop"
      @on-alert-hide="handleAlertHide"
    ></v-alert>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "app",
  created() {
    Vue.prototype.$alert = (message, top) => {
      this.message = message;
      this.alertTop = top || this.alertTop;
    };
  },
  data() {
    return {
      message: "",
      alertTop: "1.5rem",
    };
  },
  methods: {
    handleAlertHide() {
      this.message = "";
    },
  },
};
</script>
<style lang="scss" scoped>
#app {
  height: 100vh;
  width: 100vw;
}
</style>
