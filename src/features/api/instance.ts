import axios, { AxiosInstance } from "axios";

const setInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.code === "ECONNABORTED" || error.response?.status === 408) {
        alert("요청이 만료되었습니다.");
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

const options = {
  baseURL: `datalab/shopping/category/keyword/`,
  headers: {
    Accept: "*/*",
    "X-Naver-Client-Id": process.env.REACT_APP_CLIENT_ID,
    "X-Naver-Client-Secret": process.env.REACT_APP_CLIENT_SECREAT,
    "Content-Type": "application/json",
  },
  timeout: 10000,
};

export const naverApi = setInterceptor(
  axios.create({
    ...options,
  })
);
