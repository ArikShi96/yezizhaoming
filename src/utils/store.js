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
  setUserInfo({ access_token, user }) {
    window.localStorage.setItem(`${prefix}-access_token`, access_token);
    window.localStorage.setItem(`${prefix}-user`, JSON.stringify(user));
  },
  getAccessToken() {
    return window.localStorage.setItem(`${prefix}-access_token`);
  },
  getUserInfo() {
    return window.localStorage.setItem(`${prefix}-user`);
  },
  // 背景
  setBackgroundImage(obj) {
    window.localStorage.setItem(`${prefix}-background`, JSON.stringify(obj));
  },
  // 作品名字
  setWorkName(name) {
    window.localStorage.setItem(`${prefix}-work-name`, name);
  },
  // 选择的一级类型
  setSelectType(type) {
    const types =
      JSON.parse(window.localStorage.getItem(`${prefix}-work-type`)) || [];
    window.localStorage.setItem(`${prefix}-work-type`, [...types, type]);
  },
  // 是否第一次进来
  setIsNewComer(flag) {
    window.localStorage.setItem(`${prefix}-is-fresh`, flag || true);
  },
  getIsNewComer() {
    return window.localStorage.getItem(`${prefix}-is-fresh`);
  },
  // 选择系统背景
  // 选择系统模板
};
