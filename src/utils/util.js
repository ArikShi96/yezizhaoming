export const storeSession = (response) => {
  window.localStorage.setItem("user", JSON.stringify(response));
  window.localStorage.setItem("Authorization", response.token);
};

export const clearUserSession = () => {
  window.localStorage.removeItem("user");
};

export const clearTokenSession = () => {
  window.localStorage.removeItem("Authorization");
};

export const clearSession = () => {
  clearUserSession();
  clearTokenSession();
};

export const checkUserSession = () => {
  return !!window.localStorage.getItem("user");
};

export const checkTokenSession = () => {
  return !!window.localStorage.getItem("Authorization");
};

export const checkSession = () => {
  return checkUserSession() && checkTokenSession();
};
