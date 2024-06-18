import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import type { ResponseType } from "../types/api";

axios.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const api = {
  get: <T>(url: string, params?: object) =>
    axios.get<T>(url, {
      ...params,
    }),
  post: <T>(url: string, data: unknown, apiConfig?: AxiosRequestConfig) =>
    axios.post<T>(url, data, apiConfig),
  patch: <T>(url: string, data: unknown) => axios.patch<T>(url, data, {}),
  put: <T>(url: string, data: unknown) =>
    new Promise<T>((resolve, reject) => {
      axios
        .put<ResponseType<T>>(url, data, {})
        .then((res) => {
          const { data } = res.data;
          resolve(data);
        })
        .catch((e) => {
          reject(e);
        });
    }),
  delete: <T>(url: string) => axios.delete<T>(url, {}),
};
