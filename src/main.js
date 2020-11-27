import Vue from "vue";
import App from "./App.vue";
// vue config
import router from "./router/router";
// element-ui
import element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/override.scss";
// axios
import axios from "axios";
// vue-draggable-resizable-rotatable
import VueDraggableResizableRotatable from "vue-draggable-resizable-rotatable";
// VueScroller
import VueScroller from "vue-scroller";
// custom component
import CustomAlert from "@/components/common/CustomAlert.vue";
import CustomButton from "@/components/common/CustomButton.vue";
import CustomDialog from "@/components/common/CustomDialog.vue";
import CustomRadio from "@/components/common/CustomRadio.vue";
import { HOST_NAME } from "@/utils/api.js";
import store from "@/utils/store.js";

if (process.env.NODE_ENV !== "development") {
  axios.defaults.baseURL = HOST_NAME;
}

Vue.use(VueScroller);
Vue.use(VueDraggableResizableRotatable);
Vue.use(element);

Vue.component(
  "v-draggable-resizable-rotatable",
  VueDraggableResizableRotatable
);
Vue.component("v-alert", CustomAlert);
Vue.component("v-button", CustomButton);
Vue.component("v-dialog", CustomDialog);
Vue.component("v-radio", CustomRadio);

Vue.config.productionTip = false;
axios.defaults.withCredentials = true;

/* 路由发生变化修改页面title */
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "叶子照明";
  if (
    !["/login", "/login/login-by-phone"].includes(to.path) &&
    !store.getAccessToken()
  ) {
    next({
      path: "/login",
    });
  } else {
    next();
  }
});

window.vm = new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
