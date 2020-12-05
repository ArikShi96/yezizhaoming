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
    {
      path: "/login/bind-phone",
      name: "bindPhone",
      component: () => {
        return import("@/containers/login/BindPhone");
      },
      meta: {
        title: "叶子照明",
      },
    },
    {
      path: "/login/login-by-phone",
      name: "loginByPhone",
      component: () => {
        return import("@/containers/login/LoginByPhone");
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
      name: "WorkDetail",
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
    {
      path: "/work-share/:id",
      name: "WorkShare",
      component: () => {
        return import("@/containers/work/WorkShare.vue");
      },
      meta: {
        title: "我的作品",
      },
    },
    // 购物车
    {
      path: "/shopping-cart/:id",
      name: "ShoppingCart",
      component: () => {
        return import("@/containers/shoppingCart/ShoppingCart");
      },
      meta: {
        title: "购物车",
      },
    },
    /******* 创作 *********/
    // 图片选择
    {
      path: "/create/image-select",
      name: "ImageSelect",
      component: () => {
        return import("@/containers/create/ImageSelect");
      },
      meta: {
        title: "创作作品",
      },
    },
    // 输入名字
    {
      path: "/create/name-input",
      name: "NameInput",
      component: () => {
        return import("@/containers/create/NameInput");
      },
      meta: {
        title: "创作作品",
      },
    },
    // 一级分类选择
    {
      path: "/create/type-select",
      name: "TypeSelectList",
      component: () => {
        return import("@/containers/create/TypeSelectList");
      },
      meta: {
        title: "创作作品",
      },
    },
    // 图库
    {
      path: "/create/system-images",
      name: "SystemImageList",
      component: () => {
        return import("@/containers/create/SystemImageList.vue");
      },
      meta: {
        title: "系统图库",
      },
    },
    {
      path: "/create/system-image/:id",
      name: "SystemImagePreview",
      component: () => {
        return import("@/containers/create/SystemImagePreview.vue");
      },
      meta: {
        title: "系统图库 - 预览",
      },
    },
    // 模板
    {
      path: "/create/system-templates",
      name: "SystemTemplateList",
      component: () => {
        return import("@/containers/create/SystemTemplateList.vue");
      },
      meta: {
        title: "模板",
      },
    },
    {
      path: "/create/system-template/:id",
      name: "SystemTemplatePreview",
      component: () => {
        return import("@/containers/create/SystemTemplatePreview.vue");
      },
      meta: {
        title: "模板 - 预览",
      },
    },
    // 创作
    {
      path: "/create/work",
      name: "CreateWork",
      component: () => {
        return import("@/containers/create/CreateWork.vue");
      },
      meta: {
        title: "叶子照明",
      },
    },
    // 创作 - 添加灯型
    {
      path: "/create/work/add-type",
      name: "AddTypeSelectList",
      component: () => {
        return import("@/containers/create/TypeSelectList.vue");
      },
      meta: {
        title: "创作作品",
      },
    },
    // 创作 - 切换场景
    {
      path: "/create/work/change-bg",
      name: "SwitchImageSelect",
      component: () => {
        return import("@/containers/create/ImageSelect.vue");
      },
      meta: {
        title: "创作作品",
      },
    },
    // 创作模板
    {
      path: "/template",
      name: "TemplateManagement",
      component: () => {
        return import("@/containers/template/index.vue");
      },
      meta: {
        title: "模板管理",
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
