import axios from "axios";
import qs from "qs";

export const http = async (method, url, params, data, header) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
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
          params.append("json", JSON.stringify(data.json));
          params.append("file", data.file);
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
  if (response.status === 200) {
    return response.data;
  }
  throw new Error(response.data.message);
};

const encodeUrlWithParams = (url, params) => {
  params = {
    ...(params || {}),
  };

  Object.keys(params).forEach((key, index) => {
    url += `${index ? "" : "?"}`;
    if (params[key]) {
      url += `${index ? "&" : ""}${key}=${encodeURIComponent(params[key])}`;
    }
  });

  return url;
};
