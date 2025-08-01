import axios from "axios";

//创建一个axios实例
const api = axios.create({
  baseURL: "http://47.113.224.195:32406", // 设置基础URL
  timeout: 50000, // 设置请求超时时间
  headers: {
    "Content-Type": "application/json",
  },
});

// 添加请求拦截器
api.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// 添加响应拦截器
api.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么

    return response;
  },
  function (error) {
    // 对响应错误做点什么

    return Promise.reject(error);
  }
);

export default api;
