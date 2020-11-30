const prefix = "Yezi";

export default {
  clearAll() {
    window.localStorage.removeItem(`${prefix}-background`);
    window.localStorage.removeItem(`${prefix}-work-name`);
    window.localStorage.removeItem(`${prefix}-work-type`);
    window.localStorage.removeItem(`${prefix}-work-data`);
    window.localStorage.removeItem(`${prefix}-work-id`);
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
  setOpenId(openId) {
    window.localStorage.setItem(`${prefix}-open-id`, openId);
  },
  getOpenId() {
    return window.localStorage.getItem(`${prefix}-open-id`);
  },
  // 背景
  // 选择系统背景
  // 选择系统模板
  setBackgroundImage(obj) {
    window.localStorage.setItem(`${prefix}-background`, JSON.stringify(obj));
  },
  getBackgroundImage() {
    return window.localStorage.getItem(`${prefix}-background`);
  },
  removeBackgroundImage() {
    return window.localStorage.removeItem(`${prefix}-background`);
  },
  // 作品名字
  setWorkName(name) {
    window.localStorage.setItem(`${prefix}-work-name`, name);
  },
  getWorkName() {
    return window.localStorage.getItem(`${prefix}-work-name`);
  },
  // 选择的一级类型
  setSelectType(type) {
    window.localStorage.setItem(`${prefix}-work-type`, JSON.stringify(type));
  },
  getSelectType() {
    return window.localStorage.getItem(`${prefix}-work-type`);
  },
  removeSelectType() {
    window.localStorage.removeItem(`${prefix}-work-type`);
  },
  // 是否第一次进来
  setIsNewComer(flag) {
    window.localStorage.setItem(`${prefix}-is-fresh`, flag);
  },
  getIsNewComer() {
    return window.localStorage.getItem(`${prefix}-is-fresh`);
  },
  // 保存当前工作进度
  setWorkData(formData) {
    window.localStorage.setItem(
      `${prefix}-work-data`,
      JSON.stringify(formData || {})
    );
  },
  getWorkData() {
    return window.localStorage.getItem(`${prefix}-work-data`);
  },
  removeWorkData() {
    window.localStorage.removeItem(`${prefix}-work-data`);
  },
  setWorkId(id) {
    window.localStorage.setItem(`${prefix}-work-id`, id);
  },
  getWorkId() {
    return window.localStorage.getItem(`${prefix}-work-id`);
  },
};
