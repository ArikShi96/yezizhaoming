import { http } from "./http";
import store from "@/utils/store.js";
import * as util from "@/utils/util.js";

export const HOST_NAME = "https://dengshi.yuejike.com";

// upload
export function UPLOAD_API({ upload_file }) {
  return http(
    "MULTI-PART",
    "/cdn/upload",
    {},
    { upload_file, client_id: "h5" }
  );
}

// 微信登录模块
export const AUTH_API = {
  oauth: ({ redirect_url }) => {
    return http("GET", "/oauth/wxOauth", { redirect_url });
  },
  quickLogin: ({ open_id }) => {
    return http(
      "POST",
      "/api/oauth/newQuickLogin",
      {},
      { open_id }
      // { open_id: open_id || "o3xbv5qjcz5tKawKVSuCUjZHEzrU" }
    );
  },
  login: ({ code, mobile }) => {
    return http("POST", "/api/oauth/sms", {}, { code, mobile });
  },
  code: ({ mobile }) => {
    return http(
      "POST",
      "/api/sms/verify-code",
      {},
      { access_token: store.getAccessToken() || "", mobile }
    );
  },
  updateMobile: ({ code, mobile }) => {
    return http("POST", "/api/users/update/mobile", {}, { code, mobile });
  },
  getFullUserInfo: ({ open_id }) => {
    return http("POST", "/api/oauth/getFullUserInfo", {}, { open_id: open_id });
  },
  getConfig: () => {
    return http("get", "/api/wechat/jssdkconfig");
  },
  getAlert: () => {
    return http("get", "/api/user/agreement");
  },
};

// 作品模块
export const WORK_API = {
  list: ({ page, pagesize }) => {
    return http("GET", "/api/my-tpl", {
      page: page || 1,
      pagesize: pagesize || 20,
    });
  },
  getDetail: ({ id }) => {
    return http("GET", `/api/produce/${id}`, {});
  },
  delete: ({ id }) => {
    return http("POST", `/api/produce/${id}`, { _method: "delete" });
  },
  // 获取图纸
  getDrawing: ({ id, name, mobile, email, occupation, address }) => {
    return http(
      "POST",
      `/api/produce/order/${id}`,
      {},
      { name, mobile, email, occupation, address }
    );
  },
};

// 首页
export const HOME_API = {
  banners: ({ order }) => {
    return http("GET", "/api/cms/banners", { order: order || "id,asc" }); // desc asc
  },
  // 图库分类
  storeCategories: () => {
    return http("GET", "/api/store/image/category", {});
  },
  // 图库列表
  storeImages: ({ category_id, page, pagesize }) => {
    return http("GET", "/api/store/image", {
      category_id,
      page: page || 1,
      pagesize: pagesize || 100,
    });
  },
  // 图库详情
  getStoreDetail: ({ id }) => {
    return http("GET", `/api/store/image/${id}`, {});
  },
  // 模板列表
  tplImages: ({ page, pagesize }) => {
    return http("GET", "/api/tpl", {
      page: page || 1,
      pagesize: pagesize || 20,
    });
  },
  // 模板详情
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
    return http("GET", "/api/store/list", {
      c_id,
      page: page || 1,
      orderBy,
      sort,
    });
  },
  // 商品详情
  storeDetail: ({ id }) => {
    return http("GET", `/api/store/detail/${id}`);
  },
  // 商品属性
  storeStock: ({ id, c_id, page, orderBy, sort }) => {
    return http("GET", `/api/store/detail/${id}/stock`, {
      id,
      c_id,
      page: page || 1,
      orderBy,
      sort,
    });
  },
  // 创作
  save: ({ title, products, data, url }) => {
    return http(
      "POST",
      util.isIframe() ? `/api/tpl` : `/api/produce`,
      {},
      {
        title,
        products,
        data,
        url,
      }
    );
  },
  // 修改
  edit: ({ id, products, data, title, url }) => {
    return http(
      "POST",
      util.isIframe() ? `/api/tpl/${id}` : `/api/produce/${id}`,
      {},
      {
        products,
        data,
        title,
        url,
      }
    );
  },
};
