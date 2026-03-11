import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
  headers: {
    'Content-Type': "application/json"
  }
})

export const customInstance = <T>(
  config: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return axiosInstance({ ...config });
};
