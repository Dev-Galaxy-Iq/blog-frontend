import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
  headers: {
    'Content-Type': "application/json"
  }
})

export const customInstance = <T>(config: AxiosRequestConfig): Promise<import('axios').AxiosResponse<T>> => {
  return axiosInstance(config);
};
