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
// custom component
import CustomAlert from "@/components/common/CustomAlert.vue";
import CustomButton from "@/components/common/CustomButton.vue";
import CustomDialog from "@/components/common/CustomDialog.vue";
import CustomRadio from "@/components/common/CustomRadio.vue";

Vue.use(VueDraggableResizableRotatable);
Vue.use(element);

Vue.component(
  "vue-draggable-resizable-rotatable",
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
  next();
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
