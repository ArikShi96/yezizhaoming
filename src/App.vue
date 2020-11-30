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
import axios from "axios";
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
  watch: {
    $route() {
      if (["WorkList", "WorkDetail"].includes(this.$route.name)) {
        axios.get("/api/wechat/jssdkconfig").then((res) => {
          window.wx.config({
            ...res.data,
            jsApiList: [
              "updateAppMessageShareData",
              "updateTimelineShareData",
              "downloadImage",
            ],
          });
          //   window.wx.config({
          //     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          //     appId: this.appid, // 必填，公众号的唯一标识
          //     timestamp: "", // 必填，生成签名的时间戳
          //     nonceStr: "", // 必填，生成签名的随机串
          //     signature: "", // 必填，签名
          //     jsApiList: [
          //       "updateAppMessageShareData",
          //       "updateTimelineShareData",
          //       "downloadImage",
          //     ], // 必填，需要使用的JS接口列表
          //   });
          // });
        });
      }
    },
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
