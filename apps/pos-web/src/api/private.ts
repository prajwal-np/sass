import axios from "axios";
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import type { ResponseType } from "../types/api";
import deviceStorage from "../utils/device";

axios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig<any>) => {
    const token = await deviceStorage.getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error: any) => {
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
        .then((res: any) => {
          const { data } = res.data;
          resolve(data);
        })
        .catch((e: any) => {
          const errorObj = e.response.data.error || {
            queueNo: "Some thing went wrong",
          };
          const entries: [string, unknown][] = Object.entries(errorObj);
          reject(e);
        });
    }),
  delete: <T>(url: string) => axios.delete<T>(url, {}),
};
