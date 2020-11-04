import Vue from "vue";
import App from "./App.vue";
// vue config
import router from "./router/router";
// element-ui
import element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// axios
import axios from "axios";
// vue-draggable-resizable-rotatable
import VueDraggableResizableRotatable from "vue-draggable-resizable-rotatable";

import CustomButton from "@/components/common/CustomButton.vue";

Vue.use(VueDraggableResizableRotatable);
Vue.use(element);

Vue.component(
  "vue-draggable-resizable-rotatable",
  VueDraggableResizableRotatable
);
Vue.component("v-button", CustomButton);

Vue.config.productionTip = false;
axios.defaults.withCredentials = true;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
