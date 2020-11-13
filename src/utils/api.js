import { http } from "./http";

// upload
export function UPLOAD_API({ upload_file }) {
  return http("MULTI-PART", "/api/oauth/newQuickLogin", {}, { upload_file });
}

// 微信登录模块
export const AUTH_API = {
  quickLogin: ({ open_id }) => {
    return http(
      "POST",
      "/api/oauth/newQuickLogin",
      {},
      { open_id: open_id || "ogJ-56pVvPwRGVf5t6oJLrneMOr4" }
    );
  },
  login: ({ code, mobile }) => {
    return http("POST", "/api/users/sms", {}, { code, mobile });
  },
  code: ({ access_token, mobile }) => {
    return http("POST", "/api/sms/verify-code", {}, { access_token, mobile });
  },
  updateMobile: ({ code, mobile }) => {
    return http("POST", "/api/users/update/mobile", {}, { code, mobile });
  },
  getFullUserInfo: ({ open_id }) => {
    return http(
      "POST",
      "/api/oauth/getFullUserInfo",
      {},
      { open_id: open_id || "ogJ-56pVvPwRGVf5t6oJLrneMOr4" }
    );
  },
};

// 作品模块
export const WORK_API = {
  list: ({ page, pagesize }) => {
    return http("GET", "/api/my-tpl", {
      page: page || 1,
      pagesize: pagesize || 10,
    });
  },
  getDetail: ({ id }) => {
    return http("GET", `/api/produce/${id}`, {});
  },
  // 获取图纸
  getDrawing: ({ id, name, mobile, email, occupation, address }) => {
    return http(
      "POST",
      `/api/my-drawing/${id}`,
      {},
      { name, mobile, email, occupation, address }
    );
  },
};

// 首页
export const HOME_API = {
  banners: ({ order }) => {
    return http("GET", "/api/cms/banners", { order: order || "desc" }); // desc asc
  },
  // 图库分类
  storeCategories: ({ category_id, page, pagesize }) => {
    return http("GET", "/api/cms/banners", { category_id, page, pagesize });
  },
  // 图库列表
  storeImages: ({ category_id, page, pagesize }) => {
    return http("GET", "/api/cms/banners", { category_id, page, pagesize });
  },
  // 图库详情
  getStoreDetail: ({ id }) => {
    return http("GET", `/api/store/image/${id}`, {});
  },
  // 模板列表
  tplImages: ({ page, pagesize }) => {
    return http("GET", "/api/tpl", { page, pagesize });
  },
  // 图库详情
  getTplDetail: ({ id }) => {
    return http("GET", `/api/tpl/${id}`, {});
  },
};

// 创作
export const CREATE_API = {
  // 分类列表
  categories: ({ parent_id }) => {
    return http("GET", `/api/categories/${parent_id || "0"}`); // parent_id 0
  },
  // 商品列表
  storeList: ({ c_id, page, orderBy, sort }) => {
    return http("GET", "/api/store/list", { c_id, page, orderBy, sort });
  },
  // 商品详情
  storeDetail: ({ id }) => {
    return http("GET", `/api/store/detail/${id}`);
  },
  // 商品属性
  storeStock: ({ id, c_id, page, orderBy, sort }) => {
    return http("GET", `/api/store/detail/${id}/`, {
      id,
      c_id,
      page,
      orderBy,
      sort,
    });
  },
  // 创作
  save: ({ id, products, data }) => {
    return http(
      "POST",
      `/api/produce`,
      { id },
      {
        products,
        data,
      }
    );
  },
  // 修改
  edit: ({ id, products, data }) => {
    return http(
      "POST",
      `/api/produce/${id}`,
      {},
      {
        products,
        data,
      }
    );
  },
};
