import axios from 'axios';
import { ElMessage } from 'element-plus';

const http = axios.create({
  baseURL: 'https://v3pz.itndedu.com/v3pz',
  timeout: 10000
});

// 添加请求拦截器
http.interceptors.request.use( 
    (config) => {
    //在发送请求之前做什么
    const token = localStorage.getItem('pz_token');
    //不需要添加token的接口
    const noTokenUrls = ['/get/code', '/user/authentication', '/login'];

    if (token && !noTokenUrls.includes(config.url)) {
      config.headers['x-token'] = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
http.interceptors.response.use(
  (response) => {
    if (response.data && response.data.code === -1) {
      ElMessage.warning(response.data.msg || '未知错误');
    }
    if (response.data && response.data.code === -2) {
      localStorage.removeItem('pz_token');
      localStorage.removeItem('pz_userInfo');
      localStorage.removeItem('pz_csdn');
      window.location.href = window.location.origin;
    }

    return response;
  },
  (error) => {
    return Promise.reject({
      ...error,
      message: error.response ? error.response.data.message : '网络请求失败'
    });
  }
);

export default http;