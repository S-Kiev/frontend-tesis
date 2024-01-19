import axios from 'axios';
import { getToken, resetStorageData } from 'util/auth';

const axiosDefaultConfig = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosDefaultConfig.interceptors.request.use(
  function (config: any) {
    if (!config.url?.includes('auth/local')) {
      const newConf = {
        ...config,
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
      };
      return newConf;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosDefaultConfig.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    if (error.response.status === 401 || error.response.status === 403) {
      // Temporary signout. Should refresh token in the future
      resetStorageData();
      window.location.pathname = '/';
    }
    return Promise.reject(error);
  },
);

export { axiosDefaultConfig };
