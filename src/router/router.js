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
        return import("@/containers/Login");
      },
      meta: {
        title: "叶子照明",
      },
    },
    // 首页
    {
      path: "/",
      name: "home",
      component: () => {
        return import("@/containers/Home");
      },
      meta: {
        title: "叶子照明",
      },
    },
    // 创作
    {
      path: "/create",
      name: "create",
      component: () => {
        return import("@/containers/Create");
      },
      meta: {
        title: "创作作品",
      },
    },
    // 我的作品
    {
      path: "/work-list",
      name: "WorkList",
      component: () => {
        return import("@/containers/work/WorkList");
      },
      meta: {
        title: "我的作品",
      },
    },
    {
      path: "/work-preview/:id",
      name: "WorkPreview",
      component: () => {
        return import("@/containers/work/WorkPreview");
      },
      meta: {
        title: "作品预览",
      },
    },
    {
      path: "/work-detail/:id",
      name: "WorkList",
      component: () => {
        return import("@/containers/work/WorkDetail");
      },
      meta: {
        title: "作品详情",
      },
    },
    {
      path: "/work-form/:id",
      name: "WorkItemForm",
      component: () => {
        return import("@/containers/work/WorkForm.vue");
      },
      meta: {
        title: "填写表单",
      },
    },
    // 购物车
    {
      path: "/shopping-cart",
      name: "ShoppingCart",
      component: () => {
        return import("@/containers/shoppingCart/ShoppingCart");
      },
      meta: {
        title: "购物车",
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
