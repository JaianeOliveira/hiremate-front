import { cleanAndFormatParams } from "@/utils/clean-and-format-params";
import axios from "axios";

export const api = axios.create({
  baseURL: "/api/proxy",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (config.params) {
    config.params = cleanAndFormatParams(config.params);
  }
  return config;
});
