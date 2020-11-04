import Vue from "vue";
import VueRouter from "vue-router";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    // 登录
    {
      path: "/login",
      name: "login",
      component: () => {
        return import("../containers/Login");
      },
    },
    // 首页
    {
      path: "/",
      name: "home",
      component: () => {
        return import("../containers/Home");
      },
    },
  ],
  // mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0,
      };
    }
  },
});
