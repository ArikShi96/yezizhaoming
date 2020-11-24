import axios from "axios";
import qs from "qs";
import store from "@/utils/store.js";

export const http = async (method, url, params, data, header) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${store.getAccessToken()}`,
    ...header,
  };
  let response = {};

  try {
    switch (method) {
      case "GET": {
        response = await axios.get(encodeUrlWithParams(url, params), {
          headers,
          withCredentials: true,
        });
        break;
      }
      case "POST": {
        response = await axios.post(
          encodeUrlWithParams(url, params),
          JSON.stringify(data),
          {
            headers,
            withCredentials: true,
          }
        );
        break;
      }
      case "FORM": {
        response = await axios.post(
          encodeUrlWithParams(url, params),
          qs.stringify(data)
        );
        break;
      }
      case "DELETE": {
        response = await axios.delete(encodeUrlWithParams(url, params), {
          headers,
          withCredentials: true,
        });
        break;
      }
      case "MULTI-PART": {
        const params = new FormData();
        if (data) {
          params.append("client_id", "h5");
          params.append("upload_file", data.upload_file);
        }
        const config = {
          //添加请求头
          headers,
          withCredentials: true,
          //添加上传进度监听事件
        };
        response = await axios.post(
          encodeUrlWithParams(url, params),
          params,
          config
        );
        break;
      }
    }
  } catch (error) {
    response = error.response;
  }
  // 请求成功
  if (response.status === 200 && response.data.status) {
    return response.data;
  }
  throw new Error(response.data.message || response.statusText);
};

const encodeUrlWithParams = (url, params) => {
  params = {
    ...(params || {}),
  };

  Object.keys(params).forEach((key, index) => {
    url += `${index ? "" : "?"}`;
    if (params[key] || params[key] === 0) {
      url += `${index ? "&" : ""}${key}=${encodeURIComponent(params[key])}`;
    }
  });

  return url;
};
