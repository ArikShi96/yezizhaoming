const prefix = "Yezi";

export default {
  cleatAll() {
    window.localStorage.removeItem(`${prefix}-background`);
    window.localStorage.removeItem(`${prefix}-work-name`);
    window.localStorage.removeItem(`${prefix}-work-type`);
    // window.localStorage.removeItem(`${prefix}-is-fresh`);
    // window.localStorage.removeItem(`${prefix}-background`);
    // window.localStorage.removeItem(`${prefix}-background`);
    // window.localStorage.removeItem(`${prefix}-background`);
    // window.localStorage.removeItem(`${prefix}-background`);
  },
  // 用户登录信息
  setUserInfo({ access_token, user }) {
    window.localStorage.setItem(`${prefix}-access_token`, access_token);
    window.localStorage.setItem(`${prefix}-user`, JSON.stringify(user || {}));
  },
  getAccessToken() {
    return window.localStorage.getItem(`${prefix}-access_token`);
  },
  getUserInfo() {
    return window.localStorage.getItem(`${prefix}-user`);
  },
  // 背景
  // 选择系统背景
  // 选择系统模板
  setBackgroundImage(obj) {
    window.localStorage.setItem(`${prefix}-background`, JSON.stringify(obj));
  },
  getBackgroundImage() {
    window.localStorage.getItem(`${prefix}-background`);
  },
  // 作品名字
  setWorkName(name) {
    window.localStorage.setItem(`${prefix}-work-name`, name);
  },
  getWorkName() {
    window.localStorage.getItem(`${prefix}-work-name`);
  },
  // 选择的一级类型
  setSelectType(type) {
    window.localStorage.setItem(`${prefix}-work-type`, JSON.stringify([type]));
  },
  getSelectType() {
    return JSON.parse(window.localStorage.getItem(`${prefix}-work-type`));
  },
  removeSelectType() {
    window.localStorage.removeItem(`${prefix}-work-type`);
  },
  // 是否第一次进来
  setIsNewComer(flag) {
    window.localStorage.setItem(`${prefix}-is-fresh`, flag || true);
  },
  getIsNewComer() {
    return window.localStorage.getItem(`${prefix}-is-fresh`);
  },
  // 保存当前工作进度
  setWorkList(list) {
    window.localStorage.setItem(
      `${prefix}-work-list`,
      JSON.stringify(list || [])
    );
  },
  getWorkList() {
    return JSON.parse(window.localStorage.getItem(`${prefix}-work-list`));
  },
};
